# 🚀 cPanel + Node.js Setup Guide for Bardo Website

## 📋 Prerequisites

- cPanel hosting with Node.js support
- SSH access (recommended)
- Domain pointing to hosting
- WordPress website currently running

## 🔄 Migration Plan

### Phase 1: Prepare Subdomain for WordPress
### Phase 2: Move WordPress to Subdomain  
### Phase 3: Deploy Next.js as Main Site

---

## 🌐 Phase 1: Prepare Subdomain for WordPress

### 1. Create Subdomain in cPanel
1. Login to cPanel
2. Go to "Subdomains"
3. Create subdomain: `blog.yourdomain.com` or `wp.yourdomain.com`
4. Document root: `public_html/blog` or `public_html/wp`

### 2. Create Directory Structure
```bash
# In cPanel File Manager, create:
public_html/
├── blog/          ← WordPress subdomain
└── [empty]        ← Will contain Next.js
```

---

## 📦 Phase 2: Move WordPress to Subdomain

### 1. Backup Current WordPress
```bash
# In cPanel File Manager:
1. Select all files in public_html/
2. Create ZIP backup
3. Download backup to your computer
```

### 2. Move WordPress Files
```bash
# Move files from public_html/ to public_html/blog/
1. Select all WordPress files
2. Cut and paste to blog/ subdirectory
3. Keep .htaccess in blog/ directory
```

### 3. Update WordPress Configuration
```bash
# Edit wp-config.php in blog/ directory:
1. Update WP_HOME and WP_SITEURL
2. Add these lines:
   define('WP_HOME','https://blog.yourdomain.com');
   define('WP_SITEURL','https://blog.yourdomain.com');
```

### 4. Update Database URLs
```sql
-- In phpMyAdmin, run:
UPDATE wp_options SET option_value = 'https://blog.yourdomain.com' WHERE option_name = 'home';
UPDATE wp_options SET option_value = 'https://blog.yourdomain.com' WHERE option_name = 'siteurl';
```

---

## ⚡ Phase 3: Deploy Next.js as Main Site

### 1. Enable Node.js in cPanel
1. Go to cPanel → "Setup Node.js App"
2. Click "Create Application"
3. Configure:
   - Node.js version: 18.x or higher
   - Application mode: Production
   - Application root: public_html/
   - Application URL: yourdomain.com
   - Application startup file: server.js

### 2. Create Production Server File
Create `server.js` in project root:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
```

### 3. Update package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "node server.js",
    "deploy:cpanel": "npm run build && echo 'Build completed! Restart Node.js app in cPanel.'"
  }
}
```

### 4. Build and Deploy
```bash
# Local build
npm run build

# Upload to cPanel
1. Upload all files to public_html/
2. Exclude node_modules/ (will be installed on server)
3. Restart Node.js app in cPanel
```

---

## 🔧 Alternative: Static Export (Simpler)

If you prefer static hosting without Node.js:

### 1. Remove Dynamic API Routes
```bash
# Comment out or remove these routes:
# app/api/gallery/[id]/toggle-public/route.ts
# app/api/gallery/[id]/like/route.ts
# app/api/gallery/[id]/route.ts
```

### 2. Use Static Export Config
```javascript
// next.config.js
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    // Remove all API-related code
};
```

### 3. Deploy as Static Files
```bash
npm run build
# Upload out/ directory to public_html/
```

---

## 🎯 Recommended Approach

**For full functionality**: Use Node.js deployment (Phase 3)
**For simplicity**: Use static export with simplified features

---

## 🚨 Important Notes

1. **Backup everything** before making changes
2. **Test subdomain** before moving WordPress
3. **Update DNS** if needed
4. **SSL certificates** for both main domain and subdomain
5. **Database backups** are crucial

## 🔍 Testing Checklist

- [ ] WordPress works on subdomain
- [ ] Next.js loads on main domain
- [ ] All links work correctly
- [ ] SSL certificates active
- [ ] Performance acceptable
- [ ] Mobile responsive

---

**Need help? Check the main deployment guide or contact support!**
