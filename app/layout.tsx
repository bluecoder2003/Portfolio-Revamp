import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pixel Stories",
  description: "Neelakshi's Portfolio",
  keywords: "portfolio, designer, developer, UI/UX, frontend",
  authors: [{ name: "Neelakshi Das" }],
  robots: "index, follow",
  openGraph: {
    title: "Pixel Stories",
    description: "Neelakshi's Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neelakshi's Portfolio Preview",
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
