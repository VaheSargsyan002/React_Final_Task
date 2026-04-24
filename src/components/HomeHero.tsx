import type { User } from '../types'

type HomeHeroProps = {
  user: User | null
  onCreateQuiz: () => void
  onLogin: () => void
}

export function HomeHero({ user, onCreateQuiz, onLogin }: HomeHeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <h1>Enterprise AI Quiz Platform</h1>
        <p className="hero-text">
          Harness the power of artificial intelligence to create, manage, and
          analyze professional quizzes. Built for enterprise-scale learning and
          assessment.
        </p>
        <button
          className="primary-button hero-create"
          onClick={user ? onCreateQuiz : onLogin}
          type="button"
        >
          <span aria-hidden="true">＋</span>
          Create Quiz
        </button>
      </div>
    </section>
  )
}
