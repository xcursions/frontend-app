import "../../globals.scss";

export const metadata = {
  title: "Blog | Xcursions Travel Chronicles",
  description:
    "Embark on epic journeys through our blog and fuel your wanderlust. Xcursions blog top 10 vacation destinations",
  keywords: [
    "Excursions",
    "Travel",
    "Blog",
    "trip",
    "road trip",
    "Tourists",
    "Amazing locations",
    "Vacation",
  ],
  type: "article",
  openGraph: {
    title: "Blog | Xcursions Travel Chronicles",
    description:
      "Embark on epic journeys through our blog and fuel your wanderlust. Xcursions blog top 10 vacation destinations",
    url: "https://xcursions.com.ng/blog", // pending mark as canonical
    images: [
      {
        url: "/assets/images/blog/blog_header.png",
        width: 800,
        height: 600,
      },
    ],
    siteName: "Xcursions",
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
