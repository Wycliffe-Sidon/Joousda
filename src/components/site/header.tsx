"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navigation, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const closeMenus = () => {
    setOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  };

  const scrollToHash = (href: string) => {
    const hash = href.split("#")[1];
    if (!hash) return;

    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/#${hash}`);
    }
  };

  const handleNavigation = (href: string) => {
    closeMenus();

    if (href.startsWith("/#")) {
      if (pathname === "/") {
        scrollToHash(href);
        return;
      }

      router.push(href);
      return;
    }

    router.push(href);
  };

  const renderNavLink = (key: string, href: string, label: string, className?: string) => (
    <button key={key} type="button" onClick={() => handleNavigation(href)} className={className}>
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#d6dfed] bg-[rgba(255,253,248,0.96)] shadow-[0_18px_40px_-32px_rgba(12,43,87,0.95)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/92">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenus}>
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#d5c191]/60 bg-white shadow-[0_16px_35px_-24px_rgba(16,63,121,0.7)] sm:h-[4.5rem] sm:w-[4.5rem]">
            <Image
              src="/images/sda-logo.png"
              alt="Seventh-day Adventist Church logo"
              fill
              sizes="72px"
              className="object-contain p-1.5"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#123c74] dark:text-[#f2ddab]">JOOUSDA</span>
            <span className="font-serif text-2xl font-semibold text-slate-900 dark:text-white sm:text-[2rem]">SDA Church</span>
            <span className="max-w-[18rem] text-sm leading-6 text-slate-600 dark:text-slate-300 sm:max-w-none sm:text-base">
              {siteConfig.location}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const hasChildren = Boolean(item.children?.length);

            if (!hasChildren) {
              return renderNavLink(
                item.href,
                item.href,
                item.label,
                cn(
                  "rounded-full px-4 py-3 text-sm font-semibold transition",
                  isActive
                    ? "bg-[#eaf1ff] text-[#123c74]"
                    : "text-slate-800 hover:bg-[#f5f8ff] hover:text-[#123c74] dark:text-slate-100",
                ),
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
                      : "text-slate-800 hover:bg-[#f5f8ff] hover:text-[#123c74] dark:text-slate-100",
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn("h-4 w-4 transition", expanded && "rotate-180")} />
                </button>

                <div
                  className={cn(
                    "absolute left-0 top-full mt-3 w-[18.5rem] rounded-[1.35rem] border border-[#d6dfed] bg-white p-3 shadow-[0_30px_60px_-35px_rgba(12,43,87,0.65)] transition-all dark:border-slate-800 dark:bg-slate-950",
                    expanded ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
                  )}
                >
                  <div className="rounded-[1rem] bg-[#123c74] px-3 py-3 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">{item.description}</p>
                    <p className="mt-1.5 font-serif text-lg font-semibold">{item.label}</p>
                  </div>
                  <div className="mt-2.5 space-y-1.5">
                    {item.children?.map((child) => (
                      <button
                        key={child.href}
                        type="button"
                        onClick={() => handleNavigation(child.href)}
                        className="block w-full rounded-[1rem] border border-slate-200 px-3 py-2.5 text-left transition hover:border-[#cfdcf3] hover:bg-[#f7faff] dark:border-slate-800 dark:hover:bg-slate-900"
                      >
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{child.label}</p>
                        <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-300">{child.description}</p>
                      </button>
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
        <nav className="mx-auto flex max-w-7xl flex-col gap-2 overflow-y-auto px-4 py-4 sm:px-6">
          {navigation.map((item) => {
            if (!item.children?.length) {
              return renderNavLink(
                item.href,
                item.href,
                item.label,
                "rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:bg-[#f4f7ff] hover:text-[#123c74] dark:text-slate-100",
              );
            }

            const expanded = mobileDropdown === item.label;

            return (
              <div key={item.label} className="rounded-[1.25rem] border border-[#dce4f2] bg-white/95 p-2 dark:bg-slate-900/95">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white"
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
                    <div className="mt-2 space-y-1.5">
                      {item.children.map((child) => (
                        <button
                          key={child.href}
                          type="button"
                          onClick={() => handleNavigation(child.href)}
                          className="block w-full rounded-[1rem] border border-slate-200 px-4 py-2.5 text-left dark:border-slate-700 dark:bg-slate-950/70"
                        >
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{child.label}</p>
                          <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-300">{child.description}</p>
                        </button>
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
