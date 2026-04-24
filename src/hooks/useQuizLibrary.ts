import { useState } from 'react'
import { getGeneratedQuizzes, getResults } from '../services/storage'
import type { Quiz, QuizResult } from '../types'

export function useQuizLibrary() {
  const [generatedQuizzes, setGeneratedQuizzes] = useState<Quiz[]>(() =>
    getGeneratedQuizzes(),
  )
  const [results, setResults] = useState<Record<string, QuizResult>>(() =>
    getResults(),
  )

  const refreshGeneratedQuizzes = () => {
    setGeneratedQuizzes(getGeneratedQuizzes())
  }

  const saveResultInState = (result: QuizResult) => {
    setResults((current) => ({ ...current, [result.quizId]: result }))
  }

  const findQuizById = (quizId: string) =>
    generatedQuizzes.find((quiz) => quiz.id === quizId)

  return {
    quizzes: generatedQuizzes,
    results,
    findQuizById,
    refreshGeneratedQuizzes,
    saveResultInState,
  }
}
