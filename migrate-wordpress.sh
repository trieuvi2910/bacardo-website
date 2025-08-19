#!/bin/bash

# 🔄 WordPress Migration Script for Bardo Website
# This script helps migrate WordPress to subdomain and prepare for Next.js deployment
# Author: 9FSTUDIO

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="yourdomain.com"
SUBDOMAIN="blog"
WORDPRESS_DIR="public_html"
SUBDOMAIN_DIR="public_html/$SUBDOMAIN"
BACKUP_DIR="wordpress-backup-$(date +%Y%m%d-%H%M%S)"

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Please run this script from the project root."
        exit 1
    fi
    
    # Check if cPanel File Manager is accessible
    if [ ! -d "$WORDPRESS_DIR" ]; then
        print_warning "WordPress directory not found. This script assumes you're running from cPanel File Manager root."
        print_status "Please ensure you're in the correct directory."
    fi
    
    print_success "Prerequisites checked"
}

# Function to create backup
create_backup() {
    print_status "Creating WordPress backup..."
    
    if [ -d "$WORDPRESS_DIR" ]; then
        # Create backup directory
        mkdir -p "$BACKUP_DIR"
        
        # Copy WordPress files to backup
        cp -r "$WORDPRESS_DIR"/* "$BACKUP_DIR/"
        
        print_success "Backup created in: $BACKUP_DIR"
        print_warning "Please download this backup to your computer before proceeding!"
    else
        print_warning "WordPress directory not found. Skipping backup creation."
    fi
}

# Function to create subdomain structure
create_subdomain_structure() {
    print_status "Creating subdomain directory structure..."
    
    # Create subdomain directory
    mkdir -p "$SUBDOMAIN_DIR"
    
    print_success "Subdomain directory created: $SUBDOMAIN_DIR"
}

# Function to move WordPress files
move_wordpress_files() {
    print_status "Moving WordPress files to subdomain..."
    
    if [ -d "$WORDPRESS_DIR" ] && [ "$(ls -A $WORDPRESS_DIR)" ]; then
        # Move all files except the backup and subdomain directories
        for item in "$WORDPRESS_DIR"/*; do
            if [ "$(basename "$item")" != "$(basename "$SUBDOMAIN_DIR")" ] && \
               [ "$(basename "$item")" != "$(basename "$BACKUP_DIR")" ]; then
                mv "$item" "$SUBDOMAIN_DIR/"
                print_status "Moved: $(basename "$item")"
            fi
        done
        
        print_success "WordPress files moved to subdomain"
    else
        print_warning "No WordPress files found to move"
    fi
}

# Function to create .htaccess for main domain
create_main_htaccess() {
    print_status "Creating .htaccess for main domain..."
    
    cat > "$WORDPRESS_DIR/.htaccess" << 'EOF'
# Bardo Website - Main Domain Configuration
RewriteEngine On

# Redirect all traffic to Next.js app
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Compress files
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
EOF

    print_success ".htaccess created for main domain"
}

# Function to create subdomain .htaccess
create_subdomain_htaccess() {
    print_status "Creating .htaccess for WordPress subdomain..."
    
    cat > "$SUBDOMAIN_DIR/.htaccess" << 'EOF'
# WordPress Subdomain Configuration
RewriteEngine On

# WordPress rewrite rules
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options SAMEORIGIN
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# WordPress specific optimizations
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpFilesMatch "\.(ico|gif|jpe?g|png)$" "access plus 1 year"
</IfModule>
EOF

    print_success ".htaccess created for WordPress subdomain"
}

# Function to display migration summary
show_migration_summary() {
    echo ""
    echo -e "${GREEN}🎉 WordPress Migration Completed!${NC}"
    echo ""
    echo -e "${BLUE}📋 Migration Summary:${NC}"
    echo "• WordPress moved to: $SUBDOMAIN.$DOMAIN"
    echo "• Main domain ready for: Next.js deployment"
    echo "• Backup created in: $BACKUP_DIR"
    echo ""
    
    echo -e "${YELLOW}🔧 Next Steps:${NC}"
    echo "1. Update WordPress database URLs in phpMyAdmin:"
    echo "   UPDATE wp_options SET option_value = 'https://$SUBDOMAIN.$DOMAIN' WHERE option_name = 'home';"
    echo "   UPDATE wp_options SET option_value = 'https://$SUBDOMAIN.$DOMAIN' WHERE option_name = 'siteurl';"
    echo ""
    echo "2. Test WordPress on: https://$SUBDOMAIN.$DOMAIN"
    echo ""
    echo "3. Deploy Next.js to main domain:"
    echo "   npm run deploy:nodejs"
    echo ""
    
    echo -e "${BLUE}📁 Directory Structure:${NC}"
    echo "public_html/"
    echo "├── $SUBDOMAIN/     ← WordPress (https://$SUBDOMAIN.$DOMAIN)"
    echo "├── .htaccess       ← Main domain config"
    echo "└── [empty]         ← Ready for Next.js"
    echo ""
    
    echo -e "${GREEN}✅ Migration ready! Proceed with Next.js deployment.${NC}"
}

# Function to create database update script
create_db_update_script() {
    print_status "Creating database update script..."
    
    cat > "update-wordpress-db.sql" << EOF
-- WordPress Database Update Script
-- Run this in phpMyAdmin after migration

-- Update site URLs
UPDATE wp_options SET option_value = 'https://$SUBDOMAIN.$DOMAIN' WHERE option_name = 'home';
UPDATE wp_options SET option_value = 'https://$SUBDOMAIN.$DOMAIN' WHERE option_name = 'siteurl';

-- Update any hardcoded URLs in content (optional)
UPDATE wp_posts SET post_content = REPLACE(post_content, 'https://$DOMAIN', 'https://$SUBDOMAIN.$DOMAIN');
UPDATE wp_posts SET guid = REPLACE(guid, 'https://$DOMAIN', 'https://$SUBDOMAIN.$DOMAIN');

-- Verify changes
SELECT option_name, option_value FROM wp_options WHERE option_name IN ('home', 'siteurl');
EOF

    print_success "Database update script created: update-wordpress-db.sql"
}

# Main migration process
main() {
    echo -e "${BLUE}🔄 Starting WordPress Migration...${NC}"
    echo -e "${BLUE}⏰ Started at: $(date)${NC}"
    echo ""
    
    # Check prerequisites
    check_prerequisites
    
    # Create backup
    create_backup
    
    # Create subdomain structure
    create_subdomain_structure
    
    # Move WordPress files
    move_wordpress_files
    
    # Create .htaccess files
    create_main_htaccess
    create_subdomain_htaccess
    
    # Create database update script
    create_db_update_script
    
    # Show summary
    show_migration_summary
    
    echo ""
    echo -e "${BLUE}⏰ Completed at: $(date)${NC}"
    echo -e "${GREEN}🎯 WordPress migration completed successfully!${NC}"
}

# Run main function
main "$@"
