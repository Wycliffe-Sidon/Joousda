import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const admins = sqliteTable("admins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const siteContent = sqliteTable("site_content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  body: text("body"),
  imageUrl: text("image_url"),
  ctaLabel: text("cta_label"),
  ctaHref: text("cta_href"),
  secondaryCtaLabel: text("secondary_cta_label"),
  secondaryCtaHref: text("secondary_cta_href"),
  metadata: text("metadata"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const serviceTimes = sqliteTable("service_times", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  day: text("day").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  description: text("description"),
  displayOrder: integer("display_order").notNull().default(0),
});

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  body: text("body"),
  imageUrl: text("image_url"),
  location: text("location"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  category: text("category").notNull().default("Event"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const departments = sqliteTable("departments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  ctaLabel: text("cta_label").default("Explore Ministry"),
});

export const musicGroups = sqliteTable("music_groups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  memberCount: integer("member_count").notNull().default(0),
});

export const leadership = sqliteTable("leadership", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  group: text("group").notNull(),
  phone: text("phone"),
  email: text("email"),
  bio: text("bio"),
  imageUrl: text("image_url"),
  displayOrder: integer("display_order").notNull().default(0),
});

export const sermons = sqliteTable("sermons", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  preacher: text("preacher").notNull(),
  preachedAt: text("preached_at").notNull(),
  summary: text("summary"),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  tags: text("tags"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
});

export const resources = sqliteTable("resources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  fileUrl: text("file_url").notNull(),
  category: text("category").notNull().default("Download"),
});

export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const prayerRequests = sqliteTable("prayer_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  request: text("request").notNull(),
  isConfidential: integer("is_confidential", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});
