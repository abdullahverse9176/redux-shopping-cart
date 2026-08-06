'use client'

import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '@/app/store/cartSlice'

export default function Cart() {
  const dispatch = useDispatch()
  
  // useSelector ke zariye state se cart array get kar rahe hain
  const cart = useSelector((state) => state.cartStore.cart)

  // Total Price calculate kar rahe hain
  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  return (
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
  )
}