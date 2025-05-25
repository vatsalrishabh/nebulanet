import React from "react";
import Link from "next/link";

const BreadCrumbs = ({one,oneLink, two , twoLink}) => {
  const breadcrumbs = [
    { label: one, href: oneLink },
    { label: two, href: twoLink },
  ];

  return (
    <div className="BreadCrumb">
      <nav
        className="flex px-5 py-3 text-pink-600 border border-pink-300 rounded-lg bg-cutombg "
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="inline-flex items-center">
              {index === 0 ? (
                // First breadcrumb with a Home icon
                <Link href={breadcrumb.href}>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 me-2 text-pink-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    <span className="text-sm font-medium text-pink-600 hover:text-pink-800">
                      {breadcrumb.label}
                    </span>
                  </div>
                </Link>
              ) : (
                <>
                  <svg
                    className="rtl:rotate-180 w-3 h-3 mx-1 text-pink-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  {index === breadcrumbs.length - 1 ? (
                    // Current page breadcrumb (no link)
                    <span className="ms-1 text-sm font-medium text-pink-500 md:ms-2">
                      {breadcrumb.label}
                    </span>
                  ) : (
                    // Intermediate breadcrumbs with links
                    <Link href={breadcrumb.href}>
                      <span className="ms-1 text-sm font-medium text-pink-600 hover:text-pink-800 md:ms-2">
                        {breadcrumb.label}
                      </span>
                    </Link>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumbs;
