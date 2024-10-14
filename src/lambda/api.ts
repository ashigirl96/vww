import type { ApiResponse } from '@/helpers/api-response.ts'
import type { ItemProps } from '@/types/constants.ts'
import type { ProgressRequest, ProgressResponse, RenderRequest } from '@/types/schema.ts'
import type { RenderMediaOnLambdaOutput } from '@remotion/lambda/client'
import type { z } from 'zod'

const makeRequest = async <Res>(endpoint: string, body: unknown): Promise<Res> => {
  const result = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  })
  const json = (await result.json()) as ApiResponse<Res>
  if (json.type === 'error') {
    throw new Error(json.message)
  }

  return json.data
}

export const renderVideo = async ({
  id,
  inputProps,
}: {
  id: string
  inputProps: z.infer<typeof ItemProps>
}) => {
  // Lambdaでのレンダリング
  const body: z.infer<typeof RenderRequest> = {
    id,
    inputProps,
  }
  return makeRequest<RenderMediaOnLambdaOutput>('/api/lambda/render', body)
}

export const getProgress = async ({
  id,
  bucketName,
}: {
  id: string
  bucketName: string
}) => {
  const body: z.infer<typeof ProgressRequest> = {
    id,
    bucketName,
  }

  return makeRequest<ProgressResponse>('/api/lambda/progress', body)
}
