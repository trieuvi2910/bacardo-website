/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: ["https://barcado.9fstudio.com"],
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
