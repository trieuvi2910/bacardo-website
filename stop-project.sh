#!/bin/bash

# Stop Project Script
# Usage: ./stop-project.sh [project-name]

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

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
    echo "Usage: $0 [project-name]"
    echo ""
    echo "Examples:"
    echo "  $0 bardo-website"
    echo "  $0 my-project"
    echo ""
    echo "If no project name provided, will stop current project in this directory"
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

# Stop project
stop_project() {
    local project_name=$1
    
    print_header "Stopping $project_name"
    
    # Check if container is running
    if docker-compose ps | grep -q "Up"; then
        print_status "Stopping $project_name..."
        docker-compose down
        print_status "✅ $project_name stopped successfully!"
    else
        print_warning "⚠️  $project_name is not running"
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
            # Get project name from environment or default
            PROJECT_NAME=${PROJECT_NAME:-bardo-website}
            ;;
        1)
            PROJECT_NAME=$1
            ;;
        *)
            print_error "Too many arguments"
            show_usage
            exit 1
            ;;
    esac
    
    # Stop the project
    stop_project $PROJECT_NAME
}

# Show usage if help requested
if [ "$1" = "help" ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    show_usage
    exit 0
fi

# Run main function
main "$@"
