import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectComponent from "../custom/ProjectComponent";

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: "DESIGN : Hiyn",
    description: "Hiyn empowers designers to rise through a dynamic creative hierarchy",
    date: "03/2025",
    imageSrc: "/hiyn.png",
    imagePosition: "!bottom-0 !right-0 !w-[300px] !h-[300px]",
    className: "hover:bg-[#6C1200] hover:text-white col-span-1 lg:col-span-6 h-[454px]",
    hoverTextColor: "text-white",
    hoverArrowColor: "text-black",
    route: "/hiyn",
  },
  {
    id: 2,
    title: "DES & DEV : Flint",
    description: "It's a platform that allows you to create and manage tasks.",
    date: "02/2025",
    imageSrc: "/flint.png",
    imagePosition: "!bottom-0 !right-0 !w-[500px] !h-[300px]",
    className: "hover:bg-[#2D037E] hover:text-white col-span-1 lg:col-span-6 h-[454px]",
    hoverTextColor: "text-white",
    hoverArrowColor: "text-purple-700",
    route: "/flint",
  },
  {
    id: 3,
    title: "DESIGN : Safeve",
    description: "Report anonymously. Break the silence, not your privacy.",
    date: "01/2025",
    imageSrc: "/safeve.png",
    imagePosition: "!bottom-0 !right-0 !w-[500px] !h-[300px] lg:h-[400px]",
    className: "hover:bg-[#DD3418] hover:text-white col-span-1 lg:col-span-8 h-[454px]",
    hoverTextColor: "text-white",
    hoverArrowColor: "text-purple-700",
    route: "/safeve",
  },
  {
    id: 4,
    title: "DESIGN : Vion",
    description: "Tool that helps you listen to ai generated audiobooks",
    date: "12/2024",
    // imageSrc: "/vng.svg",
    imagePosition: "!bottom-0 !right-0",
    className: "col-span-1 lg:col-span-4 h-[454px]",
    // hoverTextColor: "text-white",
    hoverArrowColor: "text-purple-700",
  },
];

export default function ProjectSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const router = useRouter();

  const handleProjectClick = (route: string) => {
    router.push(route);
  };

  return (
    <section className="w-full max-w-7xl mx-auto h-auto rounded-[16px] flex flex-col justify-between relative">
      {hoveredId !== null && (
        <div className="fixed inset-0 bg-[#E6E6E6]/70 z-30 transition-all duration-400 ease-out pointer-events-none rounded-2xl" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[10px] overflow-hidden relative">
        {mockProjects.map((project) => (
          <ProjectComponent
            key={project.id}
            className={project.className + (hoveredId === project.id ? " shadow-2xl transition-all duration-400 ease-out z-40" : " z-10")}
            imagePosition={project.imagePosition}
            imageSrc={project.imageSrc}
            projectTitle={project.title}
            projectDescription={project.description}
            projectDate={project.date}
            hoverTextColor={project.hoverTextColor}
            hoverArrowColor={project.hoverArrowColor}
            route={project.route}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => project.route && handleProjectClick(project.route)}
          />
        ))}
      </div>
    </section>
  );
}
