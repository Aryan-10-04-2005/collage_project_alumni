/* ============================================================
   HomeView.jsx  |  GEC Alumni Portal — Homepage
   Mirrors gec.edu.in 2-column layout: main content + sidebar
   Hero · Quick links · Alumni · Events · Jobs · Donate banner
   Stories · Notice Board sidebar · GEC at a Glance · Footer
   ============================================================ */

import { Btn } from "./components.jsx";
import { AlumniCard, JobCard, EventCard, StoryCard } from "./Cards.jsx";
import { DEPTS } from "./data.js";

export default function HomeView({ alumni, jobs, events, stories, setView, onRegister, onApply, onEvReg }) {
  const c = { maxWidth: 1260, margin: "0 auto", padding: "0 20px" };

  return (
    <div>
      {/* ── HERO BANNER ── */}
      <div style={{ background:"linear-gradient(135deg,var(--navy) 0%,#001f4d 45%,var(--maroon-dark) 100%)", minHeight:480, display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:.04, backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
        <div style={{ position:"absolute", right:-60, top:0, bottom:0, width:"40%", background:"linear-gradient(135deg,transparent 0%,rgba(255,140,0,.07) 60%,rgba(255,140,0,.14) 100%)" }} />
        <img src="/geclogo.png" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.08, pointerEvents:"none", userSelect:"none" }} />
        <div style={{ ...c, position:"relative", zIndex:1, width:"100%" }}>
          <div style={{ maxWidth:620, padding:"40px 0" }}>
            <div className="anim-1" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,140,0,.15)", border:"1px solid rgba(255,140,0,.35)", borderRadius:2, padding:"5px 14px", marginBottom:20, color:"var(--saffron-lt)", fontSize:".75rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase" }}>
              🏛 Est. 2006 · NAAC A+ · BPUT Affiliated
            </div>
            <h1 className="anim-2" style={{ color:"#fff", marginBottom:14, lineHeight:1.15 }}>
              <span style={{ color:"var(--saffron)" }}>Gandhi Engineering College</span><br />
              Alumni Association Portal
            </h1>
            <p className="anim-3" style={{ color:"rgba(255,255,255,.78)", fontSize:".97rem", lineHeight:1.75, marginBottom:28, maxWidth:520 }}>
              Connect with 40,000+ GEC graduates. Explore career opportunities, attend reunions, support your juniors, and strengthen the GEC community across Odisha and beyond.
            </p>
            <div className="anim-3" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Btn cls="btn-saffron" size="lg" onClick={onRegister}>Join Alumni Network</Btn>
              <Btn cls="btn-white-outline" size="lg" onClick={() => setView("directory")}>Explore Alumni</Btn>
            </div>
            {/* Stats row */}
            <div className="anim-4" style={{ display:"flex", gap:32, marginTop:40, paddingTop:32, borderTop:"1px solid rgba(255,255,255,.12)", flexWrap:"wrap" }}>
              {[["40,000+","Registered Alumni"],["94%","Placement Rate"],["₹2.4 Cr","Scholarships"],["300+","Recruiters"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"Merriweather,serif", fontSize:"1.8rem", fontWeight:900, color:"var(--saffron)", lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:".72rem", color:"rgba(255,255,255,.55)", marginTop:3, textTransform:"uppercase", letterSpacing:".06em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── QUICK LINKS BAR (GEC nav strip below hero) ── */}
      <div style={{ background:"var(--navy)", borderBottom:"3px solid var(--saffron)" }}>
        <div style={{ ...c, display:"flex", overflowX:"auto" }}>
          {[["🎓","Admissions"],["💼","Placements"],["🔬","Research"],["📋","Courses"],["📅","Events"],["🏆","Rankings"],["📰","News"],["💛","Donate"]].map(([ic, lb]) => (
            <div key={lb}
              style={{ display:"flex", alignItems:"center", gap:7, padding:"12px 18px", borderRight:"1px solid rgba(255,255,255,.12)", flexShrink:0, cursor:"pointer", color:"rgba(255,255,255,.85)", fontSize:".8rem", fontWeight:600, transition:"var(--tr)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,.85)"; }}>
              <span style={{ fontSize:"1rem" }}>{ic}</span>{lb}
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN 2-COLUMN CONTENT (main + sidebar — gec.edu.in pattern) ── */}
      <div style={{ ...c, display:"grid", gridTemplateColumns:"1fr 300px", gap:24, padding:"28px 20px", alignItems:"start" }} className="grid-main-sidebar">

        {/* ─── LEFT: MAIN COLUMN ─── */}
        <div>
          {/* Distinguished Alumni */}
          <div className="sec-title"><h2>Distinguished GEC Alumni</h2></div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16, marginBottom:24 }}>
            {alumni.filter(a => !a.pending).slice(0, 3).map(a => (
              <AlumniCard key={a.id} a={a} onView={() => setView({ page:"profile", data:a })} />
            ))}
          </div>
          <div style={{ textAlign:"right", marginBottom:32 }}>
            <Btn cls="btn-outline" size="sm" onClick={() => setView("directory")}>View Full Alumni Directory →</Btn>
          </div>

          {/* Upcoming Events */}
          <div className="sec-title"><h2>Upcoming Events & Reunions</h2></div>
          <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:24 }}>
            {events.slice(0, 3).map(ev => <EventCard key={ev.id} ev={ev} onReg={onEvReg} />)}
          </div>
          <div style={{ textAlign:"right", marginBottom:32 }}>
            <Btn cls="btn-outline" size="sm" onClick={() => setView("events")}>View All Events →</Btn>
          </div>

          {/* Latest Jobs */}
          <div className="sec-title"><h2>Latest Jobs & Internships</h2><span style={{ fontSize:".8rem", color:"var(--gray)", fontFamily:"'Open Sans',sans-serif", fontWeight:400 }}>Posted by GEC Alumni</span></div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16, marginBottom:24 }}>
            {jobs.slice(0, 4).map(j => <JobCard key={j.id} j={j} onApply={onApply} />)}
          </div>
          <div style={{ textAlign:"right", marginBottom:32 }}>
            <Btn cls="btn-outline" size="sm" onClick={() => setView("jobs")}>View All Opportunities →</Btn>
          </div>
        </div>

        {/* ─── RIGHT: SIDEBAR ─── */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {/* Notice Board */}
          <div className="gec-card">
            <div style={{ background:"var(--maroon)", color:"#fff", padding:"9px 14px", fontFamily:"Merriweather,serif", fontSize:".9rem", fontWeight:700 }}>
              📋 Notice Board
            </div>
            <div style={{ padding:"6px 0" }}>
              {[
                { text:"Alumni Registration Open for Batch 2025", date:"15 Mar", hot:true },
                { text:"NAAC A+ Peer Team Visit — Campus Preparations", date:"10 Mar", hot:false },
                { text:"GATE 2025 Results — GEC students excel", date:"8 Mar", hot:false },
                { text:"Annual Alumni Meet Registration Closes Soon", date:"5 Mar", hot:true },
                { text:"New B.Tech AI/ML Batch — Admissions 2025", date:"1 Mar", hot:false },
                { text:"Placement Drive: TCS, Infosys on campus Apr 5", date:"28 Feb", hot:true },
              ].map((n, i) => (
                <div key={i} style={{ padding:"8px 14px", borderBottom:"1px solid var(--border-light)", display:"flex", gap:10, alignItems:"flex-start", cursor:"pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--light-bg)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                  {n.hot && <span style={{ background:"var(--maroon)", color:"#fff", fontSize:".6rem", padding:"1px 5px", borderRadius:2, flexShrink:0, marginTop:2, fontWeight:700 }}>NEW</span>}
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:".79rem", color:"var(--navy)", fontWeight:600, lineHeight:1.4 }}>{n.text}</div>
                    <div style={{ fontSize:".7rem", color:"var(--gray)" }}>{n.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GEC at a Glance */}
          <div className="gec-card">
            <div style={{ background:"var(--navy)", color:"#fff", padding:"9px 14px", fontFamily:"Merriweather,serif", fontSize:".9rem", fontWeight:700 }}>
              📊 GEC at a Glance
            </div>
            <div style={{ padding:"4px 0" }}>
              {[["Established","2006"],["Affiliation","BPUT, Odisha"],["NAAC Grade","A+"],["AICTE Status","Approved"],["Campus Area","25 Acres"],["Total Students","3,000+"],["Faculty","250+"],["Placement Rate","94%"],["Highest Package","₹33 LPA"],["Recruiting Co.","300+"]].map(([k, v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"7px 14px", borderBottom:"1px solid var(--border-light)", fontSize:".8rem" }}>
                  <span style={{ color:"var(--gray)" }}>{k}</span>
                  <span style={{ fontWeight:700, color:"var(--maroon)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div className="gec-card">
            <div style={{ background:"var(--maroon)", color:"#fff", padding:"9px 14px", fontFamily:"Merriweather,serif", fontSize:".9rem", fontWeight:700 }}>
              🏫 Departments
            </div>
            <div>
              {DEPTS.map((d, i) => (
                <div key={i} className="side-nav-item">
                  <span style={{ fontSize:".7rem", opacity:.7 }}>▶</span> {d}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="gec-card" style={{ padding:16 }}>
            <div style={{ fontFamily:"Merriweather,serif", fontSize:".88rem", fontWeight:700, color:"var(--maroon)", marginBottom:12 }}>🌐 Connect With Us</div>
            {[["🌍","Website","gec.edu.in"],["📘","Facebook","gecbbsrofficial"],["📸","Instagram","@gecbbsrofficial"],["🐦","Twitter","@gecbbsrofficial"],["💼","LinkedIn","GEC Bhubaneswar"]].map(([ic, nm, hd]) => (
              <div key={nm} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8, fontSize:".8rem" }}>
                <span>{ic}</span>
                <span style={{ fontWeight:600, color:"var(--navy)", minWidth:70 }}>{nm}</span>
                <span style={{ color:"var(--gray)" }}>{hd}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DONATION BANNER ── */}
      <div style={{ background:"linear-gradient(135deg,var(--maroon-dark) 0%,var(--maroon) 100%)", padding:"48px 0", margin:"8px 0 0" }}>
        <div style={{ ...c, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
          <div>
            <div style={{ fontSize:".72rem", color:"var(--saffron-lt)", fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", marginBottom:10 }}>◆ Support Your Alma Mater</div>
            <h2 style={{ color:"#fff", marginBottom:10 }}>Give Back to GEC Bhubaneswar</h2>
            <p style={{ color:"rgba(255,255,255,.75)", maxWidth:480 }}>Fund merit scholarships, modernise labs, and build a stronger GEC for the next generation. 80G tax benefit available.</p>
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Btn cls="btn-saffron" size="lg" onClick={() => setView("donate")}>Donate Now</Btn>
            <Btn cls="btn-white-outline" size="lg" onClick={() => setView("stories")}>Read Impact Stories</Btn>
          </div>
        </div>
      </div>

      {/* ── SUCCESS STORIES ── */}
      <div style={{ ...c, padding:"32px 20px 0" }}>
        <div className="sec-title"><h2>Alumni Success Stories</h2><span style={{ fontSize:".8rem", color:"var(--gray)", fontFamily:"'Open Sans',sans-serif", fontWeight:400 }}>Pride of GEC Bhubaneswar</span></div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16, marginBottom:16 }}>
          {stories.slice(0, 3).map((s, i) => <StoryCard key={i} s={s} />)}
        </div>
        <div style={{ textAlign:"right", marginBottom:32 }}>
          <Btn cls="btn-outline" size="sm" onClick={() => setView("stories")}>More Stories →</Btn>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#1a1a2e", color:"rgba(255,255,255,.65)", padding:"40px 0 0", marginTop:32 }}>
        <div style={c}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:32, marginBottom:32 }} className="grid-footer">
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <img src="/geclogo.png" alt="GEC Logo" style={{ width:48, height:48, objectFit:"contain" }} />
                <div>
                  <div style={{ color:"#fff", fontFamily:"Merriweather,serif", fontSize:"1rem", fontWeight:700 }}>Gandhi Engineering College</div>
                  <div style={{ fontSize:".68rem", color:"var(--saffron-lt)" }}>Alumni Association · Bhubaneswar</div>
                </div>
              </div>
              <p style={{ fontSize:".8rem", lineHeight:1.75, color:"rgba(255,255,255,.6)" }}>Gandhi Vihar, Badaraghunathpur, Near Janla,<br />Bhubaneswar, Odisha – 752054</p>
              <div style={{ marginTop:12, fontSize:".78rem" }}>
                <div>📞 9776066555</div>
                <div style={{ marginTop:4 }}>✉ alumni@gec.edu.in</div>
              </div>
            </div>
            {[
              ["Alumni Portal", [["Alumni Directory","directory"],["Jobs & Internships","jobs"],["Events & Reunions","events"],["Success Stories","stories"],["Give Back","donate"],["Admin Panel","admin"]]],
              ["Academics",    [["B.Tech Programs",""],["M.Tech Programs",""],["MBA / MCA",""],["Diploma Courses",""],["Syllabus",""],["Time Table",""]]],
              ["Information",  [["About GEC",""],["NAAC / NIRF",""],["AICTE Approval",""],["Fee Structure",""],["Scholarships",""],["RTI / Notices",""]]],
            ].map(([heading, links]) => (
              <div key={heading}>
                <div style={{ fontSize:".75rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"var(--saffron-lt)", marginBottom:12, paddingBottom:8, borderBottom:"1px solid rgba(255,255,255,.1)" }}>{heading}</div>
                <ul>
                  {links.map(([l, id]) => (
                    <li key={l} style={{ marginBottom:8 }}>
                      <span onClick={() => id && setView(id)} style={{ color:"rgba(255,255,255,.6)", fontSize:".8rem", cursor: id ? "pointer" : "default" }}
                        onMouseEnter={e => { if (id) e.target.style.color = "var(--saffron-lt)"; }}
                        onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,.6)"; }}>
                        {l}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.1)", padding:"14px 20px", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, fontSize:".75rem", maxWidth:1260, margin:"0 auto" }}>
          <div>© 2025 Gandhi Engineering College Alumni Association, Bhubaneswar. All rights reserved.</div>
          <div style={{ color:"rgba(255,255,255,.35)" }}>Powered by GEC Student Tech Club</div>
        </div>
        <style>{`@media(max-width:900px){.grid-footer{grid-template-columns:1fr 1fr!important}}`}</style>
      </footer>
    </div>
  );
}
