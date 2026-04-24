import { AppModals } from './components/AppModals'
import { AppRoutes } from './components/AppRoutes'
import { Header } from './components/Header'
import { useAppController } from './hooks/useAppController'
import './App.css'

function App() {
  const app = useAppController()

  return (
    <>
      <Header
        user={app.user}
        path={app.route.path}
        onNavigate={app.navigate}
        onLogin={app.openLogin}
        onLogout={app.handleLogout}
      />

      <AppRoutes
        route={app.route}
        user={app.user}
        quizzes={app.quizzes}
        results={app.results}
        activeQuiz={app.activeQuiz}
        onCreateQuiz={app.openCreateQuiz}
        onLogin={app.openLogin}
        onNavigate={app.navigate}
        onResultSaved={app.handleResultSaved}
      />

      <AppModals
        showLogin={app.showLogin}
        showCreateQuiz={app.showCreateQuiz}
        onCloseLogin={app.closeLogin}
        onCloseCreateQuiz={app.closeCreateQuiz}
        onLogin={app.handleLogin}
        onQuizCreated={app.handleQuizCreated}
      />
    </>
  )
}

export default App
