import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [packagesDropdown, setPackagesDropdown] = useState(false)
  const location = useLocation()
  const mobileMenuRef = useRef(null)
  const dropdownRef = useRef(null)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    // Check initial scroll position
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    setIsOpen(false)
    setPackagesDropdown(false)
  }, [location])
  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPackagesDropdown(false)
      }
    }
    // Close mobile menu when clicking outside
    const handleMobileClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Toggle menu"]')
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('mousedown', handleMobileClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('mousedown', handleMobileClickOutside)
    }
  }, [])
  const toggleMenu = () => setIsOpen(!isOpen)
  const togglePackagesDropdown = (e) => {
    e.preventDefault()
    setPackagesDropdown(!packagesDropdown)
  }
  return (
    <header
      className={`fixed w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2 sm:py-3' : 'bg-black/70 py-3 sm:py-5'}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="https://uploadthingy.s3.us-west-1.amazonaws.com/u54FezGT7mEQfifZEYkdks/winTourlogo.png"
              alt="WinTours Sri Lanka Logo"
              className="h-8 sm:h-10 md:h-12 mr-2 sm:mr-3"
            />
            <span
              className={`text-lg sm:text-xl font-bold font-display ${isScrolled ? 'text-green-600' : 'text-white'}`}
            >
              WinTours Sri Lanka
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 mx-4">
            <NavLink to="/" isScrolled={isScrolled}>
              Home
            </NavLink>
            <NavLink to="/about" isScrolled={isScrolled}>
              About Us
            </NavLink>
            <div className="relative group" ref={dropdownRef}>
              <button
                onClick={togglePackagesDropdown}
                className={`flex items-center ${isScrolled ? 'text-black hover:text-green-600' : 'text-white hover:text-green-400'} transition-colors`}
              >
                Packages{' '}
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-200 ${packagesDropdown ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`absolute left-0 mt-2 w-60 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 transform origin-top ${packagesDropdown ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}
              >
                <Link
                  to="/packages/14-days-13-nights"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  14 Days, 13 Nights
                </Link>
                <Link
                  to="/packages/09-days-08-nights"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  09 Days, 08 Nights
                </Link>
              </div>
            </div>
            <NavLink to="/short-inquiry" isScrolled={isScrolled}>
              Short Inquiries
            </NavLink>
            <NavLink to="/inquiry" isScrolled={isScrolled}>
              Inquiries
            </NavLink>
            <NavLink to="/gallery" isScrolled={isScrolled}>
              Gallery
            </NavLink>
            <NavLink to="/contact" isScrolled={isScrolled}>
              Contact Us
            </NavLink>
          </nav>
          {/* Mobile menu button */}
          <button
            className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'} focus:outline-none p-2`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-0 top-[60px] bg-white z-40 transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} h-[calc(100vh-60px)] overflow-y-auto`}
      >
        <div className="px-4 py-6 space-y-4 shadow-inner">
          <NavLink mobile to="/">
            Home
          </NavLink>
          <NavLink mobile to="/about">
            About Us
          </NavLink>
          <div className="py-2">
            <button
              onClick={togglePackagesDropdown}
              className="w-full flex justify-between items-center text-black hover:text-green-600 transition-colors"
            >
              Packages{' '}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${packagesDropdown ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`mt-2 pl-4 space-y-2 transition-all duration-300 ${packagesDropdown ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
              <Link
                to="/packages/14-days-13-nights"
                className="block py-2 text-gray-700 hover:text-green-600"
              >
                14 Days, 13 Nights
              </Link>
              <Link
                to="/packages/09-days-08-nights"
                className="block py-2 text-gray-700 hover:text-green-600"
              >
                09 Days, 08 Nights
              </Link>
            </div>
          </div>
          <NavLink mobile to="/short-inquiry">
            Short Inquiries
          </NavLink>
          <NavLink mobile to="/inquiry">
            Inquiries
          </NavLink>
          <NavLink mobile to="/gallery">
            Gallery
          </NavLink>
          <NavLink mobile to="/contact">
            Contact Us
          </NavLink>
        </div>
      </div>
    </header>
  )
}
const NavLink = ({ to, children, mobile = false, isScrolled = true }) => {
  const location = useLocation()
  const isActive = location.pathname === to
  return (
    <Link
      to={to}
      className={`${mobile ? 'block py-2 text-base' : 'py-2 text-sm lg:text-base'} ${isActive ? 'text-green-600 font-medium' : mobile ? 'text-black hover:text-green-600' : isScrolled ? 'text-black hover:text-green-600' : 'text-white hover:text-green-400'} transition-colors`}
    >
      {children}
    </Link>
  )
}
export default Navbar
