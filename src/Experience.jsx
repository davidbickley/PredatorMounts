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

import Bracket from "./components/Bracket";
import Logo from "./components/Logo";
import LogoText from "./components/LogoText";

function CameraHelper() {
  const camera = useThree((state) => state.camera);
  useHelper(camera, THREE.CameraHelper);
  return null;
}

export default function Experience() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const cameraTargetRef = useRef();
  const [introComplete, setIntroComplete] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("Intro");
  const [targetScreen, setTargetScreen] = useState("Screen1");

  const isSetup = useRef(false);

  const sections = {
    Intro: [0, 1],
    Section1: [2, 2 + 21 / 30],
    Section2: [3, 4],
  };

  useEffect(() => {
    sheet.sequence
      .play({
        range: [0, 1], // Play the intro animation
      })
      .then(() => {
        setIntroComplete(true); // Set the state variable to true when the intro animation is complete
        sheet.sequence.position = 2; // Set the position of the animation to the end of the intro
      });

    isSetup.current = true;
  }, [sheet.sequence]);

  // Will run every frame
  useFrame(() => {
    if (introComplete) {
      const sequenceLength = val(sheet.sequence.pointer.length);
      const position = 2 + scroll.offset * (sequenceLength - 2);
      sheet.sequence.position = position;

      for (const [frame, range] of Object.entries(sections)) {
        if (position >= range[0] && position < range[1]) {
          setCurrentFrame(frame);

          // Check if the scroll position has reached the end of the section
          if (position >= range[1] - 0.01) {
            // Pause the animation
            sheet.sequence.pause();
          } else {
            // Resume the animation
            sheet.sequence.play();
          }
          break;
        }
      }
    }
  });

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
      {/* <OrbitControls /> */}
    </>
  );
}
