import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
interface ImageLoaderProps {
  src: string
  alt: string
  className?: string
  loadingClassName?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  onLoad?: () => void
}
const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  className = '',
  loadingClassName = 'bg-gray-100',
  objectFit = 'cover',
  onLoad,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true)
    setIsError(false)
    // Check if image is cached
    const cachedImage = new Image()
    cachedImage.src = src
    if (cachedImage.complete) {
      // Image is already cached
      setImgSrc(src)
      setIsLoading(false)
      if (onLoad) onLoad()
    } else {
      // Image needs to be loaded
      cachedImage.onload = () => {
        setImgSrc(src)
        setIsLoading(false)
        if (onLoad) onLoad()
      }
      cachedImage.onerror = () => {
        setIsError(true)
        setIsLoading(false)
      }
    }
    return () => {
      // Clean up
      cachedImage.onload = null
      cachedImage.onerror = null
    }
  }, [src, onLoad])
  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center ${loadingClassName} ${className}`}
      >
        <LoadingSpinner size="small" />
      </div>
    )
  }
  if (isError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    )
  }
  return (
    <img
      src={imgSrc || ''}
      alt={alt}
      className={className}
      style={{
        objectFit,
      }}
    />
  )
}
export default ImageLoader
