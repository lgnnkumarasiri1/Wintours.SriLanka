import React, { useEffect, useState, useRef, lazy, memo } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, ArrowRight, Star } from 'lucide-react'
const Packages = () => {
  const [visibleSections, setVisibleSections] = useState({})
  const [expandedDestinations, setExpandedDestinations] = useState({})
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
  const toggleDestinationDetails = (id) => {
    setExpandedDestinations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }
  return (
    <div className="w-full">
      {/* Hero Section - Reduced padding to remove space */}
      <section
        ref={observerRefs.hero}
        className="relative mt-16 bg-black text-white"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://uploadthingy.s3.us-west-1.amazonaws.com/obwacKgv1BhiiTsDVFzPaT/bg3.png')",
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 py-8">
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

      

      {/* Popular Packages - Removed animations */}
      <section ref={observerRefs.packages} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
           
            
            
          </div>
          <div className="grid grid-cols-1 gap-10">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
              <div className="md:w-2/5 relative">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/73AwLdEJo1TiQf7DgDmsKX/galle_fort.png"
                  alt="14 Days Adventure"
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Best Seller
                </div>
              </div>
              <div className="md:w-3/5 p-6 md:p-8">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="text-green-600 mr-2" />
                  <span className="text-gray-600 text-sm">
                    14 Days, 13 Nights
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 font-display">
                  Complete Heritage Explorer
                </h3>
                <p className="text-gray-600 mb-6 text-base">
                  Experience the rich cultural heritage with our comprehensive
                  14-day tour package that covers all major historical sites,
                  ancient cities, and natural wonders of Sri Lanka.
                </p>
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${star <= 4 ? 'text-yellow-400 fill-current' : 'text-yellow-400'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">
                    128 Reviews
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-900 font-bold text-xl"></div>
                  <Link
                    to="/packages/14-days-13-nights"
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-base font-medium min-w-[140px] h-[44px] flex items-center justify-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
              <div className="md:w-2/5 relative">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/2dLrokYgGRzwkUB4U3PHpt/beach1.png"
                  alt="9 Days Adventure"
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
              </div>
              <div className="md:w-3/5 p-6 md:p-8">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="text-green-600 mr-2" />
                  <span className="text-gray-600 text-sm">
                    9 Days, 8 Nights
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 font-display">
                  Essence of Sri Lanka: A 9-Days Tropical Escape
                </h3>
                <p className="text-gray-600 mb-6 text-base">
                  The perfect blend of relaxation and adventure with pristine
                  beaches and thrilling wildlife safaris in one package. Ideal
                  for nature lovers and beach enthusiasts.
                </p>
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${star <= 4 ? 'text-yellow-400 fill-current' : 'text-yellow-400'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">96 Reviews</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-900 font-bold text-xl"></div>
                  <Link
                    to="/packages/09-days-08-nights"
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-base font-medium min-w-[140px] h-[44px] flex items-center justify-center"
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
          <h2 className="text-3xl font-bold mb-4">
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
// Sample data - needed for the component to work
const destinations = [
  {
    id: 'sigiriya',
    name: 'Sigiriya Rock Fortress',
    location: 'Central Province, Sri Lanka',
    description:
      'Explore this ancient rock fortress with its fascinating frescoes and spectacular views from the summit.',
    fullDescription:
      'Sigiriya, also known as the Lion Rock, is an ancient rock fortress and palace built by King Kasyapa during the 5th century AD. This UNESCO World Heritage site rises dramatically 200 meters above the surrounding plains and features remarkable frescoes, extensive gardens, and the remains of a once-magnificent palace. The climb to the summit rewards visitors with breathtaking panoramic views of the surrounding landscape. The sophisticated water gardens, boulder gardens, and terraced gardens showcase the advanced engineering and artistic achievements of ancient Sri Lankan civilization.',
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/obwacKgv1BhiiTsDVFzPaT/bg3.png',
  },
  // ... other destinations would be here
]
export default Packages
