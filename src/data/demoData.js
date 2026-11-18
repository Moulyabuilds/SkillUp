/**
 * GDG on Campus – Rajeev Institute of Technology (RIT), Hassan
 * Complete Demo Data Store
 * All sample items, statistics, and team profiles are clearly labeled as illustrative / placeholders.
 */

export const COMMUNITY_INFO = {
  name: "GDG on Campus – RIT Hassan",
  shortName: "GDG RIT Hassan",
  college: "Rajeev Institute of Technology",
  location: "Hassan, Karnataka, India",
  department: "Department of Computer Science & Engineering",
  tagline: "Connect. Learn. Build. Grow.",
  heroHeading: "Where Campus Minds Build the Future.",
  heroSubheading:
    "A premier student developer community powered by Google Developer Groups at Rajeev Institute of Technology. Learn modern tech stacks, build open-source projects, and innovate alongside passionate peers.",
  contactEmail: "gdg.rit@gmail.com",
  altEmail: "cse.rit.hassan@gmail.com",
  phone: "+91 8172 245000",
  address: "Plot No. 1-D, Growth Center, Industrial Area, B-M Bypass Road, Hassan – 573201, Karnataka",
  disclaimer:
    "GDG on Campus – RIT Hassan is an independent student organization supported by the Department of Computer Science & Engineering, RIT Hassan. Activities, workshops, and student opinions are our own and not direct corporate representations of Google LLC.",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    discord: "https://discord.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com"
  }
};

export const STATS = [
  {
    id: "members",
    value: "500+",
    label: "Active Student Members",
    subtext: "Across engineering disciplines at RIT",
    color: "#4285F4" // Google Blue
  },
  {
    id: "events",
    value: "35+",
    label: "Workshops & Tech Talks",
    subtext: "Hands-on sessions delivered to date",
    color: "#EA4335" // Google Red
  },
  {
    id: "projects",
    value: "20+",
    label: "Hackathon Projects Built",
    subtext: "Open-source solutions & prototypes",
    color: "#34A853" // Google Green
  },
  {
    id: "mentors",
    value: "100%",
    label: "Peer-to-Peer Learning",
    subtext: "Collaborative campus growth ecosystem",
    color: "#FBBC05" // Google Yellow
  }
];

export const TECH_TRACKS = [
  {
    id: "web",
    title: "Web Development",
    shortDesc: "Modern JavaScript, React, Next.js, responsive design & cutting-edge Web APIs.",
    icon: "Globe",
    color: "#4285F4",
    accentBg: "rgba(66, 133, 244, 0.08)",
    skills: ["React.js", "Vite", "Node.js", "TypeScript", "Tailwind CSS", "REST / GraphQL"],
    topicsCovered: "Component architectures, state management, full-stack microservices, accessible UI."
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    shortDesc: "Generative AI, Gemini API, TensorFlow, Scikit-Learn and applied deep learning.",
    icon: "Cpu",
    color: "#EA4335",
    accentBg: "rgba(234, 67, 53, 0.08)",
    skills: ["Gemini 1.5/2.0 API", "TensorFlow", "Python", "Computer Vision", "Prompt Eng.", "LangChain"],
    topicsCovered: "Neural networks, multimodal AI agents, model deployment, RAG architectures."
  },
  {
    id: "cloud",
    title: "Google Cloud & DevOps",
    shortDesc: "Scalable cloud infrastructures, Firebase, Google Cloud Run, and CI/CD automation.",
    icon: "Cloud",
    color: "#FBBC05",
    accentBg: "rgba(251, 188, 5, 0.08)",
    skills: ["Google Cloud Platform", "Firebase", "Cloud Functions", "Docker", "Kubernetes", "Cloud Run"],
    topicsCovered: "Serverless backends, real-time database syncing, container orchestration, zero-downtime deploy."
  },
  {
    id: "android",
    title: "Android Development",
    shortDesc: "Native mobile development using modern Kotlin, Jetpack Compose, and Material 3.",
    icon: "Smartphone",
    color: "#34A853",
    accentBg: "rgba(52, 168, 83, 0.08)",
    skills: ["Kotlin", "Jetpack Compose", "Coroutines", "Room DB", "Material Design 3", "Android Studio"],
    topicsCovered: "Declarative UI, MVVM design pattern, offline-first mobile apps, Play Store deployment."
  },
  {
    id: "ui-ux",
    title: "UI/UX & Product Design",
    shortDesc: "User research, Figma design systems, interactive wireframing, and usability heuristics.",
    icon: "Palette",
    color: "#8B5CF6",
    accentBg: "rgba(139, 92, 246, 0.08)",
    skills: ["Figma", "Design Systems", "Prototyping", "Information Architecture", "Micro-interactions", "WCAG"],
    topicsCovered: "Design thinking sprints, user journey mapping, high-fidelity responsive UI prototypes."
  },
  {
    id: "cp-git",
    title: "Git, GitHub & CP",
    shortDesc: "Open source collaboration, version control, and competitive coding problem solving.",
    icon: "Code2",
    color: "#06B6D4",
    accentBg: "rgba(6, 182, 212, 0.08)",
    skills: ["Git & GitHub", "Data Structures", "Algorithms", "C++ / Java", "Open Source PRs", "LeetCode"],
    topicsCovered: "Branching workflows, CI workflows, time-complexity analysis, dynamic programming."
  }
];

export const EVENTS = [
  {
    id: "evt-01",
    title: "CODESTORM 2026: 24-Hour Campus Hackathon",
    category: "Hackathons",
    description:
      "The flagship annual collegiate hackathon of RIT Hassan. Teams build innovative solutions solving real-world challenges across Smart Campus, Healthcare, FinTech, and Sustainable Tech.",
    date: "April 18 - 19, 2026",
    time: "09:00 AM - 09:00 AM (24 Hrs)",
    venue: "Main Computing Center & CSE Auditorium, RIT Hassan",
    mode: "In-Person",
    status: "Upcoming",
    featured: true,
    badge: "Flagship Hackathon",
    capacity: "40 Teams (160 Hackers)",
    prerequisites: "Open to all engineering students. Bring your laptops and enthusiasm!",
    color: "#EA4335"
  },
  {
    id: "evt-02",
    title: "Google Gemini AI & Multimodal Agent Workshop",
    category: "Technical talks",
    description:
      "Deep dive into Google's latest Gemini models, function calling, structured JSON output, and building autonomous generative AI assistants for web and mobile.",
    date: "March 28, 2026",
    time: "10:30 AM - 01:00 PM",
    venue: "CSE Seminar Hall, 2nd Floor, RIT Hassan",
    mode: "In-Person",
    status: "Upcoming",
    featured: true,
    badge: "Hands-on Workshop",
    capacity: "120 Seats",
    prerequisites: "Basic Python or JavaScript knowledge.",
    color: "#4285F4"
  },
  {
    id: "evt-03",
    title: "DevFest RIT Campus Meetup: Google Cloud & Firebase",
    category: "Developer meetups",
    description:
      "A high-energy developer gathering featuring technical talks on serverless cloud architecture, Firebase real-time database, live lightning demos, and networking with tech alumni.",
    date: "March 14, 2026",
    time: "02:00 PM - 05:30 PM",
    venue: "Audio-Visual Hall, RIT Hassan",
    mode: "In-Person",
    status: "Upcoming",
    featured: true,
    badge: "Community Meetup",
    capacity: "150 Attendees",
    prerequisites: "None. Open to 1st through 8th semester students.",
    color: "#FBBC05"
  },
  {
    id: "evt-04",
    title: "CodeCraft: DSA & Competitive Coding Sprint",
    category: "Coding competitions",
    description:
      "A 3-hour speed coding contest focusing on algorithms, graph theory, dynamic programming, and data structures. Top performers win certificates and exclusive GDG swags.",
    date: "May 02, 2026",
    time: "04:00 PM - 07:00 PM",
    venue: "Online Contest (HackerRank / Codeforces)",
    mode: "Online",
    status: "Upcoming",
    featured: false,
    badge: "Contest",
    capacity: "Unlimited Registrations",
    prerequisites: "Working proficiency in C++, Java, or Python.",
    color: "#34A853"
  },
  {
    id: "evt-05",
    title: "Android Jetpack Compose Zero-to-Hero Bootcamp",
    category: "Workshops",
    description:
      "Build your first modern Android application with Kotlin and Jetpack Compose. Learn reactive UI states, theme systems, and asynchronous networking.",
    date: "February 21, 2026",
    time: "10:00 AM - 04:00 PM",
    venue: "CSE Advanced Lab, RIT Hassan",
    mode: "In-Person",
    status: "Completed",
    featured: false,
    badge: "Completed",
    capacity: "80 Seats (Sold Out)",
    prerequisites: "Laptops with Android Studio installed.",
    color: "#34A853"
  },
  {
    id: "evt-06",
    title: "Git, GitHub & Open Source Contribution Day",
    category: "Workshops",
    description:
      "Hands-on masterclass on git branches, rebase, merge conflicts, pull request conventions, and how students can make their first contributions to open-source software.",
    date: "January 17, 2026",
    time: "11:00 AM - 01:30 PM",
    venue: "CSE Seminar Hall, RIT Hassan",
    mode: "In-Person",
    status: "Completed",
    featured: false,
    badge: "Completed",
    capacity: "100 Attendees",
    prerequisites: "Bring your laptop and create a GitHub account.",
    color: "#4285F4"
  }
];

export const WORKSHOPS = [
  {
    id: "ws-web",
    title: "Modern Web Development with React & Vite",
    track: "Web Development",
    level: "Beginner to Intermediate",
    duration: "4 Weeks (Weekend Cohort)",
    dateRange: "Starts March 07, 2026",
    instructorRole: "Web Tech Coordinator, GDG RIT",
    summary:
      "Master the essential building blocks of production web apps: component lifecycles, custom hooks, React Router v6, responsive styling, and modern build tooling.",
    syllabus: [
      "ES6+ JavaScript Fundamentals & Async/Await",
      "Component Composition, Props, and State Mechanics",
      "Routing, Forms, and Validations in React",
      "Connecting with REST APIs & Cloud Backend"
    ],
    prerequisites: "Basic HTML, CSS and foundational JavaScript.",
    color: "#4285F4"
  },
  {
    id: "ws-ai",
    title: "Generative AI & Multimodal LLMs with Gemini",
    track: "Artificial Intelligence",
    level: "Intermediate",
    duration: "2-Day Intensive Masterclass",
    dateRange: "March 21 - 22, 2026",
    instructorRole: "AI / ML Research Team Lead",
    summary:
      "Unlock the capabilities of Gemini 1.5/2.0 Flash and Pro. Learn prompt design, system instructions, function calling, image analysis, and retrieval augmented generation (RAG).",
    syllabus: [
      "Introduction to Foundation Models & Tokenization",
      "Advanced Prompt Engineering & System Prompts",
      "Calling Google Gemini API via Python & JavaScript",
      "Building a Campus Knowledge Chatbot with RAG"
    ],
    prerequisites: "Familiarity with Python or JavaScript syntax.",
    color: "#EA4335"
  },
  {
    id: "ws-ml",
    title: "Machine Learning: From Math to TensorFlow",
    track: "Machine Learning",
    level: "Intermediate",
    duration: "3 Weeks",
    dateRange: "Starts April 04, 2026",
    instructorRole: "ML Coordinator, Dept. of CSE",
    summary:
      "A hands-on journey from data preprocessing and Scikit-Learn pipelines to training Convolutional Neural Networks for image classification with TensorFlow.",
    syllabus: [
      "NumPy, Pandas & Exploratory Data Analysis (EDA)",
      "Supervised & Unsupervised Learning Algorithms",
      "Deep Learning with Keras & TensorFlow",
      "Deploying ML Models as Web APIs"
    ],
    prerequisites: "Python basics and linear algebra fundamentals.",
    color: "#EA4335"
  },
  {
    id: "ws-cloud",
    title: "Google Cloud Platform & Serverless Architecture",
    track: "Google Cloud",
    level: "Beginner to Advanced",
    duration: "3 Sessions",
    dateRange: "April 18 - 25, 2026",
    instructorRole: "Cloud Platform Mentor",
    summary:
      "Explore cloud computing paradigms: Google Cloud Run, Cloud Functions, Firestore, and CI/CD pipelines. Learn how to architect zero-maintenance backend solutions.",
    syllabus: [
      "Cloud Concepts: IaaS vs PaaS vs Serverless",
      "Deploying Microservices on Google Cloud Run",
      "Firebase Auth, Firestore & Cloud Storage",
      "Securing Cloud APIs & Cost Management"
    ],
    prerequisites: "Understanding of client-server architecture.",
    color: "#FBBC05"
  },
  {
    id: "ws-android",
    title: "Android App Development with Kotlin & Jetpack Compose",
    track: "Android Development",
    level: "Beginner",
    duration: "4 Weeks",
    dateRange: "Starts May 09, 2026",
    instructorRole: "Mobile Development Lead",
    summary:
      "Build clean, beautiful native Android apps using Google's recommended modern declarative UI toolkit, Kotlin coroutines, and Room local database.",
    syllabus: [
      "Kotlin Syntax & OOP Concepts for Android",
      "Composable Functions, States & Modifiers",
      "Navigation in Compose & Architecture (MVVM)",
      "Consuming REST APIs with Retrofit"
    ],
    prerequisites: "Basic programming concepts in Java, C++ or Python.",
    color: "#34A853"
  },
  {
    id: "ws-git",
    title: "Git, GitHub & Open Source Mastery",
    track: "Git and GitHub",
    level: "Beginner (Must-Have for All)",
    duration: "1 Day (Hands-on Lab)",
    dateRange: "February 28, 2026",
    instructorRole: "Open Source Advocate",
    summary:
      "Demystify version control. Learn commit hygiene, branches, rebasing, pull requests, resolving merge conflicts, and contributing to open-source student repositories.",
    syllabus: [
      "Version Control Concepts & Local Repository Setup",
      "Branching Strategies & Resolving Merge Conflicts",
      "Forking, Submitting PRs, and Code Reviews on GitHub",
      "GitHub Actions & Automated Deployment"
    ],
    prerequisites: "None! Every student from any semester is encouraged.",
    color: "#06B6D4"
  },
  {
    id: "ws-cp",
    title: "Competitive Programming & Problem Solving",
    track: "Competitive Programming",
    level: "Intermediate to Advanced",
    duration: "6 Weeks Cohort",
    dateRange: "Starts March 15, 2026",
    instructorRole: "CP Team Lead & Contest Mentor",
    summary:
      "Sharpen your algorithmic thinking and data structure skills for coding interviews and global hackathons. Learn two-pointers, binary search, trees, graphs, and dynamic programming.",
    syllabus: [
      "Time & Space Complexity Optimization (Big-O)",
      "Arrays, Strings, HashMaps & Two Pointers",
      "Binary Trees, Graphs & Shortest Path Algorithms",
      "Dynamic Programming Patterns & Greedy Algorithms"
    ],
    prerequisites: "Good grasp of C++, Java, or Python.",
    color: "#8B5CF6"
  }
];

export const TEAM_MEMBERS = [
  // Faculty Coordinators
  {
    id: "team-fac-01",
    name: "Dr. Patron Profile",
    role: "Principal & Chief Patron",
    category: "Faculty Coordinators",
    department: "Rajeev Institute of Technology",
    designation: "Principal, RIT Hassan",
    bio: "Guiding and mentoring the institution toward academic excellence, research culture, and vibrant student-led technical chapters.",
    isPlaceholder: true,
    avatarPlaceholder: "PR",
    gradient: "from-blue-600 to-indigo-700"
  },
  {
    id: "team-fac-02",
    name: "Dr. CSE Department Head",
    role: "Head of Department (CSE)",
    category: "Faculty Coordinators",
    department: "Computer Science & Engineering",
    designation: "Professor & HOD, CSE",
    bio: "Fostering industry-academia collaboration, technological incubation, and modern computing pedagogy at RIT Hassan.",
    isPlaceholder: true,
    avatarPlaceholder: "HOD",
    gradient: "from-indigo-600 to-sky-700"
  },
  {
    id: "team-fac-03",
    name: "Prof. Faculty Coordinator",
    role: "Faculty Advisor – GDG on Campus",
    category: "Faculty Coordinators",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor, CSE",
    bio: "Mentoring student club leads, coordinating institutional resources, and empowering students to host state-of-the-art tech events.",
    isPlaceholder: true,
    avatarPlaceholder: "FA",
    gradient: "from-teal-600 to-emerald-700"
  },

  // Club Coordinators
  {
    id: "team-lead-01",
    name: "Student Campus Lead (Role Placeholder)",
    role: "GDG on Campus Lead",
    category: "Club Coordinators",
    department: "Computer Science & Engineering (7th/5th Sem)",
    designation: "Chapter Organizer",
    bio: "Passionate about building inclusive tech communities, peer mentorship, and bringing Google developer tools to RIT Hassan students.",
    isPlaceholder: true,
    avatarPlaceholder: "GL",
    gradient: "from-blue-500 to-red-500"
  },
  {
    id: "team-lead-02",
    name: "Student Co-Lead (Role Placeholder)",
    role: "GDG on Campus Co-Lead",
    category: "Club Coordinators",
    department: "Computer Science & Engineering",
    designation: "Operations & Community Manager",
    bio: "Driving event logistics, student outreach, speaker coordination, and cross-departmental technological participation.",
    isPlaceholder: true,
    avatarPlaceholder: "CL",
    gradient: "from-yellow-500 to-green-600"
  },

  // Core Technical Team
  {
    id: "team-core-01",
    name: "Web Development Lead (Role Placeholder)",
    role: "Web Technologies Lead",
    category: "Core Team",
    department: "Computer Science & Engineering",
    designation: "Full-Stack Specialist",
    bio: "Architecting web platforms, modern frontend applications with React, and mentoring peers in full-stack engineering.",
    isPlaceholder: true,
    avatarPlaceholder: "WL",
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    id: "team-core-02",
    name: "AI & ML Lead (Role Placeholder)",
    role: "AI / Machine Learning Lead",
    category: "Core Team",
    department: "Computer Science & Engineering",
    designation: "GenAI & ML Specialist",
    bio: "Leading AI hackathons, Gemini API workshops, and practical machine learning project incubations on campus.",
    isPlaceholder: true,
    avatarPlaceholder: "AL",
    gradient: "from-rose-500 to-orange-500"
  },
  {
    id: "team-core-03",
    name: "Cloud & DevOps Lead (Role Placeholder)",
    role: "Google Cloud Lead",
    category: "Core Team",
    department: "Computer Science & Engineering",
    designation: "Cloud Architect",
    bio: "Helping students leverage Google Cloud Platform, Firebase, serverless architectures, and modern DevOps pipelines.",
    isPlaceholder: true,
    avatarPlaceholder: "CL",
    gradient: "from-amber-500 to-yellow-600"
  },
  {
    id: "team-core-04",
    name: "Android Mobile Lead (Role Placeholder)",
    role: "Android Technologies Lead",
    category: "Core Team",
    department: "Computer Science & Engineering",
    designation: "Kotlin & Jetpack Compose",
    bio: "Enthusiastic about clean architecture, native Kotlin mobile development, and Material Design 3 guidelines.",
    isPlaceholder: true,
    avatarPlaceholder: "ML",
    gradient: "from-emerald-500 to-green-600"
  },
  {
    id: "team-core-05",
    name: "Design & UI/UX Lead (Role Placeholder)",
    role: "UI/UX & Creative Media Lead",
    category: "Core Team",
    department: "Computer Science & Engineering",
    designation: "Figma & Design Systems",
    bio: "Creating visually compelling branding, intuitive digital experiences, event posters, and UI design workshops.",
    isPlaceholder: true,
    avatarPlaceholder: "DL",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "team-core-06",
    name: "PR & Outreach Lead (Role Placeholder)",
    role: "Public Relations & Media Lead",
    category: "Core Team",
    department: "Computer Science & Engineering",
    designation: "Community Outreach",
    bio: "Managing campus communications, student partnerships, social media narratives, and industry speaker invites.",
    isPlaceholder: true,
    avatarPlaceholder: "PL",
    gradient: "from-indigo-500 to-blue-600"
  },

  // Student Volunteers
  {
    id: "team-vol-01",
    name: "Technical Volunteer 1 (Role Placeholder)",
    role: "Technical Operations Volunteer",
    category: "Volunteers",
    department: "Computer Science & Engineering",
    designation: "Lab Support & Git Helpdesk",
    bio: "Assisting participants during hands-on coding labs, environment setups, and technical problem solving.",
    isPlaceholder: true,
    avatarPlaceholder: "V1",
    gradient: "from-slate-600 to-slate-800"
  },
  {
    id: "team-vol-02",
    name: "Event Operations Volunteer 2 (Role Placeholder)",
    role: "Event Logistics Volunteer",
    category: "Volunteers",
    department: "Computer Science & Engineering",
    designation: "Stage & Venue Management",
    bio: "Managing registrations, participant badges, audio-visual readiness, and hospitality during GDG hackathons.",
    isPlaceholder: true,
    avatarPlaceholder: "V2",
    gradient: "from-slate-600 to-slate-800"
  },
  {
    id: "team-vol-03",
    name: "Media & Photography Volunteer 3 (Role Placeholder)",
    role: "Media & Documentation Volunteer",
    category: "Volunteers",
    department: "Computer Science & Engineering",
    designation: "Content & Photography",
    bio: "Documenting event highlights, capturing workshop memories, and curating technical recaps for the campus portal.",
    isPlaceholder: true,
    avatarPlaceholder: "V3",
    gradient: "from-slate-600 to-slate-800"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "gal-01",
    title: "CODESTORM 2026 Opening Keynote",
    category: "Hackathons",
    date: "Illustrative Event Photo",
    attendees: "180+ Attendees",
    desc: "Inauguration ceremony of the campus hackathon with college dignitaries and mentors addressing aspiring hackers.",
    svgTheme: "hackathon-main",
    accentColor: "#EA4335"
  },
  {
    id: "gal-02",
    title: "Hands-on React & Modern Frontend Lab",
    category: "Workshops",
    date: "Illustrative Event Photo",
    attendees: "85 Attendees",
    desc: "Students actively coding interactive components and deploying their first web applications to cloud servers.",
    svgTheme: "web-workshop",
    accentColor: "#4285F4"
  },
  {
    id: "gal-03",
    title: "Google Gemini AI & LLM Exploration Session",
    category: "Technical events",
    date: "Illustrative Event Photo",
    attendees: "120 Attendees",
    desc: "Interactive demonstration of multimodal AI models, prompt engineering, and building agentic prototypes.",
    svgTheme: "ai-session",
    accentColor: "#34A853"
  },
  {
    id: "gal-04",
    title: "Guest Lecture: Tech Industry Trends & Open Source",
    category: "Guest lectures",
    date: "Illustrative Event Photo",
    attendees: "150 Attendees",
    desc: "Alumni and industry software engineers sharing insights on real-world engineering practices and tech career roadmaps.",
    svgTheme: "guest-lecture",
    accentColor: "#FBBC05"
  },
  {
    id: "gal-05",
    title: "Late-Night Hackathon Coding Sprint",
    category: "Hackathons",
    date: "Illustrative Event Photo",
    attendees: "40 Teams",
    desc: "Student teams collaborating through midnight to finish their hackathon prototypes before the morning demo deadline.",
    svgTheme: "night-hackathon",
    accentColor: "#8B5CF6"
  },
  {
    id: "gal-06",
    title: "Android Jetpack Compose App Showcase",
    category: "Workshops",
    date: "Illustrative Event Photo",
    attendees: "70 Attendees",
    desc: "Live mobile demonstrations where students showcased apps built from scratch within 48 hours of hands-on sessions.",
    svgTheme: "android-showcase",
    accentColor: "#34A853"
  },
  {
    id: "gal-07",
    title: "Campus Developer Community Icebreaker & Swag Distribution",
    category: "Community activities",
    date: "Illustrative Event Photo",
    attendees: "200+ Students",
    desc: "Welcoming freshers and lateral entry students into the GDG on Campus community with stickers, swags, and team games.",
    svgTheme: "community-icebreaker",
    accentColor: "#4285F4"
  },
  {
    id: "gal-08",
    title: "CodeCraft Algorithmic Battle Prize Distribution",
    category: "Technical events",
    date: "Illustrative Event Photo",
    attendees: "90 Participants",
    desc: "Honoring top student coders and team winners with trophies, merit certificates, and mentorship vouchers.",
    svgTheme: "prize-ceremony",
    accentColor: "#EA4335"
  }
];

export const FAQS = [
  {
    q: "What is GDG on Campus – RIT Hassan?",
    a: "Google Developer Groups on Campus (GDG on Campus) at Rajeev Institute of Technology, Hassan, is an official student-led technology club supported by the Department of Computer Science & Engineering. We bridge the gap between academic theory and practical software engineering through peer workshops, hackathons, and Google technologies."
  },
  {
    q: "Who can join the GDG RIT Hassan community?",
    a: "Membership is completely open to all students across all branches and semesters at Rajeev Institute of Technology, Hassan. Whether you are from Computer Science, Information Science, AI & ML, Electronics, or any other branch, everyone is warmly welcome."
  },
  {
    q: "Are GDG on Campus events and workshops free?",
    a: "Yes! All standard GDG on Campus workshops, study jams, tech talks, and meetups are 100% free of cost for RIT students. Some specialized inter-college hackathons may have nominal team registration fees to cover swags, refreshments, and prize pools."
  },
  {
    q: "Do I need prior coding experience to become a member?",
    a: "Not at all. We host beginner-friendly zero-to-hero cohorts in Web Development, Python, Git & GitHub, and UI/UX design. All you need is curiosity and willingness to learn with fellow students."
  },
  {
    q: "What benefits do members receive?",
    a: "Members receive access to hands-on workshops, Google Cloud study jams, hackathon mentorship, access to community project repositories, networking with alumni and industry professionals, and certificates of completion for major technical bootcamps."
  },
  {
    q: "How can I contribute to or lead GDG initiatives?",
    a: "We open core team and volunteer recruitment annually at the start of each academic year. You can apply through our membership portal or speak with club coordinators during any of our campus meetups."
  }
];
