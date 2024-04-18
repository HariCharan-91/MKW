import React from 'react';

// Define your SVG component
const MySVG = ({ width, height}) => (
    <svg xmlns="http://www.w3.org/2000/svg" 
    width= {15} height ={15}viewBox="0 0 24 24" id="bars"><path fill="#000000" d="M3,8H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,8Zm18,8H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-5H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path></svg>
);

// Export the SVG component
export default MySVG;


