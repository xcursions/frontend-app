import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://www.xcursions.ng";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/*", "/user/*"],
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
