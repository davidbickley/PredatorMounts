import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import { editable as e } from "@theatre/r3f";

function Letter({ mesh, material }) {
  const ref = useRef();

  React.useEffect(() => {
    if (mesh) {
      mesh.material = material;
    }
  }, [mesh, material]);

  return <primitive ref={ref} object={mesh} />;
}

export default function LogoText() {
  const logoText = useGLTF("./models/predatorMountText.glb");

  const [meshes, setMeshes] = React.useState([]);

  React.useEffect(() => {
    if (logoText) {
      const scene = logoText.nodes.Scene;
      const clonedMeshes = scene.children.map((child) => {
        const mesh = child.clone();
        mesh.position.copy(child.position).multiplyScalar(0.00425); // Scale down the position
        return mesh;
      });
      setMeshes(clonedMeshes);
    }
  }, [logoText]);

  // Create a custom material
  const customMaterial = new THREE.MeshStandardMaterial({
    color: "#fff",
    emissive: "#fff",
    emissiveIntensity: 0.75,
    metalness: 0.1,
    roughness: 0.1,
    envMapIntensity: 1.5,
  });

  return (
    <e.group theatreKey="Text - Complete">
      {meshes.map((mesh, index) => (
        <e.mesh
          key={index}
          theatreKey={`${mesh.name}`}
          geometry={mesh.geometry}
          material={customMaterial}
          position={mesh.position}
        />
      ))}
    </e.group>
  );
}
