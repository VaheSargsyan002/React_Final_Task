type PageBackLinkProps = {
  label: string
  onClick: () => void
}

export function PageBackLink({ label, onClick }: PageBackLinkProps) {
  return (
    <button className="back-link" onClick={onClick} type="button">
      <svg
        aria-hidden="true"
        className="back-icon"
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
      {label}
    </button>
  )
}
