import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crafting Stories",
  description: "Neelakshi Das's Portfolio",
  keywords: "portfolio, designer, developer, UI/UX, frontend",
  authors: [{ name: "Neelakshi Das" }],
  robots: "index, follow",
  openGraph: {
    title: "Crafting Stories",
    description: "Neelakshi Das's Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neelakshi Das Portfolio Preview",
      },
    ],
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
