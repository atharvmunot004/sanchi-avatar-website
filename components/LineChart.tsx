'use client'

export default function LineChart() {
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
            margin: 0,
          }}
        >
          Health Chart
        </h3>
        <button
          style={{
            background: 'rgba(11, 83, 255, 0.2)',
            border: 'none',
            color: '#0b53ff',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
          }}
        >
          Edit
        </button>
      </div>

      {/* Simple Line Chart SVG */}
      <svg
        width="100%"
        height="160"
        viewBox="0 0 400 160"
        style={{ marginTop: '10px' }}
      >
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`grid-${i}`}
            x1="0"
            y1={40 * i}
            x2="400"
            y2={40 * i}
            stroke="rgba(11, 83, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* First line (blue) */}
        <polyline
          points="0,120 40,90 80,100 120,70 160,80 200,50 240,60 280,40 320,55 360,35 400,45"
          fill="none"
          stroke="#0b53ff"
          strokeWidth="2"
        />

        {/* Second line (lighter blue) */}
        <polyline
          points="0,140 40,110 80,120 120,95 160,105 200,80 240,85 280,70 320,80 360,65 400,70"
          fill="none"
          stroke="rgba(11, 83, 255, 0.6)"
          strokeWidth="2"
        />
      </svg>

      <div
        style={{
          marginTop: '12px',
          textAlign: 'center',
          color: '#8899cc',
          fontSize: '12px',
        }}
      >
        Jan – Dec
      </div>
    </div>
  )
}
