import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
interface PageLoaderProps {
  children: React.ReactNode
}
const PageLoader: React.FC<PageLoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // Check if document is already loaded
    if (document.readyState === 'complete') {
      setIsLoading(false)
      return
    }
    // Handle page load
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false)
      }, 300) // Small delay for smoother transition
    }
    window.addEventListener('load', handleLoad)
    // Start a timer to hide loader after a maximum time (for slow connections)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    return () => {
      window.removeEventListener('load', handleLoad)
      clearTimeout(timer)
    }
  }, [])
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600 font-medium">Loading WinTours...</p>
        </div>
      </div>
    )
  }
  return <>{children}</>
}
export default PageLoader
