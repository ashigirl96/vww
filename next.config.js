const _isProd = process.env.NODE_ENV === 'production'
const _internalHost = process.env.TAURI_DEV_HOST || 'localhost'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: _isProd ? undefined : `http://${_internalHost}:3000`,
}

module.exports = nextConfig
