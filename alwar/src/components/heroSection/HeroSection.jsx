
import React from 'react';
import logo from '../../assets/logo.png';

const HeroSection = () => {
  return (
    <div>
      {/* Image with responsive height */}
      <img
        className="w-full  sm:h-full md:h-full lg:h-full mt-0 object-contain" 
        src={logo} 
        alt="Logo"
      />
    </div>
  );
};

export default HeroSection;
