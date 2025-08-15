"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TokenCarousel from "./components/TokenCarousel";
import TokenSection from "./components/TokenSection";
import HowToBuy from "./components/HowToBuy";
import MediaGallery from "./components/MediaGallery";
import Roadmap from "./components/Roadmap";
import Footer from "./components/Footer";
import Tokenomics from "./components/Tokenomics";
import MusicTrackHit from "./components/MusicTrackHit";
import SmoothScrollWrapper from "./components/SmoothScrollWrapper";
import { Element, Events, scrollSpy, scroller } from "react-scroll";

export default function Home() {
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    const handleWalletConnect = () => {
        setIsWalletConnected(!isWalletConnected);
    };

    return (
        <main className="min-h-screen w-full bg-bg-primary text-text-primary">
            <Header isWalletConnected={isWalletConnected} onWalletConnect={handleWalletConnect} />
            <Hero />
            <HowToBuy />
            <TokenSection />
            <Tokenomics />
            <MusicTrackHit />
            <MediaGallery />
            <Roadmap />
            <Footer isWalletConnected={isWalletConnected} onWalletConnect={handleWalletConnect} />
        </main>
    );
}
