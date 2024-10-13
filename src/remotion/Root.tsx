import '@/style.css'
import { Main, type MainProps } from '@/remotion/MyComp/Main.tsx'
import { NextLogo } from '@/remotion/MyComp/NextLogo.tsx'
import {
  COMP_NAME,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from '@/types/constants'
import type { Item } from '@/types/item.ts'
import { useCallback, useMemo, useState } from 'react'
import { Composition } from 'remotion'

export const RemotionRoot: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      left: 395,
      top: 270,
      width: 540,
      durationInFrames: 300,
      from: 0,
      height: 540,
      id: 0,
      color: '#ccc',
      isDragging: false,
    },
    {
      left: 985,
      top: 270,
      width: 540,
      durationInFrames: 300,
      from: 0,
      height: 540,
      id: 1,
      color: '#ccc',
      isDragging: false,
    },
  ])
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  const changeItem = useCallback((itemId: number, updater: (item: Item) => Item) => {
    setItems((oldItems) => {
      return oldItems.map((item) => {
        if (item.id === itemId) {
          return updater(item)
        }

        return item
      })
    })
  }, [])

  const inputProps: MainProps = useMemo(() => {
    return {
      items,
      setSelectedItem,
      changeItem,
      selectedItem,
    }
  }, [changeItem, items, selectedItem])

  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={inputProps}
      />
      <Composition
        id="NextLogo"
        component={NextLogo}
        durationInFrames={300}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />
    </>
  )
}
