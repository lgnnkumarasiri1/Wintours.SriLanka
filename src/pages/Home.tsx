import React, { useEffect, useState, useRef, cloneElement, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Users, Star, ChevronRight, Phone, X, MessageCircle, Check, Clock, ShieldCheck, Compass, Award, Heart, Mail, Send, Upload, Camera } from 'lucide-react';
import SEO from '../components/SEO';
import AnimateOnScroll from '../components/AnimateOnScroll';
const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackFormData, setFeedbackFormData] = useState({
    name: '',
    location: '',
    text: '',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [allTestimonials, setAllTestimonials] = useState(testimonials);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactSubmitSuccess, setContactSubmitSuccess] = useState(false);
  const [isTestimonialsExpanded, setIsTestimonialsExpanded] = useState(false);
  const visibleSections = useRef({});
  const observerRefs = {
    quickInfo: useRef(null),
    introduction: useRef(null),
    destinations: useRef(null),
    packages: useRef(null),
    whyChoose: useRef(null),
    testimonials: useRef(null),
    contactUs: useRef(null)
  };
  const heroImages = ["/bg3.png", "/bg2.png", "/bg1.png", "/bg5.png"];
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a preview URL for the selected image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
        setFeedbackFormData(prev => ({
          ...prev,
          avatar: fileReader.result
        }));
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handleFeedbackChange = e => {
    const {
      name,
      value
    } = e.target;
    setFeedbackFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleContactChange = e => {
    const {
      name,
      value
    } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleContactSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setContactSubmitSuccess(true);
      // Reset form after showing success message
      setTimeout(() => {
        setContactFormData({
          name: '',
          email: '',
          message: ''
        });
        setContactSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  const handleRatingChange = rating => {
    setFeedbackFormData(prev => ({
      ...prev,
      rating
    }));
  };
  const handleFeedbackSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setAllTestimonials(prev => [feedbackFormData, ...prev]);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowFeedbackForm(false);
        setFeedbackFormData({
          name: '',
          location: '',
          text: '',
          rating: 5,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
        });
        setSelectedFile(null);
        setPreviewUrl(null);
      }, 2000);
    }, 1500);
  };
  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setFeedbackFormData({
      name: '',
      location: '',
      text: '',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);
  useEffect(() => {
    const observers = {};
    // Create an intersection observer for each section
    Object.entries(observerRefs).forEach(([key, ref]) => {
      if (ref.current) {
        observers[key] = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.current[key] = true;
          }
        }, {
          threshold: 0.1
        });
        observers[key].observe(ref.current);
      }
    });
    return () => {
      // Cleanup observers
      Object.values(observers).forEach(observer => {
        observer.disconnect();
      });
    };
  }, []);
  return <div className="w-full">
      <SEO title="WinTours Sri Lanka - Unforgettable Sri Lankan Adventures" description="Explore the paradise island of Sri Lanka with our expertly crafted tours. From ancient temples to pristine beaches, experience the true essence of Sri Lanka." keywords="Sri Lanka tours, travel packages, Sri Lankan adventures, cultural tours, wildlife safari, beach holidays" ogImage="/bg3.png" />
      {/* Hero Section */}
      <section className="relative min-h-[100vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10"></div>
        {heroImages.map((image, index) => <div key={index} className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100 animate-zoomIn' : 'opacity-0'}`} style={{
        backgroundImage: `url('${image}')`
      }}></div>)}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center py-10 md:py-0">
          <div className="max-w-2xl pt-20 md:pt-32">
            <span className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 sm:mb-6 opacity-0 animate-fadeInUp" style={{
            animationDelay: '0.1s',
            animationFillMode: 'forwards'
          }}>
              Discover Sri Lanka with Us
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white opacity-0 animate-fadeInUp font-display leading-tight" style={{
            animationDelay: '0.3s',
            animationFillMode: 'forwards'
          }}>
              Unforgettable
              <br />
              <span className="text-green-400">Sri Lankan</span> Adventures
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white mb-8 sm:mb-10 opacity-0 animate-fadeInUp max-w-xl mt-4 sm:mt-6" style={{
            animationDelay: '0.6s',
            animationFillMode: 'forwards'
          }}>
              Explore the paradise island with our expertly crafted tours. From
              ancient temples to pristine beaches, experience the true essence
              of Sri Lanka.
            </p>
            <div className="flex flex-wrap gap-4 opacity-0 animate-fadeInUp" style={{
            animationDelay: '0.9s',
            animationFillMode: 'forwards'
          }}>
              <Link to="/packages" className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center min-w-[130px] sm:min-w-[160px] h-[40px] sm:h-[48px] text-sm sm:text-base btn-hover-effect">
                Explore Packages{' '}
                <ArrowRight size={14} className="ml-1 sm:ml-2" />
              </Link>
              <Link to="/short-inquiry" className="bg-white hover:bg-gray-100 text-gray-900 px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg min-w-[130px] sm:min-w-[160px] h-[40px] sm:h-[48px] flex items-center justify-center text-sm sm:text-base btn-hover-effect">
                Quick Inquiry
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block">
          <ChevronRight size={40} className="text-white transform rotate-90" />
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-green-400 scale-125' : 'bg-white/50 hover:bg-white/80'}`} aria-label={`Go to slide ${index + 1}`}></button>)}
        </div>
      </section>

      {/* Quick Info Section */}
      <section ref={observerRefs.quickInfo} className="bg-white py-8 sm:py-10 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <AnimateOnScroll animation="fade-up" delay={0.1} className="card-hover-effect">
              <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-7 shadow-sm flex items-center">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <ShieldCheck size={18} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base font-display">
                    100% Satisfaction
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-1">
                    Guaranteed experiences
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={0.3} className="card-hover-effect">
              <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-7 shadow-sm flex items-center">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <Award size={18} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base font-display">
                    Best Price Guarantee
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Value for your money
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={0.5} className="card-hover-effect">
              <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-7 shadow-sm flex items-center">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <Compass size={18} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base font-display">
                    Expert Local Guides
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Authentic experiences
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Sri Lanka Introduction Section */}
      <section ref={observerRefs.introduction} className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-16 items-center">
            <AnimateOnScroll animation="fade-right" className="w-full md:w-1/2">
              <div className="relative">
                <div className="img-hover-zoom">
                  <img src="/bg1.png" alt="Beautiful Sri Lanka Coastline" className="rounded-lg shadow-xl w-full h-auto object-cover hover:shadow-2xl transition-shadow duration-300" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-3 md:p-4 rounded-lg shadow-lg hidden sm:block transform transition-transform duration-500 hover:scale-105">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <Heart size={16} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm font-display">
                        Loved by Travelers
                      </h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} size={12} className="text-yellow-400 fill-current" />)}
                        <span className="text-xs text-gray-600 ml-1">
                          5.0 (200+ reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Image Tiles */}
              <div className="grid grid-cols-3 gap-3 mt-3 sm:mt-4">
                <AnimateOnScroll animation="fade-up" delay={0.1} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="img-hover-zoom">
                    <img src="/dambulla.png" alt="Sri Lanka Temple" className="w-full h-24 sm:h-28 md:h-32 object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation="fade-up" delay={0.2} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="img-hover-zoom">
                    <img src="/train.png" alt="Sri Lanka Train Journey" className="w-full h-24 sm:h-28 md:h-32 object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation="fade-up" delay={0.3} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="img-hover-zoom">
                    <img src="/wildlife.png" alt="Sri Lanka Wildlife" className="w-full h-24 sm:h-28 md:h-32 object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                </AnimateOnScroll>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" delay={0.3} className="w-full md:w-1/2">
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-4 sm:mb-5 md:mb-6">
                About Sri Lanka
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 md:mb-7 text-gray-900 font-display leading-tight">
                Discover the Pearl of the Indian Ocean
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                Sri Lanka, a South Asian island nation, is a magnificent gift of
                nature. With its breathtaking mountains, cascading waterfalls,
                scenic coastlines, and diverse wildlife, it truly deserves to be
                called paradise on earth.
              </p>
              <p className="text-gray-600 mb-5 sm:mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                As the only country where Theravāda Buddhism has been firmly
                established, Sri Lanka boasts a rich cultural heritage while
                promoting equality and cooperation among all nations.
              </p>
              <div className="space-y-3 sm:space-y-4 md:space-y-5 mb-6 sm:mb-7 md:mb-9">
                <AnimateOnScroll animation="fade-left" delay={0.4} className="flex items-start transform transition-transform hover:translate-x-2 duration-300">
                  <Check size={16} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-sm md:text-base">
                    Rich cultural heritage spanning over 2,500 years
                  </p>
                </AnimateOnScroll>
                <AnimateOnScroll animation="fade-left" delay={0.5} className="flex items-start transform transition-transform hover:translate-x-2 duration-300">
                  <Check size={16} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-sm md:text-base">
                    8 UNESCO World Heritage Sites in a compact area
                  </p>
                </AnimateOnScroll>
                <AnimateOnScroll animation="fade-left" delay={0.6} className="flex items-start transform transition-transform hover:translate-x-2 duration-300">
                  <Check size={16} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-sm md:text-base">
                    Incredible biodiversity with unique wildlife
                  </p>
                </AnimateOnScroll>
              </div>
              <Link to="/packages" className="inline-flex items-center text-green-600 hover:text-green-800 font-medium group text-sm md:text-base">
                Explore Our Sri Lanka Tours{' '}
                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section ref={observerRefs.destinations} className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-8 md:mb-12 transition-all duration-200 ${visibleSections.current.destinations ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
              Explore Sri Lanka
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900 font-display">
              Popular Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Explore our handpicked selection of the most breathtaking and
              sought-after destinations in Sri Lanka.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {destinations.map((destination, index) => <div key={index} className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${visibleSections.current.destinations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{
            transitionDelay: `${0.1 + index * 0.2}s`
          }}>
                <div className="relative h-48 md:h-64 overflow-hidden group">
                  <img src={destination.image} alt={destination.name} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
                    <div className="flex items-center text-white mb-1 md:mb-2">
                      <MapPin size={16} className="mr-1 text-green-400" />
                      <span className="text-xs md:text-sm font-medium">
                        {destination.location}
                      </span>
                    </div>
                    <h3 className="text-base md:text-xl font-bold text-white font-display">
                      {destination.name}
                    </h3>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm md:text-base">
                    {destination.description}
                  </p>
                </div>
              </div>)}
          </div>
          <div className={`text-center mt-8 md:mt-12 transition-all duration-200 ${visibleSections.current.destinations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
          transitionDelay: '0.8s'
        }}>
            <Link to="/packages" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg min-w-[160px] sm:min-w-[180px] h-[40px] sm:h-[48px] text-sm sm:text-base">
              View All Destinations <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section ref={observerRefs.packages} className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-8 md:mb-12 transition-all duration-200 ${visibleSections.current.packages ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
              Travel Packages
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900 font-display">
              Our Popular Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Choose from our carefully crafted travel packages designed to
              provide you with the ultimate Sri Lanka experience.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className={`bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 ${visibleSections.current.packages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="md:w-2/5 relative">
                <img src="/bg3.png" alt="14 Days Adventure" className="w-full h-48 md:h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs md:text-sm font-medium">
                  Best Seller
                </div>
              </div>
              <div className="md:w-3/5 p-4 sm:p-5 md:p-6">
                <div className="flex items-center mb-1 md:mb-2">
                  <Calendar size={14} className="text-green-600 mr-1" />
                  <span className="text-gray-600 text-xs md:text-sm">
                    14 Days, 13 Nights
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 font-display">
                  Complete Heritage Explorer
                </h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  Experience the rich cultural heritage with our comprehensive
                  14-day tour package that covers all major historical sites.
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} className="text-yellow-400 fill-current" />)}
                  </div>
                  <span className="text-gray-600 text-xs md:text-sm ml-2">
                    128 Reviews
                  </span>
                </div>
                <div className="flex justify-end">
                  <Link to="/packages/14-days-13-nights" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all transform hover:scale-105 hover:shadow-md min-w-[120px] h-[40px] flex items-center justify-center">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div className={`bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 ${visibleSections.current.packages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{
            transitionDelay: '0.3s'
          }}>
              <div className="md:w-2/5 relative">
                <img src="/galle_fort.png" alt="9 Days Adventure" className="w-full h-48 md:h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 rounded-full text-xs md:text-sm font-medium">
                  Popular
                </div>
              </div>
              <div className="md:w-3/5 p-4 sm:p-5 md:p-6">
                <div className="flex items-center mb-1 md:mb-2">
                  <Calendar size={14} className="text-green-600 mr-1" />
                  <span className="text-gray-600 text-xs md:text-sm">
                    9 Days, 8 Nights
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 font-display">
                  Beach & Safari Expedition
                </h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  The perfect blend of relaxation and adventure with pristine
                  beaches and thrilling wildlife safaris in one package.
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} className={`${star <= 4 ? 'text-yellow-400 fill-current' : 'text-yellow-400'}`} />)}
                  </div>
                  <span className="text-gray-600 text-xs md:text-sm ml-2">
                    96 Reviews
                  </span>
                </div>
                <div className="flex justify-end">
                  <Link to="/packages/09-days-08-nights" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all transform hover:scale-105 hover:shadow-md min-w-[120px] h-[40px] flex items-center justify-center">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={`text-center mt-8 md:mt-12 transition-all duration-700 ${visibleSections.current.packages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
          transitionDelay: '0.6s'
        }}>
            <Link to="/packages" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg min-w-[160px] sm:min-w-[180px] h-[40px] sm:h-[48px] text-sm sm:text-base">
              Explore All Packages <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={observerRefs.whyChoose} className="py-12 md:py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{
        backgroundImage: "url('https://uploadthingy.s3.us-west-1.amazonaws.com/uPmomXqwwqccNGkB9YLN1H/tooth_temple.png')"
      }}></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className={`text-center mb-8 sm:mb-10 md:mb-16 transition-all duration-700 ${visibleSections.current.whyChoose ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-block bg-green-900 bg-opacity-50 text-green-400 px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
              Why Choose Us
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 font-display">
              The WinTours Difference
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
              We're dedicated to providing exceptional travel experiences with
              attention to every detail.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => <div key={index} className={`bg-gray-800 bg-opacity-50 p-5 sm:p-6 md:p-8 rounded-xl text-center transition-all duration-500 hover:scale-105 hover:bg-gray-800 border border-gray-700 ${visibleSections.current.whyChoose ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{
            transitionDelay: `${0.1 + index * 0.1}s`
          }}>
                <div className="bg-green-600 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 transform transition-transform hover:rotate-12">
                  {cloneElement(feature.icon, {
                size: 20
              })}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 font-display">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={observerRefs.testimonials} className="py-12 md:py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ${visibleSections.current.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
              Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900 font-display">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mb-6">
              Don't just take our word for it. Read what our satisfied customers
              have to say about their experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setShowFeedbackForm(true)} className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 sm:px-5 py-2 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-md min-w-[160px] sm:min-w-[180px] h-[40px] text-sm">
                <MessageCircle size={16} className="mr-2" />
                Share Your Experience
              </button>
              <button onClick={() => setIsTestimonialsExpanded(!isTestimonialsExpanded)} className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white px-4 sm:px-5 py-2 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-md min-w-[160px] sm:min-w-[180px] h-[40px] text-sm">
                <Star size={16} className="mr-2" />
                {isTestimonialsExpanded ? 'Show Less' : 'View All Feedbacks'}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allTestimonials.slice(0, isTestimonialsExpanded ? undefined : 3).map((testimonial, index) => <div key={index} className={`bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl ${visibleSections.current.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{
            transitionDelay: `${0.1 + index % 3 * 0.1}s`
          }}>
                  <div className="flex items-center mb-3 md:mb-4">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} className={`${star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                  </div>
                  <p className="text-gray-600 mb-4 md:mb-6 italic leading-relaxed text-sm md:text-base">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4 object-cover" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>)}
          </div>
        </div>
        {/* Feedback Form Modal */}
        {showFeedbackForm && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative animate-scaleIn max-h-[90vh] flex flex-col">
              <button onClick={closeFeedbackForm} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors" aria-label="Close feedback form">
                <X size={20} />
              </button>
              <div className="p-5 md:p-6 overflow-y-auto">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 font-display">
                  Share Your Experience
                </h3>
                {submitSuccess ? <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 animate-fadeIn">
                    <p className="font-medium">Thank you for your feedback!</p>
                    <p className="text-sm">
                      Your review has been added successfully.
                    </p>
                  </div> : <form onSubmit={handleFeedbackSubmit} className="overflow-y-auto">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input type="text" id="name" name="name" value={feedbackFormData.name} onChange={handleFeedbackChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow text-sm" placeholder="John Doe" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Location
                      </label>
                      <input type="text" id="location" name="location" value={feedbackFormData.location} onChange={handleFeedbackChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow text-sm" placeholder="City, Country" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Photo
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-gray-300">
                            <img src={previewUrl || feedbackFormData.avatar} alt="Profile preview" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <label className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-center px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
                            <Camera size={16} className="text-gray-500 mr-2" />
                            <span className="text-xs md:text-sm text-gray-600">
                              Choose a photo
                            </span>
                          </div>
                          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => <button key={star} type="button" onClick={() => handleRatingChange(star)} className="focus:outline-none mr-1 transform transition-transform hover:scale-125">
                            <Star size={20} className={`${star <= feedbackFormData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          </button>)}
                      </div>
                    </div>
                    <div className="mb-5 md:mb-6">
                      <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Experience
                      </label>
                      <textarea id="text" name="text" value={feedbackFormData.text} onChange={handleFeedbackChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow text-sm" placeholder="Tell us about your experience..." required></textarea>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-colors text-sm h-[40px] flex items-center justify-center">
                      {isSubmitting ? <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span> : 'Submit Your Review'}
                    </button>
                  </form>}
              </div>
            </div>
          </div>}
      </section>

      {/* Contact Us Section with Background */}
      <section ref={observerRefs.contactUs} className="py-12 md:py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1563445046-5ba2af614904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
      }}></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ${visibleSections.current.contactUs ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-block bg-green-900 bg-opacity-50 text-green-400 px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
              Get In Touch
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 font-display">
              Contact Us
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
              Have questions or ready to plan your next adventure? Reach out to
              us and our team will be happy to assist you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            <div className={`h-full transition-all duration-700 ${visibleSections.current.contactUs ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="bg-black bg-opacity-40 p-5 sm:p-6 md:p-8 rounded-xl backdrop-blur-sm h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 text-green-400 font-display">
                  Contact Information
                </h3>
                <div className="space-y-4 sm:space-y-5 md:space-y-6 flex-grow">
                  <div className="flex items-start">
                    <div className="bg-green-600 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 text-sm md:text-base">
                        Our Location
                      </h4>
                      <p className="text-gray-300 text-xs md:text-sm">
                        No, 10, Kalalpitiya, Ukuwela, Matale, Sri Lanka
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-600 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                      <Phone size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 text-sm md:text-base">
                        Phone
                      </h4>
                      <p className="text-gray-300 text-xs md:text-sm">
                        +94 778 289 862
                      </p>
                      <p className="text-gray-300 text-xs md:text-sm">
                        Hotline: 24/7
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-600 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                      <Mail size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 text-sm md:text-base">
                        Email
                      </h4>
                      <p className="text-gray-300 text-xs md:text-sm">
                        info@wintours.com
                      </p>
                      <p className="text-gray-300 text-xs md:text-sm">
                        support@wintours.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-600 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                      <Clock size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 text-sm md:text-base">
                        Office Hours
                      </h4>
                      <p className="text-gray-300 text-xs md:text-sm">
                        Monday - Saturday: 9am - 5pm
                      </p>
                      <p className="text-gray-300 text-xs md:text-sm">
                        Sunday: By Appointment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`h-full transition-all duration-700 ${visibleSections.current.contactUs ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`} style={{
            transitionDelay: '0.3s'
          }}>
              <div className="bg-white text-gray-800 p-5 sm:p-6 md:p-8 rounded-xl shadow-2xl h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-800 font-display">
                  Send us a message
                </h3>
                {contactSubmitSuccess ? <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-6 md:px-6 md:py-8 rounded-lg mb-6 animate-fadeIn flex-grow flex flex-col items-center justify-center">
                    <div className="flex items-center mb-3 md:mb-4">
                      <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <h3 className="text-base md:text-lg font-semibold">
                        Message Sent Successfully!
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-center">
                      Thank you for contacting us. One of our travel experts
                      will get back to you shortly.
                    </p>
                  </div> : <form onSubmit={handleContactSubmit} className="flex-grow flex flex-col">
                    <div className="mb-4">
                      <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input type="text" id="contact-name" name="name" value={contactFormData.name} onChange={handleContactChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm" placeholder="John Doe" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input type="email" id="contact-email" name="email" value={contactFormData.email} onChange={handleContactChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm" placeholder="john@example.com" required />
                    </div>
                    <div className="mb-5 md:mb-6 flex-grow">
                      <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea id="contact-message" name="message" rows={3} value={contactFormData.message} onChange={handleContactChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm h-full min-h-[100px]" placeholder="How can we help you?" required></textarea>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md font-medium flex items-center justify-center transition-colors text-sm sm:text-base h-[40px] sm:h-[48px] mt-auto">
                      {isSubmitting ? <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </> : <>
                          <Send size={16} className="mr-2" /> Send Message
                        </>}
                    </button>
                  </form>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{
        backgroundImage: "url('https://uploadthingy.s3.us-west-1.amazonaws.com/iaVofWodKPRQnN6WarDj7n/bg4.png')"
      }}></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 animate-pulse font-display">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Contact us today to plan your dream vacation. Our travel experts are
            waiting to assist you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/94778289862" target="_blank" rel="noopener noreferrer" className="bg-white text-green-600 hover:bg-gray-100 px-5 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg min-w-[140px] sm:min-w-[160px] h-[40px] sm:h-[48px] flex items-center justify-center text-sm sm:text-base">
              Make an Inquiry
            </a>
            <a href="mailto:info@wintours.com" className="bg-black text-white hover:bg-gray-900 px-5 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all transform hover:scale-105 hover:shadow-lg min-w-[140px] sm:min-w-[160px] h-[40px] sm:h-[48px] flex items-center justify-center text-sm sm:text-base">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>;
};
// Sample data
const destinations = [{
  id: 'sigiriya',
  name: 'Sigiriya Rock Fortress',
  location: 'Central Province, Sri Lanka',
  description: 'Explore this ancient rock fortress with its fascinating frescoes and spectacular views from the summit.',
  image: "/bg3.png"
}, {
  id: 'ella',
  name: 'Ella & Nine Arch Bridge',
  location: 'Uva Province, Sri Lanka',
  description: 'Experience the breathtaking railway journey and iconic Nine Arch Bridge surrounded by lush tea plantations.',
  image: "/bg5.png"
}, {
  id: 'galle',
  name: 'Galle Fort',
  location: 'Southern Province, Sri Lanka',
  description: 'Step back in time as you explore this well-preserved colonial fortress with its charming streets and ocean views.',
  image: "/galle_fort.png"
}, {
  id: 'wildlife-safari',
  name: 'Udawalawe National Park Safari',
  location: 'Uva Province, Sri Lanka',
  description: 'Experience thrilling wildlife encounters in this famous national park, known for its large herds of wild elephants and diverse bird species.',
  image: "/udawalawa_safari.png"
}, {
  id: 'kandy-temple',
  name: 'Temple of the Sacred Tooth Relic',
  location: 'Kandy, Central Province, Sri Lanka',
  description: 'Visit this revered Buddhist temple housing the relic of the tooth of Buddha, one of the most sacred places of worship in the Buddhist world.',
  image: "/tooth_temple.png"
}, {
  id: 'nuwara-eliya',
  name: 'Nuwara Eliya Tea Country',
  location: 'Central Province, Sri Lanka',
  description: 'Discover the lush tea plantations and colonial charm of "Little England," with its cool climate, misty hills, and picturesque landscapes.',
  image: "/nywaraeliya_tea.png"
}];
const features = [{
  title: 'Expert Local Guides',
  description: 'Our professional guides ensure you have the best experience with their deep local knowledge and insights.',
  icon: <Users size={24} className="text-white" />
}, {
  title: 'Tailored Experiences',
  description: 'We customize each package to meet your specific preferences and requirements for a perfect trip.',
  icon: <Calendar size={24} className="text-white" />
}, {
  title: 'Competitive Pricing',
  description: 'We offer transparent, competitive pricing without compromising on the quality of your experience.',
  icon: <Star size={24} className="text-white" />
}, {
  title: '24/7 Support',
  description: 'Our dedicated support team is available around the clock to assist you throughout your journey.',
  icon: <Phone size={24} className="text-white" />
}];
const testimonials = [{
  name: 'Sarah Johnson',
  location: 'New York, USA',
  text: 'The 14-day heritage tour was absolutely amazing! Every detail was perfectly planned, and our guide was incredibly knowledgeable. Will definitely book with them again!',
  rating: 5,
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
}, {
  name: 'David Chen',
  location: 'Toronto, Canada',
  text: 'We had a wonderful experience with the beach and safari package. The accommodations were excellent, and we saw so much wildlife! Highly recommend!',
  rating: 5,
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
}, {
  name: 'Emily Rodriguez',
  location: 'London, UK',
  text: 'The customer service was exceptional from start to finish. They helped us plan the perfect vacation for our family, and the memories will last a lifetime.',
  rating: 4,
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
}];
export default Home;