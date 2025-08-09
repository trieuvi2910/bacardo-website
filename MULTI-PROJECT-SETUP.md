# Multi-Project Setup Guide

## 🎯 Overview

This guide will help you set up multiple projects, each running on a different port using Docker.

## 🏗️ Architecture

```
Project 1 (bardo-website) → Port 8080
Project 2 (my-project)     → Port 8081
Project 3 (another-project) → Port 8082
...
```

## 📁 Project Structure

Each project should have its own directory:

```
projects/
├── bardo-website/
│   ├── src/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── start-project.sh
│   └── stop-project.sh
├── my-project/
│   ├── src/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── start-project.sh
│   └── stop-project.sh
└── another-project/
    ├── src/
    ├── docker-compose.yml
    ├── Dockerfile
    ├── start-project.sh
    └── stop-project.sh
```

## 🚀 Quick Start

### Step 1: Create Project Directory

```bash
# Create project directory
mkdir my-project
cd my-project

# Copy the template files
cp -r ../bardo-website/* .
```

### Step 2: Start Project

```bash
# Start project with custom name and port
./start-project.sh my-project 8081
```

### Step 3: Access Project

- Open browser and navigate to `http://localhost:8081`

## 📋 Available Scripts

### start-project.sh

Start a project with custom name and port.

```bash
# Usage
./start-project.sh [project-name] [port]

# Examples
./start-project.sh bardo-website 8080
./start-project.sh my-project 8081
./start-project.sh another-project 8082
```

### stop-project.sh

Stop the current project.

```bash
# Usage
./stop-project.sh [project-name]

# Examples
./stop-project.sh bardo-website
./stop-project.sh my-project
```

### manage-projects.sh

Advanced project management (if available).

```bash
# Usage
./manage-projects.sh [project-name] [port] [action]

# Examples
./manage-projects.sh bardo-website 8080 start
./manage-projects.sh my-project 8081 status
./manage-projects.sh list
```

## 🔧 Configuration

### Environment Variables

Each project uses these environment variables:

- `PROJECT_NAME`: Project name (default: bardo-website)
- `PORT`: Port number (default: 8080)

### docker-compose.yml

The docker-compose.yml file is configured to use environment variables:

```yaml
version: '3.8'

services:
  website:
    build: .
    container_name: ${PROJECT_NAME:-bardo-website}
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

## 📊 Project Management

### List All Projects

```bash
# List running containers
docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}"

# List all containers
docker ps -a --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}"
```

### Check Project Status

```bash
# Check specific project
docker-compose ps

# Check all projects
docker ps | grep -E "(bardo-website|my-project|another-project)"
```

### View Project Logs

```bash
# View logs for current project
docker-compose logs -f

# View logs for specific container
docker logs -f container-name
```

## 🔄 Common Operations

### Start Multiple Projects

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

### Stop Multiple Projects

```bash
# Stop Project 1
cd bardo-website
./stop-project.sh bardo-website

# Stop Project 2
cd ../my-project
./stop-project.sh my-project

# Stop Project 3
cd ../another-project
./stop-project.sh another-project
```

### Restart Project

```bash
# Stop and start again
./stop-project.sh my-project
./start-project.sh my-project 8081
```

## 🛠️ Troubleshooting

### Port Already in Use

If you get a "port already in use" error:

```bash
# Check what's using the port
netstat -tulpn | grep :8081

# Kill the process using the port
sudo kill -9 <PID>

# Or choose a different port
./start-project.sh my-project 8083
```

### Container Not Starting

```bash
# Check logs
docker-compose logs

# Check container status
docker-compose ps

# Rebuild and start
docker-compose down
docker-compose up --build -d
```

### Health Check Failed

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' container-name

# Check health logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' container-name
```

## 📝 Best Practices

### Port Management

- Use ports 8080-8099 for development projects
- Document port assignments for each project
- Avoid using ports below 1024 (require root)

### Project Naming

- Use descriptive project names
- Avoid spaces and special characters
- Use lowercase and hyphens

### Directory Structure

- Keep each project in its own directory
- Use consistent naming conventions
- Include README files for each project

## 🎯 Example Workflow

### Setting Up a New Project

1. **Create project directory**
   ```bash
   mkdir my-new-project
   cd my-new-project
   ```

2. **Copy template files**
   ```bash
   cp -r ../bardo-website/* .
   ```

3. **Customize project**
   - Edit `src/` files
   - Update project name in scripts
   - Configure any specific settings

4. **Start project**
   ```bash
   ./start-project.sh my-new-project 8083
   ```

5. **Access project**
   - Open `http://localhost:8083`

### Daily Development

1. **Start projects**
   ```bash
   cd bardo-website && ./start-project.sh bardo-website 8080
   cd ../my-project && ./start-project.sh my-project 8081
   ```

2. **Develop and test**
   - Make changes to `src/` files
   - Refresh browser to see changes
   - Check logs if needed

3. **Stop projects**
   ```bash
   cd bardo-website && ./stop-project.sh
   cd ../my-project && ./stop-project.sh
   ```

## 🔗 Useful Commands

```bash
# View all running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View container logs
docker logs -f container-name

# Execute command in container
docker exec -it container-name /bin/sh

# View container details
docker inspect container-name

# Clean up unused containers
docker container prune

# Clean up unused images
docker image prune
```

## 📞 Support

If you encounter issues:

1. Check if Docker is running: `docker info`
2. Check container logs: `docker-compose logs`
3. Check container status: `docker-compose ps`
4. Verify port availability: `netstat -tulpn | grep :port`
5. Check health status: `docker inspect container-name`
