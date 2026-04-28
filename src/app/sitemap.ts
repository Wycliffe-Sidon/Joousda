import type { MetadataRoute } from "next";
import { navigation, siteConfig } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map((item) => ({
    url: `${siteConfig.url}${item.href}`,
    changeFrequency: "weekly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
