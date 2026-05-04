import { z } from "zod";

export const contentSchema = z.object({
  key: z.string().min(1),
  title: z.string().min(2),
  subtitle: z.string().optional(),
  body: z.string().optional(),
  imageUrl: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  secondaryCtaLabel: z.string().optional(),
  secondaryCtaHref: z.string().optional(),
  metadata: z.string().optional(),
});

export const homepageSectionSchema = z.object({
  id: z.coerce.number().optional(),
  key: z.string().min(2),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  body: z.string().optional(),
  imageUrl: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  displayOrder: z.coerce.number().default(0),
  enabled: z.coerce.boolean().default(true),
  isCustom: z.coerce.boolean().default(false),
});

export const galleryImageSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(2),
  caption: z.string().optional(),
  imageUrl: z.string().min(4),
  targetId: z.string().optional(),
  displayOrder: z.coerce.number().default(0),
});

export const serviceTimeSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(2),
  day: z.string().min(2),
  startTime: z.string().min(2),
  endTime: z.string().min(2),
  description: z.string().optional(),
  displayOrder: z.coerce.number().default(0),
});

export const eventSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(3),
  slug: z.string().min(3),
  summary: z.string().min(12),
  body: z.string().optional(),
  imageUrl: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().min(3),
  endDate: z.string().optional(),
  category: z.string().min(2),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
});

export const departmentSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(2),
  description: z.string().min(12),
  imageUrl: z.string().optional(),
  ctaLabel: z.string().optional(),
});

export const musicGroupSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(2),
  description: z.string().min(12),
  imageUrl: z.string().optional(),
  memberCount: z.coerce.number().min(0),
});

export const leadershipSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(2),
  role: z.string().min(2),
  group: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  displayOrder: z.coerce.number().default(0),
});

export const sermonSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(3),
  preacher: z.string().min(2),
  preachedAt: z.string().min(3),
  summary: z.string().optional(),
  videoUrl: z.string().min(6),
  thumbnailUrl: z.string().optional(),
  tags: z.string().optional(),
  featured: z.coerce.boolean().default(false),
});

export const resourceSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(2),
  description: z.string().min(10),
  fileUrl: z.string().min(4),
  category: z.string().min(2),
});

export const yearOnDutySchema = z.object({
  title: z.string().min(2),
  subtitle: z.string().min(2),
  body: z.string().min(10),
  currentYear: z.string().min(2),
  theme: z.string().min(2),
  keyText: z.string().min(8),
  sopBook: z.string().min(2),
  guideTitle: z.string().min(2),
  guideUrl: z.string().min(4),
  ctaLabel: z.string().min(2),
  ctaHref: z.string().min(4),
});

export const liveStreamSchema = z.object({
  title: z.string().min(2),
  subtitle: z.string().min(2),
  body: z.string().min(10),
  eventDate: z.string().min(2),
  status: z.enum(["Live Now", "Upcoming"]),
  youtubeUrl: z.string().min(6),
  embedCode: z.string().min(6),
  ctaLabel: z.string().min(2),
  ctaHref: z.string().min(4),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export const prayerSchema = z.object({
  name: z.string().min(2),
  email: z.string().optional(),
  phone: z.string().optional(),
  request: z.string().min(10),
  isConfidential: z.coerce.boolean().default(false),
});
