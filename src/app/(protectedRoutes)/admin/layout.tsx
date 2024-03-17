import "./admin.scss";

export const metadata = {
  title: "Admin dashboard",
  description: "Xcursions Admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
