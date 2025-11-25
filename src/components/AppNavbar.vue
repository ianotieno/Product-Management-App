<template>
    <div class="flex h-screen bg-gray-50">
      <!-- Mobile menu button -->
      <div class="lg:hidden fixed top-4 left-4 z-50">
        <button
          @click="isSidebarOpen = !isSidebarOpen"
          class="p-2 rounded-md bg-white shadow-lg text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
            />
          </svg>
        </button>
      </div>
  
      <!-- Sidebar Overlay (mobile only) -->
      <div
        v-if="isSidebarOpen"
        class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        @click="isSidebarOpen = false"
      ></div>
  
      <!-- Sidebar -->
      <aside
        class="w-64 bg-white shadow-lg flex flex-col fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      >
        <!-- Logo & Title -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <span class="text-amber-600 font-bold text-lg">P</span>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Agutu Tech</h1>
              <p class="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>
  
        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-1">
          <router-link
            to="/dashboard"
            class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 transition"
            active-class="bg-purple-100 text-purple-700 font-medium shadow-sm"
            @click="closeSidebarOnMobile"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
              <path d="M3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
              <path d="M14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            Dashboard
          </router-link>
  
          <router-link
            to="/products"
            class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 transition"
            active-class="bg-purple-100 text-purple-700 font-medium shadow-sm"
            @click="closeSidebarOnMobile"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 100-2H5a1 1 0 00-1 1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            Products
          </router-link>
  
          <router-link
            to="/orders"
            class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 transition"
            active-class="bg-purple-100 text-purple-700 font-medium shadow-sm"
            @click="closeSidebarOnMobile"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.895-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              <path d="M16 17a1 1 0 100-2 1 1 0 000 2zM7 17a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            Orders
          </router-link>
  
          <router-link
            to="/customers"
            class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 transition"
            active-class="bg-purple-100 text-purple-700 font-medium shadow-sm"
            @click="closeSidebarOnMobile"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Customers
          </router-link>
        </nav>
  
        <!-- Bottom Section - Settings and Logout -->
        <div class="p-4 border-t border-gray-100 space-y-2">
          <!-- Settings -->
          <router-link
            to="/settings"
            class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 transition"
            active-class="bg-purple-100 text-purple-700 font-medium shadow-sm"
            @click="closeSidebarOnMobile"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
            Settings
          </router-link>
  
          <!-- Logout Button -->
          <button
            @click="logout"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-indigo-700 text-white rounded-xl font-medium hover:bg-indigo-800 transition shadow-md"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
  
     
      <main class="flex-1 overflow-y-auto lg:ml-0 transition-all duration-300">
        <div class="lg:hidden h-16"></div> 
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  
  const router = useRouter()
  const authStore = useAuthStore()
  const isSidebarOpen = ref(false)
  
  const logout = () => {
    authStore.logout()
    router.push('/login')
  }
  
  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      isSidebarOpen.value = false
    }
  }
  </script>