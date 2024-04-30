ALTER TABLE "grades" DROP CONSTRAINT "grades_subject_fk_subjects_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grades" ADD CONSTRAINT "grades_subject_fk_subjects_id_fk" FOREIGN KEY ("subject_fk") REFERENCES "subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
