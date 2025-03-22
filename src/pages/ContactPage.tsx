// src/pages/ContactPage.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const ContactPage: React.FC = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="Contact Us"
        backgroundImage="https://via.placeholder.com/1200x400"
      />

      {/* Contact Form */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">Get in Touch</h2>
        <div className="mt-8 max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" rows={4} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg">Send Message</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;