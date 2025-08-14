# $Bardo Website - NextJS Version

A modern, responsive cryptocurrency website for $Bardo token built with NextJS 14, featuring an admin panel for gallery management.

## 🚀 Features

- **Modern NextJS 14** with App Router
- **Responsive Design** with Tailwind CSS
- **Admin Panel** at `/admin` for image upload and management
- **Dynamic Gallery** that displays uploaded images
- **Image Upload** with drag & drop support
- **Category Management** for organizing images
- **Search & Filter** functionality
- **Like System** for images
- **Mobile Responsive** design

## 🛠️ Tech Stack

- **Framework**: NextJS 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **File Upload**: React Dropzone
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Big Shoulders Display)

## 📁 Project Structure

```
bardo-website/
├── app/                    # NextJS App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   │   ├── upload/        # Image upload endpoint
│   │   └── gallery/       # Gallery management endpoints
│   ├── components/        # React components
│   ├── styles/            # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                 # Static assets
│   ├── assets/            # Original website assets
│   └── uploads/           # Uploaded images
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Main site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

### Build & Deploy

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## 📸 Admin Panel Features

### Image Upload
- Drag & drop interface
- Multiple file selection
- Category assignment
- Progress tracking
- File validation

### Gallery Management
- View all uploaded images
- Search and filter images
- Bulk delete operations
- Category organization
- Image metadata display

### Supported Formats
- JPEG/JPG
- PNG
- GIF
- WebP

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_NAME=Bardo Website
NEXT_PUBLIC_APP_URL=http://localhost:3000
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp
```

### Tailwind CSS
Custom colors and fonts are configured in `tailwind.config.js`:
- Primary: #ff2e63 (Pink)
- Secondary: #8f00ff (Purple)
- Accent: #00ffff (Cyan)

## 🎨 Customization

### Adding New Categories
Edit the category options in `app/admin/page.tsx`:
```typescript
<option value="new-category">New Category</option>
```

### Styling Changes
- Global styles: `app/styles/globals.css`
- Component styles: Use Tailwind classes
- Custom CSS variables: Defined in `:root`

### Adding New Components
1. Create component in `app/components/`
2. Import and use in desired page
3. Follow existing component patterns

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security Considerations

- File type validation
- File size limits
- Secure file naming (UUID)
- Input sanitization

## 🚧 Development Notes

### Current Limitations
- Images are stored locally (not in database)
- No user authentication for admin panel
- Mock data for gallery (can be replaced with real API)

### Future Enhancements
- Database integration (PostgreSQL/MongoDB)
- User authentication system
- Image optimization with Sharp
- CDN integration
- Real-time updates

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please contact the Bardo team.

---

**Built with ❤️ by the Bardo Team**
