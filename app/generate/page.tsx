
// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Loader2,
//   Upload,
//   Copy,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Clock,
//   Zap,
// } from "lucide-react";
// import { GoogleGenerativeAI, Part } from "@google/generative-ai";
// import ReactMarkdown from "react-markdown";
// import  Navbar  from "@/components/Navbar";
// import { SignInButton, useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { TwitterMock } from "@/components/social-mocks/TwitterMock";
// import { InstagramMock } from "@/components/social-mocks/InstagramMock";
// import { LinkedInMock } from "@/components/social-mocks/LinkedlnMock";
// import Link from "next/link";

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// const contentTypes = [
//   { value: "twitter", label: "Twitter Thread" },
//   { value: "instagram", label: "Instagram Caption" },
//   { value: "linkedin", label: "LinkedIn Post" },
// ];

// const MAX_TWEET_LENGTH = 280;
// const POINTS_PER_GENERATION = 5;

// interface HistoryItem {
//   id: number;
//   contentType: string;
//   prompt: string;
//   content: string;
//   createdAt: Date;
// }

// import BackgroundAnimation from "@/components/BackgroundAnimation";

// export default function GenerateContent() {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const router = useRouter();

//   const [contentType, setContentType] = useState(contentTypes[0].value);
//   const [prompt, setPrompt] = useState("");
//   const [generatedContent, setGeneratedContent] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [image, setImage] = useState<File | null>(null);
//   const [userPoints, setUserPoints] = useState<number | null>(null);
//   const [history, setHistory] = useState<HistoryItem[]>([]);
//   const [selectedHistoryItem, setSelectedHistoryItem] =
//     useState<HistoryItem | null>(null);


//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(() => {
//     if (!apiKey) {
//       console.error("Gemini API key is not set");
//     }
//   }, []);



// //  useEffect(() => {
// //   if (isLoaded && !isSignedIn) {
// //     router.push("/");
// //   } else if (isSignedIn && user) {
// //     console.log("User loaded:", user);
// //     fetchUserPoints();
// //     fetchContentHistory();
// //   }
// // }, [isLoaded, isSignedIn, user, router, fetchUserPoints, fetchContentHistory]);



//   const fetchUserPoints = async () => {
//     if (user?.id) {
//       try {
//         const res = await fetch(`/api/user-points?userId=${user.id}`);
//         const data = await res.json();
//         setUserPoints(data.points);
//         if (data.points === 0) {
//           // Try to create/update user
//           const updateRes = await fetch('/api/user-update', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               clerkUserId: user.id,
//               email: user.emailAddresses[0].emailAddress,
//               name: user.fullName || ""
//             })
//           });
//           const updateData = await updateRes.json();
//           if (updateData.updated && updateData.updated.points !== undefined) {
//             setUserPoints(updateData.updated.points);
//           }
//         }
//       } catch (_e) {
//         setUserPoints(0);
//       }
//     }
//   };

//   const fetchContentHistory = async () => {
//     if (user?.id) {
//       try {
//         const res = await fetch(`/api/generated-content?userId=${user.id}`);
//         const data = await res.json();
//         setHistory(data.history || []);
//       } catch (e) {
//         setHistory([]);
//       }
//     }
//   };

  

//  useEffect(() => {
//   if (isLoaded && !isSignedIn) {
//     router.push("/");
//   } else if (isSignedIn && user) {
//     console.log("User loaded:", user);
//     fetchUserPoints();
//     fetchContentHistory();
//   }
// }, [isLoaded, isSignedIn, user, router, fetchUserPoints, fetchContentHistory]);

 
//   const handleGenerate = async () => {
//     if (
//       !genAI ||
//       !user?.id ||
//       userPoints === null ||
//       userPoints < POINTS_PER_GENERATION
//     ) {
//       alert("Not enough points or API key not set.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//       let promptText = `Generate ${contentType} content about "${prompt}".`;
//       if (contentType === "twitter") {
//         promptText += " Provide a thread of 5 tweets, each under 280 characters.";
//       }

//       let imagePart: Part | null = null;
//       if (contentType === "instagram" && image) {
//         const reader = new FileReader();
//         const imageData = await new Promise<string>((resolve) => {
//           reader.onload = (e) => {
//             if (e.target && typeof e.target.result === "string") {
//               resolve(e.target.result);
//             } else {
//               resolve("");
//             }
//           };
//           reader.readAsDataURL(image);
//         });

//         const base64Data = imageData.split(",")[1];
//         if (base64Data) {
//           imagePart = {
//             inlineData: {
//               data: base64Data,
//               mimeType: image.type,
//             },
//           };
//         }
//         promptText += " Describe the image and incorporate it into the caption.";
//       }

//       const parts: (string | Part)[] = [promptText];
//       if (imagePart) parts.push(imagePart);

//       const result = await model.generateContent(parts);
//       const generatedText = result.response.text();

//       let content: string[];
//       if (contentType === "twitter") {
//         content = generatedText
//           .split("\n\n")
//           .filter((tweet) => tweet.trim() !== "");
//       } else {
//         content = [generatedText];
//       }

//       setGeneratedContent(content);

//       // Update points via API
//       const updateRes = await fetch('/api/user-points', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId: user.id, points: -POINTS_PER_GENERATION })
//       });
//       const updateData = await updateRes.json();
//       if (updateData.updated && updateData.updated.points !== undefined) {
//         setUserPoints(updateData.updated.points);
//       }

//       // Save generated content via API
//       const saveRes = await fetch('/api/generated-content', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: user.id,
//           content: content.join("\n\n"),
//           prompt,
//           contentType
//         })
//       });
//       const saveData = await saveRes.json();
//       if (saveData.saved) {
//         setHistory((prevHistory) => [saveData.saved, ...prevHistory]);
//       }
//     } catch (error) {
//       console.error("Error generating content:", error);
//       setGeneratedContent(["An error occurred while generating content."]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleHistoryItemClick = (item: HistoryItem) => {
//     setSelectedHistoryItem(item);
//     setContentType(item.contentType);
//     setPrompt(item.prompt);
//     setGeneratedContent(
//       item.contentType === "twitter"
//         ? item.content.split("\n\n")
//         : [item.content]
//     );
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//   };

//   const renderContentMock = () => {
//     if (generatedContent.length === 0) return null;

//     switch (contentType) {
//       case "twitter":
//         return <TwitterMock content={generatedContent} />;
//       case "instagram":
//         return <InstagramMock content={generatedContent[0]} />;
//       case "linkedin":
//         return <LinkedInMock content={typeof generatedContent[0] === 'string' ? generatedContent[0] : ''} userName={user?.fullName || user?.username || 'LinkedInUser'} userTitle={user?.publicMetadata?.title || 'Your Title'} />;
//       default:
//         return null;
//     }
//   };

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   if (!isSignedIn) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
//         <div className="text-center bg-[#111111] p-8 rounded-lg shadow-lg">
//           <h1 className="text-3xl font-bold text-white mb-4">
//             Welcome to ThreadCraft AI
//           </h1>
//           <p className="text-gray-400 mb-6">
//             To start generating amazing content, please sign in or create an
//             account.
//           </p>
//           <SignInButton mode="modal">
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
//               Sign In / Sign Up
//             </Button>
//           </SignInButton>
//           <p className="text-gray-500 mt-4 text-sm">
//             By signing in, you agree to our Terms of Service and Privacy Policy.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(event.target.files[0]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 text-gray-900 antialiased flex flex-col mt-[50px] sm:mt-0">
//       <Navbar />
//       <BackgroundAnimation />
//       <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10 flex-1 w-full">
//         <div className="grid grid-cols-1 gap-6 sm:gap-10 mt-6 sm:mt-10 lg:grid-cols-3">
//           {/* Sidebar - History */}
//           <aside className="lg:col-span-1 bg-white/70 rounded-2xl p-4 sm:p-6 h-80 sm:h-[calc(100vh-12rem)] overflow-y-auto shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-indigo-600 tracking-tight">History</h2>
//               <Clock className="h-5 w-5 text-indigo-400" />
//             </div>
//             <div className="space-y-2 sm:space-y-3">
//               {history.length === 0 ? (
//                 <div className="text-gray-400 text-sm text-center py-12">No history yet.</div>
//               ) : (
//                 history.map((item) => (
//                   <div
//                     key={item.id}
//                     className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer shadow-sm"
//                     onClick={() => handleHistoryItemClick(item)}
//                   >
//                     <div className="flex items-center mb-1">
//                       {item.contentType === "twitter" && (
//                         <Twitter className="mr-2 h-4 w-4 text-blue-400" />
//                       )}
//                       {item.contentType === "instagram" && (
//                         <Instagram className="mr-2 h-4 w-4 text-pink-400" />
//                       )}
//                       {item.contentType === "linkedin" && (
//                         <Linkedin className="mr-2 h-4 w-4 text-blue-600" />
//                       )}
//                       <span className="text-xs font-semibold capitalize text-gray-700">
//                         {item.contentType}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-500 truncate">
//                       {item.prompt}
//                     </p>
//                     <div className="flex items-center text-[11px] text-gray-400 mt-1">
//                       <Clock className="mr-1 h-3 w-3" />
//                       {new Date(item.createdAt).toLocaleString()}
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </aside>

//           {/* Main content area */}
//           <div className="lg:col-span-2 space-y-6 sm:space-y-8">
//             {/* Points display */}
//             <section className="bg-white/90 border border-indigo-100 shadow-lg rounded-2xl px-4 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center justify-center bg-yellow-100 rounded-full w-12 h-12">
//                   <Zap className="h-7 w-7 text-yellow-500" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium text-gray-500">Available Points</p>
//                   <p className="text-3xl font-bold text-gray-800">
//                     {userPoints !== null ? userPoints : "Loading..."}
//                   </p>
//                 </div>
//               </div>
//               <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-full shadow transition">
//                 <Link href="/pricing">Get More Points</Link>
//               </Button>
//             </section>

//             {/* Content generation form */}
//             <section className="bg-white/90 border border-indigo-100 shadow-lg rounded-2xl px-4 py-6 sm:px-8 sm:py-8 space-y-5 sm:space-y-7">
//               <div>
//                 <label className="block text-sm font-semibold mb-2 text-gray-700">
//                   Content Type
//                 </label>
//                 <Select
//                   onValueChange={setContentType}
//                   defaultValue={contentType}
//                 >
//                   <SelectTrigger className="w-full bg-white border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-200">
//                     <SelectValue placeholder="Select content type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {contentTypes.map((type) => (
//                       <SelectItem key={type.value} value={type.value}>
//                         <div className="flex items-center">
//                           {type.value === "twitter" && (
//                             <Twitter className="mr-2 h-4 w-4 text-blue-400" />
//                           )}
//                           {type.value === "instagram" && (
//                             <Instagram className="mr-2 h-4 w-4 text-pink-400" />
//                           )}
//                           {type.value === "linkedin" && (
//                             <Linkedin className="mr-2 h-4 w-4 text-blue-600" />
//                           )}
//                           <span className="text-gray-700 font-medium">{type.label}</span>
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <label
//                   htmlFor="prompt"
//                   className="block text-sm font-semibold mb-2 text-gray-700"
//                 >
//                   Prompt
//                 </label>
//                 <Textarea
//                   id="prompt"
//                   placeholder="Enter your prompt here..."
//                   value={prompt}
//                   onChange={(e) => setPrompt(e.target.value)}
//                   rows={4}
//                   className="w-full bg-white border border-gray-200 rounded-xl resize-none shadow-sm focus:ring-2 focus:ring-indigo-200"
//                 />
//               </div>

//               {contentType === "instagram" && (
//                 <div>
//                   <label className="block text-sm font-semibold mb-2 text-gray-700">
//                     Upload Image
//                   </label>
//                   <div className="flex items-center space-x-3">
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="image-upload"
//                     />
//                     <label
//                       htmlFor="image-upload"
//                       className="cursor-pointer flex items-center justify-center px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-colors shadow-sm"
//                     >
//                       <Upload className="mr-2 h-5 w-5 text-indigo-400" />
//                       <span>Upload Image</span>
//                     </label>
//                     {image && (
//                       <span className="text-sm text-gray-500">
//                         {image.name}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               )}

//               <Button
//                 onClick={handleGenerate}
//                 disabled={
//                   isLoading ||
//                   !prompt ||
//                   userPoints === null ||
//                   userPoints < POINTS_PER_GENERATION
//                 }
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow transition-colors text-lg disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                     Generating...
//                   </>
//                 ) : (
//                   `Generate Content (${POINTS_PER_GENERATION} points)`
//                 )}
//               </Button>
//             </section>

//             {/* Generated content display */}
//             {(selectedHistoryItem || generatedContent.length > 0) && (
//               <section className="bg-white/90 border border-indigo-100 shadow-lg rounded-2xl px-4 py-6 sm:px-8 sm:py-8 space-y-3 sm:space-y-4">
//                 <h2 className="text-xl font-bold text-indigo-600">
//                   {selectedHistoryItem ? "History Item" : "Generated Content"}
//                 </h2>
//                 {contentType === "twitter" ? (
//                   <div className="space-y-4">
//                     {(selectedHistoryItem
//                       ? selectedHistoryItem.content.split("\n\n")
//                       : generatedContent
//                     ).map((tweet, index) => (
//                       <div
//                         key={index}
//                         className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl relative shadow-sm"
//                       >
//                         <ReactMarkdown
//                           components={{
//                             p: ({node, ...props }) => (
//                               <p className="prose max-w-none mb-2 text-sm text-gray-800" {...props} />
//                             ),
//                           }}
//                         >
//                           {tweet}
//                         </ReactMarkdown>

//                         <div className="flex justify-between items-center text-gray-400 text-xs mt-2">
//                           <span>
//                             {tweet.length}/{MAX_TWEET_LENGTH}
//                           </span>
//                           <Button
//                             onClick={() => copyToClipboard(tweet)}
//                             className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full p-2 transition-colors shadow"
//                           >
//                             <Copy className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl shadow-sm">
//                     <ReactMarkdown
//                       components={{
//                         p: ({ node, ...props }) => (
//                           <p className="prose max-w-none text-sm text-gray-800" {...props} />
//                         ),
//                       }}
//                     >
//                       {selectedHistoryItem ? selectedHistoryItem.content : generatedContent[0]}
//                     </ReactMarkdown>
//                   </div>
//                 )}
//               </section>
//             )}

//             {/* Content preview */}
//             {generatedContent.length > 0 && (
//               <section className="bg-white/90 border border-indigo-100 shadow-lg rounded-2xl px-4 py-6 sm:px-8 sm:py-8">
//                 <h2 className="text-xl font-bold mb-4 text-indigo-600">
//                   Preview
//                 </h2>
//                 {renderContentMock()}
//               </section>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Upload,
  Copy,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  Zap,
} from "lucide-react";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { TwitterMock } from "@/components/social-mocks/TwitterMock";
import { InstagramMock } from "@/components/social-mocks/InstagramMock";
import { LinkedInMock } from "@/components/social-mocks/LinkedlnMock";
import Link from "next/link";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const contentTypes = [
  { value: "twitter", label: "Twitter Thread" },
  { value: "instagram", label: "Instagram Caption" },
  { value: "linkedin", label: "LinkedIn Post" },
];

const MAX_TWEET_LENGTH = 280;
const POINTS_PER_GENERATION = 5;

interface HistoryItem {
  id: number;
  contentType: string;
  prompt: string;
  content: string;
  createdAt: Date;
}

export default function GenerateContent() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [contentType, setContentType] = useState(contentTypes[0].value);
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] =
    useState<HistoryItem | null>(null);

  useEffect(() => {
    if (!apiKey) {
      console.error("Gemini API key is not set");
    }
  }, []);

  const fetchUserPoints = useCallback(async () => {
    if (user?.id) {
      try {
        const res = await fetch(`/api/user-points?userId=${user.id}`);
        const data = await res.json();
        setUserPoints(data.points);
        if (data.points === 0) {
          const updateRes = await fetch('/api/user-update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clerkUserId: user.id,
              email: user.emailAddresses[0].emailAddress,
              name: user.fullName || ""
            })
          });
          const updateData = await updateRes.json();
          if (updateData.updated?.points !== undefined) {
            setUserPoints(updateData.updated.points);
          }
        }
      } catch{
        setUserPoints(0);
      }
    }
  }, [user?.id, user?.emailAddresses, user?.fullName]);

  const fetchContentHistory = useCallback(async () => {
    if (user?.id) {
      try {
        const res = await fetch(`/api/generated-content?userId=${user.id}`);
        const data = await res.json();
        setHistory(data.history || []);
      } catch  {
        setHistory([]);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    } else if (isSignedIn && user) {
      console.log("User loaded:", user);
      fetchUserPoints();
      fetchContentHistory();
    }
  }, [isLoaded, isSignedIn, user, router, fetchUserPoints, fetchContentHistory]);

  const handleGenerate = async () => {
    if (
      !genAI ||
      !user?.id ||
      userPoints === null ||
      userPoints < POINTS_PER_GENERATION
    ) {
      alert("Not enough points or API key not set.");
      return;
    }

    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      let promptText = `Generate ${contentType} content about "${prompt}".`;
      if (contentType === "twitter") {
        promptText += " Provide a thread of 5 tweets, each under 280 characters.";
      }

      let imagePart: Part | null = null;
      if (contentType === "instagram" && image) {
        const reader = new FileReader();
        const imageData = await new Promise<string>((resolve) => {
          reader.onload = (e) => {
            if (e.target && typeof e.target.result === "string") {
              resolve(e.target.result);
            } else {
              resolve("");
            }
          };
          reader.readAsDataURL(image);
        });

        const base64Data = imageData.split(",")[1];
        if (base64Data) {
          imagePart = {
            inlineData: {
              data: base64Data,
              mimeType: image.type,
            },
          };
        }
        promptText += " Describe the image and incorporate it into the caption.";
      }

      const parts: (string | Part)[] = [promptText];
      if (imagePart) parts.push(imagePart);

      const result = await model.generateContent(parts);
      const generatedText = result.response.text();

      let content: string[];
      if (contentType === "twitter") {
        content = generatedText
          .split("\n\n")
          .filter((tweet) => tweet.trim() !== "");
      } else {
        content = [generatedText];
      }

      setGeneratedContent(content);

      const updateRes = await fetch('/api/user-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, points: -POINTS_PER_GENERATION })
      });
      const updateData = await updateRes.json();
      if (updateData.updated?.points !== undefined) {
        setUserPoints(updateData.updated.points);
      }

      const saveRes = await fetch('/api/generated-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          content: content.join("\n\n"),
          prompt,
          contentType
        })
      });
      const saveData = await saveRes.json();
      if (saveData.saved) {
        setHistory((prevHistory) => [saveData.saved, ...prevHistory]);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedContent(["An error occurred while generating content."]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryItemClick = (item: HistoryItem) => {
    setSelectedHistoryItem(item);
    setContentType(item.contentType);
    setPrompt(item.prompt);
    setGeneratedContent(
      item.contentType === "twitter"
        ? item.content.split("\n\n")
        : [item.content]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderContentMock = () => {
    if (generatedContent.length === 0) return null;

    switch (contentType) {
      case "twitter":
        return <TwitterMock content={generatedContent} />;
      case "instagram":
        return <InstagramMock content={generatedContent[0]} userName={user?.fullName || user?.username || "InstagramUser"} uploadedImageUrl={image ? URL.createObjectURL(image) : undefined} />;
      case "linkedin":
        return <LinkedInMock content={typeof generatedContent[0] === 'string' ? generatedContent[0] : ''} userName={user?.fullName || user?.username || 'LinkedInUser'} userTitle={ 'Your Title'} />;
      default:
        return null;
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-center bg-[#111111] p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to  Hello AI and the Open Source Conteng Generated App
          </h1>
          <p className="text-gray-400 mb-6">
            To start generating amazing content, please sign in or create an
            account.
          </p>
          <SignInButton mode="modal">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
              Sign In / Sign Up
            </Button>
          </SignInButton>
          <p className="text-gray-500 mt-4 text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    );
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 text-gray-900 antialiased flex flex-col mt-[50px] sm:mt-0">
      <Navbar />
      <BackgroundAnimation />
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10 flex-1 w-full">
        <div className="grid grid-cols-1 gap-6 sm:gap-10 mt-6 sm:mt-10 lg:grid-cols-3">
          {/* Sidebar - History */}
          <aside className="lg:col-span-1 bg-white/70 rounded-2xl p-4 sm:p-6 h-80 sm:h-[calc(100vh-12rem)] overflow-y-auto shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-indigo-600 tracking-tight">History</h2>
              <Clock className="h-5 w-5 text-indigo-400" />
            </div>
            <div className="space-y-2 sm:space-y-3">
              {history.length === 0 ? (
                <div className="text-gray-400 text-sm text-center py-12">No history yet.</div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer shadow-sm"
                    onClick={() => handleHistoryItemClick(item)}
                  >
                    <div className="flex items-center mb-1">
                      {item.contentType === "twitter" && (
                        <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                      )}
                      {item.contentType === "instagram" && (
                        <Instagram className="mr-2 h-4 w-4 text-pink-400" />
                      )}
                      {item.contentType === "linkedin" && (
                        <Linkedin className="mr-2 h-4 w-4 text-blue-600" />
                      )}
                      <span className="text-xs font-semibold capitalize text-gray-700">
                        {item.contentType}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {item.prompt}
                    </p>
                    <div className="flex items-center text-[11px] text-gray-400 mt-1">
                      <Clock className="mr-1 h-3 w-3" />
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>

          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Points display */}
            <section className="bg-white/90 border border-indigo-100 shadow-lg rounded-2xl px-4 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center bg-yellow-100 rounded-full w-12 h-12">
                  <Zap className="h-7 w-7 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Available Points</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {userPoints !== null ? userPoints : "Loading..."}
                  </p>
                </div>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-full shadow transition">
                <Link href="/pricing">Get More Points</Link>
              </Button>
            </section>

            {/* Content generation form */}
            <section className="bg-white/90 border border-indigo-100 shadow-lg rounded-2xl px-4 py-6 sm:px-8 sm:py-8 space-y-5 sm:space-y-7">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Content Type
                </label>
                <Select
                  onValueChange={setContentType}
                  defaultValue={contentType}
                >
                  <SelectTrigger className="w-full bg-white border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-200">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          {type.value === "twitter" && (
                            <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                          )}
                          {type.value === "instagram" && (
                            <Instagram className="mr-2 h-4 w-4 text-pink-400" />
                          )}
                          {type.value === "linkedin" && (
                            <Linkedin className="mr-2 h-4 w-4 text-blue-600" />
                          )}
                          <span className="text-gray-700 font-medium">{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Prompt
                </label>
                <Textarea
                  id="prompt"
                  placeholder="Enter your prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full bg-white border border-gray-200 rounded-xl resize-none shadow-sm focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              {contentType === "instagram" && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Upload Image
                  </label>
                  <div className="flex items-center space-x-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex items-center justify-center px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-colors shadow-sm"
                    >
                      <Upload className="mr-2 h-5 w-5 text-indigo-400" />
                      <span>Upload Image</span>
                    </label>
                    {image && (
                      <span className="text-sm text-gray-500">
                        {image.name}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={
                  isLoading ||
                  !prompt ||
                  userPoints === null ||
                  userPoints < POINTS_PER_GENERATION
                }
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow transition-colors text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  `Generate Content (${POINTS_PER_GENERATION} points)`
                )}
              </Button>
            </section>



            {/* Generated content display */}
            {(selectedHistoryItem || generatedContent.length > 0) && (
              <section className="bg-white/90 border border-indigo-100 shadow-lg rounded-2xl px-4 py-6 sm:px-8 sm:py-8 space-y-3 sm:space-y-4">
                <h2 className="text-xl font-bold text-indigo-600">
                  {selectedHistoryItem ? "History Item" : "Generated Content"}
                </h2>
                {contentType === "twitter" ? (
                  <div className="space-y-4">
                    {(selectedHistoryItem
                      ? selectedHistoryItem.content.split("\n\n")
                      : generatedContent
                    ).map((tweet, index) => (
                      <div
                        key={index}
                        className="bg-indigo-50 border  border-indigo-100 p-4 rounded-xl relative shadow-sm"
                      >
                        <ReactMarkdown
                          components={{
                            p: ({...props }) => (
                              <p className="prose max-w-none mb-2 text-sm text-gray-800 gap-4" {...props} />
                            ),
                          }}
                        >
                          {tweet}
                        </ReactMarkdown>

                        <div className="flex justify-between items-center text-gray-400 text-xs mt-2">
                          <span>
                            {tweet.length}/{MAX_TWEET_LENGTH}
                          </span>
                          <Button
                            onClick={() => copyToClipboard(tweet)}
                            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full p-2 transition-colors shadow"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl shadow-sm">
                    <ReactMarkdown
                      components={{
                        p: ({...props }) => (
                          <p className="prose max-w-none text-sm text-gray-800 gap-4 break-words" {...props} />
                        ),
                      }}
                    >
                      {selectedHistoryItem ? selectedHistoryItem.content : generatedContent[0]}
                    </ReactMarkdown>
                  </div>
                )}
              </section>
            )}

            {/* Content preview */}
            {generatedContent.length > 0 && (
              <section className="bg-white/90 border border-indigo-100 shadow-lg rounded-2xl px-4 py-6 sm:px-8 sm:py-8">
                <h2 className="text-xl font-bold mb-4 text-indigo-600 break-words">
                  Preview
                </h2>
                {renderContentMock()}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

