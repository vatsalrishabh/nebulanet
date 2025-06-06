"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Providers } from "./providers";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* ✅ Google Analytics - GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VG58G8M9DM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VG58G8M9DM');
          `}
        </Script>

        {/* ✅ Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="HZ40xPxo2t8F6Sbsn0bHvg"
          strategy="afterInteractive"
          async
        />
      </head>

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          <ScrollToTop />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
