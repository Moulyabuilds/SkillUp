# GDG on Campus – Rajeev Institute of Technology (RIT), Hassan
### *Upgraded with Admin Dashboard & Supabase Backend*

> **Tagline:** Connect. Learn. Build. Grow.  
> **Headline:** Where Campus Minds Build the Future.

A complete, modern, responsive, Google-inspired website for **GDG on Campus – Rajeev Institute of Technology (RIT), Hassan**, supported by the **Department of Computer Science & Engineering**.

---

## 🌟 What's New in this Upgrade

1. **Complete Admin Dashboard (`/admin`)**:
   - **Dashboard Overview**: Metrics for total events, active workshops, student registrations, checked-in attendance, track interest distribution chart, and recent sign-ups.
   - **Event Management (`/admin/events`)**: Create, edit, delete, publish, and unpublish hackathons and developer meetups with instant public visibility sync.
   - **Workshop Management (`/admin/workshops`)**: Manage cohorts, curriculum syllabus modules, difficulty levels, and schedules.
   - **Student Registration Management (`/admin/registrations`)**: Search, filter by event/type/status, view detailed applicant cards, and **Export to CSV**.
   - **Student Project Showcase Review (`/admin/projects`)**: Review student project submissions (GitHub/demo links) with one-click **Approve/Reject** functionality.
   - **QR Attendance Verification (`/admin/attendance`)**: Event attendance tracking, QR ticket scanner simulator, manual USN check-in, real-time verified attendance logs, and interactive QR pass generator.
   - **Announcements Management (`/admin/announcements`)**: Post campus bulletins that dynamically appear on the public homepage.
   - **Team Member Management (`/admin/team`)**: CRUD operations for faculty coordinators, student leads, core team, and volunteers.
   - **Gallery Media Storage (`/admin/gallery`)**: File upload and deletion using **Supabase Storage** (`gallery` bucket) with instant sync to the public gallery.

2. **Supabase PostgreSQL & Auth Backend**:
   - **Supabase Authentication**: Secure email/password login for administrators.
   - **Row Level Security (RLS)**: Enforced across all tables:
     - `profiles`: Extends `auth.users`, role-based permissions (`admin`, `coordinator`, `student`).
     - `events`: Public reads published; only admins can create/update/delete.
     - `workshops`: Public reads published; only admins can create/update/delete.
     - `registrations`: Public can submit registrations; only admins can view all & export CSV.
     - `projects`: Public reads approved projects; students can submit new entries; admins approve/reject.
     - `announcements`: Public reads active alerts; admins manage.
     - `team_members`: Public directory; admins manage.
     - `attendance`: Verified QR check-ins managed by coordinators.
   - **Supabase Storage**: Dedicated `gallery`, `projects`, and `avatars` buckets.

3. **Public Website Upgrades**:
   - Dynamic real-time loading of published events, workshops, announcements, and team members.
   - New **Project Showcase (`/showcase`)**: Features approved student hackathon and semester projects with repository & live demo links, plus a student submission modal.
   - Direct database registration: Forms on Events, Workshops, and Join Community save directly to the Supabase `registrations` table.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, Modern CSS (Google color system), React Router v6
- **Backend & Auth**: Supabase (@supabase/supabase-js), Supabase PostgreSQL, Supabase Storage
- **Utilities**: `lucide-react`, `canvas-confetti`, `qrcode.react`

---

## 📂 Project Structure

```
SkillUp/
├── public/
│   ├── logos/
│   │   ├── rit-logo.jpeg & rit-placeholder.svg
│   │   ├── dept-cse-logo.jpeg & dept-placeholder.svg
│   │   └── gdg-rit-logo.jpeg & gdg-placeholder.svg
│   └── images/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx (with Showcase & Admin links)
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── EventCard.jsx
│   │   ├── WorkshopCard.jsx
│   │   ├── TeamCard.jsx
│   │   ├── RegistrationModal.jsx (with QR ticket generation)
│   │   ├── LightboxModal.jsx
│   │   ├── Toast.jsx
│   │   └── admin/
│   │       ├── AdminLayout.jsx
│   │       ├── AdminSidebar.jsx
│   │       ├── ProtectedRoute.jsx
│   │       └── ConfirmDialog.jsx
│   ├── pages/
│   │   ├── Home.jsx (with live announcements banner)
│   │   ├── About.jsx
│   │   ├── Events.jsx (live data)
│   │   ├── Workshops.jsx (live data)
│   │   ├── Team.jsx (live data)
│   │   ├── Gallery.jsx (live storage integration)
│   │   ├── ProjectShowcase.jsx (student innovation showcase)
│   │   ├── Join.jsx (persisted membership application)
│   │   ├── Contact.jsx
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminEvents.jsx
│   │       ├── AdminWorkshops.jsx
│   │       ├── AdminRegistrations.jsx (with CSV export)
│   │       ├── AdminProjects.jsx (approval workflow)
│   │       ├── AdminAttendance.jsx (QR code check-in)
│   │       ├── AdminAnnouncements.jsx
│   │       ├── AdminTeam.jsx
│   │       └── AdminGallery.jsx (storage upload)
│   ├── context/
│   │   └── AuthContext.jsx (Supabase session & role check)
│   ├── services/
│   │   ├── eventService.js
│   │   ├── workshopService.js
│   │   ├── registrationService.js
│   │   ├── projectService.js
│   │   ├── announcementService.js
│   │   ├── teamService.js
│   │   ├── galleryService.js
│   │   └── attendanceService.js
│   ├── lib/
│   │   └── supabase.js
│   ├── data/
│   │   └── demoData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── supabase/
│   ├── schema.sql (complete tables, triggers, and RLS policies)
│   └── seed.sql (sample data for one-click setup)
├── .env.example
├── .env
├── package.json
└── README.md
```

---

## ⚡ Supabase Setup Instructions (Action Required)

Follow these steps to connect your live Supabase backend:

### Step 1: Create a Supabase Project
1. Log in to [Supabase](https://supabase.com) and click **New project**.
2. Name your project (e.g. `gdg-rit-hassan`).
3. Set a strong database password and select a region close to your users (e.g., `ap-south-1` Mumbai).

### Step 2: Run the SQL Schema & Seed Scripts
1. In your Supabase project dashboard, open the **SQL Editor** from the left navigation.
2. Open [`supabase/schema.sql`](file:///c:/Users/AISHWARYA%20S%20R/Documents/SkillUp/supabase/schema.sql) from this repository, copy its contents, paste them into the SQL Editor, and click **Run**.
3. (Optional) Run [`supabase/seed.sql`](file:///c:/Users/AISHWARYA%20S%20R/Documents/SkillUp/supabase/seed.sql) to populate initial sample events, workshops, announcements, and team members.

### Step 3: Create an Admin Account
1. In your Supabase dashboard, navigate to **Authentication > Users**.
2. Click **Add user** > **Create user**.
3. Enter your admin email (e.g., `admin@rit.ac.in`) and a secure password.
4. Go back to the **SQL Editor** and run the following query to promote your user to administrator:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE email = 'admin@rit.ac.in';
   ```

### Step 4: Configure Local Environment Variables
1. In your Supabase dashboard, go to **Project Settings > API**.
2. Copy your **Project URL** and **anon public key**.
3. Open `.env` in this project directory and add them:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
   ```

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

- Public Website: `http://localhost:3000/`
- Admin Login: `http://localhost:3000/admin/login`
- Admin Dashboard: `http://localhost:3000/admin`
