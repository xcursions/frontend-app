import "./dashboard.scss";

export const metadata = {
  title: "User dashboard",
  description: "Xcursions user dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
