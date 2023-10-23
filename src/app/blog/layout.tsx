import "../globals.scss";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
