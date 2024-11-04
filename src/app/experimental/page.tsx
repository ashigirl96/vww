'use client'

import { invoke } from '@tauri-apps/api/core'
import React, { useCallback } from 'react'
import Moveable, { type OnClickGroup, type OnRender, type OnRenderGroup } from 'react-moveable'
import Selecto, { type OnDragStart, type OnSelect, type OnSelectEnd } from 'react-selecto'

export default function App(): JSX.Element {
  const cubes: number[] = Array.from({ length: 30 }, (_, i) => i)
  const [targets, setTargets] = React.useState<HTMLElement[]>([])
  const moveableRef = React.useRef<Moveable | null>(null)
  const selectoRef = React.useRef<Selecto | null>(null)

  // 編集可能な要素のインデックスを管理する状態
  const [editingCubes, setEditingCubes] = React.useState<Set<number>>(new Set())

  const executeCommand = useCallback(async () => {
    const result = await invoke<string>('greet', { name: 'Hello from React!' })
    console.log(result)
  }, [])

  return (
    <div className="moveable relative box-border flex min-h-full items-center justify-center px-[20px] py-[10px] text-center">
      <div>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={executeCommand}
        >
          Execute Command
        </button>
      </div>
      <div className="max-w-[800px]">
        <Moveable
          ref={moveableRef}
          target={targets}
          draggable={true}
          onClickGroup={(e: OnClickGroup): void => {
            selectoRef.current?.clickTarget(e.inputEvent, e.inputTarget)
          }}
          onRender={(e: OnRender): void => {
            e.target.style.cssText += e.cssText
          }}
          onRenderGroup={(e: OnRenderGroup): void => {
            for (const ev of e.events) {
              ev.target.style.cssText += ev.cssText
            }
          }}
        />
        <Selecto
          ref={selectoRef}
          dragContainer=".elements"
          selectableTargets={['.target']}
          hitRate={0}
          selectByClick={true}
          selectFromInside={false}
          toggleContinueSelect={['shift']}
          ratio={0}
          onDragStart={(e: OnDragStart): void => {
            const target = e.inputEvent.target as HTMLElement
            if (target.isContentEditable) {
              // 編集中の要素の場合は何もしない
              return
            }
            if (
              moveableRef.current?.isMoveableElement(target) ||
              targets.some((t) => t === target || t.contains(target))
            ) {
              e.stop()
            }
          }}
          onSelect={(e: OnSelect): void => {
            if (e.isDragStartEnd) return
            setTargets(e.selected as HTMLElement[])
          }}
          onSelectEnd={(e: OnSelectEnd): void => {
            if (e.isDragStartEnd) {
              const target = e.inputEvent.target as HTMLElement
              if (target.isContentEditable) {
                // 編集中の要素の場合はドラッグを開始しない
                return
              }
              e.inputEvent.preventDefault()
              moveableRef.current?.waitToChangeTarget().then(() => {
                moveableRef.current?.dragStart(e.inputEvent)
              })
            }
            setTargets(e.selected as HTMLElement[])
          }}
        />
        <div className="elements selecto-area mt-[40px] border-2 border-[#eeeeee] p-[20px]">
          {cubes.map(
            (i: number): JSX.Element => (
              <div
                className="cube target m-[4px] inline-block h-[100px] w-[200px] rounded-[5px] bg-[#eeeeee] leading-[40px]"
                contentEditable={editingCubes.has(i)}
                key={i}
                onMouseDown={(e: React.MouseEvent<HTMLDivElement>): void => {
                  e.stopPropagation()
                }}
                onDoubleClick={(_e: React.MouseEvent<HTMLDivElement>): void => {
                  // ダブルクリックで編集可能にする
                  setEditingCubes((prev) => new Set(prev).add(i))
                }}
                onBlur={(): void => {
                  // フォーカスが外れたら編集モードを解除
                  setEditingCubes((prev) => {
                    const newSet = new Set(prev)
                    newSet.delete(i)
                    return newSet
                  })
                }}
              >
                Hello {i}
              </div>
            ),
          )}
        </div>
        <div className="empty elements border-none" />
      </div>
    </div>
  )
}
