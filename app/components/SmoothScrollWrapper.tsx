"use client";

import { useEffect, useState } from "react";
import { Link, Element, Events, scrollSpy, scroller } from "react-scroll";

interface SmoothScrollWrapperProps {
    children: React.ReactNode;
}

export default function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
    const [currentSection, setCurrentSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    // Sections that should use smooth scroll (excluding roadmap and footer)
    const smoothScrollSections = ["hero", "how-to-buy", "token", "tokenomics", "music", "media"];

    useEffect(() => {
        // Initialize react-scroll
        scrollSpy.update();

        // Listen for scroll events to update current section
        Events.scrollEvent.register("begin", () => {
            // Scroll animation started
        });

        Events.scrollEvent.register("end", () => {
            // Scroll animation ended
        });

        // Cleanup
        return () => {
            Events.scrollEvent.remove("begin");
            Events.scrollEvent.remove("end");
        };
    }, []);

    useEffect(() => {
        const handleWheel = (e: any) => {
            if (isScrolling) return; // tránh spam cuộn khi animation chưa xong

            if (e.deltaY > 0 && currentSection < smoothScrollSections.length - 1) {
                // Scroll xuống
                goToSection(currentSection + 1);
            } else if (e.deltaY < 0 && currentSection > 0) {
                // Scroll lên
                goToSection(currentSection - 1);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [currentSection, isScrolling]);

    const goToSection = (index: number) => {
        setIsScrolling(true);
        setCurrentSection(index);
        scroller.scrollTo(smoothScrollSections[index], {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
        setTimeout(() => setIsScrolling(false), 900); // cho animation kết thúc
    };

    // Function to handle section dot clicks
    const handleSectionClick = (sectionIndex: number) => {
        setCurrentSection(sectionIndex);
    };

    return (
        <div className="smooth-scroll-wrapper">
            {children}

            {/* Section Indicator */}
            <div className="section-indicator">
                {smoothScrollSections.map((section, index) => (
                    <Link
                        key={section}
                        to={section}
                        spy={true}
                        smooth={true}
                        duration={1000}
                        offset={-100}
                        onSetActive={() => setCurrentSection(index)}
                        className={`section-dot ${index === currentSection ? "active" : ""}`}
                        onClick={() => handleSectionClick(index)}
                    />
                ))}
            </div>

            <style jsx>{`
                .smooth-scroll-wrapper {
                    position: relative;
                    overflow-x: hidden;
                }

                .section-indicator {
                    position: fixed;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .section-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                    display: block;
                    text-decoration: none;
                }

                .section-dot:hover {
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(1.2);
                }

                .section-dot.active {
                    background: #8f00ff;
                    border-color: #ffffff;
                    box-shadow: 0 0 10px rgba(143, 0, 255, 0.5);
                }

                /* Hide scrollbar for smooth scroll sections */
                .smooth-scroll-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .smooth-scroll-wrapper {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
            `}</style>
        </div>
    );
}
