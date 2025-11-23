'use client'

import { useEffect, useRef } from 'react'
import useAvatarStore from '@/store/avatarStore'

export default function PhotoCapture() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setUserImage } = useAvatarStore()

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          
          // Auto-capture after camera loads (1 second delay to ensure video is ready)
          videoRef.current.onloadedmetadata = () => {
            setTimeout(() => {
              capturePhotoAutomatically()
            }, 1000)
          }
        }
      } catch (err) {
        console.error('Error accessing camera:', err)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [setUserImage])

  const capturePhotoAutomatically = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )
        const imageData = canvasRef.current.toDataURL('image/jpeg')
        setUserImage(imageData)

        // Stop the camera stream
        if (videoRef.current.srcObject) {
          const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
          tracks.forEach((track) => track.stop())
        }
      }
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          display: 'none',
        }}
      />
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        style={{ display: 'none' }}
      />
    </>
  )
}
