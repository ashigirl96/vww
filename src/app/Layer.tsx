import type { Item } from '@/types/item.ts'
// import type { Item } from '@/types/item.ts'
// import type React from 'react'
// import { useMemo } from 'react'
// import { Sequence } from 'remotion'
//
// export const Layer: React.FC<{
//   item: Item
// }> = ({ item }) => {
//   const style: React.CSSProperties = useMemo(() => {
//     return {
//       backgroundColor: item.color,
//       position: 'absolute',
//       left: item.left,
//       top: item.top,
//       width: item.width,
//       height: item.height,
//       // resize: 'both', // リサイズを有効にする
//       // overflow: 'auto', // リサイズ時に要素がはみ出すのを防ぐ
//       // zIndex: 1, // 他の要素よりも前面に表示するためのz-index設定
//     }
//   }, [item.color, item.height, item.left, item.top, item.width])
//
//   const _stopPropagation = (e: React.MouseEvent<HTMLInputElement>) => {
//     // 親要素へのイベント伝播を防ぐ
//     e.stopPropagation()
//   }
//
//   return (
//     <Sequence key={item.id} from={item.from} durationInFrames={item.durationInFrames} layout="none">
//       <div style={style}>
//         {/*<input*/}
//         {/*  // style={style}*/}
//         {/*  onMouseDown={_stopPropagation} // マウスダウン時に親要素へのイベント伝播を防ぐ*/}
//         {/*  type="text"*/}
//         {/*  defaultValue="Resizable Input" // 初期値のテキスト*/}
//         {/*/>*/}
//       </div>
//     </Sequence>
//   )
// }
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
    }
  }, [item.color, item.height, item.left, item.top, item.width])

  const _stopPropagation = (e: React.MouseEvent<HTMLInputElement>) => {
    // 親要素へのイベント伝播を防ぐ
    e.stopPropagation()
  }

  return (
    <Sequence key={item.id} from={item.from} durationInFrames={item.durationInFrames} layout="none">
      <div style={style}>
        {/*<input*/}
        {/*  className={'h-full w-full'}*/}
        {/*  // style={style}*/}
        {/*  onMouseDown={_stopPropagation} // マウスダウン時に親要素へのイベント伝播を防ぐ*/}
        {/*  type="text"*/}
        {/*  defaultValue="Resizable Input" // 初期値のテキスト*/}
        {/*/>*/}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '50%',
            zIndex: 1, // 他の要素よりも前面に表示するためのz-index設定
          }}
          // このdiv自体ではstopPropagationしない（DnDが機能する）
        >
          <input
            className={'h-full w-full'}
            onMouseDown={_stopPropagation} // input要素へのマウスダウンでイベントを止める
            type="text"
            defaultValue="Resizable Input" // 初期値のテキスト
          />
        </div>
      </div>
    </Sequence>
  )
}
