"use client";

import Sculpture from "@/components/Sculpture";
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
        </Canvas>
      </Suspense>
    </main>
  );
};

export default App;
