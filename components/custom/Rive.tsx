'use client';

import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import React from 'react';

interface RiveProps {
  currentSection?: string;
}

const Rive = ({ currentSection = "playground" }: RiveProps) => {
  const STATE_MACHINE_NAME = "State Machine 1";
  const HOVER_INPUT_NAME = "Hover";
  const NAVIGATION_INPUT_NAME = "Navigation";

  const { rive, RiveComponent } = useRive({
    src: "/animations/blue-dot.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Fill,
      alignment: Alignment.Center,
    }),
  });

  const hoverInput = useStateMachineInput(rive, STATE_MACHINE_NAME, HOVER_INPUT_NAME);
  const navigationInput = useStateMachineInput(rive, STATE_MACHINE_NAME, NAVIGATION_INPUT_NAME);

  React.useEffect(() => {
    if (navigationInput && rive) {
      const sectionMap: { [key: string]: number } = {
        playground: 0,
        projects: 1,
        person: 2,
        connect: 3,
      };
      navigationInput.value = sectionMap[currentSection] || 0;
    }
  }, [currentSection, navigationInput, rive]);

  const handleMouseEnter = () => {
    if (hoverInput && rive) {
      hoverInput.value = true;
    }
  };

  const handleMouseLeave = () => {
    if (hoverInput && rive) {
      hoverInput.value = false;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-[1280px] mx-auto cursor-pointer overflow-hidden"
    >
      <RiveComponent
        style={{ width: '100%', height: '500px' }}
        className="h-[200px] md:h-[450px] lg:h-[500px]"
      />
    </div>
  );
};

export default Rive;
