import { useState } from "react";
import type { FormEvent } from "react";
import { generateQuiz } from "../services/quizApi";
import { saveGeneratedQuiz } from "../services/storage";
import type { Hardness, QuizFormValues } from "../types";

type QuizCreateModalProps = {
  onClose: () => void;
  onCreated: (quizId: string) => void;
};

const hardnessOptions: Hardness[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];
const hardnessLabels: Record<Hardness, string> = {
  Beginner: "Easy",
  Intermediate: "Medium",
  Advanced: "Hard",
  Expert: "Expert",
};
const questionCounts = [5, 10, 15, 20];

export function QuizCreateModal({ onClose, onCreated }: QuizCreateModalProps) {
  const [values, setValues] = useState<QuizFormValues>({
    topic: "",
    language: "English",
    questionCount: 5,
    hardness: "Intermediate",
    specialRequests: "",
  });
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const updateValue = <K extends keyof QuizFormValues>(
    key: K,
    value: QuizFormValues[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsGenerating(true);

    try {
      const quiz = await generateQuiz(values);
      saveGeneratedQuiz(quiz);
      onCreated(quiz.id);
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? generationError.message
          : "Could not create this quiz.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="modal-panel quiz-create-panel"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div>
            <h2>Create New Quiz</h2>
            <p>Configure your AI-generated quiz parameters</p>
          </div>
          <button
            aria-label="Close"
            className="icon-button"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <form className="quiz-form" onSubmit={handleSubmit}>
          <label className="span-two">
            Topic
            <input
              autoFocus
              required
              value={values.topic}
              placeholder="e.g. JavaScript Fundamentals, World History, Biology"
              onChange={(event) => updateValue("topic", event.target.value)}
            />
          </label>

          <label className="span-two compact-field">
            Language
            <select
              value={values.language}
              onChange={(event) => updateValue("language", event.target.value)}
            >
              <option>English</option>
              <option>Armenian</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </label>

          <label className="compact-field questions-field">
            Number of Questions
            <select
              value={values.questionCount}
              onChange={(event) =>
                updateValue("questionCount", Number(event.target.value))
              }
            >
              {questionCounts.map((count) => (
                <option key={count} value={count}>
                  {count} Questions
                </option>
              ))}
            </select>
          </label>

          <label className="compact-field difficulty-field">
            Difficulty
            <select
              value={values.hardness}
              onChange={(event) =>
                updateValue("hardness", event.target.value as Hardness)
              }
            >
              {hardnessOptions.map((option) => (
                <option key={option} value={option}>
                  {hardnessLabels[option]}
                </option>
              ))}
            </select>
          </label>

          <label className="span-two">
            Special Requirements (Optional)
            <textarea
              value={values.specialRequests}
              onChange={(event) =>
                updateValue("specialRequests", event.target.value)
              }
              placeholder="Any specific focus areas, question types, or requirements..."
            />
          </label>

          {error && <p className="form-error span-two">{error}</p>}

          <div className="modal-actions span-two">
            <button
              className="primary-button full"
              disabled={isGenerating}
              type="submit"
            >
              {isGenerating ? "Generating..." : "Generate Quiz"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
