import React, { useEffect, useState } from 'react'
const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    // Set a small delay to ensure the transition is visible
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  )
}
export default PageTransition
