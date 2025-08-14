import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import sharp from 'sharp'

interface ImageMetadata {
  [key: string]: {
    isPublic: boolean;
    uploadedAt: string;
  };
}

// Ensure uploads directory exists
const uploadsDir = join(process.cwd(), 'public', 'uploads')

// Image processing settings
const COMPRESSION_QUALITY = 80 // JPEG quality (0-100)
const MAX_WIDTH = 1920 // Maximum width in pixels
const MAX_HEIGHT = 1080 // Maximum height in pixels

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Ensure uploads directory exists
    await mkdir(uploadsDir, { recursive: true })

    const formData = await request.formData()
    const files = formData.getAll('images') as File[]
    const category = formData.get('category') as string || 'general'

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    // Check total storage limit (250MB)
    const maxStorage = 250 * 1024 * 1024; // 250MB in bytes
    
    // Calculate current storage usage
    try {
      const fs = require('fs').promises;
      const uploadsDir = join(process.cwd(), 'public', 'uploads');
      const existingFiles = await fs.readdir(uploadsDir);
      
      let currentStorage = 0;
      for (const fileName of existingFiles) {
        const filePath = join(uploadsDir, fileName);
        const stats = await fs.stat(filePath);
        currentStorage += stats.size;
      }
      
      // Calculate total size of files to be uploaded
      let uploadSize = 0;
      for (const file of files) {
        uploadSize += file.size;
      }
      
      if (currentStorage + uploadSize > maxStorage) {
        const currentMB = (currentStorage / 1024 / 1024).toFixed(2);
        const uploadMB = (uploadSize / 1024 / 1024).toFixed(2);
        const maxMB = (maxStorage / 1024 / 1024).toFixed(0);
        
        return NextResponse.json(
          { 
            error: 'Storage limit exceeded',
            details: {
              currentUsage: currentMB,
              uploadSize: uploadMB,
              maxStorage: maxMB
            }
          },
          { status: 413 }
        )
      }
    } catch (error) {
      console.warn('Could not check storage limit:', error);
      // Continue with upload if storage check fails
    }

    const uploadedImages = []

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        continue
      }

      // Check file size (2MB limit)
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        console.warn(`File ${file.name} exceeds 2MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB), skipping...`)
        continue
      }

      try {
        // Read file buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Process image based on file type
        let processedBuffer: Buffer = buffer
        let fileExtension = 'jpg'
        let shouldCompress = true
        
        // Check if file is GIF - preserve GIF format
        if (file.type === 'image/gif') {
          shouldCompress = false
          fileExtension = 'gif'
          console.log(`Preserving GIF format for ${file.name}`)
        }
        
        if (shouldCompress) {
          try {
            const image = sharp(buffer)
            const metadata = await image.metadata()
            
            // Resize if image is too large
            if (metadata.width && metadata.height) {
              if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
                image.resize(MAX_WIDTH, MAX_HEIGHT, {
                  fit: 'inside',
                  withoutEnlargement: true
                })
              }
            }

            // Compress image to JPEG
            const sharpBuffer = await image
              .jpeg({ quality: COMPRESSION_QUALITY })
              .toBuffer()
            processedBuffer = Buffer.from(sharpBuffer)

            console.log(`Compressed ${file.name}: ${(buffer.length / 1024 / 1024).toFixed(2)}MB → ${(processedBuffer.length / 1024 / 1024).toFixed(2)}MB`)
          } catch (compressionError) {
            console.warn(`Failed to compress ${file.name}, using original:`, compressionError)
            // If compression fails, use original buffer
            processedBuffer = buffer
          }
        }

        // Generate unique filename with correct extension
        const filename = `${uuidv4()}.${fileExtension}`
        const filepath = join(uploadsDir, filename)
        
        // Create metadata for the new image
        const imageId = filename.replace(/\.[^/.]+$/, '') // Remove file extension
        const metadataPath = join(uploadsDir, 'metadata.json')
        
        // Read existing metadata
        let metadata: ImageMetadata = {}
        try {
          const metadataContent = await readFile(metadataPath, 'utf-8')
          metadata = JSON.parse(metadataContent)
        } catch (error) {
          // Metadata file doesn't exist, create empty object
          metadata = {}
        }
        
        // Add new image metadata
        metadata[imageId] = {
          isPublic: false, // Default to private
          uploadedAt: new Date().toISOString()
        }
        
        // Write updated metadata
        await writeFile(metadataPath, JSON.stringify(metadata, null, 2))

        // Write processed file to disk
        await writeFile(filepath, processedBuffer)

        // Create image record
        const imageRecord = {
          id: uuidv4(),
          filename,
          originalName: file.name,
          path: `/uploads/${filename}`,
          size: processedBuffer.length, // Use processed size
          originalSize: buffer.length, // Keep track of original size
          uploadedAt: new Date().toISOString(),
          category,
          likes: 0
        }

        uploadedImages.push(imageRecord)
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError)
        continue
      }
    }

    if (uploadedImages.length === 0) {
      return NextResponse.json(
        { error: 'No valid images were uploaded' },
        { status: 400 }
      )
    }

    // Return success with uploaded images info
    return NextResponse.json({
      message: 'Images uploaded successfully',
      images: uploadedImages,
      processingStats: {
        totalOriginalSize: uploadedImages.reduce((acc, img) => acc + (img as any).originalSize, 0),
        totalProcessedSize: uploadedImages.reduce((acc, img) => acc + img.size, 0),
        compressionRatio: uploadedImages.length > 0 ? 
          ((uploadedImages.reduce((acc, img) => acc + (img as any).originalSize, 0) - 
            uploadedImages.reduce((acc, img) => acc + img.size, 0)) / 
            uploadedImages.reduce((acc, img) => acc + (img as any).originalSize, 0) * 100).toFixed(1) : '0'
      }
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    )
  }
}
