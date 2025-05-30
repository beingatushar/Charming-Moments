import React from 'react';

interface HeroSectionProps {
  title: string;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  backgroundImage,
}) => {
  // Style object for background image
  const heroSectionStyles = {
    backgroundImage: `url(${backgroundImage})`,
  };

  // Group text-related classes for readability
  const textStyles = 'text-5xl font-bold text-white text-center';

  return (
    <section
      className="bg-cover bg-center min-h-96 max-h-[80vh]"
      style={heroSectionStyles}
      aria-label={title} // Adds accessibility support
    >
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center">
          <h1 className={textStyles}>{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
