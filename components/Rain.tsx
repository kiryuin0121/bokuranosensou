"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { LineSegments } from "three";

const RAIN_COUNT = 5000; // 雨粒の本数

// 降水範囲
const RANGE_X = 200;
const RANGE_Y = 120;
const RANGE_Z = 200;

const DROP_LENGTH = 0.8; // 雨粒1本の長さ。大きくすると雨筋が長くなる

const SPEED_BASE = 0.1; // 落下速度の最低値
const SPEED_RAND = 0.15; // 落下速度のランダム幅。大きくすると速度のばらつきが増す

/*
  LineSegmentsは「2点で1本の線」を描く。
  そのためRAIN_COUNT本の雨を描くには RAIN_COUNT×2 個の頂点が必要。

  positions配列の構造:
    [x0_top, y0_top, z0_top,   ← 0本目の上端
     x0_bot, y0_bot, z0_bot,   ← 0本目の下端
     x1_top, y1_top, z1_top,   ← 1本目の上端
     x1_bot, y1_bot, z1_bot,   ← 1本目の下端
     ...]
*/
const positions = new Float32Array(RAIN_COUNT * 2 * 3);

for (let i = 0; i < RAIN_COUNT; i++) {
  const x = Math.random() * RANGE_X - RANGE_X / 2;
  const y = Math.random() * RANGE_Y - RANGE_Y / 2;
  const z = Math.random() * RANGE_Z - RANGE_Z / 2;

  const top = i * 6; // 上端の先頭インデックス
  const bot = i * 6 + 3; // 下端の先頭インデックス

  positions[top] = x;
  positions[top + 1] = y;
  positions[top + 2] = z;

  positions[bot] = x;
  positions[bot + 1] = y - DROP_LENGTH; // 下端は上端より DROP_LENGTH だけ下
  positions[bot + 2] = z;
}

const Rain = () => {
  const ref = useRef<LineSegments>(null);

  /*
    各雨粒の現在の落下速度を管理する配列。
  */
  const velocities = useRef(new Float32Array(RAIN_COUNT).fill(0));

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < RAIN_COUNT; i++) {
      // 毎フレーム速度を加速させる（重力の模倣）
      velocities.current[i] -= SPEED_BASE + Math.random() * SPEED_RAND;

      const top = i * 6;
      const bot = i * 6 + 3;

      // 上端・下端をまとめて同じ量だけ下に移動
      pos[top + 1] += velocities.current[i];
      pos[bot + 1] += velocities.current[i];

      // 画面下端を超えたら上端に戻してリセット
      if (pos[top + 1] < -RANGE_Y / 2) {
        const resetY = RANGE_Y / 2;
        pos[top + 1] = resetY;
        pos[bot + 1] = resetY - DROP_LENGTH;
        velocities.current[i] = 0;
      }
    }

    // 頂点を書き換えたことをThree.jsに通知する（これがないと描画に反映されない）
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]} // 3 = XYZの3成分で1頂点
        />
      </bufferGeometry>
      <lineBasicMaterial color={"#660000"} transparent opacity={0.3} />
    </lineSegments>
  );
};

export default Rain;
