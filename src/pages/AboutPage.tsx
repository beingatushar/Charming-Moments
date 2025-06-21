import React, { memo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import aboutImage from '../assets/shop.png';
// TeamMember Component
interface TeamMemberProps {
  member: {
    id: number;
    name: string;
    role: string;
    image: string;
    description: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = memo(({ member }) => {
  const { name, role, image, description } = member;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden text-center">
      <img
        loading="lazy"
        src={image}
        alt={`Photo of ${name}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2">{role}</p>
        <p className="text-gray-600 mt-4">{description}</p>
      </div>
    </div>
  );
});

// TeamSection Component
const TeamSection: React.FC = memo(() => {
  const teamMembers = [
    {
      id: 1,
      name: 'Pooja Arora',
      role: 'Founder & CEO',
      image: 'https://picsum.photos/1520',
      description:
        'Pooja is the visionary founder and leader of Charming Moments, with over 10 years of experience in creating unique resin crafts and building the brand.',
    },
    {
      id: 2,
      name: 'Vanshita Arora',
      role: 'Operations Lead',
      image: 'https://picsum.photos/1530',
      description:
        'Vanshita manages daily operations, ensuring smooth production and delivery of all products while maintaining quality standards.',
    },
    {
      id: 3,
      name: 'Tushar Aggarwal',
      role: 'Web Designer & Developer',
      image: 'https://picsum.photos/1502',
      description:
        'Tushar designs and develops the digital presence of Charming Moments, creating seamless online experiences for customers.',
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
});

// AboutContent Component
const AboutContent: React.FC = memo(() => (
  <section className="container mx-auto px-6 py-12">
    <h2 className="text-3xl font-bold text-center text-gray-800">Our Story</h2>
    <div className="mt-8 text-center text-gray-600 max-w-2xl mx-auto">
      <p>
        Charming moments by Pooja is founded by Pooja Arora. Charming moments
        believe in recollecting, brightening, and memorizing every moment. To
        enlighten the moments, Charming Moments deals in a variety of handmade
        products, including homemade chocolates, candles, resin products, and
        purses & wallets.
      </p>
      <p className="mt-4">
        Founded in 2023, we are a small team of artisans dedicated to delivering
        high-quality, handmade items that you'll love.
      </p>
    </div>
  </section>
));

// AboutPage Component
const AboutPage: React.FC = () => (
  <div className="font-sans">
    {/* Header */}
    <Header />

    {/* Hero Section */}
    <HeroSection title="About Us" backgroundImage={aboutImage} />

    {/* About Content */}
    <AboutContent />

    {/* Team Section */}
    <TeamSection />

    {/* Footer */}
    <Footer />
  </div>
);

export default AboutPage;
