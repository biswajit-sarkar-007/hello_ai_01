// Reusable animated background for all pages
import React from "react";

const BackgroundAnimation = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none select-none fixed inset-0 z-0"
  >
    {/* Light Theme Animation */}
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
    {/* Dark Theme Animation */}
    <div className="hidden dark:block absolute inset-0 w-full h-full">
      <svg width="100%" height="100%" className="w-full h-full animate-pulse-slow" style={{filter: 'blur(80px)'}}>
        <circle cx="30%" cy="40%" r="200" fill="#6366f1" fillOpacity="0.18" />
        <circle cx="70%" cy="60%" r="180" fill="#a5b4fc" fillOpacity="0.15" />
        <circle cx="50%" cy="80%" r="120" fill="#818cf8" fillOpacity="0.12" />
      </svg>
    </div>
    {/* Keyframes for floating animation */}
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
);

export default BackgroundAnimation;
