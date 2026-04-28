import Link from "next/link";
import { navigation, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
            JOOUSDA Church
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Kisumu Region Campus Ministry</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">{siteConfig.description}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">About Us</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            {navigation.slice(1, 5).map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Our Ministries</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href="/contact" className="transition hover:text-white">
              Adventist Youth Ministry
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Personal Ministries
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Sabbath School
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Music Ministries
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Get In Touch</h4>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>{siteConfig.location}</p>
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.email}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
