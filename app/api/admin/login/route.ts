import { NextRequest, NextResponse } from 'next/server'

// Simple admin credentials (in production, use environment variables and proper hashing)
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'bardo2025'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      
      return NextResponse.json({
        success: true,
        token,
        message: 'Login successful'
      })
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
