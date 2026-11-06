import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site-config";
import { resolveSiteOrigin, isPreviewDeployment } from "@/lib/site-origin";
import "./globals.css";

const geistSans = localFont({
  weight: "100 900",
  src: "./fonts/Geist-Latin.woff2",
  variable: "--font-billora-sans",
  display: "swap",
});
const origin = resolveSiteOrigin();
const title = "Billora — Great work deserves better billing.";
export const metadata: Metadata = {
  // Netlify supplies the public origin at build time; localhost is local QA only.
  metadataBase: new URL(origin || "http://localhost:3000"),
  title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  ...(origin ? { alternates: { canonical: "/" } } : {}),
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    ...(origin ? { url: origin } : {}),
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    images: [
      {
        url: origin ? `${origin}/og-image.png` : "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Billora — Great work deserves better billing. An interactive billing concept for independent professionals.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: [origin ? `${origin}/og-image.png` : "/og-image.png"],
  },
  robots: { index: !isPreviewDeployment(), follow: !isPreviewDeployment() },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};
export const viewport: Viewport = {
  themeColor: "#F7F7F2",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} font-sans antialiased`}>
      <body className="min-h-screen">
        <a href="#main-content" className="skip-link" tabIndex={0}>
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
