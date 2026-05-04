"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navigation, siteConfig } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const closeMenus = () => {
    setOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#d6dfed] bg-[rgba(255,253,248,0.94)] shadow-[0_18px_40px_-32px_rgba(12,43,87,0.95)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/88">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenus}>
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#d5c191]/60 bg-white shadow-sm">
            <Image
              src="https://adventist.org/wp-content/uploads/2023/10/GC-Logo.png"
              alt="Seventh-day Adventist Church logo"
              fill
              sizes="48px"
              className="object-contain p-1.5"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#123c74]">
              JOOUSDA
            </span>
            <span className="font-serif text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
              SDA Church
            </span>
            <span className="hidden text-xs text-slate-500 lg:block">{siteConfig.location}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const hasChildren = Boolean(item.children?.length);

            if (!hasChildren) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-3 text-sm font-semibold transition",
                    isActive
                      ? "bg-[#eaf1ff] text-[#123c74]"
                      : "text-slate-700 hover:bg-[#f5f8ff] hover:text-[#123c74] dark:text-slate-200",
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            const expanded = activeDropdown === item.label;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-4 py-3 text-sm font-semibold transition",
                    expanded
                      ? "bg-[#eaf1ff] text-[#123c74]"
                      : "text-slate-700 hover:bg-[#f5f8ff] hover:text-[#123c74] dark:text-slate-200",
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn("h-4 w-4 transition", expanded && "rotate-180")} />
                </button>

                <div
                  className={cn(
                    "absolute left-0 top-full mt-3 w-[22rem] rounded-[1.6rem] border border-[#d6dfed] bg-white p-4 shadow-[0_30px_60px_-35px_rgba(12,43,87,0.65)] transition-all dark:border-slate-800 dark:bg-slate-950",
                    expanded ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
                  )}
                >
                  <div className="rounded-2xl bg-[#123c74] px-4 py-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">
                      {item.description}
                    </p>
                    <p className="mt-2 font-serif text-xl font-semibold">{item.label}</p>
                  </div>
                  <div className="mt-3 space-y-2">
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-2xl border border-slate-200 px-4 py-3 transition hover:border-[#cfdcf3] hover:bg-[#f7faff] dark:border-slate-800 dark:hover:bg-slate-900"
                      >
                        <p className="text-base font-semibold text-slate-900 dark:text-white">{child.label}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{child.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d6dfed] bg-white text-[#123c74] shadow-sm dark:border-slate-700 dark:text-slate-200"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-[#d6dfed] bg-[rgba(255,253,248,0.98)] transition-all dark:border-slate-800 dark:bg-slate-950 lg:hidden",
          open ? "max-h-[85vh]" : "max-h-0",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
          {navigation.map((item) => {
            if (!item.children?.length) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#f4f7ff] hover:text-[#123c74] dark:text-slate-200"
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
              );
            }

            const expanded = mobileDropdown === item.label;

            return (
              <div key={item.label} className="rounded-[1.5rem] border border-[#dce4f2] bg-white/90 p-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-800"
                  onClick={() => setMobileDropdown((current) => (current === item.label ? null : item.label))}
                >
                  <span>{item.label}</span>
                  <ChevronDown className={cn("h-4 w-4 transition", expanded && "rotate-180")} />
                </button>
                <div className={cn("grid overflow-hidden transition-all", expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <div className="rounded-2xl bg-[#123c74] px-4 py-3 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-80">{item.description}</p>
                    </div>
                    <div className="mt-2 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-2xl border border-slate-200 px-4 py-3"
                          onClick={closeMenus}
                        >
                          <p className="text-sm font-semibold text-slate-900">{child.label}</p>
                          <p className="mt-1 text-xs text-slate-500">{child.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
