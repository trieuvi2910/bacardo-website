'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken')
      if (token) {
        // User is already logged in, redirect to galleries
        router.push('/admin/galleries')
      } else {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        // Store the token in localStorage
        localStorage.setItem('adminToken', data.token)
        // Redirect to admin galleries
        router.push('/admin/galleries')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Login failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="admin-login">
        <div className="admin-login__container">
          <div className="admin-login__loading">
            <div className="admin-login__loading-spinner"></div>
            <p>Checking authentication...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        {/* Logo/Brand */}
        <div className="admin-login__header">
          <div className="admin-login__logo">
            <svg className="admin-login__logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="admin-login__title">Admin Access</h1>
          <p className="admin-login__subtitle">Enter your credentials to continue</p>
          
          {/* Back to Home Link */}
          <a href="/" className="admin-login__home-link">
            <svg className="admin-login__home-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </a>
        </div>

        {/* Login Form */}
        <div className="admin-login__form-container">
          <form onSubmit={handleLogin} className="admin-login__form">
            {/* Username Field */}
            <div className="admin-login__field">
              <label htmlFor="username" className="admin-login__label">
                Username
              </label>
              <div className="admin-login__input-wrapper">
                <div className="admin-login__input-icon">
                  <svg className="admin-login__input-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="admin-login__input"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="admin-login__field">
              <label htmlFor="password" className="admin-login__label">
                Password
              </label>
              <div className="admin-login__input-wrapper">
                <div className="admin-login__input-icon">
                  <svg className="admin-login__input-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-login__input"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="admin-login__error">
                <p className="admin-login__error-text">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="admin-login__submit"
            >
              {isLoading ? (
                <div className="admin-login__loading">
                  <svg className="admin-login__loading-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="admin-login__loading-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="admin-login__loading-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="admin-login__info">
            <p className="admin-login__info-text">
              Secure access to admin dashboard
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="admin-login__footer">
          <p className="admin-login__footer-text">
            © 2024 Bardo Admin. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
