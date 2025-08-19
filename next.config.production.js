/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    // Production optimizations
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
    // Disable server-side features for static export
    experimental: {
        appDir: true,
    },
    // Ensure all routes are properly handled
    async rewrites() {
        return [
            {
                source: "/api/upload",
                destination: "/api/upload",
            },
        ];
    },
    // Security headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
