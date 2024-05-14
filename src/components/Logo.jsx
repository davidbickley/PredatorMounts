import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { editable as e } from "@theatre/r3f";

export default function Logo() {
  const { nodes } = useGLTF("./models/predatorMountLogo.glb");
  const logo = nodes.Scene.children[0].geometry;
  const logoRef = useRef();

  // Move the pivot point of the logo geometry
  logo.translate(0, 0, 0);

  return (
    <group ref={logoRef} scale={0.15} rotation={[0, 0, 0]}>
      <mesh geometry={logo}>
        <meshStandardMaterial
          color="#683e98"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={0.8}
        />
      </mesh>
    </group>
  );
}
