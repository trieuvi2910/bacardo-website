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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                <button className="btn btn-gradient">SEE MORE</button>
            </div>
        </section>
    );
}
