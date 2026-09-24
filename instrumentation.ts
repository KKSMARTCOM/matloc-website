/**
 * Next.js Instrumentation — s'exécute UNE FOIS au démarrage du serveur.
 * Initialise la table CMS et insère les données seed si elles n'existent pas.
 */
export async function register() {
  // Côté serveur uniquement (pas dans le Edge Runtime)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initCmsDb } = await import("@/lib/db");
    try {
      await initCmsDb();
      console.log("[CMS] Base de données initialisée avec succès.");
    } catch (err) {
      console.error("[CMS] Erreur d'initialisation :", err);
    }
  }
}
