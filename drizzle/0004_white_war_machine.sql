ALTER TABLE "grades" ALTER COLUMN "date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "grades" ALTER COLUMN "date" SET DEFAULT '2024-04-03T09:12:25.708Z';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DATA TYPE timestamp with time zone;