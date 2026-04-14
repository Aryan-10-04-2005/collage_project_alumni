/* ============================================================
   components.jsx  |  GEC Alumni Portal — Shared UI Primitives
   Btn · Avatar · Badge · Field · SelField · TxtField
   ProgBar · SectionTitle · Modal · Toasts
   ============================================================ */

import { useState, useEffect } from "react";
import { avatarColors, getInitials } from "./data.js";

/* ── BUTTON ── */
export function Btn({ cls = "btn-maroon", size = "", onClick, children, style = {} }) {
  return (
    <button
      className={`btn ${cls} ${size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : ""}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

/* ── AVATAR ── */
export function Avatar({ name, color = "maroon", size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: avatarColors[color] || avatarColors.maroon,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Merriweather, serif", fontWeight: 700,
      color: "#fff", fontSize: size * 0.36, flexShrink: 0,
    }}>
      {getInitials(name)}
    </div>
  );
}

/* ── BADGE ── */
export function Badge({ text, type = "red" }) {
  const map = { red: "badge-red", blue: "badge-blue", saffron: "badge-saffron", green: "badge-green", gray: "badge-gray" };
  return <span className={`badge ${map[type] || "badge-red"}`}>{text}</span>;
}

/* ── TEXT INPUT ── */
export function Field({ label, type = "text", placeholder, value, onChange, style = {} }) {
  return (
    <div className="form-group" style={style}>
      {label && <label className="form-label">{label}</label>}
      <input type={type} placeholder={placeholder} value={value || ""} onChange={onChange} className="form-control" />
    </div>
  );
}

/* ── SELECT ── */
export function SelField({ label, opts, value, onChange }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <select value={value || ""} onChange={onChange} className="form-control">
        {opts.map(o =>
          typeof o === "string"
            ? <option key={o}>{o}</option>
            : <option key={o.v} value={o.v}>{o.l}</option>
        )}
      </select>
    </div>
  );
}

/* ── TEXTAREA ── */
export function TxtField({ label, placeholder, value, onChange }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <textarea placeholder={placeholder} value={value || ""} onChange={onChange} className="form-control" />
    </div>
  );
}

/* ── PROGRESS BAR ── */
export function ProgBar({ pct, color = "var(--maroon)" }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
    </div>
  );
}

/* ── SECTION TITLE ── */
export function SectionTitle({ text, sub }) {
  return (
    <div className="sec-title">
      <h2>{text}</h2>
      {sub && (
        <span style={{ fontSize: ".8rem", color: "var(--gray)", fontFamily: "'Open Sans',sans-serif", fontWeight: 400 }}>
          {sub}
        </span>
      )}
    </div>
  );
}

/* ── MODAL ── */
export function Modal({ open, onClose, title, children, footer, wide }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{ position:"fixed", inset:0, zIndex:3000, background:"rgba(0,0,0,0.55)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background:"#fff", borderRadius:4, boxShadow:"0 8px 40px rgba(0,0,0,.25)", width:"100%", maxWidth: wide ? 700 : 500, maxHeight:"90vh", overflowY:"auto", animation:"modalIn .22s ease" }}>
        {/* GEC maroon header bar */}
        <div style={{ background:"var(--maroon)", padding:"12px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:"Merriweather,serif", fontSize:"1rem", fontWeight:700, color:"#fff" }}>{title}</span>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,.2)", border:"none", color:"#fff", width:26, height:26, borderRadius:"50%", cursor:"pointer", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>
        <div style={{ padding:"18px 20px" }}>{children}</div>
        {footer && (
          <div style={{ padding:"10px 20px 18px", display:"flex", gap:8, justifyContent:"flex-end", borderTop:"1px solid var(--border-light)" }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── TOAST CONTAINER ── */
export function Toasts({ list }) {
  const colors = { success: "var(--maroon)", error: "#c62828", warn: "var(--saffron)", "": "var(--navy)" };
  return (
    <div style={{ position:"fixed", bottom:20, right:20, zIndex:5000, display:"flex", flexDirection:"column", gap:8 }}>
      {list.map(t => (
        <div key={t.id} style={{ background: colors[t.type] || colors[""], color:"#fff", padding:"11px 16px", borderRadius:4, fontSize:".84rem", maxWidth:320, boxShadow:"0 4px 16px rgba(0,0,0,.2)", animation:"toastIn .25s ease", display:"flex", gap:8, alignItems:"center", borderLeft:"4px solid rgba(255,255,255,.4)" }}>
          <span>{t.type === "success" ? "✅" : t.type === "error" ? "❌" : t.type === "warn" ? "⚠️" : "ℹ️"}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
