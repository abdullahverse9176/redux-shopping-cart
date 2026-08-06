'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts, addToCart } from '@/app/store/cartSlice'

export default function ProductList() {
  const dispatch = useDispatch()
  
  // useSelector ke zariye global store state se products read kar rahe hain
  const products = useSelector((state) => state.cartStore.products)
  
  // Local state for loading and error
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // API Call component ke andar hi handle ho rahi hai
    const getProducts = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('https://fakestoreapi.com/products?limit=6')
        if (!res.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await res.json()
        
        // Redux store ko updated products se update karenge
        dispatch(setProducts(data))
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    getProducts()
  }, [dispatch])

  if (isLoading) return <p style={{ padding: '10px' }}>Loading products...</p>
  if (error) return <p style={{ padding: '10px', color: 'red' }}>Error: {error}</p>

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