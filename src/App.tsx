/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
import CourseDetail from "./components/CourseDetail";
import CoursePlayer from "./components/CoursePlayer";
import InstructorDashboard from "./components/InstructorDashboard";
import CartModal from "./components/CartModal";

import { 
  initialCourses, 
  courseCategories 
} from "./data";
import { 
  Course, 
  CourseProgress, 
  AppLanguage, 
  Review 
} from "./types";
import { Sparkles, Compass, Lightbulb, BookOpen, AlertCircle, ArrowRight, Play, Award, Loader2 } from "lucide-react";

export default function App() {
  // 1. Core States
  const [language, setLanguage] = useState<AppLanguage>("km");
  const [activeTab, setActiveTab] = useState<"browse" | "learning" | "teach">("browse");
  
  // Persistent Storage synchronization
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem("udemy_khmer_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [cartItemIds, setCartItemIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("udemy_khmer_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Pre-enroll student into Course 1 (Bootcamp) as helper, so they can immediately learn!
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("udemy_khmer_enrolled");
    return saved ? JSON.parse(saved) : ["course-1"];
  });

  const [progresses, setProgresses] = useState<CourseProgress[]>(() => {
    const saved = localStorage.getItem("udemy_khmer_progress");
    return saved ? JSON.parse(saved) : [];
  });

  // Last accessed tracking state
  const [lastAccessed, setLastAccessed] = useState<{ courseId: string; lectureId: string } | null>(() => {
    const saved = localStorage.getItem("udemy_khmer_last_accessed");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLectureAccessed = (courseId: string, lectureId: string) => {
    const newVal = { courseId, lectureId };
    setLastAccessed(newVal);
    localStorage.setItem("udemy_khmer_last_accessed", JSON.stringify(newVal));
  };

  // Interactive View details
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activePlayerCourseId, setActivePlayerCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [downloadingCertId, setDownloadingCertId] = useState<string | null>(null);

  // Sync state modifications to LocalStorage
  useEffect(() => {
    localStorage.setItem("udemy_khmer_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("udemy_khmer_cart", JSON.stringify(cartItemIds));
  }, [cartItemIds]);

  useEffect(() => {
    localStorage.setItem("udemy_khmer_enrolled", JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  useEffect(() => {
    localStorage.setItem("udemy_khmer_progress", JSON.stringify(progresses));
  }, [progresses]);

  // Utility resets
  const handleHomeClick = () => {
    setSelectedCourseId(null);
    setActivePlayerCourseId(null);
  };

  // Cart Management helpers
  const handleAddToCart = (courseId: string) => {
    if (!cartItemIds.includes(courseId)) {
      setCartItemIds((prev) => [...prev, courseId]);
    }
  };

  const handleRemoveFromCart = (courseId: string) => {
    setCartItemIds((prev) => prev.filter((id) => id !== courseId));
  };

  const handleCheckout = () => {
    // Enroll inside all cart courses
    setEnrolledCourseIds((prev) => {
      const updated = [...new Set([...prev, ...cartItemIds])];
      return updated;
    });
    setCartItemIds([]); // clear
  };

  // Immediate single enroll (Buy Now)
  const handleImmediateEnroll = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds((prev) => [...prev, courseId]);
    }
    // Open in player
    setSelectedCourseId(null);
    setActivePlayerCourseId(courseId);
  };

  // Progress Lecture toggle checkboxes
  const handleToggleLecture = (lectureId: string) => {
    const targetCourseId = activePlayerCourseId;
    if (!targetCourseId) return;

    setProgresses((prev) => {
      const matchIndex = prev.findIndex((p) => p.courseId === targetCourseId);
      if (matchIndex > -1) {
        const item = prev[matchIndex];
        const updatedLectures = item.completedLectures.includes(lectureId)
          ? item.completedLectures.filter((id) => id !== lectureId)
          : [...item.completedLectures, lectureId];
        
        const updatedList = [...prev];
        updatedList[matchIndex] = { ...item, completedLectures: updatedLectures };
        return updatedList;
      } else {
        return [...prev, { courseId: targetCourseId, completedLectures: [lectureId] }];
      }
    });
  };

  // Student reviews creation helper inside Player Q&As or Review tabs
  const handleAddReview = (courseId: string, review: Review) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedReviews = [review, ...c.reviews];
          // Recalculate average score
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAvgRating = parseFloat((totalRating / updatedReviews.length).toFixed(1));
          return {
            ...c,
            reviews: updatedReviews,
            rating: newAvgRating,
            numReviews: updatedReviews.length
          };
        }
        return c;
      })
    );
  };

  // Creator Dashboard Course creators
  const handleCreateCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  // Generate / Download simulated certificate PDF
  const handleDownloadCertificate = (e: React.MouseEvent, course: Course) => {
    e.stopPropagation();
    setDownloadingCertId(course.id);

    setTimeout(() => {
      const courseTitle = language === "km" && course.titleKh ? course.titleKh : course.title;
      const studentName = language === "km" ? "សិស្សសិក្សា (You)" : "Elite Scholar (You)";
      const completionDate = new Date().toLocaleDateString(language === "km" ? "km-KH" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      // Crafting an elegant academic certificate text-layout simulating an engineered PDF format
      const docContent = `
========================================================================
     _   _ ____  _____ __  ____     _  _  _   _ _____ ____  _____ 
    | | | |  _ \\| ____|  \\/  \\ \\   / / | | | | | | ____|  _ \\| ____|
    | | | | | | |  _| | |\\/| |\\ \\ / /  | |_| | | |  _| | |_) |  _|  
    | |_| | |_| | |___| |  | | \\ V /   |  _  | |_| |___|  _ <| |___ 
     \\___/|____/|_____|_|  |_|  \\_/    |_| |_|\\___/|_____|_| \\_\\_____|
                                                                   
                  UDEMY KHMER DIGITAL ACADEMY
========================================================================

                       CERTIFICATE OF COMPLETION

This international credential is proudly presented on this day to:

                         ${studentName.toUpperCase()}

for successfully presenting complete attendance, resolving all source
compiles, completing all dynamic visual layout grids, & demonstrating 
total curriculum mastery for:

Course:     "${courseTitle.toUpperCase()}"
Category:   ${course.category}
Instructor: ${course.instructorName} (${course.instructorTitle})

Issued On:  ${completionDate}
Verify Code: UK-CERT-${course.id.toUpperCase()}-${Date.now().toString().slice(-6)}

------------------------------------------------------------------------
"All of our dreams can come true if we have the courage to pursue them."
------------------------------------------------------------------------
Academic Board Endorsement:
Professor Sok, Executive Learning Director
Academy Registry Office (Phnom Penh, Cambodia)
========================================================================
`;

      const blob = new Blob([docContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Certificate_${course.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadingCertId(null);
      alert(
        language === "km"
          ? `វិញ្ញាបនបត្រសម្រាប់ការបញ្ចប់វគ្គសិក្សា "${courseTitle}" ត្រូវបានទាញយកដោយជោគជ័យ!`
          : `Simulated certificate PDF for "${courseTitle}" downloaded successfully!`
      );
    }, 1500);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  // Course selections getters
  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || null;
  const activePlayerCourse = courses.find((c) => c.id === activePlayerCourseId) || null;

  // Resolve last accessed details
  const lastAccessedCourse = lastAccessed ? courses.find((c) => c.id === lastAccessed.courseId) || null : null;
  const lastAccessedLecture = lastAccessedCourse 
    ? lastAccessedCourse.chapters.flatMap((ch) => ch.lectures).find((lec) => lec.id === lastAccessed.lectureId) || null
    : null;

  // Search and selector filters
  const filteredCourses = courses.filter((c) => {
    const titleText = language === "km" && c.titleKh ? c.titleKh : c.title;
    const descText = language === "km" ? c.descriptionKh : c.description;

    const matchesSearch = 
      titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      descText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const enrolledCoursesList = courses.filter((c) => enrolledCourseIds.includes(c.id));

  // Category Translation Helpers for filters
  const translateCategory = (cat: string) => {
    if (language === "en") return cat;
    switch (cat) {
      case "All": return "ទាំងអស់";
      case "Programming": return "សរសេរកូដ";
      case "Design": return "ការរចនា UX/UI";
      case "Business": return "អាជីវកម្ម";
      case "Languages": return "ភាសាបរទេស";
      default: return cat;
    }
  };

  // Khmer / English local translations for text elements
  const t = {
    heroTitle: language === "km" ? "អភិវឌ្ឍជំនាញការងារ និងព័ត៌មានវិទ្យាដ៏មានប្រសិទ្ធភាព" : "Upgrade Your Skills, Upgrade Your Future",
    heroDesc: language === "km" ? "ចូលរៀនវគ្គសិក្សាឌីជីថលល្អៗជាច្រើនជាមួយគ្រូឧទ្ទេសល្បីៗ និងទទួលបានវិញ្ញាបនបត្រទូទាំងប្រទេស។" : "Unlocks over 100+ micro-learning classes led by professional engineers and digital designers in Phnom Penh.",
    featuredTitle: language === "km" ? "វគ្គសិក្សាពេញនិយមបំផុត" : "Popular Handpicked Courses",
    noEnrollments: language === "km" ? "អ្នកមិនទាន់បានចុះឈ្មោះរៀនវគ្គសិក្សាណាមួយនៅឡើយទេ!" : "You haven't enrolled in any courses yet!",
    viewAllCourses: language === "km" ? "ស្វែងរកវគ្គសិក្សាឥឡូវនេះ" : "Browse Courses Now",
    backtoCatalog: language === "km" ? "ទំព័រដើម" : "Back to Home Catalog",
    promoBanner: language === "km" ? "ប្រើប្រាស់កូដ UDEMYKHMER ដើម្បីទទួលបានការបញ្ចុះតម្លៃ ៥០% លើគ្រប់វគ្គសិក្សា!" : "USE CODE 'UDEMYKHMER' AT CHECKOUT TO REDEEM 50% OFF ALL ENROLLMENTS!",
  };

  return (
    <div className="min-h-screen bg-gray-50/20 font-sans text-slate-800 antialiased" id="applet-root">
      
      {/* Dynamic Slide up Coupon Ticker */}
      <div className="bg-indigo-600 text-white py-2 text-center text-[10px] sm:text-xs font-bold tracking-wider relative overflow-hidden shrink-0 selection:bg-indigo-500">
        <span className="flex items-center justify-center space-x-1.5 animate-pulse">
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>{t.promoBanner}</span>
        </span>
      </div>

      {/* Primary Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Clean selections to avoid overlap
          setSelectedCourseId(null);
          setActivePlayerCourseId(null);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItemIds.length}
        openCartModal={() => setShowCart(true)}
        onHomeClick={handleHomeClick}
      />

      {/* Render View Layer Router */}

      {/* Case 1: Active Playable course screen (Immersive Classroom) */}
      {activePlayerCourse ? (
        <CoursePlayer
          course={activePlayerCourse}
          language={language}
          onBack={handleHomeClick}
          completedLectures={
            progresses.find((p) => p.courseId === activePlayerCourse.id)?.completedLectures || []
          }
          onToggleLecture={handleToggleLecture}
          onAddReview={handleAddReview}
          onLectureAccessed={handleLectureAccessed}
          initialLectureId={lastAccessed?.courseId === activePlayerCourse.id ? lastAccessed.lectureId : null}
        />
      ) : selectedCourse ? (
        
        /* Case 2: Specific Course Details Screen */
        <CourseDetail
          course={selectedCourse}
          language={language}
          onBack={handleHomeClick}
          onEnroll={handleImmediateEnroll}
          onAddToCart={handleAddToCart}
          isEnrolled={enrolledCourseIds.includes(selectedCourse.id)}
          isInCart={cartItemIds.includes(selectedCourse.id)}
        />
      ) : activeTab === "teach" ? (
        
        /* Case 3: Instructor Panel Mode Dashboard */
        <InstructorDashboard
          language={language}
          courses={courses}
          onCreateCourse={handleCreateCourse}
          onDeleteCourse={handleDeleteCourse}
        />
      ) : activeTab === "learning" ? (
        
        /* Case 4: My Enrolled Learning Space tab */
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" id="learning-workspace">
          <div className="border-b border-gray-150 pb-5 mb-8">
            <h1 className="text-xl font-bold text-gray-900">{language === "km" ? "មេរៀនរបស់ខ្ញុំ" : "My Learning Space"}</h1>
            <p className="text-xs text-gray-400 mt-1">{language === "km" ? "វគ្គសិក្សាទាំងអស់ដែលអ្នកបានជាវ និងកំពុងសិក្សា" : "Manage and watch your active registered courses"}</p>
          </div>

          {enrolledCoursesList.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="learning-courses-grid">
              {enrolledCoursesList.map((course) => {
                const totalLecs = course.chapters.flatMap(ch => ch.lectures).length;
                const completedLecs = progresses.find((p) => p.courseId === course.id)?.completedLectures.length || 0;
                const pct = Math.round((completedLecs / totalLecs) * 100) || 0;

                return (
                  <div
                    key={course.id}
                    onClick={() => setActivePlayerCourseId(course.id)}
                    className="group flex flex-col overflow-hidden rounded-xl bg-white border border-gray-150 shadow-xs cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    id={`enrolled-card-${course.id}`}
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-350"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-relaxed">
                          {language === "km" && course.titleKh ? course.titleKh : course.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 mt-1">{course.instructorName}</p>
                      </div>

                      {/* Progress checklist bar */}
                      <div className="mt-4 border-t border-gray-50 pt-3">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                          <span>{pct}% {language === "km" ? "បានបញ្ចូន" : "completed"}</span>
                          <span>{completedLecs}/{totalLecs} {language === "km" ? "មេរៀន" : "lectures"}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>

                        {pct === 100 && (
                          <button
                            onClick={(e) => handleDownloadCertificate(e, course)}
                            disabled={downloadingCertId !== null}
                            className="mt-3.5 w-full flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] h-9 px-3 rounded-lg transition-all shadow-md shadow-emerald-100 disabled:opacity-70 disabled:cursor-not-allowed"
                            id={`download-cert-${course.id}`}
                          >
                            {downloadingCertId === course.id ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                <span>{language === "km" ? "កំពុងបង្កើត..." : "Generating..."}</span>
                              </>
                            ) : (
                              <>
                                <Award className="h-4 w-4" />
                                <span>{language === "km" ? "ទាញយកវិញ្ញាបនបត្រ" : "Download Certificate"}</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center max-w-xl mx-auto mt-6" id="empty-learning-view">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-gray-400 mx-auto mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold text-gray-900">{t.noEnrollments}</p>
              <button
                onClick={() => setActiveTab("browse")}
                className="mt-6 inline-flex h-9 items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 rounded-lg tracking-wide shadow-md shadow-indigo-100 transition-colors"
                id="catalog-redirect-btn"
              >
                <span>{t.viewAllCourses}</span>
              </button>
            </div>
          )}

        </div>
      ) : (
        
        /* Case 5: Default General Course Catalog Browsing Mode */
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in" id="marketplace-catalog">
          
          {/* Main Hero Promotion Billboard (Bento styling) */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 text-white p-6 sm:p-10 mb-10 overflow-hidden relative" id="hero-banner-container">
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center space-x-1.5 bg-indigo-950 border border-indigo-900 rounded-full px-3 py-1 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">{language === "km" ? "ឱកាសសិក្សាដំបូង" : "OFFER VALUED"}</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl leading-tight text-white mb-4">
                {t.heroTitle}
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {t.heroDesc}
              </p>
            </div>
            
            {/* Visual gradient background elements */}
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute left-1/3 top-0 -translate-y-1/2 h-52 w-52 rounded-full bg-purple-500/5 blur-3xl" />
          </div>

          {/* Continue Watching hero section / Returning Students track panel */}
          {lastAccessedCourse && lastAccessedLecture && (
            <div className="mb-10 rounded-2xl bg-white border border-gray-150 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 relative overflow-hidden transition-all hover:shadow-md" id="continue-watching-hero">
              <div className="flex items-center space-x-4">
                <div 
                  onClick={() => {
                    setSelectedCourseId(null);
                    setActivePlayerCourseId(lastAccessedCourse.id);
                  }}
                  className="relative aspect-video w-24 sm:w-28 rounded-xl overflow-hidden bg-slate-955 shrink-0 border border-gray-150/50 cursor-pointer group"
                >
                  <img
                    src={lastAccessedCourse.thumbnail}
                    alt={lastAccessedCourse.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center transition-opacity group-hover:bg-black/35">
                    <div className="bg-white/95 text-indigo-600 rounded-full p-2 shadow-md">
                      <Play className="h-3 w-3 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1.5">
                    <BookOpen className="h-3 w-3" />
                    <span>{language === "km" ? "បន្តការសិក្សា" : "Continue Watching"}</span>
                  </div>
                  <h3 
                    onClick={() => {
                      setSelectedCourseId(null);
                      setActivePlayerCourseId(lastAccessedCourse.id);
                    }}
                    className="text-xs sm:text-sm font-black text-slate-950 leading-snug line-clamp-1 hover:text-indigo-650 cursor-pointer transition-colors"
                  >
                    {language === "km" && lastAccessedCourse.titleKh ? lastAccessedCourse.titleKh : lastAccessedCourse.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-1 flex items-center space-x-1">
                    <span className="font-bold text-indigo-600 select-none">
                      {language === "km" ? "មេរៀនចុងក្រោយ៖" : "Last Played:"}
                    </span>
                    <span className="text-gray-700 font-medium">
                      {lastAccessedLecture.title}
                    </span>
                  </p>
                </div>
              </div>

              {/* Progress & Quick resume action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-5 w-full md:w-auto md:border-l md:border-gray-150 md:pl-6 shrink-0">
                <div className="flex-1 sm:w-44 select-none">
                  {(() => {
                    const totalLecs = lastAccessedCourse.chapters.flatMap(ch => ch.lectures).length;
                    const completedLecs = progresses.find((p) => p.courseId === lastAccessedCourse.id)?.completedLectures.length || 0;
                    const pct = Math.round((completedLecs / totalLecs) * 100) || 0;
                    return (
                      <div>
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                          <span>{pct}% {language === "km" ? "បានបញ្ចប់" : "completed"}</span>
                          <span>{completedLecs}/{totalLecs} {language === "km" ? "មេរៀន" : "lessons"}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full transition-all duration-350" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <button
                  onClick={() => {
                    setSelectedCourseId(null);
                    setActivePlayerCourseId(lastAccessedCourse.id);
                  }}
                  className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-10 px-5 rounded-xl transition-all shadow-md shadow-indigo-100"
                  id="resume-watching-btn"
                >
                  <span>{language === "km" ? "ចូលរៀនឡើងវិញ" : "Resume Learning"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Category Filter Pills bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-5 mb-8" id="category-pills">
            {courseCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors uppercase ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white hover:bg-gray-100 border border-gray-150 text-gray-600"
                }`}
                id={`cat-pill-${cat}`}
              >
                <span>{translateCategory(cat)}</span>
              </button>
            ))}
          </div>

          {/* Heading */}
          <h2 className="text-base font-extrabold text-gray-950 mb-5">{t.featuredTitle}</h2>

          {/* Course Cards Layout Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" id="marketplace-grid">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  language={language}
                  onClick={() => setSelectedCourseId(course.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center" id="empty-catalog-fallback">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-gray-400 mx-auto mb-4">
                <AlertCircle className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold text-gray-900">{language === "km" ? "មិនមានវគ្គសិក្សាដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ" : "No courses match your query"}</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-6 text-indigo-600 hover:text-indigo-500 font-bold text-xs"
              >
                {language === "km" ? "បង្ហាញឡើងវិញទាំងអស់" : "Reset Filter Search"}
              </button>
            </div>
          )}

        </main>
      )}

      {/* Persistent slide over Slide-Cart element */}
      <CartModal
        language={language}
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cartItemIds={cartItemIds}
        courses={courses}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

    </div>
  );
}
