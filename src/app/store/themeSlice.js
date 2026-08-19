import { createSlice } from '@reduxjs/toolkit'

// Initial State define karna
const initialState = {
  theme: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action) => {
      state.theme = action.payload || 'light'
    },
  },
})

// Actions ko export karenge
export const { toggleTheme, setTheme } = themeSlice.actions

// Slice reducer ko export karenge
export default themeSlice.reducer
