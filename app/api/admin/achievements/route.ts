import { NextResponse } from "next/server";
import { getAchievements, upsertAchievement, deleteAchievement } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ items: await getAchievements() });
  } catch (e) { return NextResponse.json({ error: String(e) }, { status: 500 }); }
}

export async function POST(req: Request) {
  try {
    const data = await req.json() as Parameters<typeof upsertAchievement>[0];
    const id = await upsertAchievement(data);
    return NextResponse.json({ id });
  } catch (e) { return NextResponse.json({ error: String(e) }, { status: 500 }); }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json() as { id: string };
    await deleteAchievement(id);
    return NextResponse.json({ success: true });
  } catch (e) { return NextResponse.json({ error: String(e) }, { status: 500 }); }
}
