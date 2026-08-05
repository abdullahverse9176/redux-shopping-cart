'use client'

import { Provider } from 'react-redux'
import { store } from '@/app/store/store'
import { useEffect } from 'react'
import { loadCart } from '@/app/store/cartSlice'

// ==========================================
// REDUX PROVIDER WRAPPER FOR NEXT.JS SSR
// ==========================================
// Next.js App Router default me Server Components use karta hai. Redux Provider client-side context use karta hai.
// Isliye hum ek dedicated Client Component 'Providers' banate hain (using 'use client')
// taake hum isey layout.jsx me wrap kar saken bina poore layout ko Client Component banaye.
export function Providers({ children }) {
  // Safe Client-Side Hydration:
  // Next.js me Server-side rendering (SSR) hoti hai jahan 'localStorage' available nahi hota.
  // Isliye hum render complete hone ke baad 'useEffect' me localStorage se cart load karte hain.
  // Is se hydration mismatch error se bach jaate hain jo Next.js me aam hai.
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart-storage-redux')
    if (savedCart) {
      try {
        store.dispatch(loadCart(JSON.parse(savedCart)))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  return <Provider store={store}>{children}</Provider>
}
