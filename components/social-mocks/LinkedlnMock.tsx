import React from "react";
import { ThumbsUp, MessageSquare, Repeat, Send } from "lucide-react";

interface LinkedInMockProps {
  content: string;
  userName: string;
  userTitle: string;
  userImageUrl?: string;
}
interface LinkedInOption {
  heading?: string;
  title?: string;
  body?: string;
  main?: string;
  example?: string;
  learning?: string;
  hashtags?: string[];
}

export const LinkedInMock: React.FC<LinkedInMockProps> = ({ content, userName, userTitle }) => {
  // Try to parse content as JSON for multiple options, fallback to single string
  let options: LinkedInOption[] = [];

  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      options = parsed;
    } else if (typeof parsed === 'object' && parsed !== null) {
      options = [parsed];
    }
  } catch {
    // fallback: treat as single option with only main content
    options = [{
      heading: 'LinkedIn Post',
      title: userTitle,
      body: content,
      main: content,
      example: '',
      learning: '',
      hashtags: ['#Professional', '#Learning', '#Career']
    }];
  }

  // Helper to copy text
  const copyToClipboard = (text: string) => {
    if (navigator?.clipboard) navigator.clipboard.writeText(text);
  };

  // Professional card colors
  const cardColors = [
    'border-blue-400 shadow-blue-100',
    'border-green-400 shadow-green-100',
    'border-purple-400 shadow-purple-100'
  ];

  return (
    <div className="bg-white text-black rounded-lg p-4 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
        <div>
          <p className="font-bold" title={userName}>{userName}</p>
          <p className="text-gray-500 text-sm">{userTitle} • 1st</p>
        </div>
      </div>
      <div className="space-y-6">
        {options.map((opt, idx) => (
          <div
            key={idx}
            className={`bg-indigo-50 border ${cardColors[idx % cardColors.length]} p-5 rounded-2xl shadow-md relative`}
          >
            {/* Card Heading */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <h3 className="text-xl font-bold text-indigo-700 break-words">
                  {opt.heading || `Option ${idx + 1}`}
                </h3>
               

              </div>
            </div>


            
            {/* Title */}
            {opt.title && (
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold text-gray-700">Title: {opt.title}</span>
                 
              </div>
            )}
            {/* Main Content */}
            {opt.main && (
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Main Content:</span>
                   

                </div>
                <p className="text-gray-800 break-words whitespace-pre-line mt-1">{opt.main}
                  <button
                    className="ml-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-1 transition-colors shadow align-middle"
                    onClick={() => copyToClipboard(opt.main ?? '')}
                    aria-label="Copy main content inline"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </p>
              </div>
            )} 
            {/* Body */}
            {opt.body && (
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Body:</span>
                  
                </div>
                <p className="text-gray-800 break-words whitespace-pre-line mt-1">{opt.body}
                   
                </p>
              </div>
            )} 
            {/* Example */}
            {opt.example && (
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Example:</span>
                  
                </div>
                <p className="text-gray-800 break-words whitespace-pre-line mt-1">{opt.example}
                  
                </p>
              </div>
            )} 
            {/* Learning */}
            {opt.learning && (
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Learning:</span>
                   
                </div>
                <p className="text-gray-800 break-words whitespace-pre-line mt-1">{opt.learning}
                   
                </p>
              </div>
            )} 
            {/* Hashtags */}
            <div className="mt-2 flex flex-wrap gap-2 items-center">
              {(opt.hashtags || ['#Professional', '#Learning', '#Career']).slice(0, 3).map((tag: string, i: number) => (
                <span key={i} className="flex items-center text-blue-600 font-medium">
                  {tag}
                  
                </span>
              ))}
            </div>
            {/* Copy all card */}
            <button
              className="absolute top-3 right-3 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 rounded-full px-3 py-1 text-xs font-semibold shadow transition-colors"
              onClick={() => copyToClipboard(
                `${opt.heading || ''}\n${opt.title || ''}\n${opt.main || ''}\n${opt.body || ''}\n${opt.example || ''}\n${opt.learning || ''}\n${(opt.hashtags || []).join(' ')}`
              )}
              aria-label="Copy all card"
            >Copy All</button>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-gray-500 mt-6">
        <ThumbsUp size={18} />
        <MessageSquare size={18} />
        <Repeat size={18} />
        <Send size={18} />
      </div>
    </div>
  );
};