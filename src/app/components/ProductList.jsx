'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts, addToCart } from '@/app/store/cartSlice'

export default function ProductList() {
  const dispatch = useDispatch()
  
  // useSelector ke zariye global store state se data read kar rahe hain
  const products = useSelector((state) => state.cartStore.products)
  const isLoading = useSelector((state) => state.cartStore.isLoading)

  useEffect(() => {
    // Redux me thunk action ko execute karne ke liye dispatch karna lazmi hai
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) return <p style={{ padding: '10px' }}>Loading products...</p>

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h2>Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #eee', padding: '10px', borderRadius: '5px' }}>
            <h4 style={{ fontSize: '14px', margin: '5px 0' }}>{product.title.substring(0, 25)}...</h4>
            <p style={{ fontWeight: 'bold' }}>${product.price}</p>
            <button 
              onClick={() => dispatch(addToCart(product))}
              style={{ background: '#0070f3', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}