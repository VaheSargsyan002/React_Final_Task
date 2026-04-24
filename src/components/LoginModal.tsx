import { useState } from "react";
import type { FormEvent } from "react";

type LoginModalProps = {
  onClose: () => void;
  onLogin: (username: string) => void;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const clearErrors = () => {
    setErrors({
      fullName: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const nextErrors = {
      fullName:
        mode === "signup" && trimmedFullName.length < 2
          ? "Full name must be at least 2 characters."
          : "",
      email: emailRegex.test(trimmedEmail)
        ? ""
        : "Enter a valid email address.",
      password: passwordRegex.test(password)
        ? ""
        : "Password must be 8+ characters with uppercase, lowercase, number, and symbol.",
    };

    setErrors(nextErrors);

    if (!nextErrors.fullName && !nextErrors.email && !nextErrors.password) {
      onLogin(mode === "signup" ? trimmedFullName : trimmedEmail);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-panel compact" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div>
            <h2>{mode === "signin" ? "Sign In" : "Create Account"}</h2>
            <p>
              {mode === "signin"
                ? "Access your QuizMaster Pro account"
                : "Join QuizMaster Pro to start creating AI-powered quizzes"}
            </p>
          </div>
          <button className="icon-button" onClick={onClose} type="button">
            ×
          </button>
        </div>

        <form className="stack-form" noValidate onSubmit={handleSubmit}>
          {mode === "signup" && (
            <label>
              Full Name
              <input
                type="text"
                autoFocus
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "full-name-error" : undefined
                }
                value={fullName}
                onChange={(event) => {
                  setFullName(event.target.value);
                  setErrors((current) => ({ ...current, fullName: "" }));
                }}
              />
              {errors.fullName && (
                <span className="field-error" id="full-name-error">
                  {errors.fullName}
                </span>
              )}
            </label>
          )}
          <label>
            Email
            <input
              autoFocus={mode === "signin"}
              type="email"
              inputMode="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((current) => ({ ...current, email: "" }));
              }}
            />
            {errors.email && (
              <span className="field-error" id="email-error">
                {errors.email}
              </span>
            )}
          </label>
          <label>
            Password
            <input
              type="password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "password-error" : undefined
              }
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((current) => ({ ...current, password: "" }));
              }}
            />
            {errors.password && (
              <span className="field-error" id="password-error">
                {errors.password}
              </span>
            )}
          </label>
          <button className="primary-button full" type="submit">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
          <button
            className="auth-switch"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              clearErrors();
            }}
            type="button"
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </form>
      </section>
    </div>
  );
}
