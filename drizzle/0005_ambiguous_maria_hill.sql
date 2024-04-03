ALTER TABLE "subjects" DROP CONSTRAINT "subjects_name_unique";--> statement-breakpoint
ALTER TABLE "grades" ALTER COLUMN "date" SET DEFAULT '2024-04-03T11:54:54.256Z';--> statement-breakpoint
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_userId_name_unique" UNIQUE("userId","name");