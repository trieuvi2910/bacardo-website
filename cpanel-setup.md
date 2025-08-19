# 🎯 cPanel Setup Guide for Bardo Website

## 📋 Pre-Deployment Checklist

### 1. Domain Configuration
- [ ] Domain points to your hosting server
- [ ] DNS records are properly configured
- [ ] SSL certificate is active (Let's Encrypt recommended)

### 2. cPanel Access
- [ ] cPanel login credentials ready
- [ ] File Manager access enabled
- [ ] FTP/SFTP access configured (optional)

## 🚀 Step-by-Step Deployment

### Step 1: Build Your Project
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Check build output
npm run check
```

### Step 2: Access cPanel File Manager
1. Login to your cPanel
2. Click "File Manager"
3. Navigate to `public_html` directory
4. This is your website root directory

### Step 3: Upload Files
1. **Select all files** from your local `out` directory
2. **Upload to** `public_html` directory
3. **Ensure these files are uploaded:**
   - `index.html`
   - `.htaccess`
   - `_next/` folder
   - `assets/` folder
   - All other HTML/CSS/JS files

### Step 4: Set Permissions
Right-click each item and set permissions:
- **Directories**: `755` (rwxr-xr-x)
- **Files**: `644` (rw-r--r--)
- **`.htaccess`**: `644`

### Step 5: Test Your Website
1. Visit your domain in browser
2. Check all pages load correctly
3. Verify images and assets display
4. Test mobile responsiveness

## ⚙️ cPanel Specific Settings

### 1. Enable .htaccess
- Go to cPanel → "MultiPHP Manager"
- Ensure PHP version is 7.4+ or 8.0+
- `.htaccess` should work automatically

### 2. Enable Gzip Compression
- Go to cPanel → "Optimize Website"
- Select "Compress all content"
- Click "Update Settings"

### 3. Enable Browser Caching
- Go to cPanel → "Optimize Website"
- Select "Use mod_expires"
- Click "Update Settings"

### 4. SSL Certificate
- Go to cPanel → "SSL/TLS"
- Install Let's Encrypt certificate
- Force HTTPS redirect

## 🔍 Troubleshooting Common Issues

### Issue 1: 404 Errors
**Solution:**
- Check `.htaccess` file is uploaded
- Verify file permissions (755 for dirs, 644 for files)
- Ensure all files are in correct location

### Issue 2: Images Not Loading
**Solution:**
- Check `assets/` folder is uploaded
- Verify file paths in browser console
- Check file permissions

### Issue 3: CSS/JS Not Loading
**Solution:**
- Check `_next/` folder is uploaded
- Verify file permissions
- Check browser console for errors

### Issue 4: Slow Loading
**Solution:**
- Enable Gzip compression
- Enable browser caching
- Optimize images
- Consider CDN

## 📱 Mobile Optimization

### 1. Test Responsiveness
- Use browser dev tools
- Test on actual mobile devices
- Check touch interactions

### 2. Performance
- Monitor Core Web Vitals
- Use Google PageSpeed Insights
- Optimize images for mobile

## 🔒 Security Considerations

### 1. File Permissions
- Never set files to 777
- Use 755 for directories
- Use 644 for files

### 2. Hide Sensitive Files
- `.htaccess` already blocks access to sensitive files
- Keep `.env` files private
- Monitor error logs

### 3. Regular Updates
- Keep hosting software updated
- Monitor security advisories
- Backup regularly

## 📊 Performance Monitoring

### 1. Enable Logs
- Go to cPanel → "Error Logs"
- Monitor for errors
- Check access logs

### 2. Use Analytics
- Google Analytics
- Google Search Console
- Hosting provider analytics

## 🎯 Post-Deployment Checklist

- [ ] Website loads without errors
- [ ] All pages accessible
- [ ] Images and media display correctly
- [ ] Mobile responsiveness works
- [ ] SSL certificate active
- [ ] Performance acceptable
- [ ] Error logs clean
- [ ] Backup system configured

## 🆘 Getting Help

### 1. Check Logs
- cPanel Error Logs
- Browser Console
- Network tab in dev tools

### 2. Contact Support
- Hosting provider support
- Development team
- Community forums

### 3. Useful Tools
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Browser dev tools

---

**🎉 Congratulations! Your Bardo Website is now live on cPanel!**

For ongoing maintenance, remember to:
- Monitor performance regularly
- Keep backups updated
- Update content as needed
- Monitor security
