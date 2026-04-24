import type { User } from "../types";

type HeaderProps = {
  user: User | null;
  path: string;
  onNavigate: (to: string) => void;
  onLogin: () => void;
  onLogout: () => void;
};

export function Header({
  user,
  path,
  onNavigate,
  onLogin,
  onLogout,
}: HeaderProps) {
  return (
    <header className="site-header">
      <button className="brand" type="button">
        <span className="brand-mark" aria-hidden="true">
          🧠
        </span>
        <span>QuizMaster Pro</span>
      </button>

      <nav className="nav-actions" aria-label="Primary navigation">
        {user ? (
          <>
            <button
              className={path === "/search" ? "nav-link active" : "nav-link"}
              onClick={() => onNavigate("/search")}
              type="button"
            >
              <span aria-hidden="true" className="search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                >
                  <path d="M 21 3 C 11.654545 3 4 10.654545 4 20 C 4 29.345455 11.654545 37 21 37 C 24.701287 37 28.127393 35.786719 30.927734 33.755859 L 44.085938 46.914062 L 46.914062 44.085938 L 33.875 31.046875 C 36.43682 28.068316 38 24.210207 38 20 C 38 10.654545 30.345455 3 21 3 z M 21 5 C 29.254545 5 36 11.745455 36 20 C 36 28.254545 29.254545 35 21 35 C 12.745455 35 6 28.254545 6 20 C 6 11.745455 12.745455 5 21 5 z"></path>
                </svg>
              </span>
              Browse Quizzes
            </button>
            <span className="welcome-text">
              Welcome, {user.username.split("@")[0]}
            </span>
            <button className="logout-button" onClick={onLogout} type="button">
              Logout
            </button>
          </>
        ) : (
          <button className="top-auth-button" onClick={onLogin} type="button">
            Login
          </button>
        )}
      </nav>
    </header>
  );
}
