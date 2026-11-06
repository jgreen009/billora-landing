import type { MetadataRoute } from "next";
import { resolveSiteOrigin, isPreviewDeployment } from "@/lib/site-origin";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = resolveSiteOrigin();
  return origin && !isPreviewDeployment()
    ? [{ url: origin, changeFrequency: "monthly", priority: 1 }]
    : [];
}
