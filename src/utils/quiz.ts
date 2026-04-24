import type { Quiz, QuizResult } from '../types'

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))

export const getScore = (quiz: Quiz, answers: Record<string, number>) =>
  quiz.questions.reduce(
    (score, question) =>
      answers[question.id] === question.correctAnswerIndex ? score + 1 : score,
    0,
  )

export const getResultLine = (result?: QuizResult) => {
  if (!result) {
    return 'Not taken yet'
  }

  return `${result.score}/${result.total} correct`
}
