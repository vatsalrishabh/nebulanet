"use client"
import React, { useState } from "react";

const Courses = () => {
  const videos = [
    { id: 1, title: "Web Development for Beginners", youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 2, title: "Mastering Digital Marketing", youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 3, title: "Building Mobile Apps with React Native", youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 4, title: "Data Structures & Algorithms", youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 5, title: "Machine Learning Essentials", youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  ];

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const titleLimit = 25; // Adjust this limit as needed

  return (
    <section id="courses" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          {/* Left side - 2/3 width */}
          <div className="w-full px-4 lg:w-2/3 xl:w-2/3">
            <div className="shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Explore Our Courses
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Discover a wide range of online courses designed to help you grow your skills and career. Join today!
              </p>

              {/* YouTube video player */}
              <div className="mb-8">
                <iframe
                  width="100%"
                  height="315"
                  src={selectedVideo.youtubeLink}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="mt-4 text-lg font-semibold text-primary">{selectedVideo.title}</p>
              </div>
            </div>
          </div>

          {/* Right side - 1/3 width */}
          <div className="w-full px-4 lg:w-1/3 xl:w-1/3">
            <div className="shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h3 className="text-xl font-semibold text-dark dark:text-white">Course Videos</h3>

              {/* List of videos with scrollbar */}
              <ul className="mt-6 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {videos.map((video, index) => (
                  <li key={video.id} className="mb-3">
                    <button
                      className={`text-base font-medium px-2 py-1 rounded transition-all duration-200
                      ${
                        selectedVideo.id === video.id
                          ? "bg-primary text-white"
                          : "text-primary hover:underline hover:text-primary-dark"
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      {index + 1}.{" "}
                      {video.title.length > titleLimit
                        ? video.title.slice(0, titleLimit) + "..."
                        : video.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
