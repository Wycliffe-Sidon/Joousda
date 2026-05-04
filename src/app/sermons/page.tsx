import type { Metadata } from "next";
import { MediaEmbed } from "@/components/site/media-embed";
import { PageHero } from "@/components/site/page-hero";
import { getSermons } from "@/lib/site";
import { formatDisplayDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sermons",
};

export default async function SermonsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const items = await getSermons(params.q);

  return (
    <>
      <PageHero
        title="Sermons and Media"
        description="Search and revisit gospel messages, live worship recordings, and Bible-centered preaching from our campus church."
        imageUrl="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1400&q=80"
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <form className="rounded-[1.75rem] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
          <label htmlFor="q" className="block text-sm font-semibold text-slate-900 dark:text-white">
            Search by title, preacher, or tag
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="q"
              name="q"
              defaultValue={params.q ?? ""}
              className="h-12 flex-1 rounded-full border border-slate-200 bg-white px-5 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              placeholder="Faith, Pastor David, Mission..."
            />
            <button className="rounded-full bg-sky-600 px-6 text-sm font-semibold text-white">Search</button>
          </div>
        </form>

        <div className="mt-10 grid gap-8">
          {items.map((sermon) => (
            <article
              key={sermon.id}
              className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">Sermon Archive</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{sermon.title}</h2>
                <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {sermon.preacher} - {formatDisplayDate(sermon.preachedAt)}
                </p>
                <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">{sermon.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {sermon.tags?.split(",").map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950/50 dark:text-sky-200"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <MediaEmbed source={sermon.videoUrl} title={sermon.title} className="rounded-[1.5rem]" />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
