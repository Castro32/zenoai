CREATE TABLE "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"client_project" text DEFAULT '' NOT NULL,
	"category" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"instructions" text DEFAULT '' NOT NULL,
	"reward" integer NOT NULL,
	"currency" text DEFAULT 'KSH' NOT NULL,
	"difficulty" text NOT NULL,
	"estimated_minutes" integer NOT NULL,
	"deadline" text,
	"total_slots" integer NOT NULL,
	"remaining_slots" integer NOT NULL,
	"required_skills" text DEFAULT '' NOT NULL,
	"required_assessment_score" integer DEFAULT 0 NOT NULL,
	"premium_required" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'DRAFT' NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_by" text NOT NULL,
	"published_at" text,
	"created_at" text DEFAULT now() NOT NULL,
	"updated_at" text DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "tasks_slug_unique" ON "tasks" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "tasks_marketplace_category_idx" ON "tasks" USING btree ("status","category","premium_required");--> statement-breakpoint
CREATE INDEX "tasks_marketplace_deadline_idx" ON "tasks" USING btree ("status","deadline");--> statement-breakpoint
CREATE INDEX "tasks_demo_filter_idx" ON "tasks" USING btree ("is_demo");
