import { NextRequest, NextResponse } from 'next/server'
import { readdir, stat, readFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

interface ImageMetadata {
  [key: string]: {
    isPublic: boolean;
  };
}

const uploadsDir = join(process.cwd(), 'public', 'uploads')

export async function GET(request: NextRequest) {
  try {
    // Check if uploads directory exists
    try {
      await stat(uploadsDir)
    } catch {
      // Directory doesn't exist, return empty array
      return NextResponse.json({
        images: [],
        message: 'No uploads directory found'
      })
    }

    // Read all files from uploads directory
    const files = await readdir(uploadsDir)
    
    // Filter only image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    const imageFiles = files.filter(file => {
      const ext = file.toLowerCase()
      return imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
    })

    // Load metadata if exists
    let metadata: ImageMetadata = {}
    try {
      const metadataPath = join(uploadsDir, 'metadata.json')
      const metadataContent = await readFile(metadataPath, 'utf-8')
      metadata = JSON.parse(metadataContent)
    } catch (error) {
      // Metadata file doesn't exist, use empty object
      metadata = {}
    }

    // Get file information for each image
    const images = []
    for (const filename of imageFiles) {
      try {
        const filePath = join(uploadsDir, filename)
        const fileStats = await stat(filePath)
        
        // Extract original name from filename (remove UUID)
        const originalName = filename.includes('.') ? 
          filename.substring(filename.lastIndexOf('.') - 1) : 
          filename

        // Generate consistent ID based on filename
        const imageId = filename.replace(/\.[^/.]+$/, '') // Remove file extension
        
        const imageRecord = {
          id: imageId,
          filename,
          originalName: originalName || filename,
          path: `/uploads/${filename}`,
          size: fileStats.size,
          uploadedAt: fileStats.mtime.toISOString(),
          category: 'general', // Default category
          likes: 0,
          isPublic: metadata[imageId]?.isPublic || false
        }

        images.push(imageRecord)
      } catch (fileError) {
        console.warn(`Error reading file ${filename}:`, fileError)
        continue
      }
    }

    // Sort by upload date (newest first)
    images.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

    return NextResponse.json({
      images,
      total: images.length,
      message: `Found ${images.length} images in uploads directory`
    })

  } catch (error) {
    console.error('Gallery read error:', error)
    return NextResponse.json(
      { error: 'Failed to read gallery images' },
      { status: 500 }
    )
  }
}
