import { useRendering } from '@/helpers/use-rendering.ts'
import { COMP_NAME, type CompositionProps } from '@/types/constants.ts'
import type { z } from 'zod'
import { AlignEnd } from './AlignEnd.tsx'
import { Button } from './Button/Button.tsx'
import { InputContainer } from './Container.tsx'
import { DownloadButton } from './DownloadButton.tsx'
import { ErrorComp } from './Error.tsx'
import { Input } from './Input.tsx'
import { ProgressBar } from './ProgressBar.tsx'
import { Spacing } from './Spacing.tsx'

export const RenderControls: React.FC<{
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  inputProps: z.infer<typeof CompositionProps>
}> = ({ text, setText, inputProps }) => {
  const { renderMedia, state, undo } = useRendering(COMP_NAME, inputProps)

  return (
    <InputContainer>
      {state.status === 'init' || state.status === 'invoking' || state.status === 'error' ? (
        <>
          <Input disabled={state.status === 'invoking'} setText={setText} text={text} />
          <Spacing />
          <AlignEnd>
            <Button
              disabled={state.status === 'invoking'}
              loading={state.status === 'invoking'}
              onClick={renderMedia}
            >
              Render video
            </Button>
          </AlignEnd>
          {state.status === 'error' ? <ErrorComp message={state.error.message} /> : null}
        </>
      ) : null}
      {state.status === 'rendering' || state.status === 'done' ? (
        <>
          <ProgressBar progress={state.status === 'rendering' ? state.progress : 1} />
          <Spacing />
          <AlignEnd>
            <DownloadButton undo={undo} state={state} />
          </AlignEnd>
        </>
      ) : null}
    </InputContainer>
  )
}