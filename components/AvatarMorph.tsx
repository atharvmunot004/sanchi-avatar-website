'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import useAvatarStore from '@/store/avatarStore'
import AvatarViewport from '@/components/AvatarViewport'
import * as THREE from 'three'

export default function AvatarMorph() {
  const { userImage } = useAvatarStore()
  const [showMorphed, setShowMorphed] = useState(false)
  const [faceTexture, setFaceTexture] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Extract face region from image and create texture
  useEffect(() => {
    if (userImage && !faceTexture) {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        canvas.width = img.width
        canvas.height = img.height

        // Draw image
        ctx.drawImage(img, 0, 0)

        // Extract face region (center portion) - approximately the upper half for face
        // This creates a circular face mask
        const faceSize = Math.min(img.width, img.height) * 0.7
        const faceX = (img.width - faceSize) / 2
        const faceY = (img.height - faceSize) / 2.5 // Position face higher

        // Create new canvas for face extraction
        const faceCanvas = document.createElement('canvas')
        faceCanvas.width = 512 // Standard texture size
        faceCanvas.height = 512

        const faceCtx = faceCanvas.getContext('2d')
        if (!faceCtx) return

        // Draw white background
        faceCtx.fillStyle = '#FFFFFF'
        faceCtx.fillRect(0, 0, faceCanvas.width, faceCanvas.height)

        // Draw circular face with antialiasing
        faceCtx.save()
        faceCtx.beginPath()
        faceCtx.arc(256, 256, 256, 0, Math.PI * 2)
        faceCtx.clip()

        // Draw face portion of image
        faceCtx.drawImage(
          img,
          faceX,
          faceY,
          faceSize,
          faceSize,
          0,
          0,
          512,
          512
        )

        faceCtx.restore()

        // Convert to data URL
        const textureDataUrl = faceCanvas.toDataURL('image/png')
        setFaceTexture(textureDataUrl)
      }
      img.src = userImage
    }
  }, [userImage, faceTexture])

  useEffect(() => {
    if (faceTexture) {
      const timer = setTimeout(() => {
        setShowMorphed(true)
      }, 10000) // 10 seconds

      return () => clearTimeout(timer)
    }
  }, [faceTexture])

  return (
    <div
      style={{
        position: 'relative',
        width: '240px',
        height: '240px',
        overflow: 'hidden',
      }}
    >
      {/* Hidden canvas for image processing */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />

      {/* Avatar 3D Model with face texture overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: showMorphed ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: 1,
        }}
      >
        <Suspense fallback={<div>Loading avatar...</div>}>
          <AvatarViewport />
        </Suspense>
      </div>

      {/* Face texture overlay */}
      {faceTexture && showMorphed && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundImage: `url(${faceTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 0 20px rgba(0, 184, 248, 0.3)',
            zIndex: 2,
            opacity: 1,
            transition: 'opacity 0.8s ease-in-out',
          }}
        />
      )}


    </div>
  )
}
