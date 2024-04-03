ALTER TABLE "grades" ALTER COLUMN "date" SET DEFAULT '2024-04-03';--> statement-breakpoint
ALTER TABLE "grades" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "preferences" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subjects" ALTER COLUMN "userId" DROP NOT NULL;