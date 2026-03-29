"use client";

import Falling from "@/components/Falling";
import { BakeShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const positions = [...Array(300)].map(() => ({
  position: [
    40 - Math.random() * 80,
    40 - Math.random() * 80,
    40 - Math.random() * 80,
  ] as [number, number, number],
  rotation: [
    Math.PI + (Math.random() - 0.5) * 0.5, // 頭を下に向けつつ少しばらつかせる
    Math.random() * Math.PI * 2, // Y軸は全方向にランダム
    (Math.random() - 0.5) * 0.5, // Z軸は少しだけ傾ける
  ] as [number, number, number],
  // モデルごとに落下速度をランダムにする
  speed: 0.7 + Math.random() * 0.15,
}));

const App = () => {
  return (
    <main className={`w-screen h-screen p-0 m-0`}>
      <Canvas shadows frameloop="always" camera={{ position: [0, 0, 40] }}>
        <Suspense fallback={null}>
          {positions.map((props, i) => (
            <Falling key={i} {...props} />
          ))}
        </Suspense>
        <OrbitControls zoomSpeed={0.075} />
        <pointLight position={[0, 0, 0]} intensity={0.5} />
        <spotLight intensity={2.5} position={[50, 50, 50]} castShadow />
        <Environment preset="city" environmentIntensity={2} />
        <BakeShadows />
      </Canvas>
    </main>
  );
};

export default App;
