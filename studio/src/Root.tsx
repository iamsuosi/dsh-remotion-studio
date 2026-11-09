import React from 'react'
import { Composition } from 'remotion'
import { PluginDemo } from './PluginDemo'
import { PromoCard } from './PromoCard'
import {
  defaultCase,
  PROMO_HEIGHT,
  PROMO_WIDTH,
  VIDEO_DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from './data'

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="PluginDemo"
        component={PluginDemo}
        durationInFrames={VIDEO_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ case: defaultCase }}
      />
      <Composition
        id="PromoCard"
        component={PromoCard}
        durationInFrames={1}
        fps={1}
        width={PROMO_WIDTH}
        height={PROMO_HEIGHT}
        defaultProps={{ case: defaultCase }}
      />
    </>
  )
}
