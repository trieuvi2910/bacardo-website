#!/bin/bash

# Multi-Project Management Script
# Usage: ./manage-projects.sh [project-name] [port] [action]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
DEFAULT_PORT=8080
PROJECT_NAME="bardo-website"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [project-name] [port] [action]"
    echo ""
    echo "Actions:"
    echo "  start     - Start a project"
    echo "  stop      - Stop a project"
    echo "  restart   - Restart a project"
    echo "  status    - Show project status"
    echo "  logs      - Show project logs"
    echo "  health    - Check project health"
    echo "  list      - List all projects"
    echo ""
    echo "Examples:"
    echo "  $0 bardo-website 8080 start"
    echo "  $0 my-project 8081 start"
    echo "  $0 bardo-website status"
    echo "  $0 list"
    echo ""
    echo "Environment variables:"
    echo "  PORT        - Port number (default: 8080)"
    echo "  PROJECT_NAME - Project name (default: bardo-website)"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info &> /dev/null; then
        print_error "Docker is not running"
        exit 1
    fi
}

# Function to check if project exists
check_project() {
    local project=$1
    if [ ! -f "docker-compose.yml" ]; then
        print_error "docker-compose.yml not found in current directory"
        exit 1
    fi
}

# Function to start a project
start_project() {
    local project=$1
    local port=$2
    
    print_header "Starting $project on port $port"
    
    # Set environment variables
    export PORT=$port
    export PROJECT_NAME=$project
    
    # Check if port is already in use
    if netstat -tulpn 2>/dev/null | grep -q ":$port "; then
        print_warning "Port $port is already in use"
        read -p "Do you want to continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # Start the project
    print_status "Starting $project..."
    docker-compose up --build -d
    
    # Wait for health check
    print_status "Waiting for health check..."
    sleep 10
    
    # Check status
    if docker-compose ps | grep -q "Up"; then
        print_status "✅ $project started successfully on port $port"
        print_status "🌐 Access at: http://localhost:$port"
    else
        print_error "❌ Failed to start $project"
        docker-compose logs
        exit 1
    fi
}

# Function to stop a project
stop_project() {
    local project=$1
    
    print_header "Stopping $project"
    
    # Stop the project
    docker-compose down
    
    print_status "✅ $project stopped"
}

# Function to restart a project
restart_project() {
    local project=$1
    local port=$2
    
    print_header "Restarting $project"
    
    # Stop first
    stop_project $project
    
    # Start again
    start_project $project $port
}

# Function to show project status
show_status() {
    local project=$1
    
    print_header "Status for $project"
    
    if docker-compose ps | grep -q "Up"; then
        print_status "✅ $project is running"
        
        # Get container info
        CONTAINER_ID=$(docker-compose ps -q)
        if [ ! -z "$CONTAINER_ID" ]; then
            echo ""
            echo "Container Details:"
            docker inspect --format='  ID: {{.Id}}' $CONTAINER_ID
            docker inspect --format='  Status: {{.State.Status}}' $CONTAINER_ID
            docker inspect --format='  Health: {{.State.Health.Status}}' $CONTAINER_ID
            docker inspect --format='  Created: {{.Created}}' $CONTAINER_ID
        fi
        
        # Show port mapping
        echo ""
        echo "Port Mapping:"
        docker-compose port bardo-website 80 2>/dev/null || echo "  Port mapping not available"
        
    else
        print_warning "⚠️  $project is not running"
    fi
}

# Function to show project logs
show_logs() {
    local project=$1
    
    print_header "Logs for $project"
    
    if docker-compose ps | grep -q "Up"; then
        docker-compose logs -f
    else
        print_warning "⚠️  $project is not running"
    fi
}

# Function to check project health
check_health() {
    local project=$1
    
    print_header "Health check for $project"
    
    if docker-compose ps | grep -q "Up"; then
        # Check health status
        HEALTH_STATUS=$(docker inspect --format='{{.State.Health.Status}}' bardo-website 2>/dev/null || echo "none")
        
        if [ "$HEALTH_STATUS" = "healthy" ]; then
            print_status "✅ $project is healthy"
        elif [ "$HEALTH_STATUS" = "unhealthy" ]; then
            print_error "❌ $project is unhealthy"
            echo "Health check logs:"
            docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' bardo-website
        else
            print_warning "⚠️  Health status: $HEALTH_STATUS"
        fi
        
        # Test HTTP response
        PORT=$(docker-compose port bardo-website 80 | cut -d: -f2)
        if [ ! -z "$PORT" ]; then
            if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT | grep -q "200\|301\|302"; then
                print_status "✅ HTTP response is OK"
            else
                print_warning "⚠️  HTTP response is not OK"
            fi
        fi
    else
        print_warning "⚠️  $project is not running"
    fi
}

# Function to list all projects
list_projects() {
    print_header "List of all projects"
    
    # Get all running containers
    echo "Running projects:"
    docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}" | grep -E "(bardo-website|project)" || echo "  No projects running"
    
    echo ""
    echo "All containers:"
    docker ps -a --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}" | grep -E "(bardo-website|project)" || echo "  No project containers found"
}

# Main script logic
main() {
    # Check if Docker is running
    check_docker
    
    # Parse arguments
    case $# in
        0)
            show_usage
            exit 1
            ;;
        1)
            case $1 in
                "list")
                    list_projects
                    exit 0
                    ;;
                "help"|"-h"|"--help")
                    show_usage
                    exit 0
                    ;;
                *)
                    PROJECT_NAME=$1
                    PORT=$DEFAULT_PORT
                    ACTION="status"
                    ;;
            esac
            ;;
        2)
            PROJECT_NAME=$1
            case $2 in
                "start"|"stop"|"restart"|"status"|"logs"|"health")
                    ACTION=$2
                    PORT=$DEFAULT_PORT
                    ;;
                *)
                    PORT=$2
                    ACTION="start"
                    ;;
            esac
            ;;
        3)
            PROJECT_NAME=$1
            PORT=$2
            ACTION=$3
            ;;
        *)
            print_error "Too many arguments"
            show_usage
            exit 1
            ;;
    esac
    
    # Check if project exists
    check_project $PROJECT_NAME
    
    # Execute action
    case $ACTION in
        "start")
            start_project $PROJECT_NAME $PORT
            ;;
        "stop")
            stop_project $PROJECT_NAME
            ;;
        "restart")
            restart_project $PROJECT_NAME $PORT
            ;;
        "status")
            show_status $PROJECT_NAME
            ;;
        "logs")
            show_logs $PROJECT_NAME
            ;;
        "health")
            check_health $PROJECT_NAME
            ;;
        *)
            print_error "Unknown action: $ACTION"
            show_usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
