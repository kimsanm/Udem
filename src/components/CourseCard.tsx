/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, Clock, User, Award } from "lucide-react";
import { Course, AppLanguage } from "../types";

interface CourseCardProps {
  course: Course;
  language: AppLanguage;
  onClick: () => void;
  key?: string;
}

export default function CourseCard({ course, language, onClick }: CourseCardProps) {
  // Localization helper
  const title = language === "km" && course.titleKh ? course.titleKh : course.title;
  const description = language === "km" ? course.descriptionKh : course.description;
  
  // Calculate total duration across all chapters
  const totalLectures = course.chapters.reduce(
    (count, chapter) => count + chapter.lectures.length, 
    0
  );

  // Generate star array
  const fullStars = Math.floor(course.rating);
  const hasHalfStar = course.rating % 1 !== 0;

  return (
    <div
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-100/70 cursor-pointer"
      id={`course-card-${course.id}`}
    >
      {/* Course Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          id={`course-img-${course.id}`}
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-white backdrop-blur-xs">
          {course.category}
        </span>
        {course.rating >= 4.8 && (
          <span className="absolute top-3 right-3 rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
            {language === "km" ? "លក់ដាច់បំផុត" : "Bestseller"}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Title */}
        <h3 
          className="text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors"
          id={`course-title-${course.id}`}
        >
          {title}
        </h3>

        {/* Instructor */}
        <p className="mt-1 text-xs text-gray-500 flex items-center space-x-1">
          <span className="font-medium text-gray-600">{course.instructorName}</span>
        </p>

        {/* Description brief */}
        <p className="mt-2 text-xs text-gray-500 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* Statistics Rate / Students */}
        <div className="mt-3 flex items-center space-x-1.5" id={`course-stars-${course.id}`}>
          <span className="text-xs font-bold text-amber-600">{course.rating.toFixed(1)}</span>
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < fullStars 
                    ? "fill-current" 
                    : (i === fullStars && hasHalfStar ? "stroke-current fill-current opacity-50" : "text-gray-200")
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">
            ({course.numReviews.toLocaleString()})
          </span>
        </div>

        {/* Metadata Details */}
        <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3 text-[11px] text-gray-500">
          <span className="flex items-center">
            <Clock className="mr-1 h-3.5 w-3.5 text-indigo-500" />
            {totalLectures} {language === "km" ? "មេរៀន" : "lectures"}
          </span>
          <span className="flex items-center font-medium px-2 py-0.5 rounded-md bg-gray-50 text-gray-600">
            <Award className="mr-1 h-3.5 w-3.5 text-indigo-500" />
            {course.level === "All Levels" 
              ? (language === "km" ? "គ្រប់កម្រិត" : "All levels")
              : course.level}
          </span>
        </div>

        {/* Pricing tag */}
        <div className="mt-4 flex items-baseline justify-between">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-lg font-extrabold text-slate-900">${course.price.toFixed(2)}</span>
            <span className="text-xs font-medium text-gray-400 line-through">${course.originalPrice.toFixed(2)}</span>
          </div>
          {course.isCustom && (
            <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-sm">
              {language === "km" ? "បង្កើតដោយអ្នក" : "Created by You"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
