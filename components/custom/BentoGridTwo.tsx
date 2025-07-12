import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

export function BentoGridSecondDemo() {
  return (
    <BentoGrid className="mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          date={item.date}
          image={item.image}
        />
      ))}
    </BentoGrid>
  );
}
const items = [
  {
    title: "The Dawn of Innovation",
    date: "2025-01-01",
    image: "/about-one.png",
  },
  {
    title: "The Digital Revolution",
    date: "2025-01-01",
    image: "/about-two.png",
  },
  {
    title: "The Art of Design",
    date: "2025-01-01",
    image: "/about-three.png",
  },
  {
    title: "The Power of Communication",
    date: "2025-01-01",
    image: "/about-one.png",
  },
];
