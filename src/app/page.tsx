'use client'

import type { Item } from '@/types/item.ts'
import { Player } from '@remotion/player'
import type React from 'react'
import { useCallback, useMemo, useState } from 'react'
import type { MainProps } from './Main'
import { Main } from './Main'
import '@/style.css'

const DragAndDropDemo: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      left: 395,
      top: 270,
      width: 540,
      durationInFrames: 100,
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
      durationInFrames: 100,
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
    <Player
      style={{
        width: '100%',
      }}
      // controls={true}
      component={Main}
      compositionHeight={1080}
      compositionWidth={1920}
      durationInFrames={300}
      fps={30}
      inputProps={inputProps}
      overflowVisible
    />
  )
}

export default DragAndDropDemo
