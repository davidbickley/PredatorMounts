// Experience.jsx

import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useHelper,
  useScroll,
} from "@react-three/drei";
import {
  editable as e,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import { val } from "@theatre/core";

import { config } from "./config";

import Bracket from "./components/Bracket";
import Logo from "./components/Logo";
import LogoText from "./components/LogoText";

function CameraHelper() {
  const camera = useThree((state) => state.camera);
  useHelper(camera, THREE.CameraHelper);
  return null;
}

export default function Experience({
  onSectionChange,
  onSectionAnimationComplete,
}) {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const cameraTargetRef = useRef();
  const [introComplete, setIntroComplete] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const [activeComponents, setActiveComponents] = useState([]);

  useEffect(() => {
    sheet.sequence
      .play({
        range: [0, 1], // Play the intro animation
      })
      .then(() => {
        setIntroComplete(true); // Set the state variable to true when the intro animation is complete
        sheet.sequence.position = 1 + 10 / 30; // Set the position of the animation to the end of the intro
        setCurrentSection(config.sections[0].name); // Set the current section to 'Intro'
        console.log("Current section:", config.sections[0].name); // Log the 'Intro' sectio
      });
  }, [sheet.sequence]);

  useFrame(() => {
    if (introComplete) {
      const sequenceLength = val(sheet.sequence.pointer.length);
      const position = 1 + scroll.offset * (sequenceLength - 1);
      sheet.sequence.position = position;

      let newSection = null;

      for (const section of config.sections) {
        if (position >= section.range[0] && position < section.range[1]) {
          newSection = section;

          if (position >= section.range[1] - 0.01) {
            sheet.sequence.pause();
            onSectionFinish(newSection.name);
          } else {
            sheet.sequence.play();
          }
          break;
        }
      }

      if (newSection && newSection.name !== currentSection) {
        setCurrentSection(newSection.name);
        console.log("Current section:", newSection.name);
        onSectionChange(newSection.name);

        if (
          currentSection &&
          position <
            config.sections.find((section) => section.name === currentSection)
              .range[0] +
              0.1
        ) {
          // If scrolling back up, immediately pause the animation and update the section
          sheet.sequence.pause();
          onSectionFinish(newSection.name);
        }
      }
    }
  });

  const onSectionFinish = (section) => {
    // Update the activeComponents state based on the finished section
    switch (section) {
      case "Intro":
        setActiveComponents([]);
        break;
      case "Section1":
        setActiveComponents(["Section1"]);
        break;
      case "Section2":
        setActiveComponents(["Section2"]);
        break;
      default:
        setActiveComponents([]);
    }

    // Check if scrolling back up and hide the previous section earlier
    if (
      currentSection &&
      section !== currentSection &&
      config.sections.findIndex((s) => s.name === section) <
        config.sections.findIndex((s) => s.name === currentSection)
    ) {
      setActiveComponents([]);
    }

    onSectionAnimationComplete(section);
  };

  return (
    <>
      <color args={["#000"]} attach={"background"} />
      <Environment preset="city" blur={0.5} />
      <PerspectiveCamera
        position={[0.05, 0, 4.1]}
        fov={30}
        near={0.1}
        makeDefault
        theatreKey="Camera"
        lookAt={cameraTargetRef}
      />
      <e.mesh
        theatreKey="Camera Target"
        ref={cameraTargetRef}
        visible={"editor"}
      >
        <octahedronGeometry args={[0.1, 0]} />
        <meshPhongMaterial color="yellow" />
      </e.mesh>
      <CameraHelper />
      <e.directionalLight
        theatreKey="mainLight"
        position={[-6.31, 9.89, -12.94]}
        angle={0.15}
        intensity={10}
        penumbra={1}
      />
      <ambientLight intensity={0.5} />
      <e.group
        theatreKey={"rightBracket"}
        rotation={[0, 0, -0.35]}
        position={[1, 1.55, 0]}
      >
        <Bracket rotationSpeed={0.075} rotationDirection={1} />
      </e.group>
      <e.group
        theatreKey={"leftBracket"}
        rotation={[0, -0.25, 0.35]}
        position={[-3.55, 1.25, -1.85]}
      >
        <Bracket rotationSpeed={0.05} rotationDirection={1} />
      </e.group>
      <e.group
        theatreKey={"logo"}
        position={[0, 0.25, -1.61]}
        rotation={[1.84, 0, 0.01]}
        scale={1}
      >
        <Logo />
      </e.group>
      <group rotation={[Math.PI * 0.49, 0, 0]} position={[0.04, -0.15, -1.5]}>
        <LogoText />
      </group>
      {/* 
      {activeComponents.includes("Section1") && <Section1 />}
      {activeComponents.includes("Section2") && <Section2 />} */}

      {/* <OrbitControls /> */}
    </>
  );
}
