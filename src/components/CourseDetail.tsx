/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Share2, 
  Award, 
  BookOpen, 
  Smartphone, 
  Infinity as InfinityIcon, 
  CheckCircle,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Zap
} from "lucide-react";
import { Course, AppLanguage } from "../types";

interface CourseDetailProps {
  course: Course;
  language: AppLanguage;
  onBack: () => void;
  onEnroll: (courseId: string) => void;
  onAddToCart: (courseId: string) => void;
  isEnrolled: boolean;
  isInCart: boolean;
}

export default function CourseDetail({
  course,
  language,
  onBack,
  onEnroll,
  onAddToCart,
  isEnrolled,
  isInCart,
}: CourseDetailProps) {
  const [openChapterId, setOpenChapterId] = useState<string | null>(course.chapters[0]?.id || null);
  const [sortBy, setSortBy] = useState<"recent" | "highest" | "oldest">("recent");

  const toggleChapter = (chapterId: string) => {
    if (openChapterId === chapterId) {
      setOpenChapterId(null);
    } else {
      setOpenChapterId(chapterId);
    }
  };

  const title = language === "km" && course.titleKh ? course.titleKh : course.title;
  const description = language === "km" ? course.descriptionKh : course.description;
  const longDescription = language === "km" ? course.longDescriptionKh : course.longDescription;
  const instructorTitle = course.instructorTitle;

  // Sorting logic for current reviews
  const sortedReviews = [...course.reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "highest") {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else { // oldest
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  // Total lectures and duration calculation
  const totalLectures = course.chapters.reduce(
    (count, ch) => count + ch.lectures.length, 
    0
  );

  const t = {
    back: language === "km" ? "ត្រឡប់ក្រោយ" : "Back to Courses",
    ratingTitle: language === "km" ? "ការវាយតម្លៃរបស់សិស្ស" : "Student Feedback",
    enrolledTitle: language === "km" ? "សិស្សសកម្ម" : "students enrolled",
    reviewsCount: language === "km" ? "ការវាយតម្លៃ" : "reviews",
    buyBtn: language === "km" ? "ទិញឥឡូវនេះ" : "Enroll Now",
    alreadyEnrolled: language === "km" ? "ចូលរៀន (បានជាវរួចហើយ)" : "Enrolled (Go to Player)",
    addToCart: language === "km" ? "ដាក់ក្នុងកន្ត្រក" : "Add to Cart",
    addedToCart: language === "km" ? "បានដាក់ក្នុងកន្ត្រក" : "Added to Cart",
    curriculum: language === "km" ? "មាតិកាវគ្គសិក្សា" : "Course Curriculum",
    aboutCourse: language === "km" ? "អំពីវគ្គសិក្សានេះ" : "About this Course",
    whoInstructor: language === "km" ? "អំពីគ្រូឧទ្ទេស" : "About the Instructor",
    whatYouWillLearn: language === "km" ? "អ្វីដែលអ្នកនឹងទទួលបាន" : "What you will learn",
    includes: language === "km" ? "អត្ថប្រយោជន៍រួមមាន៖" : "This course includes:",
    fullAccess: language === "km" ? "ការចូលមើលគ្មានដែនកំណត់" : "Full lifetime access",
    deviceAccess: language === "km" ? "រៀនបានទាំងលើទូរស័ព្ទ និងកុំព្យូទ័រ" : "Access on mobile and TV",
    certificate: language === "km" ? "វិញ្ញាបនបត្របញ្ជាក់ការសិក្សា" : "Certificate of completion",
  };

  const mockLearningPoints = language === "km"
    ? [
        "មូលដ្ឋានគ្រឹះស្ទាត់ជំនាញ និងយល់ច្បាស់ពីប្រព័ន្ធវិជ្ជាជីវៈ",
        "ការអនុវត្តផ្ទាល់ជាមួយគម្រោងជាក់ស្តែងដើម្បីកសាង Portfolio ដ៏រឹងមាំ",
        "ការដោះស្រាយបញ្ហានិងរៀបចំប្រព័ន្ធឱ្យមានប្រសិទ្ធភាពខ្ពស់",
        "គន្លឹះដោះស្រាយកំហុសកូដ និងដំណើរការលឿនប្រចាំអាជីពការងារ"
      ]
    : [
        "Industry standard foundational framework concepts detailed from scratch",
        "Step-by-step hands-on implementation to draft a solid career portfolio",
        "Techniques to debug, configure structures, and solve problems like a pro",
        "Practical lifecycle tips and optimizations to boost workplace productivity"
      ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12" id={`course-detail-view-${course.id}`}>
      
      {/* 1. Header Banner */}
      <div className="bg-slate-900 py-10 shadow-inner text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <button 
            onClick={onBack} 
            className="group mb-6 flex items-center space-x-2 text-sm font-medium text-indigo-300 hover:text-white transition-colors"
            id="back-to-list-btn"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{t.back}</span>
          </button>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {/* Category */}
              <div className="flex items-center space-x-2 text-xs font-bold tracking-wider text-indigo-400 uppercase">
                <span>{course.category}</span>
                <span>/</span>
                <span>{course.level}</span>
              </div>

              {/* Title */}
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-white" id="detail-title">
                {title}
              </h1>

              {/* Tagline */}
              <p className="mt-4 text-base text-gray-300 leading-relaxed font-light">
                {description}
              </p>

              {/* Statistics Row */}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-bold text-amber-400">{course.rating.toFixed(1)}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(course.rating) ? "fill-current" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-indigo-300 font-medium">
                    ({course.numReviews.toLocaleString()} {t.reviewsCount})
                  </span>
                </div>

                <div className="hidden h-4 w-[1px] bg-gray-700 sm:block" />

                <div className="text-gray-300">
                  <span className="font-semibold text-white">{course.studentsEnrolled.toLocaleString()}</span> {t.enrolledTitle}
                </div>

                <div className="hidden h-4 w-[1px] bg-gray-700 sm:block" />

                <div className="text-gray-300">
                  {language === "km" ? "បង្រៀនដោយ៖ " : "Instructor: "} <span className="font-medium text-white">{course.instructorName}</span>
                </div>
              </div>

              {/* Config details */}
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
                <span>{language === "km" ? "ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ៖ " : "Last updated: "} {course.lastUpdated}</span>
                <span>•</span>
                <span>{language === "km" ? "ភាសា៖ " : "Language: "} {course.language}</span>
              </div>

            </div>

            {/* Empty space on desktop for floating card overlap */}
            <div className="hidden lg:col-span-4 lg:block" />
          </div>

        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 font-sans">
          
          {/* Left panel: Info modules */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Learning Outcomes */}
            <div className="rounded-xl border border-gray-150 bg-white p-6 shadow-xs" id="learning-outcomes-container">
              <h2 className="text-lg font-bold text-gray-900">{t.whatYouWillLearn}</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {mockLearningPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="text-xs text-gray-700 leading-normal">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum collapsible map */}
            <div className="rounded-xl border border-gray-150 bg-white p-6 shadow-xs" id="curriculum-container">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">{t.curriculum}</h2>
                <div className="text-xs font-medium text-gray-500">
                  {course.chapters.length} {language === "km" ? "ជំពូក" : "chapters"} • {totalLectures} {language === "km" ? "វីដេអូ" : "lectures"}
                </div>
              </div>

              <div className="mt-4 divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                {course.chapters.map((chapter) => {
                  const isOpen = openChapterId === chapter.id;
                  return (
                    <div key={chapter.id} className="bg-white">
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="flex w-full items-center justify-between bg-gray-50/70 p-4 font-bold text-xs sm:text-sm text-gray-950 hover:bg-gray-50 transition-colors cursor-pointer"
                        id={`chapter-toggle-${chapter.id}`}
                      >
                        <span className="text-left leading-relaxed pr-4">{chapter.title}</span>
                        <div className="flex items-center space-x-3 shrink-0">
                          <span className="text-xs font-normal text-gray-500">{chapter.lectures.length} {language === "km" ? "មេរៀន " : "lectures"}</span>
                          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="divide-y divide-gray-100 bg-white" id={`chapter-lectures-${chapter.id}`}>
                          {chapter.lectures.map((lecture) => (
                            <div key={lecture.id} className="flex items-center justify-between p-3.5 px-4 hover:bg-gray-50/50">
                              <div className="flex items-center space-x-3 pr-4">
                                <PlayCircle className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                                <span className="text-xs font-medium text-gray-800 leading-snug">{lecture.title}</span>
                              </div>
                              <span className="text-xs font-mono text-gray-400 shrink-0">{lecture.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* About Course */}
            <div className="rounded-xl border border-gray-150 bg-white p-6 shadow-xs" id="about-container">
              <h2 className="text-lg font-bold text-gray-900">{t.aboutCourse}</h2>
              <div className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed space-y-4">
                <p>{longDescription}</p>
                <p>
                  {language === "km"
                    ? "វគ្គសិក្សានេះត្រូវបានរចនាឡើងយ៉ាងយកចិត្តទុកដាក់បំផុត ធានាថាសិស្សានុសិស្សទទួលបានទាំងចំណេះដឹងទ្រឹស្តីស៊ីជម្រៅ និងជំនាញបច្ចេកវិទ្យាជាក់ស្តែង ដែលក្រុមហ៊ុននានាកំពុងស្វែងរក។ អ្នកនឹងទទួលបានគន្លឹះដោះស្រាយកំហុសកូដ សិក្សាពីវដ្តជីវិតសូហ្វវែរ និងទទួលបានឯកសារជំនួយសម្រាប់ការសិក្សាពេញលេញ។"
                    : "Every lesson is highly structured with clear, concrete outcomes. Students get a perfect blend of high-level engineering theories alongside rich micro-challenges mimic real industry code bases. Extensive downloadable assets, starter template repos, and QA modules support you throughout the journey."}
                </p>
              </div>
            </div>

            {/* About Instructor */}
            <div className="rounded-xl border border-gray-150 bg-white p-6 shadow-xs" id="instructor-container">
              <h2 className="text-lg font-bold text-gray-900">{t.whoInstructor}</h2>
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructorName}
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-indigo-50 shrink-0"
                />
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900">{course.instructorName}</h3>
                  <p className="text-xs font-medium text-indigo-600">{instructorTitle}</p>
                  <p className="mt-2 text-xs text-gray-500 max-w-xl leading-relaxed">
                    {course.instructorBio || (language === "km" 
                      ? "គ្រូឧទ្ទេសដែលមានបទពិសោធន៍ជាច្រើនឆ្នាំក្នុងវិស័យការងារផ្ទាល់ ប្តេជ្ញាចិត្តជួយជំរុញសិស្សឱ្យក្លាយជាអ្នកអាជីព។" 
                      : "Experienced lead designer and developer focused on guiding students directly into professional software architecture careers.")}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Column */}
            <div className="rounded-xl border border-gray-150 bg-white p-6 shadow-xs" id="reviews-container">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900">{t.ratingTitle}</h2>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-gray-500 font-medium">{language === "km" ? "តម្រៀបតាម៖" : "Sort by:"}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "recent" | "highest" | "oldest")}
                    className="border border-gray-200 bg-white text-gray-700 font-bold px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all cursor-pointer"
                    id="reviews-sort-select"
                  >
                    <option value="recent">{language === "km" ? "ថ្មីៗបំផុត" : "Most Recent"}</option>
                    <option value="highest">{language === "km" ? "ការវាយតម្លៃខ្ពស់បំផុត" : "Highest Rated"}</option>
                    <option value="oldest">{language === "km" ? "ចាស់បំផុត" : "Oldest"}</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-stretch space-y-4 sm:space-y-0 sm:space-x-6 border-b border-gray-100 pb-6">
                <div className="flex flex-col items-center justify-center rounded-xl bg-indigo-50/50 p-6 text-center sm:w-1/3">
                  <span className="text-4xl font-extrabold text-indigo-600">{course.rating.toFixed(1)}</span>
                  <div className="flex text-amber-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-500 mt-1">{language === "km" ? "ពិន្ទុវគ្គសិក្សា" : "Course Rating"}</span>
                </div>
                
                <div className="flex-1 flex flex-col justify-center space-y-2 w-full">
                  {[[5, 78], [4, 15], [3, 5], [2, 1], [1, 1]].map(([stars, pct]) => (
                    <div key={stars} className="flex items-center text-xs">
                      <span className="w-8 shrink-0 font-medium text-gray-600">{stars} {language === "km" ? "ផ្កាយ" : "stars"}</span>
                      <div className="mx-3 flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 text-right font-medium text-gray-400">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="mt-6 divide-y divide-gray-100">
                {sortedReviews.length > 0 ? (
                  sortedReviews.map((rev) => (
                    <div key={rev.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-center space-x-3">
                        <img
                          src={rev.userAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"}
                          alt={rev.username}
                          referrerPolicy="no-referrer"
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-gray-900">{rev.username}</h4>
                          <span className="text-[10px] text-gray-400">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex text-amber-400 mt-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < rev.rating ? "fill-current" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-gray-600 leading-relaxed pr-4">
                        {rev.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-center text-gray-400 py-6">
                    {language === "km" ? "មិនទាន់មានការវាយតម្លៃនៅឡើយទេ។ ជាវវគ្គសិក្សាក្រោយពីដំបូងដើម្បីវាយតម្លៃ!" : "No student reviews yet. Be the first to review after enrolling!"}
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Right panel: Floating Sidebar buy/enroll card */}
          <div className="lg:col-span-4" id="detail-sidebar-card">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-gray-150 bg-white shadow-xl overflow-hidden font-normal text-xs text-gray-600">
              <div className="aspect-video w-full bg-slate-900 relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20">
                  <div className="rounded-full bg-white/90 p-4 text-indigo-600 shadow-md">
                    <PlayCircle className="h-8 w-8 fill-current" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                
                {/* Pricing summary */}
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-gray-900">${course.price}</span>
                  <span className="text-sm font-medium text-gray-400 line-through">${course.originalPrice}</span>
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-sm">
                    {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                  </span>
                </div>

                <p className="mt-2 text-[10px] text-red-500 font-bold flex items-center space-x-1">
                  <Zap className="h-3.5 w-3.5 fill-current animate-pulse shrink-0" />
                  <span>{language === "km" ? "ឱកាសលក់ពិសេស! នៅសល់តែ២ថ្ងៃទៀតប៉ុណ្ណោះក្នុងតម្លៃនេះ" : "Hot Deal! Only 2 days left at this price"}</span>
                </p>

                {/* Primary Actions */}
                <div className="mt-6 space-y-3">
                  {isEnrolled ? (
                    <button
                      onClick={() => onEnroll(course.id)}
                      className="w-full flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm h-11 transition-all select-none shadow-md shadow-emerald-100 cursor-pointer"
                      id="sidebar-player-btn"
                    >
                      <Zap className="h-4 w-4 fill-current" />
                      <span>{t.alreadyEnrolled}</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => onEnroll(course.id)}
                        className="w-full flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm h-11 transition-all select-none shadow-md shadow-indigo-100 cursor-pointer"
                        id="sidebar-enroll-btn"
                      >
                        <span>{t.buyBtn}</span>
                      </button>

                      <button
                        onClick={() => onAddToCart(course.id)}
                        disabled={isInCart}
                        className={`w-full flex items-center justify-center space-x-2 rounded-xl border font-bold text-sm h-11 transition-all select-none ${
                          isInCart
                            ? "bg-slate-50 border-gray-200 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 hover:bg-gray-50 text-gray-700 cursor-pointer"
                        }`}
                        id="sidebar-cart-btn"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>{isInCart ? t.addedToCart : t.addToCart}</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Inclusion features */}
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <strong className="text-xs font-bold text-gray-900 block mb-3">{t.includes}</strong>
                  <ul className="space-y-2.5">
                    <li className="flex items-center space-x-2 text-xs text-gray-600">
                      <InfinityIcon className="h-4 w-4 text-indigo-500 shrink-0" />
                      <span>{t.fullAccess}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-xs text-gray-600">
                      <Smartphone className="h-4 w-4 text-indigo-500 shrink-0" />
                      <span>{t.deviceAccess}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-xs text-gray-600">
                      <Award className="h-4 w-4 text-indigo-500 shrink-0" />
                      <span>{t.certificate}</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
