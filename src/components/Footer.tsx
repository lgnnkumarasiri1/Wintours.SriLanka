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
  ExternalLink,
} from 'lucide-react'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src="https://uploadthingy.s3.us-west-1.amazonaws.com/q5GtXVzavzBDpZEwjdBU35/winTourlogo.png"
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
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 transform group-hover:translate-x-1 transition-transform"
                  />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 transform group-hover:translate-x-1 transition-transform"
                  />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 transform group-hover:translate-x-1 transition-transform"
                  />
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 transform group-hover:translate-x-1 transition-transform"
                  />
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 transform group-hover:translate-x-1 transition-transform"
                  />
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
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 transform group-hover:translate-x-1 transition-transform"
                  />
                  14 Days, 13 Nights
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/09-days-08-nights"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 transform group-hover:translate-x-1 transition-transform"
                  />
                  09 Days, 08 Nights
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 transform group-hover:translate-x-1 transition-transform"
                  />
                  Sri Lanka Explorer
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 transform group-hover:translate-x-1 transition-transform"
                  />
                  Beach Getaway
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 transform group-hover:translate-x-1 transition-transform"
                  />
                  Cultural Tour
                </Link>
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
                  No, 10, Kalalpitiya, Ukuwela, Matale, Sri Lanka
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={20}
                  className="mr-3 text-green-400 flex-shrink-0"
                />
                <a
                  href="tel:+94778289862"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  +94 778 289 862
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-green-400 flex-shrink-0" />
                <a
                  href="mailto:info@wintours.com"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  info@wintours.com
                </a>
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
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-0">
              <p className="text-gray-400 text-sm mb-4 sm:mb-0 text-center sm:text-left">
                &copy; {new Date().getFullYear()} WinTours Sri Lanka. All rights
                reserved.
              </p>
              <div className="flex items-center sm:ml-4">
                <span className="mx-2 text-gray-600 hidden sm:inline">|</span>
                <p className="text-gray-500 text-xs flex items-center whitespace-normal text-center">
                  Website by{' '}
                  <a
                    href="https://wa.me/94783655655"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors inline-flex items-center ml-1 flex-wrap"
                  >
                    <span className="mr-1">Olee Tech and Design Hub</span>
                    <ExternalLink size={12} />
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-green-400 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-green-400 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/faq"
                className="text-gray-400 hover:text-green-400 text-sm"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
