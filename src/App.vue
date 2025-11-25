<template>
  <div id="app">
    <AppNavbar v-if="authStore.isAuthenticated" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth.js'
import AppNavbar from './components/AppNavbar.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.restoreSession()
})
</script>