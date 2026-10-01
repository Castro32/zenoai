import { defineAction } from "@agent-native/core/action";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";

export default defineAction({
  description: "Load the signed-in user's saved profile and selected task package.",
  schema: z.object({}),
  http: { method: "GET" },
  requiresAuth: true,
  run: async (_args, ctx) => {
    const normalizedEmail = ctx?.userEmail?.trim().toLowerCase();
    if (!normalizedEmail) {
      throw new Error("A signed-in user is required to load a profile.");
    }

    const db = getDb();
    const [profile] = await db
      .select()
      .from(schema.userProfiles)
      .where(eq(schema.userProfiles.email, normalizedEmail))
      .limit(1);

    if (!profile) {
      return null;
    }

    return {
      ...profile,
      skills: JSON.parse(profile.skills) as string[],
    };
  },
});
