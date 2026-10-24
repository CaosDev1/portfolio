import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viet Hoang | Unity Game Developer",
  description: "Portfolio of Viet Hoang, Unity game developer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
