'use client'

import React, { useState, useEffect, useRef } from 'react'

// TypeScript declarations for wallet providers
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeAllListeners: () => void
      isMetaMask?: boolean
    }
    solana?: {
      connect: () => Promise<{ publicKey: { toString: () => string } }>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeAllListeners: () => void
      isPhantom?: boolean
      isSolflare?: boolean
      isBackpack?: boolean
      isSlope?: boolean
    }
  }
}

interface HeaderProps {
  isWalletConnected: boolean
  onWalletConnect: () => void
}

export default function Header({ isWalletConnected, onWalletConnect }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('')
  const [showWalletPopup, setShowWalletPopup] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Check for existing wallet connection on component mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      const savedWallet = localStorage.getItem('connectedWallet')
      if (savedWallet) {
        // Check if MetaMask is still connected
        if (typeof window.ethereum !== 'undefined') {
          try {
            const accounts = await window.ethereum.request({ 
              method: 'eth_accounts' 
            })
            
            if (accounts.length > 0) {
              const account = accounts[0]
              const walletInfo = `${account.slice(0, 6)}...${account.slice(-4)}`
              setConnectedWallet(walletInfo)
              
              // Re-add event listeners
              window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length > 0) {
                  const newAccount = accounts[0]
                  const newWalletInfo = `${newAccount.slice(0, 6)}...${newAccount.slice(-4)}`
                  setConnectedWallet(newWalletInfo)
                  localStorage.setItem('connectedWallet', newWalletInfo)
                } else {
                  setConnectedWallet(null)
                  localStorage.removeItem('connectedWallet')
                }
              })
              
              window.ethereum.on('chainChanged', () => {
                window.location.reload()
              })
            } else {
              // No accounts, clear saved connection
              setConnectedWallet(null)
              localStorage.removeItem('connectedWallet')
            }
          } catch (error) {
            console.error('Error checking existing connection:', error)
            setConnectedWallet(null)
            localStorage.removeItem('connectedWallet')
          }
        } else {
          // MetaMask not available, clear saved connection
          setConnectedWallet(null)
          localStorage.removeItem('connectedWallet')
        }
      }
    }

    checkExistingConnection()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const toggleWalletPopup = () => {
    setShowWalletPopup(!showWalletPopup)
  }

  const connectWallet = async (walletType: string) => {
    setIsConnecting(true)
    
    try {
      if (walletType === 'metamask') {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
          // Request account access
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          })
          
          if (accounts.length > 0) {
            const account = accounts[0]
            const walletInfo = `${account.slice(0, 6)}...${account.slice(-4)}`
            setConnectedWallet(walletInfo)
            localStorage.setItem('connectedWallet', walletInfo)
            setShowWalletPopup(false)
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
              if (accounts.length > 0) {
                const newAccount = accounts[0]
                const newWalletInfo = `${newAccount.slice(0, 6)}...${newAccount.slice(-4)}`
                setConnectedWallet(newWalletInfo)
                localStorage.setItem('connectedWallet', newWalletInfo)
              } else {
                setConnectedWallet(null)
                localStorage.removeItem('connectedWallet')
              }
            })
            
            // Listen for chain changes
            window.ethereum.on('chainChanged', () => {
              window.location.reload()
            })
          }
        } else {
          // MetaMask not installed, redirect to install page
          window.open('https://metamask.io/download/', '_blank')
        }
              } else if (walletType === 'phantom') {
          // Phantom wallet connection logic
          if (typeof window.solana !== 'undefined' && window.solana.isPhantom) {
            const response = await window.solana.connect()
            const publicKey = response.publicKey.toString()
            const walletInfo = `Phantom: ${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`
            setConnectedWallet(walletInfo)
            localStorage.setItem('connectedWallet', walletInfo)
            setShowWalletPopup(false)
          } else {
            window.open('https://phantom.app/', '_blank')
          }
        } else if (walletType === 'solflare') {
          // Solflare wallet connection logic
          if (typeof window.solana !== 'undefined' && window.solana.isSolflare) {
            const response = await window.solana.connect()
            const publicKey = response.publicKey.toString()
            const walletInfo = `Solflare: ${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`
            setConnectedWallet(walletInfo)
            localStorage.setItem('connectedWallet', walletInfo)
            setShowWalletPopup(false)
          } else {
            window.open('https://solflare.com/', '_blank')
          }
        } else if (walletType === 'backpack') {
          // Backpack wallet connection logic
          if (typeof window.solana !== 'undefined' && window.solana.isBackpack) {
            const response = await window.solana.connect()
            const publicKey = response.publicKey.toString()
            const walletInfo = `Backpack: ${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`
            setConnectedWallet(walletInfo)
            localStorage.setItem('connectedWallet', walletInfo)
            setShowWalletPopup(false)
          } else {
            window.open('https://backpack.app/', '_blank')
          }
        } else if (walletType === 'slope') {
          // Slope wallet connection logic
          if (typeof window.solana !== 'undefined' && window.solana.isSlope) {
            const response = await window.solana.connect()
            const publicKey = response.publicKey.toString()
            const walletInfo = `Slope: ${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`
            setConnectedWallet(walletInfo)
            localStorage.setItem('connectedWallet', walletInfo)
            setShowWalletPopup(false)
          } else {
            window.open('https://slope.finance/', '_blank')
          }
        }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      alert('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setConnectedWallet(null)
    localStorage.removeItem('connectedWallet')
    // Remove event listeners
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.removeAllListeners()
    }
    if (typeof window.solana !== 'undefined') {
      window.solana.removeAllListeners()
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['token', 'how-to-buy', 'media', 'roadmap']
      const scrollPosition = window.scrollY + 150 // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showWalletPopup && !target.closest('.wallet-popup') && !target.closest('.connect-wallet-btn')) {
        setShowWalletPopup(false)
      }
    }

    // Handle ESC key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showWalletPopup) {
        setShowWalletPopup(false)
      }
    }

    // Lock/unlock body scroll
    if (showWalletPopup) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscKey)
    } else {
      document.body.style.overflow = 'unset'
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [showWalletPopup])

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-container">
          <div className="logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
            <img src="/assets/50b73f6c9dc6cde8ffeda28e7f0f2efcb9a88c60.png" alt="$Bardo Logo" className="logo-img" />
            <h2>$Bardo</h2>
          </div>
          <ul className="nav-menu">
            <li><a href="#token" className={activeSection === 'token' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('token'); }}>Token</a></li>
            <li><a href="#how-to-buy" className={activeSection === 'how-to-buy' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('how-to-buy'); }}>How to Buy</a></li>
            <li><a href="#media" className={activeSection === 'media' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('media'); }}>Media</a></li>
            <li><a href="#roadmap" className={activeSection === 'roadmap' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('roadmap'); }}>Roadmap</a></li>
          </ul>
          <div className="nav-buttons">
            {connectedWallet ? (
              <div className="wallet-status">
                <img src="/assets/MetaMask.svg" alt="MetaMask" className="wallet-icon" />
                <span className="wallet-address">{connectedWallet}</span>
                <button 
                  className="disconnect-btn" 
                  onClick={disconnectWallet}
                  title="Disconnect Wallet"
                >
                  ×
                </button>
              </div>
            ) : (
              <button 
                className="btn btn-gradient connect-wallet-btn" 
                id="headerWalletBtn"
                onClick={toggleWalletPopup}
              >
                Get $Bardo
              </button>
            )}
          </div>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Wallet Connection Popup */}
      {showWalletPopup && (
        <div className="wallet-popup-overlay">
          <div className="wallet-popup">
            <div className="wallet-popup-header">
              <h3>Connect Wallet</h3>
              <button className="close-btn" onClick={() => setShowWalletPopup(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
            <div className="wallet-popup-content">
              <div className={`wallet-option ${isConnecting ? 'connecting' : ''}`} onClick={() => !isConnecting && connectWallet('metamask')}>
                <img src="/assets/MetaMask.svg" alt="MetaMask" />
                <span>MetaMask</span>
                {isConnecting && <div className="connecting-spinner"></div>}
              </div>
              {/* <div className={`wallet-option ${isConnecting ? 'connecting' : ''}`} onClick={() => !isConnecting && connectWallet('phantom')}>
                <img src="/assets/phantom-wallet.png" alt="Phantom" />
                <span>Phantom</span>
                {isConnecting && <div className="connecting-spinner"></div>}
              </div>
              <div className={`wallet-option ${isConnecting ? 'connecting' : ''}`} onClick={() => !isConnecting && connectWallet('solflare')}>
                <img src="/assets/solflare-wallet.png" alt="Solflare" />
                <span>Solflare</span>
                {isConnecting && <div className="connecting-spinner"></div>}
              </div>
              <div className={`wallet-option ${isConnecting ? 'connecting' : ''}`} onClick={() => !isConnecting && connectWallet('backpack')}>
                <img src="/assets/backpack-wallet.png" alt="Backpack" />
                <span>Backpack</span>
                {isConnecting && <div className="connecting-spinner"></div>}
              </div>
              <div className={`wallet-option ${isConnecting ? 'connecting' : ''}`} onClick={() => !isConnecting && connectWallet('slope')}>
                <img src="/assets/slope-wallet.png" alt="Slope" />
                <span>Slope</span>
                {isConnecting && <div className="connecting-spinner"></div>}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
