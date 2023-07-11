import "./dashboard.scss";
// eslint-disable-next-line import/no-extraneous-dependencies
import "react-day-picker/dist/style.css";

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
