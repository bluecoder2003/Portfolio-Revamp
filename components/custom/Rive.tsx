'use client';

import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import React from 'react';

interface RiveProps {
  currentSection?: string;
}

const Rive = ({ currentSection = "playground" }: RiveProps) => {
  const STATE_MACHINE_NAME = "State Machine 1"; 
  const HOVER_INPUT_NAME = "Hover";
  const NAVIGATION_INPUT_NAME = "Navigation"; // Add navigation input if it exists in your Rive file

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

  // Debug: Log available inputs when Rive loads
  React.useEffect(() => {
    if (rive) {
      console.log('Rive loaded successfully');
      console.log('Available state machines:', rive.stateMachineNames);
      // Note: We can't directly access input names, but we can see if our inputs work
    }
  }, [rive]);

  // Handle navigation state changes
  React.useEffect(() => {
    if (navigationInput && rive) {
      try {
        // Trigger navigation animation based on current section
        const sectionMap: { [key: string]: number } = {
          playground: 0,
          projects: 1,
          person: 2,
          connect: 3,
        };
        const sectionValue = sectionMap[currentSection] || 0;
        navigationInput.value = sectionValue;
        console.log(`Navigation changed to: ${currentSection} (value: ${sectionValue})`);
      } catch (error) {
        console.log('Navigation input not available in Rive file:', error);
      }
    }
  }, [currentSection, navigationInput, rive]);

  const handleMouseEnter = () => {
    if (hoverInput && rive) {
      try {
        hoverInput.value = true;
        console.log('Hover started');
      } catch (error) {
        console.log('Hover input not available in Rive file:', error);
      }
    }
  };

  const handleMouseLeave = () => {
    if (hoverInput && rive) {
      try {
        hoverInput.value = false;
        console.log('Hover ended');
      } catch (error) {
        console.log('Hover input not available in Rive file:', error);
      }
    }
  };

  return (
    <>
      {/* Resource hint for LCP optimization */}
      <link rel="preload" href="/animations/blue-dot.riv" as="fetch" crossOrigin="anonymous" />
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-[1280px] mx-auto cursor-pointer overflow-hidden"
        data-fetchpriority="high"
      >
        <RiveComponent 
          style={{ width: '100%', height: '500px' }} 
          className="h-[200px] md:h-[450px] lg:h-[500px]"
        />
      </div>
    </>
  );
};

export default Rive;

