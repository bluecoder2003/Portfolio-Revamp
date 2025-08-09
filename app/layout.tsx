import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Neelakshi Das",
  description: "Neelakshi Das's Portfolio",
  keywords: "portfolio, designer, developer, UI/UX, frontend",
  authors: [{ name: "Neelakshi Das" }],
  robots: "index, follow",
  openGraph: {
    title: "Portfolio | Neelakshi Das",
    description: "Neelakshi Das's Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
