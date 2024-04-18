import React from 'react'
import './Hero.css'
import modelimage from '../Assets/modelimage.jpg'

export default function Hero() {
    return (
        <div className='hero-dash'>
            <div className="hero-left">
                <h2>Introducing Our Latest Arrivals</h2>
                <div>
                    <p>new</p>
                    <p>Collections</p>
                    <p>for everyone</p>

                </div>
                <div className="hero-button">
                    <div>Latest Collection</div>
                </div>
            </div>

            <div className="hero-right">
                <img src={modelimage} alt="" />
            </div>
        </div>
    )
}
