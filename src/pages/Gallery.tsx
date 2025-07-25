import React, { useEffect, useState, useRef, lazy } from 'react'
import { useLocation } from 'react-router-dom'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Move,
} from 'lucide-react'
import ImageLoader from '../components/ImageLoader'
import LoadingSpinner from '../components/LoadingSpinner'
const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [filteredImages, setFilteredImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageZoomed, setImageZoomed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const galleryGridRef = useRef(null)
  const topRef = useRef(null)
  const zoomedImageRef = useRef(null)
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
    // Set loading state
    setIsLoading(true)
    // Check if images are cached and ready
    const checkImagesLoaded = () => {
      const imagesToCheck =
        activeCategory === 'all'
          ? galleryImages
          : galleryImages.filter((img) => img.category === activeCategory)
      let loadedCount = 0
      const totalImages = Math.min(imagesToCheck.length, 8) // Check first 8 images
      imagesToCheck.slice(0, 8).forEach((image) => {
        const img = new Image()
        img.onload = () => {
          loadedCount++
          if (loadedCount >= totalImages) {
            setIsLoading(false)
          }
        }
        img.onerror = () => {
          loadedCount++
          if (loadedCount >= totalImages) {
            setIsLoading(false)
          }
        }
        img.src = image.url
        // If image is already cached
        if (img.complete) {
          loadedCount++
          if (loadedCount >= totalImages) {
            setIsLoading(false)
          }
        }
      })
      // Fallback timer
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
    checkImagesLoaded()
  }, [location])
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredImages(galleryImages)
    } else {
      setFilteredImages(
        galleryImages.filter((img) => img.category === activeCategory),
      )
    }
    // Set loading state when category changes
    setIsLoading(true)
    // Check if images in new category are loaded
    const checkCategoryImagesLoaded = () => {
      const imagesToCheck =
        activeCategory === 'all'
          ? galleryImages
          : galleryImages.filter((img) => img.category === activeCategory)
      let loadedCount = 0
      const totalImages = Math.min(imagesToCheck.length, 8) // Check first 8 images
      if (totalImages === 0) {
        setIsLoading(false)
        return
      }
      imagesToCheck.slice(0, 8).forEach((image) => {
        const img = new Image()
        img.onload = () => {
          loadedCount++
          if (loadedCount >= totalImages) {
            setIsLoading(false)
            scrollToGalleryGrid()
          }
        }
        img.onerror = () => {
          loadedCount++
          if (loadedCount >= totalImages) {
            setIsLoading(false)
            scrollToGalleryGrid()
          }
        }
        img.src = image.url
        // If image is already cached
        if (img.complete) {
          loadedCount++
          if (loadedCount >= totalImages) {
            setIsLoading(false)
            scrollToGalleryGrid()
          }
        }
      })
      // Fallback timer
      setTimeout(() => {
        setIsLoading(false)
        scrollToGalleryGrid()
      }, 2000)
    }
    checkCategoryImagesLoaded()
  }, [activeCategory])
  const scrollToGalleryGrid = () => {
    // Scroll to the gallery grid after filtering and loading
    if (galleryGridRef.current) {
      setTimeout(() => {
        galleryGridRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    }
  }
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }
  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
    setImageZoomed(false)
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden'
  }
  const closeLightbox = () => {
    setSelectedImage(null)
    setImageZoomed(false)
    // Restore body scrolling
    document.body.style.overflow = 'auto'
  }
  const goToPrevious = (e) => {
    e.stopPropagation()
    const newIndex =
      (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
    setImageZoomed(false)
  }
  const goToNext = (e) => {
    e.stopPropagation()
    const newIndex = (currentImageIndex + 1) % filteredImages.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
    setImageZoomed(false)
  }
  const toggleZoom = (e) => {
    e.stopPropagation()
    setImageZoomed(!imageZoomed)
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
      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Sri Lanka Gallery
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
              onClick={() => handleCategoryChange('guests')}
              className={`px-4 py-2 rounded-full ${activeCategory === 'guests' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
            >
              Our Guests
            </button>
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center my-12">
              <LoadingSpinner size="large" />
            </div>
          )}

          {/* Gallery Grid */}
          <div
            ref={galleryGridRef}
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
          >
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative group h-64">
                  <ImageLoader
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loadingClassName="bg-gray-100 w-full h-full"
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
          className="fixed inset-0 bg-black bg-opacity-90 z-[200] flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - Improved with larger clickable area and higher z-index */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              className="absolute right-2 top-2 text-white hover:text-gray-300 transition-colors z-50 bg-black bg-opacity-70 p-3 rounded-full cursor-pointer"
              aria-label="Close lightbox"
              style={{
                minWidth: '44px',
                minHeight: '44px',
              }}
            >
              <X size={24} />
            </button>
            {/* Zoom instruction indicator */}
            {imageZoomed && (
              <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-3 py-2 rounded-md z-40 flex items-center">
                <Move size={16} className="mr-2" />
                <span className="text-sm">Scroll to pan image</span>
              </div>
            )}
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className={`relative ${imageZoomed ? 'overflow-auto max-h-[70vh] max-w-full' : 'overflow-hidden max-h-[70vh] max-w-full'} ${imageZoomed ? 'cursor-move' : 'cursor-zoom-in'}`}
                style={{
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                }}
                ref={zoomedImageRef}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className={`${imageZoomed ? 'max-h-none max-w-none w-[250%] h-auto' : 'max-h-[70vh] max-w-full'} object-contain transition-all duration-300`}
                  onClick={toggleZoom}
                />
              </div>
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
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                  <p className="text-gray-300">{selectedImage.location}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={toggleZoom}
                    className="flex items-center bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-md text-sm"
                  >
                    {imageZoomed ? (
                      <>
                        <ZoomOut size={16} className="mr-1" />
                        Zoom Out
                      </>
                    ) : (
                      <>
                        <ZoomIn size={16} className="mr-1" />
                        Zoom In
                      </>
                    )}
                  </button>
                  <p className="text-sm text-gray-400 ml-4">
                    Image {currentImageIndex + 1} of {filteredImages.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
// Gallery images data remains the same
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
    location: 'Bandaranaike International Airport, Sri Lanka',
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
export default Gallery
