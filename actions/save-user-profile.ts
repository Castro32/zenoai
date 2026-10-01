import { defineAction } from "@agent-native/core/action";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";

const supportedPackages = ["starter", "standard", "premium"] as const;

export default defineAction({
  description: "Persist the current freelancer's profile and selected package.",
  schema: z.object({
    fullName: z.string().trim().max(80).optional(),
    phone: z.string().trim().max(24).optional(),
    city: z.string().trim().max(80).optional(),
    skills: z.array(z.string().trim().min(2).max(40)).max(10).optional(),
    packageId: z.enum(supportedPackages).optional(),
    packageName: z.string().trim().min(2).max(80).optional(),
    packagePrice: z.number().min(0).optional(),
    paymentStatus: z.string().trim().max(80).optional(),
    notes: z.string().trim().max(250).optional(),
  }),
  http: { method: "POST" },
  requiresAuth: true,
  run: async (args, ctx) => {
    const normalizedEmail = ctx?.userEmail?.trim().toLowerCase();
    if (!normalizedEmail) {
      throw new Error("A signed-in user is required to save a profile.");
    }

    const db = getDb();
    const now = new Date().toISOString();
    const values = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      fullName: args.fullName?.trim() ?? "",
      phone: args.phone?.trim() ?? "",
      city: args.city?.trim() ?? "",
      skills: JSON.stringify((args.skills ?? []).map((skill) => skill.trim()).filter(Boolean)),
      packageId: args.packageId ?? "starter",
      packageName: args.packageName ?? "Starter Access",
      packagePrice: args.packagePrice ?? 700,
      paymentStatus: args.paymentStatus ?? "pending",
      notes: args.notes?.trim() ?? "",
      updatedAt: now,
    };
    const [profile] = await db
      .insert(schema.userProfiles)
      .values(values)
      .onConflictDoUpdate({
        target: schema.userProfiles.email,
        set: {
          fullName: values.fullName,
          phone: values.phone,
          city: values.city,
          skills: values.skills,
          packageId: values.packageId,
          packageName: values.packageName,
          packagePrice: values.packagePrice,
          paymentStatus: values.paymentStatus,
          notes: values.notes,
          updatedAt: now,
        },
      })
      .returning();

    return {
      ...profile,
      skills: JSON.parse(profile.skills) as string[],
    };
  },
});
