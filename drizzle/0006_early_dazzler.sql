CREATE TABLE IF NOT EXISTS "archivedata" (
	"id" serial PRIMARY KEY NOT NULL,
	"data" text NOT NULL,
	"userId" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "archivedata" ADD CONSTRAINT "archivedata_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
