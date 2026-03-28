"use client";

import Sculpture from "@/components/Sculpture";
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <Canvas>
      <Sculpture position={[0,0,0]} rotation={[0,0,0]}/>
    </Canvas>
  )
}

export default App