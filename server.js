const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Environment configuration
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 3000;

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Start server
app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            // Parse URL
            const parsedUrl = parse(req.url, true);

            // Handle API routes
            if (parsedUrl.pathname.startsWith("/api/")) {
                // Add CORS headers for API requests
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
                res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

                // Handle preflight requests
                if (req.method === "OPTIONS") {
                    res.writeHead(200);
                    res.end();
                    return;
                }
            }

            // Security headers for production
            if (!dev) {
                res.setHeader("X-Content-Type-Options", "nosniff");
                res.setHeader("X-Frame-Options", "DENY");
                res.setHeader("X-XSS-Protection", "1; mode=block");
                res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
            }

            // Let Next.js handle the request
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error("Error occurred handling", req.url, err);
            res.statusCode = 500;
            res.end("Internal server error");
        }
    })
        .once("error", (err) => {
            console.error("Server error:", err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`🚀 Bardo Website running on http://${hostname}:${port}`);
            console.log(`📱 Environment: ${dev ? "Development" : "Production"}`);
            console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
        });
});

// Graceful shutdown handlers
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    process.exit(0);
});

process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully");
    process.exit(0);
});
