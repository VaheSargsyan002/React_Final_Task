type QuizProgressProps = {
  currentIndex: number
  total: number
}

export function QuizProgress({ currentIndex, total }: QuizProgressProps) {
  const progress = Math.round(((currentIndex + 1) / total) * 100)

  return (
    <section className="progress-block">
      <div>
        <span>
          Question {currentIndex + 1} of {total}
        </span>
        <span>{progress}% Complete</span>
      </div>
      <progress max="100" value={progress} />
    </section>
  )
}
