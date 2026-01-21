import { useEffect, useRef } from 'react';
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Vector3,
  Vector2,
  Clock
} from 'three';

const vertexShader = `
precision highp float;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const float PI = 3.14159265359;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) return baseColor;
  vec3 gradientColor;
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);
    gradientColor = mix(lineGradient[idx], lineGradient[idx2], f);
  }
  return gradientColor;
}

// Get strand-specific color with variation
vec3 getStrandColor(float t, float depth, float strandOffset) {
  vec3 baseColor = getLineColor(t, vec3(1.0));
  
  // Add depth-based color shift (purple when close, blue when far)
  vec3 depthShift = mix(vec3(0.3, 0.1, 0.6), vec3(0.2, 0.5, 0.9), depth);
  
  // Add per-strand color variation
  vec3 strandVariation = mix(
    vec3(0.5, 0.2, 0.8), // Purple tint
    vec3(0.3, 0.6, 1.0), // Blue tint
    fract(strandOffset * 0.7)
  );
  
  return baseColor * mix(depthShift, strandVariation, 0.3);
}

// Enhanced 3D DNA Helix with granular detail
float dnaStrand(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend, out vec3 glowColor) {
  float time = iTime * animationSpeed;
  
  float x_progression = uv.x * 2.0 + time + offset;
  
  // Bending Logic
  float bendY = 0.0;
  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    bendY = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
  }

  // --- ENHANCED 3D DNA MATH ---
  
  // Primary helix structure
  float amplitude = 0.25;
  float y1 = sin(x_progression) * amplitude;
  float y2 = sin(x_progression + PI) * amplitude;
  
  // Add micro-wobbles for organic feel
  y1 += sin(x_progression * 3.7) * 0.005;
  y2 += sin(x_progression * 3.7 + PI) * 0.005;
  
  // Secondary harmonics for natural variation
  y1 += cos(x_progression * 1.3 + time * 0.3) * 0.01;
  y2 += cos(x_progression * 1.3 + time * 0.3 + PI) * 0.01;
  
  // Tertiary micro-details for ultra-fine structure
  y1 += sin(x_progression * 6.5 + time * 0.5) * 0.003;
  y2 += sin(x_progression * 6.5 + time * 0.5 + PI) * 0.003;
  
  // Quaternary detail for base pair bumps
  y1 += cos(x_progression * 10.0) * 0.002;
  y2 += cos(x_progression * 10.0 + PI) * 0.002;
  
  y1 += bendY;
  y2 += bendY;

  // Enhanced 3D Depth System
  float z = cos(x_progression);
  float z2 = cos(x_progression + PI);
  
  // Normalized depth with enhanced range
  float depth1 = (z + 1.0) * 0.5;
  float depth2 = (z2 + 1.0) * 0.5;
  
  // Stronger perspective scaling
  float size1 = mix(0.4, 1.6, depth1);
  float size2 = mix(0.4, 1.6, depth2);
  
  // Enhanced brightness variation for depth
  float brightness1 = mix(0.2, 0.8, depth1);
  float brightness2 = mix(0.2, 0.8, depth2);
  
  // Add edge darkening when strands go behind
  float depthShadow1 = mix(0.5, 1.0, smoothstep(-0.2, 0.8, z));
  float depthShadow2 = mix(0.5, 1.0, smoothstep(-0.2, 0.8, z2));
  brightness1 *= depthShadow1;
  brightness2 *= depthShadow2;

  // --- ULTRA-DETAILED GRANULAR STRAND RENDERING ---
  
  float baseWidth = 0.0015; // Ultra-thin core for maximum detail
  float glowWidth = 0.028;
  
  // Multi-layer core with ultra-fine gradations (4 core layers)
  float core1_innermost = (baseWidth * 0.3) * size1 / max(abs(uv.y - y1), 0.0002);
  float core1_inner = (baseWidth * 0.6) * size1 / max(abs(uv.y - y1), 0.0004);
  float core1_mid = (baseWidth * 1.0) * size1 / max(abs(uv.y - y1), 0.0008);
  float core1_outer = (baseWidth * 1.4) * size1 / max(abs(uv.y - y1), 0.0013);
  
  float core2_innermost = (baseWidth * 0.3) * size2 / max(abs(uv.y - y2), 0.0002);
  float core2_inner = (baseWidth * 0.6) * size2 / max(abs(uv.y - y2), 0.0004);
  float core2_mid = (baseWidth * 1.0) * size2 / max(abs(uv.y - y2), 0.0008);
  float core2_outer = (baseWidth * 1.4) * size2 / max(abs(uv.y - y2), 0.0013);
  
  // Enhanced multi-layer glow system (8 layers for maximum depth)
  float glow1_1 = (glowWidth * 0.2) * size1 / max(abs(uv.y - y1), 0.0008);
  float glow1_2 = (glowWidth * 0.4) * size1 / max(abs(uv.y - y1), 0.0018);
  float glow1_3 = (glowWidth * 0.6) * size1 / max(abs(uv.y - y1), 0.0035);
  float glow1_4 = (glowWidth * 0.9) * size1 / max(abs(uv.y - y1), 0.0060);
  float glow1_5 = (glowWidth * 1.2) * size1 / max(abs(uv.y - y1), 0.0095);
  float glow1_6 = (glowWidth * 1.6) * size1 / max(abs(uv.y - y1), 0.0140);
  float glow1_7 = (glowWidth * 2.0) * size1 / max(abs(uv.y - y1), 0.0190);
  float glow1_8 = (glowWidth * 2.5) * size1 / max(abs(uv.y - y1), 0.0250);
  
  float glow2_1 = (glowWidth * 0.2) * size2 / max(abs(uv.y - y2), 0.0008);
  float glow2_2 = (glowWidth * 0.4) * size2 / max(abs(uv.y - y2), 0.0018);
  float glow2_3 = (glowWidth * 0.6) * size2 / max(abs(uv.y - y2), 0.0035);
  float glow2_4 = (glowWidth * 0.9) * size2 / max(abs(uv.y - y2), 0.0060);
  float glow2_5 = (glowWidth * 1.2) * size2 / max(abs(uv.y - y2), 0.0095);
  float glow2_6 = (glowWidth * 1.6) * size2 / max(abs(uv.y - y2), 0.0140);
  float glow2_7 = (glowWidth * 2.0) * size2 / max(abs(uv.y - y2), 0.0190);
  float glow2_8 = (glowWidth * 2.5) * size2 / max(abs(uv.y - y2), 0.0250);
  
  // Combine all layers with precise falloff for maximum detail
  float strand1 = (
    core1_innermost * 2.0 + 
    core1_inner * 1.5 + 
    core1_mid * 1.0 + 
    core1_outer * 0.7 +
    glow1_1 * 0.6 + 
    glow1_2 * 0.45 + 
    glow1_3 * 0.32 + 
    glow1_4 * 0.22 +
    glow1_5 * 0.15 +
    glow1_6 * 0.10 +
    glow1_7 * 0.06 +
    glow1_8 * 0.03
  ) * brightness1;
  
  float strand2 = (
    core2_innermost * 2.0 + 
    core2_inner * 1.5 + 
    core2_mid * 1.0 + 
    core2_outer * 0.7 +
    glow2_1 * 0.6 + 
    glow2_2 * 0.45 + 
    glow2_3 * 0.32 + 
    glow2_4 * 0.22 +
    glow2_5 * 0.15 +
    glow2_6 * 0.10 +
    glow2_7 * 0.06 +
    glow2_8 * 0.03
  ) * brightness2;

  // --- ULTRA-DETAILED GRANULAR RUNGS WITH BASE PAIRS ---
  
  float rungFrequency = 9.0; // Higher frequency for more detail
  float rungWidth = 0.008; // Very thin rungs
  
  float rungPhase = x_progression;
  
  // Primary rung pattern
  float stripes = smoothstep(1.0 - rungWidth, 1.0, sin(rungPhase * rungFrequency));
  
  // Add base pair detail (A-T, G-C bumps)
  float basePairDetail1 = sin(rungPhase * rungFrequency * 4.0) * 0.05 + 0.95;
  float basePairDetail2 = cos(rungPhase * rungFrequency * 6.0 + PI * 0.5) * 0.04 + 0.96;
  stripes *= basePairDetail1 * basePairDetail2;
  
  // Add micro-segments to rungs (showing bonds)
  float segmentation = smoothstep(0.3, 0.7, sin(rungPhase * rungFrequency * 2.0 + PI * 0.25));
  stripes *= mix(0.85, 1.0, segmentation);
  
  // Add texture variation
  float rungTexture = sin(rungPhase * 20.0 + time * 0.8) * 0.03 + 0.97;
  stripes *= rungTexture;
  
  // Precise masking between strands
  float yMin = min(y1, y2);
  float yMax = max(y1, y2);
  float insideHelix = smoothstep(yMin - 0.005, yMin, uv.y) * 
                      smoothstep(yMax + 0.005, yMax, uv.y);
  
  // Enhanced depth-based visibility
  float rungDepth = abs(z);
  float rungVisibility = smoothstep(-0.4, 0.8, rungDepth);
  
  // Size variation based on depth
  float rungSize = mix(0.5, 1.4, (depth1 + depth2) * 0.5);
  
  // Multi-layer rung rendering with enhanced detail
  float rungCore = insideHelix * stripes * rungVisibility * rungSize;
  float rungGlow1 = insideHelix * stripes * rungVisibility * rungSize * 1.3;
  float rungGlow2 = insideHelix * stripes * rungVisibility * rungSize * 1.7;
  float rungGlow3 = insideHelix * stripes * rungVisibility * rungSize * 2.1;
  float rungGlow4 = insideHelix * stripes * rungVisibility * rungSize * 2.5;
  float rungGlow5 = insideHelix * stripes * rungVisibility * rungSize * 3.0;
  
  // Combine rung layers with multiple glow stages
  float rungs = (
    rungCore * 0.8 + 
    rungGlow1 * 0.35 + 
    rungGlow2 * 0.20 +
    rungGlow3 * 0.12 +
    rungGlow4 * 0.07 +
    rungGlow5 * 0.04
  ) * 0.65;
  
  // Add depth-based color variation to rungs
  float depthTint = mix(0.8, 1.2, (depth1 + depth2) * 0.5);
  rungs *= depthTint;
  
  // --- ULTRA-DETAILED SURFACE DETAIL & GRANULARITY ---
  
  // Layer 1: Primary texture (sugar-phosphate backbone bumps)
  float texture1_primary = sin(x_progression * 18.0 + time * 1.5) * 0.015 + 0.985;
  float texture2_primary = sin(x_progression * 18.0 + time * 1.5 + PI) * 0.015 + 0.985;
  
  // Layer 2: Secondary texture (molecular detail)
  float texture1_secondary = cos(x_progression * 25.0) * 0.01 + 0.99;
  float texture2_secondary = cos(x_progression * 25.0 + PI) * 0.01 + 0.99;
  
  // Layer 3: Tertiary texture (atomic-scale roughness)
  float texture1_tertiary = sin(x_progression * 40.0 + time * 2.0) * 0.008 + 0.992;
  float texture2_tertiary = sin(x_progression * 40.0 + time * 2.0 + PI) * 0.008 + 0.992;
  
  // Combine all texture layers
  strand1 *= texture1_primary * texture1_secondary * texture1_tertiary;
  strand2 *= texture2_primary * texture2_secondary * texture2_tertiary;
  
  // Enhanced specular highlights with color shift
  float specular1 = pow(depth1, 3.5) * 0.15;
  float specular2 = pow(depth2, 3.5) * 0.15;
  
  strand1 += specular1;
  strand2 += specular2;
  
  glowColor = vec3(strand1 + strand2 + rungs);
  return strand1 + strand2 + rungs;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);
  vec2 mouseUv = vec2(0.0);
  
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  // --- BOTTOM WAVES ---
  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      
      vec2 pos = ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y);
      
      vec3 glow;
      float intensity = dnaStrand(
        pos, 
        1.5 + 0.2 * fi,
        baseUv, 
        mouseUv, 
        interactive, 
        glow
      );
      
      // Get strand-specific color with depth variation
      float strandDepth = (sin(baseUv.x + fi * 0.5) + 1.0) * 0.5;
      vec3 lineCol = getStrandColor(t, strandDepth, 1.5 + 0.2 * fi);
      
      col += lineCol * intensity;
    }
  }

  // --- MIDDLE WAVES ---
  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      
      vec2 pos = ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y);
      
      vec3 glow;
      float intensity = dnaStrand(
        pos, 
        2.0 + 0.15 * fi, 
        baseUv, 
        mouseUv, 
        interactive, 
        glow
      );
      
      // Get strand-specific color with depth variation
      float strandDepth = (cos(baseUv.y + fi * 0.7) + 1.0) * 0.5;
      vec3 lineCol = getStrandColor(t, strandDepth, 2.0 + 0.15 * fi);
      
      col += lineCol * intensity;
    }
  }

  // --- TOP WAVES ---
  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      
      vec2 pos = ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y);
      
      vec3 glow;
      float intensity = dnaStrand(
        pos, 
        1.0 + 0.2 * fi, 
        baseUv, 
        mouseUv, 
        interactive, 
        glow
      );
      
      // Get strand-specific color with depth variation
      float strandDepth = (sin(baseUv.x * 1.3 + fi * 0.6) + 1.0) * 0.5;
      vec3 lineCol = getStrandColor(t, strandDepth, 1.0 + 0.2 * fi);
      
      col += lineCol * intensity * 0.8;
    }
  }

  // Enhanced atmospheric depth with subtle vignette
  vec2 vignetteUv = fragCoord / iResolution.xy;
  float vignette = 1.0 - length(vignetteUv - 0.5) * 0.4;
  col *= vignette;

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

// ...existing code...

const MAX_GRADIENT_STOPS = 8;

type WavePosition = {
  x: number;
  y: number;
  rotate: number;
};

type DNAHelixProps = {
  linesGradient?: string[];
  enabledWaves?: Array<'top' | 'middle' | 'bottom'>;
  lineCount?: number | number[];
  lineDistance?: number | number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  opacity?: number;
};

function hexToVec3(hex: string): Vector3 {
  let value = hex.trim();
  if (value.startsWith('#')) value = value.slice(1);

  let r = 255, g = 255, b = 255;
  if (value.length === 3) {
    r = parseInt(value[0] + value[0], 16);
    g = parseInt(value[1] + value[1], 16);
    b = parseInt(value[2] + value[2], 16);
  } else if (value.length === 6) {
    r = parseInt(value.slice(0, 2), 16);
    g = parseInt(value.slice(2, 4), 16);
    b = parseInt(value.slice(4, 6), 16);
  }
  return new Vector3(r / 255, g / 255, b / 255);
}

export default function DNAHelix({
  linesGradient = ["#4c1d95", "#7c3aed", "#a78bfa", "#60a5fa", "#3b82f6"], // Deep Purple -> Violet -> Light Purple -> Light Blue -> Blue
  enabledWaves = ['middle'],
  lineCount = [8],
  lineDistance = [0.3],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: -1 }, // Default match Code 2
  animationSpeed = 1,
  interactive = true,
  bendRadius = 2.0,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = 'screen',
  opacity = 1
}: DNAHelixProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetMouseRef = useRef<Vector2>(new Vector2(-1000, -1000));
  const currentMouseRef = useRef<Vector2>(new Vector2(-1000, -1000));
  const targetInfluenceRef = useRef<number>(0);
  const currentInfluenceRef = useRef<number>(0);
  const targetParallaxRef = useRef<Vector2>(new Vector2(0, 0));
  const currentParallaxRef = useRef<Vector2>(new Vector2(0, 0));

  const getLineCount = (waveType: 'top' | 'middle' | 'bottom'): number => {
    if (typeof lineCount === 'number') return lineCount;
    if (!enabledWaves.includes(waveType)) return 0;
    const index = enabledWaves.indexOf(waveType);
    return lineCount[index] ?? 6;
  };

  const getLineDistance = (waveType: 'top' | 'middle' | 'bottom'): number => {
    if (typeof lineDistance === 'number') return lineDistance;
    if (!enabledWaves.includes(waveType)) return 0.1;
    const index = enabledWaves.indexOf(waveType);
    return lineDistance[index] ?? 0.1;
  };

  const topLineCount = enabledWaves.includes('top') ? getLineCount('top') : 0;
  const middleLineCount = enabledWaves.includes('middle') ? getLineCount('middle') : 0;
  const bottomLineCount = enabledWaves.includes('bottom') ? getLineCount('bottom') : 0;

  // IMPORTANT: Scaling 0.01 is removed here to allow DNA size control via props, 
  // but the shader logic compensates.
  const topLineDistance = enabledWaves.includes('top') ? getLineDistance('top') : 0.1;
  const middleLineDistance = enabledWaves.includes('middle') ? getLineDistance('middle') : 0.1;
  const bottomLineDistance = enabledWaves.includes('bottom') ? getLineDistance('bottom') : 0.1;

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    containerRef.current.appendChild(renderer.domElement);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(1, 1, 1) },
      animationSpeed: { value: animationSpeed },
      enableTop: { value: enabledWaves.includes('top') },
      enableMiddle: { value: enabledWaves.includes('middle') },
      enableBottom: { value: enabledWaves.includes('bottom') },
      topLineCount: { value: topLineCount },
      middleLineCount: { value: middleLineCount },
      bottomLineCount: { value: bottomLineCount },
      topLineDistance: { value: topLineDistance },
      middleLineDistance: { value: middleLineDistance },
      bottomLineDistance: { value: bottomLineDistance },

      // Defaults from Code 2
      topWavePosition: {
        value: new Vector3(topWavePosition?.x ?? 10.0, topWavePosition?.y ?? 0.5, topWavePosition?.rotate ?? -0.4)
      },
      middleWavePosition: {
        value: new Vector3(middleWavePosition?.x ?? 5.0, middleWavePosition?.y ?? 0.0, middleWavePosition?.rotate ?? 0.2)
      },
      bottomWavePosition: {
        value: new Vector3(bottomWavePosition?.x ?? 2.0, bottomWavePosition?.y ?? -0.7, bottomWavePosition?.rotate ?? 0.4)
      },

      iMouse: { value: new Vector2(-1000, -1000) },
      interactive: { value: interactive },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      bendInfluence: { value: 0 },
      parallax: { value: parallax },
      parallaxStrength: { value: parallaxStrength },
      parallaxOffset: { value: new Vector2(0, 0) },
      lineGradient: { value: Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(1, 1, 1)) },
      lineGradientCount: { value: 0 }
    };

    if (linesGradient && linesGradient.length > 0) {
      const stops = linesGradient.slice(0, MAX_GRADIENT_STOPS);
      uniforms.lineGradientCount.value = stops.length;
      stops.forEach((hex, i) => {
        const color = hexToVec3(hex);
        uniforms.lineGradient.value[i].set(color.x, color.y, color.z);
      });
    }

    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const clock = new Clock();

    const setSize = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const width = el.clientWidth || 1;
      const height = el.clientHeight || 1;
      renderer.setSize(width, height, false);
      uniforms.iResolution.value.set(width, height, 1);
    };

    setSize();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(setSize) : null;
    if (ro && containerRef.current) ro.observe(containerRef.current);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const dpr = renderer.getPixelRatio();
      targetMouseRef.current.set(x * dpr, (rect.height - y) * dpr);
      targetInfluenceRef.current = 1.0;
      if (parallax) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = (x - centerX) / rect.width;
        const offsetY = -(y - centerY) / rect.height;
        targetParallaxRef.current.set(offsetX * parallaxStrength, offsetY * parallaxStrength);
      }
    };

    const handlePointerLeave = () => {
      targetInfluenceRef.current = 0.0;
    };

    if (interactive) {
      renderer.domElement.addEventListener('pointermove', handlePointerMove);
      renderer.domElement.addEventListener('pointerleave', handlePointerLeave);
    }

    let raf = 0;
    const renderLoop = () => {
      uniforms.iTime.value = clock.getElapsedTime();
      if (interactive) {
        currentMouseRef.current.lerp(targetMouseRef.current, mouseDamping);
        uniforms.iMouse.value.copy(currentMouseRef.current);
        currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * mouseDamping;
        uniforms.bendInfluence.value = currentInfluenceRef.current;
      }
      if (parallax) {
        currentParallaxRef.current.lerp(targetParallaxRef.current, mouseDamping);
        uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      if (interactive) {
        renderer.domElement.removeEventListener('pointermove', handlePointerMove);
        renderer.domElement.removeEventListener('pointerleave', handlePointerLeave);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    linesGradient, enabledWaves, lineCount, lineDistance,
    topWavePosition, middleWavePosition, bottomWavePosition,
    animationSpeed, interactive, bendRadius, bendStrength,
    mouseDamping, parallax, parallaxStrength
  ]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{
        mixBlendMode: mixBlendMode,
        opacity: opacity
      }}
    />
  );
}