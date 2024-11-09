// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from '@remotion/cli/config'
import { enableTailwind } from '@remotion/tailwind'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

Config.setVideoImageFormat('jpeg')
Config.overrideWebpackConfig((currentConfiguration) => {
  const withTailwind = enableTailwind(currentConfiguration)
  return {
    ...withTailwind,
    resolve: {
      ...withTailwind.resolve,
      plugins: [...(withTailwind.resolve?.plugins ?? []), new TsconfigPathsPlugin()],
    },
  }
})
