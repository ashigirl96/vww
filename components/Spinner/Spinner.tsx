import { translatePath } from '@remotion/paths'
import { makeRect } from '@remotion/shapes'
import type React from 'react'
import { useMemo } from 'react'
import { randomUUID } from '../../helpers/random-uuid.ts'
import styles from './styles.module.css'

const viewBox = 100
const lines = 12
const width = viewBox * 0.08

const { path } = makeRect({
  height: viewBox * 0.24,
  width,
  cornerRadius: width / 2,
})

const translated = translatePath(path, viewBox / 2 - width / 2, viewBox * 0.03)

export const Spinner: React.FC<{
  size: number
}> = ({ size }) => {
  const style = useMemo(() => {
    return {
      width: size,
      height: size,
    }
  }, [size])

  return (
    // <svg style={style} viewBox={`0 0 ${viewBox} ${viewBox}`}>
    <svg style={style} viewBox={`0 0 ${viewBox} ${viewBox}`}>
      {new Array(lines).fill(true).map((_, index) => {
        return (
          <path
            className={styles.line}
            style={{
              rotate: `${(index * Math.PI * 2) / lines}rad`,
              transformOrigin: 'center center',
              animationDelay: `${index * 0.1 - lines * 0.1}s`,
            }}
            key={`line-${randomUUID()}`}
            d={translated}
            fill="var(--foreground)"
          />
        )
      })}
    </svg>
  )
}
