"use client";
import { Canvas } from "@react-three/fiber";
import { Lightformer } from "@react-three/drei";
import clsx from "clsx";
import React, { Suspense } from "react";

const RenderModel = ({ children, className }) => {
  return (
    <Canvas
      className={clsx("w-screen h-screen -z-10 relative", className)}
      shadows={false}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>{children}</Suspense>
      {/* Custom Lighting */}
      <ambientLight intensity={0.6} color="lightblue" />
      <directionalLight intensity={1} position={[2, 4, 3]} />
    </Canvas>
  );
};

export default RenderModel;
