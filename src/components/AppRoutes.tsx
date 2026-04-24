import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PassQuizPage } from '../pages/PassQuizPage'
import { QuizViewPage } from '../pages/QuizViewPage'
import { SearchPage } from '../pages/SearchPage'
import type { Route } from '../hooks/useRoute'
import type { Quiz, QuizResult, User } from '../types'

type AppRoutesProps = {
  route: Route
  user: User | null
  quizzes: Quiz[]
  results: Record<string, QuizResult>
  activeQuiz?: Quiz
  onCreateQuiz: () => void
  onLogin: () => void
  onNavigate: (to: string) => void
  onResultSaved: (result: QuizResult) => void
}

export function AppRoutes({
  route,
  user,
  quizzes,
  results,
  activeQuiz,
  onCreateQuiz,
  onLogin,
  onNavigate,
  onResultSaved,
}: AppRoutesProps) {
  const activeQuizId = route.params.get('id') ?? ''

  if (route.path === '/') {
    return (
      <HomePage
        user={user}
        quizzes={quizzes}
        results={results}
        onCreateQuiz={onCreateQuiz}
        onLogin={onLogin}
        onNavigate={onNavigate}
      />
    )
  }

  if (route.path === '/search') {
    return (
      <SearchPage
        user={user}
        quizzes={quizzes}
        results={results}
        onLogin={onLogin}
        onNavigate={onNavigate}
      />
    )
  }

  if (route.path === '/passquiz') {
    return (
      <PassQuizPage
        quiz={activeQuiz}
        existingResult={results[activeQuizId]}
        onResultSaved={onResultSaved}
        onNavigate={onNavigate}
      />
    )
  }

  if (route.path === '/quiz') {
    return (
      <QuizViewPage
        quiz={activeQuiz}
        result={results[activeQuizId]}
        onNavigate={onNavigate}
      />
    )
  }

  return <NotFoundPage onNavigate={onNavigate} />
}
