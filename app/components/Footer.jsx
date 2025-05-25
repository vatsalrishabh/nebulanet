import React from "react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="Footer bg-gray-900 text-gray-300 py-8">
      {/* Top Footer */}
      <div className="topFooter grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-8 pt-6">
        {/* Column 1 */}
        <div className="col1">
          <h1 className="text-brightPink text-xl font-semibold mb-4 hover:text-lightPink transition-all duration-300">
            About Us
          </h1>
          <p className="hover:text-gray-100 transition-all duration-300">
            StyleDivaa, based in Bangalore, offers custom designer dresses, 
            expert tailoring, and fashion courses. Elevate your style and 
            learn the art of fashion with us.
          </p>
        </div>

        {/* Column 2 */}
        <div className="col2">
          <h1 className="text-brightPink text-xl font-semibold mb-4 hover:text-lightPink transition-all duration-300">
            Services
          </h1>
          <ul className="space-y-2">
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="/forher">For Her</Link>
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="/forhim">For Him</Link>
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="/services">Services</Link>
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="/stylingtips">Styling Tips</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="col3">
          <h1 className="text-brightPink text-xl font-semibold mb-4 hover:text-lightPink transition-all duration-300">
            Quick Links
          </h1>
          <ul className="space-y-2">
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="/terms">Terms & Conditions</Link>
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="/privacypolicy">Privacy Policy</Link>
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="/cancelrefund">Cancellation & Refund</Link>
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="/shipping">Shipping & Delivery</Link>
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="/faqs">FAQs</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="col4">
          <h1 className="text-brightPink text-xl font-semibold mb-4 hover:text-lightPink transition-all duration-300">
            Follow Us
          </h1>
          <ul className="space-y-2">
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="https://facebook.com">Facebook</Link>
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="https://www.instagram.com/style_diva33/">Instagram</Link>
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="https://twitter.com">Twitter</Link>
            </li>
            <li className="hover:text-lightPink transition-all duration-300 cursor-pointer">
              <Link href="https://pinterest.com">Pinterest</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bottomFooter flex flex-col lg:flex-row items-center justify-between mt-8 border-t border-gray-700 pt-4 px-8">
        <div className="bottomFooter-Left text-gray-400">
          StyleDivaa is your one-stop destination for bespoke fashion and elegance.
        </div>
        <div className="bottomFooter-Right text-gray-400 mt-4 lg:mt-0">
          © {year} StyleDivaa | All Rights Reserved | Powered by{" "}
          <Link href="https://www.nebulanet.in">
            <span className="text-brightPink hover:text-lightPink transition-all duration-300 cursor-pointer">
              NebulaNet
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
