import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "What We Believe",
};

const beliefs = [
  "The Holy Scriptures",
  "The Trinity",
  "The Father",
  "The Son",
  "The Holy Spirit",
  "Creation",
  "The Nature of Humanity",
  "The Great Controversy",
  "The Life, Death, and Resurrection of Christ",
  "The Experience of Salvation",
  "Growing in Christ",
  "The Church",
  "The Remnant and Its Mission",
  "Unity in the Body of Christ",
  "Baptism",
  "The Lord's Supper",
  "Spiritual Gifts and Ministries",
  "The Gift of Prophecy",
  "The Law of God",
  "The Sabbath",
  "Stewardship",
  "Christian Behavior",
  "Marriage and the Family",
  "Christ's Ministry in the Heavenly Sanctuary",
  "The Second Coming of Christ",
  "Death and Resurrection",
  "The Millennium and the End of Sin",
  "The New Earth",
];

export default function BeliefsPage() {
  return (
    <>
      <PageHero
        title="28 Fundamental Beliefs"
        description="A fuller overview of the Bible-based teachings cherished by the Seventh-day Adventist Church worldwide."
        imageUrl="https://images.unsplash.com/photo-1469571486292-b53601020f36?auto=format&fit=crop&w=1400&q=80"
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            These 28 Fundamental Beliefs summarize the faith and mission of the Seventh-day Adventist Church. Each one
            is centered on Jesus Christ, rooted in Scripture, and lived out through worship, discipleship, service, and
            hope in His soon return.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {beliefs.map((belief, index) => (
            <article
              key={belief}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_-42px_rgba(12,43,87,0.25)] dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#123c74] dark:text-[#f2ddab]">
                Fundamental Belief {index + 1}
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-slate-900 dark:text-white">{belief}</h2>
              <p className="mt-4 text-sm leading-8 text-slate-700 dark:text-slate-300">
                Explore this teaching in Scripture and discover how it shapes Adventist worship, Christian witness,
                personal holiness, and the blessed hope we hold in Christ.
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
