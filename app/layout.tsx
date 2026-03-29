import type { Metadata } from "next";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Neelakshi Das — Design Engineer",
    template: "%s | Neelakshi Das",
  },
  description:
    "I help startups and SaaS teams bring ideas to life.",
  keywords: [
    "portfolio",
    "design engineer",
    "UI/UX designer",
    "frontend developer",
    "Neelakshi Das",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Neelakshi Das" }],
  creator: "Neelakshi Das",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://dasneelakshi.com"),
  alternates: {
    canonical: "https://dasneelakshi.com",
  },
  openGraph: {
    title: "Neelakshi Das — Design Engineer",
    description:
      "I help startups and SaaS teams bring ideas to life.",
    type: "website",
    locale: "en_US",
    url: "https://dasneelakshi.com",
    siteName: "Neelakshi Das",
    images: [
      {
        url: "https://dasneelakshi.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neelakshi Das — Design Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neelakshi Das — Design Engineer",
    description:
      "I help startups and SaaS teams bring ideas to life.",
    images: ["https://dasneelakshi.com/og-image.png"],
    creator: "@bluecoder2003",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistPixelSquare.variable}>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//neelakshi.s3.us-east-1.amazonaws.com" />

        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload only the most critical font */}
        <link
          rel="preload"
          href="/fonts/NeueMontreal-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />

        {/* Resource hints for better caching */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />

        {/* Explicit OG Image Meta Tags (Fallback) */}
        <meta property="og:image" content="https://dasneelakshi.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Neelakshi Das — Design Engineer" />
        <meta name="twitter:image" content="https://dasneelakshi.com/og-image.png" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Neelakshi Das",
              jobTitle: "Design Engineer",
              url: "https://dasneelakshi.com",
              sameAs: [
                "https://github.com/bluecoder2003",
                "https://twitter.com/bluecoder2003",
                "https://www.linkedin.com/in/neelakshi-das-b0ba68244/",
                "https://dribbble.com/bluecoder2003",
                "https://www.behance.net/neelakshi",
              ],
              knowsAbout: [
                "UI/UX Design",
                "Frontend Development",
                "React",
                "Next.js",
                "TypeScript",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
