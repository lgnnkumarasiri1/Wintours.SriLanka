import React from 'react'
import { Link } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Clock,
  ArrowRight,
  Music,
  Youtube,
} from 'lucide-react'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src="https://uploadthingy.s3.us-west-1.amazonaws.com/u54FezGT7mEQfifZEYkdks/winTourlogo.png"
                alt="WinTours Sri Lanka Logo"
                className="h-12 mr-2 bg-white rounded-full p-1"
              />
              <h3 className="text-xl font-bold text-green-400">
                WinTours Sri Lanka
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for unforgettable travel experiences in Sri
              Lanka. Explore the island with confidence and comfort with our
              expert guides.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/profile.php?id=61578155069181"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook Page"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/wintours_srilanka/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram Page"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@wintours_srilanka"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="TikTok Page"
              >
                <Music size={18} />
              </a>
                <a
                href="https://www.instagram.com/wintours_srilanka/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Youtube Page"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-green-400 pb-2 border-b border-gray-700">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-green-400 pb-2 border-b border-gray-700">
              Popular Packages
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/packages/14-days-13-nights"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  14 Days, 13 Nights
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/09-days-08-nights"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  09 Days, 08 Nights
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Sri Lanka Explorer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Beach Getaway
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Cultural Tour
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-green-400 pb-2 border-b border-gray-700">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="mr-3 text-green-400 flex-shrink-0 mt-1"
                />
                <span className="text-gray-300">
                  No 10, Kalalpitiya, Ukuwela, Matale, 
                  Sri Lanka
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={20}
                  className="mr-3 text-green-400 flex-shrink-0"
                />
                <span className="text-gray-300">+94 778 289 862</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">info@wintours.com</span>
              </li>
              <li className="flex items-center">
                <Clock
                  size={20}
                  className="mr-3 text-green-400 flex-shrink-0"
                />
                <span className="text-gray-300">
                  Mon - Sat: 9:00 AM - 5:00 PM (Hotline 24/7)
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} WinTours Sri Lanka. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 text-sm"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
