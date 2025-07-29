'use client';

import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';

const Rive = () => {
  const STATE_MACHINE_NAME = "State Machine 1"; 
  const INPUT_NAME = "Hover";

  const { rive, RiveComponent } = useRive({
    src: "/animations/blue-dot.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Fill,
      alignment: Alignment.Center,
    }),
  });

  const hoverInput = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_NAME);

  return (
    <div
      onMouseEnter={() => hoverInput && (hoverInput.value = true)}
      onMouseLeave={() => hoverInput && (hoverInput.value = false)}
      className="w-full max-w-[1280px] mx-auto"
    >
      <RiveComponent style={{ width: '100%', height: '200px' }} />
    </div>
  );
};

export default Rive;

