import type { Question, Quiz, QuizFormValues } from "../types";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY?.trim() as string | undefined;

const API_URL =
  (import.meta.env.VITE_GROQ_API_URL?.trim() as string | undefined) ??
  "https://api.groq.com/openai/v1/chat/completions";

const MODEL =
  (import.meta.env.VITE_GROQ_MODEL?.trim() as string | undefined) ??
  "llama-3.3-70b-versatile";

const makeId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

export const buildAiPrompt = (values: QuizFormValues) => `
Create a high-quality multiple-choice quiz in valid JSON format.

Quiz settings:
- Topic: ${values.topic}
- Language: ${values.language}
- Number of questions: ${values.questionCount}
- Difficulty: ${values.hardness}
- Special requests: ${values.specialRequests || "None"}

Requirements:
- Every question must be strictly about the topic: "${values.topic}".
- Questions must match the difficulty level: "${values.hardness}".
- Make questions clear, specific, and educational.
- Avoid vague or generic questions.
- Each question must have exactly 4 options.
- Only 1 option must be correct.
- Wrong answers should be believable but clearly incorrect.
- Add a short explanation for why the correct answer is right.
- Use the requested language for all text.
- Return only valid JSON.
- Do not include markdown or extra text.

Return exactly this JSON shape:
{
  "questions": [
    {
      "text": "question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswerIndex": 0,
      "explanation": "brief explanation"
    }
  ]
}
`;

const normalizeQuestions = (
  rawQuestions: unknown,
  fallbackTopic: string,
): Question[] => {
  if (!Array.isArray(rawQuestions)) {
    return [];
  }

  return rawQuestions
    .map((raw, index) => {
      const item = raw as Partial<Question>;
      const options = Array.isArray(item.options)
        ? item.options.map(String).slice(0, 4)
        : [];
      const correctAnswerIndex = Number(item.correctAnswerIndex);

      if (
        typeof item.text !== "string" ||
        item.text.trim() === "" ||
        options.length !== 4 ||
        options.some((option) => option.trim() === "") ||
        !Number.isInteger(correctAnswerIndex) ||
        correctAnswerIndex < 0 ||
        correctAnswerIndex > 3
      ) {
        return null;
      }

      return {
        id: `q-${index + 1}`,
        text: item.text.trim(),
        options,
        correctAnswerIndex,
        explanation:
          typeof item.explanation === "string" && item.explanation.trim() !== ""
            ? item.explanation.trim()
            : `This answer best matches ${fallbackTopic}.`,
      };
    })
    .filter((question): question is Question => Boolean(question));
};

const createLocalQuiz = (values: QuizFormValues): Quiz => {
  const templates = [
    {
      text: `What is the primary concept in ${values.topic}?`,
      options: [
        "Basic fundamentals",
        "Advanced techniques",
        "Core principles",
        "Practical applications",
      ],
      correctAnswerIndex: 2,
      explanation:
        "Core principles form the foundation of understanding in any subject area.",
    },
    {
      text: `Which approach is most effective for learning ${values.topic}?`,
      options: [
        "Memorization only",
        "Hands-on practice",
        "Theory without practice",
        "Random exploration",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Hands-on practice reinforces theoretical knowledge and builds practical skills.",
    },
    {
      text: `What should you do first when studying ${values.topic}?`,
      options: [
        "Skip to complex examples",
        "Ignore terminology",
        "Build a mental model",
        "Avoid review",
      ],
      correctAnswerIndex: 2,
      explanation:
        "A clear mental model makes later details easier to connect and remember.",
    },
    {
      text: `Which habit improves long-term skill in ${values.topic}?`,
      options: [
        "Consistent review",
        "Guessing every answer",
        "Learning without feedback",
        "Changing topics constantly",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Consistent review helps move new concepts into durable knowledge.",
    },
    {
      text: `How can you check your understanding of ${values.topic}?`,
      options: [
        "Read only the title",
        "Explain it in your own words",
        "Avoid examples",
        "Stop after one question",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Explaining a concept in your own words reveals whether you truly understand it.",
    },
  ];

  const questions: Question[] = Array.from(
    { length: values.questionCount },
    (_, index) => {
      const template = templates[index % templates.length];

      return {
        id: `q-${index + 1}`,
        text: `${template.text} (Question ${index + 1})`,
        options: template.options,
        correctAnswerIndex: template.correctAnswerIndex,
        explanation: template.explanation,
      };
    },
  );

  return {
    ...values,
    id: makeId(),
    createdAt: new Date().toISOString(),
    source: "local",
    questions,
  };
};

const extractErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = await response.json();

    if (typeof data?.error?.message === "string") {
      return data.error.message;
    }

    if (typeof data?.error === "string") {
      return data.error;
    }

    if (typeof data?.message === "string") {
      return data.message;
    }

    return `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

export const generateQuiz = async (values: QuizFormValues): Promise<Quiz> => {
  if (!API_KEY) {
    return createLocalQuiz(values);
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You generate accurate educational multiple-choice quizzes and return only valid JSON.",
        },
        {
          role: "user",
          content: buildAiPrompt(values),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorMessage = await extractErrorMessage(response);
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  };

  const content = data.choices?.[0]?.message?.content;

  if (!content || content.trim() === "") {
    throw new Error("The AI service returned an empty quiz.");
  }

  let parsed: { questions?: unknown };

  try {
    parsed = JSON.parse(content) as { questions?: unknown };
  } catch {
    throw new Error("The AI service returned invalid JSON.");
  }

  const questions = normalizeQuestions(parsed.questions, values.topic);

  if (questions.length !== values.questionCount) {
    throw new Error(
      `The AI service returned ${questions.length} valid questions, but ${values.questionCount} were requested.`,
    );
  }

  return {
    ...values,
    id: makeId(),
    createdAt: new Date().toISOString(),
    source: "ai",
    questions,
  };
};
