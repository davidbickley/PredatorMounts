// App.jsx
import "./App.css";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import { SheetProvider } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";

import { config } from "./config";
import Experience from "./Experience";

import projestState from "./assets/predator.theatre-project-state.json";
import { UI } from "./components/UI";

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
  const [currentSection, setCurrentSection] = useState(config.sections[0].name);
  const [isSectionAnimationComplete, setIsSectionAnimationComplete] =
    useState(false);

  const onSectionChange = (section) => {
    setCurrentSection(section);
    setIsSectionAnimationComplete(false); // Set isSectionAnimationComplete to false when the section changes
  };

  const onSectionAnimationComplete = (section) => {
    setIsSectionAnimationComplete(true); // Set isSectionAnimationComplete to true when a section animation finishes
  };

  const scrollToSection = (sectionName) => {
    const sectionIndex = config.sections.findIndex(
      (section) => section.name === sectionName
    );
    if (sectionIndex !== -1) {
      const scrollPosition = sectionIndex / (config.sections.length - 1);
      window.scrollTo({
        top: scrollPosition * document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Canvas
        width={window.innerWidth}
        height={window.innerHeight}
        shadows
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ScrollControls
          pages={config.sections.length}
          damping={0.5}
          maxSpeed={0.2}
          width={window.innerWidth}
        >
          <SheetProvider sheet={mainSheet}>
            <Experience
              onSectionChange={onSectionChange}
              onSectionAnimationComplete={onSectionAnimationComplete}
            />
          </SheetProvider>
        </ScrollControls>
      </Canvas>
      <UI
        currentSection={currentSection}
        onSectionChange={onSectionChange}
        scrollToSection={scrollToSection}
      />
    </>
  );
}
