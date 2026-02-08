/**
 * Revolutionary Therapeutic WebGL Shaders Library
 * Custom GLSL shaders for healing-focused digital experiences
 * Designed for consciousness evolution through technology
 */

export const TherapeuticShaders = {
  // Breathing Universe Shaders
  breathingVertex: `
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;
    uniform float time;
    uniform float breathPhase; // 0-1 from breath detection
    uniform float heartRate; // BPM from biometric data
    uniform vec3 emotionalState; // RGB representing current emotion
    
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vBreathInfluence;
    varying float vEmotionalIntensity;
    varying vec3 vWorldPosition;
    
    // Organic noise function for natural movement
    float noise3D(vec3 p) {
      return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
    }
    
    // Sacred geometry expansion pattern
    vec3 breathingTransform(vec3 pos, float phase) {
      float expansion = 1.0 + sin(phase * 3.14159) * 0.4;
      float fibonacci = (1.0 + sqrt(5.0)) / 2.0; // Golden ratio
      
      // Fibonacci spiral expansion
      float angle = atan(pos.z, pos.x) + phase * fibonacci;
      float radius = length(pos.xz) * expansion;
      
      return vec3(
        radius * cos(angle),
        pos.y + sin(phase * 6.28) * 0.2,
        radius * sin(angle)
      );
    }
    
    void main() {
      vec3 pos = position;
      
      // Apply breathing transformation
      pos = breathingTransform(pos, breathPhase);
      
      // Heart rate influence on movement
      float heartInfluence = heartRate / 100.0; // Normalize BPM
      pos += normal * sin(time + heartInfluence * 10.0) * 0.1;
      
      // Emotional state influences geometry
      float emotionalMagnitude = length(emotionalState);
      pos += normal * emotionalMagnitude * 0.05;
      
      // Organic noise for natural movement
      vec3 noisePos = pos * 0.1 + time * 0.1;
      float organicNoise = noise3D(noisePos);
      pos += normal * organicNoise * 0.03;
      
      // Pass data to fragment shader
      vNormal = normalMatrix * normal;
      vUv = uv;
      vBreathInfluence = breathPhase;
      vEmotionalIntensity = emotionalMagnitude;
      vWorldPosition = pos;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  
  breathingFragment: `
    precision highp float;
    
    uniform float time;
    uniform float breathPhase;
    uniform vec3 emotionalState;
    uniform float stressLevel; // 0-1 from HRV analysis
    uniform vec3 healingColors[5]; // Therapeutic color palette
    
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vBreathInfluence;
    varying float vEmotionalIntensity;
    varying vec3 vWorldPosition;
    
    // Therapeutic color mixing based on emotional state
    vec3 getTherapeuticColor(vec3 baseColor, vec3 emotion, float stress) {
      // Base healing blue for calm states
      vec3 calmColor = healingColors[0]; // Peaceful blue
      vec3 anxiousColor = healingColors[1]; // Grounding earth tones
      vec3 hopefulColor = healingColors[2]; // Uplifting green
      vec3 sadColor = healingColors[3]; // Warm purple for comfort
      vec3 joyColor = healingColors[4]; // Bright gold for celebration
      
      // Blend based on emotional state
      vec3 emotionalBlend = mix(
        mix(calmColor, anxiousColor, emotion.r),
        mix(hopefulColor, mix(sadColor, joyColor, emotion.b)),
        emotion.g
      );
      
      // Reduce saturation under stress for calming effect
      float saturation = 1.0 - (stress * 0.6);
      vec3 gray = vec3(0.5);
      emotionalBlend = mix(gray, emotionalBlend, saturation);
      
      return mix(baseColor, emotionalBlend, 0.7);
    }
    
    // Aurora-like breathing effect
    float breathingLuminosity(vec2 uv, float phase) {
      float wave1 = sin(uv.x * 3.0 + time + phase * 6.28) * 0.5 + 0.5;
      float wave2 = cos(uv.y * 2.0 + time * 0.7 + phase * 4.0) * 0.5 + 0.5;
      return wave1 * wave2 * (0.8 + phase * 0.4);
    }
    
    void main() {
      vec3 normal = normalize(vNormal);
      
      // Base therapeutic color
      vec3 baseColor = vec3(0.2, 0.6, 0.9); // Calming blue
      
      // Apply emotional color therapy
      vec3 therapeuticColor = getTherapeuticColor(baseColor, emotionalState, stressLevel);
      
      // Breathing luminosity
      float luminosity = breathingLuminosity(vUv, vBreathInfluence);
      therapeuticColor *= (0.7 + luminosity * 0.5);
      
      // Fresnel effect for ethereal glow
      float fresnel = pow(1.0 - abs(dot(normal, vec3(0, 0, 1))), 2.0);
      vec3 glowColor = therapeuticColor * 1.5;
      therapeuticColor = mix(therapeuticColor, glowColor, fresnel * 0.4);
      
      // Subtle sparkles for magical feeling
      float sparkle = step(0.98, sin(vWorldPosition.x * 50.0) * cos(vWorldPosition.y * 50.0));
      therapeuticColor += vec3(1.0) * sparkle * 0.3;
      
      // Final opacity based on breathing and emotional state
      float alpha = 0.8 + vBreathInfluence * 0.2 - stressLevel * 0.3;
      
      gl_FragColor = vec4(therapeuticColor, alpha);
    }
  `,
  
  // Emotion Ocean Fluid Simulation Shaders
  fluidVertex: `
    attribute vec3 position;
    attribute vec2 uv;
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float time;
    uniform sampler2D velocityTexture;
    uniform sampler2D emotionTexture;
    uniform float waveHeight;
    
    varying vec2 vUv;
    varying float vHeight;
    varying vec3 vEmotionalFlow;
    
    void main() {
      vUv = uv;
      
      // Sample fluid simulation textures
      vec3 velocity = texture2D(velocityTexture, uv).rgb;
      vec3 emotion = texture2D(emotionTexture, uv).rgb;
      
      // Create wave displacement
      float wave1 = sin(position.x * 0.1 + time + velocity.x * 10.0) * waveHeight;
      float wave2 = cos(position.z * 0.1 + time * 0.7 + velocity.z * 10.0) * waveHeight * 0.7;
      float emotionalWave = sin(emotion.r * 6.28 + time) * waveHeight * 0.5;
      
      vec3 pos = position;
      pos.y += wave1 + wave2 + emotionalWave;
      
      vHeight = pos.y;
      vEmotionalFlow = emotion;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  
  fluidFragment: `
    precision highp float;
    
    uniform float time;
    uniform vec3 deepWaterColor;
    uniform vec3 shallowWaterColor;
    uniform vec3 emotionalColors[6];
    uniform float transparency;
    
    varying vec2 vUv;
    varying float vHeight;
    varying vec3 vEmotionalFlow;
    
    void main() {
      // Water depth coloring
      float depth = smoothstep(-2.0, 2.0, vHeight);
      vec3 waterColor = mix(deepWaterColor, shallowWaterColor, depth);
      
      // Emotional color influence
      vec3 emotionColor = mix(
        mix(emotionalColors[0], emotionalColors[1], vEmotionalFlow.r),
        mix(emotionalColors[2], emotionalColors[3], vEmotionalFlow.g),
        vEmotionalFlow.b
      );
      
      // Blend water and emotion colors
      vec3 finalColor = mix(waterColor, emotionColor, 0.6);
      
      // Add shimmer effect
      float shimmer = sin(vUv.x * 50.0 + time) * cos(vUv.y * 50.0 + time * 1.3);
      finalColor += vec3(shimmer * 0.1);
      
      // Foam where waves peak
      float foam = smoothstep(1.5, 2.0, vHeight);
      finalColor = mix(finalColor, vec3(1.0), foam * 0.7);
      
      gl_FragColor = vec4(finalColor, transparency);
    }
  `,
  
  // Memory Constellation Shaders
  memoryVertex: `
    attribute vec3 position;
    attribute float size;
    attribute vec3 color;
    attribute float intensity;
    attribute float memoryAge; // How old this memory is
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float time;
    uniform float focusRadius; // Distance from camera for interaction
    uniform vec3 cameraPosition;
    
    varying vec3 vColor;
    varying float vIntensity;
    varying float vDistance;
    varying float vMemoryResonance;
    
    void main() {
      vec4 worldPosition = modelViewMatrix * vec4(position, 1.0);
      
      // Calculate distance to camera for proximity effects
      float distToCamera = length(cameraPosition - position);
      vDistance = distToCamera;
      
      // Memory resonance based on proximity and age
      float proximity = smoothstep(focusRadius * 2.0, focusRadius * 0.5, distToCamera);
      vMemoryResonance = proximity * (1.0 - memoryAge * 0.3);
      
      // Pulsing effect for active memories
      float pulse = sin(time * 2.0 + memoryAge * 10.0) * 0.3 + 0.7;
      vIntensity = intensity * pulse * (1.0 + vMemoryResonance);
      
      // Color shifts with memory activation
      vColor = color * (0.8 + vMemoryResonance * 0.4);
      
      // Size based on importance and proximity
      float pointSize = size * (1.0 + vMemoryResonance * 2.0);
      gl_PointSize = pointSize;
      
      gl_Position = projectionMatrix * worldPosition;
    }
  `,
  
  memoryFragment: `
    precision highp float;
    
    varying vec3 vColor;
    varying float vIntensity;
    varying float vDistance;
    varying float vMemoryResonance;
    
    void main() {
      // Create soft circular particles
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      
      // Soft edge falloff
      float alpha = smoothstep(0.5, 0.2, dist);
      
      // Memory glow effect
      float glow = exp(-dist * 4.0) * vMemoryResonance;
      vec3 finalColor = vColor + vec3(glow) * 0.5;
      
      // Intensity affects overall brightness
      finalColor *= vIntensity;
      
      // Distance fog for depth
      float fog = smoothstep(50.0, 20.0, vDistance);
      alpha *= fog;
      
      gl_FragColor = vec4(finalColor, alpha * 0.8);
    }
  `,
  
  // Shadow Work Cave Shaders
  shadowVertex: `
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;
    uniform float time;
    uniform vec3 lightPosition;
    uniform float shadowIntensity;
    
    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vLightDirection;
    varying float vShadowDepth;
    varying vec3 vWorldPosition;
    
    // Perlin noise approximation
    float noise(vec3 p) {
      return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
    }
    
    void main() {
      vec3 pos = position;
      
      // Cave wall undulation
      float noiseScale = 0.1;
      vec3 noisePos = pos * noiseScale + time * 0.05;
      float surfaceNoise = noise(noisePos) * 0.5;
      pos += normal * surfaceNoise;
      
      // Calculate lighting
      vWorldPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
      vLightDirection = normalize(lightPosition - vWorldPosition);
      vNormal = normalMatrix * normal;
      vUv = uv;
      
      // Shadow depth for fragment shader
      float lightDistance = length(lightPosition - pos);
      vShadowDepth = lightDistance * shadowIntensity;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  
  shadowFragment: `
    precision highp float;
    
    uniform float time;
    uniform vec3 ambientColor;
    uniform vec3 shadowColor;
    uniform float shadowStrength;
    uniform sampler2D thoughtTexture;
    
    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vLightDirection;
    varying float vShadowDepth;
    varying vec3 vWorldPosition;
    
    // Shadow work represents hidden aspects of psyche
    vec3 getShadowColor(float depth, vec3 thought) {
      vec3 deepShadow = vec3(0.05, 0.05, 0.15); // Deep blue-black
      vec3 lightShadow = vec3(0.3, 0.2, 0.4); // Purple twilight
      
      float shadowMix = smoothstep(0.0, 5.0, depth);
      vec3 baseShadow = mix(lightShadow, deepShadow, shadowMix);
      
      // Thoughts in the shadow (subconscious patterns)
      return mix(baseShadow, thought * 0.7, 0.3);
    }
    
    void main() {
      vec3 normal = normalize(vNormal);
      
      // Sample thought patterns texture
      vec3 thoughtPattern = texture2D(thoughtTexture, vUv + time * 0.01).rgb;
      
      // Basic lighting
      float lightIntensity = max(0.0, dot(normal, vLightDirection));
      
      // Shadow calculation
      float shadow = smoothstep(0.0, 1.0, vShadowDepth);
      shadow = pow(shadow, 2.0); // More dramatic falloff
      
      // Get therapeutic shadow color
      vec3 shadowTherapy = getShadowColor(vShadowDepth, thoughtPattern);
      
      // Mix ambient and shadow colors
      vec3 finalColor = mix(ambientColor, shadowTherapy, shadow * shadowStrength);
      
      // Add subtle thought particle sparkles
      float sparkle = step(0.95, sin(vWorldPosition.x * 30.0) * cos(vWorldPosition.y * 30.0));
      finalColor += thoughtPattern * sparkle * 0.2;
      
      // Apply lighting
      finalColor *= (0.3 + lightIntensity * 0.7);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
  
  // Growth Forest Ecosystem Shaders
  forestVertex: `
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;
    attribute float growthStage; // 0-1 representing growth progress
    attribute float treeType; // Different species of growth
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;
    uniform float time;
    uniform float seasonCycle; // 0-1 representing seasons
    uniform float userProgress; // Overall user growth progress
    
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vGrowthStage;
    varying float vTreeType;
    varying float vSeasonInfluence;
    varying vec3 vWorldPosition;
    
    // L-system inspired growth function
    vec3 applyGrowth(vec3 pos, float stage, float type) {
      float fibonacci = (1.0 + sqrt(5.0)) / 2.0;
      
      // Different growth patterns for different "tree types" (skills/traits)
      float growthHeight = stage * (2.0 + type * 3.0);
      float growthSpread = stage * (1.0 + sin(type * 6.28) * 0.5);
      
      // Fractal branching pattern
      float angle = atan(pos.z, pos.x) + type * fibonacci;
      float radius = length(pos.xz) * growthSpread;
      
      return vec3(
        pos.x + cos(angle) * growthSpread * 0.3,
        pos.y * growthHeight,
        pos.z + sin(angle) * growthSpread * 0.3
      );
    }
    
    void main() {
      vec3 pos = position;
      
      // Apply growth transformation
      pos = applyGrowth(pos, growthStage * userProgress, treeType);
      
      // Seasonal movement (swaying in wind)
      float windStrength = 0.5 + seasonCycle * 0.5;
      float sway = sin(time + pos.x * 0.1) * windStrength * 0.1;
      pos.x += sway * (pos.y / 5.0); // Sway more at top
      
      vNormal = normalMatrix * normal;
      vUv = uv;
      vGrowthStage = growthStage;
      vTreeType = treeType;
      vSeasonInfluence = seasonCycle;
      vWorldPosition = pos;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  
  forestFragment: `
    precision highp float;
    
    uniform float time;
    uniform float seasonCycle;
    uniform vec3 springColors[3];
    uniform vec3 summerColors[3];
    uniform vec3 autumnColors[3];
    uniform vec3 winterColors[3];
    
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vGrowthStage;
    varying float vTreeType;
    varying float vSeasonInfluence;
    varying vec3 vWorldPosition;
    
    // Get seasonal color based on cycle
    vec3 getSeasonalColor(float season, float treeType, float growth) {
      vec3 color1, color2;
      
      // Determine which season we're in
      float seasonIndex = season * 4.0;
      int currentSeason = int(floor(seasonIndex));
      float seasonBlend = fract(seasonIndex);
      
      if (currentSeason == 0) { // Spring
        color1 = springColors[int(treeType * 3.0)];
        color2 = summerColors[int(treeType * 3.0)];
      } else if (currentSeason == 1) { // Summer
        color1 = summerColors[int(treeType * 3.0)];
        color2 = autumnColors[int(treeType * 3.0)];
      } else if (currentSeason == 2) { // Autumn
        color1 = autumnColors[int(treeType * 3.0)];
        color2 = winterColors[int(treeType * 3.0)];
      } else { // Winter
        color1 = winterColors[int(treeType * 3.0)];
        color2 = springColors[int(treeType * 3.0)];
      }
      
      vec3 seasonColor = mix(color1, color2, seasonBlend);
      
      // Growth affects color vibrancy
      float vibrancy = 0.5 + growth * 0.5;
      return seasonColor * vibrancy;
    }
    
    void main() {
      vec3 normal = normalize(vNormal);
      
      // Get base seasonal color
      vec3 baseColor = getSeasonalColor(vSeasonInfluence, vTreeType, vGrowthStage);
      
      // Add bark texture for trunk areas
      float trunkArea = smoothstep(0.3, 0.0, vUv.y);
      vec3 barkColor = vec3(0.4, 0.3, 0.2) * (1.0 + vGrowthStage * 0.3);
      baseColor = mix(baseColor, barkColor, trunkArea);
      
      // Simple lighting
      vec3 lightDir = normalize(vec3(1.0, 2.0, 1.0));
      float lightIntensity = max(0.3, dot(normal, lightDir));
      
      // Growth shimmer effect
      float shimmer = sin(time * 3.0 + vWorldPosition.y * 0.5) * 0.1;
      shimmer *= vGrowthStage; // Only growing parts shimmer
      
      vec3 finalColor = baseColor * lightIntensity + vec3(shimmer);
      
      // Transparency for newer growth
      float alpha = 0.7 + vGrowthStage * 0.3;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

// Compute shaders for advanced GPU processing (WebGL 2.0)
export const ComputeShaders = {
  // Fluid dynamics compute shader for Emotion Ocean
  fluidCompute: `
    #version 300 es
    precision highp float;
    
    layout(local_size_x = 16, local_size_y = 16, local_size_z = 1) in;
    
    layout(binding = 0, r32f) uniform image2D velocityField;
    layout(binding = 1, rgba32f) uniform image2D emotionField;
    
    uniform float deltaTime;
    uniform float viscosity;
    uniform vec2 userInput; // Mouse/touch position for ripples
    uniform vec3 currentEmotion; // User's current emotional state
    uniform float emotionalIntensity;
    
    // Navier-Stokes equations for fluid simulation
    void main() {
      ivec2 coord = ivec2(gl_GlobalInvocationID.xy);
      ivec2 size = imageSize(velocityField);
      
      if (coord.x >= size.x || coord.y >= size.y) return;
      
      vec2 uv = vec2(coord) / vec2(size);
      
      // Sample neighboring cells for fluid dynamics
      float left = imageLoad(velocityField, coord + ivec2(-1, 0)).r;
      float right = imageLoad(velocityField, coord + ivec2(1, 0)).r;
      float bottom = imageLoad(velocityField, coord + ivec2(0, -1)).r;
      float top = imageLoad(velocityField, coord + ivec2(0, 1)).r;
      float center = imageLoad(velocityField, coord).r;
      
      // Laplacian for diffusion
      float laplacian = (left + right + bottom + top - 4.0 * center);
      
      // Update velocity with diffusion and advection
      float newVelocity = center + deltaTime * (viscosity * laplacian);
      
      // Add user interaction ripples
      vec2 distToInput = uv - userInput;
      float inputDistance = length(distToInput);
      if (inputDistance < 0.1) {
        float rippleStrength = (0.1 - inputDistance) / 0.1;
        newVelocity += rippleStrength * emotionalIntensity * 0.5;
      }
      
      // Update emotional field based on fluid flow
      vec4 emotion = imageLoad(emotionField, coord);
      emotion.rgb = mix(emotion.rgb, currentEmotion, deltaTime * 0.1);
      emotion.a = mix(emotion.a, emotionalIntensity, deltaTime * 0.2);
      
      // Write results
      imageStore(velocityField, coord, vec4(newVelocity));
      imageStore(emotionField, coord, emotion);
    }
  `,
  
  // Particle system compute shader for various effects
  particleCompute: `
    #version 300 es
    precision highp float;
    
    layout(local_size_x = 64, local_size_y = 1, local_size_z = 1) in;
    
    layout(binding = 0, rgba32f) uniform image2D particleData; // position.xyz, life
    layout(binding = 1, rgba32f) uniform image2D particleVelocity; // velocity.xyz, mass
    
    uniform float deltaTime;
    uniform float time;
    uniform vec3 attractorPosition;
    uniform float attractorStrength;
    uniform vec3 windForce;
    uniform float breathPhase; // For breathing universe particles
    
    // Random number generation
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(127.1,311.7))) * 43758.5453123);
    }
    
    void main() {
      uint index = gl_GlobalInvocationID.x;
      ivec2 coord = ivec2(index % 512u, index / 512u);
      
      vec4 particle = imageLoad(particleData, coord);
      vec4 velocity = imageLoad(particleVelocity, coord);
      
      vec3 position = particle.xyz;
      float life = particle.w;
      vec3 vel = velocity.xyz;
      float mass = velocity.w;
      
      if (life <= 0.0) {
        // Respawn particle
        position = vec3(
          random(vec2(index, time)) * 20.0 - 10.0,
          random(vec2(index + 100.0, time)) * 20.0 - 10.0,
          random(vec2(index + 200.0, time)) * 20.0 - 10.0
        );
        vel = vec3(0.0);
        life = 1.0;
        mass = 0.5 + random(vec2(index, time + 300.0)) * 0.5;
      }
      
      // Physics simulation
      vec3 force = vec3(0.0);
      
      // Attractor force (breathing center, memory focus, etc.)
      vec3 toAttractor = attractorPosition - position;
      float distance = length(toAttractor);
      if (distance > 0.0) {
        force += normalize(toAttractor) * attractorStrength / (distance * distance + 1.0);
      }
      
      // Wind/breathing force
      force += windForce * sin(breathPhase * 6.28);
      
      // Gravity (emotional weight)
      force += vec3(0.0, -mass * 0.1, 0.0);
      
      // Update velocity and position
      vel += force * deltaTime / mass;
      vel *= 0.99; // Air resistance
      position += vel * deltaTime;
      
      // Age particle
      life -= deltaTime * 0.01;
      
      // Store results
      imageStore(particleData, coord, vec4(position, life));
      imageStore(particleVelocity, coord, vec4(vel, mass));
    }
  `
};

// Helper functions for shader management
export class ShaderManager {
  static compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }
  
  static createProgram(gl, vertexSource, fragmentSource) {
    const vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    
    if (!vertexShader || !fragmentShader) {
      return null;
    }
    
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  }
  
  static createComputeProgram(gl, computeSource) {
    const computeShader = this.compileShader(gl, gl.COMPUTE_SHADER, computeSource);
    
    if (!computeShader) {
      return null;
    }
    
    const program = gl.createProgram();
    gl.attachShader(program, computeShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Compute program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  }
}