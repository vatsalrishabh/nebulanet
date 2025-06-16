"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Providers } from "./providers";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux"; // the react store provider
import { store } from "../redux/store"; // Uncomment if you have a Redux store setup

const inter = Inter({ subsets: ["latin"] });

// ✅ Declare session as any = undefined
const session: any = undefined;

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
          <SessionProvider session={session}>
            <Provider store={store}>
              {/* This is where you can add Redux store if needed */}
            <Header />
            <ScrollToTop />
            {children}
            <Footer />
            </Provider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
