import * as THREE from "three";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { Text, Image, Html, useGLTF } from "@react-three/drei";

const PortfolioCard3D = ({ cardData }) => {
  /**
   * Handle Data
   */

  const icon = useGLTF(cardData.modelPath);
  const noteFile = useGLTF("./models/blankNote_02.glb");

  const note = noteFile.nodes.Scene.children[0].geometry;

  console.log(icon);

  /**
   * Create References
   */
  const cardRef = useRef();
  const iconRef = useRef();
  const buttonRef = useRef();
  const textRef = useRef();
  const cardPositionRef = useRef([0, 0, -0.5]);

  /**
   * Create States
   */
  const [cardHovered, setCardHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [textHovered, setTextHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Animate Card position and rotation when hovered
    if (cardHovered) {
      cardRef.current.position.z = THREE.MathUtils.lerp(
        cardRef.current.position.z,
        0.5,
        0.1
      );
      cardRef.current.position.y = THREE.MathUtils.lerp(
        cardRef.current.position.y,
        0.5,
        0.1
      );
      cardRef.current.rotation.x = THREE.MathUtils.lerp(
        cardRef.current.rotation.x,
        -Math.PI * 0.01,
        0.1
      );
      cardRef.current.rotation.y = THREE.MathUtils.lerp(
        cardRef.current.rotation.y,
        -Math.PI * 0.01,
        0.1
      );
      cardRef.current.rotation.z = THREE.MathUtils.lerp(
        cardRef.current.rotation.z,
        -Math.PI * 0.1,
        0.1
      );

      // Handle Icon - onHover position
      iconRef.current.position.x = THREE.MathUtils.lerp(
        iconRef.current.position.x,
        -0.1,
        0.1
      );
      iconRef.current.position.y = THREE.MathUtils.lerp(
        iconRef.current.position.y,
        1.5,
        0.1
      );
      iconRef.current.position.z = THREE.MathUtils.lerp(
        iconRef.current.position.z,
        0.75,
        0.1
      );
      iconRef.current.rotation.x = THREE.MathUtils.lerp(
        iconRef.current.rotation.x,
        1.3,
        0.1
      );
      iconRef.current.rotation.y = THREE.MathUtils.lerp(
        iconRef.current.rotation.y,
        5,
        0.1
      );
      iconRef.current.rotation.z = THREE.MathUtils.lerp(
        iconRef.current.rotation.z,
        Math.PI * 0.5,
        0.1
      );
    } else {
      // Smoothly animate the card position and rotation back to the original values when not hovered
      cardRef.current.position.z = THREE.MathUtils.lerp(
        cardRef.current.position.z,
        -0.5,
        0.1
      );
      cardRef.current.position.y = THREE.MathUtils.lerp(
        cardRef.current.position.y,
        0,
        0.1
      );
      cardRef.current.rotation.x = THREE.MathUtils.lerp(
        cardRef.current.rotation.x,
        0,
        0.1
      );
      cardRef.current.rotation.y = THREE.MathUtils.lerp(
        cardRef.current.rotation.y,
        0,
        0.1
      );
      cardRef.current.rotation.z = THREE.MathUtils.lerp(
        cardRef.current.rotation.z,
        0,
        0.1
      );

      // Handle Icon - original position
      iconRef.current.position.x = THREE.MathUtils.lerp(
        iconRef.current.position.x,
        1.05,
        0.1
      );
      iconRef.current.position.y = THREE.MathUtils.lerp(
        iconRef.current.position.y,
        1.25,
        0.1
      );
      iconRef.current.position.z = THREE.MathUtils.lerp(
        iconRef.current.position.z,
        0.45,
        0.1
      );
      iconRef.current.rotation.x = THREE.MathUtils.lerp(
        iconRef.current.rotation.x,
        0,
        0.1
      );
      iconRef.current.rotation.y = THREE.MathUtils.lerp(
        iconRef.current.rotation.y,
        0,
        0.1
      );
      iconRef.current.rotation.z = THREE.MathUtils.lerp(
        iconRef.current.rotation.z,
        0.65,
        0.1
      );
    }

    // Animate icon
    if (iconHovered) {
      iconRef.current.position.y += 0.01;
    }

    // Animate text
    if (textHovered) {
      textRef.current.position.y = Math.sin(t * 2) * 0.05 + 0.8;
    }

    // Animate button
    if (buttonHovered) {
      // Scale up the button
      buttonRef.current.scale.setScalar(
        THREE.MathUtils.lerp(buttonRef.current.scale.x, 1.25, 0.1)
      );

      // Move the button slightly toward camera
      buttonRef.current.position.set(
        THREE.MathUtils.lerp(buttonRef.current.position.x, 0, 0.1),
        THREE.MathUtils.lerp(buttonRef.current.position.y, -1, 0.1),
        THREE.MathUtils.lerp(buttonRef.current.position.z, 0.5, 0.1)
      );

      // Adjust the button's rotation
      buttonRef.current.rotation.z = THREE.MathUtils.lerp(
        buttonRef.current.rotation.z,
        Math.PI * 0.1,
        0.1
      );
      buttonRef.current.rotation.x = THREE.MathUtils.lerp(
        buttonRef.current.rotation.x,
        Math.PI * 1.99,
        0.1
      );
    } else {
      // Scale down the button
      buttonRef.current.scale.setScalar(
        THREE.MathUtils.lerp(buttonRef.current.scale.x, 1, 0.1)
      );

      // Move the button back to its original position
      buttonRef.current.position.set(
        THREE.MathUtils.lerp(buttonRef.current.position.x, 0, 0.1),
        THREE.MathUtils.lerp(buttonRef.current.position.y, -1.05, 0.1),
        THREE.MathUtils.lerp(buttonRef.current.position.z, 0.06, 0.1)
      );

      // Adjust the button's rotation
      buttonRef.current.rotation.z = THREE.MathUtils.lerp(
        buttonRef.current.rotation.z,
        0,
        0.1
      );
      buttonRef.current.rotation.x = THREE.MathUtils.lerp(
        buttonRef.current.rotation.x,
        0,
        0.1
      );
    }
  });

  return (
    <group
      ref={cardRef}
      castShadow
      receiveShadow
      rotation={[0, 0, 0]}
      onPointerOver={() => setCardHovered(true)}
      onPointerOut={() => setCardHovered(false)}
      onClick={() => {
        if (cardData.url) {
          window.open(cardData.url, "_blank");
        }
      }}
    >
      <mesh
        geometry={note}
        castShadow
        receiveShadow
        scale={[15, 10, 22.5]}
        position={[0, -0.35, -0.06]}
        rotation={[Math.PI * 0.5, 0, 0]}
      >
        <meshStandardMaterial color={cardHovered ? "#fff" : "#feff9c"} />
      </mesh>

      {/* Icon */}
      <group
        ref={iconRef}
        castShadow
        receiveShadow
        position={[1.05, 1.5, 0.75]}
        rotation={[0, 0, 0.65]}
        scale={[0.8, 0.8, 0.8]}
        onPointerOver={() => setIconHovered(true)}
        onPointerOut={() => setIconHovered(false)}
      >
        <primitive castShadow receiveShadow object={icon.scene} />
      </group>

      {/* Card Content */}
      <group ref={textRef} position={[0, 0.8, 0.06]}>
        <Text
          color="#000000"
          fontSize={0.2}
          maxWidth={1.8}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {cardData.name}
        </Text>
      </group>
      <group ref={textRef} position={[0, 0, 0.06]}>
        <Text
          color="#000000"
          fontSize={0.1}
          maxWidth={1.8}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {cardData.description}
        </Text>
      </group>
      <group position={[0, -1, 0.06]}>
        {/* <Image url={cardData.thumbnail_img} scale={[1.8, 1, 1]} transparent /> */}
      </group>

      {/* Button */}
      {cardData.url ? (
        <group
          ref={buttonRef}
          position={[0, -1.05, 0.06]}
          onPointerOver={() => setButtonHovered(true)}
          onPointerOut={() => setButtonHovered(false)}
          initial={{ scale: 1 }}
          animate={{ scale: buttonHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.4, 0.4, 0.1]} />
            <meshBasicMaterial color="#0077ff" />
          </mesh>
          <Text
            color="#ffffff"
            fontSize={0.15}
            fontWeight={"bold"}
            position={[0, 0, 0.07]}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            Read More
          </Text>
        </group>
      ) : (
        <group
          position={[0, -1.2, 0.06]}
          onPointerOver={() => setButtonHovered(true)}
          onPointerOut={() => setButtonHovered(false)}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 0.4, 0.1]} />
            <meshBasicMaterial color="#cccccc" />
          </mesh>
          <Text
            color="#ffffff"
            fontSize={0.1}
            position={[0, 0, 0.06]}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            Coming Soon
          </Text>
        </group>
      )}
    </group>
  );
};

export default PortfolioCard3D;
