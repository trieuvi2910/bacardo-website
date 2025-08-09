# Bardo Website - Multi-Project Support

A revolutionary token project website built with HTML, CSS, and JavaScript, optimized for VPS deployment with multi-project support.

## 🚀 Quick Start

### Single Project
```bash
# Start with default settings (port 8080, project name: bardo-website)
./start-project.sh

# Start with custom name and port
./start-project.sh my-project 8081
./start-project.sh another-project 8082
./start-project.sh whatever-name-you-want 8083
```

### Multiple Projects
```bash
# Project 1
cd bardo-website
./start-project.sh bardo-website 8080

# Project 2
cd ../my-project
./start-project.sh my-project 8081

# Project 3
cd ../another-project
./start-project.sh another-project 8082
```

## 🏗️ Architecture

### Single Project
```
Internet → VPS (Port 8080) → Docker Container
```

### Multiple Projects
```
Project 1 (bardo-website) → Port 8080
Project 2 (my-project)     → Port 8081
Project 3 (another-project) → Port 8082
```

### Optimized for VPS
- **Single container per project**: Simple nginx-based setup
- **Configurable ports**: Each project runs on different port
- **Flexible naming**: Use ANY project name you want
- **No volumes**: All files included in image
- **Security headers**: XSS protection, frame options, content type sniffing
- **Performance**: Gzip compression, caching, optimized static file serving
- **Health checks**: Automatic health monitoring

### File Structure
```
bardo-website/
├── src/
│   ├── assets/          # Images and static assets
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   ├── music/          # Audio files
│   └── index.html      # Main HTML file
├── docker-compose.yml  # Multi-project configuration
├── Dockerfile          # Optimized for VPS
├── nginx.conf          # Production nginx config
├── start-project.sh    # Start project script
├── stop-project.sh     # Stop project script
├── manage-projects.sh  # Advanced project management
├── MULTI-PROJECT-SETUP.md # Multi-project guide
└── README.md           # This file
```

## 🔧 Configuration

### Environment Variables
- `PROJECT_NAME`: Project name (default: bardo-website) - **You can use ANY name!**
- `PORT`: Port number (default: 8080)

### Docker Compose
```yaml
version: '3.8'
services:
  website:
    build: .
    container_name: ${PROJECT_NAME:-bardo-website}  # Uses your custom name
    ports:
      - "${PORT:-8080}:80"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    environment:
      - PROJECT_NAME=${PROJECT_NAME:-bardo-website}
      - PORT=${PORT:-8080}
```

## 🛠️ Management Commands

### Start Project
```bash
# Default (bardo-website on port 8080)
./start-project.sh

# Custom project name and port
./start-project.sh my-project 8081
./start-project.sh another-project 8082
./start-project.sh whatever-name-you-want 8083
```

### Stop Project
```bash
# Stop current project
./stop-project.sh

# Stop specific project
./stop-project.sh my-project
```

### Check Status
```bash
# Check current project
docker-compose ps

# Check all projects
docker ps | grep -E "(bardo-website|my-project|another-project)"
```

### View Logs
```bash
# View logs for current project
docker-compose logs -f

# View logs for specific container
docker logs -f container-name
```

## 🔒 Security Features

- **Security headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- **Hidden nginx version**: server_tokens off
- **Denied access to hidden files**: Location ~ /\. { deny all; }
- **Optimized static file serving**: Proper caching and compression
- **Health checks**: Automatic monitoring and restart

## 📊 Performance Optimizations

- **Gzip compression**: Enabled for text-based files
- **Static file caching**: 1-year cache for static assets
- **Sendfile optimization**: Efficient file serving
- **TCP optimizations**: nopush, nodelay for better performance
- **Resource monitoring**: Health checks and logging

## 🎯 Multi-Project Setup

### Creating New Project

1. **Create project directory**
   ```bash
   mkdir my-new-project
   cd my-new-project
   ```

2. **Copy template files**
   ```bash
   cp -r ../bardo-website/* .
   ```

3. **Start project with ANY name you want**
   ```bash
   ./start-project.sh my-new-project 8083
   ./start-project.sh whatever-name 8084
   ./start-project.sh cool-project 8085
   ```

4. **Access project**
   - Open `http://localhost:8083` (or whatever port you chose)

### Project Management

```bash
# List all running projects
docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}"

# Start multiple projects with different names
cd bardo-website && ./start-project.sh bardo-website 8080
cd ../my-project && ./start-project.sh my-project 8081
cd ../cool-project && ./start-project.sh cool-project 8082

# Stop multiple projects
cd bardo-website && ./stop-project.sh
cd ../my-project && ./stop-project.sh
cd ../cool-project && ./stop-project.sh
```

## 🔄 Updates

To update a project:

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Rebuild and restart**
   ```bash
   ./stop-project.sh
   ./start-project.sh my-project 8081
   ```

## 📝 Notes

- **Project names are flexible**: You can use ANY name you want!
- Each project runs on its own port
- All static files are cached for 1 year
- Security headers are automatically added
- Containers restart automatically if they crash
- No persistent storage required (all files in image)
- Health checks monitor container status
- Ready for production deployment on VPS

## 📚 Documentation

- [Multi-Project Setup Guide](MULTI-PROJECT-SETUP.md) - Detailed guide for managing multiple projects
- [VPS Setup Guide](VPS-SETUP.md) - VPS deployment instructions
- [Cloudflare Zero Trust Guide](CLOUDFLARE-ZERO-TRUST.md) - Cloudflare integration

## 🎯 Production Checklist

- [ ] Domain configured (optional)
- [ ] Cloudflare Zero Trust setup (recommended)
- [ ] Firewall configured (ports open)
- [ ] Monitoring setup (optional)
- [ ] Backup strategy (optional)
- [ ] Multi-project ports documented
- [ ] Health checks configured
- [ ] Security headers enabled 