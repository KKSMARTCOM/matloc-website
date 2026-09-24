import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import { join, extname } from "node:path";

export const dynamic = "force-dynamic";

const ALLOWED_IMAGES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const ALLOWED_VIDEOS = new Set(["video/mp4", "video/webm", "video/ogg", "video/quicktime"]);
const MAX_IMAGE_MB   = 5;
const MAX_VIDEO_MB   = 100;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni." }, { status: 400 });
    }

    const isImage = ALLOWED_IMAGES.has(file.type);
    const isVideo = ALLOWED_VIDEOS.has(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: "Format non supporté. Images : JPG, PNG, WEBP, SVG. Vidéos : MP4, WEBM." },
        { status: 400 },
      );
    }

    const maxMb = isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB;
    if (file.size > maxMb * 1024 * 1024) {
      return NextResponse.json({ error: `Fichier trop lourd. Maximum ${maxMb} Mo.` }, { status: 400 });
    }

    const bytes    = await file.arrayBuffer();
    const buffer   = Buffer.from(bytes);
    const ext      = extname(file.name).toLowerCase() || (isVideo ? ".mp4" : ".jpg");
    const baseName = file.name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9]/gi, "-").toLowerCase().slice(0, 40);
    const fileName = `${Date.now()}-${baseName}${ext}`;

    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, fileName), buffer);

    return NextResponse.json({
      url:      `/uploads/${fileName}`,
      fileName,
      type:     isVideo ? "video" : "image",
    });
  } catch (err) {
    console.error("[upload]", err);
    return NextResponse.json({ error: "Erreur lors de l'upload." }, { status: 500 });
  }
}
