'use client'

export default function BarChart() {
  const stats = [
    { icon: '', label: 'Users', value: '32,984' },
    { icon: '', label: 'Clicks', value: '2.42m' },
    { icon: '', label: 'Sales', value: '2,400' },
    { icon: '', label: 'Items', value: '320' },
  ]

  // Generate random data for bars
  const data = Array.from({ length: 12 }, () => Math.random() * 500)

  return (
    <div
      style={{
        background: 'rgba(13, 27, 58, 0.8)',
        borderRadius: '20px',
        padding: '24px',
        height: '260px',
        border: '1px solid rgba(11, 83, 255, 0.3)',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: 600,
            margin: '0 0 4px 0',
          }}
        >
          Active Users
        </h3>
        <p
          style={{
            color: '#8899cc',
            fontSize: '12px',
            margin: 0,
          }}
        >
          Last week
        </p>
      </div>

      {/* Simple Bar Chart */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          height: '100px',
          marginBottom: '20px',
          gap: '8px',
        }}
      >
        {data.map((value, idx) => (
          <div
            key={idx}
            style={{
              width: '100%',
              height: `${(value / 500) * 100}%`,
              background: `linear-gradient(to top, #0b53ff, #0055ff)`,
              borderRadius: '4px 4px 0 0',
              minHeight: '4px',
            }}
          />
        ))}
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
        }}
      >
        {stats.map((stat, idx) => (
          <div key={idx} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{stat.icon}</div>
            <p
              style={{
                color: '#8899cc',
                fontSize: '11px',
                margin: '0 0 2px 0',
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                margin: 0,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
