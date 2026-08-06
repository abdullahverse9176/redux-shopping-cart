'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '@/app/store/cartSlice'

export default function ProductList() {
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])
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
        
        setProducts(data)

      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    getProducts()
  }, [])

  if (isLoading) return <p className="p-4 text-slate-500 animate-pulse text-center font-medium">Loading products...</p>
  if (error) return <p className="p-4 text-red-600 bg-red-50 border border-red-200 rounded-lg text-center font-medium">Error: {error}</p>

  return (
    <div className="border border-slate-200 p-6 rounded-2xl bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-slate-800 tracking-tight">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border border-slate-100 p-4 rounded-xl hover:border-blue-200 hover:shadow-md transition-all flex flex-col justify-between bg-slate-50/50">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2 leading-snug">{product.title.substring(0, 25)}...</h4>
              <p className="text-lg font-bold text-slate-900 mb-4">${product.price}</p>
            </div>
            <button 
              onClick={() => dispatch(addToCart(product))}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-2 px-3 rounded-lg transition-colors cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}