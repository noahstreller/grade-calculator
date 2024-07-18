ALTER TABLE "archivedata" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "archivedata" ADD COLUMN "date" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "archivedata" ADD CONSTRAINT "archivedata_userId_data_unique" UNIQUE("userId","data");