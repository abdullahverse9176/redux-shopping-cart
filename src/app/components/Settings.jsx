// src/app/components/Settings.jsx
'use client' // Next.js App Router ke liye important hai

import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme, increaseFontSize, decreaseFontSize } from '../store/cartSlice'

export default function Settings() {
  const dispatch = useDispatch()
  
  // useSelector ke zariye states select karna
  const isDarkMode = useSelector((state) => state.cartStore.isDarkMode)
  const fontSize = useSelector((state) => state.cartStore.fontSize)

  return (
    <div 
      className="p-6 rounded-lg transition-all duration-300"
      style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
        color: isDarkMode ? '#f8fafc' : '#1e293b',
      }}
    >
      <h2 className="font-bold mb-4">
        UI Settings Controller
      </h2>

      <p className="mb-4">
        Current Theme: <strong>{isDarkMode ? 'Dark Mode 🌙' : 'Light Mode ☀️'}</strong>
      </p>
      <p className="mb-4">
        Current Font Size: <strong>{fontSize}px</strong>
      </p>

      <div className="flex flex-col gap-3">
        {/* Theme Toggle Button */}
        <button 
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Toggle Theme
        </button>

        {/* Font Size Adjusters */}
        <div className="flex gap-2">
          <button 
            onClick={() => dispatch(increaseFontSize())}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            A+ (Increase Size)
          </button>
          <button 
            onClick={() => dispatch(decreaseFontSize())}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            A- (Decrease Size)
          </button>
        </div>
      </div>
    </div>
  )
}
