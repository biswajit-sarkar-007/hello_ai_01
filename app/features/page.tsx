import Navbar from "@/components/Navbar";
import { CheckCircleIcon, SparklesIcon, ZapIcon, UserIcon } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <SparklesIcon className="w-8 h-8 text-indigo-400" />, 
    title: "AI-Powered Content",
    description: "Generate articles, emails, marketing copy, and more with state-of-the-art AI technology.",
    detail: "Hello AI leverages advanced language models to help you create content that is engaging, relevant, and tailored to your needs."
  },
  {
    icon: <ZapIcon className="w-8 h-8 text-yellow-400" />, 
    title: "Instant Results",
    description: "Get high-quality output in seconds. No waiting, no hassle.",
    detail: "Our platform is engineered for speed and reliability, so you can focus on your work and get results instantly—every time."
  },
  {
    icon: <CheckCircleIcon className="w-8 h-8 text-green-400" />, 
    title: "Professional Quality",
    description: "Content that reads like it was written by an expert, every time.",
    detail: "From grammar to tone, Hello AI ensures your writing is always polished and professional, perfect for business and creative use alike."
  },
  {
    icon: <UserIcon className="w-8 h-8 text-gray-400" />, 
    title: "Personalized Tools",
    description: "Customize outputs for your brand, audience, and workflow.",
    detail: "Adjust the style, length, and format of your content to match your unique voice and goals."
  },
];

import BackgroundAnimation from "@/components/BackgroundAnimation";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased flex flex-col relative overflow-hidden">
      <BackgroundAnimation />
    <div className="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
      <Navbar />
      <section className="w-full flex-1 flex flex-col justify-center items-center py-12 px-2 sm:py-24 sm:px-4 fade-in">
        <div className="max-w-2xl w-full text-center mx-auto px-2 sm:px-0 mt-[50px]">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 leading-tight tracking-tight text-gray-900">
            Discover the Power of <span className="text-indigo-500">Hello AI</span>
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-500 mb-6 sm:mb-8 font-medium">
            Everything you need to create, write, and automate with AI—minimal, fast, and professional.
          </p>
        </div>
      </section>
      <section className="w-full py-16 px-4 bg-gray-50 fade-in">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm p-5 sm:p-8 flex flex-col items-center text-center transition hover:shadow-md">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-500 text-base mb-2">{feature.description}</p>
                <p className="text-gray-400 text-sm">{feature.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-16 px-4 fade-in">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to try Hello AI?</h2>
          <p className="text-lg text-gray-500 mb-8">Start for free, upgrade anytime. No credit card required.</p>
          <Link href="/sign-up" className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white px-10 py-4 text-lg font-semibold shadow-lg transition">
            Get Started
          </Link>
        </div>
      </section>
    </div>
    </div>
  );
}
