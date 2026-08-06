import { createSlice } from '@reduxjs/toolkit'

// Initial State define karna
const initialState = {
  cart: [],
  theme: 'light'
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // LocalStorage se cart data load karne ke liye
    loadCart: (state, action) => {
      state.cart = action.payload || []
    },

    // Cart me product add karne ka action
    addToCart: (state, action) => {
      state.cart.push(action.payload)
    },

    // Cart se product remove karne ka action
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
    },

    // Cart ko clear karne ka action
    clearCart: (state) => {
      state.cart = []
    },

    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },

    setTheme: (state, action) => {
      state.theme = action.payload || 'light'
    }
  },
})

// Hamein actions ko export karna hota hai taake components isey dispatch kar saken
export const {
  loadCart,
  addToCart,
  removeFromCart,
  clearCart,
  toggleTheme,
  setTheme,
} = cartSlice.actions

// Final slice reducer ko export karenge jo store me register hoga
export default cartSlice.reducer
