import Link from "next/link";
import { Button } from "@/components/ui/button";
import  Navbar  from "@/components/Navbar";

const docsSections = [
  {
    title: "Getting Started",
    description:
      "Learn how to set up your account and create your first AI-generated content.",
    link: "/docs/getting-started",
  },
  {
    title: "Twitter Threads",
    description:
      "Discover how to create engaging Twitter threads using our AI technology.",
    link: "/docs/twitter-threads",
  },
  {
    title: "Instagram Captions",
    description:
      "Learn the best practices for generating Instagram captions that boost engagement.",
    link: "/docs/instagram-captions",
  },
  {
    title: "LinkedIn Posts",
    description:
      "Explore techniques for crafting professional LinkedIn content with AI assistance.",
    link: "/docs/linkedin-posts",
  },
  {
    title: "API Reference",
    description:
      "Detailed documentation for integrating our AI content generation into your applications.",
    link: "/docs/api-reference",
  },
];

import BackgroundAnimation from "@/components/BackgroundAnimation";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased flex flex-col relative overflow-hidden">
      <BackgroundAnimation />
    <div className="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
      <Navbar />
      <main className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-20 flex-1 w-full">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-12 text-center text-white">
          Documentation
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {docsSections.map((section, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col"
            >
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">
                {section.title}
              </h2>
              <p className="text-gray-400 mb-4 flex-grow">
                {section.description}
              </p>
              <Button
                asChild
                className="w-full bg-indigo-500 text-white hover:bg-indigo-600 rounded-full font-semibold shadow transition"
              >
                <Link href={section.link}>Read More</Link>
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  </div>
  );
}