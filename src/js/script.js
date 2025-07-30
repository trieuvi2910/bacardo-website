// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initVideoHover();
    initCarousel();
    initTokenomicsPlayer();
    initHeaderScroll();
    initRoadmapExpand();
});

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }
}

// Video Hover Effect
function initVideoHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const video = item.querySelector('.hover-video');
        const playButton = item.querySelector('.play-button');
        
        if (video && playButton) {
            // Mouse enter
            item.addEventListener('mouseenter', function() {
                video.play().catch(e => console.log('Video play failed:', e));
                video.style.opacity = '1';
            });
            
            // Mouse leave
            item.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0;
                video.style.opacity = '0';
            });
            
            // Click to play/pause
            playButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (video.paused) {
                    video.play();
                    playButton.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    playButton.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }
    });
}

// Token Carousel
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    if (track) {
        // Chỉ clone nếu chưa clone lần nào
        if (!track.dataset.cloned) {
            const items = Array.from(track.children);
            items.forEach(item => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });
            track.dataset.cloned = "true";
        }
        // Pause on hover
        track.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        track.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

// Tokenomics Player
function initTokenomicsPlayer() {
    const playBtn = document.querySelector('.control-btn.play');
    const prevBtn = document.querySelector('.control-btn.skip-back');
    const nextBtn = document.querySelector('.control-btn.skip-forward');
    const shuffleBtn = document.querySelector('.option-btn.shuffle');
    const repeatBtn = document.querySelector('.option-btn.repeat');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-play')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    }
    
    // Add hover effects to all buttons
    [playBtn, prevBtn, nextBtn, shuffleBtn, repeatBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(9, 12, 28, 0.98)';
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(9, 12, 28, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Roadmap Expand
function initRoadmapExpand() {
    const expandButtons = document.querySelectorAll('.roadmap .btn-gradient');
    
    expandButtons.forEach(btn => {
        const timelineItem = btn.closest('.timeline-item');
        let isExpanded = false;
        
        btn.addEventListener('click', function() {
            const content = timelineItem.querySelector('.timeline-content');
            
            if (!isExpanded) {
                content.style.height = 'auto';
                content.style.padding = 'var(--spacing-xl)';
                btn.textContent = 'Show Less';
            } else {
                content.style.height = '';
                content.style.padding = '';
                btn.textContent = 'Click to expand';
            }
            
            isExpanded = !isExpanded;
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Copy Token Address
const copyBtn = document.querySelector('.copy-btn');
if (copyBtn) {
    copyBtn.addEventListener('click', function() {
        const address = document.querySelector('.address').textContent;
        navigator.clipboard.writeText(address).then(() => {
            const icon = this.querySelector('i');
            icon.classList.remove('fa-copy');
            icon.classList.add('fa-check');
            
            setTimeout(() => {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-copy');
            }, 2000);
        });
    });
}



// Marquee Token Carousel - Ultra Smooth
function initTokenCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    // Tạo hiệu ứng carousel thực sự
    function createCarouselEffect() {
        const itemWidth = 150; // Chiều rộng mỗi item
        const gap = 66;
        const containerWidth = track.parentElement.offsetWidth;
        
        // Xóa tất cả item hiện tại
        track.innerHTML = '';
        
        // Tính toán số item cần thiết để lấp đầy container (3x để đảm bảo seamless ở cả hai chiều)
        const neededItems = Math.ceil((containerWidth * 3) / (itemWidth + gap));
        
        // Tạo đủ item
        for (let i = 0; i < neededItems; i++) {
            const newItem = document.createElement('div');
            newItem.className = 'carousel-item';
            newItem.innerHTML = `
                <img src="assets/50b73f6c9dc6cde8ffeda28e7f0f2efcb9a88c60.png" alt="$Bardo" />
                <span>$Bardo</span>
            `;
            track.appendChild(newItem);
        }
    }
    
    // Chạy khi trang load và khi resize
    createCarouselEffect();
    window.addEventListener('resize', createCarouselEffect);
    
    // Animation variables
    let currentPosition = 0;
    let direction = -1; // -1 for left, 1 for right
    const speed = 1; // pixels per frame
    
    // Animation function using requestAnimationFrame
    function animate() {
        currentPosition += speed * direction;
        
        // Get container width for boundary detection
        const containerWidth = track.parentElement.offsetWidth;
        const trackWidth = track.scrollWidth;
        
        // Change direction when reaching boundaries
        if (currentPosition <= -(trackWidth / 3)) {
            direction = 1; // Go right
        } else if (currentPosition >= 0) {
            direction = -1; // Go left
        }
        
        // Apply transform with hardware acceleration
        track.style.transform = `translateX(${currentPosition}px)`;
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    // Start animation
    requestAnimationFrame(animate);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
    
    // Add click effect to carousel items
    track.addEventListener('click', (e) => {
        if (e.target.closest('.carousel-item')) {
            const item = e.target.closest('.carousel-item');
            
            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(143, 0, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 10;
            `;
            
            const rect = item.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            item.style.position = 'relative';
            item.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        }
    });
    
    // Thêm hiệu ứng chuyển chiều mượt mà
    let lastDirectionChange = Date.now();
    setInterval(() => {
        const now = Date.now();
        if (Math.abs(now - lastDirectionChange) > 10000) { // Log every 10 seconds
            console.log(`Direction: ${direction === -1 ? 'Left' : 'Right'}, Position: ${currentPosition.toFixed(0)}px`);
            lastDirectionChange = now;
        }
    }, 1000);
    
    return {
        track,
        pause: () => track.style.animationPlayState = 'paused',
        resume: () => track.style.animationPlayState = 'running'
    };
}

// Audio Player for Tokenomics
class AudioPlayer {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.skipBackBtn = document.getElementById('skipBackBtn');
        this.skipForwardBtn = document.getElementById('skipForwardBtn');
        this.playIcon = this.playPauseBtn.querySelector('.play-icon');
        this.pauseIcon = this.playPauseBtn.querySelector('.pause-icon');
        
        // Ensure initial state
        if (this.playIcon) this.playIcon.style.display = 'block';
        if (this.pauseIcon) this.pauseIcon.style.display = 'none';
        
        console.log('Audio Player initialized:', {
            playIcon: this.playIcon,
            pauseIcon: this.pauseIcon,
            playPauseBtn: this.playPauseBtn
        });
        
        // Playlist
        this.playlist = [
            {
                title: 'Electric',
                artist: 'Robbie Rosen, jeonghyeon, Deerock, Vaance',
                src: 'music/Robbie Rosen, jeonghyeon, Deerock, Vaance - Electric (feat. Robbie Rosen) (jeonghyeon Remix) [NCS Release].mp3'
            },
            {
                title: 'Phoenix',
                artist: 'Netrum, Halvorsen',
                src: 'music/Netrum, Halvorsen - Phoenix (But It\'s Punk Rock) [NCS Release].mp3'
            },
            {
                title: 'The Rocks',
                artist: 'Maze',
                src: 'music/Maze - The Rocks [NCS Release].mp3'
            }
        ];
        
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        
        this.init();
    }
    
    init() {
        // Set initial track
        this.loadTrack(this.currentTrackIndex);
        
        // Event listeners
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.skipBackBtn.addEventListener('click', () => this.previousTrack());
        this.skipForwardBtn.addEventListener('click', () => this.nextTrack());
        
        // Audio events
        this.audio.addEventListener('ended', () => this.nextTrack());
        this.audio.addEventListener('loadeddata', () => this.updatePlayerInfo());
        
        // Update player info initially
        this.updatePlayerInfo();
    }
    
    loadTrack(index) {
        const track = this.playlist[index];
        this.audio.src = track.src;
        this.currentTrackIndex = index;
        this.updatePlayerInfo();
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.playPauseBtn.classList.add('playing');
            if (this.playIcon) this.playIcon.style.display = 'none';
            if (this.pauseIcon) this.pauseIcon.style.display = 'block';
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.playPauseBtn.classList.remove('playing');
        if (this.playIcon) this.playIcon.style.display = 'block';
        if (this.pauseIcon) this.pauseIcon.style.display = 'none';
    }
    
    nextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.loadTrack(this.currentTrackIndex);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    previousTrack() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(this.currentTrackIndex);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    updatePlayerInfo() {
        const track = this.playlist[this.currentTrackIndex];
        const playerInfo = document.querySelector('.player-info');
        
        if (playerInfo) {
            // Update the carousel to show current track
            const slides = playerInfo.querySelectorAll('.info-slide');
            slides.forEach((slide, index) => {
                if (index === this.currentTrackIndex) {
                    slide.style.display = 'block';
                    slide.innerHTML = `
                        <span>${track.title}</span>
                        <span class="separator">-</span>
                        <span>${track.artist}</span>
                    `;
                } else {
                    slide.style.display = 'none';
                }
            });
        }
    }
}

// Crypto Wallet Connection
class WalletConnector {
    constructor() {
        this.walletAddress = null;
        this.isConnected = false;
        this.init();
    }

    init() {
        // Lắng nghe sự kiện click cho tất cả các nút connect wallet
        const walletBtns = document.querySelectorAll('.connect-wallet-btn');
        walletBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleWalletConnect());
        });
    }

    async handleWalletConnect() {
        if (this.isConnected) {
            this.disconnectWallet();
            return;
        }

        try {
            // Kiểm tra xem có MetaMask không
            if (typeof window.ethereum !== 'undefined') {
                await this.connectMetaMask();
            } 
            // Kiểm tra Phantom (Solana wallet)
            else if (typeof window.solana !== 'undefined') {
                await this.connectPhantom();
            }
            // Nếu không có ví nào
            else {
                this.showWalletOptions();
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            this.showError('Failed to connect wallet. Please try again.');
        }
    }

    async connectMetaMask() {
        try {
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            if (accounts.length > 0) {
                this.walletAddress = accounts[0];
                this.isConnected = true;
                this.updateButtonText();
                this.showSuccess(`Connected to MetaMask: ${this.formatAddress(this.walletAddress)}`);
            }
        } catch (error) {
            throw new Error('MetaMask connection failed');
        }
    }

    async connectPhantom() {
        try {
            const response = await window.solana.connect();
            this.walletAddress = response.publicKey.toString();
            this.isConnected = true;
            this.updateButtonText();
            this.showSuccess(`Connected to Phantom: ${this.formatAddress(this.walletAddress)}`);
        } catch (error) {
            throw new Error('Phantom connection failed');
        }
    }

    disconnectWallet() {
        this.walletAddress = null;
        this.isConnected = false;
        this.updateButtonText();
        this.showSuccess('Wallet disconnected');
    }

    updateButtonText() {
        const walletBtns = document.querySelectorAll('.connect-wallet-btn');
        walletBtns.forEach(btn => {
            if (this.isConnected) {
                btn.textContent = `${this.formatAddress(this.walletAddress)}`;
                btn.classList.add('connected');
            } else {
                btn.textContent = 'Get $Bardo';
                btn.classList.remove('connected');
            }
        });
    }

    formatAddress(address) {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    showWalletOptions() {
        const message = `No crypto wallet detected!\n\nPlease install one of these wallets:\n• MetaMask (Ethereum)\n• Phantom (Solana)\n\nThen refresh the page and try again.`;
        alert(message);
        
        // Mở link download wallet
        setTimeout(() => {
            window.open('https://metamask.io/download/', '_blank');
        }, 1000);
    }

    showSuccess(message) {
        // Tạo toast notification
        this.showToast(message, 'success');
    }

    showError(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type = 'info') {
        // Tạo toast element
        const toast = document.createElement('div');
        toast.className = `wallet-toast ${type}`;
        toast.textContent = message;
        
        // Thêm styles
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
            color: 'white',
            borderRadius: '8px',
            zIndex: '10000',
            fontSize: '14px',
            fontFamily: 'var(--font-primary)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(toast);

        // Slide in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 4 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 4000);
    }
}

// Initialize wallet connector
let walletConnector;
let audioPlayer;

// Add Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    initTokenCarousel();
    
    // Initialize wallet connector
    walletConnector = new WalletConnector();
    
    // Initialize audio player
    audioPlayer = new AudioPlayer();
});