import Link from "next/link";
// Icons
import { Linkedin } from "lucide-react";

function Contact() {
  return (
    <>
      <h1 className="mt-24 text-7xl font-semibold">Get in touch.</h1>
      <div className="flex flex-col sm:flex-row gap-6 mt-10">
        <Link
          href="mailto:alex.martos@hotmail.se"
          className="inline-flex justify-center items-center h-16 leading-none px-12 py-5 bg-black text-white font-medium rounded-3xl"
        >
          alex.martos@hotmail.se
        </Link>
        <Link
          href="https://www.linkedin.com/in/alexander-martos-paschoal/"
          className="inline-flex items-center justify-center h-16 px-12 py-5 border-2 border-black rounded-3xl min-w-[164px]"
          target="_blank"
        >
          <Linkedin />
        </Link>
      </div>
    </>
  );
}

export default Contact;
