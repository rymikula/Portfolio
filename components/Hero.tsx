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
  PointMaterial,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
  PerformanceMonitor,
  Stats
} from '@react-three/drei'
import { useRef, useState, useEffect, Suspense, useMemo, useCallback, memo } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Create a context to share visibility and device state
import { createContext, useContext } from 'react'

const AppContext = createContext({ 
  isVisible: true,
  isMobile: false,
  isLowPerformance: false
})

// Memoize skybox component to prevent unnecessary re-renders
const SpaceSkybox = memo(function SpaceSkybox() {
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
})

function AnimatedShape() {
  const mainMeshRef = useRef<THREE.Mesh>(null)
  const sphereRefs = useRef<(THREE.Mesh | null)[]>([])
  const { isVisible, isMobile, isLowPerformance } = useContext(AppContext)

  // Reduce complexity for mobile
  const complexity = useMemo(() => {
    return isMobile ? 0.5 : 1
  }, [isMobile])

  useFrame((state, delta) => {
    // Only run animations if visible
    if (!isVisible) return
    
    // Slow down animations on low-performance devices
    const adjustedDelta = isLowPerformance ? delta * 0.5 : delta
    
    if (mainMeshRef.current) {
      mainMeshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
      mainMeshRef.current.rotation.y += adjustedDelta * 0.3
    }
    
    // Animate each sphere independently, but skip some calculations on mobile
    sphereRefs.current.forEach((sphere, i) => {
      if (sphere) {
        const time = state.clock.elapsedTime
        
        // Create unique orbital patterns for each sphere
        const baseRadius = 3.5 // Increased base radius
        const verticalOffset = Math.sin(time * 0.5 + (i * Math.PI / 2)) * 0.5 // Vertical movement
        
        // Calculate unique orbit parameters for each sphere
        const orbitRadius = baseRadius + (i * 0.3) // Gradually increasing orbit sizes
        const speed = (0.2 + (i * 0.1)) * (isLowPerformance ? 0.6 : 1) // More varied speeds, slower on mobile
        const phaseOffset = i * (Math.PI / 2) // Evenly spaced starting positions
        
        // Skip complex calculations on mobile
        let newPosition;
        if (isLowPerformance) {
          // Simpler orbit calculation for mobile
          sphere.position.x = Math.cos(time * speed + phaseOffset) * orbitRadius
          sphere.position.y = verticalOffset + (i * 0.8 - 1.2)
          sphere.position.z = Math.sin(time * speed + phaseOffset) * (orbitRadius * 0.8)
        } else {
          // Full complex orbital pattern for desktop
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
        }
        
        // Enhanced rotation animation, reduced for mobile
        const rotSpeed = (0.8 + (i * 0.2)) * (isLowPerformance ? 0.5 : 1)
        sphere.rotation.x += adjustedDelta * (rotSpeed + (isLowPerformance ? 0 : Math.sin(time + i)))
        sphere.rotation.y += adjustedDelta * (rotSpeed * 1.2 + (isLowPerformance ? 0 : Math.cos(time + i)))
        sphere.rotation.z += adjustedDelta * (rotSpeed * 0.8 + (isLowPerformance ? 0 : Math.sin(time * 1.5 + i)))
        
        // Scale variation based on position, simplified for mobile
        const baseSphereScale = 0.25
        let breathingScale = 1;
        if (!isLowPerformance) {
          breathingScale += Math.sin(time * 1.5 + i * Math.PI / 2) * 0.1;
        }
        sphere.scale.set(
          baseSphereScale * breathingScale,
          baseSphereScale * breathingScale,
          baseSphereScale * breathingScale
        )
      }
    })
  })

  // Reduce geometry complexity for mobile
  const torusKnotArgs = useMemo(() => {
    return isMobile ? 
      [1, 0.3, 100, 16] as [number, number, number, number] : 
      [1, 0.3, 200, 32] as [number, number, number, number]
  }, [isMobile])
  
  const sphereArgs = useMemo(() => {
    return isMobile ? 
      [1, 16, 16] as [number, number, number] : 
      [1, 32, 32] as [number, number, number]
  }, [isMobile])

  return (
    <group>
      {/* Main torus knot */}
      <Float
        speed={2 * (isLowPerformance ? 0.6 : 1)}
        rotationIntensity={2 * (isLowPerformance ? 0.6 : 1)}
        floatIntensity={1 * (isLowPerformance ? 0.6 : 1)}
      >
        <mesh
          ref={mainMeshRef}
          scale={1.2}
        >
          <torusKnotGeometry args={torusKnotArgs} />
          <MeshDistortMaterial
            color="#2c1810"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            transmission={0.8}
            roughness={0.2}
            speed={3 * (isLowPerformance ? 0.5 : 1)}
            distort={0.4 * (isLowPerformance ? 0.7 : 1)}
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
          <sphereGeometry args={sphereArgs} />
          <MeshDistortMaterial
            color={i % 2 === 0 ? "#3d2317" : "#4a2f25"}
            envMapIntensity={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            transmission={0.8}
            roughness={0.2}
            speed={(2 + i) * (isLowPerformance ? 0.5 : 1)}
            distort={(0.4 + (i * 0.1)) * (isLowPerformance ? 0.7 : 1)}
            radius={1}
          />
        </mesh>
      ))}
    </group>
  )
}

// Replace RenderOptimizer component with enhanced version
function RenderOptimizer() {
  const { gl, scene, camera } = useThree()
  const { isVisible, isMobile, isLowPerformance } = useContext(AppContext)
  
  useEffect(() => {
    // Apply mobile-specific optimizations
    if (isMobile) {
      gl.setPixelRatio(Math.min(window.devicePixelRatio, isLowPerformance ? 1 : 1.5));
    }
    
    // When not visible, render one final frame then stop
    if (!isVisible) {
      gl.render(scene, camera);
      gl.setAnimationLoop(null);
    }
    
    return () => {
      gl.setAnimationLoop(null);
    };
  }, [gl, isVisible, scene, camera, isMobile, isLowPerformance]);
  
  return null;
}

// Memoize the Scene component
const Scene = memo(function Scene() {
  const { isVisible, isMobile, isLowPerformance } = useContext(AppContext)
  
  // Local state for scene-specific performance adjustments
  const [lowPerformance, setLowPerformance] = useState(isLowPerformance)
  
  // Effect to sync context performance state with local state
  useEffect(() => {
    setLowPerformance(isLowPerformance)
  }, [isLowPerformance])
  
  // Modify OrbitControls to respect visibility
  const autoRotateSpeed = isVisible ? (isMobile ? 0.3 : 0.6) : 0 // Lower rotation speed on mobile
  
  // Scale down particle effects on mobile or when performance is low
  const particleScale = (isMobile || lowPerformance) ? 0.5 : 1;
  const particleCount = (isMobile || lowPerformance) ? 0.5 : 1;
  
  return (
    <>
      {/* Add Stats at the top */}
      {process.env.NODE_ENV === 'development' && <Stats className="fps-monitor" />}
      
      {/* Space environment */}
      <color attach="background" args={['#1a0f0a']} />
      <Environment preset="sunset" background blur={0.8} />
      <fog attach="fog" args={['#1a0f0a', isMobile ? 10 : 15, isMobile ? 25 : 35]} />
      
      {/* Performance monitoring and optimization */}
      <RenderOptimizer />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <BakeShadows />
      <PerformanceMonitor 
        onDecline={() => {
          // Further reduce quality when performance declines
          console.log("Performance declining, reducing quality");
          setLowPerformance(true);
        }}
      />
      
      {/* Enhanced base lighting */}
      <ambientLight intensity={0.25} color="#3d2317" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#5c3a2e" />
      <directionalLight position={[-10, -10, -5]} intensity={0.9} color="#4a2f25" />
      
      {/* Reduce number of lights on mobile */}
      {!isMobile && (
        <>
          {/* Enhanced gradient effect using strategically placed lights */}
          <pointLight position={[0, 15, 0]} intensity={1.8} color="#6b4433" />
          <pointLight position={[0, -15, 0]} intensity={1.8} color="#8b5e3c" />
          <pointLight position={[15, 0, 0]} intensity={1.2} color="#4a2f25" />
          <pointLight position={[-15, 0, 0]} intensity={1.2} color="#5c3a2e" />
        </>
      )}
      
      {/* Enhanced center light for the shape */}
      <pointLight position={[0, 0, 2]} intensity={1.8} color="#fff5e6" />

      {/* Main animated shape with enhanced Float properties */}
      <Float
        speed={1.5 * (isMobile ? 0.6 : 1)}
        rotationIntensity={1.2 * (isMobile ? 0.6 : 1)}
        floatIntensity={1.5 * (isMobile ? 0.6 : 1)}
      >
        <AnimatedShape />
      </Float>
      
      {/* Enhanced brown nebula effects - reduced for mobile */}
      <Sparkles
        count={80 * particleCount}
        scale={35 * particleScale}
        size={10 * particleScale}
        speed={0.15 * (isMobile ? 0.6 : 1)}
        color="#8b5e3c"
        opacity={0.5}
      />

      {/* Enhanced bright accent stars - reduced for mobile */}
      <Sparkles
        count={35 * particleCount}
        scale={12 * particleScale}
        size={8 * particleScale}
        speed={0.4 * (isMobile ? 0.6 : 1)}
        color="#fff"
        opacity={0.95}
      />
      
      {/* Skip this layer on very low performance devices */}
      {!lowPerformance && (
        <Sparkles
          count={20 * particleCount}
          scale={10 * particleScale}
          size={10 * particleScale}
          speed={0.3 * (isMobile ? 0.6 : 1)}
          color="#ffeedd"
          opacity={1}
        />
      )}

      {/* Enhanced orbit controls with reduced damping for mobile */}
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
        dampingFactor={isMobile ? 0.1 : 0.05}
      />
    </>
  )
})

// Memoize the Loader component
const Loader = memo(function Loader() {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#030014] text-white">
      <div className="text-2xl">{progress.toFixed(0)}%</div>
    </div>
  );
})

// Export the optimized Hero component
export default memo(function Hero() {
  const [sceneReady, setSceneReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const scrollThreshold = 100; // Hide indicator after scrolling 100px
  const [isMobile, setIsMobile] = useState(false);
  // Add state for visibility and performance
  const [isVisible, setIsVisible] = useState(true);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if device is mobile and evaluate performance capabilities
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
      
      // Estimate if this is a low performance device
      const isLowPerf = isMobileDevice && (
        /Android/.test(navigator.userAgent) || 
        /iPhone|iPad|iPod/.test(navigator.userAgent)
      );
      setIsLowPerformance(isLowPerf);
      
      console.log("Device:", isMobileDevice ? "Mobile" : "Desktop", "Performance:", isLowPerf ? "Low" : "High");
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
      {/* Provide context to Three.js components */}
      <AppContext.Provider value={{ isVisible, isMobile, isLowPerformance }}>
        {/* 3D Scene Container */}
        <div className="absolute inset-0 overflow-hidden" style={{ touchAction: 'pan-y pinch-zoom' }}>
          {/* Always render Canvas */}
          <Canvas
            camera={{
              position: [0, 0, 8],
              fov: 45,
              near: 0.1,
              far: 1000
            }}
            gl={{
              antialias: !isMobile, // Disable antialiasing on mobile
              toneMapping: THREE.ACESFilmicToneMapping,
              outputColorSpace: THREE.SRGBColorSpace,
              powerPreference: "high-performance",
            }}
            dpr={[0.6, isLowPerformance ? 1 : 2]} // Lower resolution on mobile
            frameloop={isVisible ? "always" : "never"} // Stop frame loop when not visible
            performance={{ min: 0.1 }} // Allow very low performance
            onCreated={(state) => {
              // Force a lower pixel ratio on mobile
              if (isMobile) {
                state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
              }
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
      </AppContext.Provider>
    </div>
  )
}) 