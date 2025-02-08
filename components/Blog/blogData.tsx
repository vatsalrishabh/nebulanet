import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Building Scalable Web Solutions with Nebulanet",
    paragraph:
      "Nebulanet offers innovative cloud solutions that help businesses scale effectively. Learn how to leverage Nebulanet's platform to build scalable, high-performance websites and apps.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Vatsal Rishabh",
      image: "/images/blog/author-01.png",
      designation: "Lead Developer at Nebulanet",
    },
    tags: ["cloud", "scalable"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Top Features of Nebulanet’s Hosting Platform",
    paragraph:
      "Discover the top features of Nebulanet's hosting platform, including its seamless deployment process, high uptime, and enhanced security. Learn why Nebulanet is the preferred choice for developers and businesses alike.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Jay Singh",
      image: "/images/blog/author-02.png",
      designation: "Technical Writer at Nebulanet",
    },
    tags: ["hosting", "performance"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "How to Optimize Your Website for Nebulanet’s Infrastructure",
    paragraph:
      "Optimizing your website for Nebulanet’s infrastructure can improve performance and reduce loading times. Learn the best practices for integrating Nebulanet's cloud services and taking advantage of its robust features.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Henry Richard",
      image: "/images/blog/author-03.png",
      designation: "Cloud Architect at Nebulanet",
    },
    tags: ["performance", "optimization"],
    publishDate: "2025",
  },
];

export default blogData;
