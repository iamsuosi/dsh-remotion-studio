import React from 'react'
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
} from 'remotion'
import type { RemotionCase } from './data'

const BLUE = '#0f172a'
const ACCENT = '#38bdf8'

interface SceneProps {
  startFrame: number
  data: RemotionCase
}

function useRelativeFrame(startFrame: number) {
  const frame = useCurrentFrame()
  return Math.max(0, frame - startFrame)
}

function fadeIn(frame: number, duration = 15) {
  return interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

const HookScene: React.FC<SceneProps> = ({ startFrame, data }) => {
  const f = useRelativeFrame(startFrame)
  const opacity = fadeIn(f)
  return (
    <AbsoluteFill
      style={{
        background: BLUE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 800, color: '#fff', textAlign: 'center' }}>
        {data.plugin.name}
      </div>
      <div style={{ fontSize: 40, color: '#94a3b8', marginTop: 24, maxWidth: 1200, textAlign: 'center' }}>
        {data.plugin.description}
      </div>
    </AbsoluteFill>
  )
}

const ProblemScene: React.FC<SceneProps> = ({ startFrame, data }) => {
  const f = useRelativeFrame(startFrame)
  const opacity = fadeIn(f)
  return (
    <AbsoluteFill
      style={{
        background: BLUE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        padding: 120,
      }}
    >
      <div style={{ fontSize: 48, color: ACCENT, marginBottom: 40 }}>The problem</div>
      <div style={{ fontSize: 72, fontWeight: 700, color: '#fff', textAlign: 'center' }}>
        {data.promo.problem}
      </div>
    </AbsoluteFill>
  )
}

const SolutionScene: React.FC<SceneProps> = ({ startFrame, data }) => {
  const f = useRelativeFrame(startFrame)
  const opacity = fadeIn(f)
  return (
    <AbsoluteFill
      style={{
        background: BLUE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        padding: 120,
      }}
    >
      <div style={{ fontSize: 48, color: ACCENT, marginBottom: 40 }}>The solution</div>
      <div style={{ fontSize: 72, fontWeight: 700, color: '#fff', textAlign: 'center' }}>
        {data.promo.solution}
      </div>
    </AbsoluteFill>
  )
}

const FeaturesScene: React.FC<SceneProps> = ({ startFrame, data }) => {
  const f = useRelativeFrame(startFrame)
  const features = data.features.slice(0, 4)
  return (
    <AbsoluteFill
      style={{
        background: BLUE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      <div style={{ fontSize: 48, color: ACCENT, marginBottom: 60 }}>Highlights</div>
      <div style={{ display: 'flex', gap: 40, width: '100%', justifyContent: 'center' }}>
        {features.map((feature, i) => {
          const delay = i * 12
          const opacity = interpolate(f, [delay, delay + 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
          const y = interpolate(f, [delay, delay + 15], [40, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
          return (
            <div
              key={i}
              style={{
                width: 380,
                minHeight: 320,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 24,
                padding: 40,
                opacity,
                transform: `translateY(${y}px)`,
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 20 }}>
                {feature.title}
              </div>
              <div style={{ fontSize: 28, color: '#cbd5e1', lineHeight: 1.4 }}>
                {feature.description}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

const HowtoScene: React.FC<SceneProps> = ({ startFrame, data }) => {
  const f = useRelativeFrame(startFrame)
  const opacity = fadeIn(f)
  return (
    <AbsoluteFill
      style={{
        background: BLUE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        padding: 120,
      }}
    >
      <div style={{ fontSize: 48, color: ACCENT, marginBottom: 60 }}>Get started</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {data.promo.steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                background: ACCENT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 800,
                color: BLUE,
              }}
            >
              {i + 1}
            </div>
            <div style={{ fontSize: 44, color: '#fff' }}>{step}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}

const ProofScene: React.FC<SceneProps> = ({ startFrame, data }) => {
  const f = useRelativeFrame(startFrame)
  const opacity = fadeIn(f)
  return (
    <AbsoluteFill
      style={{
        background: BLUE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        padding: 120,
      }}
    >
      <div style={{ fontSize: 56, color: '#fff', textAlign: 'center', marginBottom: 40 }}>
        {data.plugin.name}
      </div>
      <div style={{ fontSize: 40, color: '#94a3b8', textAlign: 'center', marginBottom: 80 }}>
        {data.plugin.installCommand}
      </div>
      <div style={{ fontSize: 32, color: ACCENT, textAlign: 'center' }}>
        {data.promo.address}
      </div>
    </AbsoluteFill>
  )
}

export const PluginDemo: React.FC<{ case: RemotionCase }> = ({ case: data }) => {
  return (
    <AbsoluteFill style={{ background: BLUE, fontFamily: 'sans-serif' }}>
      <Sequence from={0} durationInFrames={90}>
        <HookScene startFrame={0} data={data} />
      </Sequence>
      <Sequence from={90} durationInFrames={110}>
        <ProblemScene startFrame={90} data={data} />
      </Sequence>
      <Sequence from={200} durationInFrames={130}>
        <SolutionScene startFrame={200} data={data} />
      </Sequence>
      <Sequence from={330} durationInFrames={180}>
        <FeaturesScene startFrame={330} data={data} />
      </Sequence>
      <Sequence from={510} durationInFrames={110}>
        <HowtoScene startFrame={510} data={data} />
      </Sequence>
      <Sequence from={620} durationInFrames={100}>
        <ProofScene startFrame={620} data={data} />
      </Sequence>
    </AbsoluteFill>
  )
}
