import type { Quiz } from '../types'

type AssessmentIntroProps = {
  quiz: Quiz
}

export function AssessmentIntro({ quiz }: AssessmentIntroProps) {
  const difficulty =
    quiz.hardness === 'Intermediate' ? 'medium' : quiz.hardness.toLowerCase()

  return (
    <section className="assessment-header">
      <h1>{quiz.topic} Assessment</h1>
      <p>
        A {difficulty} level quiz covering {quiz.topic} concepts in{' '}
        {quiz.language}.
      </p>
    </section>
  )
}
