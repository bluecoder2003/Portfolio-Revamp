import React from "react";
import PlaygroundComponent from "../custom/PlaygroundComponent";
import { useModal } from "../context/ModalContext";


const mockProjects = [
  {
    id: 5,
    title: "DEVELOPMENT",
    description: "A credit card masking concept (built in Nextjs)",
    date: "03/2025",
    videoSrc: "/credit-card.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-7 h-[500px]",
  },
  {
    id: 6,
    title: "DESIGN",
    description: "A holographic logo design",
    date: "02/2025",
    imageSrc: "/luce-dark.webp",
    mediaType: "image" as const,
    className: "col-span-1 lg:col-span-5 h-[500px]",
    showMaximizeButton: true,
  },
  {
    id: 3,
    title: "DESIGN",
    description: "Pause before you reel: Because you deserve a guilty conscience 🤡",
    text: "What if every tap on the Reels button came with a sarcastic, guilt-inducing reality check? <br/> Say hello to brutally honest pop-ups that make you laugh, cringe, and maybe—just maybe—stop scrolling.",
    date: "01/2025",
    className: "col-span-1 lg:col-span-6 h-[500px]",
  },
  {
    id: 4,
    videoSrc: "/funny.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
  },
  {
    id: 1,
    title: "DEVELOPMENT",
    description: "Preloader Iteration",
    date: "02/2025",
    videoSrc: "/preloader.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
  },
  {
    id: 2,
    title: "DEVELOPMENT",
    description: "Just a potterhead (built in Nextjs)",
    date: "02/2025",
    videoSrc: "/potter.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
  },
  {
    id: 7,
    title: "DEVELOPMENT",
    description: "A custom button interaction",
    date: "03/2026",
    videoSrc: "/button.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    showRedirectButton: true,
    redirectLink: "https://design-gallery-one.vercel.app/",
  },
  {
    id: 8,
    title: "DEVELOPMENT",
    description: "A Naruto-inspired animation",
    date: "03/2026",
    videoSrc: "/naruto.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    showRedirectButton: true,
    redirectLink: "https://swab-paste-12055977.figma.site/",
  },
  {
    id: 9,
    title: "DESIGN",
    description: "Figma Makeathon 2026",
    date: "03/2026",
    videoSrc: "/figmamakeathon.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    showRedirectButton: true,
    redirectLink: "https://peony-candle-12655337.figma.site/",
  },
  {
    id: 10,
    title: "DEVELOPMENT",
    description: "Figma Build 2026",
    date: "03/2026",
    videoSrc: "/figbuild.webm",
    mediaType: "video" as const,
    className: "col-span-1 lg:col-span-6 h-[500px]",
    showRedirectButton: true,
    redirectLink: "https://visor-jade-40774028.figma.site/",
  },
];

export default function PlaygroundSection() {
  const { openModal } = useModal();

  const handleMaximizeClick = (projectId: number) => {
    if (projectId === 2) {
      openModal();
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto h-auto rounded-[16px] flex flex-col justify-between relative">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[10px] overflow-hidden relative">
        {[...mockProjects].sort((a, b) => b.id - a.id).map((project) => (
          <PlaygroundComponent
            key={project.id}
            className={project.className}
            imageSrc={project.imageSrc}
            videoSrc={project.videoSrc}
            mediaType={project.mediaType}
            projectTitle={project.title}
            projectDescription={project.description}
            projectText={project.text}
            projectDate={project.date}
            showMaximizeButton={project.showMaximizeButton}
            showRedirectButton={project.showRedirectButton}
            redirectLink={project.redirectLink}
            onMaximizeClick={() => handleMaximizeClick(project.id)}
          />
        ))}
      </div>
    </section>
  );
}
