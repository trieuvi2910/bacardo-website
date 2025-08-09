#!/bin/bash

# Start Project Script
# Usage: ./start-project.sh [project-name] [port]

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Default values
DEFAULT_PORT=8080
DEFAULT_PROJECT="bardo-website"

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
    echo "Usage: $0 [project-name] [port]"
    echo ""
    echo "Examples:"
    echo "  $0 bardo-website 8080    # Start bardo-website on port 8080"
    echo "  $0 my-project 8081       # Start my-project on port 8081"
    echo "  $0 another-project 8082  # Start another-project on port 8082"
    echo "  $0                       # Start with default: bardo-website on port 8080"
    echo ""
    echo "Note: You can use ANY project name you want!"
    echo "The project name is just for container naming and identification."
    echo ""
    echo "Default values:"
    echo "  Project name: $DEFAULT_PROJECT"
    echo "  Port: $DEFAULT_PORT"
}

# Check if Docker is running
check_docker() {
    if ! docker info &> /dev/null; then
        print_error "Docker is not running"
        exit 1
    fi
}

# Check if docker-compose.yml exists
check_compose() {
    if [ ! -f "docker-compose.yml" ]; then
        print_error "docker-compose.yml not found in current directory"
        exit 1
    fi
}

# Check if port is available
check_port() {
    local port=$1
    if netstat -tulpn 2>/dev/null | grep -q ":$port "; then
        print_warning "Port $port is already in use"
        read -p "Do you want to continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Start project
start_project() {
    local project_name=$1
    local port=$2
    
    print_header "Starting $project_name on port $port"
    
    # Set environment variables
    export PROJECT_NAME=$project_name
    export PORT=$port
    
    print_status "Project name: $project_name"
    print_status "Port: $port"
    print_status "Container name: $project_name"
    
    # Check port availability
    check_port $port
    
    # Stop existing container if running
    if docker-compose ps | grep -q "Up"; then
        print_status "Stopping existing container..."
        docker-compose down
    fi
    
    # Start the project
    print_status "Starting $project_name..."
    docker-compose up --build -d
    
    # Wait for health check
    print_status "Waiting for health check..."
    sleep 10
    
    # Check status
    if docker-compose ps | grep -q "Up"; then
        print_status "✅ $project_name started successfully!"
        print_status "🌐 Access at: http://localhost:$port"
        print_status "📊 Container name: $project_name"
        echo ""
        print_status "You can now:"
        print_status "  - View logs: docker-compose logs -f"
        print_status "  - Stop project: ./stop-project.sh"
        print_status "  - Check status: docker-compose ps"
    else
        print_error "❌ Failed to start $project_name"
        docker-compose logs
        exit 1
    fi
}

# Main script
main() {
    # Check prerequisites
    check_docker
    check_compose
    
    # Parse arguments
    case $# in
        0)
            PROJECT_NAME=$DEFAULT_PROJECT
            PORT=$DEFAULT_PORT
            print_status "Using default values: $PROJECT_NAME on port $PORT"
            ;;
        1)
            PROJECT_NAME=$1
            PORT=$DEFAULT_PORT
            print_status "Using custom project name: $PROJECT_NAME on port $PORT"
            ;;
        2)
            PROJECT_NAME=$1
            PORT=$2
            print_status "Using custom project name: $PROJECT_NAME on port $PORT"
            ;;
        *)
            print_error "Too many arguments"
            show_usage
            exit 1
            ;;
    esac
    
    # Start the project
    start_project $PROJECT_NAME $PORT
}

# Show usage if help requested
if [ "$1" = "help" ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    show_usage
    exit 0
fi

# Run main function
main "$@"
