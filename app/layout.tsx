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
      <head>
        {/* Preconnect to external origins for better performance */}
        <link
          rel="preconnect"
          href="https://neelakshi.s3.us-east-1.amazonaws.com"
        />
        <link rel="preconnect" href="https://unpkg.com" />
        <link
          rel="dns-prefetch"
          href="https://neelakshi.s3.us-east-1.amazonaws.com"
        />
        <link rel="dns-prefetch" href="https://unpkg.com" />

        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload critical fonts to improve LCP */}
        <link
          rel="preload"
          href="/fonts/NeueMontreal-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/InstrumentSerif-Italic.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* Preload critical above-the-fold images */}
        <link
          rel="preload"
          href="https://neelakshi.s3.us-east-1.amazonaws.com/portfolio/luce-dark.png"
          as="image"
        />

        {/* Critical CSS for LCP optimization */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical font face for immediate rendering */
            @font-face {
              font-family: 'Instrument Serif';
              src: url('/fonts/InstrumentSerif-Italic.ttf') format('truetype');
              font-weight: 400;
              font-style: italic;
              font-display: optional;
            }
            /* Critical styles for LCP element */
            .lcp-text {
              font-family: 'Instrument Serif', serif;
              font-size: 48px;
              font-weight: 400;
              color: #093FB4;
              line-height: 1;
              visibility: visible !important;
              opacity: 1 !important;
            }
            @media (min-width: 768px) {
              .lcp-text { font-size: 56px; }
            }
          `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
