CREATE TABLE "user_profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"full_name" text DEFAULT '' NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"city" text DEFAULT '' NOT NULL,
	"skills" text DEFAULT '[]' NOT NULL,
	"package_id" text DEFAULT 'starter' NOT NULL,
	"package_name" text DEFAULT 'Starter Access' NOT NULL,
	"package_price" integer DEFAULT 700 NOT NULL,
	"payment_status" text DEFAULT 'pending' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"created_at" text DEFAULT now() NOT NULL,
	"updated_at" text DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "user_profiles_email_unique" ON "user_profiles" USING btree ("email");