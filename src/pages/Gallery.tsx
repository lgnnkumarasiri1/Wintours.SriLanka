import React, { useEffect, useState, useRef, lazy } from 'react'
import { useLocation } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [filteredImages, setFilteredImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const galleryGridRef = useRef(null)
  const topRef = useRef(null)
  const location = useLocation()
  useEffect(() => {
    // Scroll to top when component mounts or location changes
    window.scrollTo(0, 0)
    if (activeCategory === 'all') {
      setFilteredImages(galleryImages)
    } else {
      setFilteredImages(
        galleryImages.filter((img) => img.category === activeCategory),
      )
    }
  }, [location])
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredImages(galleryImages)
    } else {
      setFilteredImages(
        galleryImages.filter((img) => img.category === activeCategory),
      )
    }
    // Scroll to the gallery grid after filtering
    if (galleryGridRef.current) {
      setTimeout(() => {
        galleryGridRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    }
  }, [activeCategory])
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }
  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden'
  }
  const closeLightbox = () => {
    setSelectedImage(null)
    // Restore body scrolling
    document.body.style.overflow = 'auto'
  }
  const goToPrevious = (e) => {
    e.stopPropagation()
    const newIndex =
      (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }
  const goToNext = (e) => {
    e.stopPropagation()
    const newIndex = (currentImageIndex + 1) % filteredImages.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious(e)
      } else if (e.key === 'ArrowRight') {
        goToNext(e)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage, currentImageIndex, filteredImages])
  return (
    <div className="w-full pt-24 pb-16" ref={topRef}>
      {/* Hero Section */}
      <section className="relative py-20 bg-black text-white">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://uploadthingy.s3.us-west-1.amazonaws.com/uAozGnBab3LdZQ7d1fn3sg/sigiriya1.jpg')",
          }}
        ></div>
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
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full ${activeCategory === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryChange('beach')}
              className={`px-4 py-2 rounded-full ${activeCategory === 'beach' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
            >
              Beaches
            </button>
            <button
              onClick={() => handleCategoryChange('cultural')}
              className={`px-4 py-2 rounded-full ${activeCategory === 'cultural' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
            >
              Cultural Sites
            </button>
            <button
              onClick={() => handleCategoryChange('nature')}
              className={`px-4 py-2 rounded-full ${activeCategory === 'nature' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
            >
              Nature
            </button>
            <button
              onClick={() => handleCategoryChange('wildlife')}
              className={`px-4 py-2 rounded-full ${activeCategory === 'wildlife' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
            >
              Wildlife
            </button>
            <button
              onClick={() => handleCategoryChange('tea')}
              className={`px-4 py-2 rounded-full ${activeCategory === 'tea' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
            >
              Tea Plantations
            </button>
            <button
              onClick={() => handleCategoryChange('guests')}
              className={`px-4 py-2 rounded-full ${activeCategory === 'guests' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
            >
              Our Guests
            </button>
          </div>

          {/* Gallery Grid */}
          <div
            ref={galleryGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative group h-64">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex items-center text-white mb-2">
                      <span className="text-sm font-medium">
                        {image.location}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {image.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <ZoomIn className="text-white w-10 h-10" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-2 top-2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 p-2 rounded-full"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[80vh] max-w-full object-contain"
              />
              <button
                onClick={goToPrevious}
                className="absolute left-2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 p-2 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 p-2 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight size={30} />
              </button>
            </div>
            <div className="bg-black bg-opacity-70 p-4 rounded-b-lg text-white w-full mt-2">
              <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.location}</p>
              <p className="text-sm text-gray-400 mt-1">
                Image {currentImageIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

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
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
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
              </div>
            ))}
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
            <a
              href="/inquiry"
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 min-w-[160px] h-[48px] flex items-center justify-center"
            >
              Make an Inquiry
            </a>
            <a
              href="/packages"
              className="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105 min-w-[160px] h-[48px] flex items-center justify-center"
            >
              Explore Packages
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
// Updated gallery data with Sri Lanka images - only uploaded images
const galleryImages = [
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/uAozGnBab3LdZQ7d1fn3sg/sigiriya1.jpg',
    title: 'Sigiriya Rock Fortress View',
    location: 'Central Province, Sri Lanka',
    category: 'cultural',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/6RutxWRHRHFQK9riRMwRsX/Dambulla.jpg',
    title: 'Reclining Buddha Statue',
    location: 'Dambulla Cave Temple, Sri Lanka',
    category: 'cultural',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/cL7xw68aHBHs9vDboUf8kd/ancient3.jpg',
    title: 'Ancient Council Chamber',
    location: 'Polonnaruwa, Sri Lanka',
    category: 'cultural',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/9vG6PvnDEddWUhNHnvLZ8q/ancient4.jpg',
    title: 'Lankatilaka Temple Ruins',
    location: 'Polonnaruwa, Sri Lanka',
    category: 'cultural',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/j4eKVgUgWV71nCcAmRW6iS/dalada.jpg',
    title: 'Temple of the Sacred Tooth Relic',
    location: 'Kandy, Sri Lanka',
    category: 'cultural',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/aTZSB7mBzfn66eDfENGjXR/beach1.jpg',
    title: 'Traditional Fish Drying',
    location: 'Coastal Village, Sri Lanka',
    category: 'cultural',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/hK3WjoMZEy7D1Z99Cs6LMP/village.jpg',
    title: 'Traditional Village Hut',
    location: 'Rural Sri Lanka',
    category: 'cultural',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/qYPoZ9ZhLJ1QEMRyDzNfGn/happy_custormer_38.jpg',
    title: 'Truc Lam Monastery Visit',
    location: 'Buddhist Meditation Center, Sri Lanka',
    category: 'cultural',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/7R2pGV1rwewoSTCyrh7PF2/happy_custormer_27.jpg',
    title: 'Spiritual Discussion with Monk',
    location: 'Buddhist Temple, Sri Lanka',
    category: 'cultural',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/4iNbKQDGe98ZafS1FcUK9A/safari2.jpg',
    title: 'Elephant Family with Calf',
    location: 'Udawalawe National Park, Sri Lanka',
    category: 'wildlife',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/v28W2BPQ8qMpZvG8piC1mz/safari5.jpg',
    title: 'Elephants Bathing',
    location: 'Minneriya National Park, Sri Lanka',
    category: 'wildlife',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/6GJfbstMWpn11EAPCreBGN/safari6.jpg',
    title: 'Saltwater Crocodile',
    location: 'Yala National Park, Sri Lanka',
    category: 'wildlife',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/qfL1X7HLLPeLCTNrjqm62R/safari7.jpg',
    title: 'Spot-billed Pelican',
    location: 'Bundala National Park, Sri Lanka',
    category: 'wildlife',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/iVeCLxa7UgTjYjCLu7Svry/nature3.jpg',
    title: 'Elephant Herd with Calves',
    location: 'Kaudulla National Park, Sri Lanka',
    category: 'wildlife',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/8UmpucGHRWAJqHqn92q8E2/safari4.jpg',
    title: 'Spotted Deer Herd',
    location: 'Wilpattu National Park, Sri Lanka',
    category: 'wildlife',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/jh8EH1fsnWUQZd1GUr5t9h/nature.jpg',
    title: 'Serene Lake View',
    location: 'Tea Country, Sri Lanka',
    category: 'nature',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/swVyH2m9AfULyYWxJMuRPi/kandy.jpg',
    title: 'Sunset at Kandy Lake',
    location: 'Kandy, Sri Lanka',
    category: 'nature',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/umKpchjBUtECmnTjGTnjYM/nature6.jpg',
    title: 'Mountain Valley Vista',
    location: 'Central Highlands, Sri Lanka',
    category: 'nature',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/7YHX3QkADus58qv1ZM5A8X/nature7.jpg',
    title: 'Bird in Flight',
    location: 'Sinharaja Forest Reserve, Sri Lanka',
    category: 'nature',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/7ZeCM38y7x8KydR9sXo9tA/happy_customer_4.jpg',
    title: 'Guests with Traditional Welcome',
    location: 'Colombo, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/8GKzWHAZSCsq1B3v21JVRV/happy_customer5.jpg',
    title: 'Guests with Tour Guide',
    location: 'Nuwara Eliya, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/gWuom3y98BxnAJCjXykN4K/happy_customer_42.jpg',
    title: 'Airport Welcome',
    location: 'Bandaranaike International Airport, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/qdoxUkV7ELFLYvWJEBhyiX/happy_customer_6.jpg',
    title: 'Bridge Tour with Guide',
    location: 'Bentota River, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/jS8XJo2CWwp44iqssZHZHr/happy_customer7.jpg',
    title: 'Coconut Experience',
    location: 'Southern Province, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/4995X4UbvdGEbTW4vCsDV5/happy_customer1.jpg',
    title: 'Guest with Tour Guide at Cave Temple',
    location: 'Dambulla, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/skhwNVBDeytHx8c9yngATi/happy_custormer_7.jpg',
    title: 'Cultural Ceremony Experience',
    location: 'Kandy, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/qp59CEpji28dA7HGvQfsp3/happy_custormer_8.jpg',
    title: 'Tea Plantation Visit',
    location: 'Nuwara Eliya, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/vWqnxLQHgLogF1io3TfVo5/happy_custormer_10.jpg',
    title: 'Evening Dinner with Guide',
    location: 'Colombo, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/mfHcMRfvjdYRWiwvnaVAo2/happy_custormer9.jpg',
    title: 'Tea Tasting Experience',
    location: 'Nuwara Eliya Tea Country, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/rfamPXerLygEtXWSqEUhCN/happy_custormer14.jpg',
    title: 'River Safari Experience',
    location: 'Madu River, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/dTiCQStM6RiJLG8goC7KLX/happy_custormer_15.jpg',
    title: 'Young Explorer on Boat Tour',
    location: 'Madu River, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/kZiEYyAzueRiCGW3LnUk6L/happy_custormer_16.jpg',
    title: 'Family at Ancient Ruins',
    location: 'Polonnaruwa, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/hHBijY1FEfndQvcTvq2yjh/happy_custormer_18.jpg',
    title: 'Family Tour Group with Guide',
    location: 'Kandy, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/vSAN3E99rgZB7PM1vT1aA2/happy_custormer_19.jpg',
    title: 'Waterfall Excursion with Guide',
    location: 'Ramboda Falls, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/5FhxPCp8xmYUgqNjsLtDCR/happy_customer1.jpg',
    title: 'Guest with Guide at Dambulla Cave Temple',
    location: 'Dambulla, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/x4nL2arCgAVWh948LhbMC3/happy_customer_3.jpg',
    title: 'Travelers with Guide at Cave Temple',
    location: 'Dambulla, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/wxtqF5bv5oN6w7PM3VXvgu/warm_welcomes.jpg',
    title: 'Family Welcome at Luxury Hotel',
    location: 'Colombo, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/reQRfSmGLM1e5exNne9DYd/happy_custormer_13.jpg',
    title: 'Family Tractor Safari Adventure',
    location: 'Rural Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/f3DntYXCBajShoaU7cpkb5/happy_custormer_34.jpg',
    title: 'Couple at Rice Terraces',
    location: 'Ella, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/quvuckd6yEWkxStMBfNbGw/happy_custormer_32.jpg',
    title: 'Couple at Mihintale Sacred Steps',
    location: 'Mihintale, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/pmaUZ8UvgrE3N3PrNubMKu/happy_custormer_30.jpg',
    title: 'Rainy Day at Nine Arch Bridge',
    location: 'Ella, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/rWgVwKQmT81be4U4y8Nhvs/happy_custormer_29.jpg',
    title: 'Waterfall Trek Adventure',
    location: 'Central Highlands, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/qs4YG1MFBf5DwBT9og1uSK/happy_custormer_23.jpg',
    title: 'Senior Couple at Tea Plantation',
    location: 'Nuwara Eliya, Sri Lanka',
    category: 'guests',
  },
  {
    url: 'https://uploadthingy.s3.us-west-1.amazonaws.com/dSSyQSPkNUgfNy6rKqe3ob/happy_custormer20.jpg',
    title: 'Zipline Adventure Experience',
    location: 'Ella Adventure Park, Sri Lanka',
    category: 'guests',
  },
]
// Updated videos data with Sri Lanka content using uploaded images
const videos = [
  {
    title: 'Exploring Sri Lanka',
    location: 'Various Locations, Sri Lanka',
    description:
      'Journey through the diverse landscapes and cultural heritage of Sri Lanka, from ancient ruins to pristine beaches.',
    thumbnail:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/obwacKgv1BhiiTsDVFzPaT/bg3.png',
  },
  {
    title: 'Wildlife Safari',
    location: 'Yala National Park, Sri Lanka',
    description:
      "Experience the thrill of witnessing Sri Lanka's magnificent wildlife including elephants, leopards, and diverse bird species in their natural habitat.",
    thumbnail:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/4iNbKQDGe98ZafS1FcUK9A/safari2.jpg',
  },
  {
    title: 'Cultural Heritage',
    location: 'Kandy, Sri Lanka',
    description:
      'Discover the rich cultural heritage of Sri Lanka through its ancient temples, colorful festivals, and traditional arts and crafts.',
    thumbnail:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/j4eKVgUgWV71nCcAmRW6iS/dalada.jpg',
  },
]
export default Gallery
