'use client'

import React, { useState } from "react";
import PlaygroundComponent from "../custom/PlaygroundComponent";
import PlaygroundModal from "../custom/PlaygroundModal";
import Modal from "../custom/Modal";
import { AnimatePresence } from "framer-motion";

type Project = {
  id: number;
  title?: string;
  description?: string;
  text?: string;
  date?: string;
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  mediaType?: "image" | "video";
  className: string;
  tags?: string[];
  redirectLink?: string;
  useLuceModal?: boolean;
};

const mockProjects: Project[] = [
  {
    id: 12,
    title: "VectorDrop",
    description: "a browser tool that turns raster PNGs and JPGs into clean editable SVGs in seconds.",
    date: "05/2026",
    videoSrc: "/vectordrop-hero.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    redirectLink: "https://www.vectordrop.co.in/",
    tags: ["Raster to Vector", "SVG", "Web Tool"],
  },
  {
    id: 11,
    title: "Lynart",
    description: "a small line-art study where flowers bloom into vector strokes, vibe-coded on lovable.",
    date: "05/2026",
    videoSrc: "/flower-lovable.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    redirectLink: "https://line-art.lovable.app/",
    tags: ["Line Art", "Lovable", "Generative"],
  },
  {
    id: 5,
    title: "Credit Card Masking",
    description: "card numbers stay hidden by default and reveal on hover.",
    date: "03/2025",
    videoSrc: "/credit-card.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-7 h-[500px]",
    tags: ["Credit Card", "Next.js", "Development"],
  },
  {
    id: 6,
    title: "Logo Iteration",
    description: "a non-mainstream logo study driven by intentional decisions.",
    date: "02/2025",
    imageSrc: "/luce-web.webp",
    mediaType: "image" as const,
    className: "col-span-1 lg:col-span-5 h-[500px]",
    tags: ["Logo Design", "Holographic", "Branding"],
    useLuceModal: true,
  },
  {
    id: 1,
    title: "Wind Hashira Prelude",
    description: "a preloader built around a subtle wind motif.",
    date: "02/2025",
    videoSrc: "/preloader.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    tags: ["Preloader", "Wind Hashira"],
  },
  {
    id: 2,
    title: "Just a Potterhead",
    description: "how the spell Aparecium will actually work in real life",
    date: "02/2025",
    videoSrc: "/potter.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    tags: ["Harry Potter", "Aparecium"],
  },
  {
    id: 10,
    title: "Randomness as Inspiration",
    description: "a simple idea: one click, one randomly curated website, built to break creative blocks.",
    date: "03/2026",
    videoSrc: "/button.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    redirectLink: "https://design-gallery-one.vercel.app/",
    tags: ["Button Interaction", "Randomness"],
  },
  {
    id: 8,
    title: "Anime Portfolio Iteration",
    description: "a cozy anime-themed desk setup with where you can move your things around",
    date: "03/2026",
    videoSrc: "/naruto.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    redirectLink: "https://swab-paste-12055977.figma.site/",
    tags: ["Naruto", "SetUp Animation", ],
  },
  {
    id: 9,
    title: "Sound, Made Visible",
    description: "a digital take on classic vibration experiments, audio transformed into real-time generative patterns.",
    date: "03/2026",
    videoSrc: "/figmamakeathon.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    redirectLink: "https://peony-candle-12655337.figma.site/",
    tags: ["Figma Makeathon", "2026"],
  },
  {
    id: 7,
    title: "SOMA, Decoding Discomfort",
    description: "an AR concept that translates stress signals into guided pressure-point relief",
    date: "03/2026",
    videoSrc: "/figbuild.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    redirectLink: "https://visor-jade-40774028.figma.site/",
    tags: ["Figma Build", "2026"],
  },
];

export default function PlaygroundSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLuceModalOpen, setIsLuceModalOpen] = useState(false);

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
              posterSrc={project.posterSrc}
              mediaType={project.mediaType}
              projectTitle={project.title}
              projectDescription={project.description}
              projectText={project.text}
              projectDate={project.date}
              tags={project.tags}
              redirectLink={project.redirectLink}
              onClick={
                project.useLuceModal
                  ? () => setIsLuceModalOpen(true)
                  : project.imageSrc || project.videoSrc
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

        <Modal isOpen={isLuceModalOpen} onClose={() => setIsLuceModalOpen(false)} />
    </section>
  );
}
