import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { RichText } from "@/components/site/home-sections";
import { getAllPageData } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
};

export default async function AboutPage() {
  const data = await getAllPageData();
  const mission = data.content.mission;

  return (
    <>
      <PageHero
        title="About JOOUSDA Church"
        description="A worshipping campus church family shaped by Scripture, Sabbath, evangelism, and compassionate service."
        imageUrl={mission.imageUrl ?? ""}
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">Mission</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {mission.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{mission.body}</p>
          <div className="mt-10 rounded-[1.75rem] bg-slate-50 p-8 dark:bg-slate-900">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Our Story</h3>
            <RichText
              value={`JOOUSDA exists to serve students, staff, alumni, and friends of Jaramogi Oginga Odinga University of Science and Technology with Christ-centered worship and discipleship.

We are passionate about raising spiritually grounded students who can shine for Jesus in lecture halls, hostels, homes, and future workplaces.

As a university church, we blend biblical conviction with pastoral care, practical ministry training, and missional outreach across campus and neighboring communities.`}
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem]">
            <Image src={mission.imageUrl ?? ""} alt="JOOUSDA mission" fill className="object-cover" />
          </div>
          <div className="rounded-[2rem] bg-sky-950 p-8 text-white">
            <h3 className="text-2xl font-semibold">Vision</h3>
            <p className="mt-4 text-base leading-8 text-slate-200">
              To be a transformative, dynamic, disciple-making church raising Christ-centered servant leaders for campus, church, and community mission.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
