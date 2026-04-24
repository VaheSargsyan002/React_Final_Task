import type { Question } from '../types'

type QuizQuestionCardProps = {
  question: Question
  selectedAnswer?: number
  onAnswer: (answerIndex: number) => void
}

export function QuizQuestionCard({
  question,
  selectedAnswer,
  onAnswer,
}: QuizQuestionCardProps) {
  return (
    <article className="take-card">
      <h2>{question.text}</h2>
      <div className="choice-list">
        {question.options.map((option, optionIndex) => (
          <label
            className={
              selectedAnswer === optionIndex ? 'choice-row selected' : 'choice-row'
            }
            key={option}
          >
            <input
              checked={selectedAnswer === optionIndex}
              name={question.id}
              onChange={() => onAnswer(optionIndex)}
              type="radio"
            />
            <span aria-hidden="true" />
            {option}
          </label>
        ))}
      </div>
    </article>
  )
}
