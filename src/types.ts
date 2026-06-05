/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lecture {
  id: string;
  title: string;
  duration: string;
  videoUrl: string; // fallback mock or video ID
  summary: string;
  resources?: string[];
}

export interface Chapter {
  id: string;
  title: string;
  lectures: Lecture[];
}

export interface Review {
  id: string;
  username: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Course {
  id: string;
  title: string;
  titleKh?: string;
  description: string;
  descriptionKh: string;
  longDescription: string;
  longDescriptionKh: string;
  instructorName: string;
  instructorAvatar: string;
  instructorTitle: string;
  instructorBio?: string;
  rating: number;
  numReviews: number;
  studentsEnrolled: number;
  price: number;
  originalPrice: number;
  thumbnail: string;
  category: string;
  lastUpdated: string;
  level: "Beginner" | "Intermediate" | "Advance" | "All Levels";
  language: string;
  chapters: Chapter[];
  reviews: Review[];
  isCustom?: boolean;
}

export interface CartItem {
  courseId: string;
  price: number;
}

export interface CourseProgress {
  courseId: string;
  completedLectures: string[]; // List of lecture IDs
}

export type AppLanguage = "km" | "en";
