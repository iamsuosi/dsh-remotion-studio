import React from 'react'
import { AbsoluteFill } from 'remotion'
import type { RemotionCase } from './data'

const BLUE = '#0f172a'
const ACCENT = '#38bdf8'

export const PromoCard: React.FC<{ case: RemotionCase }> = ({ case: data }) => {
  const features = data.features.slice(0, 4)
  return (
    <AbsoluteFill
      style={{
        background: BLUE,
        fontFamily: 'sans-serif',
        color: '#fff',
        padding: 80,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 800, marginBottom: 24 }}>{data.plugin.name}</div>
      <div style={{ fontSize: 36, color: '#94a3b8', marginBottom: 60, lineHeight: 1.4 }}>
        {data.plugin.description}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 60 }}>
        {features.map((feature, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 34, fontWeight: 700, color: ACCENT }}>{feature.title}</div>
            <div style={{ fontSize: 30, color: '#cbd5e1' }}>{feature.description}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div
          style={{
            fontSize: 30,
            background: 'rgba(255,255,255,0.08)',
            padding: '24px 32px',
            borderRadius: 16,
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            marginBottom: 24,
          }}
        >
          {data.plugin.installCommand || 'dsh plugin add <package-name>'}
        </div>
        <div style={{ fontSize: 28, color: '#94a3b8' }}>{data.promo.address}</div>
      </div>
    </AbsoluteFill>
  )
}
