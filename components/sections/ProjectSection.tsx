import React from "react";
import ProjectComponent from "../custom/ProjectComponent";

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: "Gamify",
    date: "03/2025",
    imageSrc: "/FlintDashboard.webp",
    imagePosition: "!bottom-0 !left-20",
    className: "hover:bg-purple-700 hover:text-white col-span-8",
  },
  {
    id: 2,
    title: "Flint Dashboard",
    date: "02/2025",
    imageSrc: "/s1.svg",
    imagePosition: "!bottom-20 !left-0 ",
    className: "hover:text-white col-span-4",
  },
  {
    id: 3,
    title: "Vexio Platform",
    date: "01/2025",
    imageSrc: "/vexio.svg",
    imagePosition: "!bottom-0 !left-0",
    className: "hover:bg-blue-700 hover:text-white col-span-4",
  },
  {
    id: 4,
    title: "VNG Solutions",
    date: "12/2024",
    imageSrc: "/vng.svg",
    imagePosition: "!bottom-0 !right-0",
    className: "hover:bg-green-700 hover:text-white col-span-8",
  },
];

export default function ProjectSection() {
  return (
    <section className="w-full max-w-7xl mx-auto h-auto bg-[#F5F5F5] rounded-[16px] flex flex-col justify-between p-[40px]">
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
