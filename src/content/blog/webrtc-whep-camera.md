---
title: WebRTC and WHEP - lessons from integrating a camera
date: 2026-03-21
description: What I learned about ICE, STUN, TURN, and WHEP after building live camera streaming into a product
---

This post is based on notes I took while building. A lot of time was spent in the specs — [ICE (RFC 8445)](https://datatracker.ietf.org/doc/html/rfc8445), [TURN (RFC 5766)](https://datatracker.ietf.org/doc/html/rfc5766), [WHEP](https://datatracker.ietf.org/doc/html/draft-ietf-wish-whep), [WebRTC](https://www.w3.org/TR/webrtc/), and [SDP](https://datatracker.ietf.org/doc/html/rfc4566) — and I'd recommend having them open if you're working in this space.

I recently integrated a live camera stream into a product using WebRTC and WHEP. Along the way I hit enough confusing edges that I want to write them down while they're fresh.

This is not a WebRTC tutorial. It's a set of things that tripped me up — concepts I thought I understood but didn't, and protocol quirks that only show up under real conditions.

### The two completely different things STUN does

The most confusing thing early on was that STUN is used in two separate, unrelated phases that share the same protocol.

**Phase 1 — candidate gathering.** Before peers can talk to each other they need to know their own addresses. If you're behind a NAT (which you almost always are), your device only knows its local IP. A STUN server, like `stun.l.google.com`, lets you discover your public IP and port by sending a binding request and reading back what the server saw as the source. This gives you a *server reflexive candidate* (srflx). Google's STUN server is doing nothing special here — it's just a mirror that reflects your public address back to you.

**Phase 2 — connectivity checks.** After both peers have exchanged candidates via signaling, they start probing each pair directly — peer to peer, no STUN server involved. Each side sends STUN binding requests straight to the other's candidate addresses. A successful response means that path works. The STUN server you used in phase 1 is completely out of the picture at this point.

I kept confusing these two. The question "does Google validate my connection?" — no. They helped you find your public IP. Validation is entirely between the two peers.

### Controlling vs controlled: who nominates

Both peers do connectivity checks (they send STUN requests to each other). But only the *controlling* peer gets to nominate a candidate pair. It does this by including the `USE-CANDIDATE` attribute in its STUN request. The controlled peer receives that, looks at the source IP and port the packet came from, matches it to a candidate pair, and starts using it. There's no explicit ID exchanged — the 5-tuple on the network packet is the identifier.

The short version: both peers validate, only the controlling peer decides.

### ICE keepalives and NAT timeouts

NAT bindings expire if no outbound traffic uses them. Most routers give you somewhere between 15 and 60 seconds. ICE handles this with periodic STUN binding requests from the controlling peer — these act as keepalives that reset the NAT timer and keep the binding alive for the duration of the session.

**Full cone NAT** maps each private IP+port to a fixed public IP+port regardless of the destination. Any incoming packet to that public address gets forwarded through.

![Full cone NAT: one private port maps to one public port](/blog/webrtc-nat-fullcone.svg)

**Symmetric NAT** creates a separate public mapping per destination. The same private port gets a different public port for each remote address it talks to — which is why the public address your STUN server sees isn't the one your peer should send to.

![Symmetric NAT: separate public port per destination](/blog/webrtc-nat-symmetric.svg)

### TURN: when direct fails

If there's no path between the two peers (double NAT, strict firewall), you fall back to TURN. A TURN server allocates a relay address on your behalf.

The allocation flow has a deliberate challenge-response for auth. You send a request without credentials, get back a `401` with a realm and nonce, then re-send with credentials. This prevents unauthenticated relay abuse.

One thing worth noting: ICE gathering with TURN requires a relay candidate from the TURN server before the offer can go out. That extra roundtrip — in our case around 5 seconds — became important when debugging the persistence bug below.

![TURN relay: traffic flows through the TURN server when direct paths fail](/blog/webrtc-turn.svg)

### WHEP and ICE restart

WHEP is a simple HTTP-based protocol for receiving WebRTC streams. The lifecycle is:

```
POST   /whep/streams/{id}  → create session, get Location header
PATCH  {Location}          → trickle ICE candidates (and optionally ICE restart)
DELETE {Location}          → tear down
```

The WHEP spec does allow ICE restart via PATCH — you send a new offer with fresh ICE credentials and the server responds with an updated answer, keeping the session alive. This is the right tool for recovering a live connection that hiccupped.

In practice it depends on the provider implementing PATCH with ICE restart support. In our case the provider didn't support it, so we couldn't use it.

When PATCH isn't available, the only option is a full teardown and reconnect via a new POST. This creates a brand new server-side session, and you should use a fresh `RTCPeerConnection` to match. Reusing the old `RTCPeerConnection` causes problems:

- ICE sends STUN probes to the old session's port, which is already closed
- DTLS tries to migrate the existing session rather than doing a fresh handshake

That last one is subtle. DTLS only restarts if the fingerprint in the SDP changes. Most providers use a single long-lived certificate, so the new session has the same fingerprint as the old one. The browser sees no change, skips the restart, and tries to migrate — but the new server session has no record of the old DTLS state. Deadlock.

> ICE success does not mean connection success. ICE is the transport pipe. DTLS on top is what actually breaks when session state is mismatched.

A fresh `RTCPeerConnection` sidesteps all of this — clean handshake on both sides simultaneously.

### Session limits and staying connected

The camera provider we integrated with enforces a session time limit on their end. If you hold a session past it, they close it and your stream dies.

The approach we took: while the current stream is playing, proactively start connecting a new session in the background, then seamlessly switch before the old one expires. The key is aligning your reconnection timer to when the server's session clock actually starts — which is at the POST, not at setup start. If there's TURN gathering involved, that happens before the POST, so your timer needs to account for that offset.

When the provider kills a session before you proactively switch, the right behaviour is to show a frozen last-frame rather than a blank screen, and trigger the reconnect immediately. The caller shouldn't see a "disconnected" state during normal cycling — that's an implementation detail of the persistence mechanism.

---

### Takeaways

- STUN does two different things in two different phases. The STUN server is only involved during candidate gathering.
- Both peers validate candidate pairs. Only the controlling peer nominates.
- NAT bindings expire. ICE keepalives exist for exactly this reason.
- WHEP has no session update primitive. ICE restart fails because of DTLS state mismatch, not ICE.
- When debugging connection issues, check the DTLS layer. ICE success does not mean connection success.
- Wireshark on the nominated candidate pair's IP is the fastest way to see what's actually happening.
- Align your session timers to the server's clock, not your own setup process.
