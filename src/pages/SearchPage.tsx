import { useMemo, useState } from "react";
import { BrowseHeader } from "../components/BrowseHeader";
import { PageBackLink } from "../components/PageBackLink";
import { ProtectedPrompt } from "../components/ProtectedPrompt";
import { QuizList } from "../components/QuizList";
import { SearchFilters } from "../components/SearchFilters";
import type { SortMode } from "../components/SearchFilters";
import type { Hardness, Quiz, QuizResult, User } from "../types";

type SearchPageProps = {
  user: User | null;
  quizzes: Quiz[];
  results: Record<string, QuizResult>;
  onLogin: () => void;
  onNavigate: (to: string) => void;
};

const hardnessRank: Record<Hardness, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4,
};

export function SearchPage({
  user,
  quizzes,
  results,
  onLogin,
  onNavigate,
}: SearchPageProps) {
  const [query, setQuery] = useState("");
  const [hardness, setHardness] = useState<"All" | Hardness>("All");
  const [sort, setSort] = useState<SortMode>("newest");

  const filteredQuizzes = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return quizzes
      .filter((quiz) => {
        const matchesKeyword =
          !keyword ||
          quiz.topic.toLowerCase().includes(keyword) ||
          quiz.questions.some((question) =>
            question.text.toLowerCase().includes(keyword),
          );
        const matchesHardness =
          hardness === "All" || quiz.hardness === hardness;
        return matchesKeyword && matchesHardness;
      })
      .sort((left, right) => {
        if (sort === "hardness") {
          return hardnessRank[right.hardness] - hardnessRank[left.hardness];
        }

        if (sort === "title") {
          return left.topic.localeCompare(right.topic);
        }

        const leftDate = new Date(left.createdAt).getTime();
        const rightDate = new Date(right.createdAt).getTime();
        return sort === "newest" ? rightDate - leftDate : leftDate - rightDate;
      });
  }, [hardness, query, quizzes, sort]);

  if (!user) {
    return (
      <ProtectedPrompt
        title="Login to search quizzes"
        message="Your saved results and generated quizzes are tied to your session."
        actionLabel="Login"
        onAction={onLogin}
      />
    );
  }

  return (
    <main className="simple-page">
      <PageBackLink label="Back to Home" onClick={() => onNavigate("/")} />
      <BrowseHeader />
      <SearchFilters
        query={query}
        hardness={hardness}
        sort={sort}
        onQueryChange={setQuery}
        onHardnessChange={setHardness}
        onSortChange={setSort}
      />
      <QuizList
        quizzes={filteredQuizzes}
        totalCount={quizzes.length}
        results={results}
        onOpen={(quizId) => onNavigate(`/quiz?id=${quizId}`)}
        onTake={(quizId) => onNavigate(`/passquiz?id=${quizId}`)}
      />
    </main>
  );
}
