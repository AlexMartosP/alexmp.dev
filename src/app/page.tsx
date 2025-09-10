import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import portrait from "../../public/portrait.jpg";
import Projects from "./Projects";
import { allPosts, Post } from "contentlayer/generated";
import PostItem from "@/components/PostItem";

export default function Home() {
  const posts = allPosts;

  return (
    <>
      <div className="sm:max-w-xl sm:mx-auto mt-24">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
          <div className="max-w-[6rem] aspect-square">
            <Image
              className="w-full h-full object-cover rounded-3xl"
              src={portrait}
              quality={100}
              alt=""
            />
          </div>
          <h1 className="flex flex-col text-4xl font-medium">
            <span>Hi, I’m Alex -</span>
            <span>I build for the web.</span>
          </h1>
        </div>
        <p className="mt-4">
          I'm a Software Developer from Sweden with a great passion for learning
          and working with new technologies to build developer tools and
          applications. I'm driven by problem-solving, taking on new challenges
          and creating high-quality user experiences.
        </p>
        <div className="flex gap-4 mt-6">
          <Link
            href="https://www.linkedin.com/in/alexmartosp/"
            className="inline-block p-2.5 bg-gray-100 rounded-xl hover:bg-[#0077b5] hover:text-[#fff]"
            target="_blank"
          >
            <Linkedin size={20} />
          </Link>
          <Link
            href="https://github.com/AlexMartosP"
            className="inline-block p-2.5 bg-gray-100 rounded-xl hover:bg-[#333] hover:text-[#fff]"
            target="_blank"
          >
            <Github size={20} />
          </Link>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-100 my-20" />
      {posts.length > 0 && (
        <>
          <div className="sm:max-w-4xl sm:mx-auto ">
            <h2 className="text-xl font-medium">Blog</h2>
            <div className="py-2" />
            <div className="flex flex-col sm:flex-row gap-8">
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </div>
          <div className="py-8" />
        </>
      )}
      <Projects />
    </>
  );
}
