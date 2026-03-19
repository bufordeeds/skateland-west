import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "promotional_popup" (
   	"id" serial PRIMARY KEY NOT NULL,
   	"enabled" boolean DEFAULT false,
   	"title" varchar NOT NULL,
   	"body" jsonb,
   	"image_id" integer,
   	"cta_button_label" varchar,
   	"cta_button_url" varchar,
   	"cta_button_new_tab" boolean DEFAULT false,
   	"updated_at" timestamp(3) with time zone,
   	"created_at" timestamp(3) with time zone
   );

   ALTER TABLE "promotional_popup" ADD CONSTRAINT "promotional_popup_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   CREATE INDEX "promotional_popup_image_idx" ON "promotional_popup" USING btree ("image_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "promotional_popup" DROP CONSTRAINT "promotional_popup_image_id_media_id_fk";
   DROP INDEX "promotional_popup_image_idx";
   DROP TABLE "promotional_popup" CASCADE;`)
}
