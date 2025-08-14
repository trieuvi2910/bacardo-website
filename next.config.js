/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: ["localhost"],
        unoptimized: true,
    },
    async rewrites() {
        return [
            {
                source: "/api/upload",
                destination: "/api/upload",
            },
        ];
    },
};

module.exports = nextConfig;
