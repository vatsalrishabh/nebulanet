import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact NebulaNet | Expert Web Development, Mobile Apps, and Digital Marketing",
  description: "Get in touch with NebulaNet, your trusted partner for custom web development, mobile app solutions, and digital marketing strategies to grow your business. We specialize in SEO, eCommerce, and SaaS solutions.",
  keywords: ["web development", "mobile app development", "digital marketing", "SEO strategies", "SaaS solutions", "NebulaNet contact", "startup web development", "app development", "SEO services", "business growth"],
  openGraph: {
    title: "Contact NebulaNet | Expert Web Development & Digital Solutions",
    description: "Reach out to NebulaNet for innovative web development, app development, and digital marketing services. Our experts are here to help your business grow with tailored solutions.",
    type: "website",
    url: "https://www.nebulanet.in/contact",  // Replace with your actual contact page URL
   
  },
  twitter: {
    card: "summary_large_image",
    site: "@NebulaNet", // Add your Twitter handle
    title: "Contact NebulaNet | Expert Web Development & Digital Solutions",
    description: "Get in touch with NebulaNet for web development, mobile apps, and SEO strategies that will help your business grow.",
   
  },
  robots: "index, follow", // Make sure the page is indexed and crawled
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb 
        pageName="Contact Us" 
        description="Get in touch with NebulaNet for expert web development, mobile apps, and digital marketing solutions. Whether you need a website, an app, or SEO strategies to grow your business, We&#39;re here to help!" 
      />
      <Contact />
    </>
  );
};

export default ContactPage;
