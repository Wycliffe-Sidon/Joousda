import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "What We Believe",
};

const beliefs = [
  "We believe the Bible is God's inspired Word and the final authority for faith and practice.",
  "We believe salvation is by grace through faith in Jesus Christ, who lived, died, rose again, and now ministers for us.",
  "We believe the seventh-day Sabbath remains God's holy day for worship, rest, and delight in the Creator.",
  "We believe the Holy Spirit transforms believers, equips the church for service, and empowers holy living.",
  "We believe the church is called to proclaim the everlasting gospel, make disciples, and serve with compassion.",
  "We believe Christ will return soon in glory, and this blessed hope shapes how we live today.",
];

export default function BeliefsPage() {
  return (
    <>
      <PageHero
        title="What We Believe"
        description="A concise overview of the biblical convictions that shape our worship, discipleship, witness, and hope."
        imageUrl="https://images.unsplash.com/photo-1469571486292-b53601020f36?auto=format&fit=crop&w=1400&q=80"
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {beliefs.map((belief) => (
            <article
              key={belief}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="text-sm leading-8 text-slate-700 dark:text-slate-300">{belief}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
