import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { editable as e } from "@theatre/r3f";

export default function Bracket({
  rotationSpeed = 0.25,
  rotationDirection = 1,
}) {
  const { nodes } = useGLTF("./models/predatorMountBracket.glb");
  const bracket = nodes.Scene.children[0].geometry;
  const bracketRef = useRef();

  // Move the pivot point of the bracket geometry
  // bracket.translate(0, -4, 0);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    bracketRef.current.rotation.y =
      elapsedTime * rotationSpeed * rotationDirection;
  });

  return (
    <group
      ref={bracketRef}
      theatreKey={"bracket"}
      scale={0.15}
      // rotation={[0, 1.2, 0]}
      position={[1, -4, -1.5]}
    >
      <mesh geometry={bracket}>
        <meshStandardMaterial
          color="#111111"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={0.8}
        />
      </mesh>
    </group>
  );
}
