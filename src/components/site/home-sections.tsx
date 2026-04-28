import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { getHomePageData } from "@/lib/site";
import { formatDisplayDate, parseLines } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

type HomeData = Awaited<ReturnType<typeof getHomePageData>>;

export function HomeSections({ data }: { data: HomeData }) {
  const heroMeta = safeParseJson(data.content.hero?.metadata) as { eyebrow?: string };
  const missionMeta = safeParseJson(data.content.mission?.metadata) as { objectives?: string[] };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <Image
            src={data.content.hero.imageUrl ?? ""}
            alt={data.content.hero.title}
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.42),_transparent_35%),linear-gradient(135deg,rgba(2,6,23,0.95),rgba(12,74,110,0.7))]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
              {heroMeta.eyebrow}
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              {data.content.hero.title}
            </h1>
            <p className="mt-4 text-xl font-medium text-sky-100">
              {data.content.hero.subtitle}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              {data.content.hero.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={data.content.hero.ctaHref ?? "/about"}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-100"
              >
                {data.content.hero.ctaLabel}
              </Link>
              <Link
                href={data.content.hero.secondaryCtaHref ?? "/contact"}
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {data.content.hero.secondaryCtaLabel}
              </Link>
            </div>
          </div>

          <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <div className="rounded-3xl bg-white p-5 text-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
                Join Our Community
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Worship With Us Every Sabbath</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Sabbath School at 8:00 AM, Divine Service at 10:50 AM, and student discipleship throughout the day.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.weeklyEvents.slice(0, 2).map((event) => (
                <div key={event.id} className="rounded-3xl border border-white/15 bg-slate-900/50 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-200">
                    {event.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{formatDisplayDate(event.startDate)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="This Week at JOOUSDA"
          title="Upcoming gatherings, emphasis Sabbaths, and mission moments"
          description="Keep up with what our church family is doing this week on campus and in the surrounding community."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {data.weeklyEvents.map((event) => (
            <article
              key={event.id}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">{event.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{event.title}</h3>
              <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                {formatDisplayDate(event.startDate)}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{event.summary}</p>
              <p className="mt-4 text-sm font-medium text-slate-800 dark:text-slate-200">{event.location}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Worship With Us"
            title="Join us for Sabbath worship"
            description="We gather every Sabbath to worship, learn, pray, and grow together in Christ."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {data.serviceTimes.map((item) => (
              <div
                key={item.id}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-600">{item.day}</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  {item.startTime} - {item.endTime}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionHeading
            eyebrow={data.content.mission.subtitle ?? "Our Mission"}
            title={data.content.mission.title}
            description={data.content.mission.body ?? ""}
          />
          <Link
            href="/about"
            className="mt-8 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Discover Our Story
          </Link>
        </div>
        <div className="rounded-[2rem] bg-sky-950 p-8 text-white">
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">Our Objectives</h3>
          <div className="mt-6 space-y-4">
            {missionMeta.objectives?.map((objective) => (
              <div key={objective} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-sm leading-7 text-slate-200">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get Involved"
            title="Our Departments"
            description="Every member is a minister. Find your place to serve, grow, and make disciples."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data.departments.map((department) => (
              <article
                key={department.id}
                className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="relative h-56">
                  <Image src={department.imageUrl ?? ""} alt={department.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{department.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{department.description}</p>
                  <Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-sky-600">
                    {department.ctaLabel ?? "Explore Ministry"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Worship Through Music"
          title="Glorifying God through choirs and praise teams"
          description="Our music ministry gathers students with different gifts into one voice of worship, mission, and joyful praise."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {data.musicGroups.map((group) => (
            <article key={group.id} className="rounded-[1.75rem] bg-slate-950 p-5 text-white">
              <div className="relative h-52 overflow-hidden rounded-[1.25rem]">
                <Image src={group.imageUrl ?? ""} alt={group.name} fill className="object-cover" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{group.name}</h3>
              <p className="mt-2 text-sm font-medium text-sky-200">{group.memberCount}+ members</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{group.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem]">
            <Image
              src={data.content["chaplain-message"].imageUrl ?? ""}
              alt={data.content["chaplain-message"].title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow={data.content["chaplain-message"].subtitle ?? "Pastoral Care"}
              title={data.content["chaplain-message"].title}
              description={data.content["chaplain-message"].body ?? ""}
              light
            />
            <Link
              href={data.content["chaplain-message"].ctaHref ?? "/leadership"}
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-100"
            >
              {data.content["chaplain-message"].ctaLabel ?? "Meet Our Chaplaincy Team"}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Take the Next Step"
          title="Worship, serve, receive pastoral care, and grow in faith"
          description="Wherever you are in your journey, there is a place for you in this church family."
          align="center"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Visit Us",
              body: "Join our Sabbath experience at JOOUST Main Campus, Bondo, for worship, fellowship, and Bible study.",
              href: "/contact",
              label: "Get Directions",
            },
            {
              title: "Get Involved",
              body: "Join a department, choir, or discipleship team and use your gifts in ministry and service.",
              href: "/contact",
              label: "Explore Ministries",
            },
            {
              title: "Chaplaincy",
              body: "Book time with our chaplaincy team for prayer, counseling, mentorship, and spiritual support.",
              href: "/leadership",
              label: "Learn More",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950"
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.body}</p>
              <Link href={item.href} className="mt-6 inline-flex text-sm font-semibold text-sky-600">
                {item.label}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Recent Messages"
            title="Watch and revisit sermon highlights"
            description="Campus and community-focused preaching centered on Christ, Scripture, and practical discipleship."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {data.sermons.map((sermon) => (
              <article
                key={sermon.id}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{sermon.title}</h3>
                <p className="mt-2 text-sm font-medium text-sky-600">{sermon.preacher}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {formatDisplayDate(sermon.preachedAt)}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{sermon.summary}</p>
                <Link href="/sermons" className="mt-6 inline-flex text-sm font-semibold text-sky-600">
                  Watch Sermons
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function safeParseJson(value?: string | null) {
  try {
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
}

export function RichText({ value }: { value?: string | null }) {
  if (!value) return null;

  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <ReactMarkdown>{value}</ReactMarkdown>
    </div>
  );
}

export function ObjectiveList({ value }: { value?: string | null }) {
  return (
    <div className="grid gap-3">
      {parseLines(value).map((line) => (
        <div key={line} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {line}
        </div>
      ))}
    </div>
  );
}
