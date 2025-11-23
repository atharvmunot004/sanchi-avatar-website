'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { ErrorBoundary } from 'react-error-boundary'
import * as THREE from 'three'

interface ModelViewerProps {
  modelUrl: string
  defaultRotation?: { x: number; y: number; z: number }
}

function FallbackModel() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4A5568" />
    </mesh>
  )
}

function ModelLoader({ url }: { url: string }) {
  try {
    const { scene } = useGLTF(url)
    const clonedScene = scene.clone()
    
    // Center and scale the model
    const bbox = new THREE.Box3().setFromObject(clonedScene)
    const center = bbox.getCenter(new THREE.Vector3())
    const size = bbox.getSize(new THREE.Vector3())
    
    // Center the model
    clonedScene.position.sub(center)
    
    // Scale to fit in a consistent size
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.2 / maxDim
    clonedScene.scale.multiplyScalar(scale)
    
    return <primitive object={clonedScene} />
  } catch (error) {
    console.error('Error loading model:', error)
    return <FallbackModel />
  }
}

function RotatingModel({ 
  url, 
  defaultRotation 
}: { 
  url: string
  defaultRotation?: { x: number; y: number; z: number }
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current && defaultRotation) {
      groupRef.current.rotation.x = defaultRotation.x
      groupRef.current.rotation.y = defaultRotation.y
      groupRef.current.rotation.z = defaultRotation.z
    }
  })

  return (
    <group ref={groupRef}>
      <ModelLoader url={url} />
    </group>
  )
}

export default function ModelViewer({ modelUrl, defaultRotation }: ModelViewerProps) {
  return (
    <div
      style={{
        width: '420px',
        height: '420px',
        borderRadius: '50%',
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
            <RotatingModel url={modelUrl} defaultRotation={defaultRotation} />
          </ErrorBoundary>
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          minDistance={2}
          maxDistance={6}
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}

