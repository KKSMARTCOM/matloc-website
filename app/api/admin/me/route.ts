import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
    }
    return NextResponse.json({
      id:      session.id,
      name:    session.name,
      email:   session.email,
      role:    session.role,
      isOwner: session.isOwner,
    });
  } catch (err) {
    console.error("[auth] me error", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
