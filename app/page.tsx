"use client";

import Sculpture from "@/components/Sculpture";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const App = () => {
  return (
    <Suspense
      fallback={<p>Now Loading...</p>}
    >
      <Canvas>
        <Sculpture position={[0, 0, 0]} rotation={[0, 0, 0]} />
      </Canvas>
    </Suspense>
  );
};

export default App;
