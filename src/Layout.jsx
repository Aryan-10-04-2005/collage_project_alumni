/* ============================================================
   Layout.jsx  |  GEC Alumni Portal — Page Layout Components
   TopUtilityBar · Header · Navbar
   Mirrors gec.edu.in three-tier header structure exactly
   ============================================================ */

import { useState } from "react";
import { Btn } from "./components.jsx";

const NAV_ITEMS = [
  { id: "home",      label: "Home" },
  { id: "directory", label: "Alumni Directory" },
  { id: "jobs",      label: "Jobs & Internships" },
  { id: "events",    label: "Events & Reunions" },
  { id: "stories",   label: "Success Stories" },
  { id: "donate",    label: "Give Back" },
  { id: "admin",     label: "Admin Panel" },
];

/* ── TOP UTILITY BAR (scrolling announcements + contact info) ── */
export function TopUtilityBar() {
  const notices = [
    "🎉 Admissions Open 2025–26 — Apply at gec.edu.in",
    "📢 NAAC A+ Accreditation Achieved — GEC Bhubaneswar",
    "🏆 NIRF Ranking 2024: 201–300 in Engineering",
    "📅 Annual Alumni Meet — 20 April 2025 at GEC Campus",
    "💼 94% Placement Rate — Batch 2024",
    "🔬 DST-Funded Research Projects — Apply Now",
  ];

  return (
    <div style={{ background:"#1a1a2e", color:"rgba(255,255,255,.8)", fontSize:".76rem", padding:"5px 0", borderBottom:"1px solid rgba(255,255,255,.08)" }}>
      <div style={{ maxWidth:1260, margin:"0 auto", padding:"0 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:6 }}>
        <div className="ticker-wrap" style={{ flex:1 }}>
          <div className="ticker-inner">
            {[...notices, ...notices.slice(0,4)].map((t, i) => (
              <span key={i} style={{ marginRight:60 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", gap:16, flexShrink:0 }}>
          <span>📞 9776066555</span>
          <span>✉ info@gec.edu.in</span>
          <span>📍 Bhubaneswar, Odisha</span>
        </div>
      </div>
    </div>
  );
}

/* ── HEADER (Logo + College Name + Accreditations + Quick Stats) ── */
export function Header({ setView, onLogin, onRegister }) {
  return (
    <div style={{ background:"var(--white)", borderBottom:"3px solid var(--maroon)", padding:"10px 0" }}>
      <div style={{ maxWidth:1260, margin:"0 auto", padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>

        {/* Logo + College Name */}
        <div onClick={() => setView("home")} style={{ display:"flex", alignItems:"center", gap:14, cursor:"pointer" }}>
          <img src="/geclogo.png" alt="GEC Logo" style={{ width:72, height:72, borderRadius:"50%", objectFit:"cover", border:"3px solid var(--maroon)", flexShrink:0 }} />
          <div>
            <div style={{ fontFamily:"Merriweather,serif", fontSize:"1.25rem", fontWeight:900, color:"var(--maroon)", lineHeight:1.2 }}>Gandhi Engineering College</div>
            <div style={{ fontSize:".78rem", color:"var(--navy)", fontWeight:600, marginTop:2 }}>Autonomous College · Affiliated to BPUT, Odisha</div>
            <div style={{ display:"flex", gap:8, marginTop:4, flexWrap:"wrap" }}>
              {["NAAC A+", "AICTE Approved", "NIRF Ranked", "ISO 9001"].map(t => (
                <span key={t} style={{ fontSize:".62rem", background:"var(--navy)", color:"#fff", padding:"1px 6px", borderRadius:2, fontWeight:600 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats + Auth Buttons */}
        <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
          {[["40K+","Alumni","var(--maroon)"],["94%","Placement","var(--navy)"],["25 Ac","Campus","var(--saffron)"]].map(([v,l,c]) => (
            <div key={l} style={{ textAlign:"center", fontSize:".72rem", color:"var(--gray)" }}>
              <div style={{ fontFamily:"Merriweather,serif", fontSize:"1.2rem", fontWeight:900, color:c }}>{v}</div>
              <div>{l}</div>
            </div>
          ))}
          <div style={{ display:"flex", gap:8 }}>
            <Btn cls="btn-outline" size="sm" onClick={onLogin}>Login</Btn>
            <Btn cls="btn-maroon" size="sm" onClick={onRegister}>Register</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN NAVBAR (sticky maroon nav with saffron active underline) ── */
export function Navbar({ view, setView }) {
  const [mob, setMob] = useState(false);
  const cur = typeof view === "object" ? view.page : view;

  return (
    <>
      <nav style={{ background:"var(--maroon)", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 8px rgba(0,0,0,.2)" }}>
        <div style={{ maxWidth:1260, margin:"0 auto", padding:"0 20px", display:"flex", alignItems:"stretch" }}>

          {/* Desktop nav links */}
          <div className="hide-sm" style={{ display:"flex", flex:1 }}>
            {NAV_ITEMS.map(n => (
              <span
                key={n.id}
                onClick={() => { setView(n.id); setMob(false); }}
                style={{ padding:"12px 16px", color: cur===n.id ? "var(--saffron)" : "rgba(255,255,255,.9)", cursor:"pointer", fontSize:".82rem", fontWeight: cur===n.id ? 700 : 500, borderBottom: cur===n.id ? "3px solid var(--saffron)" : "3px solid transparent", whiteSpace:"nowrap", transition:"var(--tr)" }}
                onMouseEnter={e => { if (cur !== n.id) e.currentTarget.style.background = "rgba(255,255,255,.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                {n.label}
              </span>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMob(p => !p)} className="show-sm" style={{ display:"none", background:"none", border:"none", color:"#fff", fontSize:"1.4rem", padding:"12px", cursor:"pointer" }}>
            ☰
          </button>
        </div>

        {/* Mobile dropdown */}
        {mob && (
          <div style={{ background:"var(--maroon-dark)", padding:"8px 0" }}>
            {NAV_ITEMS.map(n => (
              <div key={n.id} onClick={() => { setView(n.id); setMob(false); }} style={{ padding:"10px 20px", color:"rgba(255,255,255,.9)", cursor:"pointer", fontSize:".85rem", borderBottom:"1px solid rgba(255,255,255,.1)" }}>
                {n.label}
              </div>
            ))}
          </div>
        )}
      </nav>

      <style>{`.show-sm{display:none!important}@media(max-width:768px){.hide-sm{display:none!important}.show-sm{display:block!important}}`}</style>
    </>
  );
}
