import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Calendar,
  MapPin,
  Clock,
  Check,
  X,
  Star,
  ArrowRight,
} from 'lucide-react'
import SEO from '../components/SEO'
import AnimateOnScroll from '../components/AnimateOnScroll'
const PackageDetails = () => {
  const { duration } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [showAllFAQs, setShowAllFAQs] = useState(false)
  const [visibleSections, setVisibleSections] = useState({})
  const observerRefs = {
    details: useRef(null),
    related: useRef(null),
  }
  // Determine which package to display based on the URL parameter
  let packageData = packageDetails.heritage
  if (duration === '09-days-08-nights') {
    packageData = packageDetails.safari
  } else if (duration === '08-days-07-nights') {
    packageData = packageDetails.sriLanka
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
  const toggleShowAllFAQs = () => {
    setShowAllFAQs(!showAllFAQs)
  }
  return (
    <div className="w-full pt-24 pb-16">
      <SEO
        title={packageData.title}
        description={packageData.subtitle}
        keywords={`Sri Lanka, tours, ${packageData.tag}, ${packageData.duration}, ${packageData.location}`}
        ogImage={packageData.heroImage}
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-black text-white">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage: `url('${packageData.heroImage}')`,
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll animation="fade-up" className="max-w-3xl">
            <div className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              {packageData.tag}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {packageData.title}
            </h1>
            <p className="text-xl mb-6">{packageData.subtitle}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Calendar size={18} className="mr-1" />
                <span>{packageData.duration}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-1" />
                <span>{packageData.location}</span>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${star <= packageData.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                    />
                  ))}
                </div>
                <span className="ml-1">
                  ({packageData.reviewCount} reviews)
                </span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      {/* Package Details */}
      <section ref={observerRefs.details} className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <AnimateOnScroll animation="fade-right" className="lg:w-2/3">
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${activeTab === 'overview' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('itinerary')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${activeTab === 'itinerary' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Itinerary
                  </button>
                  <button
                    onClick={() => setActiveTab('faq')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${activeTab === 'faq' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    FAQ
                  </button>
                </nav>
              </div>
              {/* Tab Content */}
              <div className="prose max-w-none">
                {activeTab === 'overview' && (
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-4">
                      Package Overview
                    </h2>
                    <p className="mb-6">{packageData.overview}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {packageData.highlights.map((highlight, index) => (
                        <AnimateOnScroll
                          key={index}
                          animation="fade-up"
                          delay={index * 0.1}
                          className="flex transform transition-transform hover:translate-x-2 duration-300"
                        >
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Check size={20} className="text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-bold mb-1">
                              {highlight.title}
                            </h3>
                            <p className="text-gray-600">
                              {highlight.description}
                            </p>
                          </div>
                        </AnimateOnScroll>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-4">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {packageData.gallery.map((image, index) => (
                        <AnimateOnScroll
                          key={index}
                          animation="zoom-out"
                          delay={index * 0.1}
                          className="rounded-lg overflow-hidden h-40 md:h-48 transition-all duration-300 hover:shadow-xl hover:scale-105"
                        >
                          <div className="img-hover-zoom h-full">
                            <img
                              src={image}
                              alt={`${packageData.title} - Gallery ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </AnimateOnScroll>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'itinerary' && (
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-6">
                      Detailed Itinerary
                    </h2>
                    <div className="space-y-8">
                      {packageData.itinerary.map((day, index) => (
                        <div
                          key={index}
                          className="relative pl-8 pb-8 border-l-2 border-green-200 last:border-0 transition-all duration-500 hover:border-green-600"
                        >
                          <div className="absolute left-[-9px] top-0 bg-green-600 rounded-full w-4 h-4 transition-transform duration-300 hover:scale-125"></div>
                          <div className="mb-2">
                            <h3 className="text-xl font-bold">
                              Day {day.day}: {day.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {day.location}
                            </p>
                          </div>
                          <p className="mb-4">{day.description}</p>
                          {day.activities && (
                            <div className="mb-4">
                              <h4 className="font-bold mb-2">Activities:</h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {day.activities.map((activity, idx) => (
                                  <li
                                    key={idx}
                                    className="transition-transform duration-300 hover:translate-x-2"
                                  >
                                    {activity}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {day.meals && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Meals:</span>{' '}
                              {day.meals}
                            </div>
                          )}
                          {day.accommodation && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">
                                Accommodation:
                              </span>{' '}
                              {day.accommodation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'faq' && (
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-6">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {packageData.faqs
                        .slice(0, showAllFAQs ? packageData.faqs.length : 5)
                        .map((faq, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:border-green-300"
                          >
                            <details className="group">
                              <summary className="flex justify-between items-center cursor-pointer bg-gray-50 px-6 py-4 transition-colors duration-300 hover:bg-gray-100">
                                <h3 className="text-lg font-medium text-gray-800">
                                  {faq.question}
                                </h3>
                                <span className="text-green-600 group-open:rotate-180 transition-transform">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </span>
                              </summary>
                              <div className="px-6 py-4 text-gray-600 animate-fadeIn">
                                <p>{faq.answer}</p>
                              </div>
                            </details>
                          </div>
                        ))}
                      {packageData.faqs.length > 5 && (
                        <div className="text-center mt-6">
                          <button
                            onClick={toggleShowAllFAQs}
                            className="text-green-600 hover:text-green-700 font-medium transition-colors"
                          >
                            {showAllFAQs
                              ? 'Show Less'
                              : `Show All (${packageData.faqs.length}) FAQs`}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </AnimateOnScroll>
            {/* Sidebar */}
            <AnimateOnScroll
              animation="fade-left"
              delay={0.3}
              className="lg:w-1/3"
            >
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden sticky top-24 card-hover-effect">
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Clock size={18} className="text-green-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Duration</h4>
                        <p className="text-gray-600">{packageData.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin
                        size={18}
                        className="text-green-600 mr-3 mt-0.5"
                      />
                      <div>
                        <h4 className="font-medium">Destinations</h4>
                        <p className="text-gray-600">{packageData.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <Link
                      to="/inquiry"
                      className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-md h-[48px] flex items-center justify-center btn-hover-effect"
                    >
                      Book Now
                    </Link>
                    <Link
                      to="/short-inquiry"
                      className="block w-full bg-black hover:bg-gray-800 text-white text-center py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-md h-[48px] flex items-center justify-center btn-hover-effect"
                    >
                      Quick Inquiry
                    </Link>
                    <Link
                      to="/contact"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-md h-[48px] flex items-center justify-center btn-hover-effect"
                    >
                      Visit Our Office
                    </Link>
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    Need help planning?{' '}
                    <a
                      href="/contact"
                      className="text-green-600 hover:underline"
                    >
                      Contact us
                    </a>{' '}
                    for personalized assistance.
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 animate-pulse">
            Ready to Book Your Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Secure your spot on this amazing journey. Our travel experts are
            waiting to assist you with your booking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/inquiry"
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg min-w-[160px] h-[48px] flex items-center justify-center"
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg min-w-[160px] h-[48px] flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
// Sample package data
const packageDetails = {
  heritage: {
    title: 'Sri Lanka Explorer',
    subtitle:
      'Experience the rich cultural heritage, stunning landscapes, and diverse wildlife of Sri Lanka with our comprehensive 14-day tour package.',
    tag: 'Best Seller',
    duration: '14 Days, 13 Nights',
    location: 'Sri Lanka',
    maxPeople: 12,
    price: 2999,
    oldPrice: 3499,
    discount: 14,
    rating: 5,
    reviewCount: 128,
    heroImage:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/j4eKVgUgWV71nCcAmRW6iS/dalada.jpg',
    overview:
      "This 14-day Sri Lanka tour takes you on an unforgettable journey through the island's ancient cities, lush landscapes, and pristine beaches. From the historic ruins of Anuradhapura to the colonial charm of Galle, you'll experience the incredible diversity that Sri Lanka has to offer. Enjoy Ayurvedic wellness treatments, wildlife safaris, cultural performances, and relaxing beach stays. Our expert guides will introduce you to the rich history, vibrant culture, and warm hospitality of this tropical paradise.",
    highlights: [
      {
        title: 'Ancient Cities',
        description:
          'Explore UNESCO World Heritage sites including Anuradhapura, Sigiriya Rock Fortress, and Dambulla Cave Temple.',
      },
      {
        title: 'Wildlife Encounters',
        description:
          'Experience thrilling safaris in Udawalawe National Park and see elephants in their natural habitat.',
      },
      {
        title: 'Cultural Immersion',
        description:
          'Visit the sacred Temple of the Tooth Relic, participate in village tours, and enjoy traditional performances.',
      },
      {
        title: 'Coastal Beauty',
        description:
          'Relax on stunning beaches and explore the historic Dutch fort in Galle along the southern coast.',
      },
    ],
    gallery: [
      'https://uploadthingy.s3.us-west-1.amazonaws.com/j4eKVgUgWV71nCcAmRW6iS/dalada.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/uAozGnBab3LdZQ7d1fn3sg/sigiriya1.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/umKpchjBUtECmnTjGTnjYM/nature6.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/aTZSB7mBzfn66eDfENGjXR/beach1.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/4iNbKQDGe98ZafS1FcUK9A/safari2.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/v28W2BPQ8qMpZvG8piC1mz/safari5.jpg',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Sri Lanka',
        location: 'Colombo Airport - Negombo',
        description:
          "Upon arrival at Bandaranaike International Airport, you'll be greeted by our representative and transferred to your hotel in Negombo. Enjoy the rest of the day at leisure to recover from your flight and perhaps take a stroll along Negombo's beach strip.",
        activities: [
          'Airport pickup',
          'Hotel check-in',
          'Leisure time at Negombo Beach',
        ],
        meals: 'Dinner',
        accommodation: 'Overnight stay at Negombo Hotel',
      },
      {
        day: 2,
        title: 'Ancient City Exploration',
        location: 'Negombo - Anuradhapura',
        description:
          "After breakfast, drive to Anuradhapura, Sri Lanka's ancient first capital. Anuradhapura is a UNESCO World Heritage Site that contains a rich collection of archaeological and architectural wonders: enormous dagobas (brick stupas), ancient pools, and crumbling temples built during Anuradhapura's thousand years of rule over Sri Lanka.",
        activities: [
          'Drive to Anuradhapura',
          'Visit ancient ruins and archaeological sites',
          'Sri Maha Bodhi (sacred fig tree)',
          'Ruwanwelisaya Stupa',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Overnight stay at Anuradhapura Hotel',
      },
      {
        day: 3,
        title: 'Journey to Habarana',
        location: 'Anuradhapura - Habarana',
        description:
          "Continue your journey through Sri Lanka's Cultural Triangle as we travel from Anuradhapura to Habarana. This central location serves as an excellent base to explore the surrounding attractions over the next couple of days.",
        activities: [
          'Drive to Habarana',
          'Visit local markets',
          'Evening leisure time',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Overnight stay at Habarana Hotel',
      },
      {
        day: 4,
        title: 'Sigiriya Rock Fortress & Wellness',
        location: 'Habarana - Sigiriya - Habarana',
        description:
          'Today, visit the iconic Sigiriya Rock Fortress, a UNESCO World Heritage Site. Climb the 1,200 steps to see the magnificent frescoes and the remains of an ancient civilization. In the afternoon, enjoy an authentic Ayurvedic wellness treatment and experience rural Sri Lankan life with a village tour. End the day with a climb up Pidurangala Rock for a spectacular sunset view of Sigiriya.',
        activities: [
          'Sigiriya Rock Fortress visit',
          'Ayurvedic wellness treatment',
          'Traditional village tour',
          'Pidurangala Rock sunset hike',
        ],
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Overnight stay at Habarana Hotel',
      },
      {
        day: 5,
        title: 'Spices & Sacred Caves',
        location: 'Habarana - Matale',
        description:
          "Today's journey takes you to Matale with several fascinating stops along the way. Visit a spice garden to learn about Sri Lanka's famous spices and their medicinal properties. Enjoy a trekking tour in the Knuckles Mountain Range, a UNESCO World Heritage Site known for its rich biodiversity. In the afternoon, explore the magnificent Dambulla Cave Temple, another UNESCO site featuring 153 Buddha statues and stunning ceiling frescoes dating back to the 1st century BC.",
        activities: [
          'Spice Garden tour in Matale',
          'Knuckles Range trekking tour',
          'Dambulla Cave Temple exploration',
        ],
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Overnight stay at Matale Hotel',
      },
      {
        day: 6,
        title: 'Cultural Capital Kandy',
        location: 'Matale - Kandy',
        description:
          "Travel to Kandy, the last capital of the ancient kings' era of Sri Lanka and a UNESCO World Heritage Site. Spend the day exploring this sacred city with its beautiful lake, bustling markets, and cultural sites. Visit the Temple of the Tooth Relic, which houses the sacred tooth relic of the Buddha, and the beautiful Royal Botanical Gardens in Peradeniya. Also visit a silk and batik factory to see traditional craftsmanship and the Gem Museum to learn about Sri Lanka's precious stones. End the day with a walk through the Udawattakale Sanctuary.",
        activities: [
          'Kandy city tour',
          'Temple of the Tooth Relic visit',
          'Royal Botanical Garden exploration',
          'Silk and Batik factory tour',
          'Gem Museum visit',
          'Udawattakale Sanctuary walk',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Overnight stay at Kandy Hotel',
      },
      {
        day: 7,
        title: 'Journey to the Hills',
        location: 'Kandy - Nuwara Eliya',
        description:
          "After breakfast, drive to Nuwara Eliya, known as 'Little England' for its cool climate and colonial architecture. Visit a tea factory to learn about the tea-making process and enjoy a tasting of Ceylon's finest tea. Explore Gregory Lake, Victoria Park, and the charming town center with its colonial-era buildings and well-kept gardens.",
        activities: [
          'Scenic drive to Nuwara Eliya',
          'Tea factory tour and tasting',
          'Gregory Lake visit',
          'Victoria Park exploration',
          'Nuwara Eliya town tour',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Overnight stay at Nuwara Eliya Hotel',
      },
      {
        day: 8,
        title: 'Hill Country Exploration',
        location: 'Nuwara Eliya',
        description:
          'Spend a full day exploring the beautiful surroundings of Nuwara Eliya. Take a morning walk in the hills, visit Horton Plains National Park (optional), or simply relax and enjoy the cool climate and beautiful scenery of the tea country.',
        activities: [
          'Morning nature walk',
          'Optional Horton Plains National Park visit',
          'Tea plantation visit',
          'Leisure time in Nuwara Eliya',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Overnight stay at Nuwara Eliya Hotel',
      },
      {
        day: 9,
        title: 'Wildlife Safari Adventure',
        location: 'Nuwara Eliya - Udawalawe',
        description:
          "Travel from the cool highlands to the warmer plains as we journey to Udawalawe. In the afternoon, enjoy a thrilling safari in Udawalawe National Park, famous for its large herds of elephants and diverse birdlife. Later, visit the Elephant Transit Home, where orphaned baby elephants are rehabilitated before being released back into the wild. You'll have the opportunity to watch the feeding of these baby elephants.",
        activities: [
          'Drive to Udawalawe',
          'Udawalawe National Park safari',
          'Elephant Transit Home visit (milk feeding for baby elephants)',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Overnight stay at Udawalawe Hotel',
      },
      {
        day: 10,
        title: 'Coastal Heritage',
        location: 'Udawalawe - Galle',
        description:
          'Drive to the southern coast to the historic city of Galle. Explore the well-preserved Galle Dutch Fort, a UNESCO World Heritage Site with its charming narrow streets, colonial buildings, and rampart walls. In the afternoon, relax at the beautiful Unawatuna Beach, known for its golden sands and clear waters.',
        activities: [
          'Drive to Galle',
          'Galle Dutch Fort exploration',
          'Unawatuna Beach relaxation',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Overnight stay at Galle Hotel',
      },
      {
        day: 11,
        title: 'Coastal Relaxation',
        location: 'Galle - Bentota',
        description:
          'Travel along the scenic southern coast to Bentota, a popular beach destination. En route, enjoy a boat safari on the Madu River, exploring its complex ecosystem of mangroves and islands. Visit the Meetiyagoda Moonstone mines to see how these precious stones are extracted and processed. Also stop at a turtle hatchery to learn about conservation efforts for endangered sea turtles.',
        activities: [
          'Drive to Bentota',
          'Madu River boat safari',
          'Meetiyagoda Moonstone mines visit',
          'Turtle hatchery tour',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Overnight stay at Bentota Hotel',
      },
      {
        day: 12,
        title: 'Beach Leisure Day',
        location: 'Bentota',
        description:
          'Enjoy a full day of leisure on the beautiful beaches of Bentota. Relax on the golden sands, swim in the clear waters of the Indian Ocean, or participate in optional water sports activities. You can also choose to have an Ayurvedic spa treatment at your hotel.',
        activities: [
          'Beach relaxation',
          'Optional water sports',
          'Optional Ayurvedic spa treatments',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Overnight stay at Bentota Hotel',
      },
      {
        day: 13,
        title: 'Capital City Exploration',
        location: 'Bentota - Colombo',
        description:
          "After breakfast, drive to Colombo, Sri Lanka's vibrant capital city. Enjoy a comprehensive city tour including the historic Fort area, the bustling Pettah market, Independence Square, Gangaramaya Temple, and the National Museum. You'll also have time for some last-minute shopping at Paradise Road, Barefoot, or Odel shopping centers.",
        activities: [
          'Drive to Colombo',
          'Colombo city tour',
          'Independence Square visit',
          'Gangaramaya Temple exploration',
          'National Museum visit',
          'Shopping time',
        ],
        meals: 'Breakfast, Farewell Dinner',
        accommodation: 'Overnight stay at Colombo Hotel',
      },
      {
        day: 14,
        title: 'Departure',
        location: 'Colombo',
        description:
          'After breakfast, check out from your hotel and transfer to Bandaranaike International Airport for your departure flight. End of our services.',
        activities: ['Airport transfer'],
        meals: 'Breakfast',
        accommodation: null,
      },
    ],
    faqs: [
      {
        question: 'Do I need a visa for Sri Lanka?',
        answer:
          'Most nationalities require a visa or ETA (Electronic Travel Authorization) to enter Sri Lanka. This can be obtained online before travel through the official Sri Lanka ETA website. Some countries may be eligible for visa on arrival, but we recommend securing your visa in advance.',
      },
      {
        question: 'What is the best time to visit Sri Lanka?',
        answer:
          'Sri Lanka has a tropical climate with distinct wet and dry seasons that vary by region. The best time for this tour is during the dry season from December to March when the weather is most favorable across the country. However, Sri Lanka can be visited year-round, with the monsoon affecting different parts of the island at different times.',
      },
      {
        question: 'How physically demanding is this tour?',
        answer:
          'This tour involves moderate physical activity, including climbing steps at Sigiriya Rock Fortress (approximately 1,200 steps), walking through archaeological sites, and a trekking tour in the Knuckles Range. However, most activities can be adjusted based on your fitness level, and alternatives can be arranged for those with mobility issues.',
      },
      {
        question: 'What should I pack for this trip?',
        answer:
          'Pack lightweight, breathable clothing for hot and humid conditions. Include modest attire (covering shoulders and knees) for visiting temples and religious sites. Bring comfortable walking shoes, a hat, sunglasses, sunscreen, insect repellent, and a light rain jacket. A swimsuit is essential for beach days, and a light sweater or jacket for the cooler climate in Nuwara Eliya.',
      },
      {
        question: 'Is it safe to drink tap water in Sri Lanka?',
        answer:
          'It is recommended to drink bottled or filtered water throughout your journey in Sri Lanka. Bottled water will be provided during tours and is readily available at hotels and restaurants.',
      },
      {
        question: 'What currency should I bring?',
        answer:
          'The currency in Sri Lanka is the Sri Lankan Rupee (LKR). US Dollars and Euros can be exchanged at banks, hotels, and authorized money changers. ATMs are widely available in cities and major tourist areas. Credit cards are accepted at most hotels and larger establishments but have cash for smaller vendors and tips.',
      },
      {
        question: 'Will I have access to Wi-Fi during the tour?',
        answer:
          'Wi-Fi is available at all hotels, though connection quality may vary, especially in more remote areas. You can also purchase a local SIM card with data upon arrival at the airport for affordable internet access throughout your trip.',
      },
      {
        question: 'Can dietary restrictions be accommodated?',
        answer:
          'Yes, most dietary restrictions can be accommodated with advance notice. Sri Lankan cuisine offers many vegetarian options naturally. Please inform us of any specific requirements when booking so we can make appropriate arrangements.',
      },
    ],
    relatedPackages: [
      {
        id: '09-days-08-nights',
        title: 'Beach & Safari Expedition',
        duration: '9 Days, 8 Nights',
        description:
          'The perfect blend of relaxation and adventure with pristine beaches and thrilling wildlife safaris.',
        tag: 'Popular',
        image:
          'https://uploadthingy.s3.us-west-1.amazonaws.com/4iNbKQDGe98ZafS1FcUK9A/safari2.jpg',
      },
      {
        id: 'wildlife-safari',
        title: 'Wildlife Safari',
        duration: '8 Days, 7 Nights',
        description:
          'Witness majestic wildlife in their natural habitat on an unforgettable safari adventure.',
        tag: null,
        image:
          'https://uploadthingy.s3.us-west-1.amazonaws.com/v28W2BPQ8qMpZvG8piC1mz/safari5.jpg',
      },
    ],
  },
  safari: {
    title: 'Beach & Safari Expedition',
    subtitle:
      'The perfect blend of relaxation and adventure with pristine beaches and thrilling wildlife safaris in one package.',
    tag: 'Popular',
    duration: '9 Days, 8 Nights',
    location: 'Sri Lanka',
    maxPeople: 10,
    price: 1899,
    oldPrice: 2299,
    discount: 17,
    rating: 4,
    reviewCount: 96,
    heroImage:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/4iNbKQDGe98ZafS1FcUK9A/safari2.jpg',
    overview:
      "This 9-day expedition combines the best of both worlds: the thrill of wildlife safaris and the relaxation of pristine beaches. Begin your journey with exciting game drives in Sri Lanka's famous wildlife parks, where you'll witness the incredible diversity of wildlife in their natural habitat. Then unwind on the beautiful beaches of the southern coast, enjoying crystal-clear waters and white sand beaches. This perfectly balanced itinerary offers adventure, relaxation, and unforgettable experiences.",
    highlights: [
      {
        title: 'Big Five Safari',
        description:
          'Spot elephants, leopards, sloth bears, water buffalo, and numerous bird species in their natural habitat during game drives.',
      },
      {
        title: 'Wildlife Encounters',
        description:
          'Witness spectacular wildlife across multiple national parks including Yala, Udawalawe, and Minneriya.',
      },
      {
        title: 'Tropical Paradise',
        description:
          'Relax on the pristine white sand beaches of southern Sri Lanka with crystal-clear turquoise waters.',
      },
      {
        title: 'Cultural Experiences',
        description:
          'Visit traditional villages and explore the historic sites along the southern coast.',
      },
    ],
    gallery: [
      'https://uploadthingy.s3.us-west-1.amazonaws.com/v28W2BPQ8qMpZvG8piC1mz/safari5.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/4iNbKQDGe98ZafS1FcUK9A/safari2.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/aTZSB7mBzfn66eDfENGjXR/beach1.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/jh8EH1fsnWUQZd1GUr5t9h/nature.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/umKpchjBUtECmnTjGTnjYM/nature6.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/uAozGnBab3LdZQ7d1fn3sg/sigiriya1.jpg',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Colombo',
        location: 'Colombo, Sri Lanka',
        description:
          "Upon arrival at Bandaranaike International Airport, you'll be met by our representative and transferred to your hotel in Colombo. Enjoy a welcome dinner and briefing about your safari adventure.",
        activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner'],
        meals: 'Dinner',
        accommodation: '4-star hotel in Colombo',
      },
      {
        day: 2,
        title: 'Minneriya National Park',
        location: 'Colombo - Habarana, Sri Lanka',
        description:
          'After breakfast, drive to Habarana in the Cultural Triangle. In the afternoon, enjoy a safari in Minneriya National Park, famous for its large gatherings of Asian elephants during the dry season. This natural phenomenon, known as "The Gathering," is one of the most spectacular wildlife events in Asia.',
        activities: ['Drive to Habarana', 'Afternoon safari in Minneriya'],
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Safari lodge in Habarana',
      },
      {
        day: 3,
        title: 'Cultural Exploration and Wildlife',
        location: 'Habarana, Sri Lanka',
        description:
          'Morning visit to the ancient rock fortress of Sigiriya, a UNESCO World Heritage site. After lunch, enjoy another safari in either Minneriya or Kaudulla National Park, depending on the season and elephant movements. The evening is at leisure to relax at your lodge.',
        activities: [
          'Sigiriya Rock Fortress visit',
          'Afternoon wildlife safari',
          'Evening relaxation',
        ],
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Safari lodge in Habarana',
      },
      {
        day: 4,
        title: 'Journey to Kandy',
        location: 'Habarana - Kandy, Sri Lanka',
        description:
          "After breakfast, drive to the cultural capital of Kandy. En route, visit a spice garden to learn about Sri Lanka's famous spices. In Kandy, visit the sacred Temple of the Tooth Relic and enjoy a cultural dance performance in the evening.",
        activities: [
          'Drive to Kandy',
          'Spice garden visit',
          'Temple of the Tooth Relic',
          'Cultural dance performance',
        ],
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Hotel in Kandy',
      },
      {
        day: 5,
        title: 'Udawalawe National Park',
        location: 'Kandy - Udawalawe, Sri Lanka',
        description:
          'Journey from Kandy to Udawalawe National Park. In the afternoon, enjoy a safari in this park known for its large elephant population. The park is also home to water buffalo, sambar deer, monkeys, and numerous bird species. Visit the Elephant Transit Home, where orphaned baby elephants are rehabilitated before being released back into the wild.',
        activities: [
          'Drive to Udawalawe',
          'Afternoon safari in Udawalawe National Park',
          'Elephant Transit Home visit',
        ],
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Safari lodge in Udawalawe',
      },
      {
        day: 6,
        title: 'Yala National Park',
        location: 'Udawalawe - Yala, Sri Lanka',
        description:
          'After breakfast, drive to Yala National Park. Enjoy an afternoon safari in Yala, which boasts the highest density of leopards in the world. The park is also home to elephants, sloth bears, crocodiles, and over 200 bird species.',
        activities: ['Drive to Yala', 'Afternoon safari in Yala National Park'],
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Safari lodge near Yala',
      },
      {
        day: 7,
        title: 'Beach Relaxation',
        location: 'Yala - Tangalle/Mirissa, Sri Lanka',
        description:
          'Early morning safari in Yala National Park for another chance to spot leopards and other wildlife. After the safari, drive to the southern coast. Depending on your preference, stay in either Tangalle or Mirissa, both known for their beautiful beaches. Afternoon at leisure to relax on the beach.',
        activities: [
          'Morning safari in Yala National Park',
          'Drive to southern coast',
          'Beach relaxation',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Beach resort in Tangalle/Mirissa',
      },
      {
        day: 8,
        title: 'Galle Exploration',
        location: 'Tangalle/Mirissa - Galle - Tangalle/Mirissa, Sri Lanka',
        description:
          'Morning at leisure on the beach. In the afternoon, visit the historic Galle Fort, a UNESCO World Heritage site with a fascinating blend of European and South Asian architectural styles. Explore the narrow streets, visit boutique shops, and walk along the ramparts for stunning ocean views. Return to your beach resort for a farewell dinner.',
        activities: [
          'Beach relaxation',
          'Galle Fort exploration',
          'Farewell dinner',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Beach resort in Tangalle/Mirissa',
      },
      {
        day: 9,
        title: 'Departure',
        location: 'Tangalle/Mirissa - Colombo, Sri Lanka',
        description:
          'After breakfast, transfer to Bandaranaike International Airport for your departure flight. End of our services.',
        activities: ['Airport transfer'],
        meals: 'Breakfast',
        accommodation: null,
      },
    ],
    faqs: [
      {
        question:
          'When is the best time to visit Sri Lanka for wildlife viewing?',
        answer:
          'The dry season from May to September is generally best for wildlife viewing in the Cultural Triangle and eastern parks like Yala. For the southern and western parks, December to March is ideal. However, wildlife can be seen year-round in Sri Lanka.',
      },
      {
        question: 'Do I need vaccinations for this trip?',
        answer:
          'While there are no mandatory vaccinations for Sri Lanka, it is recommended to be up to date with routine vaccinations. Hepatitis A, Typhoid, and Tetanus vaccinations are also recommended. Please consult your healthcare provider for personalized advice.',
      },
      {
        question: 'What type of clothing should I pack?',
        answer:
          'For safaris: neutral-colored clothing (beige, khaki, olive), long-sleeved shirts and pants for protection from sun and insects, a hat, and comfortable closed shoes. For beaches: light, breathable clothing, swimwear, and a cover-up. A modest outfit is recommended for visiting temples.',
      },
      {
        question: 'What is the accommodation like during the safari portion?',
        answer:
          'We use a mix of comfortable safari lodges and tented camps, all with private bathrooms and essential amenities. The accommodations are chosen for their proximity to national parks and quality of service.',
      },
      {
        question: 'Is it safe to swim in the ocean in Sri Lanka?',
        answer:
          'Yes, swimming is generally safe at designated beach areas, especially at resort beaches. Be aware of seasonal currents and always follow local advice regarding sea conditions. Some beaches have strong undertows during certain times of the year.',
      },
      {
        question: 'What currency should I bring?',
        answer:
          'The Sri Lankan Rupee (LKR) is the local currency. US Dollars are widely accepted at tourist establishments and can be exchanged at banks, hotels, and authorized money changers. ATMs are available in major towns. Credit cards are accepted at most hotels and larger establishments but have cash for smaller vendors and tips.',
      },
      {
        question: 'Will I have access to Wi-Fi during the safari?',
        answer:
          'Wi-Fi is available at most lodges and hotels, though the connection may be slow or intermittent, especially in remote wildlife areas. Beach resorts typically offer reliable Wi-Fi.',
      },
    ],
    relatedPackages: [
      {
        id: '14-days-13-nights',
        title: 'Complete Heritage Explorer',
        duration: '14 Days, 13 Nights',
        description:
          'Experience the rich cultural heritage with our comprehensive 14-day tour package that covers all major historical sites.',
        tag: 'Best Seller',
        image:
          'https://uploadthingy.s3.us-west-1.amazonaws.com/j4eKVgUgWV71nCcAmRW6iS/dalada.jpg',
      },
      {
        id: 'wildlife-safari',
        title: 'Wildlife Safari',
        duration: '8 Days, 7 Nights',
        description:
          'Witness majestic wildlife in their natural habitat on an unforgettable safari adventure.',
        tag: null,
        image:
          'https://uploadthingy.s3.us-west-1.amazonaws.com/v28W2BPQ8qMpZvG8piC1mz/safari5.jpg',
      },
    ],
  },
  sriLanka: {
    title: 'Sri Lanka Highlights Tour',
    subtitle:
      'Experience the best of Sri Lanka with this compact tour covering all major highlights of the island in just 8 days.',
    tag: 'Best Value',
    duration: '8 Days, 7 Nights',
    location: 'Sri Lanka',
    maxPeople: 12,
    price: 1599,
    oldPrice: 1899,
    discount: 16,
    rating: 5,
    reviewCount: 87,
    heroImage:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/uAozGnBab3LdZQ7d1fn3sg/sigiriya1.jpg',
    overview:
      "This 8-day Sri Lanka tour offers the perfect introduction to the island's most iconic attractions. From the ancient rock fortress of Sigiriya to the colonial charm of Galle, you'll experience Sri Lanka's rich cultural heritage, stunning landscapes, and diverse wildlife. Explore UNESCO World Heritage sites, visit tea plantations, take a safari in Yala National Park, and relax on beautiful beaches. This carefully crafted itinerary provides a comprehensive overview of Sri Lanka's highlights while maintaining a comfortable pace.",
    highlights: [
      {
        title: 'Ancient Wonders',
        description:
          'Climb the iconic Sigiriya Rock Fortress and explore the sacred Temple of the Tooth Relic in Kandy.',
      },
      {
        title: 'Scenic Landscapes',
        description:
          'Journey through misty mountains in Nuwara Eliya and witness the breathtaking Nine Arch Bridge in Ella.',
      },
      {
        title: 'Wildlife Safari',
        description:
          'Spot leopards, elephants, and other wildlife during a thrilling safari in Yala National Park.',
      },
      {
        title: 'Coastal Heritage',
        description:
          'Explore the historic Galle Fort and relax on the beautiful beaches of southern Sri Lanka.',
      },
    ],
    gallery: [
      'https://uploadthingy.s3.us-west-1.amazonaws.com/j4eKVgUgWV71nCcAmRW6iS/dalada.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/uAozGnBab3LdZQ7d1fn3sg/sigiriya1.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/jh8EH1fsnWUQZd1GUr5t9h/nature.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/aTZSB7mBzfn66eDfENGjXR/beach1.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/umKpchjBUtECmnTjGTnjYM/nature6.jpg',
      'https://uploadthingy.s3.us-west-1.amazonaws.com/4iNbKQDGe98ZafS1FcUK9A/safari2.jpg',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Journey to Sigiriya',
        location: 'Colombo Airport - Sigiriya',
        description:
          "Welcome to Sri Lanka! Upon arrival at Bandaranaike International Airport, you'll be greeted by your guide and driver. After a warm welcome, begin your journey to Sigiriya, located in the Cultural Triangle. En route, stop at the Pinnawala Elephant Orphanage to observe the feeding and bathing of elephants. Continue to Sigiriya and check into your hotel for some rest before tomorrow's adventures.",
        activities: [
          'Airport pickup and welcome',
          'Visit to Pinnawala Elephant Orphanage',
          'Drive to Sigiriya',
          'Evening relaxation at hotel',
        ],
        meals: 'Dinner',
        accommodation: 'Hotel in Sigiriya',
      },
      {
        day: 2,
        title: 'Sigiriya Rock and Journey to Kandy',
        location: 'Sigiriya - Kandy',
        description:
          "Early morning climb to the UNESCO World Heritage Site of Sigiriya Rock Fortress, a 5th-century rock citadel with ancient frescoes and impressive water gardens. After descending, visit the ancient city of Polonnaruwa or the Dambulla Cave Temple (optional). In the afternoon, depart for Kandy, stopping at a spice garden in Matale to learn about Sri Lanka's famous spices and their medicinal properties. Arrive in Kandy by evening and check into your hotel.",
        activities: [
          'Sigiriya Rock Fortress climb',
          'Optional visit to Polonnaruwa or Dambulla Cave Temple',
          'Spice garden tour in Matale',
          'Drive to Kandy',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Hotel in Kandy',
      },
      {
        day: 3,
        title: 'Kandy to Nuwara Eliya',
        location: 'Kandy - Nuwara Eliya',
        description:
          "Morning visit to the Temple of the Sacred Tooth Relic, which houses a tooth of Buddha and is considered Sri Lanka's most important Buddhist relic. Explore the Royal Botanical Gardens in Peradeniya, featuring a vast collection of orchids, spices, and medicinal plants. After lunch, journey to Nuwara Eliya, known as 'Little England' for its cool climate and colonial architecture. En route, visit a tea plantation and factory to learn about the tea-making process and enjoy a tasting of Ceylon's finest tea.",
        activities: [
          'Temple of the Sacred Tooth Relic visit',
          'Royal Botanical Gardens exploration',
          'Scenic drive to Nuwara Eliya',
          'Tea plantation and factory tour',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Hotel in Nuwara Eliya',
      },
      {
        day: 4,
        title: 'Nuwara Eliya to Ella',
        location: 'Nuwara Eliya - Ella',
        description:
          "Morning at leisure to explore the charming town of Nuwara Eliya with its colonial-era buildings and well-kept gardens. Option to visit Horton Plains National Park (additional cost) for a hike to World's End, offering breathtaking views. Later, take one of the world's most scenic train journeys from Nanu Oya to Ella (subject to availability), passing through misty mountains, tea plantations, and picturesque villages. If train tickets are unavailable, the journey will be made by road. Arrive in Ella and check into your hotel.",
        activities: [
          'Nuwara Eliya town exploration',
          'Optional Horton Plains National Park visit',
          'Scenic train journey to Ella (if available)',
          'Evening at leisure in Ella',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Hotel in Ella',
      },
      {
        day: 5,
        title: 'Ella to Tissamaharama (Yala)',
        location: 'Ella - Tissamaharama',
        description:
          "Morning visit to the famous Nine Arch Bridge, an iconic colonial-era railway bridge surrounded by lush tea plantations. Optionally hike to Little Adam's Peak for panoramic views of the surrounding hills and valleys. After lunch, drive to Tissamaharama, the gateway to Yala National Park. En route, stop at Ravana Falls, a popular cascading waterfall associated with the legend of Ravana from the Hindu epic Ramayana. Arrive in Tissamaharama by evening and prepare for tomorrow's wildlife safari.",
        activities: [
          'Nine Arch Bridge visit',
          'Optional Little Adam',
          'Ravana Falls stop',
          'Drive to Tissamaharama',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Hotel in Tissamaharama',
      },
      {
        day: 6,
        title: 'Yala Safari and Journey to Galle/Mirissa',
        location: 'Tissamaharama - Galle/Mirissa',
        description:
          'Early morning safari in Yala National Park, home to the highest density of leopards in the world. The park also hosts elephants, sloth bears, crocodiles, and numerous bird species. After the safari and breakfast, journey to the southern coast. Depending on your preference, stay in the historic city of Galle with its UNESCO-listed Dutch Fort or the beach town of Mirissa known for its golden sands and whale watching opportunities (seasonal). Afternoon at leisure to explore your chosen destination or relax by the beach.',
        activities: [
          'Morning safari in Yala National Park',
          'Drive to southern coast',
          'Galle Fort exploration or beach time in Mirissa',
          'Evening relaxation',
        ],
        meals: 'Breakfast, Dinner',
        accommodation: 'Hotel in Galle or Mirissa',
      },
      {
        day: 7,
        title: 'Galle to Colombo',
        location: 'Galle - Colombo',
        description:
          "Morning exploration of Galle Dutch Fort, a UNESCO World Heritage Site with its charming narrow streets, colonial buildings, and rampart walls. If staying in Mirissa, enjoy morning beach time or optional whale watching (seasonal, additional cost). After lunch, drive to Colombo, Sri Lanka's vibrant capital city. En route, you may stop at the Kosgoda Turtle Hatchery to learn about conservation efforts for endangered sea turtles. Arrive in Colombo for a city tour including the historic Fort area, Pettah market, Independence Square, and Gangaramaya Temple. Evening farewell dinner at a local restaurant.",
        activities: [
          'Galle Fort exploration or Mirissa beach time',
          'Optional turtle hatchery visit',
          'Drive to Colombo',
          'Colombo city tour',
          'Farewell dinner',
        ],
        meals: 'Breakfast, Farewell Dinner',
        accommodation: 'Hotel in Colombo',
      },
      {
        day: 8,
        title: 'Departure',
        location: 'Colombo - Airport',
        description:
          'After breakfast, depending on your flight time, you may have some free time for last-minute shopping at Paradise Road, Barefoot, or Odel shopping centers. At the appropriate time, transfer to Bandaranaike International Airport for your departure flight. End of our services.',
        activities: ['Optional shopping time', 'Airport transfer'],
        meals: 'Breakfast',
        accommodation: null,
      },
    ],
    faqs: [
      {
        question: 'What is the best time to visit Sri Lanka?',
        answer:
          'Sri Lanka has a tropical climate with distinct wet and dry seasons that vary by region. The best time for this tour is during the dry season from December to March when the weather is most favorable across the country. However, Sri Lanka can be visited year-round, with the monsoon affecting different parts of the island at different times.',
      },
      {
        question: 'How physically demanding is this tour?',
        answer:
          'This tour involves moderate physical activity, including climbing steps at Sigiriya Rock Fortress (approximately 1,200 steps), walking through archaeological sites, and optional hiking. However, most activities can be adjusted based on your fitness level, and alternatives can be arranged for those with mobility issues.',
      },
      {
        question: 'What should I pack for this trip?',
        answer:
          'Pack lightweight, breathable clothing for hot and humid conditions. Include modest attire (covering shoulders and knees) for visiting temples and religious sites. Bring comfortable walking shoes, a hat, sunglasses, sunscreen, insect repellent, and a light rain jacket. A swimsuit is essential for beach days, and a light sweater or jacket for the cooler climate in Nuwara Eliya.',
      },
      {
        question: 'Is it safe to drink tap water in Sri Lanka?',
        answer:
          'It is recommended to drink bottled or filtered water throughout your journey in Sri Lanka. Bottled water will be provided during tours and is readily available at hotels and restaurants.',
      },
      {
        question: 'What currency should I bring?',
        answer:
          'The currency in Sri Lanka is the Sri Lankan Rupee (LKR). US Dollars and Euros can be exchanged at banks, hotels, and authorized money changers. ATMs are widely available in cities and major tourist areas. Credit cards are accepted at most hotels and larger establishments but have cash for smaller vendors and tips.',
      },
      {
        question: 'Will I have access to Wi-Fi during the tour?',
        answer:
          'Wi-Fi is available at all hotels, though connection quality may vary, especially in more remote areas. You can also purchase a local SIM card with data upon arrival at the airport for affordable internet access throughout your trip.',
      },
      {
        question: 'Can dietary restrictions be accommodated?',
        answer:
          'Yes, most dietary restrictions can be accommodated with advance notice. Sri Lankan cuisine offers many vegetarian options naturally. Please inform us of any specific requirements when booking so we can make appropriate arrangements.',
      },
      {
        question: 'What type of transportation is used during the tour?',
        answer:
          'You will travel in a private air-conditioned vehicle throughout the tour. The size of the vehicle depends on the number of participants. For the Yala National Park safari, you will use specialized 4x4 jeeps that are ideal for wildlife viewing.',
      },
    ],
    relatedPackages: [
      {
        id: '14-days-13-nights',
        title: 'Complete Heritage Explorer',
        duration: '14 Days, 13 Nights',
        description:
          'Experience the rich cultural heritage with our comprehensive 14-day tour package that covers all major historical sites.',
        tag: 'Best Seller',
        image:
          'https://uploadthingy.s3.us-west-1.amazonaws.com/j4eKVgUgWV71nCcAmRW6iS/dalada.jpg',
      },
      {
        id: '09-days-08-nights',
        title: 'Beach & Safari Expedition',
        duration: '9 Days, 8 Nights',
        description:
          'The perfect blend of relaxation and adventure with pristine beaches and thrilling wildlife safaris.',
        tag: 'Popular',
        image:
          'https://uploadthingy.s3.us-west-1.amazonaws.com/4iNbKQDGe98ZafS1FcUK9A/safari2.jpg',
      },
    ],
  },
}
export default PackageDetails
