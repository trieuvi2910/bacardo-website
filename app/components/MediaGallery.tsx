"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryImage {
    id: string;
    filename: string;
    originalName: string;
    path: string;
    size: number;
    uploadedAt: string;
    likes: number;
    category: string;
    isPublic: boolean;
}

// Default images as fallback
const defaultImages = [
    { id: "default-1", path: "/assets/5a4b957fe066711a1db5c40e4ba2d3667c9f9cb0.jpg", alt: "Gallery 1" },
    { id: "default-2", path: "/assets/219cda2d9ae5093b7f5be1e7430c112ee150ae16.jpg", alt: "Gallery 2" },
    { id: "default-3", path: "/assets/92247952bbe607479bbc9e6484c314c05d0ef329.jpg", alt: "Gallery 3" },
    { id: "default-4", path: "/assets/bb2683dc01c227c8c4cd8cfa0ea8dab0b9feb4ed.jpg", alt: "Gallery 4" },
    { id: "default-5", path: "/assets/7471492af7eab1e6f553902e9f75d3d6cf340202.jpg", alt: "Gallery 5" },
];

export default function MediaGallery() {
    const [publicImages, setPublicImages] = useState<GalleryImage[]>([]);
    const [allPublicImages, setAllPublicImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoadingAll, setIsLoadingAll] = useState(false);

    useEffect(() => {
        const fetchPublicImages = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/api/gallery/public");

                if (response.ok) {
                    const data = await response.json();
                    setPublicImages(data.images || []);
                } else {
                    console.warn("Failed to fetch public images, using defaults");
                    setPublicImages([]);
                }
            } catch (error) {
                console.error("Error fetching public images:", error);
                setError("Failed to load gallery images");
                setPublicImages([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublicImages();
    }, []);

    // Function to fetch all public images for modal
    const fetchAllPublicImages = async () => {
        try {
            setIsLoadingAll(true);
            const response = await fetch("/api/gallery/public/all");

            if (response.ok) {
                const data = await response.json();
                setAllPublicImages(data.images || []);
                console.log(`Fetched ${data.images?.length || 0} public images for modal`);
            } else {
                console.warn("Failed to fetch all public images");
                setAllPublicImages([]);
            }
        } catch (error) {
            console.error("Error fetching all public images:", error);
            setAllPublicImages([]);
        } finally {
            setIsLoadingAll(false);
        }
    };

    // Function to open modal and fetch all images
    const handleSeeMore = async () => {
        setShowModal(true);
        await fetchAllPublicImages();
    };

    // Function to close modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Combine public images with default images to ensure we have 5 images
    const displayImages = [...publicImages];

    // Fill remaining slots with default images
    while (displayImages.length < 5) {
        const defaultIndex = displayImages.length;
        if (defaultIndex < defaultImages.length) {
            displayImages.push({
                id: defaultImages[defaultIndex].id,
                filename: `default-${defaultIndex + 1}`,
                originalName: defaultImages[defaultIndex].alt,
                path: defaultImages[defaultIndex].path,
                size: 0,
                uploadedAt: new Date().toISOString(),
                likes: 0,
                category: "default",
                isPublic: false,
            });
        }
    }

    // Take only the first 5 images
    const finalImages = displayImages.slice(0, 5);

    return (
        <section id="media" className="media-gallery">
            <h2>MEDIA GALLERY</h2>
            <div className="gallery-container">
                {isLoading ? (
                    <div className="gallery-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading gallery...</p>
                    </div>
                ) : error ? (
                    <div className="gallery-error">
                        <p>{error}</p>
                        <p>Using default images</p>
                    </div>
                ) : null}

                <div className="gallery-grid">
                    {/* Show 4 latest public images (or default images if not enough) */}
                    {finalImages.slice(0, 4).map((image, index) => (
                        <div key={image.id} className="gallery-item">
                            <img src={image.path} alt={image.originalName || `Gallery ${index + 1}`} loading="lazy" />
                        </div>
                    ))}
                </div>

                {/* Video Review Section - Show 1st latest public image */}
                <div className="video-review">
                    <div className="video-preview">
                        <img
                            src={finalImages[0]?.path || "/assets/7471492af7eab1e6f553902e9f75d3d6cf340202.jpg"}
                            alt={finalImages[0]?.originalName || "Video Review"}
                            className="video-thumb"
                        />
                        <img
                            src={finalImages[0]?.path || "/assets/7471492af7eab1e6f553902e9f75d3d6cf340202.jpg"}
                            alt={finalImages[0]?.originalName || "Video Playing"}
                            className="video-gif"
                        />
                        <div className="video-overlay">
                            <div className="play-icon">
                                <img src="/assets/ff43db10dfb17fe74f3b78d39d4157aadff69942.svg" alt="Play" className="play-svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="gallery-footer">
                <button className="btn btn-gradient" onClick={handleSeeMore}>
                    SEE MORE
                </button>
            </div>

            {/* Gallery Modal */}
            {showModal && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }}
                    onClick={handleCloseModal}
                >
                    <div 
                        style={{
                            background: '#0f0a28',
                            borderRadius: '20px',
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div style={{
                            padding: '20px 30px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: 'rgba(0, 0, 0, 0.2)'
                        }}>
                            <p style={{
                                color: '#cbd5e1',
                                margin: 0,
                                fontSize: '14px'
                            }}>
                                Showing {allPublicImages.length} public images
                            </p>
                            <button 
                                onClick={handleCloseModal}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#cbd5e1',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div style={{
                            padding: '30px',
                            height: 'calc(100vh - 120px)',
                            overflowY: 'auto',
                            flex: 1,
                            maxHeight: 'calc(100vh - 170px)',
                            overflowX: 'hidden',
                            marginBottom: '30px'
                        }}>
                            {isLoadingAll ? (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '60px 20px',
                                    color: '#cbd5e1'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        border: '4px solid rgba(79, 0, 224, 0.2)',
                                        borderTop: '4px solid #8f00ff',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite',
                                        marginBottom: '20px'
                                    }}></div>
                                    <p>Loading all images...</p>
                                </div>
                            ) : allPublicImages.length === 0 ? (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '60px 20px',
                                    color: '#cbd5e1'
                                }}>
                                    <p style={{
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        marginBottom: '10px'
                                    }}>No public images found</p>
                                    <p style={{
                                        fontSize: '14px',
                                        opacity: '0.7'
                                    }}>Images will appear here once they are marked as public in the admin panel</p>
                                </div>
                            ) : (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                    gap: '25px',
                                    padding: '10px'
                                }}>
                                    {allPublicImages.map((image) => (
                                        <div key={image.id} style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: '15px',
                                            overflow: 'hidden',
                                            transition: 'all 0.3s ease',
                                            border: '1px solid rgba(79, 0, 224, 0.2)'
                                        }}>
                                            <img 
                                                src={image.path} 
                                                alt={image.originalName || image.filename} 
                                                loading="lazy"
                                                style={{
                                                    width: '100%',
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                    display: 'block'
                                                }}
                                            />
                                            <div style={{ padding: '15px' }}>
                                                <p style={{
                                                    color: '#f8f8ff',
                                                    fontWeight: '600',
                                                    margin: '0 0 8px 0',
                                                    fontSize: '14px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {image.originalName || image.filename}
                                                </p>
                                                <p style={{
                                                    color: '#00ffff',
                                                    fontSize: '13px',
                                                    margin: 0,
                                                    opacity: '0.9',
                                                    fontWeight: '500'
                                                }}>
                                                    {new Date(image.uploadedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
}
