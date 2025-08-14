'use client'

import { useState } from 'react'

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="how-to-buy">
      <h2>HOW TO BUY</h2>
      <div className="steps-container">
        <div className="step-card">
          <div className="flip-card-inner">
            <div className="flip-card-front flip-1">
              <img src="/assets/320cd0876f91ec95ec27e84ddd9014965c470768.png" alt="Get Wallet" />
              <h3>Get Wallet</h3>
            </div>
            <div className="flip-card-back flip-1">
              <h3>Click</h3>
              <p>Get Wallet</p>
            </div>
          </div>
        </div>
        <div className="step-arrow">
          <img src="/assets/de4198c63c7cdad8a2bf5348ed71a473ad74af4e.png" alt="Next Step" />
        </div>
        <div className="step-card">
          <div className="flip-card-inner">
            <div className="flip-card-front flip-2">
              <img src="/assets/c1c997c6620fe34ac7d8ee5ddb7a39b0424170c8.png" alt="Buy SOL" />
              <h3>Guy SOL</h3>
            </div>
            <div className="flip-card-back flip-2">
              <h3>Click</h3>
              <p>Guy SOL</p>
            </div>
          </div>
        </div>
        <div className="step-arrow">
          <img src="/assets/de4198c63c7cdad8a2bf5348ed71a473ad74af4e.png" alt="Next Step" />
        </div>
        <div className="step-card">
          <div className="flip-card-inner">
            <div className="flip-card-front flip-3">
              <img src="/assets/8056094f5f860157698e0becc63d6ecd94ef33b6.png" alt="Buy on Pump.fun" />
              <h3>Buy on Pump.fun</h3>
            </div>
            <div className="flip-card-back flip-3">
              <h3>Click</h3>
              <p>Buy on</p>
              <p>Pump.fun</p>
            </div>
          </div>
        </div>
        <div className="step-arrow">
          <img src="/assets/de4198c63c7cdad8a2bf5348ed71a473ad74af4e.png" alt="Next Step" />
        </div>
        <div className="step-card">
          <div className="flip-card-inner">
            <div className="flip-card-front flip-4">
              <img src="/assets/b8d44285cd760586075012c7039092df0ad485f6.png" alt="Join Parade" />
              <h3>Join Parade</h3>
            </div>
            <div className="flip-card-back flip-4">
              <h3>Click</h3>
              <p>Join Parade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
