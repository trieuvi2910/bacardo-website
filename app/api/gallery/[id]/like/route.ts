import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // In a real app, you'd update the like count in a database
    // For now, we'll just return success

    return NextResponse.json({
      message: 'Image liked successfully',
      id,
      likes: 1 // This would be the new like count
    })

  } catch (error) {
    console.error('Like error:', error)
    return NextResponse.json(
      { error: 'Failed to like image' },
      { status: 500 }
    )
  }
}
