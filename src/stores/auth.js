
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          expiresInMins: 30,
        })
        
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

     
      token.value = data.accessToken || data.token
      user.value = data

     
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(data))

      return data
    } catch (error) {
      const msg = error.message || 'Invalid username or password'
      console.error('Login Error:', error)
      throw new Error(msg)
    }
  }

  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const restoreSession = () => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }


  restoreSession()

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    restoreSession
  }
})