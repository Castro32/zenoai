import { defineAction } from "@agent-native/core/action";
import { and, count, desc, eq, gt } from "drizzle-orm";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";

interface MarketplaceTask {
  id: string;
  title: string;
  category: string;
  description: string;
  reward: number;
  currency: string;
  difficulty: string;
  estimatedMinutes: number;
  deadline: string | null;
  premiumRequired: boolean;
  remainingSlots: number;
  publishedAt: string | null;
  createdAt: string;
  status: string;
  isDemo: boolean;
}

const defaultTasks = [
  {
    id: "task-eval-01",
    title: "Compare two AI explanations",
    category: "AI response evaluation",
    description: "Score clarity, factual grounding, and how well the answer matches the prompt intent.",
    reward: 1200,
    currency: "KSH",
    difficulty: "Entry",
    estimatedMinutes: 25,
    deadline: null,
    premiumRequired: false,
    remainingSlots: 18,
  },
  {
    id: "task-label-02",
    title: "Classify support conversations",
    category: "Data annotation",
    description: "Assign the correct label to support tickets and short customer messages.",
    reward: 1500,
    currency: "KSH",
    difficulty: "Entry",
    estimatedMinutes: 35,
    deadline: null,
    premiumRequired: false,
    remainingSlots: 14,
  },
  {
    id: "task-image-03",
    title: "Review product image relevance",
    category: "Image classification",
    description: "Check whether the supplied image matches the intended product or category.",
    reward: 1800,
    currency: "KSH",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    deadline: null,
    premiumRequired: true,
    remainingSlots: 9,
  },
  {
    id: "task-search-04",
    title: "Judge search result relevance",
    category: "Search relevance",
    description: "Rate whether each result answers the user query and matches the search intent.",
    reward: 2200,
    currency: "KSH",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    deadline: null,
    premiumRequired: false,
    remainingSlots: 11,
  },
  {
    id: "task-prompt-05",
    title: "Evaluate prompt quality",
    category: "Prompt evaluation",
    description: "Review instructions, answer quality, and whether the model follows guardrails and context.",
    reward: 2600,
    currency: "KSH",
    difficulty: "Intermediate",
    estimatedMinutes: 50,
    deadline: null,
    premiumRequired: true,
    remainingSlots: 7,
  },
  {
    id: "task-research-06",
    title: "Validate AI research summaries",
    category: "Research and validation",
    description: "Check claims, cite sources, and verify if the summary is accurate and usable.",
    reward: 3000,
    currency: "KSH",
    difficulty: "Advanced",
    estimatedMinutes: 60,
    deadline: null,
    premiumRequired: true,
    remainingSlots: 5,
  },
].map((task) => ({
  ...task,
  slug: task.id,
  totalSlots: task.remainingSlots,
  requiredSkills: "",
  status: "PUBLISHED",
  isDemo: false,
  createdBy: "system",
}));

export default defineAction({
  description: "List currently published, non-demo tasks with remaining slots. Seeds baseline tasks when none are published.",
  schema: z.object({}),
  http: { method: "GET" },
  requiresAuth: true,
  run: async () => {
    const db = getDb();
    const publishedRows = await db
      .select({ count: count() })
      .from(schema.tasks)
      .where(
        and(eq(schema.tasks.status, "PUBLISHED"), eq(schema.tasks.isDemo, false)),
      );

    if ((publishedRows[0]?.count ?? 0) === 0) {
      const now = new Date().toISOString();
      await db
        .insert(schema.tasks)
        .values(defaultTasks.map((task) => ({ ...task, publishedAt: now })))
        .onConflictDoNothing();
    }

    const rows = await db
      .select({
        id: schema.tasks.id,
        title: schema.tasks.title,
        category: schema.tasks.category,
        description: schema.tasks.description,
        reward: schema.tasks.reward,
        currency: schema.tasks.currency,
        difficulty: schema.tasks.difficulty,
        estimatedMinutes: schema.tasks.estimatedMinutes,
        deadline: schema.tasks.deadline,
        premiumRequired: schema.tasks.premiumRequired,
        remainingSlots: schema.tasks.remainingSlots,
        publishedAt: schema.tasks.publishedAt,
        createdAt: schema.tasks.createdAt,
      })
      .from(schema.tasks)
      .where(
        and(
          eq(schema.tasks.status, "PUBLISHED"),
          eq(schema.tasks.isDemo, false),
          gt(schema.tasks.remainingSlots, 0),
        ),
      )
      .orderBy(desc(schema.tasks.publishedAt), desc(schema.tasks.createdAt))
      .limit(50);

    return rows as MarketplaceTask[];
  },
});
