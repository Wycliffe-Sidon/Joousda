import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { getAllPageData } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
};

export default async function ResourcesPage() {
  const data = await getAllPageData();

  return (
    <>
      <PageHero
        title="Resources and Downloads"
        description="Tools and materials to help students grow in faith, prepare for worship, and study Scripture with confidence."
        imageUrl="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80"
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.resources.map((resource) => (
            <article
              key={resource.id}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">{resource.category}</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{resource.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{resource.description}</p>
              <Link
                href={resource.fileUrl}
                target="_blank"
                className="mt-6 inline-flex rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white"
              >
                Download
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
