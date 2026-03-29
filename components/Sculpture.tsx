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
    <Detailed distances={[0, 15, 35, 100]} {...props} scale={0.06}>
      <>
        {levels.map(({ nodes, materials }, levelIndex) => (
          // ノード名に依存せず、Meshタイプのノードを全て描画する
          <group key={levelIndex}>
            {Object.values(nodes)
              .filter((node): node is Mesh => node instanceof Mesh)
              .map((node) => (
                <mesh
                  key={node.uuid}
                  receiveShadow
                  castShadow
                  geometry={node.geometry}
                  material={materials.CL_Mesh_01}
                  material-envMapIntensity={1.5}
                />
              ))}
          </group>
        ))}
      </>
      {/* 100m以上: 非表示 */}
      <group />
    </Detailed>
  );
};

useGLTF.preload([
  "/models/sculpture_1.glb",
  "/models/sculpture_2.glb",
  "/models/sculpture_3.glb",
]);

export default Sculpture;
