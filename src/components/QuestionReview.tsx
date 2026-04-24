import type { Question, QuizResult } from '../types'

type QuestionReviewProps = {
  question: Question
  index: number
  result?: QuizResult
  reveal?: boolean
}

export function QuestionReview({
  question,
  index,
  result,
  reveal = true,
}: QuestionReviewProps) {
  const selectedAnswer = result?.answers[question.id]
  const isCorrect = selectedAnswer === question.correctAnswerIndex

  return (
    <article className="review-card">
      <div className="question-title">
        <span>{index + 1}</span>
        <h3>{question.text}</h3>
      </div>
      <div className="answer-list">
        {question.options.map((option, optionIndex) => {
          const classes = ['answer-row']
          const isCorrectAnswer = optionIndex === question.correctAnswerIndex
          const isSelected = selectedAnswer === optionIndex
          if (reveal && optionIndex === question.correctAnswerIndex) {
            classes.push('correct')
          }
          if (selectedAnswer === optionIndex) {
            classes.push(isCorrect ? 'selected-correct' : 'selected-wrong')
          }

          return (
            <div className={classes.join(' ')} key={option}>
              <p>{option}</p>
              {reveal && isSelected && !isCorrectAnswer && (
                <span className="answer-status wrong">⊗</span>
              )}
              {reveal && isCorrectAnswer && (
                <span className="answer-status right">⊙</span>
              )}
            </div>
          )
        })}
      </div>
      {reveal && (
        <div className="explanation">
          <span aria-hidden="true">ⓘ</span>
          <div>
            <strong>Explanation</strong>
            <p>{question.explanation}</p>
          </div>
        </div>
      )}
    </article>
  )
}
