export default function OpenGraph({ pageName }: { pageName: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>Alexander Martos P</span>
        <div
          style={{
            width: 5,
            height: 5,
            backgroundColor: "#FFBF3D",
            borderRadius: "50vh",
          }}
        ></div>
        <span>Software Developer</span>
        <div
          style={{
            width: 5,
            height: 5,
            backgroundColor: "#FFBF3D",
            borderRadius: "50vh",
          }}
        ></div>
        <span>alexmp.dev</span>
      </div>
      <span
        style={{
          fontSize: "4rem",
          fontWeight: 600,
          marginTop: "1rem",
        }}
      >
        {pageName}
      </span>
    </div>
  );
}
