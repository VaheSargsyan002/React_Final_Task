import { useState } from 'react'
import type { User } from '../types'

type UseModalFlowArgs = {
  user: User | null
}

export function useModalFlow({ user }: UseModalFlowArgs) {
  const [showLogin, setShowLogin] = useState(false)
  const [showCreateQuiz, setShowCreateQuiz] = useState(false)

  const openLogin = () => setShowLogin(true)
  const closeLogin = () => setShowLogin(false)

  const openCreateQuiz = () => {
    if (!user) {
      openLogin()
      return
    }

    setShowCreateQuiz(true)
  }

  const closeCreateQuiz = () => setShowCreateQuiz(false)

  return {
    showLogin,
    showCreateQuiz,
    openLogin,
    closeLogin,
    openCreateQuiz,
    closeCreateQuiz,
  }
}
