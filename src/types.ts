export type Hardness = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type User = {
  username: string;
  loggedIn: true;
};

export type QuizFormValues = {
  topic: string;
  language: string;
  questionCount: number;
  hardness: Hardness;
  specialRequests: string;
};

export type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export type Quiz = QuizFormValues & {
  id: string;
  createdAt: string;
  source: "seed" | "ai" | "local";
  questions: Question[];
};

export type QuizResult = {
  quizId: string;
  score: number;
  total: number;
  answers: Record<string, number>;
  completedAt: string;
};
