import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_schedule_cards_schedule_day" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
  CREATE TYPE "public"."enum_pages_blocks_schedule_cards_schedule_icon" AS ENUM('star', 'users', 'music', 'sparkles');
  CREATE TYPE "public"."enum__pages_v_blocks_schedule_cards_schedule_day" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
  CREATE TYPE "public"."enum__pages_v_blocks_schedule_cards_schedule_icon" AS ENUM('star', 'users', 'music', 'sparkles');
  CREATE TABLE "pages_blocks_schedule_cards_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_pages_blocks_schedule_cards_schedule_day",
  	"hours" varchar,
  	"title" varchar,
  	"description" varchar,
  	"price" varchar,
  	"special" varchar,
  	"highlight" boolean DEFAULT false,
  	"icon" "enum_pages_blocks_schedule_cards_schedule_icon"
  );
  
  CREATE TABLE "pages_blocks_schedule_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Weekly Schedule',
  	"subtitle" varchar DEFAULT 'Every Day Brings a New Adventure',
  	"cta_text" varchar DEFAULT 'View Full Schedule',
  	"cta_url" varchar DEFAULT '/schedule',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_schedule_cards_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"day" "enum__pages_v_blocks_schedule_cards_schedule_day",
  	"hours" varchar,
  	"title" varchar,
  	"description" varchar,
  	"price" varchar,
  	"special" varchar,
  	"highlight" boolean DEFAULT false,
  	"icon" "enum__pages_v_blocks_schedule_cards_schedule_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_schedule_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Weekly Schedule',
  	"subtitle" varchar DEFAULT 'Every Day Brings a New Adventure',
  	"cta_text" varchar DEFAULT 'View Full Schedule',
  	"cta_url" varchar DEFAULT '/schedule',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_schedule_cards_schedule" ADD CONSTRAINT "pages_blocks_schedule_cards_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_schedule_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_schedule_cards" ADD CONSTRAINT "pages_blocks_schedule_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_schedule_cards_schedule" ADD CONSTRAINT "_pages_v_blocks_schedule_cards_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_schedule_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_schedule_cards" ADD CONSTRAINT "_pages_v_blocks_schedule_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_schedule_cards_schedule_order_idx" ON "pages_blocks_schedule_cards_schedule" USING btree ("_order");
  CREATE INDEX "pages_blocks_schedule_cards_schedule_parent_id_idx" ON "pages_blocks_schedule_cards_schedule" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_schedule_cards_order_idx" ON "pages_blocks_schedule_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_schedule_cards_parent_id_idx" ON "pages_blocks_schedule_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_schedule_cards_path_idx" ON "pages_blocks_schedule_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_schedule_cards_schedule_order_idx" ON "_pages_v_blocks_schedule_cards_schedule" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_schedule_cards_schedule_parent_id_idx" ON "_pages_v_blocks_schedule_cards_schedule" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_schedule_cards_order_idx" ON "_pages_v_blocks_schedule_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_schedule_cards_parent_id_idx" ON "_pages_v_blocks_schedule_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_schedule_cards_path_idx" ON "_pages_v_blocks_schedule_cards" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_schedule_cards_schedule" CASCADE;
  DROP TABLE "pages_blocks_schedule_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_schedule_cards_schedule" CASCADE;
  DROP TABLE "_pages_v_blocks_schedule_cards" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_schedule_cards_schedule_day";
  DROP TYPE "public"."enum_pages_blocks_schedule_cards_schedule_icon";
  DROP TYPE "public"."enum__pages_v_blocks_schedule_cards_schedule_day";
  DROP TYPE "public"."enum__pages_v_blocks_schedule_cards_schedule_icon";`)
}
