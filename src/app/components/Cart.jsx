'use client'

import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '@/app/store/cartSlice'
import { toggleTheme } from '@/app/store/themeSlice'

export default function Cart() {
  const dispatch = useDispatch()
  
  // useSelector ke zariye state se values read kar rahe hain
  const cart = useSelector((state) => state.cartStore.cart)
  const theme = useSelector((state) => state.themeStore.theme)

  // Total Price calculate kar rahe hain
  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  return (
    <>
    <div className="border border-emerald-200 p-6 rounded-2xl bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Shopping Cart</h2>
        <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">
          {cart.length} Items
        </span>
      </div>

      {cart.length === 0 ? (
        <p className="text-slate-500 text-center py-6 font-medium bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="divide-y divide-slate-100 mb-6">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex justify-between items-center py-3">
                <span className="text-sm font-medium text-slate-700">{item.title.substring(0, 20)}...</span>
                <div className="flex items-center gap-3">
                  <strong className="text-sm font-semibold text-slate-900">${item.price}</strong>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:text-red-700 text-xs font-semibold hover:bg-red-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-slate-100 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">Total Price:</span>
              <span className="text-xl font-extrabold text-slate-900">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={() => dispatch(clearCart())}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium text-sm py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>

    <div className={`border p-5 rounded-2xl shadow-sm mt-4 flex items-center justify-between transition-all hover:shadow-md ${
      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      <div className="flex items-center gap-3">
        {/* Dynamic Icon Container */}
        <div className={`p-2.5 rounded-xl transition-colors ${
          theme === 'dark' ? 'bg-slate-800 text-yellow-300' : 'bg-amber-50 text-amber-600'
        }`}>
          <span className="text-lg">{theme === 'dark' ? '🌙' : '☀️'}</span>
        </div>
        <div>
          <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Theme Mode</h3>
          <p className="text-xs text-slate-400">Switch between light and dark look</p>
        </div>
      </div>

      {/* Pill Toggle Switch Button */}
      <button 
        onClick={() => dispatch(toggleTheme())}
        type="button"
        className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          theme === 'dark' ? 'bg-blue-600' : 'bg-slate-200'
        }`}
      >
        <span className="sr-only">Toggle theme</span>
        {/* Toggle knob */}
        <span className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
          theme === 'dark' ? 'translate-x-5.5' : 'translate-x-0'
        }`} />
      </button>
    </div>

    </>
  )
}