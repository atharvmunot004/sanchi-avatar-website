'use client'

import { useRouter } from 'next/navigation'
import styles from '@/styles/sidebar.module.css'

const icons = {
  home: '',
  health: '',
  analytics: '',
  more: '',
  profile: '',
  login: '',
  signup: '',
}

export default function Sidebar() {
  const router = useRouter()

  const sections = [
    {
      title: 'Main',
      items: [
        { icon: 'home', label: 'Dashboard', active: true, href: '/dashboard' },
        { icon: 'health', label: 'Health Outreach', href: '#' },
        { icon: 'analytics', label: 'Financial analytics', href: '#' },
        { icon: 'more', label: 'More', href: '#' },
      ],
    },
    {
      title: 'Account Pages',
      items: [
        { icon: 'profile', label: 'Profile', href: '#' },
        { icon: 'login', label: 'Sign In', href: '#' },
        { icon: 'signup', label: 'Sign Up', href: '#' },
      ],
    },
  ]

  return (
    <div
      style={{
        width: '260px',
        background: 'rgba(12, 12, 12, 0.95)',
        padding: '40px 20px',
        borderRight: '1px solid rgba(0, 184, 248, 0.2)',
        overflowY: 'auto',
        color: '#FFFFFF',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '40px',
          color: '#00B8F8',
          letterSpacing: '0.5px',
        }}
      >
        Square Sphere
      </h2>

      {sections.map((section, idx) => (
        <div key={idx} style={{ marginBottom: '30px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#8899cc',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '0.5px',
            }}
          >
            {section.title}
          </h3>
          {section.items.map((item, itemIdx) => (
            <button
              key={itemIdx}
              onClick={() => {
                if (item.href !== '#') router.push(item.href)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px',
                marginBottom: '8px',
                background: item.active ? 'rgba(0, 184, 248, 0.15)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: item.active ? '#00B8F8' : '#FFFFFF',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 184, 248, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = item.active ? 'rgba(0, 184, 248, 0.15)' : 'transparent'
              }}
            >
              <span style={{ fontSize: '18px' }}>{icons[item.icon as keyof typeof icons]}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
