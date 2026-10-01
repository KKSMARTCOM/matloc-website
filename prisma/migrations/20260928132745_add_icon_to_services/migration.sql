-- AlterTable
ALTER TABLE "admin_users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "cms_achievements" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "cms_members" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "cms_partners" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "cms_services" ADD COLUMN     "icon" TEXT NOT NULL DEFAULT 'wrench',
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- AlterTable
ALTER TABLE "cms_values" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
