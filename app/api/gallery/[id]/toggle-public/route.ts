import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

interface ImageMetadata {
  [key: string]: {
    isPublic: boolean;
    uploadedAt: string;
  };
}

// Path to the metadata file
const metadataPath = join(process.cwd(), 'public', 'uploads', 'metadata.json')

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { id } = params
    const { isPublic } = await request.json()

    // Read existing metadata
    let metadata: ImageMetadata = {}
    try {
      const metadataContent = await readFile(metadataPath, 'utf-8')
      metadata = JSON.parse(metadataContent)
    } catch (error) {
      // If metadata file doesn't exist, create empty metadata
      metadata = {}
    }

    // Update the image's public status
    if (metadata[id]) {
      metadata[id].isPublic = isPublic
    } else {
      metadata[id] = { 
        isPublic, 
        uploadedAt: new Date().toISOString() 
      }
    }

    // Write updated metadata back to file
    await writeFile(metadataPath, JSON.stringify(metadata, null, 2))

    return NextResponse.json({ 
      success: true, 
      message: `Image ${isPublic ? 'made public' : 'hidden from'} landing page` 
    })

  } catch (error) {
    console.error('Toggle public error:', error)
    return NextResponse.json(
      { error: 'Failed to update image visibility' },
      { status: 500 }
    )
  }
}
