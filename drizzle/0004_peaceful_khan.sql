CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"selected" boolean DEFAULT false,
	"userId" text,
	CONSTRAINT "categories_userId_name_unique" UNIQUE("userId","name")
);
--> statement-breakpoint
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_userId_name_unique";--> statement-breakpoint
ALTER TABLE "grades" ADD COLUMN "category_fk" integer;--> statement-breakpoint
ALTER TABLE "preferences" ADD COLUMN "category_fk" integer;--> statement-breakpoint
ALTER TABLE "subjects" ADD COLUMN "category_fk" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grades" ADD CONSTRAINT "grades_category_fk_categories_id_fk" FOREIGN KEY ("category_fk") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "preferences" ADD CONSTRAINT "preferences_category_fk_categories_id_fk" FOREIGN KEY ("category_fk") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subjects" ADD CONSTRAINT "subjects_category_fk_categories_id_fk" FOREIGN KEY ("category_fk") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_userId_name_category_fk_unique" UNIQUE("userId","name","category_fk");