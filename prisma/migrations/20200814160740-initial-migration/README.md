# Migration `20200814160740-initial-migration`

This migration has been generated by Ivor Padilla at 8/14/2020, 6:07:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Faq" (
"id" SERIAL,
"title" text  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
"body" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."PageSetting" (
"id" SERIAL,
"name" text  NOT NULL ,
"value" text  NOT NULL ,
"storeHost" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."TrackingPage" (
"storeHost" text  NOT NULL ,
"name" text   ,
"description" text   ,
"email" text   ,
"storeId" text   ,
PRIMARY KEY ("storeHost"))

CREATE  INDEX "PageSetting.name_index" ON "public"."PageSetting"("name")

CREATE UNIQUE INDEX "TrackingPage.email_unique" ON "public"."TrackingPage"("email")

CREATE UNIQUE INDEX "TrackingPage.storeId_unique" ON "public"."TrackingPage"("storeId")

ALTER TABLE "public"."PageSetting" ADD FOREIGN KEY ("storeHost")REFERENCES "public"."TrackingPage"("storeHost") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200814155709-initial-migration..20200814160740-initial-migration
--- datamodel.dml
+++ datamodel.dml
@@ -2,10 +2,39 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
+
+// Models must be singular or Nexus will complain 
+
+model Faq {
+  id        Int      @default(autoincrement()) @id
+  title     String
+  createdAt DateTime @default(now())
+  updatedAt DateTime
+  body      String
+}
+
+model PageSetting {
+  id           Int          @default(autoincrement()) @id
+  name         String
+  value        String
+  storeHost    String
+  TrackingPage TrackingPage @relation(fields: [storeHost], references: [storeHost])
+
+  @@index([name])
+}
+
+model TrackingPage {
+  storeHost   String     @id
+  name        String?
+  description String?
+  email       String?     @unique
+  storeId     String?     @unique
+  settings    PageSetting[]
+}
```

