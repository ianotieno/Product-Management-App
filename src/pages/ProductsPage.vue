<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-6">
  <div class="flex justify-between items-start">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Products</h1>
      <p class="mt-1 text-sm text-gray-600">Manage your inventory and view product performance.</p>
    </div>
    <router-link 
      to="/products/new"
      class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
    >
    <div class="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      Add Product
    </router-link>
  </div>
</div>
  
        <!-- Search and Filters -->
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by product name..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-sm"
              >
            </div>
            <select
              v-model="categoryFilter"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-sm"
            >
              <option value="">Category</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <select
              v-model="stockFilter"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-sm"
            >
              <option value="">Stock Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <router-link
              to="/products/new"
              class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium whitespace-nowrap"
            >
              Add New Product
            </router-link>
          </div>
        </div>
  
        <!-- Loading State -->
        <div v-if="productsStore.isLoading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
  
        <!-- Error State -->
        <div v-else-if="productsStore.error" class="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">
          {{ productsStore.error }}
        </div>
  
        <!-- Products Grid -->
        <div v-else class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <!-- Table Header -->
          <div class="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div class="col-span-5">Product</div>
            <div class="col-span-2">Category</div>
            <div class="col-span-2">Price</div>
            <div class="col-span-2">Stock</div>
            <div class="col-span-1"></div>
          </div>
  
          <!-- Products List -->
          <div v-if="filteredProducts.length > 0">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition duration-150"
            >
              <!-- Product Info -->
              <div class="col-span-5">
                <div class="flex items-center space-x-3">
                  <img
                    class="h-10 w-10 rounded-lg object-cover"
                    :src="product.thumbnail"
                    :alt="product.title"
                  >
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">{{ product.title }}</h3>
                    <p class="text-sm text-gray-500 mt-1 line-clamp-2">
                      {{ truncateDescription(product.description) }}
                    </p>
                  </div>
                </div>
              </div>
  
              <!-- Category -->
              <div class="col-span-2 flex items-center">
                <span class="text-sm text-gray-900 capitalize">{{ product.category }}</span>
              </div>
  
              <!-- Price -->
              <div class="col-span-2 flex items-center">
                <span class="text-sm font-medium text-gray-900">${{ product.price }}</span>
              </div>
  
              <!-- Stock -->
              <div class="col-span-2 flex items-center">
                <span class="inline-flex items-center text-sm">
                  <span 
                    class="w-2 h-2 rounded-full mr-2"
                    :class="{
                      'bg-green-500': product.stock > 50,
                      'bg-yellow-500': product.stock > 0 && product.stock <= 50,
                      'bg-red-500': product.stock === 0
                    }"
                  ></span>
                  <span :class="{
                    'text-green-700': product.stock > 50,
                    'text-yellow-700': product.stock > 0 && product.stock <= 50,
                    'text-red-700': product.stock === 0
                  }">
                    {{ getStockStatus(product.stock) }}
                  </span>
                </span>
              </div>
  
              <!-- Actions -->
              <div class="col-span-1 flex items-center justify-end">
                <router-link
                  :to="`/products/${product.id}`"
                  class="text-primary hover:text-blue-700 text-sm font-medium"
                >
                  View
                </router-link>
              </div>
            </div>
          </div>
  
          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <p class="text-gray-500 text-sm">No products found.</p>
          </div>
  
          <!-- Pagination -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">1</span> to <span class="font-medium">{{ filteredProducts.length }}</span> of 
              <span class="font-medium">{{ filteredProducts.length }}</span> results
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useProductsStore } from '../stores/products.js'
  
  const productsStore = useProductsStore()
  const searchQuery = ref('')
  const categoryFilter = ref('')
  const stockFilter = ref('')
  
  const categories = computed(() => {
    const allCategories = productsStore.products.map(p => p.category)
    // Fixed: Convert Set to Array properly
    return Array.from(new Set(allCategories))
  })
  
  const filteredProducts = computed(() => {
    let filtered = productsStore.products
  
    if (searchQuery.value) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }
  
    if (categoryFilter.value) {
      filtered = filtered.filter(product =>
        product.category === categoryFilter.value
      )
    }
  
    if (stockFilter.value) {
      if (stockFilter.value === 'in-stock') {
        filtered = filtered.filter(product => product.stock > 50)
      } else if (stockFilter.value === 'low-stock') {
        filtered = filtered.filter(product => product.stock > 0 && product.stock <= 50)
      } else if (stockFilter.value === 'out-of-stock') {
        filtered = filtered.filter(product => product.stock === 0)
      }
    }
  
    return filtered
  })
  
  const truncateDescription = (description) => {
    return description.length > 80 ? description.substring(0, 80) + '...' : description
  }
  
  const getStockStatus = (stock) => {
    if (stock > 50) return `${stock} In Stock`
    if (stock > 0 && stock <= 50) return `${stock} Low Stock`
    return 'Out of Stock'
  }
  
  onMounted(() => {
    productsStore.fetchProducts()
  })
  </script>