import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      priority: 0.3,
    },
  ];
}
