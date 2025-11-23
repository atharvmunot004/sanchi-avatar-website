'use client'

import { ReactNode } from 'react'

interface OptionButtonProps {
  label: string
  onClick: () => void
  isSelected?: boolean
  children?: ReactNode
  imageSrc?: string
  style?: {
    width?: string
    height?: string
    background?: string
    borderRadius?: string
  }
}

export default function OptionButton({
  label,
  onClick,
  isSelected = false,
  children,
  imageSrc,
  style = {},
}: OptionButtonProps) {
  const defaultStyle = {
    width: style.width || '200px',
    height: style.height || '200px',
    background: style.background || 'linear-gradient(135deg, #031842 0%, #03204F 100%)',
    borderRadius: style.borderRadius || '12px',
  }

  return (
    <button
      onClick={onClick}
      style={{
        ...defaultStyle,
        border: isSelected ? '2px solid #0A4FFF' : '2px solid transparent',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        transition: 'all 0.3s ease',
        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isSelected ? '0 4px 12px rgba(10, 79, 255, 0.4)' : 'none',
      }}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={label}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
          }}
        />
      ) : (
        <>
          {children}
          <span style={{ marginTop: '8px', fontSize: '14px', color: '#FFFFFF' }}>
            {label}
          </span>
        </>
      )}
    </button>
  )
}

