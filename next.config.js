/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/upload',
        destination: '/api/upload',
      },
    ];
  },
}

module.exports = nextConfig
