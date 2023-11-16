"use client";

import Expandable, {
  ExpandableContent,
  ExpandableTitle,
} from "@/components/Expandable";
import { Tab, Tabs } from "@/components/Tabs";
import { Type, getProjects } from "@/content/projects";
import { useState } from "react";

export default function Projects() {
  const [selectedType, setSelectedType] = useState<Type>("client");
  const projects = getProjects(selectedType);

  return (
    <>
      <div className="sm:w-80 sm:mx-auto">
        <Tabs>
          <Tab
            onClick={() => {
              setSelectedType("client");
            }}
            active={selectedType === "client"}
          >
            Clients
          </Tab>
          <Tab
            onClick={() => {
              setSelectedType("project");
            }}
            active={selectedType === "project"}
          >
            Projects
          </Tab>
        </Tabs>
      </div>
      <div className="py-6" />
      {projects.map((project, i) => (
        <div key={i}>
          <Expandable href={project.link} badges={project.stack}>
            <ExpandableTitle>{project.name}</ExpandableTitle>
            <ExpandableContent>
              <p>{project.description}</p>
              {project.services && (
                <p className="pt-2">
                  <b className="block">Services</b>
                  {project.services.join(",   ")}
                </p>
              )}
            </ExpandableContent>
          </Expandable>
          {i < projects.length - 1 && (
            <div className="w-full h-[2px] bg-gray-100" />
          )}
        </div>
      ))}
    </>
  );
}
