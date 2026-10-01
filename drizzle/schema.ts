import {
  boolean,
  index,
  integer,
  now,
  table,
  text,
  uniqueIndex,
} from "@agent-native/core/db/schema";

export const tasks = table(
  "tasks",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    clientProject: text("client_project").notNull().default(""),
    category: text("category").notNull(),
    description: text("description").notNull().default(""),
    instructions: text("instructions").notNull().default(""),
    reward: integer("reward").notNull(),
    currency: text("currency").notNull().default("KSH"),
    difficulty: text("difficulty").notNull(),
    estimatedMinutes: integer("estimated_minutes").notNull(),
    deadline: text("deadline"),
    totalSlots: integer("total_slots").notNull(),
    remainingSlots: integer("remaining_slots").notNull(),
    requiredSkills: text("required_skills").notNull().default(""),
    requiredAssessmentScore: integer("required_assessment_score")
      .notNull()
      .default(0),
    premiumRequired: boolean("premium_required").notNull().default(false),
    status: text("status").notNull().default("DRAFT"),
    isDemo: boolean("is_demo").notNull().default(false),
    createdBy: text("created_by").notNull(),
    publishedAt: text("published_at"),
    createdAt: text("created_at").notNull().default(now()),
    updatedAt: text("updated_at").notNull().default(now()),
  },
  (task) => ({
    slugUnique: uniqueIndex("tasks_slug_unique").on(task.slug),
    marketplaceCategoryIdx: index("tasks_marketplace_category_idx").on(
      task.status,
      task.category,
      task.premiumRequired,
    ),
    marketplaceDeadlineIdx: index("tasks_marketplace_deadline_idx").on(
      task.status,
      task.deadline,
    ),
    demoFilterIdx: index("tasks_demo_filter_idx").on(task.isDemo),
  }),
);

export const userProfiles = table(
  "user_profiles",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    fullName: text("full_name").notNull().default(""),
    phone: text("phone").notNull().default(""),
    city: text("city").notNull().default(""),
    skills: text("skills").notNull().default("[]"),
    packageId: text("package_id").notNull().default("starter"),
    packageName: text("package_name").notNull().default("Starter Access"),
    packagePrice: integer("package_price").notNull().default(700),
    paymentStatus: text("payment_status").notNull().default("pending"),
    notes: text("notes").notNull().default(""),
    createdAt: text("created_at").notNull().default(now()),
    updatedAt: text("updated_at").notNull().default(now()),
  },
  (profile) => ({
    emailUnique: uniqueIndex("user_profiles_email_unique").on(profile.email),
  }),
);
