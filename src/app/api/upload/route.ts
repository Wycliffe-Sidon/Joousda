export const runtime = "nodejs";

import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const isVercelRuntime = process.env.VERCEL === "1";
const MAX_INLINE_UPLOAD_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const rawFolder = (searchParams.get("folder") ?? "general").trim();

  if (!rawFolder || rawFolder.includes("postgresql") || rawFolder.includes("://")) {
    return NextResponse.json({ error: "Invalid folder name" }, { status: 400 });
  }

  const folder = rawFolder.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!folder) {
    return NextResponse.json({ error: "Invalid folder name" }, { status: 400 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const fileName = `${Date.now()}-${safeName}`;

  if (isVercelRuntime) {
    if (bytes.byteLength > MAX_INLINE_UPLOAD_BYTES) {
      return NextResponse.json({ error: "File is too large for serverless upload storage" }, { status: 400 });
    }

    const mimeType = file.type || "application/octet-stream";
    const base64 = bytes.toString("base64");

    return NextResponse.json({
      url: `data:${mimeType};base64,${base64}`,
      fileName,
    });
  }

  const uploadsRoot = path.resolve(process.cwd(), "public", "uploads");
  const absoluteDir = path.resolve(uploadsRoot, folder);

  if (path.relative(uploadsRoot, absoluteDir).startsWith("..")) {
    return NextResponse.json({ error: "Invalid folder name" }, { status: 400 });
  }

  const absolutePath = path.join(absoluteDir, fileName);

  await fs.mkdir(absoluteDir, { recursive: true });
  await fs.writeFile(absolutePath, bytes);

  return NextResponse.json({
    url: `/uploads/${folder}/${fileName}`,
  });
}
