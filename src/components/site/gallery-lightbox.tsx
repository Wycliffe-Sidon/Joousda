"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

type GalleryItem = {
  id: number;
  title: string;
  caption?: string | null;
  imageUrl: string;
  targetId?: string | null;
};

export function GalleryLightbox({ items }: { items: GalleryItem[] }) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const activeItem = useMemo(() => items.find((item) => item.id === activeId) ?? null, [activeId, items]);

  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className="group relative overflow-hidden rounded-[1.5rem] bg-slate-950 text-left"
          >
            <div className="relative h-56">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,23,47,0.9)] via-[rgba(18,60,116,0.18)] to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2ddab]">
                {item.targetId ? `Jump to ${item.targetId.replace(/-/g, " ")}` : "Gallery highlight"}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight">{item.title}</h3>
              {item.caption ? <p className="mt-2 text-sm text-white/80">{item.caption}</p> : null}
            </div>
          </button>
        ))}
      </div>

      {activeItem ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/88 px-4 py-8 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl dark:bg-slate-950">
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm"
              aria-label="Close gallery image"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[20rem] bg-slate-950">
                <Image src={activeItem.imageUrl} alt={activeItem.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#123c74]">Church Gallery</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold text-slate-900 dark:text-white">{activeItem.title}</h3>
                {activeItem.caption ? (
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{activeItem.caption}</p>
                ) : null}
                {activeItem.targetId ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(null);
                      const element = document.getElementById(activeItem.targetId ?? "");
                      element?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="mt-8 inline-flex w-fit rounded-full bg-[#123c74] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0c2b57]"
                  >
                    Go to section
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
