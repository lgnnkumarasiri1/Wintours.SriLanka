import React, { useEffect, useState, useRef, memo } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
const Packages = () => {
  const [visibleSections, setVisibleSections] = useState({})
  const observerRefs = {
    featured: useRef(null),
    allPackages: useRef(null),
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    const observers = {}
    // Create an intersection observer for each section
    Object.entries(observerRefs).forEach(([key, ref]) => {
      if (ref.current) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => ({
                ...prev,
                [key]: true,
              }))
            }
          },
          {
            threshold: 0.1,
          },
        )
        observers[key].observe(ref.current)
      }
    })
    return () => {
      // Cleanup observers
      Object.values(observers).forEach((observer) => {
        observer.disconnect()
      })
    }
  }, [])
  return (
    <div className="w-full pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-black text-white">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://uploadthingy.s3.us-west-1.amazonaws.com/jh8EH1fsnWUQZd1GUr5t9h/nature.jpg')",
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div
            className="max-w-2xl animate-fadeInUp"
            style={{
              animationDuration: '1s',
            }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Travel Packages
            </h1>
            <p className="text-xl">
              Discover our carefully crafted travel packages designed to provide
              you with unforgettable experiences around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section ref={observerRefs.featured} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ${visibleSections.featured ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Featured Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our selection of premium travel packages, each
              offering unique experiences and unforgettable memories.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div
              className={`bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 flex flex-col md:flex-row transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${visibleSections.featured ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
              style={{
                transitionDelay: '0.05s',
              }}
            >
              <div className="md:w-2/5 relative">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/j4eKVgUgWV71nCcAmRW6iS/dalada.jpg"
                  alt="14 Days Adventure"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Best Seller
                </div>
              </div>
              <div className="md:w-3/5 p-6">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="text-green-600 mr-1" />
                  <span className="text-gray-600 text-sm">
                    14 Days, 13 Nights
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Complete Heritage Explorer
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience the rich cultural heritage with our comprehensive
                  14-day tour package that covers all major historical sites.
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">
                    128 Reviews
                  </span>
                </div>
                <div className="flex justify-end">
                  <Link
                    to="/packages/14-days-13-nights"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all transform hover:scale-105 hover:shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={`bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 flex flex-col md:flex-row transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${visibleSections.featured ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
              style={{
                transitionDelay: '0.05s',
              }}
            >
              <div className="md:w-2/5 relative">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/aTZSB7mBzfn66eDfENGjXR/beach1.jpg"
                  alt="8 Days Sri Lanka Highlights"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Best Value
                </div>
              </div>
              <div className="md:w-3/5 p-6">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="text-green-600 mr-1" />
                  <span className="text-gray-600 text-sm">
                    8 Days, 7 Nights
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Sri Lanka Highlights Tour
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience the best of Sri Lanka with this compact tour
                  covering all major highlights of the island.
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">87 Reviews</span>
                </div>
                <div className="flex justify-end">
                  <Link
                    to="/packages/08-days-07-nights"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all transform hover:scale-105 hover:shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* All Packages */}
          <div
            ref={observerRefs.allPackages}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${visibleSections.allPackages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{
                  transitionDelay: `${0.02 + index * 0.02}s`,
                }}
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  {pkg.tag && (
                    <div
                      className={`absolute top-4 left-4 ${pkg.tag === 'Best Value' ? 'bg-green-600' : 'bg-black'} text-white px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {pkg.tag}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Calendar size={16} className="text-green-600 mr-1" />
                    <span className="text-gray-600 text-sm">
                      {pkg.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-green-600 mr-1" />
                      <span className="text-gray-600 text-sm">
                        {pkg.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      to={`/packages/${pkg.id}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all transform hover:scale-105 hover:shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 animate-pulse">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to plan your dream vacation. Our travel experts are
            waiting to assist you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/inquiry"
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg w-40"
            >
              Make an Inquiry
            </Link>
            <Link
              to="/contact"
              className="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg w-40"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
// Sample packages data
const packages = [
  {
    id: '09-days-08-nights',
    title: 'Beach & Safari Expedition',
    duration: '9 Days, 8 Nights',
    description:
      'The perfect blend of relaxation and adventure with pristine beaches and thrilling wildlife safaris in one package.',
    location: 'Sri Lanka',
    tag: 'Popular',
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/4iNbKQDGe98ZafS1FcUK9A/safari2.jpg',
  },
  {
    id: 'cultural-heritage',
    title: 'Cultural Heritage Tour',
    duration: '7 Days, 6 Nights',
    description:
      'Immerse yourself in the rich cultural heritage of ancient civilizations and historical landmarks of Sri Lanka.',
    location: 'Sri Lanka',
    tag: 'Best Value',
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/j4eKVgUgWV71nCcAmRW6iS/dalada.jpg',
  },
  {
    id: 'tropical-paradise',
    title: 'Tropical Paradise Getaway',
    duration: '5 Days, 4 Nights',
    description:
      'Escape to pristine beaches and crystal-clear waters for a relaxing tropical vacation on the beautiful coasts of Sri Lanka.',
    location: 'Sri Lanka',
    tag: null,
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/aTZSB7mBzfn66eDfENGjXR/beach1.jpg',
  },
  {
    id: 'mountain-adventure',
    title: 'Hill Country Adventure',
    duration: '6 Days, 5 Nights',
    description:
      'Challenge yourself with thrilling hikes and breathtaking mountain views in the central highlands of Sri Lanka.',
    location: 'Sri Lanka',
    tag: null,
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/umKpchjBUtECmnTjGTnjYM/nature6.jpg',
  },
  {
    id: 'city-explorer',
    title: 'Colonial Heritage Explorer',
    duration: '4 Days, 3 Nights',
    description:
      "Discover the vibrant culture, cuisine, and architecture of Sri Lanka's colonial cities and heritage sites.",
    location: 'Sri Lanka',
    tag: 'Popular',
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/uAozGnBab3LdZQ7d1fn3sg/sigiriya1.jpg',
  },
  {
    id: 'wildlife-safari',
    title: 'Wildlife Safari',
    duration: '8 Days, 7 Nights',
    description:
      "Witness majestic wildlife in their natural habitat on an unforgettable safari adventure through Sri Lanka's national parks.",
    location: 'Sri Lanka',
    tag: null,
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/v28W2BPQ8qMpZvG8piC1mz/safari5.jpg',
  },
]
export default Packages
