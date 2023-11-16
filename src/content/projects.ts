export type Type = "client" | "project";

type Project = {
  name: string;
  year: number;
  link?: string;
  description?: string;
  stack: string[];
  services?: string[];
  hasChanged: boolean;
  note?: string;
  type: Type;
};

const projects: Project[] = [
  {
    name: "Music player with parties (rooms)",
    year: 2023,
    link: "https://parties-web-player-amp.netlify.app/",
    description:
      "This is a music web player utilizing Spotify API and web SDK. Besides listening on music aone you can create rooms and listen with friends or join other rooms. I started with a design in Figma and planning before I started to code. Since this was a big project while trying to avoid external component libraries, I learned a lot",
    stack: ["ReactJS", "Framer motion", "Spotify API", "Firebase"],
    hasChanged: false,
    type: "project",
  },
  {
    name: "Livingdecor Sverige AB",
    year: 2021,
    link: "https://www.livingdecor.se/",
    description:
      "This is a big eCommerce website with about 5000 products. This was a big project that I would have built differently today, as I learned a lot since then (I probably wouldn't use WordPress ;) ). This website has undergone some technical changes during my time as I have learned new things along the way.",
    stack: ["WordPress", "WooCommerce", "Klarna checkout"],
    services: ["Web development", "Web design"],
    hasChanged: true,
    type: "client",
  },
  {
    name: "Movie app",
    year: 2022,
    link: "https://film-app-amp.netlify.app/",
    description:
      "This is a movie and series application where you can search for movies, TV shows and series. You can search, filter and even watch trailers if there is one available. If you find something interesting (like The Office), you can save it for later.",
    stack: ["ReactJS", "Framer motion", "TMDB API"],
    hasChanged: false,
    type: "project",
  },
  {
    name: "Clone of Life at Spotify website",
    year: 2022,
    link: "https://parties-web-player-amp.netlify.app/",
    description:
      "This is a clone of www.lifeatspotify.com. I saw it as a great HTML and CSS challenge due to its use of positions, scroll transitions etc. It was challenging but a lot of fun to build.",
    stack: ["HTML", "SCSS", "JavaScript"],
    hasChanged: false,
    note: "This is a clone of www.lifeatspotify.com. Spotify own all the rights.",
    type: "project",
  },
  {
    name: "Städform i Halland AB",
    year: 2019,
    link: "https://stadform.se/",
    description:
      "This was my very first real and live website I built for my friend's parents' cleaning company. The website went through many versions and did not look like this in the first versions, it took some learning. The website was originally built in Weebly, but we changed to WordPress.",
    services: ["Web development", "Web design", "Search Engine Optimization"],
    stack: ["WordPress"],
    hasChanged: false,
    type: "client",
  },
  {
    name: "Biokub (Per Schürer AB)",
    year: 2022,
    link: "https://biokub.se/",
    description: "A simple website for a client with specific target audience.",
    stack: ["WordPress"],
    services: ["Web development"],
    hasChanged: false,
    type: "client",
  },
  {
    name: "Huddinge mopedskola",
    year: 2021,
    link: "https://huddingemopedskola.se/",
    description:
      "A website for a driving school. Main focus, information and leads.",
    stack: ["WordPress"],
    services: ["Web development", "Web design"],
    hasChanged: false,
    type: "client",
  },
  {
    name: "YPR i Åmål AB",
    year: 2021,
    link: "https://www.ypr.se/",
    description:
      "A simple website for a client with focus on information of different products.",
    stack: ["WordPress"],
    services: ["Web development", "Web design"],
    hasChanged: false,
    type: "client",
  },
  {
    name: "Yachting Sweden",
    year: 2022,
    link: "https://www.yachtingsweden.se/",
    description:
      "Here the client wanted a course platform where they could sell both digital and physical courses. I worked mostly with that functionality and the technical. I also made some cleanup of the design for the sake of performance.",
    stack: ["WooCommerce", "WordPress"],
    services: ["Web development"],
    hasChanged: false,
    type: "client",
  },
  {
    name: "Yachting Scandinavia",
    year: 2022,
    link: "https://www.yachtingscandinavia.se/",
    description:
      "This is a job marketplace for the client I built Yachting Sweden for.",
    stack: ["WordPress"],
    services: ["Web development"],
    hasChanged: false,
    type: "client",
  },
  {
    name: "Nanofilm",
    year: 2020,
    link: "http://www.nanofilm.se/",
    stack: ["WordPress"],
    services: ["Web development", "Web design"],
    hasChanged: false,
    type: "client",
  },
  {
    name: "Effective Spend AB",
    year: 2020,
    stack: ["WordPress"],
    services: ["Web development", "Web design"],
    hasChanged: true,
    type: "client",
  },
];

export function getProjects(type?: Type) {
  if (type) {
    return projects.filter((project) => project.type === type);
  }

  return projects;
}
