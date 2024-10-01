// components/Footer.js

import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#e0f7f6] text-center p-10">
      <div className="container mx-auto">
        {/* Logo */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-[#003338]">Farmplace</h1>
        </div>

        {/* Description Text */}
        <p className="text-[#003338] mb-6">
          The marketplace for all your farming needs.
        </p>

        {/* Social Media Icons */}
        <p className="text-[#003338] mb-4">Contact us on social media:</p>
        <div className="flex justify-center space-x-6 text-2xl text-[#003338]">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
