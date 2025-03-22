import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Charming Moments</div>
          <nav className="space-x-4">
            <a href="/" className="text-gray-800 hover:text-gray-600">Home</a>
            <a href="/shop" className="text-gray-800 hover:text-gray-600">Shop</a>
            <a href="/about" className="text-gray-800 hover:text-gray-600">About Us</a>
            <a href="/contact" className="text-gray-800 hover:text-gray-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">Contact Us</h2>
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
      <footer className="bg-gray-800 text-white mt-8">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold">Charming Moments</h3>
              <p className="mt-2 text-gray-400">Handcrafted Elegance & Sweet Delights</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/shop" className="text-gray-400 hover:text-white">Shop</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Contact Us</h3>
              <p className="mt-2 text-gray-400">Email: info@charmingmoments.com</p>
              <p className="text-gray-400">Phone: 8368580432</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;