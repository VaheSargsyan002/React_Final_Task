import { useState } from 'react'
import { clearUser, getStoredUser, saveUser } from '../services/storage'
import type { User } from '../types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => getStoredUser())

  const login = (username: string) => {
    setUser(saveUser(username))
  }

  const logout = () => {
    clearUser()
    setUser(null)
  }

  return {
    user,
    login,
    logout,
  }
}
