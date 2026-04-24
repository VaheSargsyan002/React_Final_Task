type ProtectedPromptProps = {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
};

export function ProtectedPrompt({
  title,
  message,
  actionLabel,
  onAction,
}: ProtectedPromptProps) {
  return (
    <main className="simple-page">
      <section className="empty-state">
        <h1>{title}</h1>
        <p>{message}</p>
        <button
          className="primary-button large"
          onClick={onAction}
          type="button"
        >
          {actionLabel}
        </button>
      </section>
    </main>
  );
}
