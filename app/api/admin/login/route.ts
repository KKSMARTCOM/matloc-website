import { NextResponse } from "next/server";
import { verifyCredentials, signToken, buildSetCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json() as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
    }

    const payload = await verifyCredentials(email, password);
    if (!payload) {
      return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
    }

    const token = signToken(payload);
    const res   = NextResponse.json({ success: true, role: payload.role, name: payload.name });
    res.headers.set("Set-Cookie", buildSetCookie(token));
    return res;
  } catch (err) {
    console.error("[auth] login error", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
