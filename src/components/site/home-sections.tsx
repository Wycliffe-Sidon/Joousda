import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import type { getHomePageData } from "@/lib/site";
import { formatDisplayDate, parseLines } from "@/lib/utils";
import { GalleryLightbox } from "./gallery-lightbox";
import { MediaEmbed } from "./media-embed";
import { SectionHeading } from "./section-heading";

type HomeData = Awaited<ReturnType<typeof getHomePageData>>;

const defaultSectionOrder = [
  "hero",
  "gallery",
  "this-week",
  "worship-schedule",
  "live-stream",
  "mission",
  "history",
  "beliefs",
  "leadership",
  "year-on-duty",
  "departments",
  "music-choirs",
  "chaplain-message",
  "next-steps",
  "resources",
  "sermons",
] as const;

export function HomeSections({ data }: { data: HomeData }) {
  const heroMeta = safeParseJson(data.content.hero?.metadata) as { eyebrow?: string };
  const missionMeta = safeParseJson(data.content.mission?.metadata) as { objectives?: string[] };
  const yearOnDutyMeta = safeParseJson(data.content["year-on-duty"]?.metadata) as {
    currentYear?: string;
    theme?: string;
    keyText?: string;
    sopBook?: string;
    guideTitle?: string;
    guideUrl?: string;
  };
  const liveStreamMeta = safeParseJson(data.content["live-stream"]?.metadata) as {
    eventDate?: string;
    status?: string;
    youtubeUrl?: string;
    embedCode?: string;
    streamUrl?: string;
  };
  const settingsByKey = new Map(data.homepageSections.map((item) => [item.key, item]));
  const enabledSectionKeys =
    data.homepageSections.filter((item) => item.enabled).map((item) => item.key) ?? Array.from(defaultSectionOrder);

  const gallerySection = settingsByKey.get("gallery");
  const leadershipSection = settingsByKey.get("leadership");
  const resourcesSection = settingsByKey.get("resources");

  const customSections = new Map(
    data.homepageSections
      .filter((item) => item.isCustom)
      .map((item) => [
        item.key,
        <section key={item.key} id={item.key} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="section-shell overflow-hidden rounded-[2rem] border border-[#dbe4f2] bg-white shadow-[0_28px_70px_-44px_rgba(12,43,87,0.38)] dark:border-slate-800 dark:bg-slate-950">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 sm:p-10">
                <SectionHeading eyebrow={item.subtitle ?? "Church Life"} title={item.title ?? item.key} description={item.body ?? ""} />
                {item.ctaLabel && item.ctaHref ? (
                  <Link
                    href={item.ctaHref}
                    className="mt-8 inline-flex rounded-full bg-[#123c74] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0c2b57]"
                  >
                    {item.ctaLabel}
                  </Link>
                ) : null}
              </div>
              {item.imageUrl ? (
                <div className="relative min-h-[22rem] overflow-hidden lg:min-h-full">
                  <Image src={item.imageUrl} alt={item.title ?? item.key} fill className="object-cover" />
                </div>
              ) : null}
            </div>
          </div>
        </section>,
      ]),
  );

  const coreSections = new Map<string, ReactNode>([
    [
      "hero",
      <section key="hero" id="hero" className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <Image
            src={data.content.hero.imageUrl ?? ""}
            alt={data.content.hero.title}
            fill
            priority
            className="object-cover opacity-40 transition-transform duration-[1600ms] hover:scale-105"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(205,168,90,0.22),_transparent_28%),linear-gradient(135deg,rgba(7,23,47,0.96),rgba(18,60,116,0.78))]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f2ddab]">{heroMeta.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {data.content.hero.title}
            </h1>
            <p className="mt-4 text-xl font-medium text-[#d9e7ff]">{data.content.hero.subtitle}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{data.content.hero.body}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#live-stream"
                className="rounded-full bg-[#123c74] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-22px_rgba(18,60,116,0.85)] transition hover:-translate-y-0.5 hover:bg-[#0c2b57]"
              >
                {liveStreamMeta.status === "Live Now" ? "Watch Live Now" : "Upcoming Live Stream"}
              </Link>
              <Link
                href={data.content.hero.ctaHref ?? "/about"}
                className="rounded-full bg-[#f8f1df] px-6 py-3 text-sm font-semibold text-[#123c74] shadow-[0_16px_40px_-22px_rgba(205,168,90,0.85)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                {data.content.hero.ctaLabel}
              </Link>
              <Link
                href={data.content.hero.secondaryCtaHref ?? "/contact"}
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                {data.content.hero.secondaryCtaLabel}
              </Link>
            </div>
          </div>

          <div className="section-shell grid gap-5 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <div className="rounded-3xl bg-white p-5 text-slate-900 shadow-[0_24px_50px_-35px_rgba(12,43,87,0.55)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#123c74]">Join Our Community</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold">Worship With Us Every Sabbath</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Sabbath School at 8:00 AM, Divine Service at 10:50 AM, and student discipleship throughout the day.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.weeklyEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="rounded-3xl border border-white/15 bg-slate-900/55 p-5 text-white shadow-[0_24px_50px_-35px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1 hover:bg-slate-900/75"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f2ddab]">{event.category}</p>
                  <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{formatDisplayDate(event.startDate)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>,
    ],
    [
      "gallery",
      <section key="gallery" id="gallery" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="section-shell overflow-hidden rounded-[2rem] border border-[#d9e3f2] bg-white p-6 shadow-[0_30px_70px_-45px_rgba(12,43,87,0.55)] sm:p-8 dark:border-slate-800 dark:bg-slate-950">
          <SectionHeading
            eyebrow={gallerySection?.subtitle ?? "Church Gallery"}
            title={gallerySection?.title ?? "Moments in Ministry"}
            description={
              gallerySection?.body ??
              "A quick visual walk through worship, music, ministry, and pastoral care across the JOOUSDA family."
            }
          />
          <GalleryLightbox items={data.galleryImages} />
        </div>
      </section>,
    ],
    [
      "this-week",
      <section key="this-week" id="this-week" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="This Week at JOOUSDA"
          title="Upcoming gatherings, emphasis Sabbaths, and mission moments"
          description="Keep up with what our church family is doing this week on campus and in the surrounding community."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {data.weeklyEvents.map((event) => (
            <article
              key={event.id}
              className="rounded-[1.75rem] border border-[#dde5f1] bg-white p-6 shadow-[0_24px_55px_-38px_rgba(12,43,87,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-38px_rgba(12,43,87,0.55)] dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#123c74] dark:text-[#f2ddab]">{event.category}</p>
              <h3 className="mt-3 font-serif text-xl font-semibold text-slate-900 dark:text-white">{event.title}</h3>
              <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">{formatDisplayDate(event.startDate)}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{event.summary}</p>
              <p className="mt-4 text-sm font-medium text-slate-800 dark:text-slate-200">{event.location}</p>
            </article>
          ))}
        </div>
      </section>,
    ],
    [
      "worship-schedule",
      <section
        key="worship-schedule"
        id="worship-schedule"
        className="bg-[linear-gradient(180deg,rgba(248,241,223,0.3),rgba(255,255,255,0))] py-20 dark:bg-slate-900/40"
      >
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
                className="rounded-[1.5rem] border border-[#dde5f1] bg-white p-5 shadow-[0_20px_40px_-35px_rgba(12,43,87,0.45)] transition duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#123c74] dark:text-[#f2ddab]">{item.day}</p>
                <h3 className="mt-3 font-serif text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  {item.startTime} - {item.endTime}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>,
    ],
    [
      "live-stream",
      <section key="live-stream" id="live-stream" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="section-shell overflow-hidden rounded-[2rem] border border-[#d9e3f2] bg-white shadow-[0_30px_70px_-45px_rgba(12,43,87,0.55)] dark:border-slate-800 dark:bg-slate-950">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#123c74] dark:text-[#f2ddab]">
                {data.content["live-stream"]?.subtitle ?? "Watch Live"}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-900 dark:text-white">
                {data.content["live-stream"]?.title ?? "Join our live worship experience"}
              </h2>
              <div className="mt-5 inline-flex w-fit rounded-full bg-[#eaf1ff] px-4 py-2 text-sm font-semibold text-[#123c74] dark:bg-[#123c74]/20 dark:text-[#f2ddab]">
                {liveStreamMeta.status ?? "Upcoming"} - {liveStreamMeta.eventDate ?? "Sabbath worship"}
              </div>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                {data.content["live-stream"]?.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={data.content["live-stream"]?.ctaHref ?? liveStreamMeta.streamUrl ?? liveStreamMeta.youtubeUrl ?? "#"}
                  className="rounded-full bg-[#123c74] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0c2b57]"
                >
                  {data.content["live-stream"]?.ctaLabel ?? "Watch Live"}
                </Link>
                <Link
                  href="/sermons"
                  className="rounded-full border border-[#123c74]/20 px-6 py-3 text-sm font-semibold text-[#123c74] transition hover:bg-[#f5f8ff] dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                >
                  Watch Past Sermons
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-[#dce4f2] bg-[#0d2344] p-3 shadow-[0_24px_55px_-35px_rgba(12,43,87,0.72)]">
              <MediaEmbed
                source={liveStreamMeta.streamUrl ?? liveStreamMeta.embedCode ?? liveStreamMeta.youtubeUrl}
                title={data.content["live-stream"]?.title ?? "JOOUSDA live stream"}
              />
            </div>
          </div>
        </div>
      </section>,
    ],
    [
      "mission",
      <section key="mission" id="mission" className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionHeading
            eyebrow={data.content.mission.subtitle ?? "Our Mission"}
            title={data.content.mission.title}
            description={data.content.mission.body ?? ""}
          />
          <Link
            href="/about"
            className="mt-8 inline-flex rounded-full bg-[#123c74] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0c2b57]"
          >
            Discover Our Story
          </Link>
        </div>
        <div className="section-shell rounded-[2rem] bg-[#0c2b57] p-8 text-white shadow-[0_30px_70px_-45px_rgba(12,43,87,0.9)]">
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f2ddab]">Our Objectives</h3>
          <div className="mt-6 space-y-4">
            {missionMeta.objectives?.map((objective) => (
              <div key={objective} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-sm leading-7 text-slate-200">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>,
    ],
    [
      "leadership",
      <section key="leadership" id="leadership" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={leadershipSection?.subtitle ?? "Leadership"}
          title={leadershipSection?.title ?? "Meet the team guiding our church family"}
          description={
            leadershipSection?.body ??
            "Pastoral care, campus mentorship, and church direction are shared by a team committed to prayerful leadership."
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {data.leadership.map((leader) => (
            <article
              key={leader.id}
              className="overflow-hidden rounded-[1.75rem] border border-[#dbe4f2] bg-white shadow-[0_24px_60px_-42px_rgba(12,43,87,0.42)] transition duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="relative h-64">
                <Image src={leader.imageUrl ?? ""} alt={leader.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#123c74] dark:text-[#f2ddab]">{leader.group}</p>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-slate-900 dark:text-white">{leader.name}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{leader.role}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{leader.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>,
    ],
    [
      "year-on-duty",
      <section key="year-on-duty" id="year-on-duty" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="section-shell overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0c2b57,#123c74)] p-6 text-white shadow-[0_28px_70px_-40px_rgba(12,43,87,0.9)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f2ddab]">
                {data.content["year-on-duty"]?.subtitle ?? "Year on Duty"}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold">
                {data.content["year-on-duty"]?.title ?? "2026 Year on Duty"}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-100">{data.content["year-on-duty"]?.body}</p>
              <div className="mt-8 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#f2ddab]">
                {yearOnDutyMeta.currentYear ?? "2026 Academic Year"}
              </div>
            </div>
            <div className="grid gap-4">
              {[
                { label: "Theme of the Year", value: yearOnDutyMeta.theme },
                { label: "Key Text", value: yearOnDutyMeta.keyText },
                { label: "SOP Book", value: yearOnDutyMeta.sopBook },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.35rem] border border-white/10 bg-white/8 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2ddab]">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-100">{item.value}</p>
                </div>
              ))}
              <div className="rounded-[1.35rem] border border-white/10 bg-white/8 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2ddab]">
                  {yearOnDutyMeta.guideTitle ?? "This Week's Guide"}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={yearOnDutyMeta.guideUrl ?? data.content["year-on-duty"]?.ctaHref ?? "#"}
                    className="rounded-full bg-[#f8f1df] px-5 py-3 text-sm font-semibold text-[#123c74] transition hover:bg-white"
                  >
                    {data.content["year-on-duty"]?.ctaLabel ?? "Download Weekly Guide"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>,
    ],
    [
      "departments",
      <section
        key="departments"
        id="departments"
        className="bg-[linear-gradient(180deg,rgba(237,244,255,0.8),rgba(255,255,255,0.94))] py-20 dark:bg-slate-900/40"
      >
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
                className="overflow-hidden rounded-[1.75rem] border border-[#dbe4f2] bg-white shadow-[0_24px_60px_-42px_rgba(12,43,87,0.42)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-38px_rgba(12,43,87,0.5)] dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image src={department.imageUrl ?? ""} alt={department.name} fill className="object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-slate-900 dark:text-white">{department.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{department.description}</p>
                  <Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-[#123c74] dark:text-[#f2ddab]">
                    {department.ctaLabel ?? "Explore Ministry"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>,
    ],
    [
      "music-choirs",
      <section key="music-choirs" id="music-choirs" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Worship Through Music"
          title="Glorifying God through choirs and praise teams"
          description="Our music ministry gathers students with different gifts into one voice of worship, mission, and joyful praise."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {data.musicGroups.map((group) => (
            <article
              key={group.id}
              className="rounded-[1.75rem] bg-[#0f274a] p-5 text-white shadow-[0_28px_60px_-42px_rgba(12,43,87,0.82)] transition duration-300 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden rounded-[1.25rem]">
                <Image src={group.imageUrl ?? ""} alt={group.name} fill className="object-cover transition duration-500 hover:scale-105" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold">{group.name}</h3>
              <p className="mt-2 text-sm font-medium text-[#f2ddab]">{group.memberCount}+ members</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{group.description}</p>
            </article>
          ))}
        </div>
      </section>,
    ],
    [
      "chaplain-message",
      <section key="chaplain-message" id="chaplain-message" className="bg-[#0b2343] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem]">
            <Image src={data.content["chaplain-message"].imageUrl ?? ""} alt={data.content["chaplain-message"].title} fill className="object-cover" />
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
              className="mt-8 inline-flex rounded-full bg-[#f8f1df] px-6 py-3 text-sm font-semibold text-[#123c74] transition hover:-translate-y-0.5 hover:bg-white"
            >
              {data.content["chaplain-message"].ctaLabel ?? "Meet Our Chaplaincy Team"}
            </Link>
          </div>
        </div>
      </section>,
    ],
    [
      "next-steps",
      <section key="next-steps" id="next-steps" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
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
              title: "Prayer & Support",
              body: "Connect with our chaplaincy and leadership team for prayer, counseling, mentorship, and spiritual support.",
              href: "/leadership",
              label: "Request Care",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-[#dde5f1] bg-white p-8 shadow-[0_24px_60px_-42px_rgba(12,43,87,0.35)] transition duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950"
            >
              <h3 className="font-serif text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.body}</p>
              <Link href={item.href} className="mt-6 inline-flex text-sm font-semibold text-[#123c74] dark:text-[#f2ddab]">
                {item.label}
              </Link>
            </article>
          ))}
        </div>
      </section>,
    ],
    [
      "resources",
      <section key="resources" id="resources" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={resourcesSection?.subtitle ?? "Resources"}
          title={resourcesSection?.title ?? "Faith-building tools for study and worship"}
          description={
            resourcesSection?.body ??
            "Shareable downloads, study tools, and ministry-ready materials for students, leaders, and families."
          }
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {data.resources.map((resource) => (
            <article
              key={resource.id}
              className="rounded-[1.75rem] border border-[#dde5f1] bg-white p-6 shadow-[0_24px_55px_-40px_rgba(12,43,87,0.35)] transition duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#123c74] dark:text-[#f2ddab]">{resource.category}</p>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-slate-900 dark:text-white">{resource.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{resource.description}</p>
              <Link href={resource.fileUrl} className="mt-6 inline-flex text-sm font-semibold text-[#123c74] dark:text-[#f2ddab]">
                Open Resource
              </Link>
            </article>
          ))}
        </div>
      </section>,
    ],
    [
      "sermons",
      <section
        key="sermons"
        id="sermons"
        className="bg-[linear-gradient(180deg,rgba(248,241,223,0.38),rgba(255,255,255,0.96))] py-20 dark:bg-slate-900/40"
      >
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
                className="rounded-[1.75rem] border border-[#dde5f1] bg-white p-6 shadow-[0_24px_55px_-40px_rgba(12,43,87,0.35)] transition duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950"
              >
                <h3 className="font-serif text-xl font-semibold text-slate-900 dark:text-white">{sermon.title}</h3>
                <p className="mt-2 text-sm font-medium text-[#123c74] dark:text-[#f2ddab]">{sermon.preacher}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{formatDisplayDate(sermon.preachedAt)}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{sermon.summary}</p>
                <Link href="/sermons" className="mt-6 inline-flex text-sm font-semibold text-[#123c74] dark:text-[#f2ddab]">
                  Watch Sermons
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>,
    ],
  ]);

  return (
    <>
      {enabledSectionKeys.map((key) => {
        const section = coreSections.get(key) ?? customSections.get(key);
        return section ?? null;
      })}
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
