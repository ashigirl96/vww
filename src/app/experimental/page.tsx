'use client'

import { randomUUID } from '@/helpers/random-uuid.ts'
import type React from 'react'
import { type KeyboardEvent, useState } from 'react'

const CustomInput: React.FC = () => {
  const [chars, setChars] = useState<string[]>([])

  // Handle key down events
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key.length === 1) {
      setChars((prevChars) => [...prevChars, e.key])
      e.preventDefault() // Prevent default typing behavior
    }
    if (e.key === 'Backspace') {
      setChars((prevChars) => prevChars.slice(0, -1))
      e.preventDefault()
    }
  }

  return (
    <div
      tabIndex={0} // Make the div focusable
      onKeyDown={handleKeyDown}
      className="flex h-10 min-w-[200px] items-center rounded-md border border-gray-300 p-2"
      role="textbox"
      contentEditable={false} // Prevent content editable behavior, rely on keydown
    >
      {chars.map((char, _index) => (
        <div key={randomUUID()} className="mx-1 rounded-md bg-gray-200 px-2 py-1 text-center">
          {char}
        </div>
      ))}
    </div>
  )
}

export default CustomInput
