Here's the updated code with the text aligned closely together and the container matching the image height:

```vue
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Product Management</h1>
          <div class="flex items-center gap-4">
            <div class="relative w-64">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input 
                type="text" 
                v-model="searchQuery"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
              >
            </div>
            <router-link 
              to="/products/new"
              class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      
      <nav class="flex text-sm text-gray-600 mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <router-link to="/products" class="hover:text-gray-900 transition">
              Products
            </router-link>
          </li>
          <li><span class="mx-1">/</span></li>
          <li class="font-medium text-gray-900 truncate max-w-xl">
            {{ product?.title || 'Loading...' }}
          </li>
        </ol>
      </nav>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
        {{ error }}
      </div>

      
      <div v-else-if="product" class="bg-white rounded-xl shadow-sm border">
        <div class="p-8">
      
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
     
            <div class="flex items-center justify-center">
              <img :src="mainImage" :alt="product.title"
                class="w-full h-96 object-cover rounded-xl shadow-lg">
            </div>

          
            <div class="flex flex-col h-96">
              <div class="space-y-4">
                <h1 class="text-3xl font-bold text-gray-900">{{ product.title }}</h1>
                <p class="text-gray-600 text-lg leading-relaxed">{{ product.description }}</p>
              </div>
              <div class="mt-auto">
                <button @click="handleEdit"
                  class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
                  Edit Product
                </button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
            <div></div>

          
            <div class="space-y-4">
              <!-- Price -->
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Price</h3>
                <div class="flex items-baseline gap-4">
                  <span class="text-4xl font-bold text-gray-900">${{ product.price.toFixed(2) }}</span>
                  <span v-if="product.discountPercentage"
                    class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    -{{ product.discountPercentage }}% OFF
                  </span>
                </div>
              </div>

              <!-- Category -->
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Category</h3>
                <p class="text-lg font-medium text-gray-900 capitalize">{{ product.category }}</p>
              </div>

              <!-- Stock -->
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Stock</h3>
                <div class="flex items-center gap-3">
                  <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    In Stock
                  </span>
                  <span class="text-gray-600 font-medium">{{ product.stock }} units</span>
                </div>
              </div>

              <!-- Description -->
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                <p class="text-gray-700 text-lg leading-8">{{ product.description }}</p>
              </div>
            </div>
          </div>

          <!-- Rating & Reviews -->
          <div v-if="product.rating" class="mt-8 pt-6 border-t">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
            <div class="flex items-start gap-8">
              <div class="text-center">
                <div class="text-5xl font-bold text-gray-900 mb-2">{{ product.rating }}</div>
                <div class="flex justify-center mb-2">
                  <span v-for="n in 5" :key="n"
                    class="text-2xl"
                    :class="n <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'">
                    ★
                  </span>
                </div>
                <p class="text-sm text-gray-600">Based on 120 reviews</p>
              </div>
              <div class="flex-1 space-y-2 max-w-md">
                <div v-for="star in 5" :key="star" class="flex items-center gap-3 text-sm">
                  <span class="w-10 text-gray-600">{{ 6 - star }} star</span>
                  <div class="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div class="bg-yellow-400 h-full transition-all"
                      :style="{ width: ratingDistribution[6 - star] + '%' }">
                    </div>
                  </div>
                  <span class="w-10 text-right font-medium text-gray-700">
                    {{ ratingDistribution[6 - star] }}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end gap-4 mt-8 pt-6 border-t">
            <router-link to="/products"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
              ← Back to Products
            </router-link>
            <button @click="handleEdit"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              Edit Product
            </button>
          </div>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-semibold text-gray-600 mb-4">Product Not Found</h2>
        <router-link to="/products"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          ← Back to Products
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const product = ref(null)
const mainImage = ref('')
const isLoading = ref(true)
const error = ref('')

const fetchProduct = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const data = await productsStore.fetchProductById(parseInt(route.params.id))
    product.value = data
    mainImage.value = data.thumbnail || data.images?.[0] || ''
  } catch (err) {
    error.value = 'Failed to load product. Please try again later.'
    console.error('Fetch error:', err)
  } finally {
    isLoading.value = false
  }
}

const handleEdit = () => {
  alert('Edit functionality coming soon!')
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this product? This cannot be undone.')) return
  try {
    await productsStore.deleteProduct(product.value.id)
    router.push('/products')
  } catch (err) {
    alert('Failed to delete product')
  }
}

// Realistic rating distribution based on overall rating
const ratingDistribution = computed(() => {
  if (!product.value?.rating) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  const r = Math.round(product.value.rating)
  return {
    5: r >= 5 ? 75 : r === 4 ? 55 : r === 3 ? 35 : 20,
    4: r >= 4 ? 15 : 25,
    3: 5,
    2: 3,
    1: 2
  }
})

onMounted(fetchProduct)
</script>
