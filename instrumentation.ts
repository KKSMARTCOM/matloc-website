/**
 * Next.js Instrumentation — s'exécute UNE FOIS au démarrage du serveur.
 * Initialise toutes les tables CMS et insère les données seed.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      const { runMigrations } = await import("@/lib/migrate");
      const { initCmsDb, initCrudTables, initUsersTable, initTranslations } = await import("@/lib/db");

      await runMigrations();
      await initCmsDb();
      await initCrudTables();
      await initUsersTable();
      await initTranslations();

      console.log("[CMS] Base de données initialisée avec succès.");
    } catch (err) {
      console.error("[CMS] Erreur d'initialisation :", err);
    }
  }
}
