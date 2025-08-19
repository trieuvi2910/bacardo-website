# 🔄 Complete Migration Guide: WordPress → Next.js

## 🎯 Overview

This guide will help you:
1. **Move WordPress to subdomain** (e.g., `blog.yourdomain.com`)
2. **Deploy Next.js as main site** (e.g., `yourdomain.com`)
3. **Keep both sites running** with proper configuration

---

## 📋 Prerequisites

- ✅ cPanel hosting with Node.js support
- ✅ WordPress website currently running on main domain
- ✅ Domain pointing to hosting
- ✅ SSH access (recommended)
- ✅ Database access (phpMyAdmin)

---

## 🚀 Quick Start (Automated)

```bash
# 1. Install dependencies
npm install

# 2. Run WordPress migration
npm run migrate:wp

# 3. Deploy Next.js
npm run deploy:nodejs
```

---

## 🔄 Phase 1: WordPress Migration

### Step 1: Create Subdomain in cPanel

1. **Login to cPanel**
2. **Go to "Subdomains"**
3. **Create subdomain:**
   - Subdomain: `blog` (or `wp`)
   - Domain: `yourdomain.com`
   - Document Root: `public_html/blog`
4. **Click "Create"**

### Step 2: Run Migration Script

```bash
# Make script executable and run
chmod +x migrate-wordpress.sh
./migrate-wordpress.sh
```

**What this script does:**
- ✅ Creates backup of current WordPress
- ✅ Moves WordPress files to subdomain directory
- ✅ Creates proper .htaccess files
- ✅ Generates database update script

### Step 3: Update WordPress Database

1. **Go to phpMyAdmin in cPanel**
2. **Select your WordPress database**
3. **Run SQL commands:**

```sql
-- Update site URLs
UPDATE wp_options SET option_value = 'https://blog.yourdomain.com' WHERE option_name = 'home';
UPDATE wp_options SET option_value = 'https://blog.yourdomain.com' WHERE option_name = 'siteurl';

-- Update content URLs (optional)
UPDATE wp_posts SET post_content = REPLACE(post_content, 'https://yourdomain.com', 'https://blog.yourdomain.com');
UPDATE wp_posts SET guid = REPLACE(guid, 'https://yourdomain.com', 'https://blog.yourdomain.com');

-- Verify changes
SELECT option_name, option_value FROM wp_options WHERE option_name IN ('home', 'siteurl');
```

### Step 4: Test WordPress Subdomain

- Visit: `https://blog.yourdomain.com`
- Ensure all pages load correctly
- Check if images and media work
- Verify admin panel access

---

## ⚡ Phase 2: Next.js Deployment

### Step 1: Enable Node.js in cPanel

1. **Go to cPanel → "Setup Node.js App"**
2. **Click "Create Application"**
3. **Configure:**
   - Node.js version: **18.x** or higher
   - Application mode: **Production**
   - Application root: `public_html/`
   - Application URL: `yourdomain.com`
   - Application startup file: `server.js`

### Step 2: Build Next.js Project

```bash
# Build for production
npm run build

# Check build output
npm run check
```

### Step 3: Upload to cPanel

1. **Go to cPanel File Manager**
2. **Navigate to `public_html/`**
3. **Upload all project files EXCEPT:**
   - `node_modules/` (will be installed on server)
   - `.git/` directory
   - Development files

**Required files to upload:**
- `server.js`
- `.next/` directory
- `public/` directory
- `package.json`
- `next.config.js`
- All other project files

### Step 4: Install Dependencies on Server

1. **In cPanel File Manager, right-click on `package.json`**
2. **Select "Terminal" or use SSH**
3. **Run:**
```bash
cd public_html
npm install --production
```

### Step 5: Start Node.js App

1. **Go back to "Setup Node.js App"**
2. **Click "Restart" on your application**
3. **Check logs for any errors**

---

## 🔧 Manual Migration (Alternative)

If you prefer manual steps:

### 1. Create Directory Structure
```bash
public_html/
├── blog/          ← WordPress subdomain
│   ├── index.php
│   ├── wp-config.php
│   └── [all WordPress files]
├── .htaccess      ← Main domain config
└── [empty]        ← Ready for Next.js
```

### 2. Create .htaccess Files

**Main domain (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]
```

**WordPress subdomain (blog/.htaccess):**
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
```

---

## 🎯 Final Directory Structure

```
public_html/
├── blog/                    ← WordPress (https://blog.yourdomain.com)
│   ├── index.php
│   ├── wp-config.php
│   ├── wp-content/
│   ├── wp-admin/
│   └── .htaccess
├── .next/                   ← Next.js build files
├── public/                  ← Static assets
├── server.js                ← Node.js server
├── package.json
├── next.config.js
└── .htaccess                ← Main domain config
```

---

## 🔍 Testing Checklist

### WordPress Subdomain
- [ ] `https://blog.yourdomain.com` loads
- [ ] All pages work correctly
- [ ] Admin panel accessible
- [ ] Images and media display
- [ ] Forms submit properly

### Next.js Main Site
- [ ] `https://yourdomain.com` loads
- [ ] All components render correctly
- [ ] API endpoints work (if any)
- [ ] Mobile responsive
- [ ] Performance acceptable

### General
- [ ] SSL certificates active
- [ ] No 404 errors
- [ ] Proper redirects
- [ ] Security headers working

---

## 🚨 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| WordPress not loading | Check subdomain DNS and database URLs |
| Next.js not starting | Verify Node.js app configuration |
| 404 errors | Check .htaccess files and permissions |
| Database connection | Verify database credentials in wp-config.php |
| SSL errors | Install certificates for both domains |

### Error Logs

1. **WordPress errors**: Check `blog/wp-content/debug.log`
2. **Next.js errors**: Check cPanel Node.js app logs
3. **Server errors**: Check cPanel Error Logs

---

## 🔒 Security Considerations

1. **File Permissions**
   - Directories: `755`
   - Files: `644`
   - wp-config.php: `600`

2. **SSL Certificates**
   - Install for main domain
   - Install for subdomain
   - Force HTTPS redirects

3. **Security Headers**
   - X-Content-Type-Options
   - X-Frame-Options
   - X-XSS-Protection

---

## 📊 Performance Optimization

1. **WordPress**
   - Install caching plugin
   - Optimize images
   - Use CDN for static assets

2. **Next.js**
   - Enable compression
   - Browser caching
   - Image optimization

---

## 🎉 Success!

After completing this migration:

- ✅ **WordPress** runs on: `https://blog.yourdomain.com`
- ✅ **Next.js** runs on: `https://yourdomain.com`
- ✅ **Both sites** are fully functional
- ✅ **SEO preserved** with proper redirects
- ✅ **Performance optimized** for both platforms

---

## 🆘 Need Help?

1. **Check error logs** in cPanel
2. **Verify file permissions**
3. **Test step by step**
4. **Contact hosting support** if needed

**Remember**: Always backup before making changes!

---

**Happy Migrating! 🚀**

