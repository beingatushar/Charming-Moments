import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

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

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden text-center">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
        <p className="text-gray-600 mt-2">{member.role}</p>
        <p className="text-gray-600 mt-4">{member.description}</p>
      </div>
    </div>
  );
};

// TeamSection Component
const TeamSection: React.FC = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Founder & CEO",
      image: "https://via.placeholder.com/150",
      description:
        "John is passionate about creating unique resin crafts and has over 10 years of experience in the industry.",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Lead Artisan",
      image: "https://via.placeholder.com/150",
      description:
        "Jane specializes in handcrafted chocolates and has a keen eye for detail.",
    },
    {
      id: 3,
      name: "Emily Brown",
      role: "Marketing Manager",
      image: "https://via.placeholder.com/150",
      description:
        "Emily is responsible for spreading the word about our products and connecting with our customers.",
    },
    {
      id: 4,
      name: "Michael Johnson",
      role: "Product Designer",
      image: "https://via.placeholder.com/150",
      description:
        "Michael designs our resin products and ensures they are both beautiful and functional.",
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

// AboutContent Component
const AboutContent: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Our Story
      </h2>
      <div className="mt-8 text-center text-gray-600 max-w-2xl mx-auto">
        <p>
          Charming moments by Pooja is founded by Pooja Arora. Charming moments
          believe in recollecting, brightening and memorizing every moments. To
          enlighten the moments, Charming moments deals in variety of handmade
          products. It offers homemade chocolate, candles, resin product and
          purse & wallets.
        </p>
        <p className="mt-4">
          Founded in 2023, we are a small team of artisans dedicated to
          delivering high-quality, handmade items that you'll love.
        </p>
      </div>
    </section>
  );
};

// AboutPage Component
const AboutPage: React.FC = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection title="About Us" backgroundImage="" />

      {/* About Content */}
      <AboutContent />

      {/* Team Section */}
      <TeamSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
