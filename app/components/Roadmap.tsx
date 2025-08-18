"use client";

import { useState } from "react";

const phases = [
    {
        title: "Phase I: Rock in the Trenches",
        description: "Rockstar on the stage, trenches rocking galore",
        image: "/assets/5a4b957fe066711a1db5c40e4ba2d3667c9f9cb0.jpg",
        show: false,
        id: 1,
    },
    {
        title: "Phase II: Rockstar Parade in the Meme Jungle",
        description: "Rockstar Parade in the Meme Jungle where coins roar",
        image: "/assets/0d7375af251c815ef8d6ebe2e18dc03c5cf39514.jpg",
        show: false,
        id: 2,
    },

    {
        title: "Phase III: Rock to Blockchain Rhythm",
        description: "Nakamoto Beats got the Meme Jungle rocking to blockchain rhythm",
        image: "/assets/3f1e7c13543072cd50d33b41c14d8605600f84f1.jpg",
        show: false,
        id: 3,
    },

    {
        title: "Phase IV: Rock to Decentralize Skies",
        description: "Rockstar Parade & meme energy powering rockets across decentralized skies",
        image: "/assets/7fb401847b5d29630c1b3f29fc114a8b1be0c9ab.jpg",
        show: false,
        id: 4,
    },
];

export default function Roadmap() {
    const [expandedPhase, setExpandedPhase] = useState(phases);

    const handlePhaseClick = (phase: number) => {
        setExpandedPhase(expandedPhase.map((p) => ({ ...p, show: p.id === phase ? !p.show : p.show })));
    };

    return (
        <section id="roadmap" className="roadmap">
            <h2>ROAD MAP WITH EXPANDABLES</h2>

            {/* Decorative Ellipses */}
            <div className="roadmap-decorations">
                <img src="/assets/4e55cc039b3c36b8f59117ef2866efefe445cf43.svg" alt="Decoration" className="decoration-ellipse ellipse-1" />
                <img src="/assets/07c470393940dc4dc982d538ebddb64a61a6c444.svg" alt="Decoration" className="decoration-ellipse ellipse-2" />
                <img src="/assets/99bd97c9ef444b62009772faa54c5460a0f7c030.svg" alt="Decoration" className="decoration-ellipse ellipse-3" />
                <img src="/assets/07c470393940dc4dc982d538ebddb64a61a6c444.svg" alt="Decoration" className="decoration-ellipse ellipse-4" />
            </div>

            {/* Timeline with Diamonds */}
            <div className="timeline-container">
                <div className="timeline-line">
                    <img src="/assets/debbdafaebce7c7779a4e6ad88dde05f83240f33.svg" alt="Timeline Line" />
                </div>

                {/* Timeline Diamonds */}
                <div className="timeline-diamond diamond-1 active">
                    <div className="diamond-outer"></div>
                    <div className="diamond-inner"></div>
                </div>
                <div className="timeline-diamond diamond-2">
                    <div className="diamond-outer"></div>
                    <div className="diamond-inner"></div>
                </div>
                <div className="timeline-diamond diamond-3">
                    <div className="diamond-outer"></div>
                    <div className="diamond-inner"></div>
                </div>
                <div className="timeline-diamond diamond-4">
                    <div className="diamond-outer"></div>
                    <div className="diamond-inner"></div>
                </div>
            </div>

            {/* Phase Cards */}
            <div className="roadmap-phases">
                {/* Phase I */}
                <div className="phase-1">
                    <div className="phase-image left-side">
                        <img src="/assets/5a4b957fe066711a1db5c40e4ba2d3667c9f9cb0.jpg" alt="Phase I Background" />
                    </div>
                    <div className="phase-content right-side">
                        <h3>Phase I: Rock in the Trenches</h3>
                        {expandedPhase.find((p) => p.id === 1)?.show && (
                            <p className="phase-date">Rockstar on the stage, trenches rocking galore</p>
                        )}
                        <button className="btn-expand" onClick={() => handlePhaseClick(1)}>
                            Click to expand
                        </button>
                    </div>
                </div>

                {/* Phase II */}
                <div className="phase-2">
                    <div className="phase-content left-side">
                        <h3>Phase II: Rockstar Parade in the Meme Jungle</h3>
                        {expandedPhase.find((p) => p.id === 2)?.show && (
                            <p className="phase-date">Rockstar Parade in the Meme Jungle where coins roar</p>
                        )}
                        <button className="btn-expand" onClick={() => handlePhaseClick(2)}>
                            Click to expand
                        </button>
                    </div>
                    <div className="phase-image right-side">
                        <img src="/assets/0d7375af251c815ef8d6ebe2e18dc03c5cf39514.jpg" alt="Phase II Background" />
                    </div>
                </div>

                {/* Phase III */}
                <div className="phase-3">
                    <div className="phase-image left-side">
                        <img src="/assets/3f1e7c13543072cd50d33b41c14d8605600f84f1.jpg" alt="Phase III Background" />
                    </div>
                    <div className="phase-content right-side">
                        <h3>Phase III: Rock to Blockchain Rhythm</h3>
                        {expandedPhase.find((p) => p.id === 3)?.show && (
                            <p className="phase-date">Nakamoto Beats got the Meme Jungle rocking to blockchain rhythm</p>
                        )}
                        <button className="btn-expand" onClick={() => handlePhaseClick(3)}>
                            Click to expand
                        </button>
                    </div>
                </div>

                {/* Phase IV */}
                <div className="phase-4">
                    <div className="phase-content left-side">
                        <h3>Phase IV: Rock to Decentralize Skies</h3>
                        {expandedPhase.find((p) => p.id === 4)?.show && (
                            <p className="phase-date">Rockstar Parade & meme energy powering rockets across decentralized skies</p>
                        )}
                        <button className="btn-expand" onClick={() => handlePhaseClick(4)}>
                            Click to expand
                        </button>
                    </div>
                    <div className="phase-image right-side">
                        <img src="/assets/7fb401847b5d29630c1b3f29fc114a8b1be0c9ab.jpg" alt="Phase IV Background" />
                    </div>
                </div>
            </div>
        </section>
    );
}
