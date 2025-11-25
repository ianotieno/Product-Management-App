import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth.js'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const isLoading = ref(false)
  const error = ref('')

  const authStore = useAuthStore()

  const getAuthHeaders = () => {
    return authStore.token ? { Authorization: `Bearer ${authStore.token}` } : {}
  }

  const fetchProducts = async () => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await axios.get('https://dummyjson.com/products', {
        headers: getAuthHeaders()
      })
      products.value = response.data.products
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch products'
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductById = async (id) => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`, {
        headers: getAuthHeaders()
      })
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch product'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const addProduct = async (productData) => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await axios.post('https://dummyjson.com/products/add', productData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        }
      })
      products.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to add product'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteProduct = async (id) => {
    isLoading.value = true
    error.value = ''
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`, {
        headers: getAuthHeaders()
      })
      products.value = products.value.filter(product => product.id !== id)
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete product'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    addProduct,
    deleteProduct
  }
})