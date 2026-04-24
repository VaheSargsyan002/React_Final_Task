import type { Hardness } from "../types";

export type SortMode = "newest" | "oldest" | "hardness" | "title";

type SearchFiltersProps = {
  query: string;
  hardness: "All" | Hardness;
  sort: SortMode;
  onQueryChange: (query: string) => void;
  onHardnessChange: (hardness: "All" | Hardness) => void;
  onSortChange: (sort: SortMode) => void;
};

export function SearchFilters({
  query,
  hardness,
  sort,
  onQueryChange,
  onHardnessChange,
  onSortChange,
}: SearchFiltersProps) {
  return (
    <section className="search-tools">
      <label className="search-field">
        <span aria-hidden="true" className="field-icon">
          <svg viewBox="0 0 20 20">
            <path d="M8.8 3a5.8 5.8 0 1 0 0 11.6 5.8 5.8 0 0 0 0-11.6Zm0 2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm4.5 8.9 3.3 3.3 1.4-1.4-3.3-3.3-1.4 1.4Z" />
          </svg>
        </span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search quizzes..."
        />
      </label>
      <label className="select-field">
        <span aria-hidden="true" className="field-icon">
          <svg viewBox="0 0 20 20">
            <path d="M5 4h10v2H5V4Zm0 5h7v2H5V9Zm0 5h4v2H5v-2Z" />
          </svg>
        </span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortMode)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="hardness">Difficulty</option>
          <option value="title">Title</option>
        </select>
      </label>
      <label className="select-field">
        <span aria-hidden="true" className="field-icon">
          <svg viewBox="0 0 20 20">
            <path d="M10 2 3 6v5c0 3.4 2.8 5.9 7 7 4.2-1.1 7-3.6 7-7V6l-7-4Zm0 2.3L15 7v4c0 2.2-1.7 3.9-5 4.9-3.3-1-5-2.7-5-4.9V7l5-2.7Z" />
          </svg>
        </span>
        <select
          value={hardness}
          onChange={(event) =>
            onHardnessChange(event.target.value as "All" | Hardness)
          }
        >
          <option value="All">All Difficulties</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </label>
    </section>
  );
}
