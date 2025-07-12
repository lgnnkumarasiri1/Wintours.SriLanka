import React, { useEffect, useState } from 'react'
const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    // First show loading state
    setIsLoading(true)
    // When component mounts, simulate content loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      // After loading is complete, fade in the content
      const visibilityTimer = setTimeout(() => {
        setIsVisible(true)
      }, 50)
      return () => clearTimeout(visibilityTimer)
    }, 300) // Short loading time for better UX
    return () => clearTimeout(loadingTimer)
  }, [])
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
