"use client";

import { useState } from "react";

export default function TokenCarousel() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="token-carousel">
            <div
                className={`carousel-track ${isHovered ? "paused" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Only 5 items for shorter animation */}
                <div className="carousel-item">
                    {/* <img src="/assets/50b73f6c9dc6cde8ffeda28e7f0f2efcb9a88c60.png" alt="$Bardo" /> */}
                    <h1>BACARDO — Where Music, Meme Energy & Blockchain Collide</h1>
                </div>
                <div className="carousel-item">
                    {/* <img src="/assets/50b73f6c9dc6cde8ffeda28e7f0f2efcb9a88c60.png" alt="$Bardo" /> */}
                    <h1>BACARDO — Where Music, Meme Energy & Blockchain Collide</h1>
                </div>
                <div className="carousel-item">
                    <h1>BACARDO — Where Music, Meme Energy & Blockchain Collide</h1>
                </div>
                <div className="carousel-item">
                    <h1>BACARDO — Where Music, Meme Energy & Blockchain Collide</h1>
                </div>
            </div>
        </section>
    );
}
