import React, {
  useEffect,
  useState,
  useRef,
  cloneElement,
  lazy,
  memo,
} from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Star,
  ChevronRight,
  Phone,
  X,
  MessageCircle,
  Check,
  Clock,
  ShieldCheck,
  Compass,
  Award,
  Heart,
  Mail,
  Send,
  Upload,
  Camera,
  ChevronDown,
  Menu,
  Home as HomeIcon,
  Info,
  Package,
  Image,
  MessageSquare,
  ChevronUp,
} from 'lucide-react'
import SEO from '../components/SEO'
import AnimateOnScroll from '../components/AnimateOnScroll'
const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackFormData, setFeedbackFormData] = useState({
    name: '',
    location: '',
    text: '',
    rating: 5,
    avatar:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/7ZeCM38y7x8KydR9sXo9tA/happy_customer_4.jpg',
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [allTestimonials, setAllTestimonials] = useState(testimonials)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [contactSubmitSuccess, setContactSubmitSuccess] = useState(false)
  const [isTestimonialsExpanded, setIsTestimonialsExpanded] = useState(false)
  const [expandedDestinations, setExpandedDestinations] = useState({})
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const visibleSections = useRef({})
  const observerRefs = {
    quickInfo: useRef(null),
    introduction: useRef(null),
    destinations: useRef(null),
    packages: useRef(null),
    whyChoose: useRef(null),
    testimonials: useRef(null),
    contactUs: useRef(null),
  }
  const heroImages = [
    'https://uploadthingy.s3.us-west-1.amazonaws.com/gGzvCMaMXFDWcQtL9LQkh3/waterfall.png',
    'https://uploadthingy.s3.us-west-1.amazonaws.com/mPYWjQ8E2nPaESZwKPpVUN/waterflower.png',
    'https://uploadthingy.s3.us-west-1.amazonaws.com/q2JjRmo5vtJ6iV89TcjoBX/Tiger.png',
    'https://uploadthingy.s3.us-west-1.amazonaws.com/sTQZBRTWrQ7YWzmghXfNj7/Mountain.png',
  ]
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      // Create a preview URL for the selected image
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result)
        setFeedbackFormData((prev) => ({
          ...prev,
          avatar: fileReader.result,
        }))
      }
      fileReader.readAsDataURL(file)
    }
  }
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target
    setFeedbackFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleContactSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setContactSubmitSuccess(true)
      // Reset form after showing success message
      setTimeout(() => {
        setContactFormData({
          name: '',
          email: '',
          message: '',
        })
        setContactSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }
  const handleRatingChange = (rating) => {
    setFeedbackFormData((prev) => ({
      ...prev,
      rating,
    }))
  }
  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setAllTestimonials((prev) => [feedbackFormData, ...prev])
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        setShowFeedbackForm(false)
        setFeedbackFormData({
          name: '',
          location: '',
          text: '',
          rating: 5,
          avatar:
            'https://uploadthingy.s3.us-west-1.amazonaws.com/7ZeCM38y7x8KydR9sXo9tA/happy_customer_4.jpg',
        })
        setSelectedFile(null)
        setPreviewUrl(null)
      }, 2000)
    }, 1500)
  }
  const closeFeedbackForm = () => {
    setShowFeedbackForm(false)
    setSelectedFile(null)
    setPreviewUrl(null)
    setFeedbackFormData({
      name: '',
      location: '',
      text: '',
      rating: 5,
      avatar:
        'https://uploadthingy.s3.us-west-1.amazonaws.com/7ZeCM38y7x8KydR9sXo9tA/happy_customer_4.jpg',
    })
  }
  const toggleDestinationDetails = (id) => {
    setExpandedDestinations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }
  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
      })
      setShowMobileSidebar(false)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])
  useEffect(() => {
    const observers = {}
    // Create an intersection observer for each section
    Object.entries(observerRefs).forEach(([key, ref]) => {
      if (ref.current) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              visibleSections.current[key] = true
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
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showMobileSidebar &&
        !e.target.closest('.mobile-sidebar') &&
        !e.target.closest('.mobile-sidebar-toggle')
      ) {
        setShowMobileSidebar(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMobileSidebar])
  return (
    <div className="w-full">
      <SEO
        title="WinTours Sri Lanka - Unforgettable Sri Lankan Adventures"
        description="Explore the paradise island of Sri Lanka with our expertly crafted tours. From ancient temples to pristine beaches, experience the true essence of Sri Lanka."
        keywords="Sri Lanka tours, travel packages, Sri Lankan adventures, cultural tours, wildlife safari, beach holidays"
        ogImage="https://uploadthingy.s3.us-west-1.amazonaws.com/gGzvCMaMXFDWcQtL9LQkh3/waterfall.png"
      />
      {/* Mobile Sidebar Menu */}
      <button
        className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg z-50 md:hidden mobile-sidebar-toggle"
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        aria-label="Toggle sidebar menu"
      >
        {showMobileSidebar ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden mobile-sidebar ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center mb-2">
              <img
                src="https://uploadthingy.s3.us-west-1.amazonaws.com/u54FezGT7mEQfifZEYkdks/winTourlogo.png"
                alt="WinTours Sri Lanka Logo"
                className="h-10 mr-2 bg-white rounded-full p-1"
              />
              <h3 className="text-xl font-bold text-green-600">
                WinTours Sri Lanka
              </h3>
            </div>
          </div>
          <div className="overflow-y-auto flex-grow">
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() =>
                      scrollToSection({
                        current: document.body,
                      })
                    }
                    className="flex items-center w-full p-2 text-gray-700 rounded hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <HomeIcon size={18} className="mr-3 text-green-500" />
                    <span>Top</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(observerRefs.introduction)}
                    className="flex items-center w-full p-2 text-gray-700 rounded hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <Info size={18} className="mr-3 text-green-500" />
                    <span>About Sri Lanka</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(observerRefs.destinations)}
                    className="flex items-center w-full p-2 text-gray-700 rounded hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <MapPin size={18} className="mr-3 text-green-500" />
                    <span>Destinations</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(observerRefs.packages)}
                    className="flex items-center w-full p-2 text-gray-700 rounded hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <Package size={18} className="mr-3 text-green-500" />
                    <span>Tour Packages</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(observerRefs.whyChoose)}
                    className="flex items-center w-full p-2 text-gray-700 rounded hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <Award size={18} className="mr-3 text-green-500" />
                    <span>Why Choose Us</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(observerRefs.testimonials)}
                    className="flex items-center w-full p-2 text-gray-700 rounded hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <MessageSquare size={18} className="mr-3 text-green-500" />
                    <span>Testimonials</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(observerRefs.contactUs)}
                    className="flex items-center w-full p-2 text-gray-700 rounded hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <Phone size={18} className="mr-3 text-green-500" />
                    <span>Contact Us</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/packages"
              className="flex items-center justify-center w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              onClick={() => setShowMobileSidebar(false)}
            >
              <Package size={18} className="mr-2" />
              <span>View All Packages</span>
            </Link>
          </div>
        </div>
      </div>
      {/* Hero Section - Enhanced with better visual hierarchy and increased padding */}
      <section className="relative min-h-[100vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40 z-10"></div>
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100 animate-zoomIn' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${image}')`,
            }}
          ></div>
        ))}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center py-10 md:py-0">
          <div className="max-w-3xl pt-28 sm:pt-32 md:pt-40 lg:pt-44 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
            <span
              className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 sm:mb-6 opacity-0 animate-fadeInUp"
              style={{
                animationDelay: '0.02s',
                animationFillMode: 'forwards',
              }}
            >
              Discover Sri Lanka with Us
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white opacity-0 animate-fadeInUp font-display leading-tight"
              style={{
                animationDelay: '0.05s',
                animationFillMode: 'forwards',
              }}
            >
              <span className="text-green-400 block mb-2">
                WinTours Sri Lanka
              </span>
              Unforgettable
              <br />
              <span className="text-green-400">Adventures</span> Await
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 opacity-0 animate-fadeInUp max-w-2xl mt-4 sm:mt-6 text-center sm:text-left mx-auto sm:mx-0"
              style={{
                animationDelay: '0.08s',
                animationFillMode: 'forwards',
                willChange: 'transform, opacity',
              }}
            >
              Explore the paradise island with our expertly crafted tours. From
              ancient temples to pristine beaches, experience the true essence
              of Sri Lanka.
            </p>
            <div
              className="flex flex-wrap gap-4 opacity-100 md:opacity-0 animate-fadeInUp"
              style={{
                animationDelay: '0.1s',
                animationFillMode: 'forwards',
              }}
            >
              <Link
                to="/packages"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center h-[40px] text-sm btn-hover-effect"
              >
                Explore Packages <ArrowRight size={14} className="ml-2" />
              </Link>
              <Link
                to="/short-inquiry"
                className="bg-white hover:bg-gray-100 text-gray-900 px-5 py-2 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg h-[40px] flex items-center justify-center text-sm btn-hover-effect"
              >
                Quick Inquiry
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block">
          <ChevronDown size={40} className="text-white" />
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-green-400 scale-125' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>
      {/* Quick Info Section - Improved card design */}
      <section
        ref={observerRefs.quickInfo}
        className="bg-white py-12 sm:py-16 relative z-10"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <AnimateOnScroll
              animation="fade-up"
              delay={0.03}
              className="card-hover-effect h-full"
            >
              <div className="bg-gray-50 rounded-xl p-6 shadow-md flex items-center transform transition-transform hover:-translate-y-2 duration-300 h-full lg:h-[140px]">
                <div className="bg-green-100 rounded-full p-4 mr-4 flex-shrink-0">
                  <ShieldCheck size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg font-display">
                    100% Satisfaction
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Guaranteed experiences
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll
              animation="fade-up"
              delay={0.05}
              className="card-hover-effect h-full"
            >
              <div className="bg-gray-50 rounded-xl p-6 shadow-md flex items-center transform transition-transform hover:-translate-y-2 duration-300 h-full lg:h-[140px]">
                <div className="bg-green-100 rounded-full p-4 mr-4 flex-shrink-0">
                  <Award size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg font-display">
                    Best Price Guarantee
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Value for your money
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll
              animation="fade-up"
              delay={0.08}
              className="card-hover-effect h-full"
            >
              <div className="bg-gray-50 rounded-xl p-6 shadow-md flex items-center transform transition-transform hover:-translate-y-2 duration-300 h-full lg:h-[140px]">
                <div className="bg-green-100 rounded-full p-4 mr-4 flex-shrink-0">
                  <Compass size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg font-display">
                    Expert Local Guides
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Authentic experiences
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll
              animation="fade-up"
              delay={0.1}
              className="card-hover-effect h-full"
            >
              <div className="bg-gray-50 rounded-xl p-6 shadow-md flex items-center transform transition-transform hover:-translate-y-2 duration-300 h-full lg:h-[140px]">
                <div className="bg-green-100 rounded-full p-4 mr-4 flex-shrink-0">
                  <Clock size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg font-display">
                    24/7 Support
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Always here to help
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
      {/* Sri Lanka Introduction Section - Enhanced with better imagery */}
      <section
        ref={observerRefs.introduction}
        className="py-16 sm:py-20 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
            <AnimateOnScroll animation="fade-right" className="w-full md:w-1/2">
              <div className="relative">
                <div className="img-hover-zoom rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://uploadthingy.s3.us-west-1.amazonaws.com/d1JoSmq7L47akESbiX8JGT/bg1.png"
                    alt="Beautiful Sri Lanka Coastline"
                    className="w-full h-auto object-cover hover:shadow-2xl transition-shadow duration-300"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl hidden sm:block transform transition-transform duration-500 hover:scale-105">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-3 mr-3">
                      <Heart size={18} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base font-display">
                        Loved by Travelers
                      </h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className="text-yellow-400 fill-current"
                          />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">
                          5.0 (200+ reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Image Tiles */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <AnimateOnScroll
                  animation="fade-up"
                  delay={0.05}
                  className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="img-hover-zoom h-32 sm:h-36 md:h-40">
                    <img
                      src="https://uploadthingy.s3.us-west-1.amazonaws.com/eWhvRQGtWYxbJoFF4UsZLF/dambulla.png"
                      alt="Sri Lanka Temple"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll
                  animation="fade-up"
                  delay={0.1}
                  className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="img-hover-zoom h-32 sm:h-36 md:h-40">
                    <img
                      src="https://uploadthingy.s3.us-west-1.amazonaws.com/4MKD41iz5FniE4sRfmdJo6/train.png"
                      alt="Sri Lanka Train Journey"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll
                  animation="fade-up"
                  delay={0.15}
                  className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="img-hover-zoom h-32 sm:h-36 md:h-40">
                    <img
                      src="https://uploadthingy.s3.us-west-1.amazonaws.com/sQyaT4SGnooVinRTDa8RnN/wildlife.png"
                      alt="Sri Lanka Wildlife"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </AnimateOnScroll>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll
              animation="fade-left"
              delay={0.3}
              className="w-full md:w-1/2"
            >
              <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                About Sri Lanka
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 font-display leading-tight">
                Discover the Pearl of the Indian Ocean
              </h2>
              <p className="text-gray-700 mb-5 leading-relaxed text-base">
                Sri Lanka, a South Asian island nation, is a magnificent gift of
                nature. With its breathtaking mountains, cascading waterfalls,
                scenic coastlines, and diverse wildlife, it truly deserves to be
                called paradise on earth.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed text-base">
                As the only country where Theravāda Buddhism has been firmly
                established, Sri Lanka boasts a rich cultural heritage while
                promoting equality and cooperation among all nations.
              </p>
              <div className="space-y-4 mb-8">
                <AnimateOnScroll
                  animation="fade-left"
                  delay={0.1}
                  className="flex items-start transform transition-transform hover:translate-x-2 duration-300"
                >
                  <Check
                    size={20}
                    className="text-green-600 mr-3 mt-1 flex-shrink-0"
                  />
                  <p className="text-gray-700 text-base">
                    Rich cultural heritage spanning over 2,500 years
                  </p>
                </AnimateOnScroll>
                <AnimateOnScroll
                  animation="fade-left"
                  delay={0.15}
                  className="flex items-start transform transition-transform hover:translate-x-2 duration-300"
                >
                  <Check
                    size={20}
                    className="text-green-600 mr-3 mt-1 flex-shrink-0"
                  />
                  <p className="text-gray-700 text-base">
                    8 UNESCO World Heritage Sites in a compact area
                  </p>
                </AnimateOnScroll>
                <AnimateOnScroll
                  animation="fade-left"
                  delay={0.2}
                  className="flex items-start transform transition-transform hover:translate-x-2 duration-300"
                >
                  <Check
                    size={20}
                    className="text-green-600 mr-3 mt-1 flex-shrink-0"
                  />
                  <p className="text-gray-700 text-base">
                    Incredible biodiversity with unique wildlife
                  </p>
                </AnimateOnScroll>
              </div>
              <Link
                to="/packages"
                className="inline-flex items-center text-green-600 hover:text-green-800 font-medium group text-lg"
              >
                Explore Our Sri Lanka Tours{' '}
                <ArrowRight
                  size={18}
                  className="ml-2 transform group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
      {/* Featured Destinations - Enhanced card design */}
      <section
        ref={observerRefs.destinations}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-500 ${visibleSections.current.destinations ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
          >
            <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Explore Sri Lanka
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 font-display">
              Popular Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our handpicked selection of the most breathtaking and
              sought-after destinations in Sri Lanka.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${visibleSections.current.destinations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{
                  transitionDelay: `${0.1 + index * 0.1}s`,
                  willChange: 'transform, opacity',
                }}
              >
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex items-center text-white mb-2">
                      <MapPin size={18} className="mr-2 text-green-400" />
                      <span className="text-sm font-medium">
                        {destination.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">
                      {destination.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 text-base">
                    {expandedDestinations[destination.id]
                      ? destination.fullDescription || destination.description
                      : `${destination.description.substring(0, 120)}...`}
                  </p>
                  <button
                    onClick={() => toggleDestinationDetails(destination.id)}
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm group"
                  >
                    {expandedDestinations[destination.id]
                      ? 'Show Less'
                      : 'Discover More'}{' '}
                    <ArrowRight
                      size={14}
                      className="ml-1 transform group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`text-center mt-12 transition-all duration-700 ${visibleSections.current.destinations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{
              transitionDelay: '0.8s',
            }}
          >
            <Link
              to="/packages"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg min-w-[180px] h-[48px] text-base"
            >
              View All Destinations <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* Featured Packages - Enhanced with better visuals */}
      <section ref={observerRefs.packages} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-700 ${visibleSections.current.packages ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
          >
            <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Travel Packages
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 font-display">
              Our Popular Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Choose from our carefully crafted travel packages designed to
              provide you with the ultimate Sri Lanka experience.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10">
            <div
              className={`bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 ${visibleSections.current.packages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{
                transitionDelay: '0.05s',
              }}
            >
              <div className="md:w-2/5 relative">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/obwacKgv1BhiiTsDVFzPaT/bg3.png"
                  alt="14 Days Adventure"
                  className="w-full h-64 md:h-full object-cover transition-transform duration-700 hover:scale-105"
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
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-base font-medium transition-all transform hover:scale-105 hover:shadow-md min-w-[140px] h-[44px] flex items-center justify-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={`bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 ${visibleSections.current.packages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{
                transitionDelay: '0.1s',
              }}
            >
              <div className="md:w-2/5 relative">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/73AwLdEJo1TiQf7DgDmsKX/galle_fort.png"
                  alt="9 Days Adventure"
                  className="w-full h-64 md:h-full object-cover transition-transform duration-700 hover:scale-105"
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
                  Beach & Safari Expedition
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
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-base font-medium transition-all transform hover:scale-105 hover:shadow-md min-w-[140px] h-[44px] flex items-center justify-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`text-center mt-12 transition-all duration-700 ${visibleSections.current.packages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{
              transitionDelay: '0.15s',
            }}
          >
            <Link
              to="/packages"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg min-w-[180px] h-[48px] text-base"
            >
              Explore All Packages <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* Why Choose Us - Removed animations */}
      <section
        ref={observerRefs.whyChoose}
        className="py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://uploadthingy.s3.us-west-1.amazonaws.com/uPmomXqwwqccNGkB9YLN1H/tooth_temple.png')",
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-green-900 bg-opacity-50 text-green-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-display">
              The WinTours Difference
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              We're dedicated to providing exceptional travel experiences with
              attention to every detail.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl text-center hover:scale-105 hover:bg-gray-800 border border-gray-700 transition-all duration-300"
              >
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform hover:rotate-12">
                  {cloneElement(feature.icon, {
                    size: 24,
                    className: 'text-white',
                  })}
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials - Removed animations */}
      <section
        ref={observerRefs.testimonials}
        className="py-16 md:py-24 bg-gray-50 relative"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 font-display">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
              Don't just take our word for it. Read what our satisfied customers
              have to say about their experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setShowFeedbackForm(true)}
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-md min-w-[220px] h-[52px] text-base"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Share Your Experience
                </button>

                <a
                  href="https://www.tripadvisor.com/UserReviewEdit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#00aa6c] hover:bg-[#00956d] text-white px-5 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-md min-w-[220px] h-[52px] text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z" />
                  </svg>
                  Review on TripAdvisor
                </a>

                <button
                  onClick={() =>
                    setIsTestimonialsExpanded(!isTestimonialsExpanded)
                  }
                  className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-md min-w-[220px] h-[52px] text-base"
                >
                  <Star size={18} className="mr-2" />
                  {isTestimonialsExpanded ? 'Show Less' : 'View All Feedbacks'}
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTestimonials
              .slice(0, isTestimonialsExpanded ? undefined : 3)
              .map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed text-base">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* Feedback Form Modal */}
        {showFeedbackForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative animate-scaleIn max-h-[90vh] flex flex-col">
              <button
                onClick={closeFeedbackForm}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close feedback form"
              >
                <X size={20} />
              </button>
              <div className="p-6 overflow-y-auto">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 font-display">
                  Share Your Experience
                </h3>
                {submitSuccess ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 animate-fadeIn">
                    <p className="font-medium">Thank you for your feedback!</p>
                    <p className="text-sm">
                      Your review has been added successfully.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleFeedbackSubmit}
                    className="overflow-y-auto"
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={feedbackFormData.name}
                        onChange={handleFeedbackChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow text-sm"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={feedbackFormData.location}
                        onChange={handleFeedbackChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow text-sm"
                        placeholder="City, Country"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Photo
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                            <img
                              src={previewUrl || feedbackFormData.avatar}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <label className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
                            <Camera size={16} className="text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">
                              Choose a photo
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="rating"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Rating
                      </label>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            className="focus:outline-none mr-1 transform transition-transform hover:scale-125"
                          >
                            <Star
                              size={24}
                              className={`${star <= feedbackFormData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="text"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Experience
                      </label>
                      <textarea
                        id="text"
                        name="text"
                        value={feedbackFormData.text}
                        onChange={handleFeedbackChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow text-sm"
                        placeholder="Tell us about your experience..."
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-colors text-base h-[44px] flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Your Review'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Contact Us Section - Removed animations */}
      <section
        ref={observerRefs.contactUs}
        className="py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://uploadthingy.s3.us-west-1.amazonaws.com/jh8EH1fsnWUQZd1GUr5t9h/nature.jpg')",
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-green-900 bg-opacity-50 text-green-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-display">
              Contact Us
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Have questions or ready to plan your next adventure? Reach out to
              us and our team will be happy to assist you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            <div className="h-full">
              <div className="bg-black bg-opacity-40 p-8 rounded-2xl backdrop-blur-sm h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-6 text-green-400 font-display">
                  Contact Information
                </h3>
                <div className="space-y-6 flex-grow">
                  <div className="flex items-start">
                    <div className="bg-green-600 p-3 rounded-full mr-4">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 text-base">
                        Our Location
                      </h4>
                      <p className="text-gray-300 text-base">
                        No, 10, Kalalpitiya, Ukuwela, Matale, Sri Lanka
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-600 p-3 rounded-full mr-4">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 text-base">
                        Phone
                      </h4>
                      <p className="text-gray-300 text-base">+94 778 289 862</p>
                      <p className="text-gray-300 text-base">Hotline: 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-600 p-3 rounded-full mr-4">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 text-base">
                        Email
                      </h4>
                      <p className="text-gray-300 text-base">
                        info@wintours.com
                      </p>
                      <p className="text-gray-300 text-base">
                        support@wintours.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-600 p-3 rounded-full mr-4">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 text-base">
                        Office Hours
                      </h4>
                      <p className="text-gray-300 text-base">
                        Monday - Saturday: 9am - 5pm
                      </p>
                      <p className="text-gray-300 text-base">
                        Sunday: By Appointment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full">
              <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 font-display">
                  Send us a message
                </h3>
                {contactSubmitSuccess ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-lg mb-6 animate-fadeIn flex-grow flex flex-col items-center justify-center">
                    <div className="flex items-center mb-4">
                      <svg
                        className="w-6 h-6 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <h3 className="text-lg font-semibold">
                        Message Sent Successfully!
                      </h3>
                    </div>
                    <p className="text-base text-center">
                      Thank you for contacting us. One of our travel experts
                      will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleContactSubmit}
                    className="flex-grow flex flex-col"
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={contactFormData.name}
                        onChange={handleContactChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={contactFormData.email}
                        onChange={handleContactChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="mb-6 flex-grow">
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={3}
                        value={contactFormData.message}
                        onChange={handleContactChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-base h-full min-h-[120px]"
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors text-base h-[48px] mt-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="mr-2" /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section - Enhanced visual appeal */}
      <section className="py-16 md:py-24 bg-green-600 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://uploadthingy.s3.us-west-1.amazonaws.com/iaVofWodKPRQnN6WarDj7n/bg4.png')",
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-pulse font-display">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to plan your dream vacation. Our travel experts are
            waiting to assist you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/94778289862"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg min-w-[160px] h-[48px] flex items-center justify-center text-base"
            >
              Make an Inquiry
            </a>
            <a
              href="mailto:info@wintours.com"
              className="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg min-w-[160px] h-[48px] flex items-center justify-center text-base"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      {/* Back to top button */}
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
        className="fixed bottom-6 left-6 bg-green-600 text-white p-3 rounded-full shadow-lg z-40 md:hidden"
        aria-label="Back to top"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  )
}
// Sample data
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
  {
    id: 'ella',
    name: 'Ella & Nine Arch Bridge',
    location: 'Uva Province, Sri Lanka',
    description:
      'Experience the breathtaking railway journey and iconic Nine Arch Bridge surrounded by lush tea plantations.',
    fullDescription:
      'Ella is a picturesque mountain village nestled in the misty highlands of Sri Lanka\'s Uva Province. The iconic Nine Arch Bridge, also known as the "Bridge in the Sky," is a colonial-era railway bridge built entirely of brick, rock, and cement without using a single piece of steel. The bridge spans 91 meters and stands 24 meters high, creating a magnificent vantage point for photographs, especially when a blue train crosses over. The surrounding area offers numerous hiking trails, including Little Adam\'s Peak and Ella Rock, with panoramic views of valleys, tea plantations, and waterfalls. The train journey to Ella itself is considered one of the most beautiful rail trips in the world.',
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/jRBga2DAHmhvNvaXmQn3DH/bg5.png',
  },
  {
    id: 'galle',
    name: 'Galle Fort',
    location: 'Southern Province, Sri Lanka',
    description:
      'Step back in time as you explore this well-preserved colonial fortress with its charming streets and ocean views.',
    fullDescription:
      "Galle Fort, built by the Portuguese in the 16th century and extensively fortified by the Dutch in the 17th century, stands as a testament to Sri Lanka's colonial past. This UNESCO World Heritage site is a living heritage site where history blends seamlessly with modern life. Within its ramparts, you'll find a fascinating mix of architectural styles, from colonial Dutch and British buildings to Muslim mosques and ornate churches. The fort's narrow cobblestone streets are lined with boutique shops, cafés, art galleries, and restored colonial houses. Walking along the massive walls offers spectacular views of the Indian Ocean, especially at sunset. The fort is also home to important historical structures, including the Old Dutch Church, the Maritime Museum, and the iconic lighthouse.",
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/73AwLdEJo1TiQf7DgDmsKX/galle_fort.png',
  },
  {
    id: 'wildlife-safari',
    name: 'Udawalawe National Park Safari',
    location: 'Uva Province, Sri Lanka',
    description:
      'Experience thrilling wildlife encounters in this famous national park, known for its large herds of wild elephants and diverse bird species.',
    fullDescription:
      "Udawalawe National Park, established in 1972, is one of Sri Lanka's most popular wildlife destinations, particularly renowned for its large elephant population. Covering approximately 30,000 hectares, the park centers around the Udawalawe Reservoir, creating a diverse ecosystem that supports numerous animal species. Visitors can observe herds of Sri Lankan elephants—often numbering 100 or more—throughout the year, unlike in other national parks where elephant sightings are seasonal. Beyond elephants, the park is home to water buffalo, sambar deer, spotted deer, wild boar, jackals, and the elusive Sri Lankan leopard. Bird enthusiasts will be delighted by over 200 species, including endemic birds like the Sri Lanka spurfowl and red-faced malkoha. The park's relatively flat terrain and open grasslands make wildlife viewing easier than in more densely forested parks.",
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/v5v7xrDdyWu5VfawZzXUea/udawalawa_safari.png',
  },
  {
    id: 'kandy-temple',
    name: 'Temple of the Sacred Tooth Relic',
    location: 'Kandy, Central Province, Sri Lanka',
    description:
      'Visit this revered Buddhist temple housing the relic of the tooth of Buddha, one of the most sacred places of worship in the Buddhist world.',
    fullDescription:
      "The Temple of the Sacred Tooth Relic (Sri Dalada Maligawa) is a Buddhist temple located in the royal palace complex of the former Kingdom of Kandy. It houses the relic of the tooth of the Buddha, which is venerated by Buddhists worldwide. According to legend, the tooth was taken from the Buddha's funeral pyre in the 4th century by Princess Hemamali, who smuggled it into Sri Lanka hidden in her hair. The temple was built within the royal palace complex during the Kandyan Kingdom (1592-1815), with the tooth becoming a symbol of sovereignty—whoever held the relic had the right to rule the land. The temple is part of the Sacred City of Kandy, a UNESCO World Heritage site, and is renowned for its Kandyan architecture featuring intricate wood carvings, inlaid ivory, and lacquer work. Visitors can observe daily rituals performed three times a day, with the sacred tooth relic displayed in an ornate golden casket. The annual Esala Perahera, one of Asia's most spectacular festivals, celebrates and honors the Sacred Tooth Relic with a grand procession featuring dancers, drummers, and decorated elephants.",
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/uPmomXqwwqccNGkB9YLN1H/tooth_temple.png',
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya Tea Country',
    location: 'Central Province, Sri Lanka',
    description:
      'Discover the lush tea plantations and colonial charm of "Little England," with its cool climate, misty hills, and picturesque landscapes.',
    fullDescription:
      'Nuwara Eliya, often referred to as "Little England," is a charming hill station nestled in the central highlands of Sri Lanka at an elevation of 1,868 meters (6,128 feet) above sea level. Established by British colonists in the 19th century, the town retains much of its colonial character with Tudor-style cottages, country houses, and a well-maintained golf course. The cool climate and misty landscapes create perfect conditions for growing Ceylon tea, and the surrounding hillsides are carpeted with emerald-green tea plantations. Visitors can tour historic tea factories to learn about the tea-making process from plucking to processing and enjoy tea tasting sessions. Beyond tea, Nuwara Eliya offers beautiful gardens including Victoria Park and the Hakgala Botanical Gardens, scenic waterfalls such as Lovers Leap and Devon Falls, and the picturesque Gregory Lake where visitors can boat and enjoy picnics. The region is also known for its fresh produce, particularly strawberries, and its cool climate provides a refreshing escape from the tropical heat of the lowlands.',
    image:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/s26uXY2tp13sUSnjnHPUPo/nywaraeliya_tea.png',
  },
]
const features = [
  {
    title: 'Expert Local Guides',
    description:
      'Our professional guides ensure you have the best experience with their deep local knowledge and insights.',
    icon: <Users size={24} className="text-white" />,
  },
  {
    title: 'Tailored Experiences',
    description:
      'We customize each package to meet your specific preferences and requirements for a perfect trip.',
    icon: <Calendar size={24} className="text-white" />,
  },
  {
    title: 'Competitive Pricing',
    description:
      'We offer transparent, competitive pricing without compromising on the quality of your experience.',
    icon: <Star size={24} className="text-white" />,
  },
  {
    title: '24/7 Support',
    description:
      'Our dedicated support team is available around the clock to assist you throughout your journey.',
    icon: <Phone size={24} className="text-white" />,
  },
]
const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'New York, USA',
    text: 'The 14-day heritage tour was absolutely amazing! Every detail was perfectly planned, and our guide was incredibly knowledgeable. Will definitely book with them again!',
    rating: 5,
    avatar:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/7ZeCM38y7x8KydR9sXo9tA/happy_customer_4.jpg',
  },
  {
    name: 'David Chen',
    location: 'Toronto, Canada',
    text: 'We had a wonderful experience with the beach and safari package. The accommodations were excellent, and we saw so much wildlife! Highly recommend!',
    rating: 5,
    avatar:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/8GKzWHAZSCsq1B3v21JVRV/happy_customer5.jpg',
  },
  {
    name: 'Emily Rodriguez',
    location: 'London, UK',
    text: 'The customer service was exceptional from start to finish. They helped us plan the perfect vacation for our family, and the memories will last a lifetime.',
    rating: 4,
    avatar:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/4995X4UbvdGEbTW4vCsDV5/happy_customer1.jpg',
  },
]
export default Home
