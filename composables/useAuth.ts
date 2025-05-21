export const useAuth = () => {
  const isAuthenticated = ref(false)

  const login = async () => {
    try {
      const { data } = await useFetch('/api/auth')
      if (data.value?.authenticated) {
        isAuthenticated.value = true
        if (import.meta.client) {
          localStorage.setItem('isAuthenticated', 'true')
        }
      }
    } catch (error) {
      console.error('Erro na autenticação:', error)
      isAuthenticated.value = false
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    if (import.meta.client) {
      localStorage.removeItem('isAuthenticated')
    }
  }

  const checkAuth = () => {
    if (import.meta.client) {
      isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
    }
    return isAuthenticated.value
  }

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
} 