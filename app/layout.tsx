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
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//neelakshi.s3.us-east-1.amazonaws.com" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts with font-display: swap for better performance */}
        <link
          rel="preload"
          href="/fonts/NeueMontreal-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/NeueMontreal-Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/InstrumentSerif-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        
        {/* Preload critical above-the-fold assets only */}
        <link
          rel="preload"
          href="/animations/blue-dot.riv"
          as="fetch"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        
        {/* Preload only the first visible project image */}
        <link rel="preload" href="/hiyn.webp" as="image" fetchPriority="high" />
        
        {/* Prefetch other project images with lower priority */}
        <link rel="prefetch" href="/flint.webp" as="image" />
        <link rel="prefetch" href="/safeve.webp" as="image" />
        <link rel="prefetch" href="/paperplane.lottie" as="fetch" />
        
        {/* Prefetch video assets with low priority */}
        <link rel="prefetch" href="/credit-card.webm" as="video" />
        <link rel="prefetch" href="/funny.webm" as="video" />
        <link rel="prefetch" href="/aot.webm" as="video" />
        <link rel="prefetch" href="/potter.webm" as="video" />
        
        {/* Resource hints for better caching */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
