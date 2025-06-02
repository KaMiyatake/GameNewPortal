/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'placehold.co',
      'via.placeholder.com',
    ],
    dangerouslyAllowSVG: true,  // SVG画像を許可
    contentDispositionType: 'attachment',  // セキュリティ対策
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",  // セキュリティポリシーの設定
  },
  compress: true,
  poweredByHeader: false,

  // SEO用のヘッダー設定
  async headers() {
    return [
      {
        source: '/favicon-v2.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(apple-touch-icon|favicon-96x96|web-app-manifest-.*)\\.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/site.webmanifest',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/xml',
          },
          {
            key: 'Cache-Control',
            value: 's-maxage=3600, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 's-maxage=86400, stale-while-revalidate',
          },
        ],
      },
    ];
  },

  // リダイレクト設定
  async redirects() {
    return [
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
