import Head from "next/head";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Blog = () => {
  return (
    <>
      <Head>
        <title>NebulaNet Blog | Web Development, Apps & Digital Marketing</title>
        <meta name="description" content="Stay ahead in the digital world with expert insights from NebulaNet. Explore web development trends, app solutions, and digital marketing strategies to grow your business online." />
        <meta name="keywords" content="web development, app solutions, digital marketing, SEO, business growth, NebulaNet" />
        <meta name="author" content="NebulaNet" />
      </Head>
      <section
        id="blog"
        className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <SectionTitle
            title="Our Blogs"
            paragraph="Stay ahead in the digital world with expert insights from NebulaNet. Explore web development trends, app solutions, and digital marketing strategies to grow your business online."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
            {blogData.map((blog) => (
              <div key={blog.id} className="w-full">
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
