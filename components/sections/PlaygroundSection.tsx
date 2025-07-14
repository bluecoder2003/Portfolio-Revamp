import React from "react";
import ProjectComponent from "../custom/ProjectComponent";

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: "DEVELOPMENT",
    description: "I'm a developer who loves to build things with code.",
    date: "03/2025",
    imageSrc: "/FlintDashboard.webp",
    imagePosition: "!bottom-0 !left-1/3",
    className: "col-span-8 h-[600px]",
  },
  {
    id: 2,
    title: "Flint Dashboard",
    date: "02/2025",
    imageSrc: "/s1.svg",
    imagePosition: "!bottom-20 !left-0 ",
    className: "col-span-4 h-[600px]",
  },
  {
    id: 3,
    title: "Vexio Platform",
    date: "01/2025",
    imageSrc: "/vexio.svg",
    imagePosition: "!bottom-0 !left-0",
    className: "col-span-4 h-[600px]",
  },
  {
    id: 4,
    title: "VNG Solutions",
    date: "12/2024",
    imageSrc: "/vng.svg",
    imagePosition: "!bottom-0 !right-0",
    className: "col-span-8 h-[600px]",
  },
];

export default function PlaygroundSection() {
  return (
    <section className="w-full max-w-7xl mx-auto h-auto rounded-[16px] flex flex-col justify-between">
      <div className="grid grid-cols-12 gap-4">
        {mockProjects.map((project) => (
          <ProjectComponent
            key={project.id}
            className={project.className}
            imagePosition={project.imagePosition}
            imageSrc={project.imageSrc}
            projectTitle={project.title}
            projectDate={project.date}
          />
        ))}
      </div>
    </section>
  );
}
