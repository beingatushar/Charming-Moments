import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

const ContactPage: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <Header />

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pink-50 rounded-full">
                  <FaMapMarkerAlt className="text-pink-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Our Location</h3>
                  <p className="text-gray-600">123 Charming Street, Elegance City</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pink-50 rounded-full">
                  <FaEnvelope className="text-pink-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">info@charmingmoments.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pink-50 rounded-full">
                  <FaPhone className="text-pink-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Call Us</h3>
                  <p className="text-gray-600">+91 8368580432</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent peer"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-2 text-gray-500 transition-all duration-200 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink-500 bg-white px-1"
                >
                  Name
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-2 text-gray-500 transition-all duration-200 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink-500 bg-white px-1"
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent peer"
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-2 text-gray-500 transition-all duration-200 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink-500 bg-white px-1"
                >
                  Message
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;