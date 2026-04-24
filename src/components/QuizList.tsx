import { QuizCard } from './QuizCard'
import type { Quiz, QuizResult } from '../types'

type QuizListProps = {
  quizzes: Quiz[]
  totalCount: number
  results: Record<string, QuizResult>
  onOpen: (quizId: string) => void
  onTake: (quizId: string) => void
}

export function QuizList({
  quizzes,
  totalCount,
  results,
  onOpen,
  onTake,
}: QuizListProps) {
  return (
    <>
      <p className="showing-count">
        Showing {quizzes.length} of {totalCount} quizzes
      </p>

      <section className="quiz-grid">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            result={results[quiz.id]}
            onOpen={onOpen}
            onTake={onTake}
          />
        ))}
      </section>

      {!quizzes.length && (
        <section className="empty-state inline">
          <h2>No quizzes found</h2>
          <p>Try a broader search or a different difficulty filter.</p>
        </section>
      )}
    </>
  )
}
