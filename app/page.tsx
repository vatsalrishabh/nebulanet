import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NebulaNet - Empowering Businesses with Innovative Tech",
  description: "NebulaNet is a leading startup SaaS platform providing innovative and scalable technology solutions to empower businesses.",
  keywords: "SaaS, Startup, Technology, Business Solutions, Web Development, Next.js",

  openGraph: {
    title: "NebulaNet - Empowering Businesses with Innovative Tech",
    description: "NebulaNet is a leading startup SaaS platform providing innovative and scalable technology solutions to empower businesses.",
    url: "https://www.nebulanet.in",  // Replace with your actual domain
  
    images: [
      {
        url: "https://www.nebulanet.com/images/og-image.jpg",  // Replace with your OG image URL
        width: 1200,
        height: 630,
        alt: "NebulaNet Logo"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@NebulaNet",  // Twitter handle for your site (optional)
    title: "NebulaNet - Empowering Businesses with Innovative Tech",
    description: "NebulaNet is a leading startup SaaS platform providing innovative and scalable technology solutions to empower businesses.",
  
  },
  robots: "index, follow",  // Ensure search engines can index the page

};

export default function Home() {
  return (
    <>
      <ScrollUp />  {/* scroll till up */}
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
    </>
  );
}
