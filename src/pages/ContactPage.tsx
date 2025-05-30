import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

// ContactForm Component
const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateForm = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email");
      return false;
    }
    if (!message.trim()) {
      alert("Please enter your message");
      return false;
    }
    return true;
  };

  const generateWhatsAppMessage = () => {
    return `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const whatsappMessage = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const phoneNumber = "+918586810252"; // Replace with your WhatsApp number

    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, isMobile ? "_self" : "_blank");
  };

  return (
    <section className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Get in Touch With Us
      </h2>

      <div className="mt-8 max-w-2xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              placeholder="Write your message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300"
            >
              Send via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// ContactPage Component
const ContactPage: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="Contact Us"
        backgroundImage="https://img.freepik.com/free-photo/vintage-pink-telephone-composition_23-2148913955.jpg"
      />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
