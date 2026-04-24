import type { Quiz, QuizResult, User } from "../types";

const USER_KEY = "ai-quiz-user";
const QUIZZES_KEY = "ai-quiz-generated";
const RESULTS_KEY = "ai-quiz-results";

const readJson = <T>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const getStoredUser = () => readJson<User | null>(USER_KEY, null);

export const saveUser = (username: string) => {
  const user: User = { username, loggedIn: true };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const getGeneratedQuizzes = () => readJson<Quiz[]>(QUIZZES_KEY, []);

export const saveGeneratedQuiz = (quiz: Quiz) => {
  const quizzes = [quiz, ...getGeneratedQuizzes()];
  localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
};

export const getResults = () =>
  readJson<Record<string, QuizResult>>(RESULTS_KEY, {});

export const saveResult = (result: QuizResult) => {
  const results = getResults();
  results[result.quizId] = result;
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
};
