import { NextResponse } from "next/server";
import { getPartners, upsertPartner, deletePartner } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ items: await getPartners() });
  } catch (e) { return NextResponse.json({ error: String(e) }, { status: 500 }); }
}

export async function POST(req: Request) {
  try {
    const data = await req.json() as Parameters<typeof upsertPartner>[0];
    const id = await upsertPartner(data);
    return NextResponse.json({ id });
  } catch (e) { return NextResponse.json({ error: String(e) }, { status: 500 }); }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json() as { id: string };
    await deletePartner(id);
    return NextResponse.json({ success: true });
  } catch (e) { return NextResponse.json({ error: String(e) }, { status: 500 }); }
}
