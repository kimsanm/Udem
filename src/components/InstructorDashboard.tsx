/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  PlusCircle, 
  Book, 
  DollarSign, 
  Users, 
  Star, 
  Trash2, 
  CheckCircle, 
  CheckSquare, 
  Sparkles,
  Layers,
  Sparkle
} from "lucide-react";
import { Course, Chapter, Lecture, AppLanguage } from "../types";

interface InstructorDashboardProps {
  language: AppLanguage;
  courses: Course[];
  onCreateCourse: (newCourse: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

export default function InstructorDashboard({
  language,
  courses,
  onCreateCourse,
  onDeleteCourse,
}: InstructorDashboardProps) {
  
  // States
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [titleKh, setTitleKh] = useState("");
  const [category, setCategory] = useState("Programming");
  const [price, setPrice] = useState("19.99");
  const [originalPrice, setOriginalPrice] = useState("79.99");
  const [description, setDescription] = useState("");
  const [descriptionKh, setDescriptionKh] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [longDescKh, setLongDescKh] = useState("");

  // Syllabus Chapters builders
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: "ch-custom-1",
      title: "Chapter 1: Getting Started (ជំពូកទី ១៖ ការចាប់ផ្តើម)",
      lectures: [
        {
          id: "lec-custom-1",
          title: "1.1 Introduction Outline (ការណែនាំដំបូង)",
          duration: "10:00",
          videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
          summary: "Initial overview regarding this curriculum topic."
        }
      ]
    }
  ]);

  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newLectureTitle, setNewLectureTitle] = useState("");
  const [newLectureDuration, setNewLectureDuration] = useState("12:15");
  const [selectedChapterId, setSelectedChapterId] = useState<string>("ch-custom-1");

  // Mock Unsplash cover arrays based on category
  const categoryCovers: { [key: string]: string } = {
    Programming: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600",
    Design: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&q=80&w=600",
    Business: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600",
    Languages: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600"
  };

  // Add Chapter helper
  const handleAddChapter = () => {
    if (!newChapterTitle.trim()) return;
    const newCh: Chapter = {
      id: `ch-custom-${Date.now()}`,
      title: newChapterTitle,
      lectures: []
    };
    setChapters(prev => [...prev, newCh]);
    setSelectedChapterId(newCh.id);
    setNewChapterTitle("");
  };

  // Add Lecture helpers
  const handleAddLecture = () => {
    if (!newLectureTitle.trim()) return;
    setChapters(prev => prev.map(ch => {
      if (ch.id === selectedChapterId) {
        const newLec: Lecture = {
          id: `lec-custom-${Date.now()}`,
          title: newLectureTitle,
          duration: newLectureDuration || "10:00",
          videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
          summary: `Summary breakdown regarding ${newLectureTitle}. Details are interactive.`
        };
        return {
          ...ch,
          lectures: [...ch.lectures, newLec]
        };
      }
      return ch;
    }));
    setNewLectureTitle("");
  };

  // Handle Publish Submit
  const handleSubmitPublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert(language === "km" ? "សូមបំពេញចំណងជើង និងការណែនាំសង្ខេប!" : "Please fill in the title and short description!");
      return;
    }

    const payload: Course = {
      id: `course-custom-${Date.now()}`,
      title,
      titleKh: titleKh || title,
      description,
      descriptionKh: descriptionKh || description,
      longDescription: longDesc || description,
      longDescriptionKh: longDescKh || descriptionKh || description,
      instructorName: "គ្រូធំ (Instructor Pro)",
      instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      instructorTitle: `${category} Lead Specialist`,
      rating: 5.0,
      numReviews: 0,
      studentsEnrolled: 0,
      price: parseFloat(price) || 19.99,
      originalPrice: parseFloat(originalPrice) || 79.99,
      thumbnail: categoryCovers[category] || categoryCovers["Programming"],
      category,
      lastUpdated: new Date().toISOString().split("T")[0].substring(0, 7),
      level: "All Levels",
      language: language === "km" ? "ភាសាខ្មែរ" : "English",
      chapters,
      reviews: [],
      isCustom: true
    };

    onCreateCourse(payload);
    setShowCreateForm(false);
    
    // Reset Form
    setTitle("");
    setTitleKh("");
    setDescription("");
    setDescriptionKh("");
    setLongDesc("");
    setLongDescKh("");
    setPrice("19.99");
    setOriginalPrice("79.99");
    setChapters([
      {
        id: "ch-custom-1",
        title: "Chapter 1: Getting Started (ជំពូកទី ១៖ ការចាប់ផ្តើម)",
        lectures: [
          {
            id: "lec-custom-1",
            title: "1.1 Introduction Outline",
            duration: "10:00",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Initial overview"
          }
        ]
      }
    ]);
    setSelectedChapterId("ch-custom-1");

    alert(language === "km" ? "ការបោះពុម្ភផ្សាយវគ្គសិក្សាទទួលបានជោគជ័យ!" : "Course published successfully!");
  };

  const myCreatedCourses = courses.filter(c => c.isCustom);

  // Translations
  const t = {
    dashboardTitle: language === "km" ? "ផ្ទាំងបញ្ជារបស់គ្រូឧទ្ទេស" : "Instructor console",
    statsDesc: language === "km" ? "ទិដ្ឋភាពទូទៅនៃអាជីវកម្មសិក្សារបស់អ្នក" : "Overview statistics of your courses",
    totalStudents: language === "km" ? "សិស្សសរុប" : "Total Students",
    totalIncome: language === "km" ? "ចំណូលសរុប" : "Total Income",
    avgReviews: language === "km" ? "ពិន្ទុវាយតម្លៃមធ្យម" : "Average Rating",
    coursesPublished: language === "km" ? "វគ្គសិក្សាបានផ្សាយ" : "Active Courses",
    createBtn: language === "km" ? "បង្កើតវគ្គសិក្សាថ្មី" : "Create New Course",
    publishTitle: language === "km" ? "ការលម្អិតវគ្គសិក្សាថ្មី" : "Course Details Form",
    syllabusTitle: language === "km" ? "រៀបចំបណ្តាញមេរៀន (Syllabus)" : "Design Course Syllabus",
    activeCourses: language === "km" ? "វគ្គសិក្សារបស់អ្នក" : "My Handcrafted Courses",
    deleteBtn: language === "km" ? "លុបចោល" : "Delete",
    submitForm: language === "km" ? "បោះពុម្ភផ្សាយ" : "Publish Course Now",
    cancelForm: language === "km" ? "បោះបង់" : "Cancel",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" id="instructor-dashboard">
      
      {/* 1. Header and Create toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-950 uppercase tracking-tight">{t.dashboardTitle}</h1>
          <p className="text-xs text-gray-500 mt-1">{t.statsDesc}</p>
        </div>

        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-10 px-4 rounded-xl transition-all shadow-md shadow-indigo-100"
            id="create-course-trigger-btn"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{t.createBtn}</span>
          </button>
        )}
      </div>

      {/* 2. Numeric Statistics row */}
      {!showCreateForm && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-10" id="stats-indicator-grid">
          
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs flex items-center space-x-4">
            <div className="p-3.5 rounded-lg bg-indigo-50 text-indigo-500 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wide">{t.totalStudents}</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">542</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs flex items-center space-x-4">
            <div className="p-3.5 rounded-lg bg-emerald-50 text-emerald-500 shrink-0">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wide">{t.totalIncome}</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">$1,245.50</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs flex items-center space-x-4">
            <div className="p-3.5 rounded-lg bg-amber-50 text-amber-500 shrink-0">
              <Star className="h-5 w-5 fill-current" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wide">{t.avgReviews}</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">4.9/5.0</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs flex items-center space-x-4">
            <div className="p-3.5 rounded-lg bg-purple-50 text-purple-500 shrink-0">
              <Book className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wide">{t.coursesPublished}</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{myCreatedCourses.length}</span>
            </div>
          </div>

        </div>
      )}

      {/* 3. Create Course Form Wizard */}
      {showCreateForm ? (
        <form onSubmit={handleSubmitPublish} className="space-y-8 bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl shadow-xl max-w-4xl mx-auto" id="create-course-form">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-lg font-black text-gray-900 uppercase">{t.createBtn}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{t.publishTitle}</p>
          </div>

          {/* Core Info Fields */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            <div className="space-y-1.5Col">
              <label className="text-xs font-bold text-gray-700 block">{language === "km" ? "ចំណងជើងវគ្គសិក្សា (English)" : "Course Name (English)"} *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Fullstack Masterclass 2026"
                className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-500 background-none focus:ring-1 focus:ring-indigo-150"
              />
            </div>

            <div className="space-y-1.5Col">
              <label className="text-xs font-bold text-gray-700 block">{language === "km" ? "ចំណងជើងវគ្គសិក្សា (ភាសាខ្មែរ)" : "Course Name (Khmer)"}</label>
              <input
                type="text"
                value={titleKh}
                onChange={(e) => setTitleKh(e.target.value)}
                placeholder="ឧទាហរណ៍៖ មេរៀនបង្កើតកម្មវិធី ២០២៦"
                className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-150"
              />
            </div>

            <div className="space-y-1.5Col">
              <label className="text-xs font-bold text-gray-700 block">{language === "km" ? "ប្រភេទវគ្គសិក្សា" : "Category"}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-500 bg-white"
              >
                <option value="Programming">Programming / អភិវឌ្ឍន៍សូហ្វវែរ</option>
                <option value="Design">Design / ការរចនា UX-UI</option>
                <option value="Business">Business / អាជីវកម្ម</option>
                <option value="Languages">Languages / ភាសាបរទេស</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5Col">
                <label className="text-xs font-bold text-gray-700 block">{language === "km" ? "តម្លៃលក់ ($)" : "Sales Price ($)"}</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1.5Col">
                <label className="text-xs font-bold text-gray-700 block">{language === "km" ? "តម្លៃដើម ($)" : "Original Price ($)"}</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

          </div>

          {/* Description Texts */}
          <div className="space-y-4 border-t border-gray-100 pt-6">
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5Col">
                <label className="text-xs font-bold text-gray-700 block">{language === "km" ? "ការណែនាំសង្ខេប (English)" : "Short Tagline (English)"} *</label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the quick highlights of the course."
                  className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1.5Col">
                <label className="text-xs font-bold text-gray-700 block">{language === "km" ? "ការណែនាំសង្ខេប (ភាសាខ្មែរ)" : "Short Tagline (Khmer)"}</label>
                <textarea
                  rows={2}
                  value={descriptionKh}
                  onChange={(e) => setDescriptionKh(e.target.value)}
                  placeholder="រៀបរាប់ពីគោលបំណងនៃវគ្គសិក្សានេះយ៉ាងខ្លី។"
                  className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5Col">
                <label className="text-xs font-bold text-gray-700 block">{language === "km" ? "ពិពណ៌នាលម្អិត (English)" : "Full Description (English)"}</label>
                <textarea
                  rows={3}
                  value={longDesc}
                  onChange={(e) => setLongDesc(e.target.value)}
                  placeholder="Deep dive into learning milestones"
                  className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1.5Col">
                <label className="text-xs font-bold text-gray-700 block">{language === "km" ? "ពិពណ៌នាលម្អិត (ភាសាខ្មែរ)" : "Full Description (Khmer)"}</label>
                <textarea
                  rows={3}
                  value={longDescKh}
                  onChange={(e) => setLongDescKh(e.target.value)}
                  placeholder="ព័ត៌មានលម្អិតដ៏ទូលំទូលាយពីវគ្គ្សិក្សា"
                  className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

          </div>

          {/* Curriculum Builder */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-1.5">
              <Layers className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
              <span>{t.syllabusTitle}</span>
            </h3>

            {/* Chapters workspace */}
            <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-250/70 space-y-4">
              
              {/* Existing chapters map */}
              <div className="space-y-3">
                {chapters.map((ch, idx) => (
                  <div key={ch.id} className="bg-white border border-gray-200 rounded-lg p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">{ch.title}</span>
                      <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-1.5 py-0.5 rounded-sm">{ch.lectures.length} lessons</span>
                    </div>

                    <div className="mt-3 pl-3 border-l border-indigo-200 space-y-2">
                      {ch.lectures.map((lec) => (
                        <div key={lec.id} className="flex items-center justify-between text-xs text-gray-600">
                          <span>{lec.title}</span>
                          <span className="font-mono text-[10px] text-gray-400">{lec.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Work panel adding chapter */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-12 items-center border-t border-gray-200 pt-4">
                <div className="sm:col-span-9">
                  <input
                    type="text"
                    value={newChapterTitle}
                    onChange={(e) => setNewChapterTitle(e.target.value)}
                    placeholder="Chapter Title e.g., Chapter 2: Data Modeling"
                    className="w-full text-xs bg-white border border-gray-200 rounded-md p-2 outline-none"
                  />
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="button"
                    onClick={handleAddChapter}
                    className="w-full text-xs h-9 bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200 rounded-md font-bold"
                  >
                    + Add Chapter
                  </button>
                </div>
              </div>

              {/* Work panel adding lectures to chapters */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-12 items-center border-t border-gray-200 pt-3">
                <div className="sm:col-span-4">
                  <select
                    value={selectedChapterId}
                    onChange={(e) => setSelectedChapterId(e.target.value)}
                    className="w-full text-xs bg-white border border-gray-200 rounded-md p-2 outline-none"
                  >
                    {chapters.map(ch => (
                      <option key={ch.id} value={ch.id}>{ch.title}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    value={newLectureTitle}
                    onChange={(e) => setNewLectureTitle(e.target.value)}
                    placeholder="Lecture Title e.g., 2.1 Installing Prisma"
                    className="w-full text-xs bg-white border border-gray-200 rounded-md p-2 outline-none"
                  />
                </div>
                <div className="sm:col-span-3 flex space-x-2">
                  <input
                    type="text"
                    value={newLectureDuration}
                    onChange={(e) => setNewLectureDuration(e.target.value)}
                    className="w-16 text-xs text-center bg-white border border-gray-200 rounded-md p-2 outline-none font-mono"
                    title="Duration"
                  />
                  <button
                    type="button"
                    onClick={handleAddLecture}
                    disabled={chapters.length === 0}
                    className="flex-1 text-xs h-9 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-600 rounded-md font-bold"
                  >
                    + Lesson
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-transparent rounded-lg"
            >
              {t.cancelForm}
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1 px-5 h-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-indigo-100"
            >
              <span>{t.submitForm}</span>
            </button>
          </div>
        </form>
      ) : (
        <div id="handcrafted-courses-list">
          
          <h2 className="text-base font-extrabold text-gray-900 mb-4">{t.activeCourses} ({myCreatedCourses.length})</h2>

          {myCreatedCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {myCreatedCourses.map((c) => (
                <div key={c.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl border border-gray-100 bg-white p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{language === "km" ? c.titleKh : c.title}</h4>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{c.category} • {c.chapters.reduce((a, b) => a + b.lectures.length, 0)} lessons</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-4 sm:mt-0 w-full sm:w-auto justify-end border-t sm:border-transparent pt-3 sm:pt-0">
                    <span className="text-lg font-black text-slate-900">${c.price}</span>
                    <button
                      onClick={() => onDeleteCourse(c.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-60 instruction:border border-transparent hover:border-red-100 transition-colors"
                      title={t.deleteBtn}
                      id={`delete-course-btn-${c.id}`}
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 py-12 text-center" id="empty-instructor-workspace">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-gray-400 mx-auto mb-4">
                <Sparkle className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold text-gray-900">{language === "km" ? "មិនទាន់មានវគ្គសិក្សាដែលបង្កើតដោយអ្នកនៅឡើយទេ" : "No custom courses published yet!"}</p>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">{language === "km" ? "ចុចប៊ូតុងខាងលើ 'បង្កើតវគ្គសិក្សាថ្មី' ដើម្បីចូលរួមរចនាមេរៀនបង្រៀនដំបូងរបស់អ្នក!" : "Click 'Create New Course' to build, name, and publish your own custom course curriculum to the marketplace catalog."}</p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
