import type { Quiz, QuizResult } from '../types'
import { formatDate } from '../utils/quiz'

type QuizReviewHeaderProps = {
  quiz: Quiz
  result?: QuizResult
}

export function QuizReviewHeader({ quiz, result }: QuizReviewHeaderProps) {
  const difficulty = quiz.hardness === 'Intermediate' ? 'Medium' : quiz.hardness
  const percent = result ? Math.round((result.score / result.total) * 100) : null

  return (
    <section className="review-hero">
      <div className="review-title-row">
        <div>
          <h1>{quiz.topic} Assessment</h1>
          <p>
            A {difficulty.toLowerCase()} level quiz covering {quiz.topic}{' '}
            concepts in {quiz.language}.
          </p>
        </div>
        <span className={`pill ${quiz.hardness.toLowerCase()}`}>{difficulty}</span>
      </div>

      <div className="review-stats">
        <div>
          <strong>{quiz.questionCount}</strong>
          <span>Questions</span>
        </div>
        <div>
          <strong>{quiz.topic}</strong>
          <span>Topic</span>
        </div>
        <div>
          <strong>{formatDate(quiz.createdAt)}</strong>
          <span>Created</span>
        </div>
        <div>
          <strong>{percent === null ? '-' : `${percent}%`}</strong>
          <span>Your Score</span>
        </div>
      </div>
    </section>
  )
}
