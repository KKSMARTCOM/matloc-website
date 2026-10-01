import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/reset
 * Vide toutes les tables de contenu et remet le site à nu.
 * Réservé au propriétaire (owner).
 */
export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session.isOwner) {
      return NextResponse.json({ error: "Réservé au propriétaire." }, { status: 403 });
    }

    /* Vider dans l'ordre (contraintes FK éventuelles) */
    await prisma.cmsService.deleteMany();
    await prisma.cmsAchievement.deleteMany();
    await prisma.cmsPartner.deleteMany();
    await prisma.cmsMember.deleteMany();
    await prisma.cmsValue.deleteMany();
    await prisma.cmsSetting.deleteMany();

    /* Garder les admin_users et les traductions (optionnel) */

    return NextResponse.json({ success: true, message: "Base vidée avec succès." });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const status = msg.includes("refusé") || msg.includes("Réservé") ? 403 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
