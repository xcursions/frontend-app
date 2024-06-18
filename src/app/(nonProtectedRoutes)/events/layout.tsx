import "../../globals.scss";

export const metadata = {
  title: "Top Events happening around the world",
  description:
    "View and book top events, shows and festivals around the world. with Xcursions",
  openGraph: {
    title: "Top Events happening around the world",
    description:
      "View and book top events, shows and festivals around the world. with Xcursions",
    url: "https://xcursions.com.ng/events", // pending mark as canonical
    images: [
      {
        url: "/assets/images/event/events.png",
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
