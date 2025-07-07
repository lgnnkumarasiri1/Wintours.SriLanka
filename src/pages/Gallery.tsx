import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const galleryGridRef = useRef(null);
  const topRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    // Scroll to top when component mounts or location changes
    window.scrollTo(0, 0);
    if (activeCategory === 'all') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === activeCategory));
    }
  }, [location]);
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === activeCategory));
    }
    // Scroll to the gallery grid after filtering
    if (galleryGridRef.current) {
      setTimeout(() => {
        galleryGridRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [activeCategory]);
  const handleCategoryChange = category => {
    setActiveCategory(category);
  };
  return <div className="w-full pt-24 pb-16" ref={topRef}>
      {/* Hero Section */}
      <section className="relative py-20 bg-black text-white">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{
        backgroundImage: "url('https://uploadthingy.s3.us-west-1.amazonaws.com/uAozGnBab3LdZQ7d1fn3sg/sigiriya1.jpg')"
      }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sri Lanka Gallery
            </h1>
            <p className="text-xl">
              Explore stunning photos from our beautiful island. Get inspired
              for your next adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Destination Photos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our collection of beautiful photos from various
              destinations around Sri Lanka.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button onClick={() => handleCategoryChange('all')} className={`px-4 py-2 rounded-full ${activeCategory === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
              All
            </button>
            <button onClick={() => handleCategoryChange('beach')} className={`px-4 py-2 rounded-full ${activeCategory === 'beach' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
              Beaches
            </button>
            <button onClick={() => handleCategoryChange('cultural')} className={`px-4 py-2 rounded-full ${activeCategory === 'cultural' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
              Cultural Sites
            </button>
            <button onClick={() => handleCategoryChange('nature')} className={`px-4 py-2 rounded-full ${activeCategory === 'nature' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
              Nature
            </button>
            <button onClick={() => handleCategoryChange('wildlife')} className={`px-4 py-2 rounded-full ${activeCategory === 'wildlife' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
              Wildlife
            </button>
            <button onClick={() => handleCategoryChange('tea')} className={`px-4 py-2 rounded-full ${activeCategory === 'tea' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
              Tea Plantations
            </button>
            <button onClick={() => handleCategoryChange('guests')} className={`px-4 py-2 rounded-full ${activeCategory === 'guests' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
              Our Guests
            </button>
          </div>

          {/* Gallery Grid */}
          <div ref={galleryGridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="relative group h-64">
                  <img src={image.url} alt={image.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-bold">{image.title}</h3>
                      <p className="text-sm">{image.location}</p>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Sri Lanka Videos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch our curated collection of videos to get a better feel for
              the beauty of Sri Lanka.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative aspect-video">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{video.location}</p>
                  <p className="text-gray-700">{video.description}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Inspired to Travel?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to plan your dream vacation. Our travel experts are
            waiting to assist you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/inquiry" className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 min-w-[160px] h-[48px] flex items-center justify-center">
              Make an Inquiry
            </a>
            <a href="/packages" className="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 min-w-[160px] h-[48px] flex items-center justify-center">
              Explore Packages
            </a>
          </div>
        </div>
      </section>
    </div>;
};
// Updated gallery data with Sri Lanka images - only uploaded images
const galleryImages = [{
  url: "/sigiriya1.jpg",
  title: 'Sigiriya Rock Fortress View',
  location: 'Central Province, Sri Lanka',
  category: 'cultural'
}, {
  url: "/Dambulla.jpg",
  title: 'Reclining Buddha Statue',
  location: 'Dambulla Cave Temple, Sri Lanka',
  category: 'cultural'
}, {
  url: "/ancient3.jpg",
  title: 'Ancient Council Chamber',
  location: 'Polonnaruwa, Sri Lanka',
  category: 'cultural'
}, {
  url: "/ancient4.jpg",
  title: 'Lankatilaka Temple Ruins',
  location: 'Polonnaruwa, Sri Lanka',
  category: 'cultural'
}, {
  url: "/dalada.jpg",
  title: 'Temple of the Sacred Tooth Relic',
  location: 'Kandy, Sri Lanka',
  category: 'cultural'
}, {
  url: "/beach1.jpg",
  title: 'Traditional Fish Drying',
  location: 'Coastal Village, Sri Lanka',
  category: 'cultural'
}, {
  url: "/village.jpg",
  title: 'Traditional Village Hut',
  location: 'Rural Sri Lanka',
  category: 'cultural'
}, {
  url: "/happy_custormer_38.jpg",
  title: 'Truc Lam Monastery Visit',
  location: 'Buddhist Meditation Center, Sri Lanka',
  category: 'cultural'
}, {
  url: "/happy_custormer_27.jpg",
  title: 'Spiritual Discussion with Monk',
  location: 'Buddhist Temple, Sri Lanka',
  category: 'cultural'
}, {
  url: "/safari2.jpg",
  title: 'Elephant Family with Calf',
  location: 'Udawalawe National Park, Sri Lanka',
  category: 'wildlife'
}, {
  url: "/safari5.jpg",
  title: 'Elephants Bathing',
  location: 'Minneriya National Park, Sri Lanka',
  category: 'wildlife'
}, {
  url: "/safari6.jpg",
  title: 'Saltwater Crocodile',
  location: 'Yala National Park, Sri Lanka',
  category: 'wildlife'
}, {
  url: "/safari7.jpg",
  title: 'Spot-billed Pelican',
  location: 'Bundala National Park, Sri Lanka',
  category: 'wildlife'
}, {
  url: "/nature3.jpg",
  title: 'Elephant Herd with Calves',
  location: 'Kaudulla National Park, Sri Lanka',
  category: 'wildlife'
}, {
  url: "/safari4.jpg",
  title: 'Spotted Deer Herd',
  location: 'Wilpattu National Park, Sri Lanka',
  category: 'wildlife'
}, {
  url: "/nature.jpg",
  title: 'Serene Lake View',
  location: 'Tea Country, Sri Lanka',
  category: 'nature'
}, {
  url: "/kandy.jpg",
  title: 'Sunset at Kandy Lake',
  location: 'Kandy, Sri Lanka',
  category: 'nature'
}, {
  url: "/nature6.jpg",
  title: 'Mountain Valley Vista',
  location: 'Central Highlands, Sri Lanka',
  category: 'nature'
}, {
  url: "/nature7.jpg",
  title: 'Bird in Flight',
  location: 'Sinharaja Forest Reserve, Sri Lanka',
  category: 'nature'
}, {
  url: "/happy_customer_4.jpg",
  title: 'Guests with Traditional Welcome',
  location: 'Colombo, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_customer5.jpg",
  title: 'Guests with Tour Guide',
  location: 'Nuwara Eliya, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_customer_42.jpg",
  title: 'Airport Welcome',
  location: 'Bandaranaike International Airport, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_customer_6.jpg",
  title: 'Bridge Tour with Guide',
  location: 'Bentota River, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_customer7.jpg",
  title: 'Coconut Experience',
  location: 'Southern Province, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_customer1.jpg",
  title: 'Guest with Tour Guide at Cave Temple',
  location: 'Dambulla, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_7.jpg",
  title: 'Cultural Ceremony Experience',
  location: 'Kandy, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_8.jpg",
  title: 'Tea Plantation Visit',
  location: 'Nuwara Eliya, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_10.jpg",
  title: 'Evening Dinner with Guide',
  location: 'Colombo, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer9.jpg",
  title: 'Tea Tasting Experience',
  location: 'Nuwara Eliya Tea Country, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer14.jpg",
  title: 'River Safari Experience',
  location: 'Madu River, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_15.jpg",
  title: 'Young Explorer on Boat Tour',
  location: 'Madu River, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_16.jpg",
  title: 'Family at Ancient Ruins',
  location: 'Polonnaruwa, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_18.jpg",
  title: 'Family Tour Group with Guide',
  location: 'Kandy, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_19.jpg",
  title: 'Waterfall Excursion with Guide',
  location: 'Ramboda Falls, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_customer1.jpg",
  title: 'Guest with Guide at Dambulla Cave Temple',
  location: 'Dambulla, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_customer_3.jpg",
  title: 'Travelers with Guide at Cave Temple',
  location: 'Dambulla, Sri Lanka',
  category: 'guests'
}, {
  url: "/warm_welcomes.jpg",
  title: 'Family Welcome at Luxury Hotel',
  location: 'Colombo, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_13.jpg",
  title: 'Family Tractor Safari Adventure',
  location: 'Rural Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_34.jpg",
  title: 'Couple at Rice Terraces',
  location: 'Ella, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_32.jpg",
  title: 'Couple at Mihintale Sacred Steps',
  location: 'Mihintale, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_30.jpg",
  title: 'Rainy Day at Nine Arch Bridge',
  location: 'Ella, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_29.jpg",
  title: 'Waterfall Trek Adventure',
  location: 'Central Highlands, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer_23.jpg",
  title: 'Senior Couple at Tea Plantation',
  location: 'Nuwara Eliya, Sri Lanka',
  category: 'guests'
}, {
  url: "/happy_custormer20.jpg",
  title: 'Zipline Adventure Experience',
  location: 'Ella Adventure Park, Sri Lanka',
  category: 'guests'
}];
// Updated videos data with Sri Lanka content using uploaded images
const videos = [{
  title: 'Exploring Sri Lanka',
  location: 'Various Locations, Sri Lanka',
  description: 'Journey through the diverse landscapes and cultural heritage of Sri Lanka, from ancient ruins to pristine beaches.',
  thumbnail: "/bg3.png"
}, {
  title: 'Wildlife Safari',
  location: 'Yala National Park, Sri Lanka',
  description: "Experience the thrill of witnessing Sri Lanka's magnificent wildlife including elephants, leopards, and diverse bird species in their natural habitat.",
  thumbnail: "/safari2.jpg"
}, {
  title: 'Cultural Heritage',
  location: 'Kandy, Sri Lanka',
  description: 'Discover the rich cultural heritage of Sri Lanka through its ancient temples, colorful festivals, and traditional arts and crafts.',
  thumbnail: "/dalada.jpg"
}];
export default Gallery;