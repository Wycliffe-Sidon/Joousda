export const runtime = "nodejs";

import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

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
