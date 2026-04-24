type NotFoundPageProps = {
  onNavigate: (to: string) => void
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <main className="protected-page">
      <section className="empty-state">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>This route does not exist in the quiz app.</p>
        <button className="primary-button" onClick={() => onNavigate('/')} type="button">
          Go Home
        </button>
      </section>
    </main>
  )
}
