import React, { useState } from "react";
import PlaygroundComponent from "../custom/PlaygroundComponent";
import PlaygroundModal from "../custom/PlaygroundModal";
import { AnimatePresence } from "framer-motion";

type Project = {
  id: number;
  title?: string;
  description?: string;
  text?: string;
  date?: string;
  imageSrc?: string;
  videoSrc?: string;
  mediaType?: "image" | "video";
  className: string;
  tags?: string[];
  redirectLink?: string;
};

const mockProjects: Project[] = [
  {
    id: 5,
    title: "DEVELOPMENT",
    description: "A credit card masking concept (built in Nextjs)",
    date: "03/2025",
    videoSrc: "/credit-card.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-7 h-[500px]",
    tags: ["Credit Card", "Next.js", "Development", "2025"],
  },
  {
    id: 6,
    title: "DESIGN",
    description: "A holographic logo design",
    date: "02/2025",
    imageSrc: "/luce-dark.webp",
    mediaType: "image" as const,
    className: "col-span-1 lg:col-span-5 h-[500px]",
    tags: ["Logo Design", "Holographic", "Branding", "2025"],
  },
  {
    id: 3,
    title: "DESIGN",
    description: "Pause before you reel: Because you deserve a guilty conscience",
    text: "What if every tap on the Reels button came with a sarcastic, guilt-inducing reality check? <br/> Say hello to brutally honest pop-ups that make you laugh, cringe, and maybe—just maybe—stop scrolling.",
    date: "01/2025",
    className: "col-span-1 lg:col-span-6 h-[500px]",
    tags: ["UX Concept", "Design", "Social Media", "2025"],
  },
  {
    id: 4,
    title: "DESIGN",
    description: "Pause before you reel: Because you deserve a guilty conscience",
    text: "What if every tap on the Reels button came with a sarcastic, guilt-inducing reality check? <br/> Say hello to brutally honest pop-ups that make you laugh, cringe, and maybe—just maybe—stop scrolling.",
    videoSrc: "/funny.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    tags: ["Fun", "Video"],
    redirectLink: "https://www.ridiculous.design/ridiculous-shots",
  },
  {
    id: 1,
    title: "DEVELOPMENT",
    description: "Preloader Iteration",
    date: "02/2025",
    videoSrc: "/preloader.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    tags: ["Preloader", "Animation", "Development", "2025"],
  },
  {
    id: 2,
    title: "DEVELOPMENT",
    description: "Just a potterhead (built in Nextjs)",
    date: "02/2025",
    videoSrc: "/potter.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    tags: ["Harry Potter", "Next.js", "Development", "2025"],
  },
  {
    id: 7,
    title: "DEVELOPMENT",
    description: "A custom button interaction",
    date: "03/2026",
    videoSrc: "/button.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    redirectLink: "https://design-gallery-one.vercel.app/",
    tags: ["Button", "Interaction", "Development", "2026"],
  },
  {
    id: 8,
    title: "DEVELOPMENT",
    description: "A Naruto-inspired animation",
    date: "03/2026",
    videoSrc: "/naruto.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    redirectLink: "https://swab-paste-12055977.figma.site/",
    tags: ["Naruto", "Animation", "Development", "2026"],
  },
  {
    id: 9,
    title: "DESIGN",
    description: "Figma Makeathon 2026",
    date: "03/2026",
    videoSrc: "/figmamakeathon.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    redirectLink: "https://peony-candle-12655337.figma.site/",
    tags: ["Figma", "Makeathon", "Design", "2026"],
  },
  {
    id: 10,
    title: "DEVELOPMENT",
    description: "Figma Build 2026",
    date: "03/2026",
    videoSrc: "/figbuild.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    redirectLink: "https://visor-jade-40774028.figma.site/",
    tags: ["Figma", "Build", "Development", "2026"],
  },
];

export default function PlaygroundSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="w-full max-w-7xl mx-auto h-auto rounded-[16px] flex flex-col justify-between relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[10px] overflow-hidden relative">
          {[...mockProjects].sort((a, b) => b.id - a.id).map((project) => (
            <PlaygroundComponent
              key={project.id}
              id={project.id}
              className={project.className}
              imageSrc={project.imageSrc}
              videoSrc={project.videoSrc}
              mediaType={project.mediaType}
              projectTitle={project.title}
              projectDescription={project.description}
              projectText={project.text}
              projectDate={project.date}
              tags={project.tags}
              redirectLink={project.redirectLink}
              onClick={
                project.imageSrc || project.videoSrc
                  ? () => setSelectedProject(project)
                  : undefined
              }
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <PlaygroundModal
              isOpen
              onClose={() => setSelectedProject(null)}
              projectId={selectedProject.id}
              title={selectedProject.title}
              description={selectedProject.description}
              text={selectedProject.text}
              videoSrc={selectedProject.videoSrc}
              imageSrc={selectedProject.imageSrc}
              mediaType={selectedProject.mediaType}
              redirectLink={selectedProject.redirectLink}
            />
          )}
        </AnimatePresence>
    </section>
  );
}
