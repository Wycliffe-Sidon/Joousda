import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { leadershipGroups } from "@/lib/constants";
import { getAllPageData } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leadership Team",
};

export default async function LeadershipPage() {
  const data = await getAllPageData();

  return (
    <>
      <PageHero
        title="Leadership Team"
        description="Meet the elders, deacons, coordinators, treasurers, chaplaincy, and year representatives serving the church family."
        imageUrl="https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1400&q=80"
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {leadershipGroups.map((group) => {
            const items = data.leadership.filter((member) => member.group === group);
            if (!items.length) return null;

            return (
              <div key={group}>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {group}
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((member) => (
                    <article
                      key={member.id}
                      className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                    >
                      <div className="relative h-64">
                        <Image src={member.imageUrl ?? ""} alt={member.name} fill className="object-cover" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{member.name}</h3>
                        <p className="mt-1 text-sm font-medium text-sky-600">{member.role}</p>
                        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{member.bio}</p>
                        <div className="mt-5 space-y-1 text-sm text-slate-500 dark:text-slate-400">
                          <p>{member.email}</p>
                          <p>{member.phone}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
