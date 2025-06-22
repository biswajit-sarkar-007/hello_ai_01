 
import  Navbar  from "@/components/Navbar";
import Link from "next/link";
import {  StarIcon } from "lucide-react";

 
 

const testimonials = [
  {
    name: "Alex P.",
    role: "Content Strategist",
    text: "Hello AI has completely transformed my workflow. The content quality is outstanding and the interface is a joy to use!"
  },
  {
    name: "Morgan S.",
    role: "Marketing Lead",
    text: "We save hours every week using Hello AI for our campaigns. The results are always professional and on-brand."
  },
  {
    name: "Jamie D.",
    role: "Founder, SaaS Startup",
    text: "The best AI tool we've tried. Clean, fast, and reliable. Highly recommended for any business."
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased flex flex-col relative overflow-hidden">
      {/* Responsive wrapper for all content */}
      
      {/* Animated Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none fixed inset-0 z-0"
      >
        {/* Light Theme Animation (more vibrant, layered, and animated) */}
        <div className="absolute inset-0 w-full h-full dark:hidden">
          <svg width="100%" height="100%" className="w-full h-full animate-none">
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#f472b6" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="grad2" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="grad3" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="grad4" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#facc15" stopOpacity="0.13" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="20%" cy="30%" r="220" fill="url(#grad1)" className="animate-float-slow" />
            <circle cx="80%" cy="50%" r="180" fill="url(#grad2)" className="animate-float-medium" />
            <circle cx="60%" cy="80%" r="140" fill="url(#grad3)" className="animate-float-fast" />
            <circle cx="40%" cy="70%" r="120" fill="url(#grad4)" className="animate-float-xslow" />
          </svg>
        </div>
        {/* Dark Theme Animation (unchanged) */}
        <div className="hidden dark:block absolute inset-0 w-full h-full">
          <svg width="100%" height="100%" className="w-full h-full animate-pulse-slow" style={{filter: 'blur(80px)'}}>
            <circle cx="30%" cy="40%" r="200" fill="#6366f1" fillOpacity="0.18" />
            <circle cx="70%" cy="60%" r="180" fill="#a5b4fc" fillOpacity="0.15" />
            <circle cx="50%" cy="80%" r="120" fill="#818cf8" fillOpacity="0.12" />
          </svg>
        </div>
        {/* Extra: Keyframes for floating animation */}
        <style>{`
          @keyframes float-slow { 0% { transform: translateY(0px); } 50% { transform: translateY(-24px); } 100% { transform: translateY(0px); } }
          @keyframes float-medium { 0% { transform: translateY(0px); } 50% { transform: translateY(-40px); } 100% { transform: translateY(0px); } }
          @keyframes float-fast { 0% { transform: translateY(0px); } 50% { transform: translateY(32px); } 100% { transform: translateY(0px); } }
          @keyframes float-xslow { 0% { transform: translateY(0px); } 50% { transform: translateY(12px); } 100% { transform: translateY(0px); } }
          .animate-float-slow { animation: float-slow 14s ease-in-out infinite; }
          .animate-float-medium { animation: float-medium 18s ease-in-out infinite; }
          .animate-float-fast { animation: float-fast 9s ease-in-out infinite; }
          .animate-float-xslow { animation: float-xslow 22s ease-in-out infinite; }
        `}</style>
      </div>
      <Navbar />
      {/* Hero Section */}
      <section className="w-full flex-1 flex flex-col justify-center items-center py-16 px-4 sm:py-24 sm:px-6 fade-in">
        <div className="max-w-2xl w-full text-center mx-auto px-2 sm:px-0 mt-[50px]">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 leading-tight tracking-tight text-gray-900">
            Supercharge your workflow with <span className="text-indigo-500">Hello AI</span>
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-500 mb-8 sm:mb-10 font-medium">
            Unlock powerful AI tools to create, write, and automate your work. Minimal, fast, and professional—trusted by modern teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link href="/sign-up" className="rounded-full bg-gray-900 text-white px-8 py-4 text-lg font-semibold shadow-md hover:bg-gray-800 transition">
              Try Hello AI
            </Link>
            <Link href="/features" className="rounded-full bg-white border border-gray-300 text-gray-900 px-8 py-4 text-lg font-semibold shadow hover:shadow-md transition">
              See Features
            </Link>
          </div>
        </div>
      </section>


     



      {/* Testimonials Section */}
      <section className="w-full py-12 px-2 sm:py-20 sm:px-4 bg-gray-50 fade-in" id="testimonials">
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">What our users say</h2>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm p-6 sm:p-8 flex flex-col items-center text-center transition hover:shadow-md">
                <StarIcon className="w-8 h-8 text-yellow-400 mb-4" />
                <blockquote className="text-gray-700 italic mb-4">“{t.text}”</blockquote>
                <div className="text-gray-900 font-semibold">{t.name}</div>
                <div className="text-gray-400 text-sm">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full py-10 px-2 sm:py-16 sm:px-4 fade-in">
        <div className="max-w-xl mx-auto text-center px-2 sm:px-0">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">Ready to experience Hello AI?</h2>
          <p className="text-base xs:text-lg sm:text-xl text-gray-500 mb-6 sm:mb-8">Start for free, upgrade anytime. No credit card required.</p>
          <Link href="/sign-up" className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold shadow-lg transition w-full sm:w-auto inline-block">
            Get Started
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full border-t border-gray-200 py-6 sm:py-8 bg-white fade-in">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
          <div className="text-gray-500 text-sm">© {new Date().getFullYear()} Hello AI. All rights reserved.</div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <Link href="/features" className="hover:text-gray-900 transition">Features</Link>
            <Link href="/pricing" className="hover:text-gray-900 transition">Pricing</Link>
            
           
          </div>
        </div>
      </footer>
    </div>
  );
}
            