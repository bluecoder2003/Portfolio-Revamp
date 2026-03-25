'use client'

import React from "react";
import { useRouter } from "next/navigation";
import ProjectComponent from "../custom/ProjectComponent";

const mockProjects = [
  {
    id: 1,
    title: "design : hiyn",
    description: "Hiyn empowers designers to rise through a dynamic creative hierarchy",
    date: "03/2025",
    imageSrc: "/h8.webp",
    className: "col-span-1 lg:col-span-6 h-[330px] md:h-[350px] lg:h-[500px]",
    tags: ["Hiyn", "Creative Platform"],
    route: "/projects/hiyn",
  },
  {
    id: 2,
    title: "design & dev : flint",
    description: "It's a platform that allows you to create and manage tasks.",
    date: "02/2025",
    imageSrc: "/f1.webp",
    className: "col-span-1 lg:col-span-6 h-[330px] md:h-[350px] lg:h-[500px]",
    tags: ["Flint", "Task Management"],
    route: "/projects/flint",
  },
  {
    id: 3,
    title: "design : safeve",
    description: "Report anonymously. Break the silence, not your privacy.",
    date: "01/2025",
    imageSrc: "/s10.webp",
    className: "col-span-1 lg:col-span-6 h-[330px] md:h-[350px] lg:h-[500px]",
    tags: ["Safeve", "Anonymous Reporting"],
    route: "/projects/safeve",
  },
  {
    id: 4,
    title: "design : vion",
    description: "Vion is a platform that helps you create and manage your tasks.",
    date: "02/2026",
    imageSrc: "/v5.webp",
    className: "col-span-1 lg:col-span-6 h-[330px] md:h-[350px] lg:h-[500px]",
    tags: ["Vion", "Audiobook Generation"],
    route: "/projects/vion",
  },
];

export default function ProjectSection() {
  const router = useRouter();

  return (
    <section className="w-full max-w-7xl mx-auto h-auto rounded-[16px] flex flex-col justify-between relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[10px] overflow-hidden relative">
        {mockProjects.map((project) => (
          <ProjectComponent
            key={project.id}
            className={project.className}
            imageSrc={project.imageSrc}
            projectTitle={project.title}
            projectDescription={project.description}
            projectDate={project.date}
            tags={project.tags}
            onClick={() => router.push(project.route)}
          />
        ))}
      </div>
    </section>
  );
}
