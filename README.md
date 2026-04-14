<![CDATA[# 🎓 GEC Alumni Portal

> A full-stack alumni engagement platform for **Gandhi Engineering College, Bhubaneswar** — connecting graduates, students, and the institution through a modern web application.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-9-47A248?logo=mongodb&logoColor=white)

---

## ✨ Features

| Module | Description |
|---|---|
| **Alumni Registration** | Roll-number verification → auto-filled details → admin approval workflow |
| **Authentication** | JWT-based login for approved alumni with role-aware access |
| **Alumni Directory** | Searchable directory with batch/department filters and profile views |
| **Job Board** | Alumni can post opportunities; students can browse and apply |
| **Events Hub** | Create campus events, view upcoming events, and register to attend |
| **Donation Portal** | Support college causes with tracked contributions and progress bars |
| **Admin Dashboard** | Approve/reject registrations, manage users, jobs, events, and student data |
| **Alumni Stories** | Share and read success stories from the GEC community |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Backend | Node.js + Express 5 |
| Database | MongoDB + Mongoose 9 |
| Auth | JWT + bcryptjs |
| Styling | Vanilla CSS with glassmorphism and responsive design |

---

## 📁 Project Structure

```
gec-alumni/
├── public/                     # Static assets (logos, icons)
│   ├── geclogo.png
│   ├── favicon.svg
│   └── icons.svg
├── src/                        # React frontend
│   ├── App.jsx                 # Root component — state & routing
│   ├── HomeView.jsx            # Landing page with hero & stats
│   ├── Layout.jsx              # Header, navbar, utility bar
│   ├── views.jsx               # Directory, Jobs, Events, Donate, Admin, Profile views
│   ├── Modals.jsx              # Login, Register, PostJob, CreateEvent modals
│   ├── Cards.jsx               # Reusable card components
│   ├── components.jsx          # Shared UI components (toasts, etc.)
│   ├── data.js                 # Static data constants
│   ├── styles.css              # Global stylesheet
│   └── main.jsx                # React DOM entry point
├── server/                     # Express backend
│   ├── server.js               # App startup & route wiring
│   ├── db.js                   # MongoDB connection
│   ├── seeder.js               # Demo data seeder
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/
│   │   ├── User.js             # Alumni/admin user schema
│   │   ├── Student.js          # GEC student records schema
│   │   ├── Event.js            # Events schema
│   │   ├── Job.js              # Job postings schema
│   │   └── DonationCause.js    # Donation causes schema
│   └── routes/
│       ├── auth.js             # /api/auth — register & login
│       ├── alumni.js           # /api/alumni — alumni list & approval
│       ├── students.js         # /api/students — roll lookup & seeding
│       ├── events.js           # /api/events — CRUD & registration
│       ├── jobs.js             # /api/jobs — CRUD
│       └── donate.js           # /api/donate — causes & contributions
├── index.html                  # Vite HTML entry
├── vite.config.js
├── package.json
└── README.md
```

---

## 📋 Prerequisites

- **Node.js** ≥ 18 — [Download](https://nodejs.org/)
- **MongoDB** (local instance or [Atlas](https://www.mongodb.com/atlas)) — verify with `mongosh`
- **npm** (comes with Node.js)

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd gec-alumni

# Install all dependencies (frontend + backend share one package.json)
npm install
```

### 2. Configure Environment

Create a `.env` file inside `server/` (optional — sensible defaults are used):

```env
MONGO_URI=mongodb://localhost:27017/gec-alumni
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 3. Start MongoDB

```bash
mongosh
# You should see a > prompt — leave this terminal open
```

### 4. Start the Backend

```bash
npm run server
```

Expected output:

```
Server running on http://localhost:5000
MongoDB Connected
```

### 5. Start the Frontend

Open a **new terminal**:

```bash
npm run dev
```

Expected output:

```
VITE v8.x.x ready
Local: http://localhost:5173/
```

### 6. Open the App

Navigate to **http://localhost:5173** in your browser.

---

## 🌱 Seeding Demo Data

Populate the database with sample student records for testing:

```bash
curl -X POST http://localhost:5000/api/students/seed
```

This seeds **~35 demo students** with 10-digit roll numbers (e.g., `1801292001` through `2201292035`) across multiple batches and departments. Running again will clear and re-seed.

---

## 🔌 API Reference

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new alumni account (pending approval) |
| `POST` | `/api/auth/login` | Login with email & password → returns JWT |

### Alumni

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/alumni` | List all alumni |
| `PUT` | `/api/alumni/:id/approve` | Approve a pending registration (admin) |

### Students

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students/:roll` | Lookup student by roll number (case-insensitive) |
| `POST` | `/api/students/seed` | Seed demo student data |

### Events

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/events` | List all events |
| `POST` | `/api/events` | Create a new event (auth required) |
| `PUT` | `/api/events/:id/register` | Register for an event |

### Jobs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/jobs` | List all job postings |
| `POST` | `/api/jobs` | Post a new job (auth required) |

### Donations

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/donate` | List all donation causes |
| `POST` | `/api/donate` | Contribute to a cause |

---

## 🧪 Demo Credentials & Testing

> **Important:** Run the seeder first to populate the database with all demo data:
>
> ```bash
> cd server
> node seeder.js
> ```

### 🔑 Admin Login

| Field | Value |
|---|---|
| **Email** | `admin@gec.edu.in` |
| **Password** | `admin123` |
| **Role** | Admin — full access to dashboard, approvals, and management |

### 👤 Sample Alumni Logins (Approved)

All seeded alumni use the password **`admin123`**. Here are some you can try:

| Name | Email | Dept | Batch | Company |
|---|---|---|---|---|
| Rahul Sharma | `rahul.sharma@gmail.com` | CSE | 2018 | TCS |
| Priya Dash | `priya.dash@gov.in` | Civil | 2015 | Govt of Odisha |
| Deepak Nayak | `deepak.nayak@amazon.com` | CSE | 2016 | Amazon |
| Sneha Mohanty | `sneha.mohanty@wipro.com` | IT | 2019 | Wipro |
| Ananya Nanda | `ananya.nanda@google.com` | AI | 2022 | Google |
| Smruti Ranjan Swain | `smruti.swain@microsoft.com` | CSE | 2015 | Microsoft |

### ⏳ Pending Alumni (Awaiting Admin Approval)

These accounts exist but **cannot login** until an admin approves them:

| Name | Email | Roll Number |
|---|---|---|
| Suresh Patel | `suresh.patel@wipro.com` | `2101292021` |
| Anita Mahapatra | `anita.m@lnt.com` | `1901292022` |
| Vikram Panda | `vikram.panda@mindtree.com` | `2201292023` |
| Monalisa Sethi | `monalisa.s@tech.com` | `2001292024` |
| Ashutosh Tripathy | `ashutosh.t@gmail.com` | `2301292025` |

### 📋 Roll Numbers for Registration

Use any of these roll numbers during registration — the form will auto-populate student details:

| Roll Number | Name | Department | Batch |
|---|---|---|---|
| `1801292001` | Rahul Sharma | Computer Science and Engineering | 2018 |
| `1501292002` | Priya Dash | Civil Engineering | 2015 |
| `1701292003` | Amit Kumar Patra | Computer Science and Engineering | 2017 |
| `1901292004` | Sneha Mohanty | Information Technology | 2019 |
| `1601292005` | Rajesh Behera | Mechanical Engineering | 2016 |
| `2001292006` | Swati Mishra | Electronics and Communication | 2020 |
| `2101292015` | Itishree Barik | Data Science | 2021 |
| `2201292019` | Ananya Nanda | Artificial Intelligence | 2022 |

> **Note:** The full database contains **20 student records** spanning batches 2013–2022 across all departments.

### 📊 Seeded Data Summary

| Entity | Count | Details |
|---|---|---|
| **Admin** | 1 | Dr. Sanjay Kumar Panda |
| **Approved Alumni** | 20 | Across CSE, IT, Mech, Civil, ECE, EEE, DS, AI |
| **Pending Alumni** | 5 | Awaiting admin approval |
| **Job Postings** | 10 | TCS, Amazon, Infosys, Bosch, L&T, etc. |
| **Events** | 8 | Reunions, webinars, career fairs, workshops |
| **Donation Causes** | 5 | Scholarships, labs, library, sports, innovation |
| **Student Records** | 20 | For roll number verification |

### 🧭 Testing Walkthrough

1. **Seed the database** — `node server/seeder.js`
2. **Login as Admin** — `admin@gec.edu.in` / `admin123`
3. **Explore Admin Panel** — view pending approvals, manage users, jobs, events
4. **Approve a pending alumni** — e.g., approve Suresh Patel
5. **Logout and login as alumni** — `rahul.sharma@gmail.com` / `admin123`
6. **Try registration** — Click Register → enter roll `1801292001` → details auto-fill
7. **Browse features** — Directory, Job Board, Events, Donations, Alumni Stories

---

## 🐛 Troubleshooting

<details>
<summary><strong>Port 5000 already in use</strong></summary>

```powershell
Get-Process node | Stop-Process -Force
npm run server
```
</details>

<details>
<summary><strong>MongoDB not connecting</strong></summary>

- Ensure the MongoDB service is running
- Verify with `mongosh --version` and `mongosh`
- Check `MONGO_URI` in your `.env` file
</details>

<details>
<summary><strong>Roll number lookup not working</strong></summary>

- Confirm the backend is running on `http://localhost:5000`
- Seed data first: `curl -X POST http://localhost:5000/api/students/seed`
- Check browser console (F12) for CORS errors
</details>

<details>
<summary><strong>"Cannot find module" errors</strong></summary>

- Run `npm install` in the project root
- Restart both servers
</details>

<details>
<summary><strong>Blank page on frontend</strong></summary>

- Check browser console for JS errors
- Clear cache with `Ctrl + Shift + Delete`
- Restart with `npm run dev`
</details>

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create a branch** — `git checkout -b feature/your-feature`
3. **Commit** your changes — `git commit -m "Add your feature"`
4. **Push** — `git push origin feature/your-feature`
5. **Open a Pull Request**

Please run `npm run lint` before submitting.

---

## 🛡️ Logic & Validation

We use a strict if-else validation pattern for all critical routes (Login, Registration, etc.) to ensure data integrity and provide clear debugging logs:

```javascript
if (inputField) {
  // Proceed with logic
} else {
  console.log(new Error('Description of missing field'));
  return res.status(400).json({ message: 'User-friendly error message' });
}
```

---

## 🐙 GitHub Workflow

To ensure a smooth development process, follow these steps when contributing:

1. **Pull latest changes:** Always start by pulling the latest code from the main branch.
   ```bash
   git pull origin main
   ```
2. **Check Status:** Verify your current branch and staged changes.
   ```bash
   git status
   ```
3. **Stage & Commit:** Use descriptive commit messages.
   ```bash
   git add .
   git commit -m "feat: added input validation for auth routes"
   ```
4. **Push:** Push your changes to GitHub.
   ```bash
   git push origin your-branch-name
   ```

---

## 📜 License

This project is developed for academic purposes at **Gandhi Engineering College, Bhubaneswar**.

---

<p align="center">
  Built with ❤️ by the GEC Alumni Team
</p>
]]>
