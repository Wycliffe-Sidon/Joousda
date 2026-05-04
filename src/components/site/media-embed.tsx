"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, LoaderCircle, PlayCircle } from "lucide-react";
import { cn, extractMediaSource, getMediaEmbedUrl, isVideoFileUrl, isYouTubeUrl } from "@/lib/utils";

type MediaEmbedProps = {
  source?: string | null;
  title: string;
  className?: string;
};

export function MediaEmbed({ source, title, className }: MediaEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const normalizedSource = useMemo(() => extractMediaSource(source), [source]);
  const embedUrl = useMemo(() => getMediaEmbedUrl(normalizedSource), [normalizedSource]);
  const videoFile = isVideoFileUrl(normalizedSource);
  const youtube = isYouTubeUrl(normalizedSource);
  const playable = Boolean(embedUrl);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [embedUrl]);

  if (!playable) {
    return <MediaFallback title={title} message="No video has been added yet. Update this stream from the admin dashboard." />;
  }

  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-[1.25rem] bg-slate-950", className)}>
      {isLoading ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/75 text-white">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            <span>Loading video...</span>
          </div>
        </div>
      ) : null}

      {hasError ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/92 p-6">
          <MediaFallback
            title={title}
            message="We could not load this media in your browser. Use the direct link below to open it safely."
            href={embedUrl}
            compact
          />
        </div>
      ) : null}

      {videoFile ? (
        <video
          key={embedUrl}
          className="h-full w-full"
          controls
          preload="metadata"
          playsInline
          onLoadedData={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        >
          <source src={embedUrl} type={guessMimeType(embedUrl)} />
          Your browser does not support embedded video playback.
        </video>
      ) : youtube ? (
        <iframe
          key={embedUrl}
          src={embedUrl}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-[linear-gradient(135deg,#0b2241,#123c74)] px-6 text-center text-white">
          <PlayCircle className="h-12 w-12 text-[#f2ddab]" />
          <div>
            <p className="text-lg font-semibold">{title}</p>
            <p className="mt-2 text-sm text-slate-200">Open the media in a new tab for the best playback experience.</p>
          </div>
          <Link
            href={embedUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              setIsLoading(false);
              setHasError(false);
            }}
            className="rounded-full bg-[#f8f1df] px-5 py-3 text-sm font-semibold text-[#123c74] transition hover:bg-white"
          >
            Open Media
          </Link>
        </div>
      )}
    </div>
  );
}

function MediaFallback({
  title,
  message,
  href,
  compact = false,
}: {
  title: string;
  message: string;
  href?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("text-center text-white", compact ? "max-w-sm" : "max-w-md")}>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#f2ddab]">
        <AlertCircle className="h-5 w-5" />
      </div>
      <p className="mt-4 text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-200">{message}</p>
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-full bg-[#f8f1df] px-5 py-3 text-sm font-semibold text-[#123c74] transition hover:bg-white"
        >
          Open Direct Link
        </Link>
      ) : null}
    </div>
  );
}

function guessMimeType(source: string) {
  if (source.includes(".webm")) return "video/webm";
  if (source.includes(".ogg")) return "video/ogg";
  return "video/mp4";
}
