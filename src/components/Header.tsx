/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Search, 
  Globe, 
  ShoppingCart, 
  BookOpen, 
  Compass, 
  GraduationCap, 
  User, 
  Briefcase 
} from "lucide-react";
import { AppLanguage } from "../types";

interface HeaderProps {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  activeTab: "browse" | "learning" | "teach";
  setActiveTab: (tab: "browse" | "learning" | "teach") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  openCartModal: () => void;
  onHomeClick: () => void;
}

export default function Header({
  language,
  setLanguage,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  cartCount,
  openCartModal,
  onHomeClick,
}: HeaderProps) {
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  // Translations
  const t = {
    searchPlaceholder: language === "km" ? "ស្វែងរកអ្វីៗគ្រប់យ៉ាង..." : "Search for anything...",
    categories: language === "km" ? "ប្រភេទសិក្សា" : "Categories",
    myLearning: language === "km" ? "មេរៀនរបស់ខ្ញុំ" : "My Learning",
    instructor: language === "km" ? "បង្រៀន" : "Instructor View",
    learnMode: language === "km" ? "រៀន" : "Student View",
    becomeInstructor: language === "km" ? "ក្លាយជាគ្រូ" : "Teach on Udemy",
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white shadow-xs">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          onClick={() => {
            onHomeClick();
            setActiveTab("browse");
          }} 
          className="flex cursor-pointer items-center space-x-2 mr-4 shrink-0"
          id="header-logo-container"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xl select-none shadow-md shadow-indigo-100">
            U
          </div>
          <span className="hidden text-xl font-extrabold tracking-tight text-gray-900 md:block">
            Udemy<span className="text-indigo-600 ml-1 font-medium text-sm px-1.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">Khmer</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative flex max-w-md flex-1 items-center mx-4 md:max-w-xl" id="header-search-container">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-full border border-gray-200 py-2 pl-9 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-gray-50/50 hover:bg-gray-50 focus:bg-white"
            id="header-search-input"
          />
        </div>

        {/* Action Widgets */}
        <div className="flex items-center space-x-1 sm:space-x-4">
          
          {/* Browse Courses Tab */}
          <button
            onClick={() => {
              onHomeClick();
              setActiveTab("browse");
            }}
            className={`hidden items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors md:flex ${
              activeTab === "browse"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
            id="nav-browse-btn"
          >
            <Compass className="h-4 w-4" />
            <span>{language === "km" ? "រុករក" : "Browse"}</span>
          </button>

          {/* My Learning Tab */}
          <button
            onClick={() => {
              onHomeClick();
              setActiveTab("learning");
            }}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "learning"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
            id="nav-learning-btn"
          >
            <BookOpen className="h-4 w-4" />
            <span>{t.myLearning}</span>
          </button>

          {/* Instructor Mode Switcher */}
          <button
            onClick={() => {
              onHomeClick();
              if (activeTab === "teach") {
                setActiveTab("browse");
              } else {
                setActiveTab("teach");
              }
            }}
            className={`hidden items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all sm:flex ${
              activeTab === "teach"
                ? "bg-purple-50 text-purple-600 border border-purple-100"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
            }`}
            id="nav-instructor-btn"
          >
            <Briefcase className="h-4 w-4" />
            <span>{activeTab === "teach" ? t.learnMode : t.instructor}</span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={openCartModal}
            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            id="nav-cart-btn"
            title="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-scale">
                {cartCount}
              </span>
            )}
          </button>

          {/* Language Selector Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center space-x-1 p-2 rounded-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              id="language-dropdown-toggle"
              title="Change Language"
            >
              <Globe className="h-5 w-5" />
              <span className="hidden text-xs font-bold sm:inline uppercase">{language}</span>
            </button>

            {showLangDropdown && (
              <div 
                className="absolute right-0 mt-2 w-32 origin-top-right rounded-lg bg-white p-1.5 shadow-lg ring-1 ring-black/5 animate-fade-in z-50 border border-gray-100"
                id="language-dropdown-menu"
              >
                <button
                  onClick={() => {
                    setLanguage("km");
                    setShowLangDropdown(false);
                  }}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-left text-xs font-medium transition-colors ${
                    language === "km" ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  id="language-km-option"
                >
                  ភាសាខ្មែរ (KM)
                </button>
                <button
                  onClick={() => {
                    setLanguage("en");
                    setShowLangDropdown(false);
                  }}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-left text-xs font-medium transition-colors ${
                    language === "en" ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  id="language-en-option"
                >
                  English (EN)
                </button>
              </div>
            )}
          </div>

          {/* Student Profile avatar mock */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 shrink-0 select-none border border-gray-200">
            <User className="h-4 w-4" />
          </div>

        </div>
      </div>
    </header>
  );
}
