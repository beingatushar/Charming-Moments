// src/components/HeroSection.tsx
import React from 'react';

interface HeroSectionProps {
  title: string;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, backgroundImage }) => {
  return (
    <section className="bg-cover bg-center h-96" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white text-center">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;