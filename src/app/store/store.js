import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

// ==========================================
// REDUX STORE CONFIGURATION
// ==========================================
// Redux Store poori app ka global "Single Source of Truth" (ek hi main state object) hota hai.
// Yahan hum configureStore ke zariye apne reducers ko register karte hain.
export const store = configureStore({
  reducer: {
    // Hamara cartSlice yahan 'cartStore' ke naam se state key banayega
    cartStore: cartReducer,
  },
})

// ==========================================
// PERSISTENCE (LocalStorage sync)
// ==========================================
// Zustand me jo hum automatic local storage persist karte the,
// Redux me hum store.subscribe ke zariye jab bhi state change ho, cart data ko sync kar sakte hain.
// Hum check karenge ke environment browser ka hai (client-side) taake build error na aaye.
if (typeof window !== 'undefined') {
  store.subscribe(() => {
    const state = store.getState()
    // Jab bhi state change hogi, cart ko local storage me save kar denge
    localStorage.setItem('shopping-cart-storage-redux', JSON.stringify(state.cartStore.cart))
  })
}
