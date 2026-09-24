import {
  v2 as cloudinary,
  type UploadApiOptions,
  type UploadApiResponse,
} from "cloudinary";
import sharp from "sharp";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ALLOWED_IMAGES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const ALLOWED_VIDEOS = new Set([
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
]);
const MAX_IMAGE_MB = 10;
const MAX_VIDEO_MB = 100;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

function safeBaseName(fileName: string) {
  return (
    fileName
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase()
      .slice(0, 50) || "media"
  );
}

function uploadBuffer(buffer: Buffer, options: UploadApiOptions) {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary n'a retourné aucun résultat."));
          return;
        }
        resolve(result);
      },
    );
    stream.end(buffer);
  });
}

export async function POST(req: Request) {
  try {
    await requireAdmin();

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "La configuration Cloudinary est incomplète." },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Aucun fichier fourni." },
        { status: 400 },
      );
    }

    const isImage = ALLOWED_IMAGES.has(file.type);
    const isVideo = ALLOWED_VIDEOS.has(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          error:
            "Format non supporté. Images : JPG, PNG, WEBP, SVG. Vidéos : MP4, WEBM.",
        },
        { status: 400 },
      );
    }

    const maxMb = isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB;
    if (file.size > maxMb * 1024 * 1024) {
      return NextResponse.json(
        { error: `Fichier trop lourd. Maximum ${maxMb} Mo.` },
        { status: 400 },
      );
    }

    const originalBuffer = Buffer.from(await file.arrayBuffer());
    const baseName = safeBaseName(file.name);
    let buffer = originalBuffer;
    let uploadFormat: string | undefined;

    // Les images raster sont redimensionnées et converties en WebP avant l'envoi.
    // Les SVG et GIF restent inchangés pour préserver leurs caractéristiques.
    if (isImage && file.type !== "image/svg+xml" && file.type !== "image/gif") {
      buffer = await sharp(originalBuffer)
        .rotate()
        .resize({
          width: 2400,
          height: 2400,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 82, effort: 4 })
        .toBuffer();
      uploadFormat = "webp";
    }

    const result = await uploadBuffer(buffer, {
      folder: isVideo ? "matloc/videos" : "matloc/images",
      public_id: `${Date.now()}-${baseName}`,
      resource_type: isVideo ? "video" : "image",
      format: uploadFormat,
      ...(isVideo
        ? {
            // Transformation entrante : Cloudinary stocke directement la version optimisée.
            transformation: [
              { format: "mp4", video_codec: "h264", quality: "auto:good" },
            ],
          }
        : {}),
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      fileName: result.original_filename,
      type: isVideo ? "video" : "image",
      optimized: buffer.length < originalBuffer.length || isVideo,
    });
  } catch (err) {
    console.error("[upload]", err);
    return NextResponse.json(
      { error: "Erreur lors de l'upload." },
      { status: 500 },
    );
  }
}
