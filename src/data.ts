/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course } from "./types";

export const initialCourses: Course[] = [
  {
    id: "course-1",
    title: "The Complete Web Development Bootcamp with React & Node.js",
    titleKh: "វគ្គសិក្សាអភិវឌ្ឍន៍វិបសាយពេញលេញជាមួយ React & Node.js",
    description: "Learn HTML, CSS, JS, React, Node, and MongoDB from scratch. Build 10+ real-world full-stack web applications.",
    descriptionKh: "រៀនបង្កើតវិបសាយពីកម្រិតដំបូងជាមួយ HTML, CSS, JS, React, Node, និង MongoDB។ បង្ហាញការអនុវត្តផ្ទាល់ចំនួន ១០+ គម្រោង។",
    longDescription: "Master full-stack web development through a comprehensive, practical curriculum. You will go from code novice to a professional developer equipped with deep industry-relevant skills. Hands-on exercises include building responsive layouts, API proxies, database authentication, and deployment structures.",
    longDescriptionKh: "ក្លាយជាអ្នកជំនាញបង្កើតវិបសាយ (Full-Stack Developer) តាមរយៈការរៀនទ្រឹស្តីនិងការអនុវត្តគម្រោងពិតជាក់ស្តែង។ អ្នកនឹងស្វែងយល់តាំងពីមូលដ្ឋានគ្រឹះកូដ រហូតដល់ការរចនាប្រព័ន្ធទិន្នន័យ ការការពារសុវត្ថិភាពទិន្នន័យ ការរៀបចំ API និងការដាក់ដំណើរការកម្មវិធីជាផ្លូវការនៅលើបណ្តាញអ៊ីនធឺណិត។",
    instructorName: "សុខ ចាន់ដារ៉ា (Sok Chandara)",
    instructorTitle: "Senior Full-Stack Engineer & Tech Lead",
    instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    instructorBio: "Sok Chandara is a passionate software architect with over 10 years of experience building scalable web applications. He has mentored over 50,000 students globally and focuses on breaking down complex technological concepts into enjoyable micro-learning sessions.",
    rating: 4.8,
    numReviews: 2450,
    studentsEnrolled: 18420,
    price: 49.99,
    originalPrice: 199.99,
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
    category: "Programming",
    lastUpdated: "2026-05",
    level: "All Levels",
    language: "Khmer / English",
    chapters: [
      {
        id: "c1-ch1",
        title: "Introduction and Development Environment (ការណែនាំ និងការរៀបចំកម្មវិធី)",
        lectures: [
          {
            id: "c1-l1",
            title: "1.1 Course Overview & Syllabus (ទិដ្ឋភាពទូទៅនៃវគ្គសិក្សា)",
            duration: "08:45",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Welcome to the Full-Stack Web Development Bootcamp! In this lesson, we will walk through the syllabus, look at the target projects we will build together, and discuss best learning practices."
          },
          {
            id: "c1-l2",
            title: "1.2 Setup of Visual Studio Code & Terminals (ការតម្លើង VS Code និង Terminal)",
            duration: "12:30",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Configure your local environment. We will install VS Code, explore essential extensions for TypeScript and React, configure standard shell interfaces, and get familiar with terminal navigation."
          }
        ]
      },
      {
        id: "c1-ch2",
        title: "Modern JavaScript & TypeScript Essentials (គ្រឹះនៃ JS និង TypeScript)",
        lectures: [
          {
            id: "c1-l3",
            title: "2.1 Variables, Arrow Functions & Array Methods (ការប្រើប្រាស់ Variable, Function និង Array)",
            duration: "15:20",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Revamp your JavaScript knowledge. Learn ES6+ standard functions, arrow syntax, destructurings, spread operators, and handy array iterators (map, filter, reduce)."
          },
          {
            id: "c1-l4",
            title: "2.2 Introduction to TypeScript Types (ស្វែងយល់ពី Type នៃ TypeScript)",
            duration: "18:40",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Why use TypeScript? Learn static type scripting, declaring interfaces, parsing object types, custom unions, and safeguarding structures against compilation bugs."
          }
        ]
      },
      {
        id: "c1-ch3",
        title: "React Fundamental Architecture (ស្ថាបត្យកម្មគ្រឹះរបស់ React)",
        lectures: [
          {
            id: "c1-l5",
            title: "3.1 JSX, Components and State Hook (ស្វែងយល់ពី JSX និង State)",
            duration: "25:15",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Deep dive into reactive DOM. We will explain declarative components, props vs state, handling events, and utilizing useState() hooks securely for internal states."
          },
          {
            id: "c1-l6",
            title: "3.2 Mastering useEffect and Side Effects (ការគ្រប់គ្រង Side Effects ជាមួយ useEffect)",
            duration: "22:10",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Learn how to fetch backend API payloads dynamically. Understand life-cycle hook dependencies, cleanup triggers, and avoiding common infinite re-rendering pitfalls."
          }
        ]
      }
    ],
    reviews: [
      {
        id: "r1-1",
        username: "សំណាង ពិសិដ្ឋ (Samnang Piseth)",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
        rating: 5,
        date: "2026-05-18",
        comment: "វគ្គសិក្សានេះល្អណាស់! គ្រូពន្យល់បានលម្អិត និងងាយយល់បំផុត។ ខ្ញុំធ្លាប់រៀនតាមអនឡាញជាច្រើនតែមិនដែលយល់ច្បាស់ដូចវគ្គនេះទេ។ សង្ឃឹមថាមានវគ្គថ្មីបន្តទៀត។"
      },
      {
        id: "r1-2",
        username: "ចាន់ សុភី (Chan Sophy)",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
        rating: 5,
        date: "2026-05-12",
        comment: "Excellent bootcamp! The transition from JS to TS is very smooth. Building the projects step by step helped me land my first junior react dev job in Phnom Penh. Highly recommended!"
      }
    ]
  },
  {
    id: "course-2",
    title: "User Experience Design Mastery (UX/UI) for Mobile Applications",
    titleKh: "ការរចនាបទពិសោធន៍ និងផ្ទៃកម្មវិធីទូរស័ព្ទ (UX/UI Mobile Design)",
    description: "Learn to design beautiful, user-centered iOS & Android applications. Master Figma, wireframing, and interactive prototyping.",
    descriptionKh: "រៀនរចនាផ្ទៃកម្មវិធីទូរស័ព្ទដៃដ៏ស្រស់ស្អាត និងងាយស្រួលប្រើប្រាស់។ ក្តាប់ជំនាញ Figma, Prototyping និងបង្កើត Wireframe។",
    longDescription: "Learn to build products that users love. This course will guide you through the complete UX/UI workflow: conducting user research, creating user personas, sketching rapid wireframes, pixel-perfect UI elements, component-driven Figma systems, and micro-interaction prototypes.",
    longDescriptionKh: "រចនាកម្មវិធីទូរស័ព្ទដៃដែលទាក់ទាញ និងឆ្លើយតបទៅនឹងតម្រូវការរបស់អ្នកប្រើប្រាស់។ វគ្គសិក្សានេះនឹងនាំអ្នកសិក្សាពីជំហានស្វែងយល់បំណងប្រាថ្នារបស់អតិថិជន (User Journey), ការបង្កើតគ្រោងផែនការ (Wireframe), ទ្រឹស្តីពណ៌ សោភ័ណភាព អក្សរ និងការបង្កើតគំរូសាកល្បងអន្តរកម្មនៅលើកម្មវិធី Figma។",
    instructorName: "កែវ វិបុល (Keo Vibol)",
    instructorTitle: "Product Designer & UX consultant",
    instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    instructorBio: "Keo Vibol has been designing award-winning fintech and logistics mobile applications in Southeast Asia. He loves clean typography, grids, and user-centric flows. He shares practical career tips for designers wishing to transition into digital product roles.",
    rating: 4.7,
    numReviews: 920,
    studentsEnrolled: 6200,
    price: 39.99,
    originalPrice: 119.99,
    thumbnail: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&q=80&w=600",
    category: "Design",
    lastUpdated: "2026-04",
    level: "Beginner",
    language: "Khmer",
    chapters: [
      {
        id: "c2-ch1",
        title: "Introduction to User Experience (UX) Principles (មូលដ្ឋានគ្រឹះនៃ UX)",
        lectures: [
          {
            id: "c2-l1",
            title: "1.1 What is UX Design & the UI Design Gap (តើអ្វីទៅជា UX និង UI?)",
            duration: "10:15",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Demystify user interactions. We explore the psychological concepts of usability, the core differences between layout interfaces and visual details, and real case studies."
          },
          {
            id: "c2-l2",
            title: "1.2 Figma Basics & Essential Shortcuts (មូលដ្ឋានគ្រឹះ Figma និង គន្លឹះរហ័ស)",
            duration: "15:40",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Open Figma for the first time. Learn frame creation, grid guidelines, vector shapes, layout constraints, auto-layouts, and utilizing shared library resources."
          }
        ]
      },
      {
        id: "c2-ch2",
        title: "User Journey & Wireframing (ដំណើរកម្សាន្តអ្នកប្រើ និងការគូរ Wireframe)",
        lectures: [
          {
            id: "c2-l3",
            title: "2.1 Sketching Lo-Fi Wireframes (ការគូសគ្រោងផែនការកម្រិតទាប)",
            duration: "18:20",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Grab a pen and paper. Learn how to draft rapid screen layouts, formulate content hierarchy, and structure mobile applications before touching high-fidelity vectors."
          }
        ]
      }
    ],
    reviews: [
      {
        id: "r2-1",
        username: "លីដា សុជាតា (Lida Socheata)",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
        rating: 4,
        date: "2026-04-20",
        comment: "ខ្លឹមសារល្អណាស់ សំឡេងច្បាស់ល្អ គ្រូបង្ហាញរបៀបប្រើ Figma បានក្បោះក្បាយ។ បើមានឯកសារទាញយកបន្ថែមសម្រាប់អនុវត្ត និងការវាយតម្លៃគម្រោងទៀតរឹតតែប្រសើរ។"
      }
    ]
  },
  {
    id: "course-3",
    title: "Modern Digital Marketing & Brand Strategy in 2026",
    titleKh: "យុទ្ធសាស្ត្រទីផ្សារឌីជីថល និងម៉ាកសញ្ញាទំនើបឆ្នាំ ២០២៦",
    description: "Grow any business with Social Media, SEO, Content Marketing, and TikTok/Facebook Advertising.",
    descriptionKh: "ពង្រីកអាជីវកម្មគ្រប់ប្រភេទជាមួយបណ្តាញសង្គម, SEO, ការបង្កើតយុទ្ធសាស្ត្រ Content, និងការផ្សព្វផ្សាយពាណិជ្ជកម្មលើ TikTok/Facebook។",
    longDescription: "Drive exponential business growth. This course delivers deep insights on building online campaigns, generating quality content conversion webs, search engine algorithms, high-ROI paid ads, and reading analytical dashboards.",
    longDescriptionKh: "ជម្រុញការលក់ និងកសាងកេរ្តិ៍ឈ្មោះម៉ាកសញ្ញាឱ្យល្បីល្បាញក្នុងសម័យឌីជីថល។ អ្នកនឹងសិក្សាអំពីរបៀបបង្កើតយុទ្ធសាស្ត្រមាតិកាទាក់ទាញចិត្ត (Content Creation), ការបង្កើនចំណាត់ថ្នាក់លើហ្គូហ្គល (SEO), ការគ្រប់គ្រងថវិកា പരസ്യ និងការវាស់ស្ទង់ស្ថិតិ Analytics ដើម្បីកែសម្រួលដោះស្រាយបញ្ហាលក់។",
    instructorName: "ណារ៉េត វឌ្ឍនៈ (Nareth Vattanak)",
    instructorTitle: "Chief Marketing Director & Brand Growth Specialist",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    instructorBio: "Nareth Vattanak is a leading CMO who has led marketing campaigns for major tech startups and FMCG giants in the Indochina region. He champions data-driven storytelling, continuous testing, and organic building.",
    rating: 4.9,
    numReviews: 760,
    studentsEnrolled: 4800,
    price: 29.99,
    originalPrice: 89.99,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    category: "Business",
    lastUpdated: "2026-06",
    level: "All Levels",
    language: "Khmer",
    chapters: [
      {
        id: "c3-ch1",
        title: "Digital Brand Formulation (ការកសាងអត្តសញ្ញាណម៉ាកសញ្ញា)",
        lectures: [
          {
            id: "c3-l1",
            title: "1.1 The Brand Positioning & Identity Blueprint (ផែនការយុទ្ធសាស្ត្រម៉ាកសញ្ញា)",
            duration: "14:15",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Learn what truly makes a brand stick. We will investigate positioning maps, brand values, tone of voice, visual rules, and how to stay consistent across platforms."
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "course-4",
    title: "Practical English for Professional & Workplace Success",
    titleKh: "ភាសាអង់គ្លេសអនុវត្តសម្រាប់ការប្រាស្រ័យទាក់ទងការងារ",
    description: "Write impressive work emails, command high-level presentations, and master interview negotiations confidently.",
    descriptionKh: "រៀនសរសេរអ៊ីមែលផ្លូវការបែបអាជីព បទបង្ហាញលំដាប់ខ្ពស់ និងការចរចានៅពេលសម្ភាសន៍ការងារប្រកបដោយជំនឿចិត្ត។",
    longDescription: "Achieve fluency and corporate confidence. Designed specifically for professionals, this program deals with clear, precise communication structures, business phone manners, professional report writing, resolving teamwork friction, and negotiating salary packages.",
    longDescriptionKh: "ពង្រឹងសមត្ថភាពសរសេរ និងនិយាយភាសាអង់គ្លេសក្នុងបរិយាកាសការងារឱ្យកាន់តែមានទំនុកចិត្ត និងវិជ្ជាជីវៈខ្ពស់។ សិក្សាពីរបៀបឆ្លើយឆ្លងអ៊ីមែលជាមួយដៃគូជំនួញ បច្ចេកទេសធ្វើបទបង្ហាញ (Presentation) ការសម្របសម្រួលជម្លោះក្រុមការងារ និងគន្លឹះដោះស្រាយសំណួរសម្ភាសន៍ធំៗ។",
    instructorName: "Sarah Jenkins & កែវ សីហា (Keo Seyha)",
    instructorTitle: "Corporate Language Coach",
    instructorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    instructorBio: "Sarah and Seyha pair local insights with native English structures. They have collective coaching portfolios with corporate banking leads, international embassy workers, and top scholars in Cambodia.",
    rating: 4.6,
    numReviews: 450,
    studentsEnrolled: 3100,
    price: 19.99,
    originalPrice: 49.99,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
    category: "Languages",
    lastUpdated: "2026-03",
    level: "Intermediate",
    language: "English / Khmer",
    chapters: [
      {
        id: "c4-ch1",
        title: "Effective Email and Written Delivery (បច្ចេកទេសសរសេរអ៊ីមែលផ្លូវការ)",
        lectures: [
          {
            id: "c4-l1",
            title: "1.1 Anatomy of a High-Impact Business Email (ទម្រង់អ៊ីមែលអាជីវកម្មដែលមានប្រសិទ្ធភាព)",
            duration: "11:50",
            videoUrl: "https://www.w3sheets.com/media/dummy.mp4",
            summary: "Analyze professional templates. Learn subject line psychology, polite openings, clean action requests, avoiding wordiness, and structural proofreading checks."
          }
        ]
      }
    ],
    reviews: []
  }
];

export const courseCategories = [
  "All",
  "Programming",
  "Design",
  "Business",
  "Languages"
];
