import type { Quiz, QuizResult } from '../types'

type QuizCompletionCardProps = {
  quiz: Quiz
  result: QuizResult
  onReturnHome: () => void
  onReviewAnswers: () => void
}

export function QuizCompletionCard({
  quiz,
  result,
  onReturnHome,
  onReviewAnswers,
}: QuizCompletionCardProps) {
  const percent = Math.round((result.score / result.total) * 100)
  const incorrect = result.total - result.score
  const difficulty = quiz.hardness === 'Intermediate' ? 'Medium' : quiz.hardness

  return (
    <section className="complete-card">
      <div className="complete-icon" aria-hidden="true">
        ✓
      </div>
      <h1>Quiz Complete!</h1>
      <strong>{percent}%</strong>
      <p>
        {result.score} out of {result.total} correct
      </p>
      <div className="complete-stats">
        <div>
          <span>{result.score}</span>
          <p>Correct</p>
        </div>
        <div>
          <span>{incorrect}</span>
          <p>Incorrect</p>
        </div>
        <div>
          <span>{difficulty}</span>
          <p>Difficulty</p>
        </div>
      </div>
      <div className="result-actions">
        <button className="black-button" onClick={onReturnHome} type="button">
          Return Home
        </button>
        <button className="ghost-button" onClick={onReviewAnswers} type="button">
          Review Answers
        </button>
      </div>
    </section>
  )
}
