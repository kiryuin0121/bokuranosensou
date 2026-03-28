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
      {/* 15m以内: 高品質 */}
      <mesh
        receiveShadow
        castShadow
        geometry={(levels[0].nodes.Mesh_01_CL_Mesh_01_0 as Mesh).geometry}
        material={levels[0].materials.CL_Mesh_01 || levels[0].materials.default}
        material-envMapIntensity={0.25}
      />

      {/* 15~35m: 中品質 */}
      <mesh
        receiveShadow
        castShadow
        geometry={(levels[1].nodes.Mesh_01_CL_Mesh_01_0 as Mesh).geometry}
        material={levels[1].materials.CL_Mesh_01 || levels[1].materials.default}
        material-envMapIntensity={0.25}
      />

      {/* 35~100m: 低品質 */}
      <mesh
        receiveShadow
        castShadow
        geometry={(levels[2].nodes.Mesh_01_CL_Mesh_01_0 as Mesh).geometry}
        material={levels[2].materials.CL_Mesh_01 || levels[2].materials.default}
        material-envMapIntensity={0.25}
      />

      {/* 100m以上: 非表示 */}
      <group />
    </Detailed>
  );
};

export default Sculpture;
