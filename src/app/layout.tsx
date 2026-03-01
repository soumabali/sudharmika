import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sudharmika.com"),
  title: "I Wayan Sudharmika | Backend Programmer",
  description:
    "Personal website of I Wayan Sudharmika, backend programmer. API architecture, automation systems, and scalable backend engineering services.",
  keywords: [
    "I Wayan Sudharmika",
    "Backend Programmer",
    "Backend Developer Bali",
    "Jasa Backend Developer",
    "API Development",
    "Automation Systems",
    "Laravel Developer",
    "Node.js Backend",
  ],
  alternates: {
    canonical: "https://sudharmika.com",
    languages: {
      "id-ID": "https://sudharmika.com/?lang=id",
      "en-US": "https://sudharmika.com/?lang=en",
    },
  },
  icons: {
    icon: "/brand-mark.svg",
    shortcut: "/brand-mark.svg",
    apple: "/brand-mark.svg",
  },
  openGraph: {
    title: "I Wayan Sudharmika | Backend Programmer",
    description: "Building reliable digital products with robust backend architecture.",
    url: "https://sudharmika.com",
    siteName: "Sudharmika",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "I Wayan Sudharmika - Backend Programmer",
      },
    ],
    locale: "id_ID",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I Wayan Sudharmika | Backend Programmer",
    description: "Building reliable digital products with robust backend architecture.",
    images: ["/og-image.svg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "I Wayan Sudharmika",
  jobTitle: "Backend Programmer",
  email: "sudhar.denpasar@gmail.com",
  telephone: "+628992927276",
  url: "https://sudharmika.com",
  sameAs: ["https://github.com/soumabali/sudharmika"],
  knowsAbout: ["Backend Architecture", "API Development", "Automation Systems"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
