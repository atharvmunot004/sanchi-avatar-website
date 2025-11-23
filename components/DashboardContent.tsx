'use client'

import { Suspense, useState, useEffect } from 'react'
import useAvatarStore from '@/store/avatarStore'
import AvatarMorph from '@/components/AvatarMorph'

export default function DashboardContent() {
  return (
    <div style={{ flex: 1, padding: '40px', background: '#0C0C0C' }}>
      {/* Header */}
      <h1
        style={{
          fontSize: '36px',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '48px',
          letterSpacing: '0.5px',
        }}
      >
        Welcome to SquareSphere
      </h1>

      {/* Content Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '24px',
        }}
      >
        {/* Avatar Card */}
        <AvatarCard />

        {/* Profile Card */}
        <ProfileCard />
      </div>

      {/* Second Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}
      >
        {/* Data Chart */}
        <div
          style={{
            background: 'rgba(20, 20, 20, 0.8)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(0, 184, 248, 0.2)',
            overflow: 'hidden',
          }}
        >
          <img
            src="/assets/design/data.png"
            alt="Data Analytics"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
            }}
          />
        </div>

        {/* Analysis Chart */}
        <div
          style={{
            background: 'rgba(20, 20, 20, 0.8)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(0, 184, 248, 0.2)',
            overflow: 'hidden',
          }}
        >
          <img
            src="/assets/design/analysis.png"
            alt="Analysis"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
            }}
          />
        </div>
      </div>
    </div>
  )
}

function AvatarCard() {
  return (
    <div
      style={{
        background: 'rgba(20, 20, 20, 0.8)',
        borderRadius: '20px',
        padding: '24px',
        height: '300px',
        border: '1px solid rgba(0, 184, 248, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <h3
        style={{
          color: '#FFFFFF',
          fontSize: '14px',
          marginBottom: '16px',
        }}
      >
        Avatar placeholder
      </h3>
      <Suspense fallback={<div>Loading avatar...</div>}>
        <div
          style={{
            width: '240px',
            height: '240px',
            borderRadius: '0px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AvatarMorph />
        </div>
      </Suspense>
    </div>
  )
}

function ProfileCard() {
  const { userName, userImage } = useAvatarStore()
  const [glitching, setGlitching] = useState(false)
  const [glitched, setGlitched] = useState(false)
  const [glitchText, setGlitchText] = useState({ name: '', age: '', address: '' })

  // Trigger glitch when morphing (after 10 seconds of userImage being present)
  useEffect(() => {
    if (userImage) {
      const glitchTimer = setTimeout(() => {
        setGlitching(true)
        
        // Generate random glitch text
        const chars = 'ÄÖÜ█▓▒░'
        const randomChar = () => chars[Math.floor(Math.random() * chars.length)]
        
        const newGlitchText = {
          name: Array(userName?.length || 5).fill(0).map(() => randomChar()).join(''),
          age: Array(3).fill(0).map(() => randomChar()).join(''),
          address: Array(30).fill(0).map(() => randomChar()).join(''),
        }
        setGlitchText(newGlitchText)
        
        // Stop glitching animation after 800ms but keep glitched state
        const glitchDuration = setTimeout(() => {
          setGlitching(false)
          setGlitched(true) // Stay glitched
        }, 800)
        
        return () => clearTimeout(glitchDuration)
      }, 9500) // Start glitch 500ms before morph completes
      
      return () => clearTimeout(glitchTimer)
    }
  }, [userImage, userName])

  // Generate random offset for glitch effect (only during animation)
  const getGlitchOffset = () => {
    if (!glitching) return { x: 0, y: 0 }
    return {
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 4,
    }
  }

  const offset = getGlitchOffset()
  const isGlitchState = glitching || glitched // Show glitch state if animating or after animation
  
  return (
    <div
      style={{
        background: 'rgba(20, 20, 20, 0.8)',
        borderRadius: '20px',
        padding: '24px',
        height: '300px',
        border: '1px solid rgba(0, 184, 248, 0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h3
          style={{
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          Profile
        </h3>
        <button
          style={{
            background: 'rgba(0, 184, 248, 0.1)',
            border: '1px solid rgba(0, 184, 248, 0.3)',
            color: '#00B8F8',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
          }}
        >
          ⋯
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Name Field with Glitch */}
        <div
          style={{
            position: 'relative',
            transform: glitching ? `translate(${offset.x}px, ${offset.y}px)` : 'translate(0, 0)',
            transition: glitching ? 'none' : 'transform 0.1s ease',
            animation: glitching ? 'glitch-flicker 0.8s ease-in-out' : 'none',
          }}
        >
          <label
            style={{
              color: '#00B8F8',
              fontSize: '12px',
              display: 'block',
              marginBottom: '4px',
              textTransform: 'uppercase',
            }}
          >
            Name
          </label>
          <p
            style={{
              color: isGlitchState ? '#FF00FF' : '#FFFFFF',
              fontSize: '14px',
              margin: 0,
              fontFamily: isGlitchState ? 'monospace' : 'inherit',
              textShadow: isGlitchState ? '2px 0 #00FFFF, -2px 0 #FF00FF' : 'none',
            }}
          >
            {isGlitchState ? glitchText.name : userName || 'N/A'}
          </p>
        </div>

        {/* Age Field with Glitch */}
        <div
          style={{
            position: 'relative',
            transform: glitching ? `translate(${offset.x}px, ${offset.y}px)` : 'translate(0, 0)',
            transition: glitching ? 'none' : 'transform 0.1s ease',
            animation: glitching ? 'glitch-flicker 0.8s ease-in-out' : 'none',
          }}
        >
          <label
            style={{
              color: '#00B8F8',
              fontSize: '12px',
              display: 'block',
              marginBottom: '4px',
              textTransform: 'uppercase',
            }}
          >
            Age
          </label>
          <p
            style={{
              color: isGlitchState ? '#FF00FF' : '#FFFFFF',
              fontSize: '14px',
              margin: 0,
              fontFamily: isGlitchState ? 'monospace' : 'inherit',
              textShadow: isGlitchState ? '2px 0 #00FFFF, -2px 0 #FF00FF' : 'none',
            }}
          >
            {isGlitchState ? glitchText.age : '21'}
          </p>
        </div>

        {/* Address Field with Glitch */}
        <div
          style={{
            position: 'relative',
            transform: glitching ? `translate(${offset.x}px, ${offset.y}px)` : 'translate(0, 0)',
            transition: glitching ? 'none' : 'transform 0.1s ease',
            animation: glitching ? 'glitch-flicker 0.8s ease-in-out' : 'none',
          }}
        >
          <label
            style={{
              color: '#00B8F8',
              fontSize: '12px',
              display: 'block',
              marginBottom: '4px',
              textTransform: 'uppercase',
            }}
          >
            Address
          </label>
          <p
            style={{
              color: isGlitchState ? '#FF00FF' : '#FFFFFF',
              fontSize: '14px',
              margin: 0,
              wordBreak: 'break-word',
              maxHeight: '60px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontFamily: isGlitchState ? 'monospace' : 'inherit',
              textShadow: isGlitchState ? '2px 0 #00FFFF, -2px 0 #FF00FF' : 'none',
            }}
          >
            {isGlitchState ? glitchText.address : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'}
          </p>
        </div>
      </div>

      {/* CSS Animation for glitch effect */}
      <style>{`
        @keyframes glitch-flicker {
          0%, 100% {
            opacity: 1;
          }
          10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90% {
            opacity: 0.8;
          }
          15%, 25%, 35%, 45%, 55%, 65%, 75%, 85% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}
