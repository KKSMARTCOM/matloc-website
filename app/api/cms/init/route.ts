import { NextResponse } from "next/server";
import { initCmsDb, getAllSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initCmsDb();
    const rows = await getAllSettings();
    return NextResponse.json({
      success: true,
      message: `Base initialisée — ${rows.length} entrées présentes.`,
      count: rows.length,
    });
  } catch (err) {
    console.error("[CMS] init error", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
