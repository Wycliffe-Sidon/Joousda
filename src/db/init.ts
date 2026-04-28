import bcrypt from "bcryptjs";
import { count } from "drizzle-orm";
import { db, sqlite } from "./index.ts";
import {
  admins,
  departments,
  events,
  leadership,
  musicGroups,
  resources,
  sermons,
  serviceTimes,
  siteContent,
} from "./schema.ts";
import {
  seedContentBlocks,
  seedDepartments,
  seedEvents,
  seedLeadership,
  seedMusicGroups,
  seedResources,
  seedSermons,
  seedServiceTimes,
} from "./seed-data.ts";

let initPromise: Promise<void> | null = null;

function createTables() {
  return Promise.all(
    [
      `CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS site_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        subtitle TEXT,
        body TEXT,
        image_url TEXT,
        cta_label TEXT,
        cta_href TEXT,
        secondary_cta_label TEXT,
        secondary_cta_href TEXT,
        metadata TEXT,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS service_times (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        day TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        description TEXT,
        display_order INTEGER NOT NULL DEFAULT 0
      )`,
      `CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        summary TEXT NOT NULL,
        body TEXT,
        image_url TEXT,
        location TEXT,
        start_date TEXT NOT NULL,
        end_date TEXT,
        category TEXT NOT NULL DEFAULT 'Event',
        featured INTEGER NOT NULL DEFAULT 0,
        published INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS departments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        cta_label TEXT DEFAULT 'Explore Ministry'
      )`,
      `CREATE TABLE IF NOT EXISTS music_groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        member_count INTEGER NOT NULL DEFAULT 0
      )`,
      `CREATE TABLE IF NOT EXISTS leadership (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        "group" TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        bio TEXT,
        image_url TEXT,
        display_order INTEGER NOT NULL DEFAULT 0
      )`,
      `CREATE TABLE IF NOT EXISTS sermons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        preacher TEXT NOT NULL,
        preached_at TEXT NOT NULL,
        summary TEXT,
        video_url TEXT NOT NULL,
        thumbnail_url TEXT,
        tags TEXT,
        featured INTEGER NOT NULL DEFAULT 0
      )`,
      `CREATE TABLE IF NOT EXISTS resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        file_url TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'Download'
      )`,
      `CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS prayer_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        request TEXT NOT NULL,
        is_confidential INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    ].map((statement) => sqlite.execute(statement)),
  );
}

async function seedDatabase() {
  const [{ value: adminCount }] = await db.select({ value: count() }).from(admins);
  if (adminCount > 0) {
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@joousda.org";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  await db.insert(admins).values({
    email: adminEmail,
    passwordHash: bcrypt.hashSync(adminPassword, 10),
    name: "JOOUSDA Admin",
    role: "admin",
  });

  await db.insert(siteContent).values(seedContentBlocks);
  await db.insert(serviceTimes).values(
    seedServiceTimes.map(([title, day, startTime, endTime, description], index) => ({
      title,
      day,
      startTime,
      endTime,
      description,
      displayOrder: index,
    })),
  );
  await db.insert(departments).values(seedDepartments);
  await db.insert(musicGroups).values(seedMusicGroups);
  await db.insert(leadership).values(
    seedLeadership.map(([name, role, group], index) => ({
      name,
      role,
      group,
      phone: `+254 7${(index + 11).toString().padStart(8, "0")}`,
      email: `${name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/\.+/g, ".").replace(/(^\.|\.$)/g, "")}@joousda.org`,
      bio: `${name} serves the church through prayerful leadership, mentorship, and faithful campus ministry.`,
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      displayOrder: index,
    })),
  );
  await db.insert(sermons).values(seedSermons);
  await db.insert(resources).values(seedResources);
  await db.insert(events).values(seedEvents);
}

export async function ensureDatabase() {
  if (!initPromise) {
    initPromise = (async () => {
      await createTables();
      await seedDatabase();
    })();
  }

  return initPromise;
}
