# 🎓 GEC Alumni Portal

> A full-stack alumni engagement platform for **Gandhi Engineering College, Bhubaneswar** — connecting graduates, students, and the institution through a modern web application.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-9-47A248?logo=mongodb&logoColor=white)

---

## 🚀 Setup & Installation

### 📋 Prerequisites
- **Node.js** ≥ 18 — [Download](https://nodejs.org/)
- **MongoDB** (local instance or [Atlas](https://www.mongodb.com/atlas)) — verify with `mongosh`
- **npm** (comes with Node.js)

### ⚙️ Getting Started
1. **Clone & Install**
   ```bash
   git clone <your-repo-url>
   cd gec-alumni
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file inside `server/` (optional — sensible defaults are used):
   ```env
   MONGO_URI=mongodb://localhost:27017/gec-alumni
   JWT_SECRET=your_secret_key_here
   PORT=5000
   ```

3. **Start MongoDB**
   ```bash
   mongosh
   # Leave this terminal open
   ```

4. **Start the Backend**
   ```bash
   npm run server
   ```

5. **Start the Frontend**
   Open a **new terminal**:
   ```bash
   npm run dev
   ```

6. **Open the App**
   Navigate to **http://localhost:5173** in your browser.

---

## ✨ Features & Tech Stack

### 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Backend | Node.js + Express 5 |
| Database | MongoDB + Mongoose 9 |
| Auth | JWT + bcryptjs |
| Styling | Vanilla CSS with glassmorphism and responsive design |

### 🌟 Key Modules
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

## 📁 Project Architecture

### 📂 Structure
```
gec-alumni/
├── public/                     # Static assets (logos, icons)
├── src/                        # React frontend
│   ├── App.jsx                 # Root component — state & routing
│   ├── HomeView.jsx            # Landing page with hero & stats
│   ├── Layout.jsx              # Header, navbar, utility bar
│   ├── views.jsx               # Page views (Directory, Jobs, Events, etc.)
│   ├── Modals.jsx              # User interaction modals
│   └── styles.css              # Global styles
├── server/                     # Express backend
│   ├── server.js               # App entry point
│   ├── db.js                   # MongoDB connection
│   ├── models/                 # Mongoose schemas
│   └── routes/                 # API endpoints
└── package.json
```

### 🛡️ Logic & Validation
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

## 🔌 API & Data Management

### 📥 Seeding Demo Data
Populate the database with sample student records for testing:
```bash
curl -X POST http://localhost:5000/api/students/seed
```
*Seeds ~35 demo students across multiple batches and departments.*

### 🔗 API Reference
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Login with email & password |
| `GET` | `/api/alumni` | List all alumni |
| `GET` | `/api/students/:roll` | Lookup student by roll number |
| `POST` | `/api/events` | Create a new event (auth required) |
| `POST` | `/api/jobs` | Post a new job (auth required) |
| `POST` | `/api/donate` | Contribute to a cause |

---

## 🧪 Testing & QA

### 🔑 Demo Credentials
> **Note:** Run `node server/seeder.js` first to populate these accounts.

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@gec.edu.in` | `admin123` |
| **Alumni** | `rahul.sharma@gmail.com` | `admin123` |

### 📊 Seeded Data Summary
| Entity | Count | Details |
|---|---|---|
| **Alumni** | 25 | 20 Approved + 5 Pending |
| **Jobs/Events** | 18 | Spread across departments |
| **Donations** | 5 | Active causes |

### 🧭 Testing Walkthrough
1. **Seed database** — `node server/seeder.js`
2. **Login as Admin** — `admin@gec.edu.in` / `admin123`
3. **Approve Alumni** — Review pending requests in dashboard
4. **Register** — Enter roll `1801292001` in Registration form

---

## 🤝 Contributing & Git

### 🐙 GitHub Workflow
1. **Pull latest changes:** 
   ```bash
   git pull origin main
   ```
2. **Check Status:** 
   ```bash
   git status
   ```
3. **Stage & Commit:** 
   ```bash
   git add .
   git commit -m "feat: your descriptive message"
   ```
4. **Push:** 
   ```bash
   git push origin your-branch-name
   ```

### 📝 Contribution Rules
1. **Fork** the repository
2. **Create a branch** — `git checkout -b feature/your-feature`
3. **Commit** your changes — `git commit -m "Add your feature"`
4. **Open a Pull Request**

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
- Check `MONGO_URI` in your `.env` file
</details>

---

## 📜 License
This project is developed for academic purposes at **Gandhi Engineering College, Bhubaneswar**.

<p align="center">
  Built with ❤️ by the GEC Alumni Team
</p>
