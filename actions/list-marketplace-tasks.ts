import { defineAction } from "@agent-native/core/action";
import { and, desc, eq, gt } from "drizzle-orm";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";

export default defineAction({
  description: "List currently published, non-demo tasks with remaining slots.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const db = getDb();
    return db
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
  },
});
