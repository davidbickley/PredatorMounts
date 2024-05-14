// App.jsx
import "./App.css";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import { SheetProvider } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";

import Experience from "./Experience";

import projestState from "./assets/predator.theatre-project-state.json";

export const isProd = import.meta.env.MODE === "production";

const project = getProject(
  "predator",
  isProd ? { state: projestState } : undefined
);
const mainSheet = project.sheet("Main");

if (!isProd) {
  studio.initialize();
  studio.extend(extension);
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Intro");
  const [targetScreen, setTargetScreen] = useState("Screen1");

  return (
    <>
      <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
        <ScrollControls pages={3} damping={0.5}>
          <SheetProvider sheet={mainSheet}>
            <Experience />
          </SheetProvider>
        </ScrollControls>
      </Canvas>
    </>
  );
}
