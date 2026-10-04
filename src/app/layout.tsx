import { getSiteDocument } from "@/lib/site-document";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSiteDocument();

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <title>{site.title}</title>
        <meta name="description" id="metaDesc" content={site.description} />
        <link rel="canonical" href="https://sudharmika.com/" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="theme-color" content="#F4F3EC" />
        <meta name="author" content="I Wayan Sudharmika" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="alternate" href="https://sudharmika.com/" {...{ hreflang: "id" }} />
        <link rel="alternate" href="https://sudharmika.com/en/" {...{ hreflang: "en" }} />
        <link rel="alternate" href="https://sudharmika.com/" {...{ hreflang: "x-default" }} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sudharmika.com/" />
        <meta property="og:site_name" content="Sudharmika" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:image" content="https://sudharmika.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={site.title} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content="https://sudharmika.com/og-image.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={site.fontHref} rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: site.css }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: site.jsonLd }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
