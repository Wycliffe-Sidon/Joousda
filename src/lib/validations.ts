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
