import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://www.xcursions.ng";
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://backend.xcursions.ng/api/v1";

  const tripResponse = await fetch(
    `${baseUrl}/outing/outings?type=tour&limit=100`,
    { cache: "no-cache" }
  );
  const tripValues = await tripResponse.json();
  const eventResponse = await fetch(
    `${baseUrl}/outing/outings?type=event&limit=100`,
    { cache: "no-cache" }
  );
  const eventValues = await eventResponse.json();
  const blogResponse = await fetch(`${baseUrl}/blog/posts?limit=100`, {
    cache: "no-cache",
  });
  const blogValues = await blogResponse.json();
  const continentResponse = await fetch(
    `${baseUrl}/outing/outings/continents`,
    { cache: "no-cache" }
  );
  const continentValues = await continentResponse.json();
  return [
    {
      url: `${url}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${url}/about-us`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.6,
    },
    {
      url: `${url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${url}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${url}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.6,
    },
    {
      url: `${url}/terms`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.6,
    },
    {
      url: `${url}/trips`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...tripValues.result.map((data: any) => ({
      url: `${url}/trips/${data.outingDestination.continent.toLowerCase()}/${
        data?.slug
      }`,
      lastModified:
        new Date(data?.updatedAt).toISOString() || new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    })),
    ...eventValues.result.map((data: any) => ({
      url: `${url}/events/${data?.slug}`,
      lastModified:
        new Date(data?.updatedAt).toISOString() || new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    })),
    ...blogValues.result.map((data: any) => ({
      url: `${url}/blog/${data?.slug}`,
      lastModified:
        new Date(data?.updatedAt).toISOString() || new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    })),
    ...continentValues.map((val: any) => ({
      url: `${url}/trips/${encodeURIComponent(val.continent.toLowerCase())}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    })),
  ];
}
