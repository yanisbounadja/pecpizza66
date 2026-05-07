import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

export default function robots(): MetadataRoute.Robots {
  const host = new URL(siteUrl).host;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host,
  };
}
