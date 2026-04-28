import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { PrayerRequestForm } from "@/components/forms/prayer-request-form";
import { PageHero } from "@/components/site/page-hero";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get Involved",
};

export default function ContactPage() {
  const mapsUrl =
    process.env.GOOGLE_MAPS_EMBED_URL ??
    "https://www.google.com/maps?q=Jaramogi%20Oginga%20Odinga%20University%20of%20Science%20and%20Technology&output=embed";

  return (
    <>
      <PageHero
        title="Get Involved and Contact Us"
        description="Reach out for ministry opportunities, prayer, chaplaincy care, location details, or general church information."
        imageUrl="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=80"
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="space-y-6">
          <div className="rounded-[1.75rem] bg-slate-950 p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">Visit Us</p>
            <h2 className="mt-3 text-3xl font-semibold">Join Us This Sabbath</h2>
            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              <p>{siteConfig.location}</p>
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.email}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 dark:border-slate-800">
            <iframe
              src={mapsUrl}
              title="JOOUSDA church location map"
              className="h-[340px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">Online Giving</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Tithe and Offering</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Secure M-Pesa giving integration can be connected here later. For now, the section is ready for church finance workflows and publishing official payment instructions.
            </p>
          </div>
        </div>
        <div className="grid gap-8">
          <ContactForm />
          <PrayerRequestForm />
        </div>
      </section>
    </>
  );
}
