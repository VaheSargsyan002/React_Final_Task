import { PageBackLink } from '../components/PageBackLink'
import { ProtectedPrompt } from '../components/ProtectedPrompt'
import { QuestionReview } from '../components/QuestionReview'
import { QuizReviewHeader } from '../components/QuizReviewHeader'
import type { Quiz, QuizResult } from '../types'

type QuizViewPageProps = {
  quiz?: Quiz
  result?: QuizResult
  onNavigate: (to: string) => void
}

export function QuizViewPage({ quiz, result, onNavigate }: QuizViewPageProps) {
  if (!quiz) {
    return (
      <ProtectedPrompt
        title="Quiz not found"
        message="The quiz may not exist in this session."
        actionLabel="Back to Search"
        onAction={() => onNavigate('/search')}
      />
    )
  }

  return (
    <main className="simple-page">
      <PageBackLink label="Back to Search" onClick={() => onNavigate('/search')} />
      <QuizReviewHeader quiz={quiz} result={result} />

      {!result && (
        <button
          className="primary-button"
          onClick={() => onNavigate(`/passquiz?id=${quiz.id}`)}
          type="button"
        >
          Take Quiz
        </button>
      )}

      <section className="review-list">
        {quiz.questions.map((question, index) => (
          <QuestionReview
            key={question.id}
            question={question}
            index={index}
            result={result}
          />
        ))}
      </section>
    </main>
  )
}
