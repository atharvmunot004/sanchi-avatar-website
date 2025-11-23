'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { ErrorBoundary } from 'react-error-boundary'
import * as THREE from 'three'
import useAvatarStore from '@/store/avatarStore'

function FallbackModel() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4A5568" />
    </mesh>
  )
}

function PlaceholderText() {
  const baseMesh = useAvatarStore((state) => state.baseMesh)
  
  if (baseMesh) return null
  
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#FFFFFF',
        fontSize: '12px',
        pointerEvents: 'none',
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      Sculpt here
    </div>
  )
}

function AvatarModel() {
  const { baseMesh, hairMesh, apparelMesh } = useAvatarStore()
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation can be added here if needed
    }
  })

  // Determine vertical offset based on model
  let verticalOffset = 0
  if (baseMesh && baseMesh.includes('base_female')) {
    verticalOffset = -0.3
  } else if (baseMesh && (baseMesh.includes('fullfigure.glb') || baseMesh.includes('fullfigure2.glb'))) {
    verticalOffset = -0.3
  }

  return (
    <group ref={groupRef} position={[0, verticalOffset, 0]}>
      {baseMesh && <ModelLoader url={baseMesh} />}
      {hairMesh && <ModelLoader url={hairMesh} />}
      {apparelMesh && <ModelLoader url={apparelMesh} />}
      {!baseMesh && <FallbackModel />}
    </group>
  )
}

function ModelLoader({ url }: { url: string }) {
  try {
    // Use preload to ensure models are loaded
    useGLTF.preload(url)
    const { scene } = useGLTF(url)
    const clonedScene = scene.clone()
    
    // Center and scale all models
    const bbox = new THREE.Box3().setFromObject(clonedScene)
    const center = bbox.getCenter(new THREE.Vector3())
    const size = bbox.getSize(new THREE.Vector3())
    
    // Center the model
    clonedScene.position.sub(center)
    
    // Scale to fit in a consistent size
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.2 / maxDim
    clonedScene.scale.multiplyScalar(scale)
    
    return <primitive key={url} object={clonedScene} />
  } catch {
    return null
  }
}

export default function AvatarViewport() {
  return (
    <div
      style={{
        width: '200px',
        height: '200px',
        borderRadius: '0px',
        overflow: 'hidden',
        background: '#0C0C0C',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Canvas
        camera={{ position: [0, 1.6, 3.5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <Suspense fallback={<FallbackModel />}>
          <ErrorBoundary fallback={<FallbackModel />}>
            <AvatarModel />
          </ErrorBoundary>
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          minDistance={2}
          maxDistance={6}
        />
        <Environment preset="studio" />
      </Canvas>
      <PlaceholderText />
    </div>
  )
}

