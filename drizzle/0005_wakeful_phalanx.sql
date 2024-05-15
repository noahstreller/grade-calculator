ALTER TABLE "preferences" DROP CONSTRAINT "preferences_category_fk_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "preferences" DROP COLUMN IF EXISTS "category_fk";