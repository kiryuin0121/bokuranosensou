"use client";

import Sculpture from "@/components/Sculpture";
import { BakeShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const App = () => {
  return (
    <main className={`w-screen h-screen p-0 m-0`}>
      <Suspense fallback={<p>Now Loading...</p>}>
        <Canvas
          shadows
          frameloop="demand" //毎フレーム描画せず、必要に応じて描画する。(今回はOrbitControlsに変更が生じたとき)
          camera={{ position: [0, 0, 40] }}
        >
          <Sculpture position={[0, 0, 0]} rotation={[0, 0, 0]} />

          <OrbitControls zoomSpeed={0.075} />
          <pointLight position={[0, 0, 0]} intensity={0.5} />
          <spotLight intensity={2.5} position={[50, 50, 50]} castShadow />
          <Environment preset="city" />
          <BakeShadows />
        </Canvas>
      </Suspense>
    </main>
  );
};

export default App;
