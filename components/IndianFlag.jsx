import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { forwardRef, useRef, useMemo, useLayoutEffect } from 'react';
import { Color } from 'three';

const hexToNormalizedRGB = hex => {
  hex = hex.replace('#', '');
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255
  ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform float uUseGradient;
uniform vec3  uColorStart;
uniform vec3  uColorMid;
uniform vec3  uColorEnd;
uniform float uGradientAngle;
uniform float uGradientReversed;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

vec3 gradientColor(vec2 uv) {
  float angle = uGradientReversed > 0.5 ? uGradientAngle + 1.570796327 : uGradientAngle;
  float c = cos(angle);
  float s = sin(angle);
  float v = uv.x * c + uv.y * s;
  float minV = min(min(min(0.0, c), s), c + s);
  float maxV = max(max(max(0.0, c), s), c + s);
  float t = (v - minV) / max(maxV - minV, 0.001);
  t = clamp(t, 0.0, 1.0);
  if (uGradientReversed > 0.5) {
    t = 1.0 - t;
  }
  if (t < 0.5) {
    return mix(uColorStart, uColorMid, t * 2.0);
  } else {
    return mix(uColorMid, uColorEnd, (t - 0.5) * 2.0);
  }
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec3 baseColor = uUseGradient > 0.5 ? gradientColor(vUv) : uColor;
  vec4 col = vec4(baseColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

const IndianFlagPlane = forwardRef(function IndianFlagPlane({ uniforms }, ref) {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);

  useFrame((_, delta) => {
    ref.current.material.uniforms.uTime.value += 0.1 * delta;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
});
IndianFlagPlane.displayName = 'IndianFlagPlane';

const IndianFlag = ({
  speed = 5,
  scale = 1,
  color = '#7B7481',
  noiseIntensity = 1.5,
  rotation = 0,
  gradient,
  gradientAngle = 45,
  gradientReversed = false
}) => {
  const meshRef = useRef();

  const baseColor = useMemo(() => new Color(...hexToNormalizedRGB(color)), [color]);
  const gradientColors = useMemo(() => {
    if (!gradient || !Array.isArray(gradient) || gradient.length < 3) return null;
    return [
      new Color(...hexToNormalizedRGB(gradient[0])),
      new Color(...hexToNormalizedRGB(gradient[1])),
      new Color(...hexToNormalizedRGB(gradient[2]))
    ];
  }, [gradient]);

  const uniforms = useMemo(() => {
    const useGradient = !!gradientColors;
    return {
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: baseColor },
      uRotation: { value: rotation },
      uTime: { value: 0 },
      uUseGradient: { value: useGradient ? 1 : 0 },
      uColorStart: { value: gradientColors ? gradientColors[0] : baseColor },
      uColorMid: { value: gradientColors ? gradientColors[1] : baseColor },
      uColorEnd: { value: gradientColors ? gradientColors[2] : baseColor },
      uGradientAngle: { value: (gradientAngle * Math.PI) / 180 },
      uGradientReversed: { value: gradientReversed ? 1 : 0 }
    };
  }, [speed, scale, noiseIntensity, baseColor, rotation, gradientColors, gradientAngle, gradientReversed]);

  return (
    <Canvas dpr={[1, 2]} frameloop="always">
      <IndianFlagPlane ref={meshRef} uniforms={uniforms} />
    </Canvas>
  );
};

export default IndianFlag;
