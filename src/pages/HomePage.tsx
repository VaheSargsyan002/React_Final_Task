import { FeatureSection } from '../components/FeatureSection'
import { HomeHero } from '../components/HomeHero'
import { StatsRow } from '../components/StatsRow'
import type { Quiz, QuizResult, User } from '../types'

type HomePageProps = {
  user: User | null
  quizzes: Quiz[]
  results: Record<string, QuizResult>
  onCreateQuiz: () => void
  onLogin: () => void
  onNavigate: (to: string) => void
}

export function HomePage({
  user,
  onCreateQuiz,
  onLogin,
}: HomePageProps) {
  return (
    <main>
      <HomeHero user={user} onCreateQuiz={onCreateQuiz} onLogin={onLogin} />
      <FeatureSection />
      <StatsRow />
    </main>
  )
}
