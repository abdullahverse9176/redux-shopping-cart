import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ==========================================
// 1. ASYNC ACTION (Thunk)
// ==========================================
// Redux ke andar directly async api calls nahi ho saktin.
// Iske liye hum 'createAsyncThunk' use karte hain jo asynchronous actions manage karta hai.
// Yeh automatic teen actions dispatch karta hai: pending, fulfilled, aur rejected.
export const fetchProducts = createAsyncThunk(
  'cart/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('https://fakestoreapi.com/products?limit=6')
      if (!res.ok) {
        throw new Error('Server error occurred')
      }
      const data = await res.json()
      return data // Yeh data action.payload ban kar fulfilled state me jayega
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Initial State define karna: jo bilkul Zustand ki tarah state ki starting values hain
const initialState = {
  cart: [],
  products: [],
  isLoading: false,
  error: null,
}

// ==========================================
// 2. REDUX SLICE (Actions + Reducers)
// ==========================================
// Redux Toolkit me 'createSlice' se actions aur reducers ek hi jagah define hote hain.
// Redux Toolkit internally 'Immer' library use karta hai, jiski wajah se hum state ko
// directly "mutate" kar sakte hain (jaise state.cart.push), aur background me ye safe-immutable copy banata hai.
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
      // action.payload wo product hai jo component dispatch karega
      state.cart.push(action.payload)
    },

    // Cart se product remove karne ka action
    removeFromCart: (state, action) => {
      // action.payload idhar product ID hoga
      state.cart = state.cart.filter((item) => item.id !== action.payload)
    },

    // Cart ko clear karne ka action
    clearCart: (state) => {
      state.cart = []
    },
  },

  // ==========================================
  // 3. EXTRA REDUCERS (For Thunks / Async Actions)
  // ==========================================
  // Wo actions jo slice ke functions ke baahar generate hote hain (jaise Async Thunk ke actions: pending/fulfilled/rejected),
  // unhe hum extraReducers me builder ke zariye handle karte hain.
  extraReducers: (builder) => {
    builder
      // Jab API call shuru ho (loading state true karenge)
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      // Jab API call kamiyab ho jaye (products save karenge aur loading band)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.isLoading = false
      })
      // Jab API call fail ho jaye
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to fetch products'
      })
  },
})

// Hamein actions ko export karna hota hai taake components isey dispatch kar saken
export const {
  loadCart,
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions

// Final slice reducer ko export karenge jo store me register hoga
export default cartSlice.reducer
