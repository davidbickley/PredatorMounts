import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";

export default function CameraPositionLogger({ event } = {}) {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useEffect(() => {
    const logCameraPosition = () => {
      const { x, y, z } = cameraRef.current.position;
      const roundedX = Math.round(x * 100) / 100;
      const roundedY = Math.round(y * 100) / 100;
      const roundedZ = Math.round(z * 100) / 100;

      cameraRef.current = camera;
      window.addEventListener(event, logCameraPosition);

      return () => {
        window.removeEventListener(event, logCameraPosition);
      };
    };
  }, []);

  return null;
}
