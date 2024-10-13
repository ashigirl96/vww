import { Layer } from '@/app/Layer.tsx'
import type { Item } from '@/types/item.ts'
import type React from 'react'
import { useCallback } from 'react'
import { AbsoluteFill, Video, staticFile } from 'remotion'
import { SortedOutlines } from './SortedOutlines'

export type MainProps = {
  readonly items: Item[]
  readonly setSelectedItem: React.Dispatch<React.SetStateAction<number | null>>
  readonly selectedItem: number | null
  readonly changeItem: (itemId: number, updater: (item: Item) => Item) => void
}

export const Main: React.FC<MainProps> = ({ items, setSelectedItem, selectedItem, changeItem }) => {
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) {
        return
      }

      setSelectedItem(null)
    },
    [setSelectedItem],
  )
  console.log(selectedItem)

  return (
    <AbsoluteFill className={'bg-amber-100'} onPointerDown={onPointerDown}>
      <Video
        muted={true}
        loop
        src={staticFile('videos/sample.mp4')}
        style={{
          position: 'absolute',
          zIndex: 0, // 背面に配置
        }}
      />
      <AbsoluteFill className={'overflow-hidden'}>
        {items.map((item) => {
          return <Layer key={item.id} item={item} />
        })}
      </AbsoluteFill>
      <SortedOutlines
        selectedItem={selectedItem}
        items={items}
        setSelectedItem={setSelectedItem}
        changeItem={changeItem}
      />
    </AbsoluteFill>
  )
}
