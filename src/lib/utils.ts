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
  if (input.includes("youtube.com/embed/")) {
    return input;
  }

  const watchMatch = input.match(/[?&]v=([^&]+)/);
  const shortMatch = input.match(/youtu\.be\/([^?&]+)/);
  const id = watchMatch?.[1] ?? shortMatch?.[1];

  return id ? `https://www.youtube.com/embed/${id}` : input;
}
