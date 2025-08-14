"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useRouter } from "next/navigation";

 interface UploadedImage {
     id: string;
     filename: string;
     originalName: string;
     path: string;
     size: number;
     uploadedAt: string;
     category: string;
     isPublic: boolean; // New field to control visibility on landing page
 }

export default function AdminGalleries() {
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("general");
    const [searchTerm, setSearchTerm] = useState("");
         const [selectedImages, setSelectedImages] = useState<string[]>([]);
     const [publicImages, setPublicImages] = useState<string[]>([]);
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [isLoading, setIsLoading] = useState(true);
     const [showUploadModal, setShowUploadModal] = useState(false);
    const router = useRouter();

    // Check authentication on component mount
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            router.push("/admin");
            return;
        }
        setIsAuthenticated(true);

        // Load existing images
        loadImages();
    }, [router]);

    const loadImages = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/gallery");
            if (response.ok) {
                const data = await response.json();
                setImages(data.images || []);
                console.log(`Loaded ${data.images?.length || 0} images from uploads directory`);
            }
        } catch (error) {
            console.error("Failed to load images:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        router.push("/admin");
    };

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

         const onDrop = useCallback((acceptedFiles: File[]) => {
         // Filter files by size (2MB limit)
         const maxSize = 2 * 1024 * 1024; // 2MB in bytes
         const validFiles = acceptedFiles.filter(file => file.size <= maxSize);
         const oversizedFiles = acceptedFiles.filter(file => file.size > maxSize);
         
         if (oversizedFiles.length > 0) {
             const oversizedNames = oversizedFiles.map(f => f.name).join(', ');
             alert(`The following files exceed the 2MB limit and will be skipped:\n${oversizedNames}`);
         }
         
         setSelectedFiles(validFiles);
     }, []);

         const handleUpload = async () => {
         if (selectedFiles.length === 0) return;
 
         // Check storage limit before upload
         const totalSize = images.reduce((acc, img) => acc + img.size, 0);
         const selectedFilesSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
         const totalAfterUpload = totalSize + selectedFilesSize;
         const maxStorage = 250 * 1024 * 1024; // 250MB in bytes
         
         if (totalAfterUpload > maxStorage) {
             const currentMB = (totalSize / 1024 / 1024).toFixed(2);
             const selectedMB = (selectedFilesSize / 1024 / 1024).toFixed(2);
             const maxMB = (maxStorage / 1024 / 1024).toFixed(0);
             
             alert(`Upload blocked! Storage limit exceeded.\n\nCurrent usage: ${currentMB}MB\nSelected files: ${selectedMB}MB\nStorage limit: ${maxMB}MB\n\nPlease delete some images or reduce file sizes.`);
             return;
         }
 
         setUploading(true);
         setUploadProgress(0);

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append("images", file);
        });
        formData.append("category", selectedCategory);

        try {
            const token = localStorage.getItem("adminToken");
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setImages((prev) => [...result.images, ...prev]);
                setUploadProgress(100);
                setSelectedFiles([]);

                // Show compression stats if available
                if (result.compressionStats) {
                    const { totalOriginalSize, totalCompressedSize, compressionRatio } = result.compressionStats;
                    const originalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
                    const compressedMB = (totalCompressedSize / 1024 / 1024).toFixed(2);
                    console.log(`Compression complete: ${originalMB}MB → ${compressedMB}MB (${compressionRatio}% reduction)`);
                }

                // Reset progress after a delay
                setTimeout(() => {
                    setUploadProgress(0);
                    setUploading(false);
                    // Close modal after successful upload
                    setShowUploadModal(false);
                }, 2000);
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setUploading(false);
            setUploadProgress(0);
        }
    };

         const { getRootProps, getInputProps, isDragActive } = useDropzone({
         onDrop,
         accept: {
             "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
         },
         multiple: true,
         maxSize: 2 * 1024 * 1024, // 2MB limit
         onDropRejected: (rejectedFiles) => {
             const oversizedFiles = rejectedFiles.filter(rejection => 
                 rejection.errors.some(error => error.code === 'file-too-large')
             );
             
             if (oversizedFiles.length > 0) {
                 const oversizedNames = oversizedFiles.map(f => f.file.name).join(', ');
                 alert(`The following files exceed the 2MB limit and were rejected:\n${oversizedNames}`);
             }
         }
     });

    const handleDeleteSelected = async () => {
        if (selectedImages.length === 0) return;

        if (!confirm(`Are you sure you want to delete ${selectedImages.length} images?`)) return;

        try {
            const token = localStorage.getItem("adminToken");

            // Get the actual image objects for deletion
            const imagesToDelete = images.filter((img) => selectedImages.includes(img.id));

            const deletePromises = imagesToDelete.map((image) =>
                fetch("/api/gallery/delete", {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ filename: image.filename }),
                })
            );

            const results = await Promise.allSettled(deletePromises);

            // Check results and remove successfully deleted images
            const successfulDeletions = results.filter((result) => result.status === "fulfilled" && result.value.ok).length;

            if (successfulDeletions > 0) {
                setImages((prev) => prev.filter((img) => !selectedImages.includes(img.id)));
                setSelectedImages([]);
                console.log(`Successfully deleted ${successfulDeletions} images`);
            }

            if (successfulDeletions < imagesToDelete.length) {
                alert(`Deleted ${successfulDeletions} of ${imagesToDelete.length} images. Some deletions may have failed.`);
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete selected images. Please try again.");
        }
    };

         const handleDeleteImage = async (image: UploadedImage) => {
         if (!confirm(`Are you sure you want to delete "${image.originalName}"?`)) return;
 
         try {
             const token = localStorage.getItem("adminToken");
             const response = await fetch("/api/gallery/delete", {
                 method: "DELETE",
                 headers: {
                     Authorization: `Bearer ${token}`,
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify({ filename: image.filename }),
             });
 
             if (response.ok) {
                 // Remove image from state
                 setImages((prev) => prev.filter((img) => img.id !== image.id));
                 setSelectedImages((prev) => prev.filter((id) => id !== image.id));
 
                 console.log(`Successfully deleted: ${image.filename}`);
             } else {
                 const errorData = await response.json();
                 console.error("Delete failed:", errorData.error);
                 alert(`Failed to delete image: ${errorData.error}`);
             }
         } catch (error) {
             console.error("Delete error:", error);
             alert("Failed to delete image. Please try again.");
         }
     };
 
     const handleDeleteAllFiltered = async () => {
         try {
             const token = localStorage.getItem("adminToken");
             
             // Get all currently filtered images
             const imagesToDelete = filteredImages;
             
             if (imagesToDelete.length === 0) return;
             
             const deletePromises = imagesToDelete.map(image =>
                 fetch("/api/gallery/delete", {
                     method: "DELETE",
                     headers: {
                         Authorization: `Bearer ${token}`,
                         "Content-Type": "application/json",
                     },
                     body: JSON.stringify({ filename: image.filename }),
                 })
             );
             
             const results = await Promise.allSettled(deletePromises);
             
             // Check results and remove successfully deleted images
             const successfulDeletions = results.filter(result => 
                 result.status === "fulfilled" && result.value.ok
             ).length;
             
             if (successfulDeletions > 0) {
                 // Remove all deleted images from state
                 const deletedIds = imagesToDelete.map(img => img.id);
                 setImages(prev => prev.filter(img => !deletedIds.includes(img.id)));
                 setSelectedImages(prev => prev.filter(id => !deletedIds.includes(id)));
                 
                 console.log(`Successfully deleted ${successfulDeletions} images`);
                 
                 if (successfulDeletions < imagesToDelete.length) {
                     alert(`Deleted ${successfulDeletions} of ${imagesToDelete.length} images. Some deletions may have failed.`);
                 } else {
                     alert(`Successfully deleted all ${successfulDeletions} images!`);
                 }
             }
         } catch (error) {
             console.error("Delete all error:", error);
             alert("Failed to delete images. Please try again.");
         }
     };

         const toggleImageSelection = (imageId: string) => {
         setSelectedImages((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]));
     };
 
     const togglePublicImage = async (image: UploadedImage) => {
         try {
             const token = localStorage.getItem("adminToken");
             const response = await fetch(`/api/gallery/${image.id}/toggle-public`, {
                 method: "PATCH",
                 headers: {
                     Authorization: `Bearer ${token}`,
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify({ isPublic: !image.isPublic }),
             });
 
             if (response.ok) {
                 // Update local state
                 setImages(prev => prev.map(img => 
                     img.id === image.id 
                         ? { ...img, isPublic: !img.isPublic }
                         : img
                 ));
                 
                 // Update public images list
                 setPublicImages(prev => {
                     if (image.isPublic) {
                         return prev.filter(id => id !== image.id);
                     } else {
                         return prev.includes(image.id) ? prev : [...prev, image.id];
                     }
                 });
                 
                 console.log(`Image ${image.originalName} ${image.isPublic ? 'hidden from' : 'made visible on'} landing page`);
             } else {
                 const errorData = await response.json();
                 console.error("Toggle public failed:", errorData.error);
                 alert(`Failed to update image visibility: ${errorData.error}`);
             }
         } catch (error) {
             console.error("Toggle public error:", error);
             alert("Failed to update image visibility. Please try again.");
         }
     };

    const filteredImages = images.filter(
        (image) =>
            image.originalName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === "all" || image.category === selectedCategory)
    );

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-galleries">
            <div className="admin-galleries__container">
                {/* Header with Logout */}
                <div className="admin-galleries__header">
                    <div className="admin-galleries__header-content">
                        <h1 className="admin-galleries__title">Image Galleries</h1>
                        <p className="admin-galleries__subtitle">Manage and organize your image collection</p>

                        {/* Back to Home Link */}
                        <a href="/" className="admin-galleries__home-link">
                            <svg className="admin-galleries__home-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Back to Home
                        </a>
                    </div>
                    <button onClick={handleLogout} className="admin-galleries__logout">
                        Logout
                    </button>
                </div>

                                 {/* Gallery Management */}
                 <div className="admin-galleries__gallery-section">
                     {/* Storage Warning */}
                     <div className="admin-galleries__storage-warning">
                         <div className="admin-galleries__storage-warning-icon">
                             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                             </svg>
                         </div>
                         <div className="admin-galleries__storage-warning-content">
                             <span className="admin-galleries__storage-warning-title">Storage Limit</span>
                             <span className="admin-galleries__storage-warning-text">
                                 Total storage limit: 250MB | Current usage: {(() => {
                                     const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                     const totalMB = (totalSize / 1024 / 1024).toFixed(2);
                                     return `${totalMB}MB`;
                                 })()}
                             </span>
                         </div>
                     </div>
                     
                     <div className="admin-galleries__gallery-header">
                         <h2 className="admin-galleries__section-title">All Images</h2>

                        <div className="admin-galleries__gallery-controls">
                            <input
                                type="text"
                                placeholder="Search images..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="admin-galleries__search"
                            />

                            <button onClick={() => setShowUploadModal(true)} className="admin-galleries__upload-btn">
                                <svg className="admin-galleries__upload-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Upload Images
                            </button>

                                                         {selectedImages.length > 0 && (
                                 <button onClick={handleDeleteSelected} className="admin-galleries__delete-selected">
                                     <svg className="admin-galleries__delete-selected-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                     </svg>
                                     Delete Selected ({selectedImages.length})
                                 </button>
                             )}
                             
                             {filteredImages.length > 0 && (
                                 <button 
                                     onClick={() => {
                                         if (confirm(`Are you sure you want to delete ALL ${filteredImages.length} images currently displayed? This action cannot be undone.`)) {
                                             handleDeleteAllFiltered();
                                         }
                                     }} 
                                     className="admin-galleries__delete-all-btn"
                                     title="Delete all currently displayed images"
                                 >
                                     <svg className="admin-galleries__delete-all-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                     </svg>
                                     Delete All ({filteredImages.length})
                                 </button>
                             )}
                        </div>
                    </div>

                    {/* Images Grid */}
                    {isLoading ? (
                        <div className="admin-galleries__loading">
                            <div className="admin-galleries__loading-spinner"></div>
                            <p>Loading images...</p>
                        </div>
                    ) : filteredImages.length > 0 ? (
                        <div className="admin-galleries__grid">
                            {filteredImages.map((image) => (
                                <div key={image.id} className="admin-galleries__item">
                                    <div className="admin-galleries__item-image-container">
                                        <input
                                            type="checkbox"
                                            checked={selectedImages.includes(image.id)}
                                            onChange={() => toggleImageSelection(image.id)}
                                            className="admin-galleries__item-checkbox"
                                        />

                                        <Image src={image.path} alt={image.originalName} fill className="admin-galleries__item-image" />

                                                                                 <div className="admin-galleries__item-overlay">
                                             <div className="admin-galleries__item-actions">
                                                 <button
                                                     onClick={() => togglePublicImage(image)}
                                                     className={`admin-galleries__item-action admin-galleries__item-action--public ${image.isPublic ? 'admin-galleries__item-action--public-active' : ''}`}
                                                     title={image.isPublic ? "Hide from landing page" : "Show on landing page"}
                                                 >
                                                     <svg
                                                         className="admin-galleries__item-action-icon"
                                                         fill="none"
                                                         stroke="currentColor"
                                                         viewBox="0 0 24 24"
                                                     >
                                                         <path
                                                             strokeLinecap="round"
                                                             strokeLinejoin="round"
                                                             strokeWidth={2}
                                                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                         />
                                                         <path
                                                             strokeLinecap="round"
                                                             strokeLinejoin="round"
                                                             strokeWidth={2}
                                                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                         />
                                                     </svg>
                                                 </button>
                                                 <button
                                                     onClick={() => handleDeleteImage(image)}
                                                     className="admin-galleries__item-action admin-galleries__item-action--delete"
                                                     title="Delete"
                                                 >
                                                     <svg
                                                         className="admin-galleries__item-action-icon"
                                                         fill="none"
                                                         stroke="currentColor"
                                                         viewBox="0 0 24 24"
                                                     >
                                                         <path
                                                             strokeLinecap="round"
                                                             strokeLinejoin="round"
                                                             strokeWidth={2}
                                                             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                         />
                                                     </svg>
                                                 </button>
                                             </div>
                                         </div>
                                    </div>

                                                                         <div className="admin-galleries__item-info">
                                         <div className="admin-galleries__item-header">
                                             <p className="admin-galleries__item-name">{image.originalName}</p>
                                             {image.isPublic && (
                                                 <span className="admin-galleries__item-public-badge">
                                                     <svg className="admin-galleries__item-public-badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                     </svg>
                                                     Public
                                                 </span>
                                             )}
                                         </div>
                                         <div className="admin-galleries__item-meta">
                                             <span className="admin-galleries__item-category">{image.category}</span>
                                             <span className="admin-galleries__item-size">
                                                 {image.size > 1024 * 1024
                                                     ? `${(image.size / 1024 / 1024).toFixed(2)} MB`
                                                     : `${Math.round(image.size / 1024)} KB`}
                                             </span>
                                         </div>
                                         <p className="admin-galleries__item-date">{new Date(image.uploadedAt).toLocaleDateString()}</p>
                                         <p className="admin-galleries__item-filename">{image.filename}</p>
                                     </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="admin-galleries__empty">
                            <p className="admin-galleries__empty-text">No images found</p>
                            <p className="admin-galleries__empty-subtext">Upload some images to get started</p>
                        </div>
                    )}

                    {/* Gallery Stats */}
                    <div className="admin-galleries__stats">
                        <div className="admin-galleries__stats-content">
                            <span className="admin-galleries__stats-count">
                                {filteredImages.length} of {images.length} images
                            </span>
                            <span className="admin-galleries__stats-size">
                                {(() => {
                                    const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                    return totalSize > 1024 * 1024
                                        ? `${(totalSize / 1024 / 1024).toFixed(2)} MB total`
                                        : `${Math.round(totalSize / 1024)} KB total`;
                                })()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="admin-galleries__modal-overlay" onClick={() => setShowUploadModal(false)}>
                    <div className="admin-galleries__modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-galleries__modal-header">
                            <h3 className="admin-galleries__modal-title">Upload New Images</h3>
                            <button onClick={() => setShowUploadModal(false)} className="admin-galleries__modal-close">
                                ×
                            </button>
                        </div>

                                                 <div className="admin-galleries__modal-content">
                             {/* Storage Warning in Modal */}
                             <div className={`admin-galleries__modal-storage-warning ${(() => {
                                 const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                 const totalMB = totalSize / 1024 / 1024;
                                 return totalMB > 200 ? 'admin-galleries__modal-storage-warning--critical' : '';
                             })()}`}>
                                 <div className="admin-galleries__modal-storage-warning-icon">
                                     <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                     </svg>
                                 </div>
                                 <div className="admin-galleries__modal-storage-warning-content">
                                     <span className="admin-galleries__modal-storage-warning-title">Storage Limit</span>
                                     <span className="admin-galleries__modal-storage-warning-text">
                                         Total storage limit: 250MB | Current usage: {(() => {
                                             const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                             const totalMB = (totalSize / 1024 / 1024).toFixed(2);
                                             return `${totalMB}MB`;
                                         })()}
                                         {(() => {
                                             const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                             const totalMB = totalSize / 1024 / 1024;
                                             if (totalMB > 200) {
                                                 return ' | ⚠️ Storage nearly full!';
                                             }
                                             return '';
                                         })()}
                                     </span>
                                 </div>
                             </div>
                             
                             {/* Dropzone */}
                            <div
                                {...getRootProps()}
                                className={`admin-galleries__dropzone ${isDragActive ? "admin-galleries__dropzone--active" : ""} ${(() => {
                                    const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                    const maxStorage = 250 * 1024 * 1024; // 250MB
                                    return totalSize >= maxStorage ? 'admin-galleries__dropzone--disabled' : '';
                                })()}`}
                                style={{
                                    pointerEvents: (() => {
                                        const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                        const maxStorage = 250 * 1024 * 1024; // 250MB
                                        return totalSize >= maxStorage ? 'none' : 'auto';
                                    })()
                                }}
                            >
                                <input {...getInputProps()} />
                                <div className="admin-galleries__dropzone-icon">
                                    <svg
                                        className="admin-galleries__dropzone-icon-svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                </div>
                                                                 <h3 className="admin-galleries__dropzone-title">
                                     {(() => {
                                         const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                         const maxStorage = 250 * 1024 * 1024; // 250MB
                                         if (totalSize >= maxStorage) {
                                             return "Storage Full - Upload Disabled";
                                         }
                                         return isDragActive ? "Drop images here" : "Drag & drop images here";
                                     })()}
                                 </h3>
                                 <p className="admin-galleries__dropzone-text">
                                     {(() => {
                                         const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                         const maxStorage = 250 * 1024 * 1024; // 250MB
                                         if (totalSize >= maxStorage) {
                                             return "Storage limit reached. Please delete some images to continue uploading.";
                                         }
                                         return "or click to browse files";
                                     })()}
                                 </p>
                                 <p className="admin-galleries__dropzone-limit">
                                     Maximum file size: 2MB
                                 </p>
                                <button 
                                    className="admin-galleries__dropzone-button"
                                    disabled={(() => {
                                        const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                        const maxStorage = 250 * 1024 * 1024; // 250MB
                                        return totalSize >= maxStorage;
                                    })()}
                                >
                                    {(() => {
                                        const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                        const maxStorage = 250 * 1024 * 1024; // 250MB
                                        if (totalSize >= maxStorage) {
                                            return "Storage Full";
                                        }
                                        return "Choose Files";
                                    })()}
                                </button>
                            </div>

                                                         {/* Selected Files Display */}
                             {selectedFiles.length > 0 && (
                                 <div className="admin-galleries__selected-files">
                                     <div className="admin-galleries__selected-files-header">
                                         <h4 className="admin-galleries__selected-files-title">Selected Files ({selectedFiles.length}):</h4>
                                         <button
                                             onClick={() => {
                                                 if (confirm(`Are you sure you want to remove all ${selectedFiles.length} selected files?`)) {
                                                     setSelectedFiles([]);
                                                 }
                                             }}
                                             className="admin-galleries__remove-all-files-btn"
                                             title="Remove all selected files"
                                         >
                                             <svg className="admin-galleries__remove-all-files-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                             </svg>
                                             Remove All
                                         </button>
                                     </div>
                                     <div className="admin-galleries__files-list">
                                         {selectedFiles.map((file, index) => (
                                             <div key={index} className="admin-galleries__file-item">
                                                 {/* File Thumbnail */}
                                                 <div className="admin-galleries__file-thumbnail">
                                                     <img
                                                         src={URL.createObjectURL(file)}
                                                         alt={file.name}
                                                         className="admin-galleries__file-thumbnail-img"
                                                     />
                                                 </div>
 
                                                 {/* File Info */}
                                                 <div className="admin-galleries__file-info">
                                                     <span className="admin-galleries__file-name">{file.name}</span>
                                                     <span className="admin-galleries__file-size">
                                                         {(file.size / 1024 / 1024).toFixed(2)} MB
                                                     </span>
                                                 </div>
 
                                                 {/* Remove Button */}
                                                 <button
                                                     onClick={() => setSelectedFiles((prev) => prev.filter((_, i) => i !== index))}
                                                     className="admin-galleries__file-remove"
                                                 >
                                                     ×
                                                 </button>
                                             </div>
                                         ))}
                                     </div>
 
                                     {/* Upload Button */}
                                     <button 
                                         onClick={handleUpload} 
                                         disabled={uploading || (() => {
                                             const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                             const maxStorage = 250 * 1024 * 1024; // 250MB
                                             return totalSize >= maxStorage;
                                         })()} 
                                         className="admin-galleries__upload-button"
                                     >
                                         {uploading
                                             ? "Uploading..."
                                             : (() => {
                                                 const totalSize = images.reduce((acc, img) => acc + img.size, 0);
                                                 const maxStorage = 250 * 1024 * 1024; // 250MB
                                                 if (totalSize >= maxStorage) {
                                                     return "Storage Full - Cannot Upload";
                                                 }
                                                 return `Upload ${selectedFiles.length} Image${selectedFiles.length > 1 ? "s" : ""}`;
                                             })()}
                                     </button>
                                 </div>
                             )}

                            {/* Upload Progress */}
                            {uploading && (
                                <div className="admin-galleries__progress">
                                    <div className="admin-galleries__progress-bar">
                                        <div className="admin-galleries__progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                                    </div>
                                    <p className="admin-galleries__progress-text">
                                        {uploadProgress === 100 ? "Upload complete!" : "Uploading..."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
