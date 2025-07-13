import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()
  useEffect(() => {
    // Reset states on location change or page refresh
    setIsLoading(true)
    setIsVisible(false)
    // Simulate content loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      // After loading is complete, fade in the content
      const visibilityTimer = setTimeout(() => {
        setIsVisible(true)
      }, 50)
      return () => clearTimeout(visibilityTimer)
    }, 300) // Short loading time for better UX
    return () => clearTimeout(loadingTimer)
  }, [location.pathname, location.key]) // Re-run effect on route change or page refresh
  // If loading, show a simple loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }
  return (
    <div
      className={`transition-opacity duration-400 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  )
}
export default PageTransition
