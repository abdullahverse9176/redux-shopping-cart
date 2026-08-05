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
    <div style={{ border: '2px solid #10B981', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
      <h2>Shopping Cart ({cart.length})</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>{item.title.substring(0, 20)}...</span>
              <div>
                <strong style={{ marginRight: '10px' }}>${item.price}</strong>
                <button 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  style={{ background: '#EF4444', color: 'white', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <hr style={{ margin: '10px 0' }} />
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button 
            onClick={() => dispatch(clearCart())}
            style={{ background: '#374151', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  )
}