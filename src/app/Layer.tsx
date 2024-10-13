import type { Item } from '@/types/item.ts'
import type React from 'react'
import { useMemo } from 'react'
import { Sequence } from 'remotion'

export const Layer: React.FC<{
  item: Item
}> = ({ item }) => {
  const style: React.CSSProperties = useMemo(() => {
    return {
      backgroundColor: item.color,
      position: 'absolute',
      left: item.left,
      top: item.top,
      width: item.width,
      height: item.height,
      resize: 'both', // リサイズを有効にする
      overflow: 'auto', // リサイズ時に要素がはみ出すのを防ぐ
      zIndex: 1, // 他の要素よりも前面に表示するためのz-index設定
    }
  }, [item.color, item.height, item.left, item.top, item.width])

  const stopPropagation = (e: React.MouseEvent<HTMLInputElement>) => {
    // 親要素へのイベント伝播を防ぐ
    e.stopPropagation()
  }

  return (
    <Sequence key={item.id} from={item.from} durationInFrames={item.durationInFrames} layout="none">
      <div
        // style={style}
        onMouseDown={stopPropagation} // マウスダウン時に親要素へのイベント伝播を防ぐ
      >
        <input
          style={style}
          type="text"
          defaultValue="Resizable Input" // 初期値のテキスト
        />
      </div>
    </Sequence>
  )
}
