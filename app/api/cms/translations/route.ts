import { NextResponse } from "next/server";
import { getTranslationsByLang, upsertTranslations } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const lang = new URL(req.url).searchParams.get("lang") ?? "fr";
  try {
    const rows = await getTranslationsByLang(lang);
    const data = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return NextResponse.json({ data, rows });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json() as { lang: string; updates: { key: string; value: string }[] };
    if (!body.lang || !Array.isArray(body.updates)) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }
    await upsertTranslations(body.updates.map((u) => ({ ...u, lang: body.lang })));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
