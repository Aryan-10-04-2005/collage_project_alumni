/* ============================================================
   App.jsx  |  GEC Alumni Portal — Root Application Component
   Entry point · State management · View routing
   Gandhi Engineering College, Bhubaneswar · gec.edu.in
   ============================================================ */

import { useState, useEffect, useCallback } from "react";

import "./styles.css";

const STORIES = [{ id: 1, author: "System", batch: "2024", content: "Welcome to the new MongoDB-powered Alumni Portal!" }];
import { Toasts } from "./components.jsx";
import { TopUtilityBar, Header, Navbar } from "./Layout.jsx";
import HomeView from "./HomeView.jsx";
import {
  DirectoryView,
  JobsView,
  EventsView,
  StoriesView,
  DonateView,
  ProfileView,
  AdminView,
} from "./views.jsx";
import {
  LoginModal,
  RegisterModal,
  PostJobModal,
  CreateEventModal,
  ApplyModal,
  RegEventModal,
} from "./Modals.jsx";

export default function GECAlumniPortal() {
  /* ── CORE STATE ── */
  const [view,      setView]      = useState("home");   // string | { page, data }
  const [alumni,    setAlumni]    = useState([]);
  const [jobs,      setJobs]      = useState([]);
  const [events,    setEvents]    = useState([]);
  const [causes,    setCauses]    = useState([]);
  const [students,  setStudents]  = useState([]);
  const [toasts,    setToasts]    = useState([]);
  
  // Auth state
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    // Fetch Initial Data
    fetch('http://localhost:5000/api/alumni').then(r => r.json()).then(setAlumni).catch(console.error);
    fetch('http://localhost:5000/api/jobs').then(r => r.json()).then(setJobs).catch(console.error);
    fetch('http://localhost:5000/api/events').then(r => r.json()).then(setEvents).catch(console.error);
    fetch('http://localhost:5000/api/donate').then(r => r.json()).then(setCauses).catch(console.error);
    fetch('http://localhost:5000/api/students').then(r => r.json()).then(setStudents).catch(console.error);
  }, []);

  /* ── MODAL STATE ── */
  const [loginOpen,  setLoginOpen]  = useState(false);
  const [regOpen,    setRegOpen]    = useState(false);
  const [postOpen,   setPostOpen]   = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [applyJob,   setApplyJob]   = useState(null);   // job object | null
  const [regEv,      setRegEv]      = useState(null);   // event object | null

  /* ── TOAST HELPER ── */
  const toast = useCallback((msg, type = "") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }, []);

  /* ── HANDLERS ── */
  const handleRegister = async (data) => {
    try {
      const payload = { ...data, password: data.pw };
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const result = await res.json();
      if(res.ok) {
        toast("Registration submitted! Awaiting admin approval.", "success");
      } else { toast(result.message || 'Registration failed', "error"); }
    } catch(err) { console.error(err); toast('Error registering', "error"); }
  };

  const handleLogin = async (data) => {
    // Assumes login modal returns email/password directly
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
      });
      const result = await res.json();
      if(res.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
        setToken(result.token);
        toast("Welcome back to GEC Alumni Portal!", "success");
        setLoginOpen(false);
      } else { toast(result.message || 'Login failed', "error"); }
    } catch(err) { console.error(err); toast('Error logging in', "error"); }
  };

  const handlePostJob = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data)
      });
      const newJob = await res.json();
      if(res.ok) { setJobs(p => [newJob, ...p]); toast("Job posted successfully!", "success"); }
      else { toast(newJob.message, "error"); }
    } catch(err) { console.error(err); toast('Error posting job', "error"); }
  };

  const handleCreateEvent = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data)
      });
      const newEvent = await res.json();
      if(res.ok) { setEvents(p => [newEvent, ...p]); toast("Event created!", "success"); }
      else { toast(newEvent.message, "error"); }
    } catch(err) { console.error(err); toast('Error creating event', "error"); }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/alumni/${id}/approve`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ isApproved: true })
      });
      if(res.ok) {
        const updated = await res.json();
        const formatted = { ...updated, id: updated._id, pending: !updated.isApproved };
        setAlumni(p => p.map(a => a.id === id ? formatted : a));
        toast("Alumni approved successfully!", "success");
      }
    } catch(err) { console.error(err); toast('Approval failed', 'error'); }
  };

  const handleReject = (id) => {
    setAlumni(p => p.filter(a => a._id !== id));
    toast("Registration rejected.", "warn");
  };

  const handleDonate = async (amt, causeId) => {
    const amount = parseInt(amt);
    if (!amount || amount <= 0) { toast("Please select or enter a donation amount.", "error"); return; }
    try {
      const res = await fetch('http://localhost:5000/api/donate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: causeId, amount })
      });
      if (res.ok) {
        const updatedCause = await res.json();
        setCauses(p => p.map(c => c.id === causeId ? updatedCause : c));
        toast(`Thank you! ₹${amount.toLocaleString("en-IN")} donated successfully. Jai GEC! 🙏`, "success");
      }
    } catch(err) { console.error(err); toast('Donation error', 'error'); }
  };

  /* ── DERIVED CURRENT VIEW ── */
  const curView    = typeof view === "object" ? view.page : view;
  const profileData = typeof view === "object" ? view.data : null;

  /* ── RENDER ── */
  return (
    <div>
      <TopUtilityBar />
      <Header
        setView={setView}
        onLogin={() => setLoginOpen(true)}
        onRegister={() => setRegOpen(true)}
      />
      <Navbar view={view} setView={setView} />

      {/* ── PAGE VIEWS ── */}
      {curView === "home" && (
        <HomeView
          alumni={alumni}
          jobs={jobs}
          events={events}
          stories={STORIES}
          setView={setView}
          onRegister={() => setRegOpen(true)}
          onApply={setApplyJob}
          onEvReg={setRegEv}
        />
      )}
      {curView === "directory" && (
        <DirectoryView
          alumni={alumni}
          onView={a => setView({ page:"profile", data:a })}
        />
      )}
      {curView === "jobs" && (
        <JobsView
          jobs={jobs}
          onApply={setApplyJob}
          onPost={() => setPostOpen(true)}
        />
      )}
      {curView === "events" && (
        <EventsView
          events={events}
          onReg={setRegEv}
          onCreate={() => setCreateOpen(true)}
        />
      )}
      {curView === "stories"  && <StoriesView stories={STORIES} />}
      {curView === "donate"   && <DonateView causes={causes} onDonate={handleDonate} />}
      {curView === "admin"    && (
        <AdminView
          alumni={alumni}
          jobs={jobs}
          events={events}
            causes={causes}
          students={students}
          onApprove={handleApprove}
          onReject={handleReject}
          onPost={() => setPostOpen(true)}
          onCreate={() => setCreateOpen(true)}
          onView={a => setView({ page:"profile", data:a })}
          toast={toast}
        />
      )}
      {curView === "profile" && profileData && (
        <ProfileView a={profileData} onBack={() => setView("directory")} />
      )}

      {/* ── MODALS ── */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onOk={handleLogin}
      />
      <RegisterModal
        open={regOpen}
        onClose={() => setRegOpen(false)}
        onOk={handleRegister}
      />
      <PostJobModal
        open={postOpen}
        onClose={() => setPostOpen(false)}
        onOk={handlePostJob}
      />
      <CreateEventModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onOk={handleCreateEvent}
      />
      <ApplyModal
        open={!!applyJob}
        onClose={() => setApplyJob(null)}
        job={applyJob}
        onOk={() => toast("Application submitted! The alumni contact will reach out.", "success")}
      />
      <RegEventModal
        open={!!regEv}
        onClose={() => setRegEv(null)}
        ev={regEv}
        onOk={() => toast("Registered! Check your email for confirmation.", "success")}
      />

      {/* ── TOAST NOTIFICATIONS ── */}
      <Toasts list={toasts} />
    </div>
  );
}
