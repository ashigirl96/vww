import { z } from 'zod'

export const COMP_NAME = 'MyComp'

export const CompositionProps = z.object({
  title: z.string(),
})

export const ItemProps = z.object({
  id: z.number(),
  durationInFrames: z.number(),
  from: z.number(),
  height: z.number(),
  left: z.number(),
  top: z.number(),
  width: z.number(),
  color: z.string(),
  isDragging: z.boolean(),
})

export type Item = z.infer<typeof ItemProps>

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: 'Next.js and Remotion',
}

export const DURATION_IN_FRAMES = 200
export const VIDEO_WIDTH = 1280
export const VIDEO_HEIGHT = 720
export const VIDEO_FPS = 30
