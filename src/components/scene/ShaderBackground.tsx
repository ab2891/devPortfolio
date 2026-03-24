"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.52;
  float frequency = 1.0;

  for (int i = 0; i < 8; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 1.92;
    amplitude *= 0.57;
    p += vec2(17.13, 9.79);
  }

  return value;
}

float ridgeFbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.42;
  float frequency = 1.0;

  for (int i = 0; i < 8; i++) {
    float n = noise(p * frequency);
    n = 1.0 - abs(n * 2.0 - 1.0);
    n *= n;
    value += n * amplitude;
    frequency *= 1.86;
    amplitude *= 0.6;
    p += vec2(11.4, 7.9);
  }

  return value;
}

vec2 domainWarp(vec2 p, float t, out vec2 flowDirection) {
  vec2 q = vec2(
    ridgeFbm(p + vec2(0.0, 0.0) + t * 0.18),
    ridgeFbm(p + vec2(5.2, 1.3) - t * 0.14)
  );

  vec2 r = vec2(
    ridgeFbm(p + q * 2.65 + vec2(1.7, 9.2) + t * 0.12),
    ridgeFbm(p + q * 2.65 + vec2(8.3, 2.8) - t * 0.15)
  );

  flowDirection = normalize(r + 0.0001);
  return p + r * 0.76;
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float starField(vec2 fragCoord, float t) {
  float rnd = hash12(fragCoord);
  float star = smoothstep(0.99965, 1.0, rnd);

  float randomPhaseOffset = hash12(fragCoord * 0.137 + vec2(19.7, 7.3)) * 6.28318530718;
  float randomSpeed = mix(0.35, 1.1, hash12(fragCoord * 0.071 + vec2(3.1, 11.4)));

  float twinkle = 0.5 + 0.5 * sin(
    t * randomSpeed +
    randomPhaseOffset
  );

  twinkle = pow(clamp(twinkle, 0.0, 1.0), 2.2);

  return star * twinkle;
}

void main() {
  vec2 uv = vUv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  float t = u_time * 0.045;

  vec2 flowDirectionA;
  vec2 flowDirectionB;
  vec2 flowDirectionC;
  vec2 warpedA = domainWarp(p * 1.85, t, flowDirectionA);
  vec2 warpedB = domainWarp(p * 3.1 + vec2(1.2, -0.9), -t * 0.45, flowDirectionB);
  vec2 warpedC = domainWarp(p * 4.2 + vec2(-2.1, 1.7), t * 0.18, flowDirectionC);

  float base = fbm(warpedA);
  float detail = ridgeFbm(warpedB);
  float veins = ridgeFbm(warpedC - warpedA * 0.38);
  float n = base * 0.58 + detail * 0.24 + veins * 0.16;
  n = smoothstep(0.18, 0.88, n);

  float midMask = smoothstep(0.12, 0.62, n);
  float transitionMask = smoothstep(0.28, 0.76, n + base * 0.06);
  float ridgeMask = smoothstep(0.42, 0.96, detail * 0.72 + veins * 0.42 + n * 0.38);
  float highlightMask = smoothstep(0.68, 0.98, n + ridgeMask * 0.12);

  vec3 voidColor = vec3(0.006, 0.01, 0.02);
  vec3 deepShadow = vec3(0.034, 0.06, 0.132);
  vec3 midFlow = vec3(0.092, 0.165, 0.325);
  vec3 accentTone = vec3(0.128, 0.172, 0.335);
  vec3 highlightBlue = vec3(0.225, 0.38, 0.585);
  vec3 accentTeal = vec3(0.105, 0.255, 0.295);

  vec3 color = mix(voidColor, deepShadow, midMask * 0.58);
  color = mix(color, accentTone, transitionMask * 0.14);
  color += midFlow * ridgeMask * 0.27;
  color += highlightBlue * highlightMask * 0.18;
  color += highlightBlue * ridgeMask * smoothstep(0.58, 1.0, veins) * 0.09;
  color += accentTeal * smoothstep(0.72, 0.98, n + veins * 0.08) * 0.1;
  color -= vec3(0.01, 0.013, 0.024) * smoothstep(0.0, 0.36, 1.0 - n) * 0.28;

  vec2 flowDirection = normalize(flowDirectionA + flowDirectionB * 0.35 + flowDirectionC * 0.15 + 0.0001);
  vec2 flowUv = uv - flowDirection * (u_time * 0.065);
  float ripple = sin(n * 20.0 - dot(flowUv, flowDirection) * 9.0 - u_time * 0.48 + veins * 1.4);
  float lines = smoothstep(0.988, 0.9991, ripple);
  float dashMaskA = noise(flowUv * 3.6 + flowDirection * 0.75 + vec2(u_time * 0.005, -u_time * 0.003));
  float dashMaskB = noise(flowUv * 5.9 - flowDirection * 0.9 + vec2(-u_time * 0.003, u_time * 0.0015));
  float broadStrokeMask = smoothstep(0.46, 0.8, dashMaskA);
  float fineBreakMask = smoothstep(0.48, 0.86, dashMaskB);
  float dashBreakup = mix(broadStrokeMask, broadStrokeMask * fineBreakMask, 0.18);
  float linePresence = smoothstep(0.56, 0.94, ridgeMask * 0.8 + highlightMask * 0.96);
  float driftFade = 0.58 + 0.42 * sin(dot(flowUv, vec2(4.8, 2.6)) - u_time * 0.16 + veins * 1.5);
  driftFade = smoothstep(0.12, 0.94, driftFade);
  lines *= dashBreakup * linePresence * driftFade;
  vec3 dashColor = vec3(0.85, 0.95, 1.0) * lines * 0.5;
  color += dashColor;

  float topGlow = smoothstep(0.95, -0.2, p.y);
  color += vec3(0.02, 0.038, 0.075) * topGlow * 0.06;

  float vignette = smoothstep(1.35, 0.18, length(p));
  color *= vignette;

  float stars = starField(gl_FragCoord.xy, u_time);
  color += vec3(stars);

  gl_FragColor = vec4(color, 1.0);
}
`;

function FullscreenPlane() {
  const materialRef = useRef<ShaderMaterial>(null);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new Vector2(size.width, size.height) },
    }),
    [size.height, size.width],
  );

  useFrame((state) => {
    if (!materialRef.current) {
      return;
    }

    materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 1] }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <FullscreenPlane />
        </Canvas>
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_top,rgba(24,46,68,0.05),transparent_36%),linear-gradient(to_bottom,rgba(5,8,20,0.04),rgba(5,8,20,0.16))]" />
    </>
  );
}
