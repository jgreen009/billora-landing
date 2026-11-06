import type { MetadataRoute } from "next";
import { isPreviewDeployment, resolveSiteOrigin } from "@/lib/site-origin";
export default function robots(): MetadataRoute.Robots {
  const origin = resolveSiteOrigin();
  return {
    rules: {
      userAgent: "*",
      ...(isPreviewDeployment() ? { disallow: "/" } : { allow: "/" }),
    },
    ...(origin ? { sitemap: `${origin}/sitemap.xml` } : {}),
  };
}
