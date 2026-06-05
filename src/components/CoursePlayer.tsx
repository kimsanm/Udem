/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckSquare, 
  Square, 
  Star, 
  MessageSquare, 
  BookOpen, 
  Book, 
  ArrowRight,
  Sparkles,
  Send,
  Sparkle
} from "lucide-react";
import { Course, Lecture, Review, AppLanguage } from "../types";

interface CoursePlayerProps {
  course: Course;
  language: AppLanguage;
  onBack: () => void;
  completedLectures: string[];
  onToggleLecture: (lectureId: string) => void;
  onAddReview: (courseId: string, review: Review) => void;
  onLectureAccessed?: (courseId: string, lectureId: string) => void;
  initialLectureId?: string | null;
}

export default function CoursePlayer({
  course,
  language,
  onBack,
  completedLectures,
  onToggleLecture,
  onAddReview,
  onLectureAccessed,
  initialLectureId,
}: CoursePlayerProps) {
  
  // Find first lecture or use initial lecture if provided
  const allLectures = course.chapters.flatMap(ch => ch.lectures);
  const [activeLecture, setActiveLecture] = useState<Lecture>(() => {
    if (initialLectureId) {
      const found = allLectures.find(lec => lec.id === initialLectureId);
      if (found) return found;
    }
    return allLectures[0] || null;
  });
  const [activeTab, setActiveTab] = useState<"overview" | "qa" | "reviews">("overview");

  // Video Simulator states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Q&A states
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string; isAi?: boolean }>>([
    {
      sender: "Professor Sok",
      text: language === "km" 
        ? "សួស្តីសិស្សានុសិស្សទាំងអស់គ្នា! តើអ្នកមានចម្ងល់អ្វីទាក់ទងនឹងមេរៀននេះទេ?"
        : "Welcome back! Do you have any questions parsing the current lesson material or standard code repositories?",
      time: "9:15 AM",
      isAi: true
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Review states
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // Parse lecture duration to seconds
  const getDurationInSeconds = (durationStr: string): number => {
    const parts = durationStr.split(":");
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 600; // fallback 10 mins
  };

  const totalDurationSeconds = activeLecture ? getDurationInSeconds(activeLecture.duration) : 600;

  // Video timeline simulation Tick
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= totalDurationSeconds) {
            setIsPlaying(false);
            if (activeLecture && !completedLectures.includes(activeLecture.id)) {
              onToggleLecture(activeLecture.id);
            }
            return totalDurationSeconds;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeLecture, totalDurationSeconds, completedLectures]);

  // Reset timer on active lecture swap
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, [activeLecture]);

  // Track lecture access
  useEffect(() => {
    if (activeLecture && onLectureAccessed) {
      onLectureAccessed(course.id, activeLecture.id);
    }
  }, [activeLecture, course.id, onLectureAccessed]);

  // Format second to timer MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      sender: "You (អ្នក)",
      text: newMessage,
      time: "Just now",
      isAi: false
    };

    setMessages(prev => [...prev, userMsg]);
    setNewMessage("");

    // Simulate AI/Professor response
    setTimeout(() => {
      const answersKm = [
        "សំណួរល្អណាស់! ចំនុចនេះយើងត្រូវប្រុងប្រយ័ត្នលើ dependencies arrays ដើម្បីកុំឱ្យមានការ re-fetch ឥតកំណត់។",
        "ប្រាកដណាស់! អ្នកអាចទាញយកគំរូកូដគ្រោងខាងក្រោមការណែនាំ ដើម្បីយកទៅផ្ទៀងផ្ទាត់លើទូរស័ព្ទដៃ ឬឧបករណ៍របស់អ្នក។",
        "អូ! នេះគឺជាបញ្ហា node integration។ សាកល្បងលុប node_modules និង package-lock.json រួចវាយ npm install ម្តងទៀត។"
      ];
      const answersEn = [
        "Excellent question! Ensure your dependency arrays are properly stabilized with primitive key references.",
        "Yes, absolutely. High-fidelity layouts can be extracted straight from Figma assets or public community packs.",
        "That occurs when Express v5 handles wildcard parameters. Try utilizing the updated routing schemas illustrated in the docs."
      ];

      const pool = language === "km" ? answersKm : answersEn;
      const aiReply = pool[Math.floor(Math.random() * pool.length)];

      setMessages(prev => [...prev, {
        sender: "Professor Sok",
        text: aiReply,
        time: "Just now",
        isAi: true
      }]);
    }, 1500);
  };

  // Handle add review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-added-${Date.now()}`,
      username: "សិស្សសិក្សា (You)",
      rating: reviewRating,
      date: new Date().toISOString().split("T")[0],
      comment: reviewComment
    };

    onAddReview(course.id, newRev);
    setReviewComment("");
    alert(language === "km" ? "អរគុណសម្រាប់ការវាយតម្លៃវគ្គសិក្សានេះ!" : "Thank you for your feedback!");
  };

  const courseTitle = language === "km" && course.titleKh ? course.titleKh : course.title;
  const progressPercent = Math.round((completedLectures.length / allLectures.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white" id={`player-container-${course.id}`}>
      
      {/* 1. Player Navigation Header */}
      <div className="flex h-14 items-center justify-between border-b border-gray-800 bg-slate-900 px-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          id="player-back-btn"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{language === "km" ? "ត្រឡប់ក្រោយ" : "Back to Dashboard"}</span>
        </button>

        {/* Course Title and progress indicator */}
        <div className="flex-grow text-center max-w-lg mx-4">
          <h2 className="text-xs sm:text-sm font-bold truncate text-gray-100">{courseTitle}</h2>
          <div className="mt-1 hidden sm:flex items-center justify-center space-x-2">
            <div className="w-32 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-[10px] font-bold text-gray-400">{progressPercent}% {language === "km" ? "បានបញ្ចប់" : "completed"}</span>
          </div>
        </div>

        <div className="text-xs text-indigo-400 font-bold bg-indigo-950 border border-indigo-900 px-2.5 py-1 rounded-full shrink-0">
          {completedLectures.length}/{allLectures.length} {language === "km" ? "មេរៀន" : "completed"}
        </div>
      </div>

      {/* 2. Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-3.5rem)] overflow-hidden">
        
        {/* Left Column (8 cols): Streaming Stream Screen + Tab content */}
        <div className="lg:col-span-8 flex flex-col h-full overflow-y-auto bg-slate-950">
          
          {/* Main Video simulated container */}
          <div className="aspect-video w-full bg-black relative flex flex-col justify-between selection:bg-indigo-500/50" id="video-sim-board">
            
            {/* Ambient visual overlay when paused */}
            {!isPlaying && currentTime === 0 && (
              <div className="absolute inset-0 bg-slate-950/80 z-10 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider">{language === "km" ? "កំពុងរង់ចាំបង្កើនការយល់ដឹង" : "REACTION ENGINE READY"}</p>
                <h2 className="text-white text-base font-bold mt-2 max-w-md">{activeLecture?.title}</h2>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-transform hover:scale-105"
                  id="media-play-centered-btn"
                >
                  <Play className="h-6 w-6 fill-current translate-x-0.5" />
                </button>
              </div>
            )}

            {/* Video content micro visualization */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden font-mono select-none">
              
              {/* Dynamic canvas visualizations mimicking real course streams */}
              {course.category === "Programming" && (
                <div className={`text-left text-xs max-w-xl transition-all duration-500 h-44 overflow-hidden w-full ${isPlaying ? "opacity-60 blur-[0.5px]" : "opacity-30"}`}>
                  <div className="text-indigo-400">import &#123; createServer &#125; from 'vite';</div>
                  <div className="text-purple-400">const app = express();</div>
                  <div className="text-gray-500">// Simulating active code compile sequence {currentTime}s</div>
                  <div className="text-emerald-400">app.use(express.json());</div>
                  <div className="text-amber-400">app.get('/api/users', (req, res) =&gt; &#125;</div>
                  <div className="text-blue-400">&nbsp;&nbsp;const users = await db.select().from(usersTable);</div>
                  <div className="text-sky-300">&nbsp;&nbsp;return res.json(users);</div>
                  <div className="text-amber-400">&#125;);</div>
                  <div className="text-pink-500">app.listen(3000, '0.0.0.0', () =&gt; &apos;compiled&apos;);</div>
                </div>
              )}

              {course.category === "Design" && (
                <div className="flex flex-col items-center space-y-4">
                  <div className={`flex items-center justify-center border-2 border-dashed border-slate-700 rounded-lg p-6 w-60 h-32 transition-colors ${isPlaying ? "bg-indigo-600/10 border-indigo-500/50" : "bg-transparent"}`}>
                    <div className="text-center">
                      <div className="text-indigo-400 text-xs font-semibold uppercase">Auto-Layout Grid</div>
                      <div className="text-gray-500 text-[10px] mt-1">Width: {Math.min(375, 200 + currentTime * 4)}px</div>
                    </div>
                  </div>
                </div>
              )}

              {course.category !== "Programming" && course.category !== "Design" && (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className={`h-12 w-12 rounded-full border-2 border-indigo-500 flex items-center justify-center text-indigo-400 mb-3 ${isPlaying ? "animate-spin" : ""}`}>
                    <Sparkle className="h-5 w-5" />
                  </div>
                  <p className="text-xs text-gray-300 italic">{language === "km" ? "កំពុងផ្សាយមេរៀន..." : "Streaming class materials..."}</p>
                </div>
              )}

            </div>

            {/* Video Controls footer bar */}
            <div className="h-12 bg-slate-900/90 flex items-center justify-between px-4 text-xs select-none">
              
              {/* Play/Pause control */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-gray-300 hover:text-white transition-colors"
                id="media-toggle-btn"
              >
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
              </button>

              {/* Slider timeline */}
              <div className="flex-1 mx-4 flex items-center space-x-2">
                <span className="font-mono text-[10px] text-gray-400">{formatTime(currentTime)}</span>
                <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden relative group cursor-pointer">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300" 
                    style={{ width: `${(currentTime / totalDurationSeconds) * 100}%` }} 
                  />
                </div>
                <span className="font-mono text-[10px] text-gray-400">/{activeLecture?.duration}</span>
              </div>

            </div>

          </div>

          {/* Sub Navigation tabs */}
          <div className="border-b border-gray-800 bg-slate-900 px-4 flex space-x-6 text-sm select-none" id="player-tabs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-3.5 border-b-2 font-bold px-1 transition-colors ${
                activeTab === "overview" ? "border-indigo-500 text-indigo-400" : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {language === "km" ? "ទិដ្ឋភាពទូទៅ" : "Overview"}
            </button>
            <button
              onClick={() => setActiveTab("qa")}
              className={`py-3.5 border-b-2 font-bold px-1 transition-colors flex items-center space-x-1.5 ${
                activeTab === "qa" ? "border-indigo-500 text-indigo-400" : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{language === "km" ? "សំណួរ & ចម្លើយ" : "Q&A AI Assist"}</span>
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-3.5 border-b-2 font-bold px-1 transition-colors ${
                activeTab === "reviews" ? "border-indigo-500 text-indigo-400" : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {language === "km" ? "វាយតម្លៃវគ្គសិក្សា" : "Write Review"}
            </button>
          </div>

          {/* Sub Panel Details container */}
          <div className="p-6 text-gray-300 leading-relaxed max-w-3xl">
            
            {activeTab === "overview" && (
              <div id="overview-tab-content">
                <h3 className="text-lg font-bold text-white mb-2">{activeLecture?.title}</h3>
                <p className="text-sm font-light text-gray-300 mt-2">
                  {activeLecture?.summary}
                </p>

                <div className="mt-8 border-t border-gray-800 pt-6">
                  <h4 className="text-white font-bold text-sm mb-3">{language === "km" ? "អំពីគ្រូបង្រៀន" : "About the Instructor"}</h4>
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructorName}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-800"
                    />
                    <div>
                      <h5 className="text-sm font-bold text-gray-100">{course.instructorName}</h5>
                      <p className="text-xs text-indigo-400">{course.instructorTitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "qa" && (
              <div className="space-y-4" id="qa-tab-content">
                <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-900/50 p-3 rounded-lg text-xs text-indigo-200 mb-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4.5 w-4.5 text-indigo-400 animate-pulse shrink-0" />
                    <span>{language === "km" ? "ជំនួយការឆ្លាតវៃ AI ៖ សួរចម្ងល់មេរៀនភ្លាមៗ" : "AI Assist: Ask anything about this curriculum!"}</span>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-3 pr-2 scrollbar-none" id="messages-box">
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col p-3 rounded-xl max-w-lg ${
                        msg.isAi 
                          ? "bg-slate-900 self-start" 
                          : "bg-indigo-600/30 border border-indigo-500/20 text-indigo-100 ml-auto"
                      }`}
                    >
                      <span className="text-[10px] text-gray-400 font-bold mb-1">{msg.sender}</span>
                      <p className="text-xs">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="mt-4 flex items-center space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={language === "km" ? "សួរសំណួររបស់អ្នកនៅទីនេះ..." : "Type your query here..."}
                    className="flex-1 text-xs bg-slate-900 border border-slate-700 rounded-lg p-2.5 px-4 outline-none focus:border-indigo-505"
                  />
                  <button
                    type="submit"
                    className="h-9 w-9 bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center justify-center text-white transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            )}

            {activeTab === "reviews" && (
              <div id="reviews-tab-content">
                <h3 className="text-sm font-bold text-white mb-2">{language === "km" ? "វាយតម្លៃលើវគ្គសិក្សានេះ" : "Leave a Class Review"}</h3>
                
                <form onSubmit={handleReviewSubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-1.5">{language === "km" ? "ជ្រើសរើសពិន្ទុផ្កាយ" : "Star Rating"}</label>
                    <div className="flex space-x-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setReviewRating(s)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star className={`h-6 w-6 ${s <= reviewRating ? "fill-current" : "text-gray-600"}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-1.5">{language === "km" ? "សរសេរមតិយោបល់សិក្សារបស់អ្នក" : "Your detailed review comments"}</label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows={3}
                      placeholder={language === "km" ? "មេរៀននេះពិតជា..." : "This material was truly helpful because..."}
                      className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                  >
                    {language === "km" ? "ផ្ញើការវាយតម្លៃ" : "Submit Feedback"}
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

        {/* Right Column (4 cols): Course Syllabus List Sidepanel */}
        <div className="lg:col-span-4 border-l border-gray-800 bg-slate-900 flex flex-col h-full overflow-y-auto">
          
          <div className="p-4 border-b border-gray-800 shrink-0">
            <h3 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">{language === "km" ? "មាតិកាវគ្គសិក្សា" : "Course Contents"}</h3>
          </div>

          <div className="flex-1 divide-y divide-gray-800/80">
            {course.chapters.map((chapter) => (
              <div key={chapter.id} className="p-4">
                <span className="text-xs font-bold text-gray-400 block mb-3 leading-relaxed">{chapter.title}</span>
                <div className="space-y-4">
                  {chapter.lectures.map((lecture) => {
                    const isActive = activeLecture?.id === lecture.id;
                    const isCompleted = completedLectures.includes(lecture.id);
                    return (
                      <div
                        key={lecture.id}
                        className={`flex items-start justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                          isActive ? "bg-slate-800" : "hover:bg-slate-800/45"
                        }`}
                        id={`player-lecture-${lecture.id}`}
                        onClick={() => setActiveLecture(lecture)}
                      >
                        <div className="flex items-start space-x-2.5 flex-1 pr-2">
                          {/* Toggle complete mark */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleLecture(lecture.id);
                            }}
                            className="mt-0.5 text-indigo-500 hover:text-indigo-400 shrink-0"
                            id={`lecture-complete-toggle-${lecture.id}`}
                          >
                            {isCompleted ? <CheckSquare className="h-4.5 w-4.5" /> : <Square className="h-4.5 w-4.5 text-gray-600" />}
                          </button>

                          <div className="text-left">
                            <span className={`text-xs font-semibold block leading-tight ${
                              isActive ? "text-indigo-400" : "text-gray-200"
                            }`}>
                              {lecture.title}
                            </span>
                          </div>
                        </div>

                        <span className="font-mono text-[10px] text-gray-500 shrink-0 mt-0.5">{lecture.duration}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
