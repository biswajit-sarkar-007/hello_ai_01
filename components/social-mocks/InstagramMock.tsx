import React from "react";
import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark, Copy } from "lucide-react";

interface InstagramMockProps {
  content: string;
  userName: string;
  userImageUrl?: string;
  uploadedImageUrl?: string;
}

export const InstagramMock: React.FC<InstagramMockProps> = ({ content, userName, userImageUrl, uploadedImageUrl }) => {
  // Split content if it's a string with multiple options
  const captions = Array.isArray(content)
    ? content.filter(Boolean)
    : content.split("\n\n").filter((c) => c.trim() !== "");

  // Clipboard copy
  const copyToClipboard = (text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="bg-white text-black rounded-lg p-4 max-w-md mx-auto shadow-lg">
      {/* Profile section */}
      <div className="flex items-center mb-3">
        {userImageUrl ? (
          <Image src={userImageUrl} alt={userName} width={32} height={32} className="w-8 h-8 rounded-full mr-3 object-cover" />
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded-full mr-3" />
        )}
        <p className="font-bold truncate" title={userName}>{userName}</p>
      </div>
      {/* Uploaded image section */}
      <div className="relative bg-gray-200 h-64 mb-3 flex items-center justify-center overflow-hidden rounded-md">
        {uploadedImageUrl ? (
          <Image src={uploadedImageUrl} alt="Uploaded" fill className="object-cover" style={{objectFit:'cover'}} />
        ) : (
          <span className="text-gray-500">Image Placeholder</span>
        )}
      </div>
      {/* Instagram actions */}
      <div className="flex justify-between mb-3">
        <div className="flex space-x-4">
          <Heart size={24} />
          <MessageCircle size={24} />
          <Send size={24} />
        </div>
        <Bookmark size={24} />
      </div>
      {/* Captions */}
      <div className="space-y-4">
        {captions.map((caption, idx) => (
          <div key={idx} className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl shadow-sm flex items-start justify-between gap-2">
            <div>
               
              <p className="text-sm text-gray-800 whitespace-pre-line break-words">{caption}</p>
            </div>
            <button
              onClick={() => copyToClipboard(caption)}
              className="ml-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full p-2 transition-colors shadow"
              aria-label="Copy caption"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};