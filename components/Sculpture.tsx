"use client";

import { Detailed, useGLTF } from "@react-three/drei";
import { Mesh } from "three";
type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
};
const Sculpture = (props: Props) => {
  // 彫刻の3Dモデル3種類を並列に読み込む(ポリゴン数：1普通、2やや少ない、3少ない)
  const levels = useGLTF([
    "/models/sculpture_1.glb",
    "/models/sculpture_2.glb",
    "/models/sculpture_3.glb",
  ]);
  /* 
    カメラとの距離に応じて3dモデルを出しわける。
    0~15:高品質のモデル(1)
    15~35:中品質のモデル(2)
    35~100:低品質のモデル(3)
    100~：モデルを出さない
  */
  return (
    <Detailed distances={[0, 15, 35, 100]} {...props}>
      {...levels.map(({ nodes, materials }, index) => (
        <mesh
          receiveShadow
          castShadow
          key={index}
          geometry={(nodes.Mesh_01_CL_Mesh_01_0 as Mesh).geometry}
          material={materials.default}
          material-envMapIntensity={0.25}
        />
      ))}

      <group/>
    </Detailed>
  );
};

export default Sculpture;
