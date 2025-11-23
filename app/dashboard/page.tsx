'use client'

import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState, useRef } from 'react'
import useAvatarStore from '@/store/avatarStore'
import DashboardContent from '@/components/DashboardContent'
import Sidebar from '@/components/Sidebar'

// Function to create eerie glitch sound
const playGlitchSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Create oscillators for eerie sound
    const now = audioContext.currentTime
    const duration = 0.3
    
    // Main tone - descending pitch
    const osc1 = audioContext.createOscillator()
    const gain1 = audioContext.createGain()
    osc1.connect(gain1)
    gain1.connect(audioContext.destination)
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(400, now)
    osc1.frequency.exponentialRampToValueAtTime(80, now + duration)
    gain1.gain.setValueAtTime(0.3, now)
    gain1.gain.exponentialRampToValueAtTime(0.01, now + duration)
    osc1.start(now)
    osc1.stop(now + duration)
    
    // Secondary tone - noise-like effect
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < buffer.length; i++) {
      data[i] = Math.random() * 2 - 1
    }
    const noiseSource = audioContext.createBufferSource()
    noiseSource.buffer = buffer
    const noiseGain = audioContext.createGain()
    const noiseFilter = audioContext.createBiquadFilter()
    noiseFilter.type = 'highpass'
    noiseFilter.frequency.value = 2000
    
    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(audioContext.destination)
    noiseGain.gain.setValueAtTime(0.15, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration)
    noiseSource.start(now)
    noiseSource.stop(now + duration)
  } catch (e) {
    // Audio context not available, silently fail
  }
}

export default function Dashboard() {
  const router = useRouter()
  const { baseMesh, userImage } = useAvatarStore()
  const [screenGlitch, setScreenGlitch] = useState(false)

  // Trigger screen glitch when morphing happens
  useEffect(() => {
    if (userImage) {
      const glitchTimer = setTimeout(() => {
        setScreenGlitch(true)
        playGlitchSound() // Play eerie sound
        
        // Stop glitch after 0.3 seconds
        const glitchEnd = setTimeout(() => {
          setScreenGlitch(false)
        }, 300)
        
        return () => clearTimeout(glitchEnd)
      }, 9500) // Start at same time as profile glitch
      
      return () => clearTimeout(glitchTimer)
    }
  }, [userImage])

  // Redirect back to avatar creator if no avatar selected
  if (!baseMesh) {
    router.push('/')
  }

  return (
    <>
      <style>{`
        @keyframes screen-glitch {
          0% {
            clip-path: inset(0);
            filter: none;
          }
          10% {
            clip-path: inset(10% 0 85% 0);
            filter: hue-rotate(90deg) brightness(1.5);
          }
          20% {
            clip-path: inset(0 0 0 0);
            filter: brightness(0.5);
          }
          30% {
            clip-path: inset(20% 0 70% 0);
            filter: hue-rotate(-90deg) brightness(1.3);
          }
          40% {
            clip-path: inset(0 20% 0 20%);
            filter: brightness(0.3);
          }
          50% {
            clip-path: inset(40% 0 40% 0);
            filter: invert(1) brightness(1.2);
          }
          60% {
            clip-path: inset(0 10% 0 10%);
            filter: brightness(0.7) hue-rotate(45deg);
          }
          70% {
            clip-path: inset(15% 0 75% 0);
            filter: brightness(1.4);
          }
          80% {
            clip-path: inset(0);
            filter: brightness(0.4);
          }
          90% {
            clip-path: inset(5% 0 90% 0);
            filter: hue-rotate(180deg);
          }
          100% {
            clip-path: inset(0);
            filter: none;
          }
        }
      `}</style>
      
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          background: '#0C0C0C',
          animation: screenGlitch ? 'screen-glitch 0.3s ease-in-out' : 'none',
        }}
      >
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardContent />
        </Suspense>
      </div>
    </>
  )
}
