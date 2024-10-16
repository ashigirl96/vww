'use client'

import React from 'react'
import Moveable, { type OnClickGroup, type OnRender, type OnRenderGroup } from 'react-moveable'
import Selecto, { type OnDragStart, type OnSelect, type OnSelectEnd } from 'react-selecto'

export default function App(): JSX.Element {
  const cubes: number[] = Array.from({ length: 30 }, (_: undefined, i: number): number => i)
  const [targets, setTargets] = React.useState<HTMLElement[]>([])
  const moveableRef: React.MutableRefObject<Moveable | null> = React.useRef<Moveable | null>(null)
  const selectoRef: React.MutableRefObject<Selecto | null> = React.useRef<Selecto | null>(null)

  return (
    <div className="moveable relative box-border flex min-h-full items-center justify-center px-[20px] py-[10px] text-center">
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
            const target: HTMLElement = e.inputEvent.target as HTMLElement
            if (
              moveableRef.current?.isMoveableElement(target) ||
              targets.some((t: HTMLElement) => t === target || t.contains(target))
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
                className="cube target m-[4px] inline-block h-[40px] w-[40px] rounded-[5px] bg-[#eeeeee] leading-[40px]"
                key={i}
              />
            ),
          )}
        </div>
        <div className="empty elements border-none" />
      </div>
    </div>
  )
}
