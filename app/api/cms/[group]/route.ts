import { NextResponse } from "next/server";
import { getSettingsByGroup, updateManySettings, settingsToMap } from "@/lib/db";

export const dynamic = "force-dynamic";

const ALLOWED_GROUPS = new Set([
  "hero", "about", "aboutpage", "services", "realisations",
  "partners", "cta", "seo", "footer", "contact", "images",
]);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ group: string }> },
) {
  const { group } = await params;
  if (!ALLOWED_GROUPS.has(group)) {
    return NextResponse.json({ error: "Groupe inconnu" }, { status: 404 });
  }
  try {
    const rows = await getSettingsByGroup(group);
    return NextResponse.json({ data: settingsToMap(rows), rows });
  } catch (err) {
    console.error(`[CMS] GET /api/cms/${group}`, err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ group: string }> },
) {
  const { group } = await params;
  if (!ALLOWED_GROUPS.has(group)) {
    return NextResponse.json({ error: "Groupe inconnu" }, { status: 404 });
  }
  try {
    const body = await req.json() as Record<string, string>;
    /* Sécurité : n'accepter que les clés qui commencent par le nom du groupe */
    const filtered = Object.fromEntries(
      Object.entries(body).filter(([k]) => k.startsWith(group)),
    );
    await updateManySettings(filtered);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`[CMS] PATCH /api/cms/${group}`, err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
