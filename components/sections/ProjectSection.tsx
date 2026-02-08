import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectComponent from "../custom/ProjectComponent";

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: "design : hiyn",
    description: "Hiyn empowers designers to rise through a dynamic creative hierarchy",
    date: "03/2025",
    imageSrc: "/hiyn-proj.webp",
    imagePosition: "!bottom-0 !w-[300px] !h-[200px] md:!w-[350px] md:!h-[200px] lg:!w-[450px] lg:!h-[300px]",
    className: "hover:bg-[#6C1200] hover:text-white col-span-1 lg:col-span-6 h-[330px] md:h-[350px] lg:h-[454px]",
    hoverTextColor: "text-white",
    hoverArrowColor: "text-black",
    route: "/hiyn",
  },
  {
    id: 2,
    title: "design & dev : flint",
    description: "It's a platform that allows you to create and manage tasks.",
    date: "02/2025",
    imageSrc: "/flint-proj.webp",
    imagePosition: "!bottom-0 w-full h-auto",
    className: "hover:bg-[#2D037E] hover:text-white col-span-1 lg:col-span-6 h-[330px] md:h-[350px] lg:h-[454px]",
    hoverTextColor: "text-white",
    hoverArrowColor: "text-purple-700",
    route: "/flint",
  },
  {
    id: 3,
    title: "design : safeve",
    description: "Report anonymously. Break the silence, not your privacy.",
    date: "01/2025",
    imageSrc: "/safeve-proj.webp",
    imagePosition: "!bottom-0 w-full h-auto lg:!w-[650px] lg:!h-[300px]",
    className: "hover:bg-[#C31D02] hover:text-white col-span-1 lg:col-span-6 h-[330px] md:h-[350px] lg:h-[454px]",
    hoverTextColor: "text-white",
    hoverArrowColor: "text-purple-700",
    route: "/safeve",
  },
  {
    id: 1,
    title: "design : vion",
    description: "Vion is a platform that helps you create and manage your tasks.",
    date: "02/2026",
    imageSrc: "/vion.webp",
    imagePosition: "!bottom-0 !w-[300px] !h-[200px] md:!w-[350px] md:!h-[200px] lg:!w-fit lg:!h-[300px]",
    className: "hover:bg-[#093FB4] hover:text-white col-span-1 lg:col-span-6 h-[330px] md:h-[350px] lg:h-[454px]",
    hoverTextColor: "text-white",
    hoverArrowColor: "text-black",
    route: "/vion",
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
