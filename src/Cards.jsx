/* ============================================================
   Cards.jsx  |  GEC Alumni Portal — Card Components
   AlumniCard · JobCard · EventCard · StoryCard
   ============================================================ */

import { Btn, Avatar, Badge, ProgBar } from "./components.jsx";

/* ── ALUMNI CARD ── */
export function AlumniCard({ a, onView }) {
  return (
    <div className="gec-card">
      <div style={{ background:"linear-gradient(135deg,var(--maroon),var(--navy))", height:6, borderRadius:"6px 6px 0 0" }} />
      <div style={{ padding:"16px 16px 0", display:"flex", gap:12, alignItems:"flex-start" }}>
        <Avatar name={a.name} color={a.color} size={46} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:"Merriweather,serif", fontSize:".95rem", fontWeight:700, color:"var(--maroon)", marginBottom:2, lineHeight:1.3 }}>{a.name}</div>
          <div style={{ fontSize:".78rem", color:"var(--gray)", lineHeight:1.4 }}>{a.role}{a.company ? ` · ${a.company}` : ""}</div>
          {a.pending && <Badge text="Pending Approval" type="saffron" />}
        </div>
      </div>
      <div style={{ padding:"10px 16px 14px" }}>
        <div style={{ fontSize:".76rem", color:"var(--gray)", marginBottom:3 }}>🎓 {a.dept} — Batch {a.year}</div>
        {a.location && <div style={{ fontSize:".76rem", color:"var(--gray)", marginBottom:3 }}>📍 {a.location}</div>}
        <div style={{ fontSize:".78rem", color:"#444", lineHeight:1.5, margin:"8px 0" }}>{a.bio}</div>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginTop:8 }}>
          {(a.skills || []).slice(0, 3).map(s => (
            <span key={s} style={{ fontSize:".68rem", background:"var(--light-bg)", color:"var(--navy)", border:"1px solid #c5d5e8", padding:"2px 8px", borderRadius:2, fontWeight:600 }}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{ padding:"8px 16px 14px", borderTop:"1px solid var(--border-light)", display:"flex", gap:8 }}>
        <Btn cls="btn-outline" size="sm" onClick={() => onView(a)}>View Profile</Btn>
        <Btn cls="btn-navy" size="sm">Connect</Btn>
      </div>
    </div>
  );
}

/* ── JOB CARD ── */
export function JobCard({ j, onApply }) {
  const typeColor = { "Full-time":"blue", "Internship":"saffron", "Government":"green", "Contract":"gray" };
  return (
    <div className="gec-card">
      <div style={{ padding:"14px 16px 10px" }}>
        <div style={{ fontSize:".72rem", color:"var(--maroon)", fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", marginBottom:4 }}>{j.company}</div>
        <div style={{ fontFamily:"Merriweather,serif", fontSize:"1rem", fontWeight:700, color:"var(--navy)", marginBottom:8 }}>{j.title}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:8 }}>
          <Badge text={j.type} type={typeColor[j.type] || "blue"} />
          <span style={{ fontSize:".76rem", color:"var(--gray)" }}>📍 {j.location}</span>
          {j.salary && <span style={{ fontSize:".76rem", color:"var(--gray)" }}>💰 {j.salary}</span>}
          <span style={{ fontSize:".76rem", color:"var(--gray)" }}>🕐 {j.date}</span>
        </div>
        <p style={{ fontSize:".8rem", lineHeight:1.55, color:"#444" }}>{j.desc}</p>
      </div>
      <div style={{ padding:"8px 16px 12px", borderTop:"1px solid var(--border-light)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:".74rem", color:"var(--gray)" }}>Posted by <strong style={{ color:"var(--navy)" }}>{j.postedBy?.name || j.postedBy || "System"}</strong></span>
        <Btn cls="btn-maroon" size="sm" onClick={() => onApply(j)}>Apply Now →</Btn>
      </div>
    </div>
  );
}

/* ── EVENT CARD ── */
export function EventCard({ ev, onReg }) {
  const pct = Math.round((ev.registered / ev.capacity) * 100);
  const typeColor = { reunion:"red", webinar:"blue", workshop:"saffron", networking:"green" };
  return (
    <div className="gec-card" style={{ display:"flex" }}>
      {/* Date block */}
      <div style={{ background:"var(--maroon)", color:"#fff", padding:"14px 12px", minWidth:70, flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, borderRadius:"6px 0 0 6px" }}>
        <div style={{ fontFamily:"Merriweather,serif", fontSize:"1.8rem", fontWeight:900, lineHeight:1 }}>{ev.day}</div>
        <div style={{ fontSize:".65rem", textTransform:"uppercase", letterSpacing:".1em", color:"var(--saffron-lt)" }}>{ev.month}</div>
      </div>
      <div style={{ padding:"12px 16px", flex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, flexWrap:"wrap", marginBottom:6 }}>
          <div>
            <Badge text={ev.type} type={typeColor[ev.type] || "red"} />
            <div style={{ fontFamily:"Merriweather,serif", fontSize:"1rem", fontWeight:700, color:"var(--navy)", marginTop:4 }}>{ev.title}</div>
          </div>
          <Btn cls="btn-maroon" size="sm" onClick={() => onReg(ev)}>Register</Btn>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:8 }}>
          <span style={{ fontSize:".76rem", color:"var(--gray)" }}>⏰ {ev.time}</span>
          <span style={{ fontSize:".76rem", color:"var(--gray)" }}>📍 {ev.location}</span>
          <span style={{ fontSize:".76rem", color:"var(--gray)" }}>👥 {ev.registered}/{ev.capacity}</span>
        </div>
        <p style={{ fontSize:".78rem", color:"#444", lineHeight:1.5, marginBottom:8 }}>{ev.desc}</p>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:".7rem", color:"var(--gray)", marginBottom:3 }}>
            <span>Registration</span><span>{pct}%</span>
          </div>
          <ProgBar pct={pct} color={pct > 75 ? "var(--saffron)" : "var(--navy)"} />
        </div>
      </div>
    </div>
  );
}

/* ── STORY CARD ── */
export function StoryCard({ s }) {
  return (
    <div className="gec-card" style={{ display:"flex", flexDirection:"column" }}>
      <div style={{ background:"linear-gradient(135deg,var(--maroon),var(--navy))", height:5, borderRadius:"6px 6px 0 0" }} />
      <div style={{ padding:"16px 16px", flex:1 }}>
        <div style={{ marginBottom:10 }}><Badge text={s.tag} type="red" /></div>
        <blockquote style={{ fontFamily:"Merriweather,serif", fontSize:".9rem", fontStyle:"italic", color:"#333", lineHeight:1.7, borderLeft:"3px solid var(--maroon)", paddingLeft:12, marginBottom:10 }}>
          "{s.quote}"
        </blockquote>
        <div style={{ fontSize:".76rem", color:"var(--saffron)", fontWeight:700 }}>🏆 {s.achievement}</div>
      </div>
      <div style={{ padding:"10px 16px 14px", borderTop:"1px solid var(--border-light)", display:"flex", gap:10, alignItems:"center" }}>
        <Avatar name={s.name} color={s.color} size={36} />
        <div>
          <div style={{ fontWeight:700, fontSize:".82rem", color:"var(--maroon)" }}>{s.name}</div>
          <div style={{ fontSize:".72rem", color:"var(--gray)" }}>{s.role}</div>
        </div>
      </div>
    </div>
  );
}
