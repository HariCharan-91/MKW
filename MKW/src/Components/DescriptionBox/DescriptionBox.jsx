import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="description-nav-box">Description</div>
        <div className="description-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
        Discover a world of endless possibilities at MKW, your ultimate destination for all things fashion. As a premier online retailer, we're dedicated to providing you with a seamless shopping experience that's both convenient and inspiring.
        </p>
        <p>
        Step into our virtual storefront and browse through our extensive collection of fashion-forward apparel and accessories for men, women, and kids. From trendy must-haves to timeless classics, we've curated a diverse range of products to suit every style, occasion, and budget.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
