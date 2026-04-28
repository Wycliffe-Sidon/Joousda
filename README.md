# JOOUSDA SDA Church Website

Production-ready Next.js 15 website for Jaramogi Oginga Odinga University of Science and Technology Seventh-day Adventist Church.

## Stack

- Next.js 15 App Router + TypeScript
- Tailwind CSS
- SQLite + Drizzle ORM
- NextAuth credentials authentication
- Server Actions + API Routes
- Local file uploads for images and PDFs

## Features

- Homepage that mirrors the reference information architecture with a fresh campus-church design
- Public pages for About, Leadership, Sermons, Resources, Events, Contact, and Beliefs
- Protected admin dashboard at `/admin`
- CRUD for hero content, weekly items, departments, music groups, leadership, sermons, resources, and service times
- Prayer request and contact submissions saved to SQLite
- Sermon archive search and filtering
- YouTube embeds, Google Maps embed, SEO metadata, sitemap, and robots
- Dark mode support

## Project Structure

```text
src/
  app/
    about/
    admin/
    api/
    beliefs/
    contact/
    events/
    leadership/
    resources/
    sermons/
  components/
    admin/
    forms/
    site/
    ui/
  db/
  lib/
  providers/
  types/
public/
  uploads/
```

## Environment Variables

Copy `.env.example` to `.env.local`.

```env
AUTH_SECRET=replace-with-a-long-random-secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=./data/joousda.db
ADMIN_EMAIL=admin@joousda.org
ADMIN_PASSWORD=ChangeMe123!
GOOGLE_MAPS_EMBED_URL=https://www.google.com/maps?q=Jaramogi%20Oginga%20Odinga%20University%20of%20Science%20and%20Technology&output=embed
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Initialize and seed the database:

```bash
npm run db:init
```

3. Start the dev server:

```bash
npm run dev
```

4. Sign in to `/admin/login` using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## Admin Capabilities

- Update homepage hero, mission, chaplain message, and service times
- Create and edit events and featured weekly highlights
- Manage departments, choirs/music groups, leadership roles, sermons, and downloadable resources
- Review contact submissions and prayer requests

## Uploads

- Images and PDFs upload into `public/uploads`
- This is ideal for a VPS or Railway-style persistent disk
- For Vercel production, swap the upload route for Uploadthing, S3, or another object store

## Deployment

### Vercel

1. Push the repo to GitHub.
2. Create a Vercel project.
3. Set environment variables from `.env.example`.
4. Replace local SQLite/file uploads with a persistent provider if using serverless hosting.

### Railway / VPS

1. Provision Node.js 20+.
2. Set the environment variables.
3. Run `npm install`.
4. Run `npm run db:init`.
5. Run `npm run build && npm run start`.

## Notes

- The seed script creates starter content, placeholder leadership, ministries, sermons, and the first admin user.
- The visual structure intentionally follows the KUSDA site order while using distinct typography, spacing, and art direction.
