"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth, signIn, signOut } from "@/auth";
import { db } from "@/db";
import { ensureDatabase } from "@/db/init";
import {
  departments,
  events,
  leadership,
  musicGroups,
  resources,
  sermons,
  serviceTimes,
  siteContent,
} from "@/db/schema";
import {
  contentSchema,
  departmentSchema,
  eventSchema,
  leadershipSchema,
  musicGroupSchema,
  resourceSchema,
  sermonSchema,
  serviceTimeSchema,
} from "@/lib/validations";

function textValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function maybeNumber(formData: FormData, key: string) {
  const value = formData.get(key);
  return value ? Number(value) : undefined;
}

async function ensureAdminSession() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
}

export async function loginAction(formData: FormData) {
  await signIn("credentials", {
    email: textValue(formData, "email"),
    password: textValue(formData, "password"),
    redirectTo: "/admin",
  });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function saveContentBlock(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();

  const data = contentSchema.parse({
    key: textValue(formData, "key"),
    title: textValue(formData, "title"),
    subtitle: textValue(formData, "subtitle"),
    body: textValue(formData, "body"),
    imageUrl: textValue(formData, "imageUrl"),
    ctaLabel: textValue(formData, "ctaLabel"),
    ctaHref: textValue(formData, "ctaHref"),
    secondaryCtaLabel: textValue(formData, "secondaryCtaLabel"),
    secondaryCtaHref: textValue(formData, "secondaryCtaHref"),
    metadata: textValue(formData, "metadata"),
  });

  await db
    .insert(siteContent)
    .values(data)
    .onConflictDoUpdate({
      target: siteContent.key,
      set: {
        ...data,
        updatedAt: new Date().toISOString(),
      },
    });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/beliefs");
  revalidatePath("/admin/settings");
}

export async function saveServiceTime(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = maybeNumber(formData, "id");
  const data = serviceTimeSchema.parse({
    id,
    title: textValue(formData, "title"),
    day: textValue(formData, "day"),
    startTime: textValue(formData, "startTime"),
    endTime: textValue(formData, "endTime"),
    description: textValue(formData, "description"),
    displayOrder: textValue(formData, "displayOrder"),
  });

  if (data.id) {
    await db.update(serviceTimes).set(data).where(eq(serviceTimes.id, data.id));
  } else {
    await db.insert(serviceTimes).values(data);
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function deleteServiceTime(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = Number(formData.get("id"));
  await db.delete(serviceTimes).where(eq(serviceTimes.id, id));
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function saveEvent(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = maybeNumber(formData, "id");
  const data = eventSchema.parse({
    id,
    title: textValue(formData, "title"),
    slug: textValue(formData, "slug"),
    summary: textValue(formData, "summary"),
    body: textValue(formData, "body"),
    imageUrl: textValue(formData, "imageUrl"),
    location: textValue(formData, "location"),
    startDate: textValue(formData, "startDate"),
    endDate: textValue(formData, "endDate"),
    category: textValue(formData, "category"),
    featured: formData.get("featured") === "on",
    published: formData.has("published") ? formData.get("published") === "on" : true,
  });

  if (data.id) {
    await db.update(events).set(data).where(eq(events.id, data.id));
  } else {
    await db.insert(events).values(data);
  }

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = Number(formData.get("id"));
  await db.delete(events).where(eq(events.id, id));
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
}

export async function saveDepartment(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = maybeNumber(formData, "id");
  const data = departmentSchema.parse({
    id,
    name: textValue(formData, "name"),
    description: textValue(formData, "description"),
    imageUrl: textValue(formData, "imageUrl"),
    ctaLabel: textValue(formData, "ctaLabel"),
  });

  if (data.id) {
    await db.update(departments).set(data).where(eq(departments.id, data.id));
  } else {
    await db.insert(departments).values(data);
  }

  revalidatePath("/");
  revalidatePath("/admin/departments");
}

export async function deleteDepartment(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = Number(formData.get("id"));
  await db.delete(departments).where(eq(departments.id, id));
  revalidatePath("/");
  revalidatePath("/admin/departments");
}

export async function saveMusicGroup(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = maybeNumber(formData, "id");
  const data = musicGroupSchema.parse({
    id,
    name: textValue(formData, "name"),
    description: textValue(formData, "description"),
    imageUrl: textValue(formData, "imageUrl"),
    memberCount: textValue(formData, "memberCount"),
  });

  if (data.id) {
    await db.update(musicGroups).set(data).where(eq(musicGroups.id, data.id));
  } else {
    await db.insert(musicGroups).values(data);
  }

  revalidatePath("/");
  revalidatePath("/admin/music");
}

export async function deleteMusicGroup(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = Number(formData.get("id"));
  await db.delete(musicGroups).where(eq(musicGroups.id, id));
  revalidatePath("/");
  revalidatePath("/admin/music");
}

export async function saveLeader(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = maybeNumber(formData, "id");
  const data = leadershipSchema.parse({
    id,
    name: textValue(formData, "name"),
    role: textValue(formData, "role"),
    group: textValue(formData, "group"),
    phone: textValue(formData, "phone"),
    email: textValue(formData, "email"),
    bio: textValue(formData, "bio"),
    imageUrl: textValue(formData, "imageUrl"),
    displayOrder: textValue(formData, "displayOrder"),
  });

  if (data.id) {
    await db.update(leadership).set(data).where(eq(leadership.id, data.id));
  } else {
    await db.insert(leadership).values(data);
  }

  revalidatePath("/leadership");
  revalidatePath("/");
  revalidatePath("/admin/leadership");
}

export async function deleteLeader(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = Number(formData.get("id"));
  await db.delete(leadership).where(eq(leadership.id, id));
  revalidatePath("/leadership");
  revalidatePath("/admin/leadership");
}

export async function saveSermon(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = maybeNumber(formData, "id");
  const data = sermonSchema.parse({
    id,
    title: textValue(formData, "title"),
    preacher: textValue(formData, "preacher"),
    preachedAt: textValue(formData, "preachedAt"),
    summary: textValue(formData, "summary"),
    videoUrl: textValue(formData, "videoUrl"),
    thumbnailUrl: textValue(formData, "thumbnailUrl"),
    tags: textValue(formData, "tags"),
    featured: formData.get("featured") === "on",
  });

  if (data.id) {
    await db.update(sermons).set(data).where(eq(sermons.id, data.id));
  } else {
    await db.insert(sermons).values(data);
  }

  revalidatePath("/");
  revalidatePath("/sermons");
  revalidatePath("/admin/sermons");
}

export async function deleteSermon(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = Number(formData.get("id"));
  await db.delete(sermons).where(eq(sermons.id, id));
  revalidatePath("/");
  revalidatePath("/sermons");
  revalidatePath("/admin/sermons");
}

export async function saveResource(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = maybeNumber(formData, "id");
  const data = resourceSchema.parse({
    id,
    title: textValue(formData, "title"),
    description: textValue(formData, "description"),
    fileUrl: textValue(formData, "fileUrl"),
    category: textValue(formData, "category"),
  });

  if (data.id) {
    await db.update(resources).set(data).where(eq(resources.id, data.id));
  } else {
    await db.insert(resources).values(data);
  }

  revalidatePath("/resources");
  revalidatePath("/admin/resources");
}

export async function deleteResource(formData: FormData) {
  await ensureAdminSession();
  await ensureDatabase();
  const id = Number(formData.get("id"));
  await db.delete(resources).where(eq(resources.id, id));
  revalidatePath("/resources");
  revalidatePath("/admin/resources");
}
