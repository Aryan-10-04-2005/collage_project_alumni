/* ============================================================
   views.jsx  |  GEC Alumni Portal — All Page Views
   DirectoryView · JobsView · EventsView · StoriesView
   DonateView · ProfileView · AdminView
   ============================================================ */

import { useState } from "react";
import { Btn, Avatar, Badge, ProgBar, SectionTitle, Field, SelField, TxtField } from "./components.jsx";
import { AlumniCard, JobCard, EventCard, StoryCard } from "./Cards.jsx";
import { DEPTS, avatarColors, getInitials } from "./data.js";

const C = { maxWidth:1260, margin:"0 auto", padding:"0 20px" };

/* ── PAGE HEADER (reused across views) ── */
function PageHeader({ eyebrow, title, bg = "linear-gradient(135deg,var(--navy),var(--maroon))", children }) {
  return (
    <div style={{ background:bg, padding:"0 0", position:"relative", overflow:"hidden" }}>
      <img src="/geclogo.png" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.08, pointerEvents:"none", userSelect:"none" }} />
      <div style={{ ...C, padding:"24px 20px 36px", position:"relative", zIndex:1 }}>
        <div className="breadcrumb" style={{ color:"rgba(255,255,255,.6)" }}>
          <span>Home</span> / {title}
        </div>
        {eyebrow && <div style={{ fontSize:".72rem", color:"var(--saffron-lt)", fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", marginBottom:8 }}>◆ {eyebrow}</div>}
        <h1 style={{ color:"#fff" }}>{title}</h1>
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   DIRECTORY VIEW
   ============================================================ */
export function DirectoryView({ alumni, onView }) {
  const [q, setQ] = useState("");
  const [year, setYear] = useState("");
  const [dept, setDept] = useState("");
  const [ind, setInd] = useState("");

  const ss = { padding:"7px 10px", border:"1px solid var(--border)", borderRadius:3, fontFamily:"'Open Sans',sans-serif", fontSize:".8rem", outline:"none", cursor:"pointer" };

  const filtered = alumni.filter(a => {
    if (a.pending) return false;
    const qu = q.toLowerCase();
    if (qu && !a.name.toLowerCase().includes(qu) && !(a.company||"").toLowerCase().includes(qu) && !(a.skills||[]).some(s => s.toLowerCase().includes(qu))) return false;
    if (year && String(a.year) !== year) return false;
    if (dept && a.dept !== dept) return false;
    if (ind && a.industry !== ind) return false;
    return true;
  });

  return (
    <div>
      <PageHeader eyebrow="Our Community" title="Alumni Directory">
        <p style={{ color:"rgba(255,255,255,.75)", marginTop:8 }}>Connect with 40,000+ GEC graduates across departments, batches, and industries.</p>
      </PageHeader>
      <div style={{ ...C, padding:"24px 20px" }}>
        {/* Search filters */}
        <div style={{ background:"#fff", border:"1px solid var(--border)", borderRadius:4, padding:"14px 16px", marginBottom:20, display:"flex", gap:10, flexWrap:"wrap", alignItems:"center", boxShadow:"var(--shadow)" }}>
          <div style={{ position:"relative", flex:2, minWidth:180 }}>
            <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", opacity:.4 }}>🔍</span>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, company, skill..." style={{ ...ss, paddingLeft:30, width:"100%" }} />
          </div>
          <select value={year} onChange={e => setYear(e.target.value)} style={ss}>
            <option value="">All Batches</option>
            {Array.from({length:20},(_,i)=>2024-i).map(y => <option key={y}>{y}</option>)}
          </select>
          <select value={dept} onChange={e => setDept(e.target.value)} style={ss}>
            <option value="">All Departments</option>
            {DEPTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={ind} onChange={e => setInd(e.target.value)} style={ss}>
            <option value="">All Sectors</option>
            {["Technology","Government","Manufacturing","Education","Infrastructure","Consulting","Defence"].map(i => <option key={i}>{i}</option>)}
          </select>
        </div>
        <div style={{ marginBottom:14, fontSize:".82rem", color:"var(--gray)" }}>Showing <strong>{filtered.length}</strong> alumni</div>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:60, color:"var(--gray)" }}>
            <div style={{ fontSize:"3rem", marginBottom:12 }}>🔍</div>
            <h3>No alumni found</h3>
            <p>Try adjusting your filters.</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
            {filtered.map(a => <AlumniCard key={a.id} a={a} onView={() => onView(a)} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   JOBS VIEW
   ============================================================ */
export function JobsView({ jobs, onApply, onPost }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [field, setField] = useState("");
  const ss = { padding:"7px 10px", border:"1px solid var(--border)", borderRadius:3, fontFamily:"'Open Sans',sans-serif", fontSize:".8rem", outline:"none", cursor:"pointer" };

  const filtered = jobs.filter(j => {
    const qu = q.toLowerCase();
    if (qu && !j.title.toLowerCase().includes(qu) && !j.company.toLowerCase().includes(qu)) return false;
    if (type && j.type !== type) return false;
    if (field && j.field !== field) return false;
    return true;
  });

  return (
    <div>
      <PageHeader eyebrow="Career Corner" title="Jobs & Internships" bg="linear-gradient(135deg,var(--maroon),var(--maroon-dark))">
        <p style={{ color:"rgba(255,255,255,.75)", marginTop:8 }}>Opportunities posted exclusively by GEC alumni for students and fellow graduates.</p>
      </PageHeader>
      <div style={{ ...C, padding:"24px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:12 }}>
          <div style={{ background:"#fff", border:"1px solid var(--border)", borderRadius:4, padding:"12px 14px", display:"flex", gap:10, flexWrap:"wrap", alignItems:"center", flex:1, boxShadow:"var(--shadow)" }}>
            <div style={{ position:"relative", flex:1, minWidth:180 }}>
              <span style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", opacity:.4 }}>🔍</span>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search roles, companies..." style={{ ...ss, paddingLeft:28, width:"100%" }} />
            </div>
            <select value={type} onChange={e => setType(e.target.value)} style={ss}>
              <option value="">All Types</option>
              {["Full-time","Internship","Government","Contract","Part-time"].map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={field} onChange={e => setField(e.target.value)} style={ss}>
              <option value="">All Sectors</option>
              {["Technology","Government","Manufacturing","Education","Infrastructure"].map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <Btn cls="btn-saffron" onClick={onPost}>+ Post a Job</Btn>
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:60 }}><div style={{ fontSize:"3rem" }}>💼</div><h3>No listings found</h3></div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
            {filtered.map(j => <JobCard key={j.id} j={j} onApply={onApply} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   EVENTS VIEW
   ============================================================ */
export function EventsView({ events, onReg, onCreate }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? events : events.filter(e => e.type === filter);

  return (
    <div>
      <PageHeader eyebrow="Community" title="Events & Reunions">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:12, marginTop:4 }}>
          <p style={{ color:"rgba(255,255,255,.75)" }}>Stay connected through campus meets, webinars, and batch reunions.</p>
          <Btn cls="btn-saffron" onClick={onCreate}>+ Create Event</Btn>
        </div>
      </PageHeader>
      <div style={{ ...C, padding:"24px 20px" }}>
        <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
          {["all","reunion","webinar","workshop","networking"].map(f => (
            <button key={f} className={`tab-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
              {f === "all" ? "All Events" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:60 }}><div style={{ fontSize:"3rem" }}>📅</div><h3>No events</h3></div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {filtered.map(ev => <EventCard key={ev.id} ev={ev} onReg={onReg} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   STORIES VIEW
   ============================================================ */
export function StoriesView({ stories }) {
  return (
    <div>
      <PageHeader eyebrow="Pride of GEC" title="Alumni Success Stories">
        <p style={{ color:"rgba(255,255,255,.75)", marginTop:8 }}>GEC graduates who are serving the nation, building enterprises, and making Odisha proud.</p>
      </PageHeader>
      <div style={{ ...C, padding:"28px 20px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:18 }}>
          {stories.map((s, i) => <StoryCard key={i} s={s} />)}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DONATE VIEW
   ============================================================ */
export function DonateView({ causes, onDonate }) {
  const [amt, setAmt] = useState("1000");
  const [custom, setCustom] = useState("");
  const [cause, setCause] = useState("scholarship");
  const [form, setForm] = useState({ first:"", last:"", email:"", roll:"", batch:"" });

  const donors = [];

  return (
    <div>
      <PageHeader eyebrow="Give Back" title="Give Back to GEC Bhubaneswar" bg="linear-gradient(135deg,var(--maroon-dark),var(--maroon))">
        <p style={{ color:"rgba(255,255,255,.75)", marginTop:8 }}>Support your alma mater through scholarships, infrastructure, and research funds. 80G tax benefit available.</p>
      </PageHeader>
      <div style={{ ...C, padding:"28px 20px" }}>
        <div className="donate-grid" style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:28, alignItems:"start" }}>

          {/* Donation form */}
          <div className="gec-card">
            <div style={{ background:"var(--maroon)", color:"#fff", padding:"10px 16px", fontFamily:"Merriweather,serif", fontSize:".95rem", fontWeight:700 }}>
              💛 Make Your Donation
            </div>
            <div style={{ padding:"18px 18px" }}>
              <div className="form-group">
                <label className="form-label">Select Amount</label>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
                  {["500","1000","2500","5000","10000","custom"].map(a => (
                    <button key={a} onClick={() => setAmt(a)} style={{ padding:"7px 16px", border:`2px solid ${amt===a?"var(--maroon)":"var(--border)"}`, borderRadius:3, background:amt===a?"var(--maroon)":"transparent", cursor:"pointer", fontFamily:"Merriweather,serif", fontSize:".9rem", fontWeight:700, color:amt===a?"#fff":"var(--dark)", transition:"var(--tr)" }}>
                      {a === "custom" ? "Other" : `₹${parseInt(a).toLocaleString("en-IN")}`}
                    </button>
                  ))}
                </div>
                {amt === "custom" && <input value={custom} onChange={e => setCustom(e.target.value)} placeholder="Enter amount in ₹" className="form-control" />}
              </div>

              <div className="form-group">
                <label className="form-label">Choose a Cause</label>
                {[["scholarship","🎓 Merit-cum-Means Scholarship","Support students from EWS/OBC/SC/ST backgrounds"],["lab","🔬 Smart Lab & Digital Classroom","Fund modern teaching equipment & digital tools"],["sports","🏆 Sports Complex Renovation","Build cricket, football & indoor sports facilities"],["library","📚 Digital Library Expansion","Subscribe to IEEE, Elsevier & digital journals"]].map(([id, title, desc]) => (
                  <div key={id} onClick={() => setCause(id)} style={{ border:`2px solid ${cause===id?"var(--maroon)":"var(--border-light)"}`, borderRadius:4, padding:"10px 14px", cursor:"pointer", marginBottom:10, background:cause===id?"rgba(123,17,19,.05)":"transparent", transition:"var(--tr)" }}>
                    <div style={{ fontWeight:600, fontSize:".85rem", color:cause===id?"var(--maroon)":"var(--dark)", marginBottom:3 }}>{title}</div>
                    <div style={{ fontSize:".76rem", color:"var(--gray)" }}>{desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <Field label="First Name" placeholder="Ramesh" value={form.first} onChange={e => setForm(p => ({...p,first:e.target.value}))} />
                <Field label="Last Name" placeholder="Patel" value={form.last} onChange={e => setForm(p => ({...p,last:e.target.value}))} />
              </div>
              <Field label="Email Address" type="email" placeholder="ramesh@example.com" value={form.email} onChange={e => setForm(p => ({...p,email:e.target.value}))} />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <Field label="GEC Roll No. (optional)" placeholder="e.g. 0601CSE01" value={form.roll} onChange={e => setForm(p => ({...p,roll:e.target.value}))} />
                <Field label="Passing Batch" placeholder="e.g. 2010" value={form.batch} onChange={e => setForm(p => ({...p,batch:e.target.value}))} />
              </div>
              <Field label="Card / UPI Number" placeholder="Card number or UPI ID" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <Field label="Expiry (MM/YY)" placeholder="08/27" />
                <Field label="CVV" placeholder="123" />
              </div>
              <Btn cls="btn-maroon btn-lg" style={{ width:"100%", justifyContent:"center", marginTop:4 }}
                onClick={() => onDonate(amt === "custom" ? custom : amt, cause)}>
                🇮🇳 Donate to GEC · Jai GEC!
              </Btn>
              <p style={{ fontSize:".72rem", color:"var(--gray)", marginTop:10, textAlign:"center" }}>🔒 Secure · 80G Tax Exemption · 100% goes to the cause</p>
            </div>
          </div>

          {/* Right column */}
          <div>
            <SectionTitle text="Campaign Progress" />
            {causes.map(ca => {
              const pct = Math.round((ca.raised / ca.goal) * 100);
              return (
                <div key={ca.id} className="gec-card" style={{ marginBottom:14 }}>
                  <div style={{ padding:"13px 14px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                      <div style={{ fontWeight:700, fontSize:".84rem", color:"var(--maroon)" }}>{ca.icon} {ca.name}</div>
                      <span style={{ fontSize:".72rem", color:"var(--gray)" }}>{ca.donors} donors</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:".75rem", color:"var(--gray)", marginBottom:5 }}>
                      <span>₹{(ca.raised/100000).toFixed(1)}L raised</span>
                      <span>Goal: ₹{(ca.goal/100000).toFixed(1)}L</span>
                    </div>
                    <ProgBar pct={pct} color={pct > 60 ? "var(--maroon)" : "var(--navy)"} />
                    <div style={{ fontSize:".7rem", color:"var(--navy)", fontWeight:700, marginTop:4, textAlign:"right" }}>{pct}% funded</div>
                  </div>
                </div>
              );
            })}

            <div className="gec-card" style={{ background:"var(--navy)", marginBottom:16 }}>
              <div style={{ padding:16, color:"#fff" }}>
                <div style={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:".1em", color:"var(--saffron-lt)", marginBottom:8 }}>💡 Your Impact</div>
                <h4 style={{ color:"#fff", marginBottom:10, fontFamily:"Merriweather,serif" }}>"Education is the most powerful weapon."</h4>
                <p style={{ color:"rgba(255,255,255,.7)", fontSize:".8rem", lineHeight:1.7 }}>Since 2010, GEC alumni contributions have funded 2,100+ scholarships, built 3 smart classrooms, and established the Innovation Lab serving 600+ students annually.</p>
              </div>
            </div>

            <SectionTitle text="Recent Donors" sub="Thank you!" />
            {donors.map((d, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid var(--border-light)" }}>
                <Avatar name={d.name} color={d.color} size={34} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:".82rem", fontWeight:700, color:"var(--navy)" }}>{d.name}</div>
                  <div style={{ fontSize:".71rem", color:"var(--gray)" }}>{d.cause} · {d.time}</div>
                </div>
                <div style={{ fontFamily:"Merriweather,serif", fontSize:".9rem", fontWeight:700, color:"var(--maroon)" }}>{d.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PROFILE VIEW
   ============================================================ */
export function ProfileView({ a, onBack }) {
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,var(--navy),var(--maroon))", height:160, position:"relative" }}>
        <div style={{ position:"absolute", inset:0, opacity:.05, backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"24px 24px" }} />
      </div>
      <div style={{ background:"#fff", borderBottom:"2px solid var(--border-light)" }}>
        <div style={C}>
          <div style={{ position:"relative", paddingBottom:20 }}>
            <div style={{ position:"absolute", top:-44, left:0 }}>
              <div style={{ width:88, height:88, borderRadius:"50%", border:"4px solid #fff", boxShadow:"var(--shadow-md)", background:avatarColors[a.color]||avatarColors.navy, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Merriweather,serif", fontWeight:900, fontSize:"2rem", color:"#fff" }}>
                {getInitials(a.name)}
              </div>
            </div>
            <div style={{ paddingTop:52, display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:14 }}>
              <div>
                <h2 style={{ color:"var(--maroon)", marginBottom:3 }}>{a.name}</h2>
                <div style={{ color:"var(--gray)", marginBottom:12, fontSize:".9rem" }}>{a.role}{a.company ? ` | ${a.company}` : ""}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:14, fontSize:".8rem", color:"var(--gray)" }}>
                  {a.location && <span>📍 {a.location}</span>}
                  <span>🎓 Batch {a.year} | {a.dept}</span>
                  {a.industry && <span>🏭 {a.industry}</span>}
                </div>
              </div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <Btn cls="btn-outline-navy" size="sm">✉ Message</Btn>
                <Btn cls="btn-outline" size="sm">+ Connect</Btn>
                <Btn cls="btn-saffron" size="sm" onClick={onBack}>← Back</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ ...C, padding:"24px 20px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div>
            <div className="gec-card" style={{ marginBottom:18 }}><div style={{ padding:18 }}>
              <SectionTitle text="About" />
              <p style={{ fontSize:".85rem" }}>{a.about || a.bio}</p>
            </div></div>
            <div className="gec-card"><div style={{ padding:18 }}>
              <SectionTitle text="Technical Skills" />
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {(a.skills||[]).map(sk => (
                  <span key={sk} style={{ background:"var(--light-bg)", border:"1px solid #c5d5e8", color:"var(--navy)", padding:"4px 12px", borderRadius:2, fontSize:".78rem", fontWeight:600 }}>{sk}</span>
                ))}
              </div>
            </div></div>
          </div>
          <div>
            <div className="gec-card" style={{ marginBottom:18 }}><div style={{ padding:18 }}>
              <SectionTitle text="Education" />
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <img src="/geclogo.png" alt="GEC Logo" style={{ width:40, height:40, objectFit:"contain", flexShrink:0 }} />
                <div>
                  <div style={{ fontWeight:700, color:"var(--maroon)", fontSize:".9rem" }}>{a.dept}</div>
                  <div style={{ color:"var(--gray)", fontSize:".82rem" }}>Gandhi Engineering College, Bhubaneswar</div>
                  <div style={{ color:"var(--gray)", fontSize:".78rem" }}>Batch of {a.year} | BPUT Affiliated</div>
                </div>
              </div>
            </div></div>
            <div className="gec-card"><div style={{ padding:18 }}>
              <SectionTitle text="Work Experience" />
              {a.company ? (
                <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{ width:38, height:38, background:"var(--light-bg)", border:"1px solid var(--border)", borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", flexShrink:0 }}>🏢</div>
                  <div>
                    <div style={{ fontWeight:700, color:"var(--navy)", fontSize:".9rem" }}>{a.role}</div>
                    <div style={{ color:"var(--gray)", fontSize:".82rem" }}>{a.company}</div>
                    <div style={{ color:"var(--gray)", fontSize:".76rem", marginTop:2 }}>{a.year + 1} – Present</div>
                  </div>
                </div>
              ) : <p style={{ color:"var(--gray)", fontSize:".82rem" }}>No experience added yet.</p>}
            </div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ADMIN VIEW
   ============================================================ */
export function AdminView({ alumni, jobs, events, causes, students = [], onApprove, onReject, onPost, onCreate, onView, toast }) {
  const [tab, setTab] = useState("overview");
  const [userSearch, setUserSearch] = useState("");
  const [userBatch, setUserBatch] = useState("");
  const pending = alumni.filter(a => a.pending);

  const filteredUsers = alumni.filter(a => {
    const q = userSearch.toLowerCase();
    if (q && !a.name.toLowerCase().includes(q) && !(a.roll || a.rollNumber || "").toLowerCase().includes(q)) return false;
    if (userBatch && String(a.year) !== userBatch) return false;
    if (a.pending) return false;
    return true;
  });

  const [pendingSearch, setPendingSearch] = useState("");
  const filteredPending = pending.filter(a => {
    const q = pendingSearch.toLowerCase();
    if (q && !a.name.toLowerCase().includes(q) && !(a.roll || a.rollNumber || "").toLowerCase().includes(q)) return false;
    return true;
  });

  const [jobSearch, setJobSearch] = useState("");
  const filteredJobs = jobs.filter(j => {
    const q = jobSearch.toLowerCase();
    if (q && !j.title.toLowerCase().includes(q) && !j.company.toLowerCase().includes(q)) return false;
    return true;
  });


  const [studentSearch, setStudentSearch] = useState("");
  const filteredStudents = students.filter(s => {
    const q = studentSearch.toLowerCase();
    if (q && !s.first.toLowerCase().includes(q) && !s.last.toLowerCase().includes(q) && !(s.rollNumber || "").toLowerCase().includes(q)) return false;
    return true;
  });

  const TABS = [
    { id:"overview", label:"📊 Dashboard", g:"Overview" },
    { id:"users", label:"👥 User Management", g:"Overview" },
    { id:"approvals", label:"⏳ Pending Approvals", g:"Content" },
    { id:"students-admin", label:"🧑‍🎓 Student Database", g:"Content" },
    { id:"jobs-admin", label:"💼 Job Postings", g:"Content" },
    { id:"events-admin", label:"📅 Events", g:"Content" },
    { id:"donations", label:"💰 Donations", g:"Finance" },
    { id:"reports", label:"📈 Analytics", g:"Finance" },
  ];

  const sampleDons = [];

  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,var(--navy),var(--maroon))", padding:"18px 0" }}>
        <div style={C}><h2 style={{ color:"#fff", marginBottom:3 }}>Admin Panel — GEC Alumni Portal</h2><p style={{ color:"rgba(255,255,255,.7)", fontSize:".82rem" }}>Manage alumni, jobs, events, and donations.</p></div>
      </div>
      <div style={{ display:"flex", minHeight:"calc(100vh - 200px)" }} className="admin-layout">
        {/* Sidebar */}
        <div style={{ width:220, flexShrink:0, background:"var(--light-bg)", borderRight:"2px solid var(--border-light)", padding:"16px 0" }}>
          {["Overview","Content","Finance"].map(g => (
            <div key={g} style={{ marginBottom:8 }}>
              <div style={{ padding:"4px 14px", fontSize:".68rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"var(--gray)" }}>{g}</div>
              {TABS.filter(t => t.g === g).map(t => (
                <div key={t.id} className={`side-nav-item${tab===t.id?" active":""}`} onClick={() => setTab(t.id)}>{t.label}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Content area */}
        <div style={{ flex:1, padding:24, overflow:"auto" }}>

          {tab === "overview" && (
            <div>
              <SectionTitle text="Dashboard Overview" />
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
                {[["Total Alumni",alumni.filter(a => !a.pending).length,"All-time total","var(--maroon)"],["Pending Approvals",pending.length,"Awaiting review","var(--saffron)"],["Active Jobs",jobs.length,"Current listings","var(--navy)"],["Active Events",events.length,"Upcoming meets","#2e7d32"]].map(([l,v,s,col]) => (
                  <div key={l} className="gec-card" style={{ padding:16 }}>
                    <div style={{ fontSize:".7rem", color:"var(--gray)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:6 }}>{l}</div>
                    <div style={{ fontFamily:"Merriweather,serif", fontSize:"1.8rem", fontWeight:900, color:col, lineHeight:1 }}>{v}</div>
                    <div style={{ fontSize:".74rem", color:col, marginTop:6, fontWeight:600 }}>{s}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                <div className="gec-card"><div style={{ padding:16 }}>
                  <SectionTitle text="Recent Registrations" />
                  {alumni.slice(-5).reverse().map(a => (
                    <div key={a.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid var(--border-light)" }}>
                      <Avatar name={a.name} color={a.color} size={34} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:".82rem", fontWeight:700, color:"var(--navy)" }}>{a.name}</div>
                        <div style={{ fontSize:".71rem", color:"var(--gray)" }}>{a.dept} · {a.year}</div>
                      </div>
                      <Badge text={a.pending ? "Pending" : "Active"} type={a.pending ? "saffron" : "green"} />
                    </div>
                  ))}
                </div></div>
                <div className="gec-card"><div style={{ padding:16 }}>
                  <SectionTitle text="Quick Actions" />
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    <Btn cls="btn-outline" onClick={() => setTab("approvals")}>⏳ Review {pending.length} Pending Approvals</Btn>
                    <Btn cls="btn-outline" onClick={onCreate}>📅 Create New Event</Btn>
                    <Btn cls="btn-outline" onClick={() => toast("Announcement sent to all alumni!", "success")}>📢 Send Announcement</Btn>
                    <Btn cls="btn-navy">📊 Download Alumni Report</Btn>
                  </div>
                </div></div>
              </div>
            </div>
          )}

          {tab === "users" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
                <SectionTitle text="User Management" />
                <div style={{ display:"flex", gap: 10, flexWrap:"wrap" }}>
                  <input value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="Search Name or Roll No." style={{ padding:"7px 10px", border:"1px solid var(--border)", borderRadius:3, fontFamily:"'Open Sans',sans-serif", fontSize:".8rem", outline:"none" }} />
                  <select value={userBatch} onChange={e => setUserBatch(e.target.value)} style={{ padding:"7px 10px", border:"1px solid var(--border)", borderRadius:3, fontFamily:"'Open Sans',sans-serif", fontSize:".8rem", outline:"none", backgroundColor:"#fff" }}>
                    <option value="">All Batches</option>
                    {Array.from({length:20},(_,i)=>2024-i).map(y => <option key={y}>{y}</option>)}
                  </select>
                  <Btn cls="btn-maroon" size="sm">+ Add User</Btn>
                </div>
              </div>
              <div className="gec-card" style={{ overflow:"auto" }}>
                <table>
                  <thead><tr>{["Alumni","GEC Roll No.","Email","Batch","Status","Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{filteredUsers.map(a => (
                    <tr key={a.id}>
                      <td><div style={{ display:"flex", alignItems:"center", gap:8 }}><Avatar name={a.name} color={a.color} size={30} /><div><div style={{ fontWeight:700, color:"var(--navy)", fontSize:".82rem" }}>{a.name}</div><div style={{ fontSize:".7rem", color:"var(--gray)" }}>{a.dept}</div></div></div></td>
                      <td style={{ fontSize:".8rem", color:"var(--maroon)", fontWeight:700 }}>{a.roll || "—"}</td>
                      <td style={{ fontSize:".8rem" }}>{a.email}</td>
                      <td>{a.year}</td>
                      <td><Badge text={a.pending?"Pending":"Active"} type={a.pending?"saffron":"green"} /></td>
                      <td>
                        <div style={{ display:"flex", gap:6 }}>
                          <Btn cls="btn-outline-navy" size="sm" onClick={() => onView(a)}>View Profile</Btn>
                          {a.pending && <Btn cls="btn-maroon" size="sm" onClick={() => onApprove(a.id)}>Approve</Btn>}
                        </div>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "approvals" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
                <SectionTitle text="Pending Approvals" sub={`${pending.length} awaiting review`} />
                <input value={pendingSearch} onChange={e => setPendingSearch(e.target.value)} placeholder="Search Name or Roll No." style={{ padding:"7px 10px", border:"1px solid var(--border)", borderRadius:3, fontFamily:"'Open Sans',sans-serif", fontSize:".8rem", outline:"none" }} />
              </div>
              {filteredPending.length === 0 ? (
                <div style={{ textAlign:"center", padding:60 }}><div style={{ fontSize:"3rem" }}>✅</div><h3>All cleared!</h3></div>
              ) : filteredPending.map(a => (
                <div key={a.id} className="gec-card" style={{ marginBottom:12 }}><div style={{ padding:16, display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                  <Avatar name={a.name} color={a.color} size={44} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, color:"var(--navy)", fontSize:".9rem" }}>{a.name}</div>
                    <div style={{ fontSize:".78rem", color:"var(--gray)" }}>{a.dept} | Batch {a.year}</div>
                    <div style={{ fontSize:".78rem", color:"var(--gray)" }}>{a.company ? `${a.company} | ` : ""}{a.location||""}</div>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <Btn cls="btn-outline" size="sm" onClick={() => onReject(a.id)}>Reject</Btn>
                    <Btn cls="btn-maroon" size="sm" onClick={() => onApprove(a.id)}>Approve</Btn>
                  </div>
                </div></div>
              ))}
            </div>
          )}

          {tab === "jobs-admin" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
                <SectionTitle text="Job Postings" />
                <div style={{ display:"flex", gap: 10, flexWrap:"wrap" }}>
                  <input value={jobSearch} onChange={e => setJobSearch(e.target.value)} placeholder="Search Title or Company" style={{ padding:"7px 10px", border:"1px solid var(--border)", borderRadius:3, fontFamily:"'Open Sans',sans-serif", fontSize:".8rem", outline:"none" }} />
                  <Btn cls="btn-maroon" size="sm" onClick={onPost}>+ Post Job</Btn>
                </div>
              </div>
              <div className="gec-card" style={{ overflow:"auto" }}>
                <table>
                  <thead><tr>{["Title","Company","Type","Posted By","Date","Status"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{filteredJobs.map(j => (
                    <tr key={j.id}>
                      <td style={{ fontWeight:700, color:"var(--navy)", fontSize:".82rem" }}>{j.title}</td>
                      <td>{j.company}</td>
                      <td><Badge text={j.type} type="blue" /></td>
                      <td>{j.postedBy?.name || j.postedBy || "System"}</td>
                      <td>{j.date}</td>
                      <td><Badge text="Active" type="green" /></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "students-admin" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
                <SectionTitle text="Student Database" sub={`${students.length} currently enrolled`} />
                <div style={{ display:"flex", gap: 10, flexWrap:"wrap" }}>
                  <input value={studentSearch} onChange={e => setStudentSearch(e.target.value)} placeholder="Search Name or Roll No." style={{ padding:"7px 10px", border:"1px solid var(--border)", borderRadius:3, fontFamily:"'Open Sans',sans-serif", fontSize:".8rem", outline:"none" }} />
                </div>
              </div>
              <div className="gec-card" style={{ overflow:"auto" }}>
                <table>
                  <thead><tr>{["GEC Roll Number","Name","Email","Department","Passing Year"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{filteredStudents.map(s => (
                    <tr key={s.id}>
                      <td style={{ fontWeight:700, color:"var(--navy)", fontSize:".82rem" }}>{s.rollNumber}</td>
                      <td>{s.first} {s.last}</td>
                      <td style={{ fontSize:".8rem" }}>{s.email}</td>
                      <td>{s.dept}</td>
                      <td><Badge text={s.year || "2026"} type="saffron" /></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "events-admin" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <SectionTitle text="Events Management" />
                <Btn cls="btn-maroon" size="sm" onClick={onCreate}>+ Create Event</Btn>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {events.map(ev => <EventCard key={ev.id} ev={ev} onReg={() => {}} />)}
              </div>
            </div>
          )}

          {tab === "donations" && (
            <div>
              <SectionTitle text="Donation Tracking" />
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:20 }}>
                {[["Total Raised","₹2.4 Cr","var(--maroon)"],["This Month","₹2.8L","var(--navy)"],["Donors","5,247","#2e7d32"],["Avg Donation","₹4,570","var(--saffron)"]].map(([l,v,c]) => (
                  <div key={l} className="gec-card" style={{ padding:16 }}>
                    <div style={{ fontSize:".7rem", color:"var(--gray)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:6 }}>{l}</div>
                    <div style={{ fontFamily:"Merriweather,serif", fontSize:"1.8rem", fontWeight:900, color:c, lineHeight:1 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="gec-card" style={{ overflow:"auto" }}>
                <table>
                  <thead><tr>{["Donor","Amount","Cause","Date","Status"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{sampleDons.map((d, i) => (
                    <tr key={i}>
                      <td>{d.d}</td>
                      <td style={{ fontWeight:700, color:"var(--maroon)" }}>{d.a}</td>
                      <td>{d.c}</td>
                      <td>{d.date}</td>
                      <td><Badge text={d.s} type="green" /></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "reports" && (
            <div>
              <SectionTitle text="Reports & Analytics" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                <div className="gec-card"><div style={{ padding:18 }}>
                  <SectionTitle text="Alumni by Department" />
                  {[["CSE & IT",36],["Civil",20],["Mechanical",18],["ECE",14],["Other",12]].map(([d,v]) => (
                    <div key={d} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ width:100, fontSize:".76rem", color:"var(--gray)" }}>{d}</div>
                      <div style={{ flex:1, height:18, background:"#eee", borderRadius:2, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${v*2.5}%`, background:"var(--maroon)", borderRadius:2 }} />
                      </div>
                      <div style={{ width:28, fontSize:".76rem", color:"var(--gray)", textAlign:"right" }}>{v}%</div>
                    </div>
                  ))}
                </div></div>
                <div className="gec-card"><div style={{ padding:18 }}>
                  <SectionTitle text="Donations by Cause" />
                  {causes.map(ca => {
                    const p = Math.round((ca.raised/ca.goal)*100);
                    return (
                      <div key={ca.id} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                        <div style={{ width:80, fontSize:".76rem", color:"var(--gray)" }}>{ca.icon} {ca.name.split(" ")[0]}</div>
                        <div style={{ flex:1, height:18, background:"#eee", borderRadius:2, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${p}%`, background:"var(--saffron)", borderRadius:2 }} />
                        </div>
                        <div style={{ width:28, fontSize:".76rem", color:"var(--gray)", textAlign:"right" }}>{p}%</div>
                      </div>
                    );
                  })}
                </div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
