import React from "react";
import "./Offers.css";
import Offersmodel from '../Assets/offersmodel.jpg'

export default function Offers() {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCT</p>
        <button><span></span>Check Now</button>

      </div>
      <div className="offers-right">
        <img src={Offersmodel} alt="" />
      </div>
    </div>
  );
}
