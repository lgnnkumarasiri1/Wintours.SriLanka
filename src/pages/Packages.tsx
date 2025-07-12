import React, { useEffect, useState, useRef, memo } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
const Packages = () => {
  const [visibleSections, setVisibleSections] = useState({})
  const observerRefs = {
    hero: useRef(null),
    featured: useRef(null),
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
    <div className="w-full">
      {/* Hero Section */}
      <section
        ref={observerRefs.hero}
        className="relative pt-24 pb-16 bg-black text-white"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://uploadthingy.s3.us-west-1.amazonaws.com/obwacKgv1BhiiTsDVFzPaT/bg3.png')",
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 py-16">
          <div
            className={`max-w-3xl mx-auto text-center transition-all duration-700 ${visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
          >
            <div className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Explore Sri Lanka
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Our Travel Packages
            </h1>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Discover our carefully crafted travel experiences designed to
              showcase the best of Sri Lanka's natural beauty, rich culture, and
              warm hospitality.
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
              Featured Travel Experiences
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our selection of premium travel packages, each
              offering unique experiences and unforgettable memories.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* First Featured Package */}
            <div
              className={`bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 flex flex-col h-full transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${visibleSections.featured ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
              style={{
                transitionDelay: '0.05s',
              }}
            >
              <div className="relative h-60">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/j4eKVgUgWV71nCcAmRW6iS/dalada.jpg"
                  alt="14 Days Adventure"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Best Seller
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="text-green-600 mr-1" />
                  <span className="text-gray-600 text-sm">
                    14 Days, 13 Nights
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  "Sri Lanka Grand Discovery: From the Highlands to the Coast"
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  A full two-week trip to Sri Lanka's beautiful
                   beaches, rich culture, and lush surroundings.
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
                <div className="flex justify-end mt-auto">
                  <Link
                    to="/packages/14-days-13-nights"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all transform hover:scale-105 hover:shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            {/* Second Featured Package */}
            <div
              className={`bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 flex flex-col h-full transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${visibleSections.featured ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
              style={{
                transitionDelay: '0.1s',
              }}
            >
              <div className="relative h-60">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/4iNbKQDGe98ZafS1FcUK9A/safari2.jpg"
                  alt="9 Days Adventure"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="text-green-600 mr-1" />
                  <span className="text-gray-600 text-sm">
                    9 Days, 8 Nights
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  "Essence of Sri Lanka: A 9-Day Tropical Getaway"
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  In just over a week, you may see the best of Sri Lanka, 
                  from its ancient towns to its peaceful tea fields and beautiful beaches.
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
                  <span className="text-gray-600 text-sm ml-2">96 Reviews</span>
                </div>
                <div className="flex justify-end mt-auto">
                  <Link
                    to="/packages/09-days-08-nights"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all transform hover:scale-105 hover:shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
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
              className="w-44 text-center bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Make an Inquiry
            </Link>
            <Link
              to="/contact"
              className="w-44 text-center bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Packages
