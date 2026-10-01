import { prisma } from "@/lib/prisma";

/**
 * Migrations SQL appliquées automatiquement au démarrage.
 * Idempotentes — peuvent s'exécuter plusieurs fois sans problème.
 */
export async function runMigrations() {
  try {
    /* Ajouter la colonne icon à cms_services si elle n'existe pas */
    await prisma.$executeRawUnsafe(`
      ALTER TABLE cms_services
      ADD COLUMN IF NOT EXISTS icon TEXT NOT NULL DEFAULT 'wrench'
    `);
    console.log("[migrate] cms_services.icon OK");
  } catch (err) {
    console.error("[migrate] Erreur :", err);
  }
}
