interface FooterProps {
  isWalletConnected: boolean
  onWalletConnect: () => void
}

export default function Footer({ isWalletConnected, onWalletConnect }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/assets/50b73f6c9dc6cde8ffeda28e7f0f2efcb9a88c60.png" alt="$Bardo Logo" />
          <h2>$Bardo</h2>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="#token">Token</a></li>
            <li><a href="#how-to-buy">How to buy</a></li>
            <li><a href="#media">Media</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
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
            {isWalletConnected ? 'Wallet Connected' : 'Get $Bardo'}
          </button>
        </div>
      </div>
    </footer>
  )
}
