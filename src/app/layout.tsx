import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NxtGen Revenue OS — The Next Generation Business Operating System",
  description:
    "One unified platform to manage every customer, campaign, sale, and automation. AI-first revenue intelligence for scaling businesses.",
  keywords: [
    "CRM",
    "revenue operations",
    "marketing automation",
    "sales pipeline",
    "customer success",
    "AI",
    "SaaS",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Instrument+Sans:ital,wght@0,400..700;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
