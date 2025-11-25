<template>
    <div class="min-h-screen bg-gray-50">
    
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
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
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
  
      <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="flex text-sm text-gray-600 mb-8" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2">
            <li>
              <router-link to="/products" class="hover:text-gray-900 transition">
                Products
              </router-link>
            </li>
            <li><span class="mx-2">/</span></li>
            <li class="font-medium text-gray-900">Add New Product</li>
          </ol>
        </nav>
  
        <!-- Main Content -->
        <div class="bg-white rounded-xl shadow-sm border p-8">
          <!-- Page Header -->
          <div class="mb-10">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">Add New Product</h1>
            <p class="text-gray-600 text-lg">Enter the details below to add a new item to your inventory.</p>
          </div>
  
          <!-- Product Information Section -->
          <section class="mb-12">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Product Information</h2>
            
            <!-- Product Title -->
            <div class="mb-8">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Product Title</h3>
              <input 
                type="text" 
                v-model="product.title"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product title"
              >
            </div>
  
            <!-- Product Description -->
            <div class="mb-8">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                <span class="font-semibold">Product Description</span>
              </h3>
              <textarea 
                v-model="product.description"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide a detailed description of the product"
              ></textarea>
            </div>
  
            <div class="border-t border-gray-200 pt-8"></div>
          </section>
  
          <!-- Pricing & Inventory Section -->
          <section class="mb-12">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Pricing & Inventory</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <!-- Price -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Price</h3>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input 
                    type="number" 
                    v-model="product.price"
                    class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  >
                </div>
              </div>
  
              <!-- Stock Quantity -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Stock Quantity</h3>
                <input 
                  type="number" 
                  v-model="product.stock"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter stock quantity"
                  min="0"
                >
              </div>
            </div>
  
            <!-- Category -->
            <div class="mb-8">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Category</h3>
              <select 
                v-model="product.category"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
                <option value="sports">Sports</option>
                <option value="books">Books</option>
              </select>
            </div>
  
            <!-- Brand -->
            <div class="mb-8">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Brand</h3>
              <input 
                type="text" 
                v-model="product.brand"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter brand name"
              >
            </div>
  
            <!-- Media Upload -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Media</h3>
              <div 
                @drop="handleDrop"
                @dragover="handleDragOver"
                @click="triggerFileInput"
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="mt-4">
                  <p class="text-lg font-medium text-gray-900">Click to upload or drag and drop</p>
                  <p class="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (MAX: 800x400px)</p>
                </div>
                <input 
                  ref="fileInput"
                  type="file" 
                  @change="handleFileSelect"
                  class="hidden"
                  accept="image/*"
                  multiple
                >
              </div>
              
              <!-- Preview Uploaded Images -->
              <div v-if="uploadedImages.length > 0" class="mt-4">
                <h4 class="text-md font-medium text-gray-900 mb-3">Uploaded Images</h4>
                <div class="grid grid-cols-4 gap-4">
                  <div v-for="(image, index) in uploadedImages" :key="index" class="relative">
                    <img :src="image.preview" class="w-full h-20 object-cover rounded-lg">
                    <button 
                      @click="removeImage(index)"
                      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
          <!-- Action Buttons -->
          <div class="flex justify-end gap-4 pt-8 border-t">
            <router-link to="/products"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
              Cancel
            </router-link>
            <button 
              @click="handleSubmit"
              :disabled="!isFormValid"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
           Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useProductsStore } from '@/stores/products'
  
  const router = useRouter()
  const productsStore = useProductsStore()
  const fileInput = ref(null)
  
  const product = ref({
    title: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    brand: '',
    images: []
  })
  
  const uploadedImages = ref([])
  
  const isFormValid = computed(() => {
    return product.value.title && 
           product.value.description && 
           product.value.price > 0 && 
           product.value.category
  })
  
  const triggerFileInput = () => {
    fileInput.value?.click()
  }
  
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          uploadedImages.value.push({
            file,
            preview: e.target.result
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }
  
  const handleDragOver = (event) => {
    event.preventDefault()
  }
  
  const handleDrop = (event) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          uploadedImages.value.push({
            file,
            preview: e.target.result
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }
  
  const removeImage = (index) => {
    uploadedImages.value.splice(index, 1)
  }
  
  const handleSubmit = async () => {
    if (!isFormValid.value) return
  
    try {
      // Prepare form data
      const formData = new FormData()
      formData.append('title', product.value.title)
      formData.append('description', product.value.description)
      formData.append('price', product.value.price)
      formData.append('stock', product.value.stock)
      formData.append('category', product.value.category)
      formData.append('brand', product.value.brand)
      
      // Append images
      uploadedImages.value.forEach(image => {
        formData.append('images', image.file)
      })
  
      await productsStore.addProduct(formData)
      router.push('/products')
    } catch (error) {
      alert('Failed to add product')
      console.error('Add product error:', error)
    }
  }
  </script>