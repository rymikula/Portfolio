'use client'

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Stars,
  Float,
  MeshDistortMaterial,
  Environment,
  Sparkles,
  useProgress,
  Sky,
  useTexture,
  Points,
  PointMaterial
} from '@react-three/drei'
import { useRef, useState, useEffect, Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Create a context to share visibility state
import { createContext, useContext } from 'react'

const VisibilityContext = createContext({ isVisible: true })

function SpaceSkybox() {
  return (
    <>
      <Environment
        files={[
          '/skybox/space_ft.png',
          '/skybox/space_bk.png',
          '/skybox/space_up.png',
          '/skybox/space_dn.png',
          '/skybox/space_rt.png',
          '/skybox/space_lf.png'
        ]}
        background
        blur={0.5}
      />
      <fog attach="fog" args={['#0a0227', 15, 35]} />
    </>
  )
}

function AnimatedShape() {
  const mainMeshRef = useRef<THREE.Mesh>(null)
  const sphereRefs = useRef<(THREE.Mesh | null)[]>([])
  const { isVisible } = useContext(VisibilityContext)

  useFrame((state, delta) => {
    // Only run animations if visible
    if (!isVisible) return
    
    if (mainMeshRef.current) {
      mainMeshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
      mainMeshRef.current.rotation.y += delta * 0.3
    }
    
    // Animate each sphere independently
    sphereRefs.current.forEach((sphere, i) => {
      if (sphere) {
        const time = state.clock.elapsedTime
        
        // Create unique orbital patterns for each sphere
        const baseRadius = 3.5 // Increased base radius
        const verticalOffset = Math.sin(time * 0.5 + (i * Math.PI / 2)) * 0.5 // Vertical movement
        
        // Calculate unique orbit parameters for each sphere
        const orbitRadius = baseRadius + (i * 0.3) // Gradually increasing orbit sizes
        const speed = 0.2 + (i * 0.1) // More varied speeds
        const phaseOffset = i * (Math.PI / 2) // Evenly spaced starting positions
        
        // Calculate position with Lissajous-like curves for more complex orbits
        const xFreq = 1 + (i * 0.2)
        const zFreq = 2 - (i * 0.15)
        
        // Position calculation with complex orbital pattern
        sphere.position.x = Math.cos(time * speed * xFreq + phaseOffset) * orbitRadius
        sphere.position.y = verticalOffset + (i * 0.8 - 1.2) // Distributed height levels
        sphere.position.z = Math.sin(time * speed * zFreq + phaseOffset) * (orbitRadius * 0.8)
        
        // Apply unique tilt to each orbit
        const tiltAngle = (i * Math.PI / 4) // 45-degree increments
        const rotationMatrix = new THREE.Matrix4()
        rotationMatrix.makeRotationX(tiltAngle)
        const position = new THREE.Vector3(sphere.position.x, sphere.position.y, sphere.position.z)
        position.applyMatrix4(rotationMatrix)
        
        sphere.position.copy(position)
        
        // Enhanced rotation animation
        const rotSpeed = 0.8 + (i * 0.2)
        sphere.rotation.x += delta * (rotSpeed + Math.sin(time + i))
        sphere.rotation.y += delta * (rotSpeed * 1.2 + Math.cos(time + i))
        sphere.rotation.z += delta * (rotSpeed * 0.8 + Math.sin(time * 1.5 + i))
        
        // Scale variation based on position
        const baseSphereScale = 0.25
        const breathingScale = 1 + Math.sin(time * 1.5 + i * Math.PI / 2) * 0.1
        sphere.scale.set(
          baseSphereScale * breathingScale,
          baseSphereScale * breathingScale,
          baseSphereScale * breathingScale
        )
      }
    })
  })

  return (
    <group>
      {/* Main torus knot */}
      <Float
        speed={2}
        rotationIntensity={2}
        floatIntensity={1}
      >
        <mesh
          ref={mainMeshRef}
          scale={1.2}
        >
          <torusKnotGeometry args={[1, 0.3, 200, 32]} />
          <MeshDistortMaterial
            color="#2c1810"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            transmission={0.8}
            roughness={0.2}
            speed={3}
            distort={0.4}
            radius={1}
          />
        </mesh>
      </Float>

      {/* Orbiting spheres with unique materials */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <mesh
          key={i}
          ref={(el) => {
            sphereRefs.current[i] = el
          }}
          scale={0.25}
          position={[
            Math.cos(angle) * (3.5 + i * 0.3),
            i * 0.8 - 1.2,
            Math.sin(angle) * (3.5 + i * 0.3)
          ]}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color={i % 2 === 0 ? "#3d2317" : "#4a2f25"}
            envMapIntensity={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            transmission={0.8}
            roughness={0.2}
            speed={2 + i}
            distort={0.4 + (i * 0.1)}
            radius={1}
          />
        </mesh>
      ))}
    </group>
  )
}

function StarField() {
  // Reduce star count for better performance while maintaining visual density
  const count = 5000
  const [starData] = useState(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      // Distribute stars in a sphere for more natural space feel
      const radius = Math.random() * 50 + 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // More natural color distribution
      const temperature = Math.random()
      if (temperature > 0.95) { // Blue-white hot stars (rare)
        colors[i * 3] = 0.9
        colors[i * 3 + 1] = 0.95
        colors[i * 3 + 2] = 1
      } else if (temperature > 0.8) { // Warm yellow stars
        colors[i * 3] = 1
        colors[i * 3 + 1] = 0.95
        colors[i * 3 + 2] = 0.8
      } else { // Common white stars
        colors[i * 3] = 0.93
        colors[i * 3 + 1] = 0.93
        colors[i * 3 + 2] = 0.93
      }

      // More controlled size distribution
      const sizeRoll = Math.random()
      if (sizeRoll > 0.995) { // Very large stars (0.5%)
        sizes[i] = 3.0 + Math.random() * 2.0
      } else if (sizeRoll > 0.95) { // Medium stars (4.5%)
        sizes[i] = 1.5 + Math.random() * 1.5
      } else { // Small stars (95%)
        sizes[i] = 0.1 + Math.random() * 0.5
      }
    }
    return { positions, colors, sizes }
  })

  const pointsRef = useRef<THREE.Points>(null)
  const { isVisible } = useContext(VisibilityContext)
  
  useFrame((state) => {
    // Only run animations if visible
    if (!isVisible || !pointsRef.current) return
    
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    if (pointsRef.current.material instanceof THREE.ShaderMaterial) {
      pointsRef.current.material.uniforms.time.value = state.clock.elapsedTime
    }
  })

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    pixelRatio: { value: window.devicePixelRatio }
  }), [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={starData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={starData.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={starData.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        uniforms={uniforms}
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          varying float vSize;
          varying float vDistance;
          uniform float time;
          
          void main() {
            vColor = color;
            vSize = size;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vDistance = length(mvPosition.xyz);
            gl_Position = projectionMatrix * mvPosition;
            
            // Smooth size falloff with distance
            float distanceFactor = smoothstep(50.0, 5.0, vDistance);
            float sizeScale = size * (0.5 + distanceFactor * 0.5);
            
            // Subtle twinkling based on size
            float twinkle = 1.0 + sin(time * (1.0 + size) + size * 832.37) * 0.2;
            
            gl_PointSize = sizeScale * twinkle * 2.0;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vSize;
          varying float vDistance;
          uniform float time;
          
          float softCircle(vec2 uv, float radius) {
            float d = length(uv);
            float t = smoothstep(radius, radius * 0.9, d);
            return t;
          }
          
          void main() {
            vec2 uv = gl_PointCoord * 2.0 - 1.0;
            float d = length(uv);
            
            // Smooth circular base
            float circle = softCircle(uv, 1.0);
            
            // Gaussian falloff for natural glow
            float glow = exp(-d * d * 2.0);
            
            // Subtle ray effect based on size
            float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 8.0));
            rays *= smoothstep(0.5, 1.5, vSize);
            
            // Combine effects
            float brightness = circle * glow + rays * 0.3;
            brightness *= smoothstep(50.0, 5.0, vDistance);
            
            // Apply color with intensity falloff
            vec3 color = vColor * brightness;
            
            // HDR-like effect for bright stars
            color += pow(color, vec3(2.0)) * smoothstep(1.0, 3.0, vSize);
            
            gl_FragColor = vec4(color, brightness);
          }
        `}
      />
    </points>
  )
}

// Optimization component to pause/resume rendering
function RenderOptimizer() {
  const { gl, scene, camera } = useThree()
  const { isVisible } = useContext(VisibilityContext)
  
  useEffect(() => {
    // Define animation function outside conditional blocks
    function animate() {
      gl.render(scene, camera);
    }
    
    // Only set up animation loop if visible
    if (isVisible) {
      // When becoming visible again, ensure we render at least once
      gl.render(scene, camera);
      
      // Set up animation loop
      gl.setAnimationLoop(animate);
    } else {
      // When not visible, stop animation loop but keep last frame
      gl.setAnimationLoop(null);
      
      // Render one final frame to ensure the scene is updated
      gl.render(scene, camera);
    }
    
    return () => {
      gl.setAnimationLoop(null);
    };
  }, [gl, isVisible, scene, camera]);
  
  return null;
}

function Scene() {
  const { isVisible } = useContext(VisibilityContext)
  
  // Modify OrbitControls to respect visibility
  const autoRotateSpeed = isVisible ? 0.6 : 0 // Stop auto-rotation when not visible
  
  return (
    <>
      {/* Space environment */}
      <color attach="background" args={['#1a0f0a']} />
      <Environment preset="sunset" background blur={0.8} />
      <fog attach="fog" args={['#1a0f0a', 15, 35]} />
      
      {/* Add render optimizer */}
      <RenderOptimizer />
      
      {/* Enhanced base lighting */}
      <ambientLight intensity={0.25} color="#3d2317" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#5c3a2e" />
      <directionalLight position={[-10, -10, -5]} intensity={0.9} color="#4a2f25" />
      
      {/* Enhanced gradient effect using strategically placed lights */}
      <pointLight position={[0, 15, 0]} intensity={1.8} color="#6b4433" />
      <pointLight position={[0, -15, 0]} intensity={1.8} color="#8b5e3c" />
      <pointLight position={[15, 0, 0]} intensity={1.2} color="#4a2f25" />
      <pointLight position={[-15, 0, 0]} intensity={1.2} color="#5c3a2e" />
      
      {/* Enhanced center light for the shape */}
      <pointLight position={[0, 0, 2]} intensity={1.8} color="#fff5e6" />

      {/* Main animated shape with enhanced Float properties */}
      <Float
        speed={1.5}
        rotationIntensity={1.2}
        floatIntensity={1.5}
      >
        <AnimatedShape />
      </Float>
      
      {/* Optimized background star field with realistic stars */}
      <StarField />
      
      {/* Enhanced brown nebula effects - increased size and count */}
      <Sparkles
        count={80}
        scale={35}
        size={10}
        speed={0.15}
        color="#8b5e3c"
        opacity={0.5}
      />

      {/* Enhanced bright accent stars - increased size and count */}
      <Sparkles
        count={35}
        scale={12}
        size={8}
        speed={0.4}
        color="#fff"
        opacity={0.95}
      />
      
      {/* Enhanced additional bright stars layer */}
      <Sparkles
        count={20}
        scale={10}
        size={10}
        speed={0.3}
        color="#ffeedd"
        opacity={1}
      />

      {/* Enhanced orbit controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={isVisible}
        autoRotateSpeed={autoRotateSpeed}
        target={[0, 0, 0]}
        makeDefault
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

function Loader() {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#030014] text-white">
      <div className="text-2xl">{progress.toFixed(0)}%</div>
    </div>
  );
}

export default function Hero() {
  const [sceneReady, setSceneReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const scrollThreshold = 100; // Hide indicator after scrolling 100px
  const [isMobile, setIsMobile] = useState(false);
  // Add state for visibility
  const [isVisible, setIsVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Add touch event handler for mobile
    const handleTouchMove = (e: TouchEvent) => {
      // If touch movement is more horizontal than vertical, prevent default
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const moveX = Math.abs(touch.clientX - touch.screenX);
        const moveY = Math.abs(touch.clientY - touch.screenY);
        
        // Only prevent default for horizontal scrolling
        if (moveX > moveY) {
          e.preventDefault();
        }
      }
    };
    
    // Track scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Set up Intersection Observer to detect visibility
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
        console.log("Hero section visibility:", entry.isIntersecting);
      },
      {
        // Trigger when at least 10% of the element is visible
        threshold: 0.1,
        // Start observing slightly before the element comes into view
        rootMargin: "100px 0px" 
      }
    );
    
    // Start observing
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    // Add event listeners
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      
      // Clean up observer
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Function to handle scroll past hero section
  const scrollPastHero = () => {
    const heroHeight = window.innerHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={heroRef} className="relative h-screen w-full bg-[#1a0f0a] z-20 overflow-hidden">
      {/* Provide visibility context to Three.js components */}
      <VisibilityContext.Provider value={{ isVisible }}>
        {/* 3D Scene Container */}
        <div className="absolute inset-0 overflow-hidden" style={{ touchAction: 'pan-y pinch-zoom' }}>
          {/* Always render Canvas, no conditional rendering */}
          <Canvas
            camera={{
              position: [0, 0, 8],
              fov: 45,
              near: 0.1,
              far: 1000
            }}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputColorSpace: THREE.SRGBColorSpace
            }}
            onCreated={() => {
              setTimeout(() => setSceneReady(true), 500);
            }}
            className="touch-auto"
          >
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        {/* Loading Screen */}
        {!sceneReady && <Loader />}

        {/* Text Overlay */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            sceneReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Gradient overlay with pointer-events-none */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none" />
          
          {/* Center content container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`text-center ${isMobile ? 'pointer-events-auto' : 'pointer-events-none'}`}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: sceneReady ? 1 : 0, y: sceneReady ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-6 text-7xl font-bold text-white drop-shadow-2xl [text-shadow:_0_4px_24px_rgba(0,0,0,1)] pointer-events-none"
              >
                Ryan Mikula
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: sceneReady ? 1 : 0, y: sceneReady ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-2xl font-light text-gray-200 drop-shadow-2xl [text-shadow:_0_4px_24px_rgba(0,0,0,1)] pointer-events-none mb-6"
              >
                Incoming Software Engineer & Computer Science Graduate Student
              </motion.p>
              
              {/* Mobile button positioned directly under the text */}
              {isMobile && (
                <motion.div 
                  className="mt-8 z-50 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: sceneReady && scrollY < scrollThreshold ? 1 : 0,
                    y: sceneReady ? 0 : 20
                  }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <button 
                    onClick={scrollPastHero}
                    className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/50 text-white font-medium shadow-lg hover:bg-white/30 transition-all pointer-events-auto"
                  >
                    Explore More
                  </button>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Scroll indicator (desktop only) */}
          {!isMobile && (
            <motion.div 
              className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: sceneReady && scrollY < scrollThreshold ? 1 : 0,
                y: scrollY < scrollThreshold ? 0 : 20
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center">
                <p className="text-white text-sm mb-2">Scroll Down</p>
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                  <motion.div 
                    className="w-1 h-2 bg-white rounded-full"
                    animate={{ 
                      y: [0, 6, 0],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </VisibilityContext.Provider>
    </div>
  )
} 