import React, { useState } from "react";
import ProjectComponent from "../custom/ProjectComponent";

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: "Gamify",
    description: "Gamify is a platform that allows you to create and manage your own games.",
    date: "03/2025",
    imageSrc: "/FlintDashboard.webp",
    imagePosition: "!bottom-0 !left-20",
    className: "hover:bg-purple-700 hover:text-white col-span-1 lg:col-span-7 h-[600px]",
    hoverTextColor: "text-white",
    hoverArrowColor: "text-purple-700",
  },
  {
    id: 2,
    title: "Flint Dashboard",
    description: "Flint Dashboard is a platform that allows you to create and manage your own games.",
    date: "02/2025",
    imageSrc: "/s1.svg",
    imagePosition: "!bottom-20 !left-0 ",
    className: "hover:bg-purple-700 hover:text-white col-span-1 lg:col-span-5 h-[600px]",
    hoverTextColor: "text-white",
    hoverArrowColor: "text-purple-700",
  },
  {
    id: 3,
    title: "Vexio Platform",
    description: "Vexio Platform is a platform that allows you to create and manage your own games.",
    date: "01/2025",
    imageSrc: "/vexio.svg",
    imagePosition: "!bottom-0 !left-0",
    className: "hover:bg-blue-700 hover:text-white col-span-1 lg:col-span-5 h-[600px]",
    hoverTextColor: "text-white",
    hoverArrowColor: "text-purple-700",
  },
  {
    id: 4,
    title: "VNG Solutions",
    description: "VNG Solutions is a platform that allows you to create and manage your own games.",
    date: "12/2024",
    imageSrc: "/vng.svg",
    imagePosition: "!bottom-0 !right-0",
    className: "hover:bg-green-700 hover:text-white col-span-1 lg:col-span-7 h-[600px]",
    hoverTextColor: "text-white",
    hoverArrowColor: "text-purple-700",
  },
];

export default function ProjectSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return (
    <section className="w-full max-w-7xl mx-auto h-auto rounded-[16px] flex flex-col justify-between relative">
      {hoveredId !== null && (
        <div className="fixed inset-0 bg-[#E6E6E6]/70 z-30 transition-all duration-300 pointer-events-none rounded-2xl" />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[10px] overflow-hidden relative">
        {mockProjects.map((project) => (
          <ProjectComponent
            key={project.id}
            className={project.className + (hoveredId === project.id ? " shadow-2xl transition-all duration-300 z-40" : " z-10")}
            imagePosition={project.imagePosition}
            imageSrc={project.imageSrc}
            projectTitle={project.title}
            projectDescription={project.description}
            projectDate={project.date}
            hoverTextColor={project.hoverTextColor}
            hoverArrowColor={project.hoverArrowColor}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </section>
  );
}
