// /app/web-developer/[city]/page.js
import React from "react";
import { notFound } from "next/navigation";
import { indianCities } from "@/lib/indianCities";

export async function generateStaticParams() {
  return indianCities.map((city) => ({
    city: city.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }) {
  const city = decodeURIComponent(params.city).replace(/-/g, " ");
  return {
    title: `Top Web Developers, Designers & Marketing Experts in ${city}`,
    description: `Hire the best software developers, web designers, logo designers, and SEO experts in ${city}. We provide top-notch digital services across India.`,
    keywords: [
      `software developer in ${city}`,
      `web developer in ${city}`,
      `web designer in ${city}`,
      `SEO expert in ${city}`,
      `digital marketing in ${city}`,
      `freelance developer in ${city}`,
      `logo designer in ${city}`,
      `top web development company ${city}`,
      `hire developer near ${city}`,
    ],
    alternates: {
      canonical: `https://nebulanet.in/web-developer/${params.city}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    openGraph: {
      title: `Best Software & Web Developer in ${city}`,
      description: `Professional developers, marketers, and designers serving ${city}.`,
      type: "website",
      url: `https://nebulanet.in/web-developer/${params.city}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Best Web Developer in ${city}`,
      description: `Top software developers and marketing experts in ${city}`,
    },
  };
}

const CityDeveloperPage = ({ params }) => {
  const city = decodeURIComponent(params.city).replace(/-/g, " ");

  if (!city) return notFound();

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-custom-graybg">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-custom-maroon">
            Your One-Stop Web &amp; Marketing Team in {city}
          </h1>
          <p className="mt-4 text-base text-body-color max-w-2xl mx-auto">
            Get high-quality software development, creative branding, digital marketing, and SEO services tailored to clients in {city}. Rated among the top developers in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Web Development", desc: "Responsive websites using React, Next.js, Node.js." },
            { title: "Mobile App Development", desc: "Cross-platform apps with React Native & Flutter." },
            { title: "SEO Optimization", desc: "Boost search visibility using white-hat SEO tactics." },
            { title: "Logo & Branding", desc: "Get a stunning logo & visual identity for your brand." },
            { title: "Social Media Marketing", desc: "Run ad campaigns, grow followers & manage content." },
            { title: "E-commerce Development", desc: "Shopify, WooCommerce & custom store creation." },
          ].map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6">
              <h3 className="text-xl font-semibold text-custom-maroon mb-2">{service.title}</h3>
              <p className="text-body-color">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-custom-maroon">
            Why Hire Us in {city}?
          </h2>
          <p className="text-base text-body-color max-w-3xl mx-auto">
            With experience across 100+ projects, our team delivers exceptional results to clients across India. Get the best development, marketing, and branding solutions tailored to {city}&apos;s unique market.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CityDeveloperPage;
