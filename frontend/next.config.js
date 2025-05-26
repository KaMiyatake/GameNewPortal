/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'placehold.co',
      'via.placeholder.com',
    ],
    dangerouslyAllowSVG: true,  // SVG画像を許可
    contentDispositionType: 'attachment',  // セキュリティ対策
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",  // セキュリティポリシーの設定
  },
};

module.exports = nextConfig;