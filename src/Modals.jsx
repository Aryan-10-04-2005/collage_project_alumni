/* ============================================================
   Modals.jsx  |  GEC Alumni Portal — All Modal Dialogs
   LoginModal · RegisterModal · PostJobModal
   CreateEventModal · ApplyModal · RegEventModal
   ============================================================ */

import { useState } from "react";
import { Modal, Btn, Field, SelField, TxtField } from "./components.jsx";
import { DEPTS } from "./data.js";

/* ── LOGIN MODAL ── */
export function LoginModal({ open, onClose, onOk }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (
    <Modal open={open} onClose={onClose} title="Login — GEC Alumni Portal"
      footer={
        <>
          <Btn cls="btn-outline" size="sm" onClick={onClose}>Cancel</Btn>
          <Btn cls="btn-maroon" size="sm" onClick={() => { if (email && pw) { onOk({ email, password: pw }); } }}>Login</Btn>
        </>
      }
    >
      <Field label="GEC Email / Roll No." type="email" placeholder="e.g. 0601CSE01 or you@gec.edu.in" value={email} onChange={e => setEmail(e.target.value)} />
      <Field label="Password" type="password" placeholder="Enter your password" value={pw} onChange={e => setPw(e.target.value)} />
      <div style={{ fontSize:".78rem", color:"var(--gray)", marginBottom:12 }}>
        First time?{" "}
        <span style={{ color:"var(--navy)", cursor:"pointer", fontWeight:600 }}>Register here</span>
        {" "}|{" "}
        <span style={{ color:"var(--navy)", cursor:"pointer" }}>Forgot password?</span>
      </div>
    </Modal>
  );
}

/* ── REGISTER MODAL ── */
export function RegisterModal({ open, onClose, onOk }) {
  const [f, setF] = useState({ first:"", last:"", email:"", year:"", dept:"", company:"", role:"", location:"", industry:"", skills:"", roll:"", pw:"" });
  const [rollError, setRollError] = useState("");
  
  const up = k => e => setF(p => ({ ...p, [k]: e.target.value }));
  
  const handleRollChange = async (e) => {
    const rawValue = e.target.value;
    const val = rawValue.trim().toUpperCase();
    setF(p => ({ ...p, roll: rawValue }));

    if (!val) {
      setRollError("");
      return;
    }

    if (val.length >= 6) {
      try {
        const res = await fetch(`http://localhost:5000/api/students/${encodeURIComponent(val)}`);
        if (res.ok) {
          const student = await res.json();
          setF(p => ({
            ...p,
            roll: rawValue,
            first: student.first || p.first,
            last: student.last || p.last,
            email: student.email || p.email,
            year: String(student.year || p.year),
            dept: student.dept || p.dept
          }));
          setRollError("");
        } else if (res.status === 404) {
          setRollError("Roll not found in GEC database. Fill remaining fields and submit; admin approval may be required.");
        } else {
          setRollError("Unable to validate roll number right now. Please try again.");
        }
      } catch (err) {
        setRollError("Unable to validate roll number right now. Please check your network and try again.");
      }
    } else {
      setRollError("Please enter at least 6 characters of your GEC roll number.");
    }
  };

  const years = Array.from({ length: 20 }, (_, i) => 2024 - i);

  const handleSubmit = () => {
    if (f.first && f.last && f.email && f.year && f.dept) {
      onOk({
        ...f,
        name: `${f.first} ${f.last}`,
        skills: f.skills.split(",").map(s => s.trim()).filter(Boolean),
        color: ["navy","maroon","saffron"][Math.floor(Math.random() * 3)],
        pending: true,
      });
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Alumni Registration — GEC Bhubaneswar" wide
      footer={
        <>
          <Btn cls="btn-outline" size="sm" onClick={onClose}>Cancel</Btn>
          <Btn cls="btn-maroon" size="sm" onClick={handleSubmit}>Submit Registration</Btn>
        </>
      }
    >
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="First Name *" placeholder="Ramesh" value={f.first} onChange={up("first")} />
        <Field label="Last Name *" placeholder="Patel" value={f.last} onChange={up("last")} />
      </div>
      <Field label="Email Address *" type="email" placeholder="ramesh@example.com" value={f.email} onChange={up("email")} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <SelField label="Passing Batch *" value={f.year} onChange={up("year")}
          opts={[{ v:"", l:"Select Batch" }, ...years.map(y => ({ v: String(y), l: `Batch of ${y}` }))]} />
        <SelField label="Department *" value={f.dept} onChange={up("dept")}
          opts={[{ v:"", l:"Select Dept." }, ...DEPTS]} />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <Field label="GEC Roll Number" placeholder="e.g. 2201292024" value={f.roll} onChange={handleRollChange} style={{ marginBottom: rollError ? "4px" : undefined }} />
        {rollError && <div style={{ color: "var(--maroon)", fontSize: "0.85rem", fontWeight: "500", marginLeft: "4px" }}>{rollError}</div>}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Current Organisation" placeholder="TCS, ISRO, Govt. of Odisha..." value={f.company} onChange={up("company")} />
        <Field label="Designation" placeholder="Software Engineer, IAS..." value={f.role} onChange={up("role")} />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Current Location" placeholder="Bhubaneswar, Bengaluru..." value={f.location} onChange={up("location")} />
        <SelField label="Sector" value={f.industry} onChange={up("industry")}
          opts={[{ v:"", l:"Select Sector" }, "Technology", "Government", "Manufacturing", "Education", "Infrastructure", "Banking", "Defence", "Consulting"]} />
      </div>
      <Field label="Skills (comma separated)" placeholder="React, VLSI, AutoCAD..." value={f.skills} onChange={up("skills")} />
      <Field label="Set Password *" type="password" placeholder="Min. 8 characters" value={f.pw} onChange={up("pw")} />
    </Modal>
  );
}

/* ── POST JOB MODAL ── */
export function PostJobModal({ open, onClose, onOk }) {
  const [f, setF] = useState({ title:"", company:"", type:"Full-time", loc:"", salary:"", field:"Technology", desc:"" });
  const up = k => e => setF(p => ({ ...p, [k]: e.target.value }));

  return (
    <Modal open={open} onClose={onClose} title="Post a Job / Internship" wide
      footer={
        <>
          <Btn cls="btn-outline" size="sm" onClick={onClose}>Cancel</Btn>
          <Btn cls="btn-maroon" size="sm" onClick={() => { if (f.title && f.company) { onOk(f); onClose(); } }}>Post Now</Btn>
        </>
      }
    >
      <Field label="Job Title *" placeholder="Software Engineer, Graduate Trainee..." value={f.title} onChange={up("title")} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Organisation *" placeholder="TCS, SAIL, Govt. of Odisha..." value={f.company} onChange={up("company")} />
        <SelField label="Employment Type" value={f.type} onChange={up("type")}
          opts={["Full-time", "Internship", "Government", "Contract", "Part-time"]} />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Location" placeholder="Bhubaneswar / Pan India / Remote" value={f.loc} onChange={up("loc")} />
        <Field label="CTC / Stipend" placeholder="₹3.5–6 LPA or ₹15,000/month" value={f.salary} onChange={up("salary")} />
      </div>
      <SelField label="Industry Sector" value={f.field} onChange={up("field")}
        opts={["Technology", "Government", "Manufacturing", "Education", "Infrastructure", "Banking", "Defence"]} />
      <TxtField label="Job Description *" placeholder="Role description, eligibility, application process..." value={f.desc} onChange={up("desc")} />
    </Modal>
  );
}

/* ── CREATE EVENT MODAL ── */
export function CreateEventModal({ open, onClose, onOk }) {
  const [f, setF] = useState({ title:"", type:"reunion", date:"", time:"", cap:"", loc:"", desc:"" });
  const up = k => e => setF(p => ({ ...p, [k]: e.target.value }));
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const handleSubmit = () => {
    if (f.title) {
      const [, m, d] = (f.date || "2025-01-01").split("-");
      onOk({
        ...f,
        day: d || "01",
        month: months[parseInt(m || 1) - 1] || "TBD",
        capacity: parseInt(f.cap) || 200,
        registered: 0,
        tags: [],
      });
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Create an Event" wide
      footer={
        <>
          <Btn cls="btn-outline" size="sm" onClick={onClose}>Cancel</Btn>
          <Btn cls="btn-maroon" size="sm" onClick={handleSubmit}>Create Event</Btn>
        </>
      }
    >
      <Field label="Event Title *" placeholder="GEC Alumni Grand Reunion 2025" value={f.title} onChange={up("title")} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <SelField label="Event Type" value={f.type} onChange={up("type")}
          opts={[{ v:"reunion",l:"Alumni Reunion" },{ v:"webinar",l:"Webinar" },{ v:"networking",l:"Networking" },{ v:"workshop",l:"Workshop" }]} />
        <Field label="Date *" type="date" value={f.date} onChange={up("date")} />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Time" type="time" value={f.time} onChange={up("time")} />
        <Field label="Max Capacity" placeholder="500" value={f.cap} onChange={up("cap")} />
      </div>
      <Field label="Venue / Meeting Link" placeholder="GEC Main Auditorium / Zoom Link" value={f.loc} onChange={up("loc")} />
      <TxtField label="Event Description" placeholder="Describe the event for alumni..." value={f.desc} onChange={up("desc")} />
    </Modal>
  );
}

/* ── APPLY JOB MODAL ── */
export function ApplyModal({ open, onClose, job, onOk }) {
  return (
    <Modal open={open} onClose={onClose} title="Apply for this Position"
      footer={
        <>
          <Btn cls="btn-outline" size="sm" onClick={onClose}>Cancel</Btn>
          <Btn cls="btn-maroon" size="sm" onClick={() => { onOk(); onClose(); }}>Submit Application</Btn>
        </>
      }
    >
      {job && (
        <div style={{ background:"#fff8e1", border:"1px solid var(--saffron)", borderRadius:3, padding:"10px 14px", marginBottom:16, borderLeft:"4px solid var(--maroon)" }}>
          <strong style={{ color:"var(--maroon)" }}>{job.title}</strong> at {job.company}<br />
          <span style={{ fontSize:".78rem", color:"var(--gray)" }}>{job.type} · {job.location}</span>
        </div>
      )}
      <Field label="Full Name" placeholder="Ramesh Patel" />
      <Field label="GEC Roll No. (optional)" placeholder="e.g. 0601CSE01" />
      <Field label="Email" type="email" placeholder="ramesh@example.com" />
      <TxtField label="Cover Letter / Message" placeholder="Brief note about your interest and qualifications..." />
      <Field label="Resume / CV Link" placeholder="Google Drive or LinkedIn URL" />
    </Modal>
  );
}

/* ── REGISTER EVENT MODAL ── */
export function RegEventModal({ open, onClose, ev, onOk }) {
  return (
    <Modal open={open} onClose={onClose} title="Register for Event"
      footer={
        <>
          <Btn cls="btn-outline" size="sm" onClick={onClose}>Cancel</Btn>
          <Btn cls="btn-maroon" size="sm" onClick={() => { onOk(); onClose(); }}>Confirm Registration</Btn>
        </>
      }
    >
      {ev && (
        <div style={{ background:"#fff8e1", border:"1px solid var(--saffron)", borderRadius:3, padding:"10px 14px", marginBottom:16, borderLeft:"4px solid var(--navy)" }}>
          <strong style={{ color:"var(--navy)" }}>{ev.title}</strong><br />
          <span style={{ fontSize:".78rem", color:"var(--gray)" }}>{ev.day} {ev.month} · {ev.time} · {ev.location}</span>
        </div>
      )}
      <Field label="Full Name" placeholder="Ramesh Patel" />
      <Field label="GEC Batch" placeholder="e.g. 2015" />
      <Field label="Department" placeholder="e.g. CSE" />
      <Field label="Email" type="email" placeholder="ramesh@example.com" />
      <Field label="Phone" type="tel" placeholder="9xxxxxxxxx" />
      <SelField label="No. of Attendees" value="" onChange={() => {}}
        opts={["1 (Just me)", "2", "3", "4", "5 or more"]} />
    </Modal>
  );
}
