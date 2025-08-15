"use client";

import { useState } from "react";
import TokenCarousel from "./TokenCarousel";

export default function TokenSection() {
    const [copySuccess, setCopySuccess] = useState(false);
    const tokenAddress = "Abcdefgh123456"; // Địa chỉ token thực tế

    const truncateAddress = (address: string, startLength: number = 6, endLength: number = 4) => {
        if (address.length <= startLength + endLength + 3) {
            return address;
        }
        const start = address.slice(0, startLength);
        const end = address.slice(-endLength);
        return `${start}...${end}`;
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(tokenAddress);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000); // Reset sau 2 giây
        } catch (err) {
            console.error("Failed to copy: ", err);
            // Fallback cho các browser cũ
            const textArea = document.createElement("textarea");
            textArea.value = tokenAddress;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    return (
        <section id="token" className="token-section">
            <TokenCarousel />
            <div className="token-bg">
                <div className="gradient-overlay"></div>
            </div>
            <div className="token-container">
                <div className="token-info">
                    <h2>$BARDO</h2>
                    <div className="token-address">
                        <img src="/assets/at.png" alt="at" />
                        <span className="address" title={tokenAddress}>
                            {truncateAddress(tokenAddress)}
                        </span>
                        <button
                            className={`copy-btn ${copySuccess ? "copied" : ""}`}
                            onClick={copyToClipboard}
                            title={copySuccess ? "Copied!" : "Copy address"}
                        >
                            <img src="/assets/copy.png" alt="copy button" />
                            {copySuccess && <span className="copy-success">✓</span>}
                        </button>
                    </div>
                    <div className="token-platforms">
                        <div className="platform">
                            <img src="/assets/a72e870947fdebf6301a254944f1aa9877b82529.png" alt="Pump Fun" />
                            <span>Pump Fun</span>
                        </div>
                        <div className="platform">
                            <img src="/assets/7d33575eba80f10c815bd5403c6a12f57107ccea.png" alt="Raydium" />
                            <span>Raydium</span>
                        </div>
                        <div className="platform">
                            <img src="/assets/11b63324fccc5e15360755370b924f95da96f1a8.png" alt="Dexscreener" />
                            <span>Dexscreener</span>
                        </div>
                    </div>
                    <div className="token-features">
                        <p>No Taxes</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
