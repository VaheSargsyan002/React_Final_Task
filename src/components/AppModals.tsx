import { LoginModal } from './LoginModal'
import { QuizCreateModal } from './QuizCreateModal'

type AppModalsProps = {
  showLogin: boolean
  showCreateQuiz: boolean
  onCloseLogin: () => void
  onCloseCreateQuiz: () => void
  onLogin: (username: string) => void
  onQuizCreated: (quizId: string) => void
}

export function AppModals({
  showLogin,
  showCreateQuiz,
  onCloseLogin,
  onCloseCreateQuiz,
  onLogin,
  onQuizCreated,
}: AppModalsProps) {
  return (
    <>
      {showLogin && (
        <LoginModal onClose={onCloseLogin} onLogin={onLogin} />
      )}
      {showCreateQuiz && (
        <QuizCreateModal
          onClose={onCloseCreateQuiz}
          onCreated={onQuizCreated}
        />
      )}
    </>
  )
}
