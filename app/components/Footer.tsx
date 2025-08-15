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
                    <h2>$Bardo</h2>
                </div>
                <div className="footer-links">
                    <a href="#how-to-buy">How to buy</a>
                    <a href="#token">Token</a>
                    <a href="#tokenomics">Tokenomics</a>
                    <a href="#music">Music</a>
                    <a href="#media">Media</a>
                    <a href="#roadmap">Roadmap</a>
                </div>
                <div className="footer-links">
                    <ul>
                        <li>
                            <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#">Terms of Service</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-social">
                    <h3>Follow Us</h3>
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
            <p className="footer-copyright">© 2025 Bacardo. All rights reserved.</p>
        </footer>
    );
}
