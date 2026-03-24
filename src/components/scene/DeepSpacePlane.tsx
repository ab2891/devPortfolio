"use client";

import { useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ShaderMaterial, Vector2 } from "three";
import { useFrame, useThree } from "@react-three/fiber";

type DeepSpacePlaneProps = {
  vertexShader: string;
  fragmentShader: string;
};

export function DeepSpacePlane({
  vertexShader,
  fragmentShader,
}: DeepSpacePlaneProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const reducedMotion = useReducedMotion();
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new Vector2() },
      uMotionScale: { value: 1 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (!materialRef.current) {
      return;
    }

    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    materialRef.current.uniforms.uMotionScale.value = reducedMotion ? 0.2 : 1;
    materialRef.current.uniforms.uTime.value =
      clock.getElapsedTime() * uniforms.uMotionScale.value;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}
