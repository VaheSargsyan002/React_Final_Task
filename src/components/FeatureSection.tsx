const features = [
  {
    icon: '♧',
    title: 'AI-Powered',
    description:
      'Advanced AI generates contextual questions based on your specifications',
  },
  {
    icon: '♙',
    title: 'Multi-Language',
    description: 'Create quizzes in multiple languages for global teams',
  },
  {
    icon: '♕',
    title: 'Performance Analytics',
    description:
      'Detailed insights and performance tracking for all assessments',
  },
  {
    icon: '↗',
    title: 'Scalable Platform',
    description:
      'Enterprise-grade infrastructure supporting unlimited users',
  },
]

export function FeatureSection() {
  return (
    <section className="features-section">
      <h2>Enterprise Features</h2>
      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
