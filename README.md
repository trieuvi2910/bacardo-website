# $Bardo - Rocking to Blockchain Rhythm 🎸

A modern, responsive cryptocurrency website for $Bardo token, featuring a dark theme with neon accents and interactive elements. Built with HTML5, CSS3, and vanilla JavaScript.

![$Bardo Website](https://img.shields.io/badge/Status-Live-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🎯 Features

### ✨ Design & UI
- **Dark Theme**: Sleek dark background with neon purple and cyan accents
- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Modern Typography**: Big Shoulders Display font family for bold, impactful text
- **Smooth Animations**: CSS animations and transitions for enhanced user experience
- **Glass Morphism**: Backdrop blur effects and transparent elements

### 🎮 Interactive Elements
- **Flip Cards**: Interactive step cards with 3D flip animations
- **Expandable Roadmap**: Click-to-expand timeline sections
- **Music Player**: Interactive music player controls with hover effects
- **Copy Functionality**: One-click copy for token addresses
- **Smooth Scrolling**: Seamless navigation between sections

### 📱 Mobile Optimized
- **Mobile Menu**: Hamburger menu for mobile navigation
- **Touch Interactions**: Optimized for touch devices
- **Responsive Grid**: Adaptive layouts for different screen sizes
- **Performance**: Optimized loading and smooth scrolling

### 🎨 Visual Effects
- **Neon Glow**: Glowing effects on buttons and interactive elements
- **Parallax Scrolling**: Subtle parallax effects for depth
- **Hover Animations**: Interactive hover states throughout
- **Loading States**: Smooth loading transitions

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bardo-website.git
   cd bardo-website
   ```

2. **Open the project**
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx serve src
   
   # Or simply open src/index.html in your browser
   ```

3. **View the website**
   - Navigate to `http://localhost:8000` (if using server)
   - Or open `src/index.html` directly in your browser

## 📁 Project Structure

```
bardo-website/
├── src/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── script.js       # JavaScript functionality
│   └── assets/             # Images and media files
│       ├── logo.svg
│       ├── hero.png
│       ├── token1.png
│       ├── token2.png
│       ├── token3.png
│       ├── copy.png
│       ├── diamon.png
│       ├── at.png
│       ├── 2.png
│       ├── 3.png
│       └── placeholder.txt
├── README.md               # Project documentation
└── .gitignore             # Git ignore file
```

## 🎨 Design System

### Color Palette
- **Primary Background**: `#090c1c` (Dark Blue)
- **Secondary Background**: `#0f0a28` (Darker Blue)
- **Neon Purple**: `#8e2de2` (Purple Accent)
- **Neon Cyan**: `#00ffff` (Cyan Accent)
- **Neon Pink**: `#ff2e63` (Pink Accent)
- **White Text**: `#f8f8ff` (Off White)

### Typography
- **Primary Font**: Big Shoulders Display (Google Fonts)
- **Weights**: 400 (Regular), 700 (Bold), 800 (Extra Bold), 900 (Black)
- **Fallback**: Sans-serif

### Spacing
- **Container Max Width**: 1200px
- **Section Padding**: 100px vertical
- **Element Gaps**: 20px, 40px, 60px (responsive)

## 🎯 Sections Overview

### 1. Navigation
- Fixed header with backdrop blur
- Logo and navigation links
- CTA button with neon glow effect

### 2. Hero Section
- Full-screen video/background
- "LIVE NOW" badge
- Concert information
- Buy Now button

### 3. Token Section
- Token information card
- Contract address with copy functionality
- Platform links (Pump Fun, Raydium, Dexscreener)
- Token features display

### 4. How to Buy
- Interactive step cards with flip animations
- 4-step process visualization
- Arrow indicators between steps

### 5. Media Gallery
- Grid layout with featured item
- Play button overlay
- See More button

### 6. Tokenomics
- Tokenomics information display
- Interactive music player
- Background image integration

### 7. Roadmap
- Timeline layout with expandable sections
- Phase information with dates
- Click-to-expand functionality

### 8. Footer
- Logo and navigation links
- Social media icons
- CTA button

## 🛠️ Customization

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding CSS in `style.css`
3. Add JavaScript functionality in `script.js`

### Modifying Colors
Update CSS custom properties in `style.css`:
```css
:root {
    --primary-bg: #090c1c;
    --neon-purple: #8e2de2;
    --neon-cyan: #00ffff;
    --neon-pink: #ff2e63;
}
```

### Adding Animations
Use the existing animation classes or create new ones:
```css
.animate-in {
    animation: fadeInUp 0.6s ease forwards;
}
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🚀 Performance Features

- **Optimized Images**: Compressed and optimized assets
- **CSS Animations**: Hardware-accelerated animations
- **Smooth Scrolling**: Native smooth scroll behavior
- **Lazy Loading**: Images load as needed
- **Minified Code**: Production-ready code structure

## 🎵 Interactive Features

### Step Cards
- Click to flip and reveal additional information
- Hover effects for enhanced interaction
- Mobile touch support

### Music Player
- Play/pause functionality
- Control buttons with hover effects
- Visual feedback on interaction

### Copy Functionality
- One-click copy for addresses
- Visual feedback with animations
- Cross-browser compatibility

### Expandable Roadmap
- Click to expand/collapse sections
- Smooth height transitions
- Maintains timeline visual flow

## 🔧 Development

### Local Development
1. Clone the repository
2. Open `src/index.html` in your browser
3. Use browser dev tools for debugging
4. Make changes and refresh to see updates

### Code Style
- **HTML**: Semantic HTML5 structure
- **CSS**: BEM methodology for class naming
- **JavaScript**: ES6+ features with fallbacks

### File Organization
- **HTML**: Semantic structure with clear sections
- **CSS**: Organized by component and responsive breakpoints
- **JavaScript**: Modular functions with clear naming

## 🎨 Design Principles

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### User Experience
- Intuitive navigation
- Clear call-to-actions
- Responsive design
- Fast loading times

### Visual Hierarchy
- Clear typography scale
- Consistent spacing
- Logical content flow
- Visual feedback on interactions

## 📈 Future Enhancements

- [ ] Video integration for hero section
- [ ] Real-time token price display
- [ ] Social media feed integration
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Advanced animations
- [ ] PWA capabilities
- [ ] Analytics integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎸 About $Bardo

$Bardo is a cryptocurrency token that combines the energy of rock music with blockchain technology. The website reflects this unique fusion with its bold design, interactive elements, and rock-inspired aesthetic.

---

**Built with ❤️ and 🎸 for the $Bardo community**

*Rock to Blockchain Rhythm* 🤘 