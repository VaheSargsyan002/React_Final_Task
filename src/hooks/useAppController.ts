import { useAuth } from './useAuth'
import { useModalFlow } from './useModalFlow'
import { useQuizLibrary } from './useQuizLibrary'
import { useRoute } from './useRoute'

export function useAppController() {
  const { route, navigate } = useRoute()
  const { user, login, logout } = useAuth()
  const quizLibrary = useQuizLibrary()
  const modalFlow = useModalFlow({ user })

  const activeQuizId = route.params.get('id') ?? ''
  const activeQuiz = quizLibrary.findQuizById(activeQuizId)

  const handleLogin = (username: string) => {
    login(username)
    modalFlow.closeLogin()
  }

  const handleLogout = () => {
    logout()
    modalFlow.closeLogin()
    modalFlow.closeCreateQuiz()
    navigate('/')
  }

  const handleQuizCreated = (quizId: string) => {
    quizLibrary.refreshGeneratedQuizzes()
    modalFlow.closeCreateQuiz()
    navigate(`/passquiz?id=${quizId}`)
  }

  return {
    route,
    navigate,
    user,
    activeQuiz,
    quizzes: quizLibrary.quizzes,
    results: quizLibrary.results,
    showLogin: modalFlow.showLogin,
    showCreateQuiz: modalFlow.showCreateQuiz,
    openLogin: modalFlow.openLogin,
    closeLogin: modalFlow.closeLogin,
    openCreateQuiz: modalFlow.openCreateQuiz,
    closeCreateQuiz: modalFlow.closeCreateQuiz,
    handleLogin,
    handleLogout,
    handleQuizCreated,
    handleResultSaved: quizLibrary.saveResultInState,
  }
}
