'use server'

import path from 'node:path'
import type { MainProps } from '@/remotion/MyComp/Main.tsx'
import { bundle } from '@remotion/bundler/dist/bundle.js'
import { renderMedia, selectComposition } from '@remotion/renderer'

export const renderVideo = async ({
  id,
  inputProps,
}: {
  id: string
  inputProps: MainProps
}) => {
  const bundleLocation = await bundle({
    entryPoint: path.resolve('./src/remotion/index.ts'),
    // If you have a webpack override in remotion.config.ts, pass it here as well.
    webpackOverride: (config) => config,
  })

  const _composition = await selectComposition({
    serveUrl: bundleLocation,
    id: id,
    inputProps,
  })
  // ローカルレンダリング
  return renderMedia({
    composition: _composition, // ローカルのcomposition ID
    serveUrl: 'http://localhost:3000', // ローカルサーバーURL
    codec: 'h264', // コーデック
    inputProps, // 入力プロパティ
    outputLocation: './out/video.mp4', // 出力先
  })
}
