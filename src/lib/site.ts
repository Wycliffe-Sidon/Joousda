import { and, desc, eq, like, or } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/db";
import { ensureDatabase } from "@/db/init";
import {
  contactSubmissions,
  departments,
  events,
  galleryImages,
  homepageSections,
  leadership,
  musicGroups,
  prayerRequests,
  resources,
  sermons,
  serviceTimes,
  siteContent,
} from "@/db/schema";

export async function getHomePageData() {
  noStore();
  await ensureDatabase();

  const [contentBlocks, sectionItems, galleryItems, weeklyEvents, times, ministryItems, musicItems, team, featuredSermons, resourceItems] =
    await Promise.all([
      db.select().from(siteContent),
      db.select().from(homepageSections).orderBy(homepageSections.displayOrder),
      db.select().from(galleryImages).orderBy(galleryImages.displayOrder),
      db
        .select()
        .from(events)
        .where(and(eq(events.featured, true), eq(events.published, true)))
        .orderBy(events.startDate)
        .limit(3),
      db.select().from(serviceTimes).orderBy(serviceTimes.displayOrder),
      db.select().from(departments),
      db.select().from(musicGroups),
      db.select().from(leadership).orderBy(leadership.displayOrder).limit(4),
      db
        .select()
        .from(sermons)
        .orderBy(desc(sermons.featured), desc(sermons.preachedAt))
        .limit(3),
      db.select().from(resources).limit(3),
    ]);

  return {
    content: Object.fromEntries(contentBlocks.map((item) => [item.key, item])),
    homepageSections: sectionItems,
    galleryImages: galleryItems,
    weeklyEvents,
    serviceTimes: times,
    departments: ministryItems,
    musicGroups: musicItems,
    leadership: team,
    sermons: featuredSermons,
    resources: resourceItems,
  };
}

export async function getAllPageData() {
  noStore();
  await ensureDatabase();

  const [content, sectionItems, galleryItems, ministryItems, musicItems, team, sermonItems, resourceItems, eventItems] =
    await Promise.all([
      db.select().from(siteContent),
      db.select().from(homepageSections).orderBy(homepageSections.displayOrder),
      db.select().from(galleryImages).orderBy(galleryImages.displayOrder),
      db.select().from(departments),
      db.select().from(musicGroups),
      db.select().from(leadership).orderBy(leadership.group, leadership.displayOrder),
      db.select().from(sermons).orderBy(desc(sermons.preachedAt)),
      db.select().from(resources),
      db.select().from(events).where(eq(events.published, true)).orderBy(events.startDate),
    ]);

  return {
    content: Object.fromEntries(content.map((item) => [item.key, item])),
    homepageSections: sectionItems,
    galleryImages: galleryItems,
    departments: ministryItems,
    musicGroups: musicItems,
    leadership: team,
    sermons: sermonItems,
    resources: resourceItems,
    events: eventItems,
  };
}

export async function getSermons(search?: string) {
  noStore();
  await ensureDatabase();
  const term = search?.trim();

  if (!term) {
    return db.select().from(sermons).orderBy(desc(sermons.preachedAt));
  }

  return db
    .select()
    .from(sermons)
    .where(
      or(
        like(sermons.title, `%${term}%`),
        like(sermons.preacher, `%${term}%`),
        like(sermons.tags, `%${term}%`),
      ),
    )
    .orderBy(desc(sermons.preachedAt));
}

export async function getAdminData() {
  noStore();
  await ensureDatabase();

  const [
    content,
    sectionItems,
    galleryItems,
    times,
    eventItems,
    ministryItems,
    musicItems,
    team,
    sermonItems,
    resourceItems,
    messages,
    prayers,
  ] = await Promise.all([
    db.select().from(siteContent),
    db.select().from(homepageSections).orderBy(homepageSections.displayOrder),
    db.select().from(galleryImages).orderBy(galleryImages.displayOrder),
    db.select().from(serviceTimes).orderBy(serviceTimes.displayOrder),
    db.select().from(events).orderBy(desc(events.startDate)),
    db.select().from(departments),
    db.select().from(musicGroups),
    db.select().from(leadership).orderBy(leadership.group, leadership.displayOrder),
    db.select().from(sermons).orderBy(desc(sermons.preachedAt)),
    db.select().from(resources),
    db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)),
    db.select().from(prayerRequests).orderBy(desc(prayerRequests.createdAt)),
  ]);

  return {
    content: Object.fromEntries(content.map((item) => [item.key, item])),
    homepageSections: sectionItems,
    galleryImages: galleryItems,
    serviceTimes: times,
    events: eventItems,
    departments: ministryItems,
    musicGroups: musicItems,
    leadership: team,
    sermons: sermonItems,
    resources: resourceItems,
    contactSubmissions: messages,
    prayerRequests: prayers,
  };
}
