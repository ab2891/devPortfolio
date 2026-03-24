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
  float n = base * 0.52 + detail * 0.28 + veins * 0.2;
  n = smoothstep(0.18, 0.88, n);

  float midMask = smoothstep(0.12, 0.62, n);
  float transitionMask = smoothstep(0.28, 0.76, n + base * 0.06);
  float ridgeMask = smoothstep(0.42, 0.96, detail * 0.72 + veins * 0.42 + n * 0.38);
  float highlightMask = smoothstep(0.68, 0.98, n + ridgeMask * 0.12);

  vec3 voidColor = vec3(0.008, 0.008, 0.02);
  vec3 deepShadow = vec3(0.039, 0.059, 0.141);
  vec3 midFlow = vec3(0.09, 0.196, 0.361);
  vec3 accentTone = vec3(0.165, 0.176, 0.361);
  vec3 highlightBlue = vec3(0.259, 0.482, 0.651);

  vec3 color = mix(voidColor, deepShadow, midMask * 0.58);
  color = mix(color, accentTone, transitionMask * 0.18);
  color += midFlow * ridgeMask * 0.34;
  color += highlightBlue * highlightMask * 0.24;
  color += highlightBlue * ridgeMask * smoothstep(0.58, 1.0, veins) * 0.12;
  color -= vec3(0.012, 0.015, 0.026) * smoothstep(0.0, 0.36, 1.0 - n) * 0.28;

  vec2 flowDirection = normalize(flowDirectionA + flowDirectionB * 0.35 + flowDirectionC * 0.15 + 0.0001);
  vec2 flowUv = uv - flowDirection * (u_time * 0.08);
  float ripple = sin(n * 24.0 - dot(flowUv, flowDirection) * 18.0 - u_time * 0.9 + veins * 2.1);
  float lines = smoothstep(0.982, 0.9985, ripple);
  float dashMaskA = noise(flowUv * 12.0 + flowDirection * 2.4);
  float dashMaskB = noise(flowUv * 20.0 - flowDirection * 3.1 + vec2(u_time * 0.015, -u_time * 0.01));
  float dashBreakup = smoothstep(0.58, 0.74, dashMaskA) * smoothstep(0.42, 0.82, dashMaskB);
  float linePresence = smoothstep(0.6, 0.95, ridgeMask * 0.78 + highlightMask * 0.92);
  lines *= dashBreakup * linePresence;
  vec3 dashColor = vec3(0.85, 0.95, 1.0) * lines * 0.58;
  color += dashColor;

  float topGlow = smoothstep(0.95, -0.2, p.y);
  color += vec3(0.025, 0.05, 0.1) * topGlow * 0.08;

  float vignette = smoothstep(1.35, 0.18, length(p));
  color *= vignette;

  float stars = starField(gl_FragCoord.xy, u_time);
  color += vec3(stars);

  gl_FragColor = vec4(color, 1.0);
}
