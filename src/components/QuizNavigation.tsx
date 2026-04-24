type QuizNavigationProps = {
  isFirstQuestion: boolean
  isLastQuestion: boolean
  canContinue: boolean
  onPrevious: () => void
  onNext: () => void
}

export function QuizNavigation({
  isFirstQuestion,
  isLastQuestion,
  canContinue,
  onPrevious,
  onNext,
}: QuizNavigationProps) {
  return (
    <div className="quiz-nav">
      <button
        className="ghost-button"
        disabled={isFirstQuestion}
        onClick={onPrevious}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="button-icon"
          viewBox="0 0 20 20"
        >
          <path
            d="M12.7 4.3 7 10l5.7 5.7"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        Previous
      </button>
      <button
        className="next-button"
        disabled={!canContinue}
        onClick={onNext}
        type="button"
      >
        {isLastQuestion ? 'Finish' : 'Next'} →
      </button>
    </div>
  )
}
