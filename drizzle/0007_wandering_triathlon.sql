ALTER TABLE "grades" DROP CONSTRAINT "grades_subject_fk_subjects_id_fk";
--> statement-breakpoint
ALTER TABLE "grades" ALTER COLUMN "value" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "preferences" ALTER COLUMN "passingGrade" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "preferences" ALTER COLUMN "minimumGrade" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "preferences" ALTER COLUMN "maximumGrade" SET DATA TYPE double precision;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grades" ADD CONSTRAINT "grades_subject_fk_subjects_id_fk" FOREIGN KEY ("subject_fk") REFERENCES "subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
