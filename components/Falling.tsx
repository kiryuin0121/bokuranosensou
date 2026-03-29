"use client";
import { Float } from "@react-three/drei";
import Sculpture from "./Sculpture";
import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

type Props = {
  speed: number;
  position: [number, number, number];
  rotation: [number, number, number];
};

const Falling = ({ speed, ...props }: Props) => {
  const ref = useRef<Group>(null);
  useFrame((_,delta) => {
    if (!ref.current) return;
    ref.current.position.y -= speed;
    ref.current.rotation.y += delta*0.25;
    if (ref.current.position.y < -50) {
      ref.current.position.y = 50;
    }
  });

  return (
    <group ref={ref} position={props.position}>
      <Float>
        <Sculpture {...props} position={[0, 0, 0]} />
      </Float>
    </group>
  );
};
export default Falling;
