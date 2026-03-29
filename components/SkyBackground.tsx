"use client";

import { Cloud, Clouds } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { Group, MeshLambertMaterial } from "three";

const SkyBackground = () => {
  const cloudsRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!cloudsRef.current) return;
    cloudsRef.current.rotation.y += delta * 0.008; // ゆっくり回転
  });

  const top = useControls("top", {
    // 位置
    positionX: { value: 250, min: -200, max: 300, step: 1 },
    positionY: { value: 100, min: -100, max: 100, step: 1 },
    positionZ: { value: -100, min: -100, max: 100, step: 1 },
    // 密度
    segments: { value: 100, min: 1, max: 200, step: 1 }, //雲を構成する塊の数
    volume: { value: 200, min: 1, max: 200, step: 1 }, //↑の塊のサイズ
    concentrate: {
      value: "inside",
      options: ["inside", "outside", "random", undefined],
    }, //パフの配置密度を内側か外側にするか
    // 範囲
    boundsX: { value: 200, min: 10, max: 600, step: 1 }, //広がり
    boundsY: { value: 80, min: 1, max: 80, step: 1 }, //厚み
    boundsZ: { value: 10, min: 10, max: 600, step: 1 }, //奥行き
    // 見た目
    opacity: {
      value: 0.3,
      min: 0,
      max: 1,
      step: 0.01,
    },
    color: { value: "#ffe77e" },
    seed: { value: 42, min: 0, max: 100, step: 1 }, //雲の形状乱数(固定値ならば形状が固定)
    fade: { value: 40, min: 0, max: 1000, step: 1 }, //雲の端が消えゆく距離

    // アニメーション
    speed: {
      value: 0.04,
      min: 0,
      max: 1,
      step: 0.01,
    }, //雲の移動速度
    growth: {
      value: 0.01,
      min: 0,
      max: 1,
      step: 0.01,
    }, //雲の拡散速度
  });
  const middle = useControls("middle", {
    // 位置
    positionX: { value: 0, min: -100, max: 100, step: 1 },
    positionY: { value: -25, min: -100, max: 100, step: 1 },
    positionZ: { value: -100, min: -100, max: 100, step: 1 },
    // 密度
    segments: { value: 100, min: 1, max: 200, step: 1 }, //雲を構成する塊の数
    volume: { value: 200, min: 1, max: 200, step: 1 }, //↑の塊のサイズ
    concentrate: {
      value: "inside",
      options: ["inside", "outside", "random", undefined],
    }, //パフの配置密度を内側か外側にするか
    // 範囲
    boundsX: { value: 600, min: 10, max: 600, step: 1 }, //広がり
    boundsY: { value: 50, min: 1, max: 80, step: 1 }, //厚み
    boundsZ: { value: 10, min: 10, max: 600, step: 1 }, //奥行き
    // 見た目
    opacity: {
      value: 0.3,
      min: 0,
      max: 1,
      step: 0.01,
    },
    color: { value: "#99ffba" },
    seed: { value: 42, min: 0, max: 100, step: 1 }, //雲の形状乱数(固定値ならば形状が固定)
    fade: { value: 40, min: 0, max: 1000, step: 1 }, //雲の端が消えゆく距離

    // アニメーション
    speed: {
      value: 0.04,
      min: 0,
      max: 1,
      step: 0.01,
    }, //雲の移動速度
    growth: {
      value: 0.01,
      min: 0,
      max: 1,
      step: 0.01,
    }, //雲の拡散速度
  });
  const lower = useControls("lower", {
    // 位置
    positionX: { value: 0, min: -100, max: 100, step: 1 },
    positionY: { value: -80, min: -100, max: 100, step: 1 },
    positionZ: { value: 0, min: -100, max: 100, step: 1 },
    // 密度
    segments: { value: 100, min: 1, max: 200, step: 1 }, //雲を構成する塊の数
    volume: { value: 200, min: 1, max: 200, step: 1 }, //↑の塊のサイズ
    concentrate: {
      value: "inside",
      options: ["inside", "outside", "random", undefined],
    }, //パフの配置密度を内側か外側にするか
    // 範囲
    boundsX: { value: 250, min: 10, max: 600, step: 1 }, //広がり
    boundsY: { value: 50, min: 1, max: 80, step: 1 }, //厚み
    boundsZ: { value: 200, min: 10, max: 600, step: 1 }, //奥行き
    // 見た目
    opacity: {
      value: 0.3,
      min: 0,
      max: 1,
      step: 0.01,
    },
    color: { value: "#4a5493" },
    seed: { value: 42, min: 0, max: 100, step: 1 }, //雲の形状乱数(固定値ならば形状が固定)
    fade: { value: 40, min: 0, max: 1000, step: 1 }, //雲の端が消えゆく距離

    // アニメーション
    speed: {
      value: 0.04,
      min: 0,
      max: 1,
      step: 0.01,
    }, //雲の移動速度
    growth: {
      value: 0.01,
      min: 0,
      max: 1,
      step: 0.01,
    }, //雲の拡散速度
  });

  return (
    <>
      {/*
        環境光: 全体の底上げ（雲の影側が真っ暗にならないよう）
      */}
      <ambientLight intensity={1.8} color="#c0d8ff" />
      <color args={["#ffb6c1"]} attach={"background"} />
      <group ref={cloudsRef}>
        <Clouds material={MeshLambertMaterial} limit={1000}>
          {/* 上層(オレンジ色) */}
          <Cloud
            position={[top.positionX, top.positionY, top.positionZ]}
            segments={top.segments}
            volume={top.volume}
            bounds={[top.boundsX, top.boundsY, top.boundsZ]}
            opacity={top.opacity}
            color={top.color}
            speed={top.speed}
            growth={top.growth}
            seed={top.seed}
            concentrate={
              top.concentrate as "inside" | "outside" | "random" | undefined
            }
            fade={top.fade}
          />

          {/* 中間層(緑色) */}
          <Cloud
            position={[middle.positionX, middle.positionY, middle.positionZ]}
            segments={middle.segments}
            volume={middle.volume}
            bounds={[middle.boundsX, middle.boundsY, middle.boundsZ]}
            opacity={middle.opacity}
            color={middle.color}
            speed={middle.speed}
            growth={middle.growth}
            seed={middle.seed}
            concentrate={
              middle.concentrate as "inside" | "outside" | "random" | undefined
            }
            fade={middle.fade}
          />
          {/* 下層(青色) */}
          <Cloud
            position={[lower.positionX, lower.positionY, lower.positionZ]}
            segments={lower.segments}
            volume={lower.volume}
            bounds={[lower.boundsX, lower.boundsY, lower.boundsZ]}
            opacity={lower.opacity}
            color={lower.color}
            speed={lower.speed}
            growth={lower.growth}
            seed={lower.seed}
            concentrate={
              lower.concentrate as "inside" | "outside" | "random" | undefined
            }
            fade={lower.fade}
          />
          <Cloud
            position={[lower.positionX, lower.positionY-10, lower.positionZ]}
            segments={lower.segments}
            volume={lower.volume}
            bounds={[lower.boundsX, lower.boundsY, lower.boundsZ]}
            opacity={lower.opacity}
            color={"#ceb5ff"}
            speed={lower.speed}
            growth={lower.growth}
            seed={lower.seed}
            concentrate={
              lower.concentrate as "inside" | "outside" | "random" | undefined
            }
            fade={lower.fade}
          />
        </Clouds>
      </group>
    </>
  );
};

export default SkyBackground;
