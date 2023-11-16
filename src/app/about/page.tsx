import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About me",
  description: "Who am I?",
};

export default function About() {
  return (
    <>
      <h1 className="mt-24 text-7xl font-semibold">About me.</h1>
      <h2 className="mt-2.5 text-xl font-medium">
        I love building web applications!
      </h2>
      <div className="mt-16 max-w-4xl mx-auto">
        <p className="mb-3 leading-relaxed">
          My interest in websites and programming started when a friend and I
          started a company at the age of 15. At first, we helped businesses
          with search engine optimization as well as Google and Facebook
          advertising. Shortly after, we saw a high demand for websites. That's
          when I started learning about WordPress and WooCommerce and built my
          first website (Städform).
        </p>
        <p className="mb-3 leading-relaxed">
          While running the company, I learned a great deal about teamwork but
          above all, programming and websites. We continued to help businesses
          with websites and marketing until 2021, when I started freelancing as
          a web developer. Since then, I have helped several clients from
          various industries.
        </p>
        <p className="mb-3 leading-relaxed">
          In 2022, I began studying at EC-utbildning in Helsingborg to become a
          Frontend developer. Alongside my studies, I am also studying to deepen
          my knowledge further. Additionally, I am working on various projects,
          including my personal projects, with the goal of becoming a Full stack
          developer and eventually a Software Engineer.
        </p>
        <p className="leading-relaxed">
          While running my company and freelancing, I focused heavily on
          WordPress and WooCommerce.
        </p>
      </div>
    </>
  );
}
