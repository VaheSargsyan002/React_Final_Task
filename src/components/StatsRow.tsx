const stats = [
  { value: '10M+', label: 'Quizzes Created' },
  { value: '500K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime SLA' },
]

export function StatsRow() {
  return (
    <section className="stats-row">
      {stats.map((stat) => (
        <div key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  )
}
