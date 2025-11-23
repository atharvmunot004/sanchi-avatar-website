'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGLTF } from '@react-three/drei'
import AvatarViewport from '@/components/AvatarViewport'
import PhotoCapture from '@/components/PhotoCapture'
import useAvatarStore from '@/store/avatarStore'

// Preload all models on app start
useGLTF.preload('/assets/meshes/fullfigure.glb')
useGLTF.preload('/assets/meshes/fullfigure2.glb')
useGLTF.preload('/assets/meshes/fullfigure3.glb')
useGLTF.preload('/assets/meshes/fullfigure4.glb')
useGLTF.preload('/assets/meshes/base_male.glb')
useGLTF.preload('/assets/meshes/base_female.glb')

export default function Home() {
  const router = useRouter()
  const [userNameInput, setUserNameInput] = useState('')
  const { gender, baseMesh, hairMesh, setGender, setBaseMesh, setHairMesh, setUserName, reset } = useAvatarStore()

  useEffect(() => {
    // Reset avatar on page load - only on initial mount
    reset()
  }, [reset])

  const handleConfirm = () => {
    if (baseMesh && userNameInput) {
      console.log('Avatar confirmed:', { baseMesh, userNameInput })
      setUserName(userNameInput)
      router.push('/dashboard')
    } else {
      console.log('Cannot confirm - baseMesh:', baseMesh, 'userNameInput:', userNameInput)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0C0C0C',
        padding: '40px',
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontFamily: 'serif',
          fontSize: '32px',
          fontWeight: 700,
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: '60px',
          letterSpacing: '2px',
        }}
      >
        CREATE YOUR DIGITAL IDENTITY
      </h1>

      {/* Main Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Left Section - Avatar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {/* 3D Viewport - Circular */}
          <div
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundImage: 'url("/assets/design/Group%201.png")',
              backgroundSize: '120%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#0C0C0C',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AvatarViewport />
            </div>
          </div>

          {/* Photo Capture */}
          <PhotoCapture />

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={!baseMesh || !userNameInput}
            style={{
              width: '200px',
              height: '55px',
              borderRadius: '12px',
              backgroundColor: 'transparent',
              backgroundImage: `url(/assets/design/button.png)`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 700,
              cursor: baseMesh && userNameInput ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              opacity: baseMesh && userNameInput ? 1 : 0.5,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              letterSpacing: '1px',
            }}
            onMouseEnter={(e) => {
              if (baseMesh && userNameInput) {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.filter = 'brightness(1.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (baseMesh && userNameInput) {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.filter = 'brightness(1)'
              }
            }}
          >
            Confirm
          </button>
        </div>

        {/* Right Section - Options */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '60px',
          }}
        >
          {/* Select Face */}
          <div>
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Select Gender
            </h2>
            <div
              style={{
                display: 'flex',
                gap: '30px',
              }}
            >
              <FaceOption
                image="/assets/images/face2.png"
                isSelected={gender === 'male'}
                onClick={() => setGender('male')}
              />
              <FaceOption
                image="/assets/images/face1.png"
                isSelected={gender === 'female'}
                onClick={() => setGender('female')}
              />
            </div>
          </div>

          {/* Select Style */}
          <div>
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Select Full Figure
            </h2>
            <div
              style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { image: '/assets/images/image1.png', file: '/assets/meshes/fullfigure.glb', forGender: 'female' },
                { image: '/assets/images/image2.png', file: '/assets/meshes/fullfigure2.glb', forGender: 'female' },
                { image: '/assets/images/image3.png', file: '/assets/meshes/fullfigure3.glb', forGender: 'male' },
                { image: '/assets/images/image4.png', file: '/assets/meshes/fullfigure4.glb', forGender: 'male' },
              ].map((style, index) => (
                <StyleOption
                  key={index}
                  image={style.image}
                  isSelected={baseMesh === style.file}
                  isActive={style.forGender === gender}
                  onClick={() => {
                    if (style.forGender === gender) {
                      setBaseMesh(style.file)
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Create Digital Name */}
          <div>
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Create Your Digital Name
            </h2>
            <input
              type="text"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              placeholder="Enter your digital name"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(0, 184, 248, 0.5)',
                borderRadius: '6px',
                color: '#FFFFFF',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#00B8F8'
                e.currentTarget.style.backgroundColor = 'rgba(0, 184, 248, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 184, 248, 0.5)'
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FaceOption({
  image,
  isSelected,
  onClick,
}: {
  image: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '120px',
        height: '120px',
        padding: 0,
        backgroundColor: 'transparent',
        border: `3px solid ${isSelected ? '#00B8F8' : 'rgba(0, 184, 248, 0.4)'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        overflow: 'hidden',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'all 0.3s ease',
        boxShadow: isSelected ? '0 0 20px rgba(0, 184, 248, 0.6)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(0, 184, 248, 0.7)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(0, 184, 248, 0.4)'
        }
      }}
    />
  )
}

function StyleOption({
  image,
  isSelected,
  isActive = true,
  onClick,
}: {
  image: string
  isSelected: boolean
  isActive?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      style={{
        width: '100px',
        height: '100px',
        padding: 0,
        backgroundColor: 'transparent',
        border: `2px solid ${isSelected ? '#00B8F8' : 'rgba(0, 184, 248, 0.3)'}`,
        borderRadius: '8px',
        cursor: isActive ? 'pointer' : 'not-allowed',
        overflow: 'hidden',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'all 0.3s ease',
        boxShadow: isSelected ? '0 0 15px rgba(0, 184, 248, 0.5)' : 'none',
        opacity: isActive ? 1 : 0.4,
      }}
      onMouseEnter={(e) => {
        if (!isSelected && isActive) {
          e.currentTarget.style.borderColor = 'rgba(0, 184, 248, 0.6)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && isActive) {
          e.currentTarget.style.borderColor = 'rgba(0, 184, 248, 0.3)'
        }
      }}
    />
  )
}
