"use client";
import React from "react";

const aiTools = {
  "Video Editing": [
    {
      id: 1,
      name: "Runway ML",
      link: "https://runwayml.com/",
      description: "AI-powered video editing, inpainting, motion tracking, and more.",
    },
    {
      id: 2,
      name: "Pictory",
      link: "https://pictory.ai/",
      description: "Create short videos from long content using AI.",
    },
    {
      id: 3,
      name: "Descript",
      link: "https://www.descript.com/",
      description: "Edit video/audio like a document with AI tools.",
    },
  ],
  "AI Scraping & Data": [
    {
      id: 1,
      name: "Browse AI",
      link: "https://www.browse.ai/",
      description: "No-code web scraping and monitoring platform.",
    },
    {
      id: 2,
      name: "Octoparse",
      link: "https://www.octoparse.com/",
      description: "Visual web scraping tool with scheduling and export features.",
    },
    {
      id: 3,
      name: "Diffbot",
      link: "https://www.diffbot.com/",
      description: "Extract structured data from web pages using AI.",
    },
     {
      id: 4,
      name: "Getgobii",
      link: "https://getgobii.com/docs/guides/quickstart/",
      description: "Extract structured data from web pages using AI and CURL.",
    },

    
  ],
  "AI Writing & Content": [
    {
      id: 1,
      name: "Copy.ai",
      link: "https://www.copy.ai/",
      description: "Write marketing copy, blog posts, and emails with AI.",
    },
    {
      id: 2,
      name: "Writesonic",
      link: "https://writesonic.com/",
      description: "AI writer for blogs, ads, SEO content, and more.",
    },
    {
      id: 3,
      name: "Jasper",
      link: "https://www.jasper.ai/",
      description: "Generative AI for teams creating content at scale.",
    },
  ],
  "AI Code Generation": [
    {
      id: 1,
      name: "GitHub Copilot",
      link: "https://github.com/features/copilot",
      description: "Code autocomplete powered by OpenAI Codex.",
    },
    {
      id: 2,
      name: "Codeium",
      link: "https://codeium.com/",
      description: "Free AI code completion and search tool.",
    },
    {
      id: 3,
      name: "Replit Ghostwriter",
      link: "https://replit.com/site/ghostwriter",
      description: "AI developer assistant built into Replit IDE.",
    },
  ],
};

const AIToolsPage = () => {
  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Top AI Tools Categorized by Use Case
              </h2>
              <p className="mb-10 text-base font-medium text-body-color">
                Discover curated AI tools across various domains like video editing, scraping, writing, and coding.
              </p>

              {Object.entries(aiTools).map(([category, tools]) => (
                <div key={category} className="mb-10">
                  <h3 className="text-xl font-semibold text-primary mb-4">{category}</h3>
                  <ul className="space-y-4">
                    {tools.map((tool) => (
                      <li key={tool.id} className="border-l-4 border-primary pl-4">
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-dark hover:text-primary dark:text-white"
                        >
                          {tool.name}
                        </a>
                        <p className="text-sm text-body-color">{tool.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIToolsPage;
