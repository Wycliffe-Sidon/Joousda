import Image from "next/image";

type PageHeroProps = {
  title: string;
  description: string;
  imageUrl: string;
};

export function PageHero({ title, description, imageUrl }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-950 dark:border-slate-800">
      <div className="absolute inset-0">
        <Image src={imageUrl} alt={title} fill className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950/90 via-slate-950/85 to-sky-700/50" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
            JOOUSDA SDA Church
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-200">{description}</p>
        </div>
      </div>
    </section>
  );
}
