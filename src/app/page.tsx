import type { Metadata } from "next";
import { HomeSections } from "@/components/site/home-sections";
import { getHomePageData } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const data = await getHomePageData();
  return <HomeSections data={data} />;
}
