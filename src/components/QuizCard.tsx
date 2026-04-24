import type { Quiz, QuizResult } from '../types'
import { formatDate } from '../utils/quiz'

type QuizCardProps = {
  quiz: Quiz
  result?: QuizResult
  onOpen: (quizId: string) => void
  onTake: (quizId: string) => void
}

export function QuizCard({ quiz, result, onOpen, onTake }: QuizCardProps) {
  const difficulty = quiz.hardness === 'Intermediate' ? 'Medium' : quiz.hardness

  return (
    <article className="quiz-card" onClick={() => onOpen(quiz.id)}>
      <div className="card-topline">
        <span className={`pill ${quiz.hardness.toLowerCase()}`}>
          {difficulty}
        </span>
        <span>{quiz.questionCount} questions</span>
      </div>
      <h3>{quiz.topic} Assessment</h3>
      <p>
        A {difficulty.toLowerCase()} level quiz covering {quiz.topic} concepts
        in {quiz.language}.
      </p>
      <div className="card-actions">
        <span>Topic: {quiz.topic}</span>
        <span>{formatDate(quiz.createdAt)}</span>
        {result && <strong>{Math.round((result.score / result.total) * 100)}%</strong>}
        <button
          className="card-start"
          onClick={(event) => {
            event.stopPropagation()
            onTake(quiz.id)
          }}
          type="button"
        >
          Start
        </button>
      </div>
    </article>
  )
}
