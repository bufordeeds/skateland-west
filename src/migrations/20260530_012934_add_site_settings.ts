import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"business_name" varchar DEFAULT 'Skateland West',
  	"booking_url" varchar DEFAULT 'https://skatelandwest.pcsparty.com/bookings/index.asp',
  	"contact_phone" varchar DEFAULT '(210) 673-2568',
  	"contact_email" varchar DEFAULT 'skatelandwest74@gmail.com',
  	"address_street" varchar DEFAULT '2327 S.W. Loop 410',
  	"address_city" varchar DEFAULT 'San Antonio',
  	"address_state" varchar DEFAULT 'TX',
  	"address_zip" varchar DEFAULT '78227',
  	"address_google_maps_url" varchar DEFAULT 'https://www.google.com/maps/place/Skateland+West/@29.4073877,-98.6532231,17z/data=!4m6!3m5!1s0x865c5b50ed0616bf:0x4767b14115ede262!8m2!3d29.4073831!4d-98.6506482!16s%2Fg%2F1ts_70fk',
  	"social_facebook" varchar DEFAULT 'https://www.facebook.com/myskatelandwest/',
  	"social_instagram" varchar DEFAULT 'https://www.instagram.com/skateland_west/',
  	"social_x" varchar DEFAULT 'https://x.com/Skateland_West',
  	"hours_sunday_is_open" boolean DEFAULT true,
  	"hours_sunday_hours" varchar DEFAULT '2:00 PM - 6:00 PM',
  	"hours_monday_is_open" boolean DEFAULT false,
  	"hours_monday_hours" varchar DEFAULT '',
  	"hours_tuesday_is_open" boolean DEFAULT false,
  	"hours_tuesday_hours" varchar DEFAULT '',
  	"hours_wednesday_is_open" boolean DEFAULT false,
  	"hours_wednesday_hours" varchar DEFAULT '',
  	"hours_thursday_is_open" boolean DEFAULT true,
  	"hours_thursday_hours" varchar DEFAULT '6:00 PM - 9:00 PM',
  	"hours_friday_is_open" boolean DEFAULT true,
  	"hours_friday_hours" varchar DEFAULT '6:00 PM - 10:30 PM',
  	"hours_saturday_is_open" boolean DEFAULT true,
  	"hours_saturday_hours" varchar DEFAULT '1:30 PM - 10:30 PM',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings" CASCADE;`)
}
