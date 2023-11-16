// Components
import Link from "next/link";
import Dot from "./Dot";
// Icons
import { Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-auto ">
      <div className="flex flex-col mt-12 sm:flex-row gap-6 justify-between items-center p-6 bg-gray-100 rounded-3xl">
        <div className="flex items-center">
          <Dot />
          <span className="ml-4 font-medium">Alexander MP</span>
          <span className="ml-8 text-[#7F6F68]">
            {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-center gap-6">
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/AlexMartosP"
              className="text-[#7F6F68] hover:text-black"
              target="_blank"
            >
              <Github />
            </Link>
            <Link
              href="https://www.linkedin.com/in/alexander-martos-paschoal/"
              className="text-[#7F6F68] hover:text-black"
              target="_blank"
            >
              <Linkedin />
            </Link>
            <Link
              href="https://twitter.com/alexmartosp"
              className="text-[#7F6F68] hover:text-black"
              target="_blank"
            >
              <Twitter />
            </Link>
          </div>
          <Link
            href="mailto:alex.martos@hotmail.se"
            className="py-2 px-6 bg-black text-white rounded-xl"
          >
            Reach out
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
