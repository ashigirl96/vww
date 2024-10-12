'use client'

import { RenderControls } from '@/components/RenderControls.tsx'
import { Spacing } from '@/components/Spacing.tsx'
import { Tips } from '@/components/Tips/Tips.tsx'
import { Main } from '@/remotion/MyComp/Main.tsx'
import {
  type CompositionProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  defaultMyCompProps,
} from '@/types/constants.ts'
import { Player } from '@remotion/player'
import type { NextPage } from 'next'
import type React from 'react'
import { useMemo, useState } from 'react'
import type { z } from 'zod'

const container: React.CSSProperties = {
  maxWidth: 768,
  margin: 'auto',
  marginBottom: 20,
}

const outer: React.CSSProperties = {
  borderRadius: 'var(--geist-border-radius)',
  overflow: 'hidden',
  boxShadow: '0 0 200px rgba(0, 0, 0, 0.15)',
  marginBottom: 40,
  marginTop: 60,
}

const player: React.CSSProperties = {
  width: '100%',
}

const Home: NextPage = () => {
  const [text, setText] = useState<string>(defaultMyCompProps.title)

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
    }
  }, [text])

  return (
    <div className={'bg-red-900'}>
      <div style={container}>
        <div className="bg-red-50" style={outer}>
          <Player
            component={Main}
            inputProps={inputProps}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={player}
            controls={true}
            autoPlay={true}
            loop={true}
          />
        </div>
        <RenderControls text={text} setText={setText} inputProps={inputProps} />
        <Spacing />
        <Spacing />
        <Spacing />
        <Spacing />
        <Tips />
      </div>
    </div>
  )
}

export default Home
