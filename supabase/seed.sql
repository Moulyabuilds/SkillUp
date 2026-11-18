-- ==============================================================================
-- GDG ON CAMPUS – RIT HASSAN
-- Initial Seed Data Script for Supabase PostgreSQL
-- ==============================================================================

-- 1. Initial Announcements
insert into public.announcements (title, content, badge, link_url, is_active, priority)
values
  ('CODESTORM 2026 Registrations Open!', 'The 24-Hour Campus Hackathon of RIT Hassan is scheduled for April 18-19. Register your team before April 5.', 'Hackathon Alert', '/events', true, 10),
  ('Gemini AI Masterclass', 'Hands-on session with Google Gemini 2.0 API and Agentic workflows on March 28.', 'Tech Workshop', '/workshops', true, 5)
on conflict do nothing;

-- 2. Initial Events
insert into public.events (title, slug, category, description, date, time, venue, mode, capacity, color, badge, prerequisites, is_published)
values
  (
    'CODESTORM 2026: 24-Hour Campus Hackathon',
    'codestorm-2026',
    'Hackathons',
    'The flagship annual collegiate hackathon of RIT Hassan. Teams build innovative solutions solving real-world challenges across Smart Campus, Healthcare, FinTech, and Sustainable Tech.',
    'April 18 - 19, 2026',
    '09:00 AM - 09:00 AM (24 Hrs)',
    'Main Computing Center & CSE Auditorium, RIT Hassan',
    'In-Person',
    '40 Teams (160 Hackers)',
    '#EA4335',
    'Flagship Hackathon',
    'Open to all engineering students. Bring your laptops and enthusiasm!',
    true
  ),
  (
    'Google Gemini AI & Multimodal Agent Workshop',
    'gemini-ai-workshop',
    'Technical talks',
    'Deep dive into Google''s latest Gemini models, function calling, structured JSON output, and building autonomous generative AI assistants for web and mobile.',
    'March 28, 2026',
    '10:30 AM - 01:00 PM',
    'CSE Seminar Hall, 2nd Floor, RIT Hassan',
    'In-Person',
    '120 Seats',
    '#4285F4',
    'Hands-on Workshop',
    'Basic Python or JavaScript knowledge.',
    true
  ),
  (
    'DevFest RIT Campus Meetup: Google Cloud & Firebase',
    'devfest-campus-meetup',
    'Developer meetups',
    'A high-energy developer gathering featuring technical talks on serverless cloud architecture, Firebase real-time database, live lightning demos, and networking with tech alumni.',
    'March 14, 2026',
    '02:00 PM - 05:30 PM',
    'Audio-Visual Hall, RIT Hassan',
    'In-Person',
    '150 Attendees',
    '#FBBC05',
    'Community Meetup',
    'None. Open to 1st through 8th semester students.',
    true
  ),
  (
    'CodeCraft: DSA & Competitive Coding Sprint',
    'codecraft-dsa-sprint',
    'Coding competitions',
    'A 3-hour speed coding contest focusing on algorithms, graph theory, dynamic programming, and data structures. Top performers win certificates and exclusive GDG swags.',
    'May 02, 2026',
    '04:00 PM - 07:00 PM',
    'Online Contest (HackerRank / Codeforces)',
    'Online',
    'Unlimited Registrations',
    '#34A853',
    'Contest',
    'Working proficiency in C++, Java, or Python.',
    true
  )
on conflict do nothing;

-- 3. Initial Workshops
insert into public.workshops (title, track, level, duration, date_range, instructor_role, summary, syllabus, prerequisites, color, is_published)
values
  (
    'Modern Web Development with React & Vite',
    'Web Development',
    'Beginner to Intermediate',
    '4 Weeks (Weekend Cohort)',
    'Starts March 07, 2026',
    'Web Tech Coordinator, GDG RIT',
    'Master the essential building blocks of production web apps: component lifecycles, custom hooks, React Router v6, responsive styling, and modern build tooling.',
    '["ES6+ JavaScript Fundamentals & Async/Await", "Component Composition, Props, and State Mechanics", "Routing, Forms, and Validations in React", "Connecting with REST APIs & Cloud Backend"]'::jsonb,
    'Basic HTML, CSS and foundational JavaScript.',
    '#4285F4',
    true
  ),
  (
    'Generative AI & Multimodal LLMs with Gemini',
    'Artificial Intelligence',
    'Intermediate',
    '2-Day Intensive Masterclass',
    'March 21 - 22, 2026',
    'AI / ML Research Team Lead',
    'Unlock the capabilities of Gemini 1.5/2.0 Flash and Pro. Learn prompt design, system instructions, function calling, image analysis, and retrieval augmented generation (RAG).',
    '["Introduction to Foundation Models & Tokenization", "Advanced Prompt Engineering & System Prompts", "Calling Google Gemini API via Python & JavaScript", "Building a Campus Knowledge Chatbot with RAG"]'::jsonb,
    'Familiarity with Python or JavaScript syntax.',
    '#EA4335',
    true
  ),
  (
    'Machine Learning: From Math to TensorFlow',
    'Machine Learning',
    'Intermediate',
    '3 Weeks',
    'Starts April 04, 2026',
    'ML Coordinator, Dept. of CSE',
    'A hands-on journey from data preprocessing and Scikit-Learn pipelines to training Convolutional Neural Networks for image classification with TensorFlow.',
    '["NumPy, Pandas & Exploratory Data Analysis (EDA)", "Supervised & Unsupervised Learning Algorithms", "Deep Learning with Keras & TensorFlow", "Deploying ML Models as Web APIs"]'::jsonb,
    'Python basics and linear algebra fundamentals.',
    '#EA4335',
    true
  ),
  (
    'Google Cloud Platform & Serverless Architecture',
    'Google Cloud',
    'Beginner to Advanced',
    '3 Sessions',
    'April 18 - 25, 2026',
    'Cloud Platform Mentor',
    'Explore cloud computing paradigms: Google Cloud Run, Cloud Functions, Firestore, and CI/CD pipelines. Learn how to architect zero-maintenance backend solutions.',
    '["Cloud Concepts: IaaS vs PaaS vs Serverless", "Deploying Microservices on Google Cloud Run", "Firebase Auth, Firestore & Cloud Storage", "Securing Cloud APIs & Cost Management"]'::jsonb,
    'Understanding of client-server architecture.',
    '#FBBC05',
    true
  ),
  (
    'Android App Development with Kotlin & Jetpack Compose',
    'Android Development',
    'Beginner',
    '4 Weeks',
    'Starts May 09, 2026',
    'Mobile Development Lead',
    'Build clean, beautiful native Android apps using Google''s recommended modern declarative UI toolkit, Kotlin coroutines, and Room local database.',
    '["Kotlin Syntax & OOP Concepts for Android", "Composable Functions, States & Modifiers", "Navigation in Compose & Architecture (MVVM)", "Consuming REST APIs with Retrofit"]'::jsonb,
    'Basic programming concepts in Java, C++ or Python.',
    '#34A853',
    true
  ),
  (
    'Git, GitHub & Open Source Mastery',
    'Git and GitHub',
    'Beginner (Must-Have for All)',
    '1 Day (Hands-on Lab)',
    'February 28, 2026',
    'Open Source Advocate',
    'Demystify version control. Learn commit hygiene, branches, rebasing, pull requests, resolving merge conflicts, and contributing to open-source student repositories.',
    '["Version Control Concepts & Local Repository Setup", "Branching Strategies & Resolving Merge Conflicts", "Forking, Submitting PRs, and Code Reviews on GitHub", "GitHub Actions & Automated Deployment"]'::jsonb,
    'None! Every student from any semester is encouraged.',
    '#06B6D4',
    true
  ),
  (
    'Competitive Programming & Problem Solving',
    'Competitive Programming',
    'Intermediate to Advanced',
    '6 Weeks Cohort',
    'Starts March 15, 2026',
    'CP Team Lead & Contest Mentor',
    'Sharpen your algorithmic thinking and data structure skills for coding interviews and global hackathons. Learn two-pointers, binary search, trees, graphs, and dynamic programming.',
    '["Time & Space Complexity Optimization (Big-O)", "Arrays, Strings, HashMaps & Two Pointers", "Binary Trees, Graphs & Shortest Path Algorithms", "Dynamic Programming Patterns & Greedy Algorithms"]'::jsonb,
    'Good grasp of C++, Java, or Python.',
    '#8B5CF6',
    true
  )
on conflict do nothing;

-- 4. Initial Team Members
insert into public.team_members (name, role, category, department, designation, bio, avatar_placeholder, is_placeholder, order_index)
values
  ('Dr. Patron Profile', 'Principal & Chief Patron', 'Faculty Coordinators', 'Rajeev Institute of Technology', 'Principal, RIT Hassan', 'Guiding and mentoring the institution toward academic excellence, research culture, and vibrant student-led technical chapters.', 'PR', true, 1),
  ('Dr. CSE Department Head', 'Head of Department (CSE)', 'Faculty Coordinators', 'Computer Science & Engineering', 'Professor & HOD, CSE', 'Fostering industry-academia collaboration, technological incubation, and modern computing pedagogy at RIT Hassan.', 'HOD', true, 2),
  ('Prof. Faculty Coordinator', 'Faculty Advisor – GDG on Campus', 'Faculty Coordinators', 'Computer Science & Engineering', 'Assistant Professor, CSE', 'Mentoring student club leads, coordinating institutional resources, and empowering students to host state-of-the-art tech events.', 'FA', true, 3),
  ('Student Campus Lead (Role Placeholder)', 'GDG on Campus Lead', 'Club Coordinators', 'Computer Science & Engineering', 'Chapter Organizer', 'Passionate about building inclusive tech communities, peer mentorship, and bringing Google developer tools to RIT Hassan students.', 'GL', true, 4),
  ('Student Co-Lead (Role Placeholder)', 'GDG on Campus Co-Lead', 'Club Coordinators', 'Computer Science & Engineering', 'Operations & Community Manager', 'Driving event logistics, student outreach, speaker coordination, and cross-departmental technological participation.', 'CL', true, 5),
  ('Web Development Lead (Role Placeholder)', 'Web Technologies Lead', 'Core Team', 'Computer Science & Engineering', 'Full-Stack Specialist', 'Architecting web platforms, modern frontend applications with React, and mentoring peers in full-stack engineering.', 'WL', true, 6),
  ('AI & ML Lead (Role Placeholder)', 'AI / Machine Learning Lead', 'Core Team', 'Computer Science & Engineering', 'GenAI & ML Specialist', 'Leading AI hackathons, Gemini API workshops, and practical machine learning project incubations on campus.', 'AL', true, 7),
  ('Cloud & DevOps Lead (Role Placeholder)', 'Google Cloud Lead', 'Core Team', 'Computer Science & Engineering', 'Cloud Architect', 'Helping students leverage Google Cloud Platform, Firebase, serverless architectures, and modern DevOps pipelines.', 'CL', true, 8),
  ('Technical Volunteer 1 (Role Placeholder)', 'Technical Operations Volunteer', 'Volunteers', 'Computer Science & Engineering', 'Lab Support & Git Helpdesk', 'Assisting participants during hands-on coding labs, environment setups, and technical problem solving.', 'V1', true, 9)
on conflict do nothing;

-- 5. Sample Student Projects for Showcase
insert into public.projects (title, description, student_name, usn, department, category, tech_stack, github_url, demo_url, status)
values
  (
    'CampusAI: RIT Academic Query Assistant',
    'A RAG-powered chatbot using Google Gemini 2.0 Flash to answer student inquiries on exam schedules, VTU regulations, and syllabus outlines.',
    'Varun K & Sneha P',
    '4RA22CS088',
    'Computer Science & Engineering',
    'AI & Machine Learning',
    array['React', 'Gemini API', 'Node.js', 'Vector DB'],
    'https://github.com',
    'https://rit-campus-ai.dev',
    'approved'
  ),
  (
    'AgriPulse: Smart Crop Disease Detection',
    'A lightweight mobile app that classifies plant leaf infections offline using an on-device TensorFlow Lite model for Hassan farmers.',
    'Rohit Gowda',
    '4RA22CS054',
    'Computer Science & Engineering',
    'Mobile & Computer Vision',
    array['Kotlin', 'Jetpack Compose', 'TensorFlow Lite'],
    'https://github.com',
    'https://agripulse.dev',
    'approved'
  ),
  (
    'SmartCampus IoT Energy Monitor',
    'Real-time classroom power consumption tracker using ESP32 microcontrollers and a Firebase live dashboard.',
    'Manoj Kumar',
    '4RA23CS012',
    'Computer Science & Engineering',
    'IoT & Cloud',
    array['ESP32', 'Firebase', 'React'],
    'https://github.com',
    null,
    'pending'
  )
on conflict do nothing;
