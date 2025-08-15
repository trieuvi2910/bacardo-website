"use client";
import { useState, useEffect, useRef } from "react";

interface Track {
    id: number;
    title: string;
    artist: string;
    file: string;
    duration: string;
}

export default function Tokenomics() {
    return (
        <section className="tokenomics tokenomics-section" id="tokenomics">
            <h2>TOKENOMICS REVEAL</h2>
            <div className="player-info-carousel">
                <div className="info-carousel">
                    <div className="info-slide">
                        <span>Total Supply : 10.000.000.000 $Bardo</span>
                        <span className="separator">-</span>
                        <span>No Taxes / Just Rocking</span>
                    </div>
                    <div className="info-slide">
                        <span>Community Driven</span>
                        <span className="separator">-</span>
                        <span>100% Decentralized</span>
                    </div>
                    <div className="info-slide">
                        <span>Rock the Blockchain</span>
                        <span className="separator">-</span>
                        <span>Music Meets Crypto</span>
                    </div>
                    <div className="info-slide">
                        <span>LP Locked Forever</span>
                        <span className="separator">-</span>
                        <span>Safe & Secure</span>
                    </div>
                    <div className="info-slide">
                        <span>Total Supply : 10.000.000.000 $Bardo</span>
                        <span className="separator">-</span>
                        <span>No Taxes / Just Rocking</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
