import { useState } from 'react'
import { AssessmentIntro } from '../components/AssessmentIntro'
import { PageBackLink } from '../components/PageBackLink'
import { ProtectedPrompt } from '../components/ProtectedPrompt'
import { QuizCompletionCard } from '../components/QuizCompletionCard'
import { QuizNavigation } from '../components/QuizNavigation'
import { QuizProgress } from '../components/QuizProgress'
import { QuizQuestionCard } from '../components/QuizQuestionCard'
import { saveResult } from '../services/storage'
import type { Quiz, QuizResult } from '../types'
import { getScore } from '../utils/quiz'

type PassQuizPageProps = {
  quiz?: Quiz
  existingResult?: QuizResult
  onResultSaved: (result: QuizResult) => void
  onNavigate: (to: string) => void
}

export function PassQuizPage({
  quiz,
  existingResult,
  onResultSaved,
  onNavigate,
}: PassQuizPageProps) {
  const [answers, setAnswers] = useState<Record<string, number>>(
    existingResult?.answers ?? {},
  )
  const [result, setResult] = useState<QuizResult | undefined>(existingResult)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!quiz) {
    return (
      <ProtectedPrompt
        title="Quiz not found"
        message="The quiz may have been removed from this session."
        actionLabel="Back to Search"
        onAction={() => onNavigate('/search')}
      />
    )
  }

  const submitQuiz = () => {
    const finalResult: QuizResult = {
      quizId: quiz.id,
      score: getScore(quiz, answers),
      total: quiz.questions.length,
      answers,
      completedAt: new Date().toISOString(),
    }
    saveResult(finalResult)
    setResult(finalResult)
    onResultSaved(finalResult)
  }

  if (result) {
    return (
      <main className="simple-page">
        <QuizCompletionCard
          quiz={quiz}
          result={result}
          onReturnHome={() => onNavigate('/')}
          onReviewAnswers={() => onNavigate(`/quiz?id=${quiz.id}`)}
        />
      </main>
    )
  }

  const question = quiz.questions[currentIndex]
  const isLastQuestion = currentIndex === quiz.questions.length - 1
  const currentAnswer = answers[question.id]

  const goNext = () => {
    if (isLastQuestion) {
      submitQuiz()
      return
    }

    setCurrentIndex((index) => index + 1)
  }

  return (
    <main className="simple-page">
      <PageBackLink label="Back to Home" onClick={() => onNavigate('/')} />
      <AssessmentIntro quiz={quiz} />
      <QuizProgress
        currentIndex={currentIndex}
        total={quiz.questions.length}
      />
      <QuizQuestionCard
        question={question}
        selectedAnswer={currentAnswer}
        onAnswer={(answerIndex) =>
          setAnswers((current) => ({
            ...current,
            [question.id]: answerIndex,
          }))
        }
      />
      <QuizNavigation
        isFirstQuestion={currentIndex === 0}
        isLastQuestion={isLastQuestion}
        canContinue={currentAnswer !== undefined}
        onPrevious={() => setCurrentIndex((index) => index - 1)}
        onNext={goNext}
      />
    </main>
  )
}
