import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'myskatelandwest.com' },
      { protocol: 'https', hostname: 'www.myskatelandwest.com' },
      // Legacy hostname kept whitelisted in case any historical content still
      // references it; Caddy 301s the user-facing path anyway.
      { protocol: 'https', hostname: 'skateland.buford.dev' },
      { protocol: 'https', hostname: 'media.buford.dev' },
      ...[NEXT_PUBLIC_SERVER_URL, process.env.S3_PUBLIC_URL].filter(Boolean).map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
