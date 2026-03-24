uniform float uTime;
uniform vec2 uResolution;
uniform float uMotionScale;

varying vec2 vUv;

mat2 rotate2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(17.2, 11.4);
    amplitude *= 0.5;
  }

  return value;
}

vec2 swirl(vec2 p, float strength) {
  float n = fbm(p * 1.1);
  float angle = n * 6.28318530718 + strength;
  return p + vec2(cos(angle), sin(angle)) * 0.08;
}

void main() {
  vec2 uv = vUv;
  vec2 centeredUv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
  float time = uTime * 0.08;
  float phase = 2.0;
  float power = .2;
  float ratio = 1.5;
  float scale = 1.0;
  float scrollDirection = -3.089232776029964;
  float speedUv = 10.0;
  float strength = 0.65;

  vec2 p = centeredUv;
  p.x *= 0.96;
  p.y *= 1.08;

  vec2 flowDir = normalize(vec2(cos(scrollDirection), sin(scrollDirection)));
  vec2 flowUv = (uv - 0.5) * scale;
  flowUv.x *= ratio;
  flowUv += flowDir * time * speedUv * 0.032;
  vec2 maskUv = flowUv * 1.45 + vec2(phase * 0.12, -phase * 0.08);
  float opacityMask = smoothstep(0.28, 0.84, fbm(maskUv + vec2(0.0, time * 0.18)));
  float noiseMask = fbm(flowUv * 6.2 - flowDir * time * 0.5 + phase);

  vec2 qA = rotate2d(0.18) * p;
  vec2 qB = rotate2d(-0.42) * p;
  vec2 qC = rotate2d(0.75) * p;

  vec2 warpA = swirl(qA * 1.55 + vec2(time * 0.34, -time * 0.21), 0.12);
  vec2 warpB = swirl(qB * 2.65 + vec2(-time * 0.16, time * 0.19), -0.16);
  vec2 warpC = swirl(qC * 4.35 + vec2(time * 0.11, time * 0.08), 0.26);

  float cloudBase = fbm(warpA + warpB * 0.23);
  float cloudDetail = fbm(warpB * 1.45 + warpC * 0.32);
  float ink = fbm(warpC * 0.92 - warpA * 0.12);
  float rippleField = fbm(qA * 5.4 + vec2(time * 0.34, -time * 0.2));
  float rippleNoise = fbm(qB * 9.5 - flowDir * time * 0.45 + rippleField);
  float rippleFlow = dot(flowUv, flowDir) * 34.0;
  float rippleBands = sin(rippleFlow + rippleField * (11.0 + power * 1.6) + rippleNoise * 8.0 - time * (3.2 + speedUv * 0.56) + phase);
  float rippleThin = smoothstep(0.9, 0.992, rippleBands * 0.5 + 0.5);
  float rippleMicro = smoothstep(0.8, 0.97, 1.0 - abs(rippleNoise * 2.0 - 1.0));
  float ripples = rippleThin * rippleMicro;
  float rippleHighlight = smoothstep(0.965, 0.99955, rippleBands * 0.5 + 0.5) * rippleMicro;
  float rippleMask = smoothstep(0.42, 0.92, cloudDetail + cloudBase * 0.2 + opacityMask * 0.14);
  ripples *= rippleMask;
  rippleHighlight *= rippleMask * smoothstep(0.5, 0.95, opacityMask + noiseMask * 0.08);

  float marbling = smoothstep(0.28, 0.74, cloudBase * 0.78 + cloudDetail * 0.55);
  float ridges = 1.0 - abs(cloudDetail * 2.0 - 1.0);
  ridges = pow(clamp(ridges, 0.0, 1.0), 1.25);
  float body = smoothstep(0.32, 0.84, cloudBase);

  float upperGlow = smoothstep(0.9, -0.35, p.y);
  float topCore = smoothstep(0.62, -0.42, p.y + abs(p.x) * 0.1);
  float rightGlow = smoothstep(1.25, 0.0, abs(p.x - 0.46));
  float cornerMist = fbm(p * 2.0 + vec2(0.0, -time * 0.35));
  float rightLift = smoothstep(1.45, 0.04, length(p - vec2(0.8, 0.02)));
  float rightWash = smoothstep(-0.18, 0.92, p.x);
  float centerLift = smoothstep(1.22, 0.0, length(p - vec2(0.12, -0.02)));

  float stars = step(0.9966, noise(uv * 280.0 + vec2(12.4, 4.6)));
  stars += step(0.998, noise(uv * 420.0 + vec2(-8.2, 15.1))) * 0.75;
  stars += step(0.9988, noise(uv * 620.0 + vec2(21.6, -11.3))) * 0.55;
  stars *= 0.6 + upperGlow * 0.55;

  float dust = fbm(uv * 18.0 + vec2(time * 0.12, -time * 0.06));
  dust = smoothstep(0.66, 0.95, dust) * 0.07;

  vec3 blackBlue = vec3(0.012, 0.02, 0.05);
  vec3 deepIndigo = vec3(0.028, 0.075, 0.17);
  vec3 stormBlue = vec3(0.085, 0.155, 0.34);
  vec3 tealMist = vec3(0.08, 0.24, 0.23);
  vec3 emerald = vec3(0.08, 0.31, 0.25);
  vec3 jadeGlow = vec3(0.12, 0.43, 0.34);
  vec3 coolBlue = vec3(0.22, 0.33, 0.66);
  vec3 paleBloom = vec3(0.58, 0.66, 0.96);
  vec3 rippleLineColor = vec3(0.9, 0.95, 1.0);

  vec3 color = mix(blackBlue, deepIndigo, marbling);
  color = mix(color, stormBlue, body * 0.74);
  color += tealMist * smoothstep(0.46, 0.94, cloudBase + cloudDetail * 0.14) * 0.18;
  color += emerald * smoothstep(0.42, 0.9, body + ridges * 0.18) * 0.14;
  color += coolBlue * pow(marbling, 1.7) * 0.13;
  color += mix(coolBlue, tealMist, 0.45) * ridges * body * 0.24;
  color += mix(jadeGlow, tealMist, 0.55) * ripples * (0.02 + strength * 0.045);
  color += rippleLineColor * rippleHighlight * body * (0.018 + ridges * 0.05 + strength * 0.035);
  color -= vec3(0.035, 0.045, 0.065) * smoothstep(0.36, 0.8, ink) * 0.9;

  float separation = smoothstep(0.22, 0.78, body - ink * 0.22 + ridges * 0.18);
  color = mix(color * 0.94, color, separation);

  float topBloom = topCore * (0.62 + rightGlow * 0.18) * smoothstep(0.34, 0.92, cornerMist);
  float atmosphericGlow = upperGlow * smoothstep(0.22, 0.88, cloudBase);
  color += paleBloom * topBloom * 0.27;
  color += coolBlue * topBloom * 0.16;
  color += tealMist * atmosphericGlow * 0.13;
  color += mix(jadeGlow, tealMist, 0.65) * rightLift * 0.22;
  color += mix(emerald, tealMist, 0.45) * rightWash * 0.09;
  color += coolBlue * centerLift * 0.06;

  float lowerHaze = smoothstep(1.15, -0.05, length(p - vec2(0.55, -0.6)));
  color += vec3(0.06, 0.09, 0.08) * lowerHaze * 0.07;
  color += emerald * lowerHaze * 0.08;

  color += vec3(dust);
  color += vec3(stars) * (0.72 + ridges * 0.34);
  color += mix(tealMist, emerald, 0.55) * opacityMask * strength * 0.08;

  float vignette = smoothstep(1.46, 0.16, length(p));
  color *= vignette;

  color = pow(color, vec3(1.0));

  gl_FragColor = vec4(color, 1.0);
}
