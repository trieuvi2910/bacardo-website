'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface UploadedImage {
  id: string
  filename: string
  originalName: string
  path: string
  size: number
  uploadedAt: string
  category: string
}

export default function AdminDashboard() {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)
    
    // Load existing images
    loadImages()
  }, [router])

  const loadImages = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (response.ok) {
        const data = await response.json()
        setImages(data.images || [])
      }
    } catch (error) {
      console.error('Failed to load images:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin')
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    acceptedFiles.forEach(file => {
      formData.append('images', file)
    })
    formData.append('category', selectedCategory)

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setImages(prev => [...result.images, ...prev])
        setUploadProgress(100)
        
        // Reset progress after a delay
        setTimeout(() => {
          setUploadProgress(0)
          setUploading(false)
        }, 2000)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploading(false)
      setUploadProgress(0)
    }
  }, [selectedCategory])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  })

  const handleDeleteSelected = async () => {
    if (selectedImages.length === 0) return
    
    if (!confirm(`Are you sure you want to delete ${selectedImages.length} images?`)) return

    try {
      const token = localStorage.getItem('adminToken')
      const deletePromises = selectedImages.map(id =>
        fetch(`/api/gallery/${id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      )
      
      await Promise.all(deletePromises)
      
      setImages(prev => prev.filter(img => !selectedImages.includes(img.id)))
      setSelectedImages([])
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/gallery/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        setImages(prev => prev.filter(img => img.id !== imageId))
        setSelectedImages(prev => prev.filter(id => id !== imageId))
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
  }

  const filteredImages = images.filter(image =>
    image.originalName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || image.category === selectedCategory)
  )

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Admin Dashboard
            </h1>
            <p className="text-text-secondary text-lg">
              Manage your gallery and upload new images
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
          >
            Logout
          </button>
        </div>

        {/* Upload Section */}
        <div className="bg-bg-card rounded-2xl p-8 mb-8 border border-secondary/20">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Upload Images</h2>
          
          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-text-primary mb-2">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-bg-primary border border-secondary/20 rounded-lg text-text-primary focus:outline-none focus:border-primary"
            >
              <option value="general">General</option>
              <option value="events">Events</option>
              <option value="team">Team</option>
              <option value="products">Products</option>
              <option value="artwork">Artwork</option>
            </select>
          </div>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`upload-area ${isDragActive ? 'dragover' : ''} ${uploading ? 'pointer-events-none' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="upload-icon">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
            </h3>
            <p className="text-text-secondary mb-4">
              or click to browse files
            </p>
            <button className="btn-gradient">
              Choose Files
            </button>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mt-6">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-center text-text-secondary mt-2">
                {uploadProgress === 100 ? 'Upload complete!' : 'Uploading...'}
              </p>
            </div>
          )}
        </div>

        {/* Gallery Management */}
        <div className="bg-bg-card rounded-2xl p-8 border border-secondary/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-text-primary">Gallery Images</h2>
            
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-bg-primary border border-secondary/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary"
              />
              
              {selectedImages.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Selected ({selectedImages.length})
                </button>
              )}
            </div>
          </div>

          {/* Images Grid */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div key={image.id} className="gallery-item group">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => toggleImageSelection(image.id)}
                      className="absolute top-2 left-2 z-10 w-5 h-5"
                    />
                    
                    <Image
                      src={image.path}
                      alt={image.originalName}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    <div className="gallery-item-overlay">
                      <div className="gallery-item-actions">
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="action-btn"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-text-primary font-medium truncate">{image.originalName}</p>
                    <div className="flex items-center justify-between text-sm text-text-secondary">
                      <span className="capitalize">{image.category}</span>
                      <span>{Math.round(image.size / 1024)} KB</span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      {new Date(image.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary text-xl">No images found</p>
              <p className="text-text-secondary mt-2">Upload some images to get started</p>
            </div>
          )}

          {/* Gallery Stats */}
          <div className="mt-8 pt-6 border-t border-secondary/20">
            <div className="flex flex-col md:flex-row justify-between items-center text-text-secondary">
              <span>{filteredImages.length} images</span>
              <span>{Math.round(images.reduce((acc, img) => acc + img.size, 0) / 1024 / 1024)} MB total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
