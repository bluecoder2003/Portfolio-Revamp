'use client'

import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isBlue = theme === 'blue'

  return (
    <button
      onClick={toggleTheme}
      className="group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105"
      style={{
        backgroundColor: isBlue ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        borderColor: isBlue ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
      }}
      aria-label={`Switch to ${isBlue ? 'white' : 'blue'} theme`}
    >
      {/* Toggle track */}
      <div
        className="relative w-8 h-4 rounded-full transition-colors duration-300"
        style={{
          backgroundColor: isBlue ? '#3B6FE0' : '#D1D5DB',
        }}
      >
        {/* Toggle dot */}
        <div
          className="absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300"
          style={{
            left: isBlue ? '17px' : '2px',
            backgroundColor: isBlue ? '#ffffff' : '#6B7280',
          }}
        />
      </div>
      <span
        className="text-xs font-normal transition-colors duration-300 select-none"
        style={{
          color: isBlue ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
        }}
      >
        {isBlue ? 'Blue' : 'White'}
      </span>
    </button>
  )
}

export default ThemeToggle
