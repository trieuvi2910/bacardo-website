interface FooterProps {
    isWalletConnected: boolean;
    onWalletConnect: () => void;
}

export default function Footer({ isWalletConnected, onWalletConnect }: FooterProps) {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <img src="/assets/logo.png" alt="$Bardo Logo" />
                    <div className="footer-links-hits">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="/assets/youtube.png" alt="Youtube" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="/assets/spotify.png" alt="Spotify" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="/assets/music.png" alt="Apple Music" />
                        </a>
                    </div>
                </div>
                <div className="footer-links">
                    <a href="#how-to-buy">How to buy</a>
                    <a href="#token">Token</a>
                    <a href="#tokenomics">Tokenomics</a>
                    <a href="#music">Bacardo Hits</a>
                    <a href="#media">Gallery</a>
                    <a href="#roadmap">Roadmap</a>
                </div>
                <div className="footer-social">
                    <div className="social-icons">
                        <a href="https://t.me/Bacardocommunityofficial" target="_blank">
                            <img src="/assets/telegram.png" alt="Telegram" />
                        </a>
                        <a href="">
                            <img src="/assets/tiktok.svg" alt="TikTok" />
                        </a>
                        <a href="https://x.com/BacardoOfficial" target="_blank">
                            <img src="/assets/X.svg" alt="X" />
                        </a>
                    </div>
                    <button className="btn btn-gradient connect-wallet-btn" id="footerWalletBtn" onClick={onWalletConnect}>
                        {isWalletConnected ? "Wallet Connected" : "Get $Bardo"}
                    </button>
                </div>
            </div>
            <p className="footer-disclaimer">
                $BARDO is a community-driven meme token with no promise of financial return or intrinsic value. Nothing
                <br />
                on this site constitues financial, legal, or tax advice. Do your own research and consult a professional adviser.
            </p>
            <p className="footer-copyright">
                © 2025 Bacardo. All rights reserved. &nbsp;
                <a href="https://www.bacardo.com/privacy-policy" target="_blank">
                    Privacy Policy
                </a>
                &nbsp;&nbsp;
                <a href="https://www.bacardo.com/terms-of-service" target="_blank">
                    Terms of Service
                </a>
            </p>
        </footer>
    );
}
