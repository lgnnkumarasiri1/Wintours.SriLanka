import React from 'react'
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
}
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  }
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-green-600 rounded-full animate-spin`}
      ></div>
    </div>
  )
}
export default LoadingSpinner
