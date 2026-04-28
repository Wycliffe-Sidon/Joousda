import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { getAllPageData } from "@/lib/site";
import { formatDisplayDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const data = await getAllPageData();

  return (
    <>
      <PageHero
        title="Events and Programs"
        description="Stay connected with revival weeks, outreach missions, choir events, leadership gatherings, and student fellowship opportunities."
        imageUrl="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80"
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          {data.events.map((event) => (
            <article
              key={event.id}
              className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 lg:grid-cols-[0.85fr_1.15fr]"
            >
              <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem]">
                <Image src={event.imageUrl ?? ""} alt={event.title} fill className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">{event.category}</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{event.title}</h2>
                <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {formatDisplayDate(event.startDate)}
                  {event.endDate ? ` - ${formatDisplayDate(event.endDate)}` : ""}
                </p>
                <p className="mt-4 text-sm font-medium text-slate-800 dark:text-slate-200">{event.location}</p>
                <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">{event.body ?? event.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
