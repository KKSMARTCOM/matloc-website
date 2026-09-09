import { NextResponse } from "next/server";
import { pool, initCmsDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initCmsDb();

    /* ── Totaux ── */
    const [svc, ach, par, mem, usr, settings] = await Promise.all([
      pool.query("SELECT COUNT(*) AS n FROM cms_services"),
      pool.query("SELECT COUNT(*) AS n FROM cms_achievements"),
      pool.query("SELECT COUNT(*) AS n FROM cms_partners"),
      pool.query("SELECT COUNT(*) AS n FROM cms_members"),
      pool.query("SELECT COUNT(*) AS n FROM admin_users").catch(() => ({ rows: [{ n: 1 }] })),
      pool.query("SELECT COUNT(*) AS n FROM cms_settings"),
    ]);

    /* ── Activités récentes — dernières mises à jour ── */
    const recent = await pool.query(`
      SELECT 'service' AS type, title AS label, updated_at
      FROM cms_services
      UNION ALL
      SELECT 'réalisation', title, updated_at FROM cms_achievements
      UNION ALL
      SELECT 'partenaire', name, updated_at FROM cms_partners
      UNION ALL
      SELECT 'membre', name, updated_at FROM cms_members
      UNION ALL
      SELECT 'paramètre', label, updated_at FROM cms_settings
      ORDER BY updated_at DESC
      LIMIT 8
    `).catch(() => ({ rows: [] }));

    return NextResponse.json({
      totals: {
        services:     Number((svc.rows[0] as { n: string }).n),
        achievements: Number((ach.rows[0] as { n: string }).n),
        partners:     Number((par.rows[0] as { n: string }).n),
        members:      Number((mem.rows[0] as { n: string }).n),
        users:        Number((usr.rows[0] as { n: string }).n),
        settings:     Number((settings.rows[0] as { n: string }).n),
      },
      recent: (recent.rows as { type: string; label: string; updated_at: string }[]),
    });
  } catch (err) {
    console.error("[stats]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
