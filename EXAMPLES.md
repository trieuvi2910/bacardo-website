# Project Name Examples

## 🎯 Overview

This document shows examples of how to use **ANY project name** you want when starting projects.

## 📋 Examples

### Example 1: Default Project
```bash
# This will use default name "bardo-website" and port 8080
./start-project.sh

# Result:
# - Container name: bardo-website
# - Port: 8080
# - Access: http://localhost:8080
```

### Example 2: Custom Project Name
```bash
# This will use custom name "my-awesome-project" and port 8081
./start-project.sh my-awesome-project 8081

# Result:
# - Container name: my-awesome-project
# - Port: 8081
# - Access: http://localhost:8081
```

### Example 3: Another Custom Name
```bash
# This will use custom name "cool-website" and port 8082
./start-project.sh cool-website 8082

# Result:
# - Container name: cool-website
# - Port: 8082
# - Access: http://localhost:8082
```

### Example 4: Fun Names
```bash
# You can use ANY name you want!
./start-project.sh super-duper-project 8083
./start-project.sh awesome-sauce 8084
./start-project.sh my-cool-app 8085
./start-project.sh whatever-name 8086
```

## 🏗️ Real-World Scenario

### Setting Up Multiple Projects

```bash
# Project 1: Main website
cd bardo-website
./start-project.sh bardo-website 8080

# Project 2: Blog
cd ../my-blog
./start-project.sh my-blog 8081

# Project 3: Portfolio
cd ../portfolio
./start-project.sh portfolio 8082

# Project 4: E-commerce
cd ../shop
./start-project.sh ecommerce-shop 8083

# Project 5: Admin panel
cd ../admin
./start-project.sh admin-panel 8084
```

### Checking All Projects

```bash
# List all running projects
docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}"

# Output example:
# NAMES           PORTS                    STATUS
# bardo-website   0.0.0.0:8080->80/tcp    Up 2 minutes
# my-blog         0.0.0.0:8081->80/tcp    Up 1 minute
# portfolio       0.0.0.0:8082->80/tcp    Up 30 seconds
# ecommerce-shop  0.0.0.0:8083->80/tcp    Up 15 seconds
# admin-panel     0.0.0.0:8084->80/tcp    Up 5 seconds
```

## 🔧 Project Name Rules

### ✅ Allowed Names
- `my-project`
- `awesome-website`
- `cool-app-123`
- `project_name`
- `my-cool-project`
- `whatever-name-you-want`
- `super-duper-awesome-project`

### ❌ Avoid These
- Names with spaces: `my project` (use `my-project` instead)
- Names with special characters: `my@project` (use `my-project` instead)
- Names starting with numbers: `123project` (use `project-123` instead)

## 🎯 Best Practices

### Naming Conventions
```bash
# Good names (descriptive and clear)
./start-project.sh main-website 8080
./start-project.sh blog-site 8081
./start-project.sh portfolio-site 8082
./start-project.sh ecommerce-store 8083

# Avoid generic names
./start-project.sh project1 8080
./start-project.sh test 8081
./start-project.sh temp 8082
```

### Port Management
```bash
# Use port ranges for different project types
# 8080-8089: Main projects
./start-project.sh main-website 8080
./start-project.sh blog 8081

# 8090-8099: Development projects
./start-project.sh dev-website 8090
./start-project.sh staging 8091

# 8100-8109: Testing projects
./start-project.sh test-website 8100
./start-project.sh demo 8101
```

## 🔄 Common Operations

### Start Projects
```bash
# Start with custom names
./start-project.sh my-website 8080
./start-project.sh my-blog 8081
./start-project.sh my-portfolio 8082
```

### Stop Projects
```bash
# Stop by project name
./stop-project.sh my-website
./stop-project.sh my-blog
./stop-project.sh my-portfolio
```

### Check Status
```bash
# Check specific project
docker-compose ps

# Check all projects
docker ps | grep -E "(my-website|my-blog|my-portfolio)"
```

## 📊 Project Management Tips

### 1. Use Descriptive Names
```bash
# Instead of this:
./start-project.sh project1 8080

# Use this:
./start-project.sh main-website 8080
```

### 2. Document Your Projects
```bash
# Create a simple documentation file
cat > projects.txt << EOF
Main Website: bardo-website (port 8080)
Blog: my-blog (port 8081)
Portfolio: portfolio (port 8082)
E-commerce: shop (port 8083)
Admin: admin (port 8084)
EOF
```

### 3. Use Consistent Naming
```bash
# All projects follow the same pattern
./start-project.sh client-website 8080
./start-project.sh client-blog 8081
./start-project.sh client-portfolio 8082
```

## 🎯 Summary

- **Project names are completely flexible**: Use ANY name you want!
- **Names are just for identification**: They don't affect functionality
- **Ports must be unique**: Each project needs a different port
- **Names are case-sensitive**: `my-project` and `My-Project` are different
- **Use descriptive names**: Makes management easier

## 🔗 Quick Reference

```bash
# Start projects with custom names
./start-project.sh [any-name-you-want] [port]

# Examples:
./start-project.sh my-website 8080
./start-project.sh awesome-blog 8081
./start-project.sh cool-portfolio 8082
./start-project.sh whatever-name 8083
```
