-- AlterTable
ALTER TABLE "admin_users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "cms_achievements" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "cms_members" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "cms_partners" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "cms_services" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "cms_values" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- CreateTable
CREATE TABLE "cms_translations" (
    "key" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cms_translations_pkey" PRIMARY KEY ("key","lang")
);
