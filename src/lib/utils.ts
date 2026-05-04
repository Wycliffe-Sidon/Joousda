import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDisplayDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  return format(date, "dd MMM yyyy");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseLines(value?: string | null) {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function getYouTubeEmbedUrl(input: string) {
  if (!input) {
    return "";
  }

  if (input.includes("youtube.com/embed/")) {
    return input;
  }

  const watchMatch = input.match(/[?&]v=([^&]+)/);
  const shortMatch = input.match(/youtu\.be\/([^?&]+)/);
  const shortsMatch = input.match(/youtube\.com\/shorts\/([^?&/]+)/);
  const liveMatch = input.match(/youtube\.com\/live\/([^?&/]+)/);
  const id = watchMatch?.[1] ?? shortMatch?.[1] ?? shortsMatch?.[1] ?? liveMatch?.[1];

  return id ? `https://www.youtube.com/embed/${id}` : input;
}

export function extractMediaSource(input?: string | null) {
  const value = input?.trim() ?? "";

  if (!value) {
    return "";
  }

  const iframeSource = value.match(/src=["']([^"']+)["']/i)?.[1];
  return iframeSource?.trim() ?? value;
}

export function isYouTubeUrl(input?: string | null) {
  const value = extractMediaSource(input);
  return /youtube\.com|youtu\.be/i.test(value);
}

export function isVideoFileUrl(input?: string | null) {
  const value = extractMediaSource(input);
  return /(\.mp4|\.webm|\.ogg)(\?.*)?$/i.test(value) || value.startsWith("data:video/");
}

export function getMediaEmbedUrl(input?: string | null) {
  const value = extractMediaSource(input);

  if (!value) {
    return "";
  }

  if (isYouTubeUrl(value)) {
    return getYouTubeEmbedUrl(value);
  }

  return value;
}
