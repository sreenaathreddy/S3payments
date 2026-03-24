import { useState, useEffect, useRef, useCallback } from "react";


// ─── ICON SYSTEM (PhonePe-style Icons) ──────────────────────────────────────
const Icon = ({ name, size=16, color="currentColor", style={} }) => {
  const s = { display:"inline-block", flexShrink:0, verticalAlign:"middle", ...style };
  const w = size, h = size;
  const icons = {
    home: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M3 11.5L12 3l9 8.5V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11.5z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.15"/>
        <path d="M9 22V13h6v9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    plus: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M12 8v8M8 12h8" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    send: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M22 2L11 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.15"/>
      </svg>
    ),
    bills: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <rect x="4" y="3" width="16" height="18" rx="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M8 8h8M8 12h8M8 16h5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    history: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M12 7v5l3.5 3.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.5 7A9 9 0 0 1 5 5M3 11H6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    gift: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <rect x="3" y="10" width="18" height="12" rx="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <rect x="2" y="6" width="20" height="4" rx="1" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2"/>
        <path d="M12 6V22" stroke={color} strokeWidth="2"/>
        <path d="M12 6s-3-1-3-3 3-2 3 3zM12 6s3-1 3-3-3-2-3 3z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    doorbell: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.15"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="4" r="1.5" fill={color}/>
      </svg>
    ),
    help: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2-3 2.5-3 4.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="17.5" r="1" fill={color}/>
      </svg>
    ),
    // ── Admin ────────────────────────────────────────────────────────────────
    chart: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <rect x="2" y="2" width="20" height="20" rx="3" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
        <rect x="6" y="13" width="3" height="7" rx="1" fill={color}/>
        <rect x="10.5" y="9" width="3" height="11" rx="1" fill={color} opacity="0.8"/>
        <rect x="15" y="6" width="3" height="14" rx="1" fill={color} opacity="0.6"/>
      </svg>
    ),
    users: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="9" cy="8" r="3.5" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15"/>
        <path d="M2 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="18" cy="8" r="2.5" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1"/>
        <path d="M22 20c0-2.5-2-4-4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    transactions: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <rect x="2" y="5" width="20" height="14" rx="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M2 10h20" stroke={color} strokeWidth="2"/>
        <circle cx="7" cy="15.5" r="1.5" fill={color}/>
        <path d="M11 15.5h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    kyc: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <rect x="3" y="3" width="18" height="18" rx="4" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M7.5 12.5l3 3 6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    ticket: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M15 5H3a1 1 0 0 0-1 1v3a2 2 0 0 1 0 4v3a1 1 0 0 0 1 1h12" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.1"/>
        <path d="M15 5h6a1 1 0 0 1 1 1v3a2 2 0 0 0 0 4v3a1 1 0 0 1-1 1h-6" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.2"/>
        <path d="M15 9v2M15 13v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    settings: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    sliders: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M4 6h16M4 12h16M4 18h16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="9" cy="6" r="2.5" fill={color} stroke={color} strokeWidth="1.5"/>
        <circle cx="16" cy="12" r="2.5" fill={color} stroke={color} strokeWidth="1.5"/>
        <circle cx="8" cy="18" r="2.5" fill={color} stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
    // ── Common actions ───────────────────────────────────────────────────────
    back: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M19 12H5" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M11 6l-6 6 6 6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bank: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M3 21h18M3 10h18M5 10V21M19 10V21M12 10V21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 10L12 3l9 7" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.15"/>
      </svg>
    ),
    building: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <rect x="3" y="5" width="18" height="16" rx="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M3 9h18" stroke={color} strokeWidth="2"/>
        <rect x="7" y="13" width="2.5" height="2.5" rx="0.5" fill={color}/>
        <rect x="11" y="13" width="2.5" height="2.5" rx="0.5" fill={color} opacity="0.7"/>
        <rect x="15" y="13" width="2.5" height="2.5" rx="0.5" fill={color} opacity="0.5"/>
        <rect x="9" y="17" width="6" height="4" rx="1" fill={color} opacity="0.4"/>
      </svg>
    ),
    fingerprint: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M12 10.5a1.5 1.5 0 0 0-1.5 1.5c0 1.5-.2 3-.5 4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 11.5c0 2.5-.2 5.5-1 8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M17.5 10.5c.3 1 .5 3.5.5 5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 12.5A10 10 0 0 1 17 5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 16.5c1-1.5 1.5-3 1.5-4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 12.5A10 10 0 0 0 8 4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 12.5c0 1 .2 2.5.8 4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M8.5 20c-.2-1-.5-2-.5-3.5 0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    creditcard: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <rect x="2" y="5" width="20" height="14" rx="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <rect x="2" y="9.5" width="20" height="3.5" fill={color} fillOpacity="0.2"/>
        <rect x="5" y="15" width="5" height="2" rx="1" fill={color} opacity="0.7"/>
        <rect x="12" y="15" width="3" height="2" rx="1" fill={color} opacity="0.4"/>
      </svg>
    ),
    shield: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M12 22S4 18 4 12V6l8-3 8 3v6c0 6-8 10-8 10z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.15"/>
        <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    lock: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <rect x="4" y="11" width="16" height="11" rx="2.5" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15"/>
        <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="12" cy="16.5" r="1.5" fill={color}/>
        <path d="M12 16.5v2.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    key: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="8.5" cy="14.5" r="4.5" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15"/>
        <path d="M13 12l7.5-7.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 5l2 2M17 9l2-2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    eye: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M2 12S5 6 12 6s10 6 10 6-3 6-10 6S2 12 2 12z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.12"/>
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.3"/>
        <circle cx="12" cy="12" r="1.2" fill={color}/>
      </svg>
    ),
    eyeoff: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M2 12S5 6 12 6s10 6 10 6" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <path d="M3 3l18 18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M10.5 10.5A3 3 0 0 1 15 15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    user: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2"/>
        <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke={color} strokeWidth="2" strokeLinecap="round" fill={color} fillOpacity="0.1"/>
      </svg>
    ),
    logout: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="16 17 21 12 16 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    bell: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M18 9A6 6 0 0 0 6 9c0 7-3 9-3 9h18s-3-2-3-9z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.15"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    phone: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <rect x="6" y="2" width="12" height="20" rx="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <circle cx="12" cy="18" r="1" fill={color}/>
        <path d="M9 6h6" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    mail: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <rect x="2" y="4" width="20" height="16" rx="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M2 7l10 7 10-7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    mappin: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M12 22S5 15.5 5 10a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.15"/>
        <circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" fill="#fff"/>
      </svg>
    ),
    clock: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M12 7.5V12l3 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    search: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M15.5 15.5L21 21" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    check: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="12" cy="12" r="9" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
        <path d="M7.5 12.5l3 3 6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    xmark: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="12" cy="12" r="9" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    alert: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M12 3L2 21h20L12 3z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.12"/>
        <path d="M12 10v5" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="12" cy="17.5" r="1.2" fill={color}/>
      </svg>
    ),
    info: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M12 11v6" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="12" cy="8" r="1.2" fill={color}/>
      </svg>
    ),
    copy: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <rect x="8" y="8" width="13" height="13" rx="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1"/>
        <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    tag: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.12"/>
        <circle cx="7.5" cy="7.5" r="1.5" fill={color}/>
      </svg>
    ),
    signature: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M3 17c3.5-5.5 7-8.5 10.5-8.5S19 11 19 17" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 17l2.5-2.5M3 17l2.5 2.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 21h13" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    refresh: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill={color} fillOpacity="0.08"/>
        <path d="M3 3v5h5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    star: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.3"/>
      </svg>
    ),
    trash: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 11v6M14 11v6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    edit: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.1"/>
        <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    percent: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="6.5" cy="6.5" r="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15"/>
        <circle cx="17.5" cy="17.5" r="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15"/>
        <path d="M20 4L4 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    rupee: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <path d="M6 4h12M6 9h12M6 9a6 6 0 0 0 6 6H6m6 0l6 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    arrow_up: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M12 16V9M9 12l3-3 3 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    arrow_down: (
      <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12"/>
        <path d="M12 8v7M9 12l3 3 3-3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return icons[name] || <svg width={w} height={h} viewBox="0 0 24 24" fill="none" style={s}><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fillOpacity="0.1" fill={color}/></svg>;
};


// ─── GLOBAL FEE CONFIG (admin-editable, shared across app) ──────────────────
if (!window.__aepsConfig) { window.__aepsConfig = { globalEnabled:false }; }

if (!window.__feeConfig) {
  window.__feeConfig = {
    credit: 1.8,   // % for credit card
    debit:  0.5,   // % for debit card
    upi:    0.0,   // % for UPI load
    transfer: 10,  // flat fee ₹ for bank transfer
  };
}
const getFeeConfig = () => window.__feeConfig;

// ─── LOAD LOGO FONTS ──────────────────────────────────────────────────────────
if (typeof document !== "undefined" && document.head && !document.getElementById("s3-logo-fonts")) {
  const link = document.createElement("link");
  link.id = "s3-logo-fonts";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@600,700&display=swap";
  document.head.appendChild(link);
}

// ─── S3PAYMENTS LOGO COMPONENT ────────────────────────────────────────────────
// ─── S3 PAYMENTS NEW LOGO ────────────────────────────────────────────────────
// variant: "dark" | "light"   size: "sm" | "md" | "lg"
// Track if logo intro has already played this session
let _s3LogoPlayed = false;

const S3Logo = React.memo(({ variant = "dark", size = "md" }) => {
  const played = _s3LogoPlayed;
  // After first mount, mark as played so all subsequent logos skip intro
  React.useEffect(() => { _s3LogoPlayed = true; }, []);
  const isLight = variant === "light";
  const scales  = { sm: 0.52, md: 0.68, lg: 0.90 };
  const sc      = scales[size] || 0.68;

  // Colors
  const sColor   = isLight ? "#007d6e" : "#00d2b4";
  const s3Color  = isLight ? "#00a896" : "#00a896";
  const payColor = isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.45)";
  const divBg    = isLight
    ? "linear-gradient(to bottom,transparent,rgba(0,160,140,0.30),transparent)"
    : "linear-gradient(to bottom,transparent,rgba(0,210,180,0.35),transparent)";

  // Shield icon IDs (unique per variant to avoid SVG gradient conflicts)
  const pfx = isLight ? "L" : "D";

  const bgStyle = isLight
    ? { background:"#f8fffe", border:"1px solid rgba(0,160,140,0.15)", boxShadow:"0 4px 20px rgba(0,150,130,0.10)" }
    : { background:"linear-gradient(135deg,#0d1117 0%,#161b26 100%)", border:"1px solid rgba(0,210,180,0.20)", boxShadow:"0 0 32px rgba(0,210,180,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" };

  const iconW = Math.round(48 * sc);
  const iconH = Math.round(45 * sc);

  return (
    <div style={{ display:"flex", alignItems:"center", gap:Math.round(12*sc), padding:`${Math.round(10*sc)}px ${Math.round(18*sc)}px`, borderRadius:Math.round(14*sc), position:"relative", overflow:"hidden", ...bgStyle }}>
      {/* Sheen — dark only */}
      {!isLight && (
        <div style={{ position:"absolute", top:"-50%", left:"-20%", width:"60%", height:"200%", background:"linear-gradient(105deg,transparent 40%,rgba(0,210,180,0.04) 50%,transparent 60%)", animation:"sheen 5s ease-in-out infinite", pointerEvents:"none" }} />
      )}

      {/* Shield icon with ₹ */}
      <div style={{ position:"relative", width:iconW, height:iconH, flexShrink:0 }}>
        {/* Glow — dark only */}
        {!isLight && (
          <div style={{ position:"absolute", inset:-6, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,210,180,0.14) 0%,transparent 70%)", animation:"glowPulse 2.5s ease-in-out infinite", pointerEvents:"none" }} />
        )}
        <svg width={iconW} height={iconH} viewBox="0 0 64 60" xmlns="http://www.w3.org/2000/svg" style={{ overflow:"visible" }}>
          <defs>
            <linearGradient id={`sf${pfx}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d2b4" stopOpacity={isLight?"0.12":"0.15"}/>
              <stop offset="100%" stopColor="#0055ff" stopOpacity={isLight?"0.06":"0.08"}/>
            </linearGradient>
            <linearGradient id={`ss${pfx}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isLight?"#007d6e":"#00d2b4"}/>
              <stop offset="100%" stopColor={isLight?"#0055cc":"#0077ff"}/>
            </linearGradient>
          </defs>
          {/* ── Shield fill — no lines, only ₹ inside ── */}
          <path d="M32 4 L54 13 L54 32 Q54 48 32 57 Q10 48 10 32 L10 13 Z"
            fill={`url(#sf${pfx})`}
            style={{ filter:isLight?"none":"drop-shadow(0 0 8px rgba(0,210,180,0.25))" }}/>
          {/* Shield border */}
          <path d="M32 4 L54 13 L54 32 Q54 48 32 57 Q10 48 10 32 L10 13 Z"
            fill="none" stroke={`url(#ss${pfx})`} strokeWidth="1.5"
            strokeDasharray="200" strokeDashoffset={played ? "0" : "200"}
            style={played ? {} : { animation:"drawShield1 1.2s ease forwards" }}/>

          {/* ── ₹ Rupee symbol — clean, no lines ── */}
          <text x="32" y="31" fontFamily="'Noto Sans',sans-serif" fontSize="22" fontWeight="700"
            fill={isLight?"#007d6e":"#00d2b4"} dominantBaseline="central" textAnchor="middle"
            style={played
              ? { opacity:1, filter:isLight?"none":"drop-shadow(0 0 9px rgba(0,210,180,0.95))" }
              : { opacity:0, filter:isLight?"none":"drop-shadow(0 0 9px rgba(0,210,180,0.95))", animation:"rupeePopIn 0.6s 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>₹</text>

          {/* ── 3 inner dots orbit around ₹ symbol (r=10) ── */}
          <circle r="2.2" fill={isLight?"#007d6e":"#00d2b4"}
            style={{
              opacity: played ? 1 : 0,
              filter:isLight?"none":"drop-shadow(0 0 5px #00d2b4)",
              willChange:"transform", animation: played
                ? "innerOrbit1 2.8s linear infinite"
                : "dotPop1 0.3s 1.1s cubic-bezier(0.34,1.56,0.64,1) forwards, innerOrbit1 2.8s 1.4s linear infinite", willChange:"transform",
              transformOrigin:"32px 31px"
            }}/>
          <circle r="2.2" fill={isLight?"#007d6e":"#00d2b4"}
            style={{
              opacity: played ? 1 : 0,
              filter:isLight?"none":"drop-shadow(0 0 5px #00d2b4)",
              willChange:"transform", animation: played
                ? "innerOrbit2 2.8s linear infinite"
                : "dotPop1 0.3s 1.25s cubic-bezier(0.34,1.56,0.64,1) forwards, innerOrbit2 2.8s 1.4s linear infinite", willChange:"transform",
              transformOrigin:"32px 31px"
            }}/>
          <circle r="2.2" fill={isLight?"#007d6e":"#00d2b4"}
            style={{
              opacity: played ? 1 : 0,
              filter:isLight?"none":"drop-shadow(0 0 5px #00d2b4)",
              willChange:"transform", animation: played
                ? "innerOrbit3 2.8s linear infinite"
                : "dotPop1 0.3s 1.4s cubic-bezier(0.34,1.56,0.64,1) forwards, innerOrbit3 2.8s 1.4s linear infinite", willChange:"transform",
              transformOrigin:"32px 31px"
            }}/>


        </svg>
      </div>

      {/* Divider */}
      <div style={{ width:1, height:Math.round(38*sc), background:divBg, flexShrink:0 }} />

      {/* Wordmark */}
      <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
        <div style={{ display:"flex", alignItems:"baseline", lineHeight:1 }}>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:Math.round(42*sc), color:sColor, letterSpacing:"-1px",
            textShadow:isLight?"none":`0 0 18px rgba(0,210,180,0.38)` }}>S</span>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:Math.round(30*sc), color:s3Color, letterSpacing:"-1px",
            alignSelf:"flex-start", marginTop:Math.round(3*sc) }}>3</span>
        </div>
        <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:Math.round(9*sc), fontWeight:700,
          letterSpacing:"4px", color:payColor, textTransform:"uppercase", marginLeft:1 }}>Payments</span>
      </div>
    </div>
  );
});

// ─── FIREBASE CONFIG ──────────────────────────────────────────────────────────
// 🔧 REPLACE with your Firebase project credentials
// Get from: https://console.firebase.google.com → Project Settings → Your Apps
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyApXG2r0ZfDv0mMfwwdEJbnY4ZnSq3hxN0",
  authDomain:        "s3-payments.firebaseapp.com",
  projectId:         "s3-payments",
  storageBucket:     "s3-payments.firebasestorage.app",
  messagingSenderId: "501861178829",
  appId:             "1:501861178829:web:0f5a8c8d033204b0f27884",
  measurementId:     "G-G7JLHKCGVW",
};

// ─── FIREBASE LOADER ──────────────────────────────────────────────────────────
const loadFirebase = () => new Promise((resolve, reject) => {
  if (window.__firebaseReady) { resolve(window.__firebase); return; }
  const scripts = [
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js",
  ];
  let loaded = 0;
  scripts.forEach(src => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => {
      if (++loaded === scripts.length) {
        try {
          const app  = window.firebase.apps.length ? window.firebase.app() : window.firebase.initializeApp(FIREBASE_CONFIG);
          const db   = window.firebase.firestore();
          const auth = window.firebase.auth();
          window.__firebase = { app, db, auth, ts: () => window.firebase.firestore.FieldValue.serverTimestamp() };
          window.__firebaseReady = true;
          resolve(window.__firebase);
        } catch(e) { reject(e); }
      }
    };
    s.onerror = () => reject(new Error("Failed to load: " + src));
    document.head.appendChild(s);
  });
});

// ─── DATABASE SERVICE ─────────────────────────────────────────────────────────
const DB = {
  // Users
  async createUser(uid, data) {
    const { db, ts } = window.__firebase;
    await db.collection("users").doc(uid).set({ ...data, createdAt: ts(), kycStatus: "pending" });
  },
  async getUser(uid) {
    const { db } = window.__firebase;
    const snap = await db.collection("users").doc(uid).get();
    return snap.exists ? { id: snap.id, ...snap.data() } : null;
  },
  async updateUser(uid, data) {
    const { db, ts } = window.__firebase;
    await db.collection("users").doc(uid).update({ ...data, updatedAt: ts() });
  },

  // Wallet
  async createWallet(userId, walletId) {
    const { db, ts } = window.__firebase;
    await db.collection("wallets").doc(userId).set({
      walletId, userId, balance: 0, dailyUsed: 0,
      dailyReset: new Date().toDateString(), createdAt: ts(), status: "active",
    });
  },
  async getWallet(userId) {
    const { db } = window.__firebase;
    const snap = await db.collection("wallets").doc(userId).get();
    if (!snap.exists) return null;
    const data = { id: snap.id, ...snap.data() };
    if (data.dailyReset !== new Date().toDateString()) {
      await db.collection("wallets").doc(userId).update({ dailyUsed: 0, dailyReset: new Date().toDateString() });
      data.dailyUsed = 0;
    }
    return data;
  },
  async updateWallet(userId, fields) {
    const { db, ts } = window.__firebase;
    await db.collection("wallets").doc(userId).update({ ...fields, updatedAt: ts() });
  },
  subscribeWallet(userId, cb) {
    const { db } = window.__firebase;
    return db.collection("wallets").doc(userId).onSnapshot(snap => {
      if (snap.exists) cb({ id: snap.id, ...snap.data() });
    });
  },

  // Transactions
  async addTransaction(userId, txn) {
    const { db, ts } = window.__firebase;
    const ref = await db.collection("transactions").add({ ...txn, userId, createdAt: ts() });
    return ref.id;
  },
  subscribeTransactions(userId, cb) {
    const { db } = window.__firebase;
    return db.collection("transactions")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(50)
      .onSnapshot(snap => cb(snap.docs.map(d => ({
        id: d.id, ...d.data(),
        date: d.data().createdAt?.toDate?.() || new Date(),
      }))));
  },

  // Bank & KYC
  async linkBank(userId, bankData) {
    const { db, ts } = window.__firebase;
    await db.collection("users").doc(userId).update({ bank: bankData, bankLinkedAt: ts() });
  },
  async updateKYC(userId, kycData) {
    const { db, ts } = window.__firebase;
    await db.collection("users").doc(userId).update({ ...kycData, kycUpdatedAt: ts() });
  },
};

// ─── DB STATUS HOOK ───────────────────────────────────────────────────────────
const useFirebase = () => {
  const [status, setStatus] = useState("loading"); // loading | ready | error | demo
  useEffect(() => {
    if (FIREBASE_CONFIG.projectId === "YOUR_PROJECT_ID") {
      setStatus("demo"); return;
    }
    loadFirebase()
      .then(() => setStatus("ready"))
      .catch(() => setStatus("error"));
  }, []);
  return status;
};



// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  bg:        "#F5F4FF",
  surface:   "#FFFFFF",
  card:      "#FFFFFF",
  accent:    "#6D28D9",
  accent2:   "#0891B2",
  accentDim: "#6D28D915",
  gold:      "#D97706",
  goldDim:   "#D9770615",
  danger:    "#E11D48",
  dangerDim: "#E11D4812",
  text:      "#1A1035",
  muted:     "#6B7280",
  border:    "rgba(109,40,217,0.15)",
  success:   "#059669",
  warning:   "#D97706",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; width: 100%; overflow: hidden; }
    body {
      background: #EDE9FE;
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #1A1035;
      display: flex; align-items: center; justify-content: center;
    }

    ::-webkit-scrollbar { width: 3px; height: 0px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(109,40,217,0.25); border-radius: 2px; }

    /* ── Core animations ── */
    @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideIn  { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }
    @keyframes slideLeft{ from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
    @keyframes scaleIn  { from { opacity:0; transform:scale(0.88); } to { opacity:1; transform:scale(1); } }
    @keyframes spin     { to   { transform:rotate(360deg); } }
    @keyframes pulse    { 0%,100%{opacity:1;} 50%{opacity:0.45;} }

    /* ── Logo animations ── */
    @keyframes wave1 { 0%,100%{d:path("M0 160 Q50 130 100 155 Q150 180 200 150 Q250 120 300 145 Q350 170 400 140 L400 320 L0 320 Z");} 50%{d:path("M0 150 Q50 175 100 145 Q150 115 200 160 Q250 190 300 155 Q350 130 400 155 L400 320 L0 320 Z");} }
    @keyframes wave2 { 0%,100%{transform:translateX(0);} 50%{transform:translateX(-15px);} }
    @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-4px);} }
    @keyframes glowPulse    { 0%,100%{opacity:0.6;transform:scale(1);} 50%{opacity:1;transform:scale(1.1);} }
    @keyframes sheen        { 0%,100%{transform:translateX(-200%);} 50%{transform:translateX(400%);} }
    @keyframes drawShield1  { to { stroke-dashoffset: 0; } }
    @keyframes growDown    { from{height:0;} to{height:100%;} }
    @keyframes dotPop1      { 0%{opacity:0;transform:scale(0);} 70%{opacity:1;transform:scale(1.4);} 100%{opacity:1;transform:scale(1);} }
    @keyframes rupeePopIn   { 0%{opacity:0;transform:scale(0.3);} 60%{opacity:1;transform:scale(1.2);} 100%{opacity:1;transform:scale(1);} }
    /* 3 inner dots orbit ₹ symbol (radius 10), each 120° apart */
    @keyframes innerOrbit1  { from{transform:rotate(0deg) translateX(10px) rotate(0deg);} to{transform:rotate(360deg) translateX(10px) rotate(-360deg);} }
    @keyframes innerOrbit2  { from{transform:rotate(120deg) translateX(10px) rotate(-120deg);} to{transform:rotate(480deg) translateX(10px) rotate(-480deg);} }
    @keyframes innerOrbit3  { from{transform:rotate(240deg) translateX(10px) rotate(-240deg);} to{transform:rotate(600deg) translateX(10px) rotate(-600deg);} }

    /* ── Shimmer sweep on buttons ── */
    @keyframes btnShimmer {
      0%   { background-position: -300px 0; }
      100% { background-position: 300px 0; }
    }

    /* ── Ambient orb float ── */
    @keyframes orbFloat {
      0%,100% { transform: translateY(0px) scale(1); }
      33%      { transform: translateY(-18px) scale(1.04); }
      66%      { transform: translateY(10px) scale(0.97); }
    }
    @keyframes orbFloat2 {
      0%,100% { transform: translateY(0px) scale(1); }
      40%      { transform: translateY(14px) scale(1.06); }
      75%      { transform: translateY(-10px) scale(0.95); }
    }

    /* ── Card entrance ── */
    @keyframes cardSlide {
      from { opacity:0; transform:translateY(14px) scale(0.97); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }

    /* ── Number count roll ── */
    @keyframes countUp {
      from { opacity:0; transform:translateY(10px); }
      to   { opacity:1; transform:translateY(0); }
    }

    /* ── Glow pulse on wallet card ── */
    @keyframes walletGlow {
      0%,100% { box-shadow: 0 4px 24px rgba(109,40,217,0.18), 0 1px 4px rgba(0,0,0,0.06); }
      50%      { box-shadow: 0 8px 40px rgba(109,40,217,0.28), 0 2px 8px rgba(0,0,0,0.08); }
    }

    /* ── Progress bar fill ── */
    @keyframes barFill {
      from { width: 0%; }
    }

    /* ── Check bounce ── */
    @keyframes checkBounce {
      0%   { transform: scale(0); opacity:0; }
      60%  { transform: scale(1.2); opacity:1; }
      100% { transform: scale(1); }
    }

    /* ── Ripple on tap ── */
    @keyframes ripple {
      from { transform:scale(0); opacity:0.4; }
      to   { transform:scale(3); opacity:0; }
    }

    /* ── Stagger helpers ── */
    .s1 { animation-delay: 0.05s; }
    .s2 { animation-delay: 0.10s; }
    .s3 { animation-delay: 0.15s; }
    .s4 { animation-delay: 0.20s; }
    .s5 { animation-delay: 0.25s; }

    .fadeUp   { animation: fadeUp   0.42s cubic-bezier(.22,.68,0,1.2) both; }
    .fadeDown { animation: fadeDown 0.42s cubic-bezier(.22,.68,0,1.2) both; }
    .slideIn  { animation: slideIn  0.38s cubic-bezier(.22,.68,0,1.2) both; }
    .scaleIn  { animation: scaleIn  0.36s cubic-bezier(.22,.68,0,1.2) both; }

    /* ── Button hover lift ── */
    button:not(:disabled):active { transform: scale(0.97); }

    /* ── Input focus ring animation ── */
    .input-wrap { transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s; }
    .input-wrap:focus-within {
      border-color: #6D28D9 !important;
      box-shadow: 0 0 0 3px rgba(109,40,217,0.12) !important;
      transform: translateY(-1px);
    }

    /* ── Card hover ── */
    .card-hover { transition: transform 0.22s ease, box-shadow 0.22s ease; }
    .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(109,40,217,0.14) !important; }

    /* ── Shimmer btn ── */
    .btn-shimmer {
      background-size: 300px 100% !important;
      animation: btnShimmer 2.4s linear infinite;
    }

    input, button { font-family: inherit; }
    input:focus   { outline: none; }
    input::placeholder { color: #9CA3AF; }
  `}</style>
);

// ─── SMALL UTILITIES ──────────────────────────────────────────────────────────
const fmt = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
const uid  = () => Math.random().toString(36).slice(2, 10).toUpperCase();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────
const Chip = ({ label, color = C.accent }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "3px 10px", borderRadius: 20,
    background: color + "20", color, fontSize: 10, fontWeight: 600,
    letterSpacing: "0.06em", textTransform: "uppercase",
    border: `1px solid ${color}40`,
  }}>{label}</span>
);

const Loader = ({ size = 20, color = C.accent }) => (
  <span style={{
    width: size, height: size, borderRadius: "50%",
    border: "2.5px solid rgba(109,40,217,0.15)",
    borderTopColor: color,
    borderRightColor: "#0891B2",
    display: "inline-block",
    animation: "spin 0.8s cubic-bezier(.68,-.55,.27,1.55) infinite",
  }} />
);

const StepDot = ({ active, done, n }) => (
  <div style={{
    width: 22, height: 22, borderRadius: "50%",
    background: done ? "linear-gradient(135deg,#6D28D9,#0891B2)" : active ? "rgba(109,40,217,0.12)" : "rgba(109,40,217,0.05)",
    border: `2px solid ${done || active ? "#6D28D9" : "rgba(109,40,217,0.20)"}`,
    boxShadow: done ? "0 2px 10px rgba(109,40,217,0.30)" : "none",
    transition: "all 0.4s cubic-bezier(.22,.68,0,1.2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, color: done ? "#fff" : active ? "#6D28D9" : "#9CA3AF",
    transition: "all 0.3s",
    flexShrink: 0,
  }}>
    {done ? "✓" : n}
  </div>
);

const Input = ({ label, placeholder, value, onChange, type = "text", prefix, suffix, maxLength, disabled }) => (
  <div style={{ marginBottom: 12 }}>
    {label && <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, fontWeight: 500, letterSpacing: "0.04em" }}>{label}</div>}
    <div className="input-wrap" style={{
      display: "flex", alignItems: "center", gap: 8,
      background: "#F9F8FF", border: "1.5px solid rgba(109,40,217,0.18)",
      borderRadius: 12, padding: "0 14px", height: 42,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.80)",
    }}>
      {prefix && <span style={{ color: C.muted, fontSize: 12 }}>{prefix}</span>}
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} maxLength={maxLength} disabled={disabled}
        style={{
          flex: 1, background: "none", border: "none", color: "#1A1035",
          fontSize: 13, caretColor: "#6D28D9",
        }}
      />
      {suffix && <span style={{ color: C.muted, fontSize: 11 }}>{suffix}</span>}
    </div>
  </div>
);

const Btn = ({ children, onClick, variant = "primary", loading, disabled, small, danger, full }) => {
  const isPrimary = variant === "primary" && !danger;
  const bg = danger
    ? "linear-gradient(135deg, #F43F5E, #E11D48)"
    : isPrimary
      ? "linear-gradient(135deg, #6D28D9 0%, #6D28D9 50%, #0891B2 100%)"
      : "rgba(109,40,217,0.08)";
  const color = danger ? "#fff" : isPrimary ? "#fff" : "#6D28D9";
  const border = variant === "secondary" ? "1.5px solid rgba(109,40,217,0.35)" : "none";
  return (
    <button
      className={isPrimary ? "btn-shimmer" : ""}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        background: bg, color, border, borderRadius: 12,
        padding: small ? "7px 14px" : "11px 20px",
        fontSize: small ? 13 : 15, fontWeight: 700, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        opacity: disabled || loading ? 0.4 : 1,
        transition: "all 0.2s cubic-bezier(.22,.68,0,1.2)",
        width: full ? "100%" : undefined,
        letterSpacing: "0.04em",
        boxShadow: isPrimary ? "0 4px 20px rgba(109,40,217,0.35)" : danger ? "0 4px 14px rgba(225,29,72,0.25)" : "none",
        backgroundSize: isPrimary ? "300px 100%" : "auto",
        backgroundPosition: "0 0",
      }}
    >
      {loading && <Loader size={16} color={color} />}
      {children}
    </button>
  );
};

const Card = ({ children, style = {}, glow }) => (
  <div className="card-hover" style={{
    background: "#FFFFFF",
    border: `1px solid ${glow ? "rgba(109,40,217,0.40)" : "rgba(109,40,217,0.12)"}`,
    borderRadius: 14, padding: "14px",
    boxShadow: glow
      ? "0 4px 24px rgba(109,40,217,0.16), 0 1px 4px rgba(0,0,0,0.04)"
      : "0 2px 12px rgba(109,40,217,0.08), 0 1px 3px rgba(0,0,0,0.04)",
    animation: "cardSlide 0.4s cubic-bezier(.22,.68,0,1.2) both",
    ...style,
  }}>{children}</div>
);

const NavBar = ({ title, onBack, right }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 16px", borderBottom: "1px solid rgba(109,40,217,0.12)",
    background: "rgba(249,248,255,0.97)", position: "sticky", top: 0, zIndex: 10,
    animation: "fadeDown 0.35s ease both",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: "rgba(109,40,217,0.08)", border: "1.5px solid rgba(109,40,217,0.20)",
          color: "#1A1035", borderRadius: 10, width: 36, height: 36,
          cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}>←</button>
      )}
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "-0.01em" }}>{title}</span>
    </div>
    {right}
  </div>
);

// ─── SCREEN: SPLASH ───────────────────────────────────────────────────────────

// ─── PAYMENT & SECURITY LOGOS STRIP ──────────────────────────────────────────
const PaymentLogosStrip = ({ theme = "light", size = "md" }) => {
  const isDark = theme === "dark";

  // Each payment / gateway / security item as a styled pill
  const paymentMethods = [
    {
      id:"visa",
      content: (
        <svg width="42" height="14" viewBox="0 0 42 14">
          <text x="1" y="13" fontFamily="'Arial Black',sans-serif" fontSize="14" fontWeight="900"
            fill={isDark ? "#A5B4FC" : "#1A1F71"} letterSpacing="-0.5">VISA</text>
        </svg>
      ),
    },
    {
      id:"mc",
      content: (
        <svg width="32" height="22" viewBox="0 0 32 22">
          <circle cx="11" cy="11" r="11" fill="#EB001B"/>
          <circle cx="21" cy="11" r="11" fill="#F79E1B" fillOpacity="0.9"/>
          <path d="M16 3.5a11 11 0 0 1 0 15A11 11 0 0 1 16 3.5z" fill="#FF5F00"/>
        </svg>
      ),
    },
    {
      id:"rupay",
      content: (
        <svg width="60" height="32" viewBox="0 0 60 32" xmlns="http://www.w3.org/2000/svg">
          {/* White card background with grey border */}
          <rect width="60" height="32" rx="5" fill="#fff" stroke="#BBBBBB" strokeWidth="1.5"/>
          {/* "Ru" in bold italic indigo */}
          <text x="5" y="22" fontFamily="Arial Black,Impact,sans-serif" fontSize="14" fontWeight="900"
            fill="#27288C" fontStyle="italic" letterSpacing="0">Ru</text>
          {/* "Pay" in bold italic indigo */}
          <text x="25" y="22" fontFamily="Arial Black,Impact,sans-serif" fontSize="14" fontWeight="900"
            fill="#27288C" fontStyle="italic" letterSpacing="0">Pay</text>
          {/* Orange arrow (right-pointing triangle) */}
          <polygon points="45,10 52,18 45,18" fill="#E8520A"/>
          {/* Green arrow (smaller, overlapping) */}
          <polygon points="47,14 54,20 47,20" fill="#2E7D32"/>
          {/* TM superscript */}
          <text x="53" y="9" fontFamily="Arial,sans-serif" fontSize="4" fill="#555">™</text>
        </svg>
      ),
    },
    {
      id:"upi",
      content: (
        <svg width="62" height="34" viewBox="0 0 62 34" xmlns="http://www.w3.org/2000/svg">
          {/* White card background with grey border */}
          <rect width="62" height="34" rx="5" fill="#fff" stroke="#BBBBBB" strokeWidth="1.5"/>
          {/* "UPI" in bold grey */}
          <text x="7" y="20" fontFamily="Arial Black,Impact,sans-serif" fontSize="13" fontWeight="900"
            fill="#666666" letterSpacing="1">UPI</text>
          {/* Orange forward arrow */}
          <polygon points="42,8 50,16 42,16" fill="#E8520A"/>
          {/* Green forward arrow (slightly offset) */}
          <polygon points="44,12 52,20 44,20" fill="#2E7D32"/>
          {/* "UNIFIED PAYMENTS INTERFACE" small text */}
          <text x="7" y="29" fontFamily="Arial,sans-serif" fontSize="4" fontWeight="700"
            fill="#888888" letterSpacing="0.2">UNIFIED PAYMENTS INTERFACE</text>
        </svg>
      ),
    },
    {
      id:"razorpay",
      content: (
        <div style={{ display:"flex", alignItems:"center", gap:3 }}>
          <svg width="14" height="16" viewBox="0 0 14 16">
            <polygon points="7,0 14,13 0,13" fill={isDark?"#818CF8":"#3B5BDB"}/>
            <polygon points="7,4 10,11 4,11" fill={isDark?"rgba(255,255,255,0.30)":"rgba(255,255,255,0.55)"}/>
          </svg>
          <span style={{ fontFamily:"'Arial',sans-serif", fontWeight:900, fontSize:9, color: isDark?"#818CF8":"#3B5BDB" }}>Razorpay</span>
        </div>
      ),
    },
  ];

  const securityBadges = [
    {
      color:"#059669",
      label:"256-Bit SSL",
      svg: (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      )
    },
    {
      color:"#6D28D9",
      label:"PCI DSS",
      svg: (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      color:"#2563EB",
      label:"E2E Encrypted",
      svg: (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
          <line x1="12" y1="16" x2="12" y2="16"/>
          <circle cx="12" cy="16" r="1" fill="#2563EB"/>
        </svg>
      )
    },
  ];

  const sm = size === "sm" || size === "xs" || size === "xxxs";
  const xs = size === "xs" || size === "xxxs";
  const xxxs = size === "xxxs";

  return (
    <div style={{ width:"100%", background:"transparent", borderTop:"none", padding:"4px 8px 4px" }}>

      {/* Security */}
      <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4 }}>
        <div style={{ flex:1, height:1, background:"rgba(0,0,0,0.07)" }} />
        <span style={{ fontSize:6, fontWeight:900, color:"rgba(0,0,0,0.30)", letterSpacing:"0.12em", textTransform:"uppercase" }}>Security</span>
        <div style={{ flex:1, height:1, background:"rgba(0,0,0,0.07)" }} />
      </div>

      {/* Security badges — compact row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, flexWrap:"nowrap" }}>
        {securityBadges.map(({ svg, label, color }) => (
          <div key={label} style={{
            display:"flex", alignItems:"center", gap:3,
            background:`${color}10`,
            borderRadius:20, padding:"2px 7px",
            border:`1.5px solid ${color}45`,
            flexShrink:0,
          }}>
            {svg}
            <span style={{ fontSize:7, fontWeight:900, color }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── TXN PROGRESS BAR (animated multi-step) ──────────────────────────────────
const TxnProgressBar = ({ steps, activeIdx, color1="#6D28D9", color2="#0891B2" }) => {
  return (
    <div style={{ padding:"16px 0", animation:"fadeUp 0.4s ease both" }}>
      {steps.map((step, i) => {
        const isDone = i < activeIdx;
        const isActive = i === activeIdx;
        return (
          <div key={i} style={{ display:"flex", gap:12, paddingBottom:i<steps.length-1?14:0, alignItems:"flex-start" }}>
            {/* Timeline dot + line */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:32, flexShrink:0 }}>
              <div style={{
                width:32, height:32, borderRadius:"50%",
                background:isDone?"linear-gradient(135deg,#059669,#10B981)":isActive?`linear-gradient(135deg,${color1},${color2})`:"rgba(0,0,0,0.06)",
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:isDone?"0 2px 8px rgba(5,150,105,0.30)":isActive?`0 0 0 5px ${color1}15, 0 2px 10px ${color1}30`:"none",
                animation:isActive?"glowPulse 1.6s ease-in-out infinite":"none",
                transition:"all 0.4s",
              }}>
                {isDone
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : isActive
                    ? <div style={{ width:10, height:10, borderRadius:"50%", background:"#fff", animation:"pulse 0.9s ease-in-out infinite" }}/>
                    : <div style={{ width:8, height:8, borderRadius:"50%", background:"rgba(0,0,0,0.20)" }}/>
                }
              </div>
              {i < steps.length-1 && (
                <div style={{ width:2, flex:1, minHeight:14, marginTop:3, background:isDone?"linear-gradient(to bottom,#059669,#10B981)":"rgba(0,0,0,0.08)", borderRadius:2, transition:"background 0.5s" }}/>
              )}
            </div>
            {/* Content */}
            <div style={{ paddingTop:6, paddingBottom:2 }}>
              <div style={{ fontSize:11, fontWeight:900, color:isDone?"#1A1035":isActive?color1:"#9CA3AF", transition:"color 0.3s" }}>{step.label}</div>
              {(isDone||isActive) && step.sub && <div style={{ fontSize:9, color:"#9CA3AF", marginTop:2 }}>{step.sub}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── TXN RESULT SCREEN (success / failure) ────────────────────────────────────
const TxnResult = ({ success, title, subtitle, amount, details, onDone, doneLabel="Go to Dashboard", color1="#059669", color2="#10B981" }) => {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px 16px 24px", textAlign:"center", animation:"fadeUp 0.4s ease both" }}>
      {/* Icon */}
      <div style={{ position:"relative", marginBottom:18 }}>
        <div style={{
          width:72, height:72, borderRadius:"50%",
          background:success?`linear-gradient(135deg,${color1},${color2})`:"linear-gradient(135deg,#E11D48,#F43F5E)",
          display:"flex", alignItems:"center", justifyContent:"center",
          animation:"scaleIn 0.5s cubic-bezier(.34,1.56,.64,1) both",
          boxShadow:success?`0 8px 28px ${color1}50`:"0 8px 28px rgba(225,29,72,0.40)",
        }}>
          {success
            ? <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            : <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          }
        </div>
        {/* Pulse rings */}
        <div style={{ position:"absolute", inset:-8, borderRadius:"50%", border:`2px solid ${success?color1:"#E11D48"}25`, animation:"glowPulse 1.5s ease-in-out infinite", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", inset:-16, borderRadius:"50%", border:`1.5px solid ${success?color1:"#E11D48"}12`, animation:"glowPulse 1.5s 0.3s ease-in-out infinite", pointerEvents:"none" }}/>
      </div>

      {/* Amount */}
      {amount && (
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:28, color:success?"#1A1035":"#E11D48", marginBottom:4, animation:"fadeUp 0.4s 0.1s ease both", opacity:0 }}>
          ₹{Number(amount).toLocaleString("en-IN")}
        </div>
      )}

      {/* Title + subtitle */}
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:15, color:"#1A1035", marginBottom:4, animation:"fadeUp 0.4s 0.15s ease both", opacity:0 }}>{title}</div>
      {subtitle && <div style={{ fontSize:10, color:"#9CA3AF", marginBottom:16, lineHeight:1.6, animation:"fadeUp 0.4s 0.2s ease both", opacity:0 }}>{subtitle}</div>}

      {/* Details card */}
      {details && details.length > 0 && (
        <div style={{ width:"100%", background:"#fff", borderRadius:14, border:"1px solid rgba(0,0,0,0.07)", padding:"10px 14px", marginBottom:18, textAlign:"left", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", animation:"fadeUp 0.4s 0.25s ease both", opacity:0 }}>
          {details.map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid rgba(0,0,0,0.05)", fontSize:10 }}>
              <span style={{ color:"#9CA3AF" }}>{k}</span>
              <span style={{ fontWeight:900, color:"#1A1035" }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      {/* Done button */}
      <button onClick={onDone} style={{ width:"100%", background:success?`linear-gradient(135deg,${color1},${color2})`:"linear-gradient(135deg,#E11D48,#F43F5E)", border:"none", borderRadius:13, padding:"14px", fontSize:11, fontWeight:900, color:"#fff", cursor:"pointer", animation:"fadeUp 0.4s 0.3s ease both", opacity:0 }}>
        {doneLabel}
      </button>
    </div>
  );
};

const SplashScreen = ({ onNext }) => {
  useEffect(() => { const t = setTimeout(onNext, 2800); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      height:"100%", background:"#ffffff",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      gap:8, position:"relative", overflow:"hidden",
    }}>
      {/* Subtle ambient circles */}
      <div style={{ position:"absolute", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,210,180,0.08) 0%, transparent 70%)", top:"-5%", right:"-10%", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)", bottom:"10%", left:"-8%", pointerEvents:"none" }} />

      {/* Main logo — light variant, large */}
      <div style={{ animation:"scaleIn 0.7s cubic-bezier(.22,.68,0,1.2) both", position:"relative", zIndex:1 }}>
        <S3Logo variant="light" size="lg" />
      </div>

      {/* Tagline */}
      <div style={{ animation:"fadeUp 0.5s 0.35s ease both", opacity:0, textAlign:"center", position:"relative", zIndex:1 }}>
        <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:9, fontWeight:900, letterSpacing:"4px", color:"rgba(0,160,140,0.55)", textTransform:"uppercase" }}>
          Credit Card · Wallet
        </div>
      </div>

      {/* Loading bar */}
      <div style={{ animation:"fadeUp 0.5s 0.5s ease both", opacity:0, width:120, height:2, background:"rgba(0,210,180,0.15)", borderRadius:2, overflow:"hidden", position:"relative", zIndex:1, marginTop:8 }}>
        <div style={{ height:"100%", background:"linear-gradient(90deg,#00d2b4,#0066ff)", borderRadius:2, animation:"barFill 2.4s ease both" }} />
      </div>

      {/* ── Copyright notice ── */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0,
        display:"flex", flexDirection:"column", alignItems:"center",
        paddingBottom:16, zIndex:2,
      }}>
        {/* Payment logos strip */}
        <PaymentLogosStrip theme="light" size="xxxs" />

        {/* Copyright */}
        <div style={{
          animation:"scaleIn 0.4s 1.1s ease both", opacity:0,
          textAlign:"center", marginTop:10, padding:"6px 20px",
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:5, marginBottom:3 }}>
            {/* © symbol */}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#9CA3AF" strokeWidth="1.8"/>
              <path d="M14.5 9.5A3.5 3.5 0 1 0 14.5 14.5" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize:8, color:"#9CA3AF", fontWeight:700, letterSpacing:"0.04em" }}>
              © {new Date().getFullYear()} S3Payments. All rights reserved.
            </span>
          </div>
          <div style={{ fontSize:7, color:"#C4C9D4", letterSpacing:"0.03em", lineHeight:1.6 }}>
            Unauthorised use, reproduction or distribution is prohibited.
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN: ONBOARDING ───────────────────────────────────────────────────────
// ─── FILE UPLOAD WIDGET ──────────────────────────────────────────────────────
// ─── MOCK FILE UPLOAD (sandbox-safe) ────────────────────────────────────────
// Generates a realistic mock document image via Canvas API
const makeMockDoc = (type, name) => {
  const canvas = document.createElement("canvas");
  canvas.width = 320; canvas.height = 180;
  const ctx = canvas.getContext("2d");
  const colors = {
    pan:     { bg:"#FEF3C7", header:"#92400E", accent:"#D97706", title:"PAN CARD",     line1:"INCOME TAX DEPT · GOVT. OF INDIA" },
    aadhaar: { bg:"#EDE9FE", header:"#4C1D95", accent:"#6D28D9", title:"AADHAAR",      line1:"भारत सरकार · Government of India" },
    selfie:  { bg:"#E0F2FE", header:"#0C4A6E", accent:"#0891B2", title:"LIVE SELFIE",  line1:"Identity Verification Photo" },
  }[type] || { bg:"#F5F4FF", header:"#1A1035", accent:"#6D28D9", title:"DOCUMENT", line1:"Uploaded Document" };

  // Background
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, 320, 180);

  // Header bar
  ctx.fillStyle = colors.header;
  ctx.fillRect(0, 0, 320, 38);

  // Header text
  ctx.fillStyle = "#fff";
  ctx.font = "bold 13px Arial";
  ctx.fillText(colors.title, 14, 24);

  // Emblem circle (top right)
  ctx.beginPath();
  ctx.arc(295, 19, 14, 0, Math.PI * 2);
  ctx.fillStyle = colors.accent + "60";
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 10px Arial";
  ctx.fillText("✦", 289, 23);

  // Sub header line
  ctx.fillStyle = colors.accent;
  ctx.font = "10px Arial";
  ctx.fillText(colors.line1, 14, 54);

  // Divider
  ctx.strokeStyle = colors.accent + "50";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(14, 60); ctx.lineTo(306, 60); ctx.stroke();

  // Avatar placeholder (selfie)
  if (type === "selfie") {
    ctx.beginPath();
    ctx.arc(60, 120, 38, 0, Math.PI * 2);
    ctx.fillStyle = colors.accent + "30";
    ctx.fill();
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = colors.header;
    ctx.font = "bold 24px Arial";
    const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    ctx.fillText(initials, 46, 128);

    ctx.fillStyle = "#059669";
    ctx.fillRect(110, 70, 180, 22);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 10px Arial";
    ctx.fillText("✓  Liveness Check Passed", 118, 84);

    ctx.fillStyle = colors.header;
    ctx.font = "bold 12px Arial";
    ctx.fillText(name, 110, 115);
    ctx.font = "10px Arial";
    ctx.fillStyle = "#6B7280";
    ctx.fillText("Live photo captured · " + new Date().toLocaleDateString("en-IN"), 110, 132);
  } else {
    // Photo box
    ctx.fillStyle = colors.accent + "20";
    ctx.roundRect(14, 68, 68, 82, 6);
    ctx.fill();
    ctx.strokeStyle = colors.accent + "60";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = colors.accent;
    ctx.font = "28px Arial";
    ctx.fillText(type === "pan" ? "🪪" : "🏛️", 26, 118);

    // Info lines
    const infoLines = type === "pan"
      ? [`Name: ${name.toUpperCase()}`, `DOB: ██/██/████`, `PAN: ${name.split(" ").map(w=>w[0]).join("")}███1234█`]
      : [`Name: ${name}`, `DOB: ██/██/████`, `Aadhaar: XXXX XXXX ████`];

    ctx.fillStyle = colors.header;
    infoLines.forEach((line, i) => {
      ctx.font = i === 2 ? "bold 11px Arial" : "10px Arial";
      ctx.fillStyle = i === 2 ? colors.header : "#374151";
      ctx.fillText(line, 92, 80 + i * 22);
    });
  }

  // Bottom strip
  ctx.fillStyle = colors.accent + "20";
  ctx.fillRect(0, 158, 320, 22);
  ctx.fillStyle = colors.accent;
  ctx.font = "9px Arial";
  ctx.fillText("S3Payments · KYC Document · " + new Date().toLocaleDateString("en-IN"), 14, 172);

  return canvas.toDataURL("image/png");
};

const FileUpload = ({ label, hint, icon, file, onFile, docType = "pan", userName = "User" }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClick = async () => {
    if (file) {
      // Reset / re-upload
      onFile(null);
      return;
    }
    setUploading(true);
    setProgress(0);
    // Simulate upload progress
    for (let p = 0; p <= 100; p += 20) {
      await sleep(120);
      setProgress(p);
    }
    // Generate mock document
    const dataUrl = makeMockDoc(docType, userName);
    const mockFile = { name: `${docType}_${userName.replace(" ","_")}.png`, dataUrl, size: "142 KB" };
    setUploading(false);
    setProgress(0);
    onFile(mockFile);
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <button onClick={handleClick} style={{
        width:"100%",
        background: file ? "rgba(5,150,105,0.06)" : uploading ? "rgba(109,40,217,0.05)" : "#F9F8FF",
        border: `1.5px ${file ? "solid" : "dashed"} ${file ? "rgba(5,150,105,0.50)" : uploading ? "#6D28D9" : "rgba(109,40,217,0.30)"}`,
        borderRadius:10, padding:"10px 12px", cursor: uploading ? "default" : "pointer",
        display:"flex", alignItems:"center", gap:8, transition:"all 0.25s",
        position:"relative", overflow:"hidden",
      }}>
        {/* Progress bar */}
        {uploading && (
          <div style={{
            position:"absolute", left:0, bottom:0, height:3,
            width:`${progress}%`, background:"linear-gradient(90deg,#6D28D9,#0891B2)",
            borderRadius:"0 2px 2px 0", transition:"width 0.12s ease",
          }} />
        )}

        {/* Icon */}
        <div style={{
          width:36, height:36, borderRadius:9, flexShrink:0,
          background: file ? "rgba(5,150,105,0.12)" : uploading ? "rgba(109,40,217,0.10)" : "rgba(109,40,217,0.06)",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:9,
          transition:"background 0.25s",
        }}>
          {uploading ? <Loader size={16} color="#6D28D9" /> : file ? "☑️" : icon}
        </div>

        {/* Text */}
        <div style={{ flex:1, textAlign:"left" }}>
          <div style={{ fontSize:9, fontWeight:900, color: file ? "#059669" : "#1A1035" }}>{label}</div>
          <div style={{ fontSize:9, marginTop:1, color: file ? "#059669" : uploading ? "#6D28D9" : C.muted }}>
            {file
              ? `${file.name} · ${file.size}`
              : uploading
                ? `Uploading... ${progress}%`
                : hint}
          </div>
        </div>

        {/* Action label */}
        <span style={{ fontSize:9, fontWeight:900, color: file ? "#059669" : uploading ? "#6D28D9" : C.muted, flexShrink:0 }}>
          {file ? "✓ Done" : uploading ? "" : "Tap to Upload"}
        </span>
      </button>

      {/* Preview thumbnail */}
      {file?.dataUrl && (
        <div style={{ marginTop:6, borderRadius:8, overflow:"hidden", border:"1px solid rgba(5,150,105,0.25)", animation:"fadeUp 0.3s ease both" }}>
          <div style={{ background:"rgba(5,150,105,0.08)", padding:"4px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontSize:9, fontWeight:900, color:"#059669" }}>📄 Preview</span>
            <button onClick={e => { e.stopPropagation(); onFile(null); }} style={{ background:"rgba(225,29,72,0.10)", border:"none", color:"#E11D48", borderRadius:4, padding:"2px 7px", fontSize:9, fontWeight:900, cursor:"pointer" }}>✕ Remove</button>
          </div>
          <img src={file.dataUrl} alt="doc preview" style={{ width:"100%", display:"block", maxHeight:130, objectFit:"contain", background:"#F9F8FF" }} />
        </div>
      )}
    </div>
  );
};

const OnboardingScreen = ({ onComplete, onBack, prefillMobile = "" }) => {
  const [step, setStep] = useState(0);
  const [mobile, setMobile] = useState(prefillMobile);
  const [mobileError, setMobileError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [referral, setReferral] = useState("");
  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [aadhaarError, setAadhaarError] = useState("");
  const [panFile, setPanFile] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [kycStatus, setKycStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef([]);

  // ── Validators ───────────────────────────────────────────────────────────────
  const handleMobileChange = (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 10);
    setMobile(digits);
    if (digits.length > 0 && digits.length < 10) setMobileError("Mobile number must be exactly 10 digits");
    else setMobileError("");
  };

  const handleAadhaarChange = (v) => {
    // Remove non-digits and spaces, format as XXXX XXXX XXXX
    const digits = v.replace(/\D/g, "").slice(0, 12);
    const formatted = digits.replace(/(\d{4})(\d{0,4})(\d{0,4})/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(" ")
    );
    setAadhaar(formatted);
    const raw = digits;
    if (raw.length > 0 && raw.length < 12) setAadhaarError("Aadhaar must be exactly 12 digits");
    else setAadhaarError("");
  };

  const handlePanChange = (v) => {
    // PAN format: 5 letters + 4 digits + 1 letter (e.g. ABCDE1234F)
    const upper = v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    setPan(upper);
    const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (upper.length > 0 && !PAN_REGEX.test(upper)) {
      if (upper.length < 10) setPanError("PAN must be 10 characters (e.g. ABCDE1234F)");
      else setPanError("Invalid PAN format. Must be ABCDE1234F");
    } else setPanError("");
  };

  const handleOtpChange = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...otp];
    next[i] = v.slice(-1);
    setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
    if (!v && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const sendOtp = async () => { setLoading(true); await sleep(1000); setLoading(false); setStep(1); };
  const verifyOtp = async () => { setLoading(true); await sleep(1000); setLoading(false); setStep(2); };
  const createAccount = async () => { setLoading(true); await sleep(800); setLoading(false); setStep(3); };
  const submitKyc = async () => {
    setLoading(true); setKycStatus("processing");
    await sleep(2000); setKycStatus("approved"); setLoading(false);
  };

  const PAN_VALID = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  const AADHAAR_DIGITS = aadhaar.replace(/\s/g, "");
  const AADHAAR_VALID = AADHAAR_DIGITS.length === 12;
  const kycReady = PAN_VALID && AADHAAR_VALID && panFile && aadhaarFile;

  const steps = ["Mobile", "OTP", "Account", "KYC"];

  // ── Error hint component ──────────────────────────────────────────────────────
  const ErrHint = ({ msg }) => msg ? (
    <div style={{ fontSize:9, color:C.danger, marginTop:4, display:"flex", alignItems:"center", gap:4 }}>
      <span>⚠️</span><span>{msg}</span>
    </div>
  ) : null;

  // ── Valid hint ────────────────────────────────────────────────────────────────
  const OkHint = ({ show, msg }) => show ? (
    <div style={{ fontSize:9, color:C.success, marginTop:4, display:"flex", alignItems:"center", gap:4 }}>
      <span>✅</span><span>{msg}</span>
    </div>
  ) : null;

  return (
    <div style={{ minHeight: "100%", background: "#F9F8FF", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "12px 16px 0", display: "flex", alignItems: "center", gap: 10 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: "rgba(109,40,217,0.08)", border: "1.5px solid rgba(109,40,217,0.20)",
            color: "#1A1035", borderRadius: 10, width: 32, height: 32, flexShrink: 0,
            cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center",
          }}>←</button>
        )}
        <S3Logo variant="light" size="sm" />
      </div>

      {/* Progress */}
      <div style={{ padding:"8px 16px 0", display:"flex", alignItems:"center" }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display:"flex", alignItems:"center", flex: i < steps.length - 1 ? 1 : "none" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
              <StepDot active={step===i} done={step>i} n={i+1} />
              <span style={{ fontSize:9, color:step>=i?C.accent:C.muted, fontWeight:900 }}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex:1, height:2, background:step>i?C.accent:C.border, margin:"0 3px", marginBottom:10, transition:"background 0.4s" }} />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex:1, padding:14, overflowY:"auto", animation:"slideIn 0.35s ease both" }} key={step}>

        {/* ── STEP 0: Mobile ── */}
        {step === 0 && (
          <>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:900, marginBottom:4, color:"#1A1035" }}>Enter Mobile Number</h2>
            <p style={{ color:C.muted, fontSize:9, marginBottom:10 }}>We'll send a 6-digit OTP to verify</p>
            <div style={{ marginBottom:4 }}>
              <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900, letterSpacing:"0.04em" }}>MOBILE NUMBER</div>
              <div className="input-wrap" style={{ display:"flex", alignItems:"center", gap:8, background:"#F9F8FF", border:"1.5px solid rgba(109,40,217,0.18)", borderRadius:10, padding:"0 12px", height:40 }}>
                <span style={{ fontSize:9, color:C.muted, fontWeight:900 }}>+91</span>
                <input
                  type="tel" value={mobile}
                  onChange={e => handleMobileChange(e.target.value)}
                  placeholder="9876543210" maxLength={10}
                  style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:9, outline:"none", caretColor:"#6D28D9" }}
                />
                {mobile.length === 10 && <span style={{ color:C.success, fontSize:9 }}>✓</span>}
              </div>
              <ErrHint msg={mobileError} />
              {mobile.length === 10 && !mobileError && <OkHint show msg="Valid mobile number" />}
            </div>
            <div style={{ fontSize:9, color:C.muted, marginBottom:10, marginTop:8 }}>By continuing, you agree to our Terms & Privacy Policy</div>
            <SwipeBtn disabled={mobile.length !== 10 || loading} onSubmit={sendOtp} label="Swipe to Send OTP" successLabel="✅ OTP Sent!" color1="#6D28D9" color2="#0891B2" />
          </>
        )}

        {/* ── STEP 1: OTP ── */}
        {step === 1 && (
          <>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:900, marginBottom:4, color:"#1A1035" }}>Verify OTP</h2>
            <p style={{ color:C.muted, fontSize:9, marginBottom:2 }}>Sent to +91 {mobile}</p>
            <p style={{ color:C.accent, fontSize:9, marginBottom:12 }}>Demo OTP: 123456</p>
            <div style={{ display:"flex", gap:8, marginBottom:8, justifyContent:"center" }}>
              {otp.map((v, i) => (
                <input key={i} ref={el => otpRefs.current[i] = el}
                  value={v} onChange={e => handleOtpChange(i, e.target.value)}
                  maxLength={1} type="tel"
                  style={{
                    width:40, height:46, textAlign:"center",
                    background:"#F9F8FF", border:`2px solid ${v?"#6D28D9":"rgba(109,40,217,0.20)"}`,
                    borderRadius:10, color:"#1A1035", fontSize:9, fontWeight:900,
                    fontFamily:"'Space Grotesk',sans-serif", outline:"none",
                    boxShadow: v ? "0 0 0 3px rgba(109,40,217,0.10)" : "none",
                    transition:"all 0.2s",
                  }}
                />
              ))}
            </div>
            <SwipeBtn disabled={otp.join("").length < 6 || loading} onSubmit={verifyOtp} label="Swipe to Verify OTP" successLabel="✅ OTP Verified!" color1="#059669" color2="#0891B2" />
            <div style={{ textAlign:"center", marginTop:12, fontSize:9, color:C.muted }}>
              Didn't receive? <span style={{ color:C.accent, cursor:"pointer" }}>Resend OTP</span>
            </div>
          </>
        )}

        {/* ── STEP 2: Account ── */}
        {step === 2 && (
          <>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:900, marginBottom:4, color:"#1A1035" }}>Create Account</h2>
            <p style={{ color:C.muted, fontSize:9, marginBottom:10 }}>Just a few more details</p>
            <Input label="FULL NAME" placeholder="Rajesh Kumar" value={name} onChange={setName} />
            <Input label="EMAIL (OPTIONAL)" placeholder="rajesh@gmail.com" value={email} onChange={setEmail} type="email" />
            <Input label="REFERRAL CODE (OPTIONAL)" placeholder="Enter code" value={referral} onChange={v => setReferral(v.toUpperCase())} />
            <SwipeBtn disabled={!name || loading} onSubmit={createAccount} label="Swipe to Create Account" successLabel="✅ Account Created!" color1="#6D28D9" color2="#0891B2" />
          </>
        )}

        {/* ── STEP 3: KYC ── */}
        {step === 3 && (
          <>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:900, marginBottom:4, color:"#1A1035" }}>KYC Verification</h2>
            <p style={{ color:C.muted, fontSize:9, marginBottom:10 }}>Complete KYC to unlock all features</p>

            {kycStatus === "approved" ? (
              <div style={{ textAlign:"center", padding:"32px 0", animation:"fadeUp 0.4s ease" }}>
                <div style={{ fontSize:9, marginBottom:8 }}>✅</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:900, color:C.accent }}>KYC Approved!</div>
                <div style={{ color:C.muted, fontSize:9, marginTop:6, marginBottom:24 }}>Your account is fully verified</div>
                <SwipeBtn onSubmit={() => onComplete({ mobile, name, email, referral, pan, aadhaar, panFile, aadhaarFile, selfieFile })} label="Swipe to Enter Dashboard" successLabel="🎉 Welcome!" color1="#059669" color2="#0891B2" />
              </div>
            ) : (
              <>
                {/* PAN Card */}
                <Card style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <span style={{ fontSize:9 }}>🪪</span>
                    <div>
                      <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>PAN Card</div>
                      <div style={{ fontSize:9, color:C.muted }}>Format: ABCDE1234F (5 letters + 4 digits + 1 letter)</div>
                    </div>
                  </div>
                  <div style={{ position:"relative" }}>
                    <input
                      value={pan}
                      onChange={e => handlePanChange(e.target.value)}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      style={{
                        width:"100%", background:"#F9F8FF",
                        border:`1.5px solid ${panError?"rgba(225,29,72,0.50)":PAN_VALID?"rgba(5,150,105,0.50)":"rgba(109,40,217,0.18)"}`,
                        borderRadius:8, padding:"8px 36px 8px 10px", color:"#1A1035", fontSize:9,
                        outline:"none", fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, letterSpacing:"0.08em",
                        transition:"border-color 0.2s",
                      }}
                    />
                    {pan.length > 0 && (
                      <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", fontSize:9 }}>
                        {PAN_VALID ? "☑️" : "✖️"}
                      </span>
                    )}
                  </div>
                  <ErrHint msg={panError} />
                  <OkHint show={PAN_VALID} msg="Valid PAN format" />
                  <div style={{ marginTop:8 }}>
                    <FileUpload label="Upload PAN Card Photo" hint="Tap to generate mock PAN document" icon="🪪" file={panFile} onFile={setPanFile} docType="pan" userName={name || "User"} />
                  </div>
                </Card>

                {/* Aadhaar Card */}
                <Card style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <span style={{ fontSize:9 }}>🏛️</span>
                    <div>
                      <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>Aadhaar Number</div>
                      <div style={{ fontSize:9, color:C.muted }}>12 digits only — no letters allowed</div>
                    </div>
                  </div>
                  <div style={{ position:"relative" }}>
                    <input
                      value={aadhaar}
                      onChange={e => handleAadhaarChange(e.target.value)}
                      placeholder="XXXX XXXX XXXX"
                      maxLength={14}
                      style={{
                        width:"100%", background:"#F9F8FF",
                        border:`1.5px solid ${aadhaarError?"rgba(225,29,72,0.50)":AADHAAR_VALID?"rgba(5,150,105,0.50)":"rgba(109,40,217,0.18)"}`,
                        borderRadius:8, padding:"8px 36px 8px 10px", color:"#1A1035", fontSize:9,
                        outline:"none", fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, letterSpacing:"0.12em",
                        transition:"border-color 0.2s",
                      }}
                    />
                    {aadhaar.length > 0 && (
                      <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", fontSize:9 }}>
                        {AADHAAR_VALID ? "☑️" : "✖️"}
                      </span>
                    )}
                  </div>
                  <ErrHint msg={aadhaarError} />
                  <OkHint show={AADHAAR_VALID} msg="Valid 12-digit Aadhaar" />
                  <div style={{ marginTop:8 }}>
                    <FileUpload label="Upload Aadhaar Card Photo" hint="Tap to generate mock Aadhaar document" icon="🏛️" file={aadhaarFile} onFile={setAadhaarFile} docType="aadhaar" userName={name || "User"} />
                  </div>
                </Card>

                {/* Selfie */}
                <Card style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <span style={{ fontSize:9 }}>🤳</span>
                    <div>
                      <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>Selfie Verification</div>
                      <div style={{ fontSize:9, color:C.muted }}>Live photo for face match</div>
                    </div>
                  </div>
                  <FileUpload label="Upload Selfie / Live Photo" hint="Tap to generate live selfie" icon="🤳" file={selfieFile} onFile={setSelfieFile} docType="selfie" userName={name || "User"} />
                </Card>

                {/* Checklist */}
                <div style={{ marginBottom:8, padding:"10px 12px", background:"rgba(109,40,217,0.05)", borderRadius:10, border:"1px solid rgba(109,40,217,0.12)" }}>
                  {[
                    [PAN_VALID, "Valid PAN number"],
                    [!!panFile, "PAN card photo uploaded"],
                    [AADHAAR_VALID, "Valid 12-digit Aadhaar"],
                    [!!aadhaarFile, "Aadhaar photo uploaded"],
                    [!!selfieFile, "Selfie uploaded (optional)"],
                  ].map(([done, label]) => (
                    <div key={label} style={{ display:"flex", alignItems:"center", gap:8, fontSize:9, marginBottom:4 }}>
                      <span style={{ fontSize:9, color: done ? C.success : C.muted }}>{done ? "☑️" : "○"}</span>
                      <span style={{ color: done ? "#1A1035" : C.muted }}>{label}</span>
                    </div>
                  ))}
                </div>

                {kycStatus === "processing" ? (
                  <div style={{ textAlign:"center", padding:16 }}>
                    <Loader size={28} />
                    <div style={{ color:C.muted, fontSize:9, marginTop:10 }}>Verifying your documents...</div>
                  </div>
                ) : (
                  <SwipeBtn disabled={!kycReady} onSubmit={submitKyc} label="Swipe to Submit KYC" successLabel="✅ KYC Submitted!" />
                )}
                {!kycReady && (
                  <div style={{ textAlign:"center", fontSize:9, color:C.muted, marginTop:8 }}>
                    PAN + Aadhaar number & photos required to submit
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ─── SWIPE-TO-SUBMIT BUTTON ─────────────────────────────────────────────────
const SwipeBtn = ({ onSubmit, disabled, label = "Swipe to Submit", color1 = "#6D28D9", color2 = "#0891B2", successLabel = "Done ✓" }) => {
  const trackRef  = useRef(null);
  const [dragging, setDragging]   = useState(false);
  const [dragX, setDragX]         = useState(0);
  const [completed, setCompleted] = useState(false);
  const startXRef = useRef(0);
  const maxRef    = useRef(0);

  const THUMB = 44;
  const THRESHOLD = 0.82;

  const getMax = () => trackRef.current ? trackRef.current.offsetWidth - THUMB - 6 : 0;

  const onStart = (clientX) => {
    if (disabled || completed) return;
    maxRef.current = getMax();
    startXRef.current = clientX - dragX;
    setDragging(true);
  };
  const onMove = (clientX) => {
    if (!dragging) return;
    setDragX(Math.max(0, Math.min(clientX - startXRef.current, maxRef.current)));
  };
  const onEnd = () => {
    if (!dragging) return;
    setDragging(false);
    if (maxRef.current > 0 && dragX / maxRef.current >= THRESHOLD) {
      setDragX(maxRef.current);
      setCompleted(true);
      setTimeout(() => { onSubmit(); setTimeout(() => { setCompleted(false); setDragX(0); }, 1500); }, 280);
    } else {
      setDragX(0);
    }
  };

  useEffect(() => { if (disabled) { setCompleted(false); setDragX(0); } }, [disabled]);
  useEffect(() => {
    if (!dragging) return;
    const mm = (e) => onMove(e.clientX);
    const mu = () => onEnd();
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    return () => { window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu); };
  }, [dragging, dragX]);

  const pct = maxRef.current > 0 ? dragX / maxRef.current : 0;
  const trackW = trackRef.current?.offsetWidth || 300;
  const fillPct = Math.min(100, ((dragX + THUMB) / trackW) * 100);

  return (
    <div ref={trackRef} style={{
      position: "relative", height: 52, borderRadius: 26,
      background: disabled ? "rgba(0,0,0,0.05)" : "#fff",
      border: `1.5px solid ${disabled ? "rgba(0,0,0,0.10)" : completed ? "transparent" : `${color1}30`}`,
      overflow: "hidden", userSelect: "none",
      boxShadow: "none",
      transition: "box-shadow 0.4s, border-color 0.4s",
      cursor: disabled ? "not-allowed" : "default",
    }}>

      {/* Liquid fill */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: `${fillPct}%`,
        background: completed
          ? `linear-gradient(90deg,#059669,#10B981)`
          : `linear-gradient(90deg,${color1},${color2})`,
        borderRadius: 26,
        transition: dragging ? "none" : "width 0.4s cubic-bezier(.22,.68,0,1.2)",
        opacity: completed ? 1 : pct * 0.95,
        pointerEvents: "none",
      }}/>

      {/* Shimmer on fill */}
      {!disabled && !completed && pct > 0 && (
        <div style={{
          position:"absolute", top:0, left:0, bottom:0,
          width:`${fillPct}%`,
          background:"linear-gradient(90deg,transparent 40%,rgba(255,255,255,0.25) 60%,transparent 80%)",
          borderRadius:26, pointerEvents:"none",
          animation:"sheen 1.2s ease-in-out infinite",
        }}/>
      )}

      {/* Label */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 800, letterSpacing: "0.05em",
        paddingLeft: THUMB + 10,
        color: disabled ? "rgba(0,0,0,0.25)"
          : completed ? "#fff"
          : pct > 0.5 ? "#fff"
          : `${color1}cc`,
        pointerEvents: "none",
        transition: "color 0.3s",
        opacity: completed ? 0 : 1,
      }}>
        {disabled ? (
          <span style={{ display:"flex", alignItems:"center", gap:5 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="4" y="11" width="16" height="11" rx="2" stroke="rgba(0,0,0,0.25)" strokeWidth="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round"/></svg>
            Fill all fields to continue
          </span>
        ) : (
          <span style={{ display:"flex", alignItems:"center", gap:6 }}>
            {label}
            {/* Animated dots when not dragging */}
            {pct < 0.1 && [0,1,2].map(i=>(
              <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="none"
                style={{ opacity: 0.6 - i*0.15, animation:`pulse 1.1s ${i*0.18}s ease-in-out infinite` }}>
                <path d="M5 12h14M13 7l6 5-6 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ))}
          </span>
        )}
      </div>

      {/* Success label */}
      {completed && (
        <div style={{
          position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:12, fontWeight:800, color:"#fff", letterSpacing:"0.05em",
          animation:"scaleIn 0.3s cubic-bezier(.34,1.56,.64,1) both", pointerEvents:"none",
        }}>
          <span style={{ display:"flex", alignItems:"center", gap:6 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.25)"/><path d="M7.5 12.5l3 3 6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {successLabel}
          </span>
        </div>
      )}

      {/* Thumb */}
      {!completed && (
        <div
          onMouseDown={e => { e.preventDefault(); onStart(e.clientX); }}
          onTouchStart={e => onStart(e.touches[0].clientX)}
          onTouchMove={e => { e.preventDefault(); onMove(e.touches[0].clientX); }}
          onTouchEnd={onEnd}
          style={{
            position: "absolute",
            left: dragX + 3,
            top: "50%", transform: "translateY(-50%)",
            width: THUMB, height: THUMB,
            borderRadius: 14,
            background: disabled
              ? "rgba(0,0,0,0.08)"
              : `linear-gradient(135deg,${color1},${color2})`,
            boxShadow: "none",
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor: disabled ? "not-allowed" : dragging ? "grabbing" : "grab",
            transition: dragging ? "box-shadow 0.1s" : "left 0.38s cubic-bezier(.22,.68,0,1.2), box-shadow 0.2s",
            zIndex: 2,
          }}>
          {disabled ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="11" width="16" height="11" rx="2" stroke="rgba(0,0,0,0.25)" strokeWidth="2"/>
              <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              style={{ transform: dragging ? "translateX(2px) scale(1.05)" : "none", transition:"transform 0.15s", pointerEvents:"none" }}>
              {/* Double chevron */}
              <path d="M7 8l5 4-5 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
              <path d="M12 8l5 4-5 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

// ─── SCREEN: DASHBOARD ────────────────────────────────────────────────────────
const DashboardScreen = ({ wallet, transactions, onAddMoney, onTransfer, onTransactions, onLinkBank, bankLinked, onBack, user, onBills, onAeps, onOffers, onDoorstep, onHelp }) => {
  const [showBalance, setShowBalance] = useState(true);

  const quickActions = [
    { icon: "＋", label: "Add Money", color: C.accent, action: onAddMoney },
    { icon: "⚡", label: "Transfer", color: C.gold, action: onTransfer },
    { icon: "🗃️", label: "History", color: "#7C8CF8", action: onTransactions },
    { icon: "⛓️", label: bankLinked ? "Bank ✓" : "Link Bank", color: bankLinked ? C.success : C.muted, action: onLinkBank },
  ];

  const recentTxns = transactions.slice(0, 3);

  return (
    <div style={{ minHeight: "100%", background: "#F9F8FF", paddingBottom: 10 }}>
      {/* Header */}
      <div style={{
        padding: "12px 16px 0",
        background: "linear-gradient(180deg, #F9F8FF 0%, rgba(249,248,255,0) 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {onBack && (
              <button onClick={onBack} style={{
                background: "rgba(109,40,217,0.08)", border: "1.5px solid rgba(109,40,217,0.20)",
                color: "#1A1035", borderRadius: 10, width: 36, height: 36, flexShrink: 0,
                cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>←</button>
            )}
            <div>
              <div style={{ color: C.muted, fontSize: 11 }}>Good morning 👋</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>{user?.name || "Agent"}</div>
            </div>
          </div>
        </div>

        {/* Wallet Card */}
        <div style={{
          borderRadius: 14, padding: "11px",
          background: "linear-gradient(135deg, #4F46E5 0%, #6D28D9 45%, #0891B2 100%)",
          boxShadow: "0 12px 40px rgba(109,40,217,0.40), 0 2px 8px rgba(0,0,0,0.12)",
          marginBottom: 12, position: "relative", overflow: "hidden",
          animation: "walletGlow 4s ease-in-out infinite",
        }}>
          {/* Decorative orbs */}
          {[[-40, -40, 130], [180, -30, 100], [220, 70, 70]].map(([x, y, s], i) => (
            <div key={i} style={{
              position: "absolute", left: x, top: y,
              width: s, height: s, borderRadius: "50%",
              background: "rgba(255,255,255,0.10)", pointerEvents: "none",
            }} />
          ))}
          {/* Shine strip */}
          <div style={{
            position: "absolute", top: 0, left: "-60%", width: "50%", height: "100%",
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.10) 50%, transparent 60%)",
            transform: "skewX(-15deg)", pointerEvents: "none",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.80)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                💳 Wallet Balance
              </div>
              <button onClick={() => setShowBalance(!showBalance)} style={{
                background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff", cursor: "pointer", fontSize: 11, borderRadius: 8,
                width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
              }}>{showBalance ? "👁️" : "🙈"}</button>
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, color: "#FFFFFF", marginBottom: 6, letterSpacing: "-0.02em", animation: "countUp 0.3s ease", textShadow: "0 2px 12px rgba(0,0,0,0.20)" }}>
              {showBalance ? fmt(wallet.balance) : "₹ ••••••"}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginBottom: 16 }}>
              Wallet ID: <span style={{ color: "rgba(255,255,255,0.90)", fontWeight: 600 }}>{wallet.id}</span>
            </div>
            <div style={{ display: "flex", gap: 0 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", marginBottom: 4 }}>Today's Load</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>
                  {fmt(transactions.filter(t => t.type === "credit" && new Date(t.date).toDateString() === new Date().toDateString()).reduce((a, t) => a + t.amount, 0))}
                </div>
              </div>
              <div style={{ width: 1, background: "rgba(255,255,255,0.20)", margin: "0 16px" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", marginBottom: 4 }}>Daily Limit</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#FDE68A" }}>₹2,00,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 14px" }}>
        {/* Service Grid — PhonePe style large cards */}
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:8 }}>Services</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:6, marginBottom:8 }}>
          {[
            {
              label:"Add Money", color:"#6D28D9", bg:"#EDE9FE", action:onAddMoney,
              svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#6D28D9" fillOpacity="0.15"/><path d="M12 7v10M7 12h10" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round"/></svg>
            },
            {
              label:"Transfer", color:"#D97706", bg:"#FEF3C7", action:onTransfer,
              svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#D97706" fillOpacity="0.15"/><path d="M5 12h14M15 8l4 4-4 4" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            },
            {
              label:"Bills", color:"#0891B2", bg:"#E0F2FE", action:onBills,
              svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="3" fill="#0891B2" fillOpacity="0.15" stroke="#0891B2" strokeWidth="1.8"/><path d="M8 8h8M8 12h8M8 16h5" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/></svg>
            },
            {
              label:"AEPS", color:"#059669", bg:"#D1FAE5", action:onAeps,
              svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#059669" fillOpacity="0.15"/><path d="M9 9a3 3 0 1 1 6 0c0 2-3 3-3 5" stroke="#059669" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="18" r="1" fill="#059669"/></svg>
            },
            {
              label:"History", color:"#7C3AED", bg:"#EDE9FE", action:onTransactions,
              svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#7C3AED" fillOpacity="0.15"/><path d="M12 7v5l3.5 2" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.5 8A8 8 0 0 1 8 5.5M4 12H7" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/></svg>
            },
            {
              label:"Offers", color:"#E11D48", bg:"#FFE4E6", action:onOffers,
              svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#E11D48" fillOpacity="0.12"/><path d="M12 6l1.8 3.6L18 10.4l-3 2.9.7 4.1L12 15.4l-3.7 2 .7-4.1L6 10.4l4.2-.8z" fill="#E11D48" fillOpacity="0.3" stroke="#E11D48" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            },
            {
              label:"Doorstep", color:"#0D9488", bg:"#CCFBF1", action:onDoorstep,
              svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 11.5L12 4l9 7.5V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11.5z" fill="#0D9488" fillOpacity="0.15" stroke="#0D9488" strokeWidth="1.8" strokeLinejoin="round"/><rect x="9" y="14" width="6" height="8" rx="1.5" fill="#0D9488" fillOpacity="0.4"/><circle cx="12" cy="11" r="2" fill="#0D9488" fillOpacity="0.5"/></svg>
            },
            {
              label:bankLinked?"Bank ✓":"Link Bank", color:bankLinked?"#059669":"#94A3B8", bg:bankLinked?"#D1FAE5":"#F1F5F9", action:onLinkBank,
              svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M3 10h18M5 10V21M19 10V21M12 10V21" stroke={bankLinked?"#059669":"#94A3B8"} strokeWidth="1.8" strokeLinecap="round"/><path d="M3 10L12 3l9 7H3z" fill={bankLinked?"#059669":"#94A3B8"} fillOpacity="0.2" stroke={bankLinked?"#059669":"#94A3B8"} strokeWidth="1.8" strokeLinejoin="round"/></svg>
            },
            {
              label:"Help", color:"#0891B2", bg:"#CFFAFE", action:onHelp,
              svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#0891B2" fillOpacity="0.12"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2.5-2.5 2.5-2.5 4" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17" r="1.2" fill="#0891B2"/></svg>
            },
          ].map(({ svg, label, color, bg, action }) => (
            <button key={label} onClick={action} style={{
              background:"#fff",
              border:"none",
              borderRadius:12,
              padding:"7px 3px 5px",
              display:"flex", flexDirection:"column", alignItems:"center", gap:3,
              cursor:"pointer",
              boxShadow:"0 2px 10px rgba(0,0,0,0.06)",
              transition:"transform 0.13s, box-shadow 0.13s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow=`0 6px 18px ${color}25`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.07)";}}
            >
              <div style={{
                width:34, height:34, borderRadius:10,
                background:bg,
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:`0 2px 8px ${color}18`,
              }}>
                {svg}
              </div>
              <span style={{ fontSize:8, color:"#374151", fontWeight:900, textAlign:"center", lineHeight:1.3 }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Limit Progress */}
        <Card style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600 }}>Daily Limit Usage</span>
            <span style={{ fontSize: 11, color: C.muted }}>{fmt(wallet.dailyUsed)} / {fmt(200000)}</span>
          </div>
          <div style={{ height: 8, background: "rgba(249,248,255,0.98)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 4,
              width: `${Math.min((wallet.dailyUsed / 200000) * 100, 100)}%`,
              background: "linear-gradient(90deg, #6D28D9, #0891B2)",
              transition: "width 0.5s ease",
            }} />
          </div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 6 }}>
            {fmt(200000 - wallet.dailyUsed)} remaining today
          </div>
        </Card>

        {/* Recent Transactions */}
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13 }}>Recent Activity</span>
          <span onClick={onTransactions} style={{ fontSize: 11, color: C.accent, cursor: "pointer" }}>See all →</span>
        </div>

        {recentTxns.length === 0 ? (
          <Card style={{ textAlign: "center", padding: 32 }}>
            <div style={{ fontSize: 16, marginBottom: 12 }}>📭</div>
            <div style={{ color: C.muted, fontSize: 12 }}>No transactions yet</div>
          </Card>
        ) : (
          recentTxns.map((t) => <TxnRow key={t.id} txn={t} expanded={false} onToggle={() => {}} />)
        )}
      </div>
    </div>
  );
};

// ─── TXN ROW ──────────────────────────────────────────────────────────────────
const TxnRow = ({ txn, expanded, onToggle }) => {
  const icons  = { credit:"↑", debit:"↓", transfer:"🏛️", fee:"⚡" };
  const colors = { credit: C.accent, debit: C.danger, transfer:"#D97706", fee: C.muted };
  const color  = colors[txn.type] || C.muted;
  const dateStr = txn.date ? new Date(txn.date).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }) : "—";

  return (
    <div style={{ marginBottom: 6 }}>
      {/* Row header — always visible, tap to expand */}
      <button onClick={onToggle} style={{
        width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", textAlign:"left",
      }}>
        <Card style={{ padding:"10px 12px", border: expanded ? "1.5px solid rgba(109,40,217,0.35)" : undefined, borderRadius: expanded ? "14px 14px 0 0" : 14, marginBottom: 0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:`linear-gradient(135deg,${color}22,${color}11)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>
              {icons[txn.type]||"🏧"}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{txn.description}</div>
              <div style={{ fontSize:9, color:C.muted, marginTop:1 }}>{dateStr}</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color }}>
                {txn.type==="credit"?"+":"−"}{fmt(txn.amount)}
              </div>
              <Chip label={txn.status||"success"} color={txn.status==="success"||!txn.status?C.accent:txn.status==="pending"?C.gold:C.danger} />
            </div>
            <span style={{ fontSize:9, color:C.muted, marginLeft:4, transition:"transform 0.2s", display:"inline-block", transform: expanded?"rotate(180deg)":"rotate(0deg)" }}>▼</span>
          </div>
        </Card>
      </button>

      {/* Expanded detail panel */}
      {expanded && (
        <div style={{
          background:"#fff", border:"1.5px solid rgba(109,40,217,0.25)", borderTop:"none",
          borderRadius:"0 0 14px 14px", padding:"10px 14px",
          animation:"fadeUp 0.25s ease both",
        }}>
          {/* TXN meta */}
          <div style={{ marginBottom:8 }}>
            <div style={{ fontSize:9, color:C.muted, fontWeight:900, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:5 }}>Transaction Info</div>
            {[
              ["TXN ID", txn.id || "—"],
              ["Date & Time", dateStr],
              ["Type", (txn.type||"").charAt(0).toUpperCase()+(txn.type||"").slice(1)],
              ["Amount", fmt(txn.amount)],
              txn.fee != null ? ["Platform Fee", `₹${txn.fee}`] : null,
              txn.walletAfter != null ? ["Wallet After", fmt(txn.walletAfter)] : null,
            ].filter(Boolean).map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"4px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ color:C.muted }}>{k}</span>
                <span style={{ fontWeight:900, color:"#1A1035" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Credit Card details */}
          {txn.card && (
            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:9, color:"#6D28D9", fontWeight:900, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:5 }}>💳 Card Details</div>
              <div style={{ background:"linear-gradient(135deg,#4F46E5,#6D28D9,#0891B2)", borderRadius:10, padding:"10px 12px", marginBottom:6 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:900, color:"#fff", letterSpacing:"0.12em", marginBottom:4 }}>{txn.card.number}</div>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontSize:9, color:"rgba(255,255,255,0.80)" }}>{txn.card.holder}</span>
                  <span style={{ fontSize:9, color:"rgba(255,255,255,0.80)", fontWeight:900 }}>{txn.card.network}</span>
                </div>
              </div>
              {[["Bank",txn.card.bank],["Network",txn.card.network],["Card Type",txn.card.type]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"4px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:900, color:"#1A1035" }}>{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* UPI details */}
          {txn.upi && (
            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:9, color:"#0891B2", fontWeight:900, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:5 }}>📲 UPI Details</div>
              {[["UPI VPA",txn.upi.vpa],["App",txn.upi.app],["Reference",txn.upi.ref]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"4px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:900, color:"#1A1035" }}>{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Bank transfer details */}
          {txn.bank && (
            <div style={{ marginBottom:4 }}>
              <div style={{ fontSize:9, color:"#059669", fontWeight:900, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:5 }}>🏦 Transfer Details</div>
              <div style={{ background:"linear-gradient(135deg,#EDE9FE,#E0F2FE)", borderRadius:9, padding:"9px 12px", marginBottom:6 }}>
                <div style={{ fontSize:9, color:C.muted, marginBottom:2 }}>SENT TO</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:900, color:"#1A1035", letterSpacing:"0.08em" }}>{txn.bank.accNo}</div>
                <div style={{ fontSize:9, color:"#1A1035", fontWeight:900, marginTop:2 }}>{txn.bank.holder}</div>
              </div>
              {[["Bank",txn.bank.bankName],["IFSC",txn.bank.ifsc],["Mode",txn.bank.mode],["UTR No.",txn.bank.utr]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"4px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:900, color:"#1A1035" }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── SCREEN: ADD MONEY ────────────────────────────────────────────────────────
const AddMoneyScreen = ({ onBack, onSuccess, wallet }) => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("credit");
  const [cardNo, setCardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [step, setStep] = useState(0); // 0=amount, 1=card, 2=processing, 3=done
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(null); // null | { code, type, discount, label }
  const [promoError, setPromoError] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  // ── Promo code catalogue (matches offers) ──────────────────────────────────
  const PROMO_CODES = {
    "ZEROFEE":  { type:"fee",      discount: 1.0,    label:"100% fee waiver",  desc:"Zero platform fee applied!" },
    "FIRST50":  { type:"cashback", discount: 50,     label:"₹50 cashback",     desc:"₹50 cashback will be credited after load" },
    "UPIBONUS": { type:"bonus",    discount: 0.01,   label:"1% UPI bonus",     desc:"1% bonus on next transfer", requiresUpi: true },
    ...(window.__publishedOffers||[]).reduce((acc,o) => {
      if (o.code) acc[o.code.toUpperCase()] = { type:o.type||"fee", discount:0, label:o.discount||"Offer Applied", desc:o.desc||"Offer applied successfully!" };
      return acc;
    }, {}),
  };

  const applyPromo = async () => {
    setPromoError(""); setPromoLoading(true); await sleep(700);
    const code = promoCode.trim().toUpperCase();
    const promo = PROMO_CODES[code];
    if (!promo) {
      setPromoError("Invalid promo code. Please check and try again.");
      setPromoApplied(null);
    } else if (promo.requiresUpi && method !== "upi") {
      setPromoError("This code is valid for UPI payments only.");
      setPromoApplied(null);
    } else {
      setPromoApplied({ code, ...promo });
    }
    setPromoLoading(false);
  };

  const removePromo = () => { setPromoApplied(null); setPromoCode(""); setPromoError(""); };

  const cfg = getFeeConfig();
  const FEE_RATE = method === "credit" ? cfg.credit/100 : method === "debit" ? cfg.debit/100 : 0;
  const baseFee = amount ? Math.round(Number(amount) * FEE_RATE) : 0;
  const feeDiscount = promoApplied?.type === "fee" ? Math.round(baseFee * promoApplied.discount) : 0;
  const fee = Math.max(0, baseFee - feeDiscount);
  const cashback = promoApplied?.type === "cashback" ? promoApplied.discount : 0;
  const credited = amount ? Number(amount) - fee + cashback : 0;

  const presets = [500, 1000, 2000, 5000, 10000];
  const { dailyLimit: _dl, txnLimit: _tl } = (() => {
    const al = window.__agentLimits || {};
    const l = al[wallet?.agentId] || {};
    return { dailyLimit: l.dailyLimit || 200000, txnLimit: l.txnLimit || 100000 };
  })();
  const remaining = _dl - (wallet?.dailyUsed || 0);
  const methods = [
    { id: "credit", icon: "🪙", label: "Credit Card", fee: () => `${getFeeConfig().credit}%` },
    { id: "debit",  icon: "🏧", label: "Debit Card",  fee: () => `${getFeeConfig().debit}%` },
    { id: "upi",    icon: "📳", label: "UPI",          fee: () => "0%" },
  ];

  const getLimit = () => {
    const agentLimits = window.__agentLimits || {};
    const limits = agentLimits[wallet?.agentId] || {};
    return {
      dailyLimit: limits.dailyLimit || 200000,
      txnLimit: limits.txnLimit || 100000,
    };
  };

  const pay = async () => {
    const amt = Number(amount);
    const { dailyLimit, txnLimit } = getLimit();
    const remainingDaily = dailyLimit - (wallet?.dailyUsed || 0);
    if (amt > txnLimit) {
      alert(`Transaction limit exceeded. Max per transaction: ₹${txnLimit.toLocaleString("en-IN")}`);
      return;
    }
    if (amt > remainingDaily) {
      alert(`Daily limit exceeded. You can add up to ₹${remainingDaily.toLocaleString("en-IN")} more today.`);
      return;
    }
    setStep(2); setLoading(true);
    await sleep(2500); setLoading(false); setStep(3);
  };

  const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  return (
    <div style={{ background: "#F9F8FF" }}>
      <NavBar title="Add Money" onBack={onBack} />

      {step === 3 ? (
        <TxnResult
          success={true}
          title="Money Added!"
          amount={credited}
          subtitle={`Credited to your wallet · Fee ₹${fee} deducted`}
          details={[
            ["Amount Paid", fmt(Number(amount))],
            ["Platform Fee", `− ${fmt(baseFee)}`],
            ...(feeDiscount > 0 ? [["Promo Saving", `+ ${fmt(feeDiscount)}`]] : []),
            ...(cashback > 0 ? [["Cashback", `+ ${fmt(cashback)}`]] : []),
            ["Amount Credited", fmt(credited)],
            ["Method", methods.find(m => m.id === method)?.label],
            ...(promoApplied ? [["Promo Code", promoApplied.code]] : []),
          ]}
          onDone={() => onSuccess(credited, fee, method)}
          doneLabel="← Back to Dashboard"
          color1="#059669" color2="#10B981"
        />
      ) : step === 2 ? (
        <div style={{ padding:"16px 16px" }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#1A1035", marginBottom:4, textAlign:"center" }}>Processing Payment</div>
          <div style={{ fontSize:9, color:"#9CA3AF", textAlign:"center", marginBottom:8 }}>Securely processing your transaction…</div>
          <TxnProgressBar
            steps={[
              {label:"Initiating Request",   sub:"Contacting payment gateway"},
              {label:"Card Network Approval",sub:"Verifying card details"},
              {label:"Confirming Transaction",sub:"Crediting to wallet"},
            ]}
            activeIdx={1}
            color1="#6D28D9" color2="#0891B2"
          />
        </div>
      ) : step === 1 ? (
        <div style={{ padding: 16 }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 3 }}>AMOUNT TO PAY</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 800 }}>{fmt(Number(amount))}</div>
            <div style={{ fontSize: 11, color: C.muted }}>Fee: {fmt(fee)} · You receive: {fmt(credited)}</div>
            {promoApplied && <div style={{ fontSize:9, color:"#059669", fontWeight:900, marginTop:4, display:"flex", alignItems:"center", gap:4 }}><span>🎁</span>{promoApplied.code}: {promoApplied.label}</div>}
          </div>

          {method === "upi" ? (
            <Card glow style={{ marginBottom: 20, textAlign: "center", padding: 32 }}>
              <div style={{ fontSize: 24 }}>📲</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginTop: 12 }}>UPI Payment</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Pay via any UPI app</div>
              <div style={{ background: "rgba(249,248,255,0.98)", borderRadius: 8, padding: "10px 16px", marginTop: 16, fontSize: 12, color: C.accent, fontWeight: 600 }}>
                cardflow@upi
              </div>
            </Card>
          ) : (
            <>
              <Input label="CARD NUMBER" placeholder="4242 4242 4242 4242" value={cardNo} onChange={v => setCardNo(formatCard(v))} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Input label="EXPIRY" placeholder="MM/YY" value={expiry} onChange={v => setExpiry(formatExpiry(v))} />
                <Input label="CVV" placeholder="•••" value={cvv} onChange={setCvv} type="password" maxLength={3} />
              </div>
            </>
          )}

          <div style={{ display: "flex", flexDirection:"column", gap: 10 }}>
            <SwipeBtn onSubmit={pay} disabled={method !== "upi" && (cardNo.length < 19 || expiry.length < 5 || cvv.length < 3)} label={`Swipe to Pay ${fmt(Number(amount))}`} successLabel="✅ Payment Initiated!" color1="#6D28D9" color2="#0891B2" />
            <Btn variant="secondary" onClick={() => setStep(0)}>← Back</Btn>
          </div>
        </div>
      ) : (
        <div style={{ padding: 14 }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>WALLET BALANCE</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 800, color: C.accent }}>{fmt(wallet.balance)}</div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 6, letterSpacing: "0.04em" }}>ENTER AMOUNT</div>
            <div style={{ display: "flex", alignItems: "center", gap: 0, background: "#FFFFFF", border: `2px solid ${amount ? "#6D28D9" : "rgba(109,40,217,0.20)"}`, borderRadius: 12, padding: "0 16px", height: 54, transition: "border-color 0.2s" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: amount ? C.accent : C.muted, fontWeight: 700, marginRight: 6 }}>₹</span>
              <input
                type="number" value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="0"
                style={{ flex: 1, background: "none", border: "none", fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 800, color: C.text, outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {presets.map(p => {
              const feeAmt = Math.round(p * FEE_RATE);
              const isSelected = amount == p;
              return (
                <button key={p} onClick={() => setAmount(String(p))} style={{
                  padding: "6px 10px", borderRadius: 10,
                  background: isSelected ? "rgba(109,40,217,0.12)" : "#F5F4FF",
                  border: `1.5px solid ${isSelected ? "#6D28D9" : "rgba(109,40,217,0.15)"}`,
                  cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
                  transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: isSelected ? "#6D28D9" : "#1A1035" }}>₹{p.toLocaleString("en-IN")}</span>
                  <span style={{ fontSize: 9, color: isSelected ? "#6D28D9" : C.muted }}>fee ₹{feeAmt}</span>
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: 10, color: C.muted, marginBottom: 6, letterSpacing: "0.04em" }}>PAYMENT METHOD</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
            {methods.map(m => (
              <button key={m.id} onClick={() => setMethod(m.id)} style={{
                background: method === m.id ? "rgba(109,40,217,0.10)" : "#F5F4FF",
                border: `2px solid ${method === m.id ? "#6D28D9" : "rgba(109,40,217,0.15)"}`,
                borderRadius: 12, padding: "10px 6px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                cursor: "pointer", transition: "all 0.2s", position: "relative",
              }}>
                <span style={{ fontSize: 18 }}>{m.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: method === m.id ? "#6D28D9" : "#1A1035", marginTop: 2 }}>{m.label}</span>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  color: method === m.id ? "#fff" : m.fee === "0%" ? "#059669" : m.fee === "0.5%" ? "#D97706" : "#E11D48",
                  background: method === m.id ? "#6D28D9" : m.fee === "0%" ? "rgba(5,150,105,0.12)" : m.fee === "0.5%" ? "rgba(217,119,6,0.12)" : "rgba(225,29,72,0.10)",
                  padding: "2px 7px", borderRadius: 20, marginTop: 2,
                }}>Fee: {typeof m.fee === 'function' ? m.fee() : m.fee}</span>
              </button>
            ))}
          </div>

          {/* Promo Code Input */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize:9, color:C.muted, marginBottom:5, fontWeight:900, letterSpacing:"0.04em" }}>PROMO CODE (OPTIONAL)</div>
            {promoApplied ? (
              <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(5,150,105,0.08)", border:"1.5px solid rgba(5,150,105,0.35)", borderRadius:10, padding:"9px 12px", animation:"fadeUp 0.3s ease" }}>
                <span style={{ fontSize:9 }}>🎁</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:9, fontWeight:900, color:"#059669" }}>{promoApplied.code} — {promoApplied.label}</div>
                  <div style={{ fontSize:9, color:"#374151" }}>{promoApplied.desc}</div>
                </div>
                <button onClick={removePromo} style={{ background:"rgba(225,29,72,0.10)", border:"1px solid rgba(225,29,72,0.22)", color:C.danger, borderRadius:7, padding:"3px 9px", fontSize:9, fontWeight:900, cursor:"pointer" }}>✕</button>
              </div>
            ) : (
              <div style={{ display:"flex", gap:8 }}>
                <div className="input-wrap" style={{ flex:1, display:"flex", alignItems:"center", background:"#F9F8FF", border:"1.5px solid rgba(109,40,217,0.18)", borderRadius:10, padding:"0 12px", height:42 }}>
                  <input value={promoCode} onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoError(""); }}
                    placeholder="Enter promo code"
                    style={{ flex:1, background:"none", border:"none", fontSize:9, fontWeight:900, color:"#1A1035", outline:"none", fontFamily:"'Space Grotesk',sans-serif", letterSpacing:"0.06em" }} />
                </div>
                <button onClick={applyPromo} disabled={!promoCode||promoLoading} style={{ background: !promoCode||promoLoading?"rgba(109,40,217,0.15)":"linear-gradient(135deg,#6D28D9,#0891B2)", color: !promoCode||promoLoading?"rgba(109,40,217,0.45)":"#fff", border:"none", borderRadius:10, padding:"0 12px", fontSize:9, fontWeight:900, cursor:!promoCode||promoLoading?"not-allowed":"pointer", height:42, display:"flex", alignItems:"center", gap:5, flexShrink:0 }}>
                  {promoLoading ? <Loader size={13} color="#fff" /> : "Apply"}
                </button>
              </div>
            )}
            {promoError && <div style={{ fontSize:9, color:C.danger, marginTop:5, display:"flex", alignItems:"center", gap:4 }}><span>⚠️</span>{promoError}</div>}
          </div>

          {amount && (
            <Card style={{ marginBottom: 12, animation: "fadeUp 0.3s ease" }}>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ color:C.muted, fontSize:9 }}>Amount</span>
                <span style={{ fontWeight:900, fontSize:9, color:C.text }}>{fmt(Number(amount))}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ color:C.muted, fontSize:9 }}>Platform Fee ({(FEE_RATE*100).toFixed(1)}%)</span>
                <span style={{ fontWeight:900, fontSize:9, color:C.text }}>{fmt(baseFee)}</span>
              </div>
              {feeDiscount > 0 && (
                <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ color:"#059669", fontSize:9 }}>🎁 Promo Discount</span>
                  <span style={{ fontWeight:900, fontSize:9, color:"#059669" }}>− {fmt(feeDiscount)}</span>
                </div>
              )}
              {cashback > 0 && (
                <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ color:"#059669", fontSize:9 }}>💸 Cashback Bonus</span>
                  <span style={{ fontWeight:900, fontSize:9, color:"#059669" }}>+ {fmt(cashback)}</span>
                </div>
              )}
              <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0" }}>
                <span style={{ color:C.muted, fontSize:9 }}>You receive</span>
                <span style={{ fontWeight:900, fontSize:9, color:C.accent }}>{fmt(credited)}</span>
              </div>
            </Card>
          )}

          <SwipeBtn disabled={!amount || Number(amount) < 100} onSubmit={() => setStep(1)} label="Swipe to Continue" successLabel="→ Proceeding..." color1="#6D28D9" color2="#0891B2" />
          <div style={{ fontSize: 10, color: C.muted, textAlign: "center", marginTop: 8 }}>Min ₹100 · Max ₹1,00,000</div>
        </div>
      )}
    </div>
  );
};


// ─── BANK LIST DATA ───────────────────────────────────────────────────────────
const BANKS = [
  { name: "State Bank of India",   ifscPrefix: "SBIN", logo: "🏛️" },
  { name: "HDFC Bank",             ifscPrefix: "HDFC", logo: "🔵" },
  { name: "ICICI Bank",            ifscPrefix: "ICIC", logo: "🟠" },
  { name: "Axis Bank",             ifscPrefix: "UTIB", logo: "🟣" },
  { name: "Kotak Mahindra Bank",   ifscPrefix: "KKBK", logo: "🔴" },
  { name: "Punjab National Bank",  ifscPrefix: "PUNB", logo: "🟡" },
  { name: "Bank of Baroda",        ifscPrefix: "BARB", logo: "🟤" },
  { name: "Canara Bank",           ifscPrefix: "CNRB", logo: "🟢" },
  { name: "Union Bank of India",   ifscPrefix: "UBIN", logo: "⚪" },
  { name: "IndusInd Bank",         ifscPrefix: "INDB", logo: "🔷" },
  { name: "YES Bank",              ifscPrefix: "YESB", logo: "🔶" },
  { name: "Federal Bank",          ifscPrefix: "FDRL", logo: "🟦" },
  { name: "IDFC FIRST Bank",       ifscPrefix: "IDFB", logo: "🔹" },
  { name: "Bank of India",         ifscPrefix: "BKID", logo: "🏛️" },
  { name: "Indian Bank",           ifscPrefix: "IDIB", logo: "🏧" },
  { name: "Central Bank of India", ifscPrefix: "CBIN", logo: "🏪" },
  { name: "UCO Bank",              ifscPrefix: "UCBA", logo: "🔲" },
  { name: "Indian Overseas Bank",  ifscPrefix: "IOBA", logo: "🔳" },
  { name: "Karnataka Bank",        ifscPrefix: "KARB", logo: "🟥" },
  { name: "South Indian Bank",     ifscPrefix: "SIBL", logo: "🔺" },
];

const BankDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = BANKS.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
  const selected = BANKS.find(b => b.name === value);
  return (
    <div style={{ marginBottom: 16, position: "relative", zIndex: open ? 200 : 1 }}>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, fontWeight: 500, letterSpacing: "0.04em" }}>SELECT BANK</div>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(249,248,255,0.98)", border: `1.5px solid ${open ? C.accent : C.border}`,
        borderRadius: open ? "10px 10px 0 0" : 10, padding: "0 14px", height: 48,
        cursor: "pointer", color: selected ? C.text : C.muted, fontSize: 12,
        transition: "border-color 0.2s", fontFamily: "inherit",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {selected ? (
            <><span style={{ fontSize: 14 }}>{selected.logo}</span><span style={{ fontWeight: 500 }}>{selected.name}</span></>
          ) : (
            <span>Choose your bank…</span>
          )}
        </span>
        <span style={{ fontSize: 10, color: C.muted, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s", display: "inline-block" }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", left: 0, right: 0, zIndex: 200,
          background: "rgba(249,248,255,0.98)", border: `1.5px solid ${C.accent}`,
          borderTop: "none", borderRadius: "0 0 12px 12px",
          boxShadow: "0 16px 40px #00000066",
          maxHeight: 250, display: "flex", flexDirection: "column",
          animation: "fadeUp 0.2s ease",
        }}>
          <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F9F8FF", borderRadius: 8, padding: "6px 12px" }}>
              <span style={{ color: C.muted, fontSize: 12 }}>🔍</span>
              <input autoFocus value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search bank..." style={{ flex: 1, background: "none", border: "none", color: C.text, fontSize: 11, outline: "none", fontFamily: "inherit" }} />
            </div>
          </div>
          <div style={{ overflowY: "auto", flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 16, textAlign: "center", color: C.muted, fontSize: 11 }}>No banks found</div>
            ) : filtered.map(b => (
              <button key={b.name} onClick={() => { onChange(b); setOpen(false); setSearch(""); }} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "11px 16px", background: value === b.name ? C.accentDim : "none",
                border: "none", borderBottom: `1px solid ${C.border}`,
                cursor: "pointer", color: C.text, textAlign: "left",
                transition: "background 0.15s", fontFamily: "inherit",
              }}>
                <span style={{ fontSize: 15, flexShrink: 0 }}>{b.logo}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: value === b.name ? 600 : 400 }}>{b.name}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>IFSC prefix: {b.ifscPrefix}</div>
                </div>
                {value === b.name && <span style={{ color: C.accent, fontSize: 13 }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── SCREEN: LINK BANK ────────────────────────────────────────────────────────
const LinkBankScreen = ({ onBack, onSuccess, linked }) => {
  const [accNo, setAccNo] = useState("");
  const [accNo2, setAccNo2] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [ifsc, setIfsc] = useState("");
  const [holderName, setHolderName] = useState("");
  const [step, setStep] = useState(linked ? 2 : 0);
  const [loading, setLoading] = useState(false);

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setIfsc(bank.ifscPrefix + "0001234");
  };

  const verify = async () => {
    setLoading(true); setStep(1); await sleep(2000); setLoading(false); setStep(2);
  };

  return (
    <div style={{ minHeight: "100%", background: C.bg }}>
      <NavBar title="Link Bank Account" onBack={onBack} />
      <div style={{ padding: 16 }}>
        {step === 2 ? (
          <div style={{ textAlign: "center", animation: "fadeUp 0.4s ease" }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🏦</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 800, color: C.accent }}>Bank Account Linked!</div>
            <div style={{ color: C.muted, marginTop: 8, marginBottom: 24 }}>Penny drop verification successful</div>
            <Card glow style={{ marginBottom: 24, textAlign: "left" }}>
              {[["Account Number", linked?.accNo || accNo.replace(/.(?=.{4})/g, "•")],
                ["IFSC Code", linked?.ifsc || ifsc],
                ["Account Holder", linked?.name || holderName],
                ["Bank", selectedBank?.name || linked?.bankName || "State Bank of India"],
                ["Status", "Verified ✓"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.muted, fontSize: 12 }}>{k}</span>
                  <span style={{ fontWeight: 600, fontSize: 12, color: k === "Status" ? C.accent : C.text }}>{v}</span>
                </div>
              ))}
            </Card>
            <SwipeBtn onSubmit={() => onSuccess({ accNo: accNo.replace(/.(?=.{4})/g, "•"), ifsc, name: holderName, bankName: selectedBank?.name || "Your Bank" })} label="Swipe to Confirm" successLabel="🏦 Bank Linked!" color1="#0891B2" color2="#059669" />
          </div>
        ) : step === 1 ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Loader size={48} />
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, marginTop: 24 }}>Verifying Account</div>
            <div style={{ color: C.muted, fontSize: 12, marginTop: 8 }}>Sending ₹1 penny drop...</div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Bank Account Details</div>
              <div style={{ color: C.muted, fontSize: 12 }}>We'll verify via a ₹1 penny drop</div>
            </div>
            <Input label="ACCOUNT NUMBER" placeholder="Enter account number" value={accNo} onChange={setAccNo} type="password" />
            <Input label="CONFIRM ACCOUNT NUMBER" placeholder="Re-enter account number" value={accNo2} onChange={setAccNo2} />
            <BankDropdown value={selectedBank?.name} onChange={handleBankSelect} />
            <Input label="IFSC CODE" placeholder="SBIN0001234" value={ifsc} onChange={v => setIfsc(v.toUpperCase())} maxLength={11} />
            <Input label="ACCOUNT HOLDER NAME" placeholder="As per bank records" value={holderName} onChange={setHolderName} />

            <div style={{ padding: "12px 16px", background: "rgba(240,192,96,0.10)", borderRadius: 10, border: `1px solid ${C.gold}44`, marginBottom: 20, fontSize: 11, color: C.gold }}>
              ⚠️ ₹1 will be credited to verify your account. It may take 1-2 working days.
            </div>

            <SwipeBtn disabled={!accNo || accNo !== accNo2 || !selectedBank || !ifsc || !holderName} onSubmit={verify} label="Swipe to Link Bank" successLabel="🏦 Bank Linked!" color1="#0891B2" color2="#059669" />
          </>
        )}
      </div>
    </div>
  );
};

// ─── SCREEN: TRANSFER ─────────────────────────────────────────────────────────
const TransferScreen = ({ onBack, onSuccess, wallet, bank, user, userId }) => {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("imps");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const FEE = getFeeConfig().transfer;
  const net = amount ? Number(amount) - FEE : 0;
  const [upiVpa, setUpiVpa] = useState("");

  const modes = [
    { id: "imps", label: "IMPS", desc: "Instant · 24/7", time: "Instant" },
    { id: "neft", label: "NEFT", desc: "2-4 hrs", time: "2-4 hrs" },
    { id: "upi",  label: "UPI",  desc: "Instant · 24/7", time: "Instant" },
  ];

  const transfer = async () => {
    setStep(1); setLoading(true); await sleep(2500); setLoading(false); setStep(2);
  };

  if (!bank) return (
    <div style={{ minHeight: "100%", background: C.bg }}>
      <NavBar title="Transfer to Bank" onBack={onBack} />
      <div style={{ padding: "20px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 24, marginBottom: 16 }}>🏦</div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 8 }}>No Bank Linked</div>
        <div style={{ color: C.muted, fontSize: 12 }}>Please link a bank account first to transfer funds</div>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#F9F8FF" }}>
      <NavBar title="Transfer to Bank" onBack={onBack} />
      <div style={{ padding: "9px 11px", overflowY: "auto" }}>
        {step === 2 ? (
          <TxnResult
            success={true}
            title="Transfer Initiated!"
            amount={net}
            subtitle={`₹${net.toLocaleString("en-IN")} will credit to your bank shortly`}
            details={[
              ["Transfer Amount", fmt(Number(amount))],
              ["Transfer Fee", `− ${fmt(FEE)}`],
              ["Net Credit", fmt(net)],
              ["Mode", mode.toUpperCase()],
              mode==="upi" ? ["UPI VPA", upiVpa] : ["To Account", bank.accNo?.replace(/.(?=.{4})/g,"•")||"•••• 5678"],
              ["ETA", modes.find(m=>m.id===mode)?.time],
            ]}
            onDone={() => onSuccess(Number(amount), FEE, mode)}
            doneLabel="← Back to Dashboard"
            color1="#0891B2" color2="#059669"
          />
        ) : step === 1 ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Loader size={48} />
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, marginTop: 24 }}>Initiating Transfer</div>
            <div style={{ color: C.muted, fontSize: 12, marginTop: 8 }}>Processing {mode.toUpperCase()} transfer...</div>
            {["Validating wallet balance", "Locking transfer amount", "Contacting payout API", "Routing to bank"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "#F9F8FF", borderRadius: 10, marginTop: 10, textAlign: "left" }}>
                <Loader size={12} color={C.accent} />
                <span style={{ fontSize: 11, color: C.muted }}>{s}</span>
              </div>
            ))}
          </div>
        ) : (
          <>
            <Card glow style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>AVAILABLE BALANCE</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 800, color: C.accent }}>{fmt(wallet.balance)}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>To: ••••5678 · {bank.name || "Your Bank"}</div>
            </Card>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>TRANSFER AMOUNT</div>
              <div style={{ display: "flex", alignItems: "center", background: "#FFFFFF", border: `2px solid ${amount ? "#6D28D9" : "rgba(109,40,217,0.20)"}`, borderRadius: 12, padding: "0 16px", height: 54, transition: "border-color 0.2s" }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: amount ? C.accent : C.muted, fontWeight: 700, marginRight: 6 }}>₹</span>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0"
                  style={{ flex: 1, background: "none", border: "none", fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 800, color: C.text, outline: "none" }} />
              </div>
              {amount && Number(amount) > wallet.balance && (
                <div style={{ color: C.danger, fontSize: 11, marginTop: 6 }}>⚠️ Insufficient wallet balance</div>
              )}
            </div>

            <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>TRANSFER MODE</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
              {modes.map(m => (
                <button key={m.id} onClick={() => setMode(m.id)} style={{
                  background: mode === m.id ? "rgba(109,40,217,0.10)" : "#F5F4FF",
                  border: `2px solid ${mode === m.id ? "#6D28D9" : "rgba(109,40,217,0.15)"}`,
                  borderRadius: 10, padding: "10px 6px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                  cursor: "pointer",
                }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 13, color: mode === m.id ? "#6D28D9" : "#1A1035", fontWeight: 700 }}>{m.label}</span>
                  <span style={{ fontSize: 10, color: C.muted }}>{m.desc}</span>
                </button>
              ))}
            </div>

            {/* UPI VPA input (only when UPI mode selected) */}
            {mode === "upi" && (
              <div style={{ marginBottom:8, animation:"fadeUp 0.25s ease both" }}>
                <div style={{ fontSize:9, color:C.muted, marginBottom:5, fontWeight:900, letterSpacing:"0.04em" }}>UPI ID (VPA)</div>
                <div style={{ display:"flex", alignItems:"center", background:"#F9F8FF", border:`1.5px solid ${upiVpa?"rgba(109,40,217,0.40)":"rgba(109,40,217,0.18)"}`, borderRadius:10, padding:"0 12px", height:38, gap:6 }}>
                  <span style={{ fontSize:9 }}>📲</span>
                  <input value={upiVpa} onChange={e=>setUpiVpa(e.target.value.toLowerCase())}
                    placeholder="yourname@upi" type="email"
                    style={{ flex:1, background:"none", border:"none", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit" }} />
                  {upiVpa && <span style={{ color:C.success, fontSize:9 }}>✓</span>}
                </div>
                <div style={{ fontSize:9, color:C.muted, marginTop:4 }}>Enter recipient UPI ID — e.g. name@okicici, 9876543210@ybl</div>
              </div>
            )}

            {amount && Number(amount) <= wallet.balance && (
              <Card style={{ marginBottom: 12, animation: "fadeUp 0.3s ease" }}>
                {[["Transfer Amount", fmt(Number(amount))], ["Transfer Fee", `− ${fmt(FEE)}`], ["Bank Receives", fmt(net)]].map(([k, v], i) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ color: C.muted, fontSize: 12 }}>{k}</span>
                    <span style={{ fontWeight: i === 2 ? 700 : 500, color: i === 2 ? C.gold : C.text, fontSize: 12 }}>{v}</span>
                  </div>
                ))}
              </Card>
            )}

            <SwipeBtn disabled={!amount || Number(amount) < 100 || Number(amount) > wallet.balance || (mode==="upi" && !upiVpa)} onSubmit={transfer} label="Swipe to Transfer" successLabel="🏦 Transfer Initiated!" color1="#0891B2" color2="#059669" />
            <div style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 12 }}>
              Min ₹100 · Max ₹2,00,000/day · Fee ₹10/transfer
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── SCREEN: TRANSACTIONS ─────────────────────────────────────────────────────
const TransactionsScreen = ({ onBack, transactions }) => {
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const filters = ["all", "credit", "transfer", "fee"];
  const filtered = transactions.filter(t => filter === "all" || t.type === filter);

  const toggle = (id) => setExpandedId(prev => prev === id ? null : id);

  return (
    <div style={{ background: "#F9F8FF" }}>
      <NavBar title="Transaction History" onBack={onBack} />
      <div style={{ padding: "10px 14px 0" }}>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 10 }}>
          {filters.map(f => (
            <button key={f} onClick={() => { setFilter(f); setExpandedId(null); }} style={{
              padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${filter === f ? "#6D28D9" : "rgba(109,40,217,0.15)"}`,
              background: filter === f ? "rgba(109,40,217,0.12)" : "#FFFFFF",
              color: filter === f ? "#6D28D9" : "#6B7280", fontWeight: 600, fontSize: 11,
              cursor: "pointer", whiteSpace: "nowrap", textTransform: "capitalize",
            }}>{f === "all" ? "All" : f}</button>
          ))}
        </div>
        {filtered.length > 0 && (
          <div style={{ fontSize:9, color:C.muted, marginBottom:4, paddingBottom:2 }}>Tap any transaction to expand details</div>
        )}
      </div>
      <div style={{ padding: "4px 14px 14px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 20, marginBottom: 12 }}>📭</div>
            <div style={{ color: C.muted, fontSize:9 }}>No transactions found</div>
          </div>
        ) : (
          filtered.map(t => (
            <TxnRow
              key={t.id} txn={t}
              expanded={expandedId === t.id}
              onToggle={() => toggle(t.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

// ─── SCREEN: RISK PANEL ───────────────────────────────────────────────────────
const RiskPanel = ({ wallet, onBack }) => {
  const [blocked, setBlocked] = useState(false);
  const dailyPct = (wallet.dailyUsed / 200000) * 100;
  return (
    <div style={{ background: "#F9F8FF" }}>
      <NavBar title="Risk & Limits" onBack={onBack}
        right={<Chip label={blocked ? "BLOCKED" : "ACTIVE"} color={blocked ? C.danger : C.accent} />}
      />
      <div style={{ padding: 14 }}>
        {/* Limit Overview */}
        <Card style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 16 }}>Transaction Limits</div>
          {[
            { label: "Per Transaction", used: 50000, limit: 100000 },
            { label: "Daily Limit", used: wallet.dailyUsed, limit: 200000 },
            { label: "Monthly Limit", used: wallet.balance * 3, limit: 2000000 },
          ].map(({ label, used, limit }) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 6 }}>
                <span style={{ color: C.muted }}>{label}</span>
                <span style={{ fontWeight: 600 }}>{fmt(used)} / {fmt(limit)}</span>
              </div>
              <div style={{ height: 6, background: "rgba(249,248,255,0.98)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, width: `${Math.min((used / limit) * 100, 100)}%`, background: used / limit > 0.8 ? C.danger : C.accent, transition: "width 0.5s" }} />
              </div>
            </div>
          ))}
        </Card>

        {/* Fraud Indicators */}
        <Card style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 12 }}>Fraud Signals</div>
          {[
            { label: "Multiple failed attempts", status: "clear", icon: "☑️" },
            { label: "Unusual transaction pattern", status: "clear", icon: "☑️" },
            { label: "High velocity transactions", status: "warn", icon: "🚨" },
            { label: "Suspicious IP activity", status: "clear", icon: "☑️" },
          ].map(({ label, status, icon }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              <span style={{ flex: 1, fontSize: 12, color: status === "warn" ? C.gold : C.text }}>{label}</span>
              <Chip label={status === "warn" ? "Warning" : "Clear"} color={status === "warn" ? C.gold : C.accent} />
            </div>
          ))}
        </Card>

        {/* Account Control */}
        <Card>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 12 }}>Account Controls</div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="secondary" small onClick={() => setBlocked(!blocked)} danger={!blocked}>
              {blocked ? "🔓 Unblock" : "🔒 Block Account"}
            </Btn>
            <Btn variant="secondary" small>📧 Report Fraud</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
};


// ─── SCREEN: ROLE LOGIN ───────────────────────────────────────────────────────
// ─── REGISTERED AGENTS STORE (in-memory, simulates DB) ──────────────────────
const REGISTERED_AGENTS = {
  "9876543210": { name:"Rajesh Kumar",  pan:"KLMNO9012L", kyc:"approved" },
  "9845612300": { name:"Priya Sharma",  pan:"ABCDE1234F", kyc:"pending"  },
};

// ─── FILE UPLOAD BUTTON ───────────────────────────────────────────────────────
const FileUploadBtn = ({ label, icon, color, hint, accept, value, onChange, onExtract }) => {
  const inputId = React.useRef("fub_" + Math.random().toString(36).slice(2));
  const readFile = (file) => new Promise((res) => {
    const r = new FileReader();
    r.onload = (e) => res({ name: file.name, dataUrl: e.target.result, size: file.size });
    r.readAsDataURL(file);
  });

  // Simple regex extraction for PAN / Aadhaar from filename or simulated OCR
  const extractNumber = (file, dataUrl) => {
    if (!onExtract) return;
    // Simulate OCR: try to extract from filename first, else demo values
    const fname = file.name.toUpperCase();
    // PAN pattern in filename e.g. ABCDE1234F
    const panMatch = fname.match(/[A-Z]{5}[0-9]{4}[A-Z]/);
    if (panMatch) { onExtract(panMatch[0]); return; }
    // Aadhaar pattern: 12 digits
    const aadMatch = fname.match(/\d{12}/);
    if (aadMatch) { onExtract(aadMatch[0].replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3")); return; }
    // Demo extraction using image data length as seed for realistic-looking numbers
    const seed = dataUrl.length % 100000;
    if (label.toLowerCase().includes("pan")) {
      // Generate demo PAN-like number
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const p = letters[(seed)%26]+letters[(seed+3)%26]+letters[(seed+7)%26]+letters[(seed+11)%26]+letters[(seed+15)%26];
      const n = String(1000 + (seed % 9000));
      const l = letters[(seed+19)%26];
      onExtract(p + n + l);
    } else {
      // Generate demo Aadhaar-like 12-digit number
      const a = String(2000 + (seed % 8000));
      const b = String(1000 + ((seed * 7) % 9000));
      const c = String(1000 + ((seed * 13) % 9000));
      onExtract(a + " " + b + " " + c);
    }
  };

  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ fontSize:8, color, marginBottom:4, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>
        {label} <span style={{ color:"#E11D48" }}>*</span>
      </div>
      {/* Use <label> wrapping — guaranteed to open file picker on all mobile browsers */}
      <label
        htmlFor={inputId.current}
        style={{
          width:"100%", display:"flex", alignItems:"center", gap:10,
          padding:"10px 14px",
          background: value ? "rgba(5,150,105,0.06)" : "#fff",
          border: `1.5px solid ${value ? "rgba(5,150,105,0.40)" : "rgba(8,145,178,0.18)"}`,
          borderRadius:12, cursor:"pointer", textAlign:"left", transition:"all 0.2s",
          boxShadow: value ? "0 0 0 3px rgba(5,150,105,0.08)" : "none",
          boxSizing:"border-box",
        }}
      >
        <div style={{ width:36, height:36, borderRadius:9, background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <Icon name={icon} size={16} color={color}/>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, fontWeight:900, color: value ? "#059669" : "#1A1035" }}>
            {value ? value.name : "Tap to Upload"}
          </div>
          <div style={{ fontSize:8, color:"#9CA3AF" }}>{hint}</div>
        </div>
        {value
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.15"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        }
      </label>
      <input
        id={inputId.current}
        type="file"
        accept={accept || "image/*"}
        style={{ position:"fixed", top:0, left:0, width:0, height:0, opacity:0, pointerEvents:"none" }}
        onChange={async e => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          const data = await readFile(file);
          onChange(data);
          extractNumber(file, data.dataUrl);
          try { e.target.value = ""; } catch(_) {}
        }}
      />
      {value?.dataUrl && (
        <div style={{ marginTop:6, borderRadius:8, overflow:"hidden", border:"1px solid rgba(5,150,105,0.20)", maxHeight:80 }}>
          <img src={value.dataUrl} alt={label} style={{ width:"100%", maxHeight:80, objectFit:"cover", display:"block" }}/>
        </div>
      )}
    </div>
  );
};

// ─── AGENT REGISTER FORM (3-step KYC form) ───────────────────────────────────
const AgentRegisterForm = ({ goBack, onLogin }) => {
  const [regStep, setRegStep] = useState(0);
  const [regForm, setRegForm] = useState({ name:"", mobile:"", email:"", pan:"", panError:"", aadhaar:"", aadhaarError:"", address:"", lat:null, lng:null, panFile:null, aadhaarFile:null, selfieFile:null });
  const [regLocating, setRegLocating] = useState(false);

  // PAN: 5 letters + 4 digits + 1 letter
  const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  // Aadhaar: exactly 12 digits (formatted XXXX XXXX XXXX)
  const AADHAAR_REGEX = /^\d{4} \d{4} \d{4}$/;

  const steps = ["Personal Info", "Documents", "Confirm"];
  const canStep0 = regForm.name && regForm.mobile.length===10 && regForm.email && regForm.address;
  const canStep1 = PAN_REGEX.test(regForm.pan) && AADHAAR_REGEX.test(regForm.aadhaar) && regForm.lat && regForm.panFile && regForm.aadhaarFile && regForm.selfieFile;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.3s ease both" }}>
      {/* Hero header */}
      <div style={{ background:"linear-gradient(135deg,#0891B2,#7B3FE4)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
        <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Create Agent Account</div>
        <div style={{ fontSize:9, color:"rgba(255,255,255,0.72)" }}>Complete KYC · Get approved · Start earning</div>
        <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
      </div>
      {/* Step indicator */}
      <div style={{ background:"#fff", borderBottom:"1px solid rgba(8,145,178,0.10)", padding:"10px 14px", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035" }}>{steps[regStep]}</div>
          <div style={{ display:"flex", gap:5 }}>
            {steps.map((_,i)=>(
              <div key={i} style={{ width:regStep===i?20:8, height:8, borderRadius:4, background:regStep>i?"#0891B2":regStep===i?"#0891B2":"rgba(8,145,178,0.18)", transition:"all 0.3s cubic-bezier(.22,.68,0,1.2)" }}/>
            ))}
          </div>
        </div>
      </div>
      <div style={{ height:3, background:"rgba(8,145,178,0.10)" }}>
        <div style={{ height:"100%", background:"linear-gradient(90deg,#0891B2,#7B3FE4)", width:`${(regStep/3)*100}%`, transition:"width 0.4s ease" }}/>
      </div>
      {/* Content */}
      <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 20px" }}>
        {/* Step 0 — Personal Info */}
        {regStep===0 && (
          <div style={{ animation:"fadeUp 0.35s ease both" }}>
            <p style={{ fontSize:9, color:C.muted, marginBottom:14, lineHeight:1.6 }}>Enter your basic details to create your agent account.</p>
            {[
              { key:"name",   label:"Full Name",     placeholder:"Your full legal name", icon:"user",  color:"#0891B2" },
              { key:"mobile", label:"Mobile Number", placeholder:"10-digit mobile",       icon:"phone", color:"#059669", type:"tel", maxLen:10 },
              { key:"email",  label:"Email Address", placeholder:"agent@example.com",     icon:"mail",  color:"#6D28D9", type:"email" },
            ].map(f=>(
              <div key={f.key} style={{ marginBottom:12 }}>
                <div style={{ fontSize:8, color:"#0891B2", marginBottom:5, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>{f.label}</div>
                <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${regForm[f.key]?"rgba(8,145,178,0.50)":"rgba(8,145,178,0.18)"}`, borderRadius:12, padding:"0 12px", height:44, gap:8, boxShadow:regForm[f.key]?"0 0 0 3px rgba(8,145,178,0.08)":"none", transition:"all 0.2s" }}>
                  <Icon name={f.icon} size={14} color={f.color}/>
                  <input type={f.type||"text"} value={regForm[f.key]} maxLength={f.maxLen}
                    onChange={e=>setRegForm(p=>({...p,[f.key]:f.key==="mobile"?e.target.value.replace(/[^0-9]/g,"").slice(0,10):e.target.value}))}
                    placeholder={f.placeholder}
                    style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit" }}/>
                  {regForm[f.key] && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.15"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              </div>
            ))}
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:8, color:"#0891B2", marginBottom:5, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>Full Address</div>
              <div style={{ background:"#fff", border:`1.5px solid ${regForm.address?"rgba(8,145,178,0.50)":"rgba(8,145,178,0.18)"}`, borderRadius:12, padding:"10px 12px", boxShadow:regForm.address?"0 0 0 3px rgba(8,145,178,0.08)":"none", transition:"all 0.2s" }}>
                <textarea value={regForm.address} onChange={e=>setRegForm(p=>({...p,address:e.target.value}))} placeholder="House/flat, Street, Landmark, City, PIN"
                  style={{ width:"100%", background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit", minHeight:56, resize:"none", lineHeight:1.5 }}/>
              </div>
            </div>
            <button onClick={()=>setRegStep(1)} disabled={!canStep0}
              style={{ width:"100%", background:!canStep0?"rgba(8,145,178,0.15)":"linear-gradient(135deg,#0891B2,#7B3FE4)", color:!canStep0?"rgba(8,145,178,0.45)":"#fff", border:"none", borderRadius:14, padding:"13px", fontSize:10, fontWeight:900, cursor:"pointer", boxShadow:!canStep0?"none":"0 5px 18px rgba(8,145,178,0.38)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              Next: Documents
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        )}
        {/* Step 1 — Documents */}
        {regStep===1 && (
          <div style={{ animation:"fadeUp 0.35s ease both" }}>
            <p style={{ fontSize:9, color:C.muted, marginBottom:12, lineHeight:1.6 }}>All fields are mandatory for KYC verification.</p>

            {/* PAN */}
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:8, color:"#D97706", marginBottom:4, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>PAN Number <span style={{ color:C.danger }}>*</span></div>
              <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${regForm.panError?"rgba(225,29,72,0.50)":PAN_REGEX.test(regForm.pan)?"rgba(5,150,105,0.50)":"rgba(8,145,178,0.18)"}`, borderRadius:12, padding:"0 12px", height:44, gap:8, transition:"all 0.2s" }}>
                <Icon name="kyc" size={14} color="#D97706"/>
                <input type="text" value={regForm.pan} maxLength={10}
                  onChange={e=>{ const v=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,""); setRegForm(p=>({...p,pan:v,panError:v.length>0&&!PAN_REGEX.test(v)?"Format: ABCDE1234F (5 letters + 4 digits + 1 letter)":""})); }}
                  placeholder="ABCDE1234F"
                  style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"monospace", letterSpacing:"0.1em" }}/>
                {PAN_REGEX.test(regForm.pan) && <Icon name="check" size={14} color="#059669"/>}
              </div>
              {regForm.panError && <div style={{ fontSize:8, color:C.danger, marginTop:3 }}>{regForm.panError}</div>}
              <div style={{ fontSize:8, color:C.muted, marginTop:3 }}>Format: ABCDE1234F · 5 uppercase letters + 4 digits + 1 uppercase letter</div>
            </div>

            {/* Aadhaar */}
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:8, color:"#6D28D9", marginBottom:4, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>Aadhaar Number <span style={{ color:C.danger }}>*</span></div>
              <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${regForm.aadhaarError?"rgba(225,29,72,0.50)":AADHAAR_REGEX.test(regForm.aadhaar)?"rgba(5,150,105,0.50)":"rgba(8,145,178,0.18)"}`, borderRadius:12, padding:"0 12px", height:44, gap:8, transition:"all 0.2s" }}>
                <Icon name="shield" size={14} color="#6D28D9"/>
                <input type="text" value={regForm.aadhaar} maxLength={14}
                  onChange={e=>{ const digits=e.target.value.replace(/[^0-9]/g,"").slice(0,12); const fmt=digits.replace(/(\d{4})(\d{0,4})(\d{0,4})/,(_,a,b,c)=>[a,b,c].filter(Boolean).join(" ")); setRegForm(p=>({...p,aadhaar:fmt,aadhaarError:digits.length>0&&digits.length<12?"Must be exactly 12 digits":""})); }}
                  placeholder="XXXX XXXX XXXX"
                  style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"monospace", letterSpacing:"0.1em" }}/>
                {AADHAAR_REGEX.test(regForm.aadhaar) && <Icon name="check" size={14} color="#059669"/>}
              </div>
              {regForm.aadhaarError && <div style={{ fontSize:8, color:C.danger, marginTop:3 }}>{regForm.aadhaarError}</div>}
              <div style={{ fontSize:8, color:C.muted, marginTop:3 }}>Format: XXXX XXXX XXXX · 12 digits with spaces</div>
            </div>

            {/* Location */}
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:8, color:"#059669", marginBottom:4, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>Current Location <span style={{ color:C.danger }}>*</span></div>
              <button onClick={async()=>{ setRegLocating(true); await new Promise(r=>setTimeout(r,1200)); const lat=(12.9716+(Math.random()-0.5)*0.05).toFixed(6); const lng=(77.5946+(Math.random()-0.5)*0.05).toFixed(6); setRegForm(p=>({...p,lat,lng})); setRegLocating(false); }}
                style={{ width:"100%", background:regForm.lat?"rgba(5,150,105,0.07)":"#fff", border:`1.5px solid ${regForm.lat?"rgba(5,150,105,0.45)":"rgba(8,145,178,0.18)"}`, borderRadius:12, padding:"10px 14px", display:"flex", alignItems:"center", gap:10, cursor:"pointer", transition:"all 0.2s" }}>
                {regLocating ? <div style={{ width:22, height:22, borderRadius:"50%", border:"2.5px solid #E5E7EB", borderTop:"2.5px solid #059669", animation:"spin 0.7s linear infinite" }}/> : <div style={{ width:34, height:34, borderRadius:9, background:regForm.lat?"rgba(5,150,105,0.15)":"rgba(5,150,105,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="mappin" size={16} color="#059669"/></div>}
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontSize:10, fontWeight:900, color:regForm.lat?"#059669":"#1A1035" }}>{regLocating?"Detecting…":regForm.lat?`${regForm.lat}, ${regForm.lng}`:"Use My Location"}</div>
                  <div style={{ fontSize:8, color:C.muted }}>{regForm.lat?"GPS location captured ✓":"Tap to auto-detect via GPS"}</div>
                </div>
                {regForm.lat && <Icon name="check" size={14} color="#059669" style={{ marginLeft:"auto" }}/>}
              </button>
            </div>

            {/* File uploads — proper components with useRef */}
            <FileUploadBtn
              label="Upload PAN Card" icon="kyc" color="#D97706"
              hint="JPG/PNG · Clear photo of PAN card" accept="image/*"
              value={regForm.panFile}
              onChange={data => setRegForm(p=>({...p, panFile:data}))}
              onExtract={num => setRegForm(p=>({...p, pan:num, panError:"", panExtracted:true}))}
            />
            <FileUploadBtn
              label="Upload Aadhaar Card" icon="shield" color="#6D28D9"
              hint="Front of Aadhaar card" accept="image/*"
              value={regForm.aadhaarFile}
              onChange={data => setRegForm(p=>({...p, aadhaarFile:data}))}
              onExtract={num => setRegForm(p=>({...p, aadhaar:num, aadhaarError:"", aadhaarExtracted:true}))}
            />
            <FileUploadBtn
              label="Take / Upload Selfie" icon="user" color="#0891B2"
              hint="Camera photo or gallery selfie" accept="image/*;capture=user"
              value={regForm.selfieFile}
              onChange={data => setRegForm(p=>({...p, selfieFile:data}))}
            />

            <div style={{ display:"flex", gap:8, padding:"10px 12px", background:"rgba(8,145,178,0.05)", borderRadius:10, border:"1px solid rgba(8,145,178,0.15)", marginBottom:14 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, marginTop:1 }}><circle cx="12" cy="12" r="9" stroke="#0891B2" strokeWidth="2" fill="#0891B2" fillOpacity="0.12"/><line x1="12" y1="11" x2="12" y2="16" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="#0891B2"/></svg>
              <span style={{ fontSize:8, color:"#374151", lineHeight:1.6 }}>All documents are encrypted. Admin reviews KYC within 24 hours. You'll be notified once approved.</span>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>setRegStep(0)} style={{ flexShrink:0, width:42, background:"rgba(8,145,178,0.07)", border:"1.5px solid rgba(8,145,178,0.22)", borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#0891B2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={()=>setRegStep(2)} disabled={!canStep1}
                style={{ flex:1, background:!canStep1?"rgba(8,145,178,0.15)":"linear-gradient(135deg,#0891B2,#7B3FE4)", color:!canStep1?"rgba(8,145,178,0.45)":"#fff", border:"none", borderRadius:13, padding:"12px", fontSize:10, fontWeight:900, cursor:"pointer", boxShadow:!canStep1?"none":"0 5px 16px rgba(8,145,178,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                Review & Submit
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        )}
        {/* Step 2 — Confirm */}
        {regStep===2 && (
          <div style={{ animation:"fadeUp 0.35s ease both" }}>
            <div style={{ background:"#fff", borderRadius:14, border:"1.5px solid rgba(8,145,178,0.18)", padding:"12px 14px", marginBottom:12, boxShadow:"0 3px 14px rgba(8,145,178,0.08)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
                <Icon name="user" size={14} color="#0891B2"/>
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035" }}>Registration Summary</span>
              </div>
              {[["Name",regForm.name],["Mobile","+91 "+regForm.mobile],["Email",regForm.email],["Address",regForm.address.slice(0,28)+(regForm.address.length>28?"…":"")],["PAN",regForm.pan],["Aadhaar",regForm.aadhaar],["Location",regForm.lat?`${regForm.lat}, ${regForm.lng}`:"—"],["PAN Doc",regForm.panFile?.name||"—"],["Aadhaar Doc",regForm.aadhaarFile?.name||"—"],["Selfie",regForm.selfieFile?.name||"—"]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"6px 0", borderBottom:"1px solid rgba(8,145,178,0.07)" }}>
                  <span style={{ color:C.muted }}>{k}</span>
                  <span style={{ fontWeight:900, color:"#1A1035", maxWidth:"55%", textAlign:"right", fontFamily:k==="PAN"||k==="Aadhaar"?"monospace":"inherit" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8, padding:"10px 12px", background:"rgba(8,145,178,0.05)", borderRadius:10, border:"1px solid rgba(8,145,178,0.15)", marginBottom:14 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, marginTop:1 }}><circle cx="12" cy="12" r="9" stroke="#0891B2" strokeWidth="2" fill="#0891B2" fillOpacity="0.12"/><line x1="12" y1="11" x2="12" y2="16" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="#0891B2"/></svg>
              <span style={{ fontSize:8, color:"#374151", lineHeight:1.6 }}>By submitting you agree to S3Payments <span style={{ color:"#0891B2", fontWeight:900 }}>Terms & Conditions</span>. Admin reviews within 24 hours.</span>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"stretch" }}>
              <button onClick={()=>setRegStep(1)} style={{ flexShrink:0, width:42, background:"rgba(8,145,178,0.07)", border:"1.5px solid rgba(8,145,178,0.22)", borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#0891B2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div style={{ flex:1 }}>
                <SwipeBtn onSubmit={()=>onLogin({ role:"register", name:regForm.name||"New Agent", mobile:regForm.mobile, pan:regForm.pan, aadhaar:regForm.aadhaar, email:regForm.email, address:regForm.address, panFile:regForm.panFile||null, aadhaarFile:regForm.aadhaarFile||null, selfieFile:regForm.selfieFile||null, lat:regForm.lat, lng:regForm.lng })} label="Swipe to Submit Registration" successLabel="✅ Submitted!" color1="#0891B2" color2="#7B3FE4" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// ─── CUSTOMER TRACK VIEW ─────────────────────────────────────────────────────
const CustomerTrackView = ({ dsLoginMobile, trackMobile, setTrackMobile, goBack, setView, setDsStep, error, loading, setError, setLoading }) => {
  const activeMobile = trackMobile || dsLoginMobile;
  const isLoggedIn = !!dsLoginMobile && activeMobile === dsLoginMobile;

  const [selBooking, setSelBooking] = React.useState(null);
  const [liveBookings, setLiveBookings] = React.useState([]);
  const [trackOtp, setTrackOtp] = React.useState(["","","","","",""]);
  const [trackOtpSent, setTrackOtpSent] = React.useState(false);
  const trackOtpRefs = React.useRef([]);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    const refresh = () => {
      setLiveBookings([...(window.__doorstepBookings||[]).filter(b => b.phone === activeMobile)]);
    };
    refresh();
    const iv = setInterval(refresh, 2000);
    return () => clearInterval(iv);
  }, [activeMobile, isLoggedIn]);

  const STATUS_CFG = {
    pending_agent:            { label:"Pending Assignment",    color:"#D97706", bg:"linear-gradient(135deg,#FEF3C7,#FDE68A)" },
    agent_assigned:           { label:"Agent Assigned",        color:"#0891B2", bg:"linear-gradient(135deg,#E0F2FE,#BAE6FD)" },
    agent_approved:           { label:"Agent En Route",        color:"#6D28D9", bg:"linear-gradient(135deg,#EDE9FE,#DDD6FE)" },
    pending_customer_confirm: { label:"Awaiting Confirmation", color:"#D97706", bg:"linear-gradient(135deg,#FEF3C7,#FDE68A)" },
    completed:                { label:"Completed",             color:"#059669", bg:"linear-gradient(135deg,#D1FAE5,#A7F3D0)" },
  };

  // ── DETAIL VIEW ────────────────────────────────────────────────────────────
  if (selBooking) {
    const latest = liveBookings.find(b => b.id === selBooking.id) || selBooking;
    const st = STATUS_CFG[latest.status] || STATUS_CFG.pending_agent;
    const timelineSteps = [
      { done:true,  active:!latest.agentAssigned, label:"Booking Created",       time:latest.bookedAt,
        icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.2"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg> },
      { done:!!latest.agentAssigned, active:!!latest.agentAssigned&&!latest.agentApprovedAt, label:"Agent Assigned", time:latest.agentAssigned||"Pending",
        icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.25"/><path d="M4 20c0-4 3.58-6 8-6s8 2 8 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg> },
      { done:!!latest.agentApprovedAt, active:!!latest.agentApprovedAt&&!latest.transferDoneAt, label:"Agent Approved", time:latest.agentApprovedAt||"Pending",
        icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.2"/><path d="M7.5 12.5l3 3 6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
      { done:!!latest.transferDoneAt, active:!!latest.transferDoneAt&&latest.customerConfirmed!==true, label:"Cash Transfer Done", time:latest.transferDoneAt||"Pending",
        icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="3" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.2"/><path d="M2 10h20" stroke="#fff" strokeWidth="2"/><circle cx="7" cy="15.5" r="1.5" fill="#fff"/></svg> },
      { done:latest.customerConfirmed===true, active:false, label:"You Confirmed Receipt", time:latest.customerConfirmed?latest.completedAt||"Done":"Pending",
        icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
      { done:latest.status==="completed", active:false, label:"Ticket Closed", time:latest.status==="completed"?latest.completedAt||"Done":"Pending",
        icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" fill="#fff" fillOpacity="0.25"/></svg> },
    ];
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.3s ease both" }}>
        <div style={{ background:st.bg, padding:"12px 14px 14px", borderBottom:`1.5px solid ${st.color}30`, flexShrink:0 }}>
          <button onClick={() => setSelBooking(null)} style={{ background:"rgba(0,0,0,0.08)", border:"none", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#1A1035" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`${st.color}22`, border:`1.5px solid ${st.color}44`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={st.color} strokeWidth="2" fill={st.color} fillOpacity="0.15"/><path d="M12 7v5l3 2" stroke={st.color} strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:st.color }}>{st.label}</div>
              <div style={{ fontSize:8, color:st.color, opacity:0.7 }}>{latest.id}</div>
            </div>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 16px" }}>
          <div style={{ background:"#fff", borderRadius:14, border:"1px solid rgba(0,0,0,0.07)", padding:"12px 14px", marginBottom:10, boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035", marginBottom:12 }}>Request Timeline</div>
            {timelineSteps.map((step, i, arr) => (
              <div key={i} style={{ display:"flex", gap:10, paddingBottom:i<arr.length-1?14:0, animation:`fadeUp 0.3s ${i*0.07}s ease both` }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:30, flexShrink:0 }}>
                  <div style={{ width:30, height:30, borderRadius:"50%", background:step.done?"linear-gradient(135deg,#059669,#10B981)":step.active?"linear-gradient(135deg,#D97706,#F59E0B)":"rgba(0,0,0,0.07)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:step.done?"0 2px 8px rgba(5,150,105,0.30)":step.active?"0 0 0 4px rgba(217,119,6,0.15)":"none", animation:step.active?"glowPulse 1.8s ease-in-out infinite":"none" }}>
                    {(step.done||step.active) ? step.icon : <div style={{ width:8, height:8, borderRadius:"50%", background:"rgba(0,0,0,0.18)" }}/>}
                  </div>
                  {i<arr.length-1 && <div style={{ width:2, flex:1, minHeight:12, marginTop:3, borderRadius:2, background:step.done?"linear-gradient(to bottom,#059669,#10B981)":"rgba(0,0,0,0.08)" }}/>}
                </div>
                <div style={{ paddingTop:5 }}>
                  <div style={{ fontSize:10, fontWeight:900, color:step.done?"#1A1035":step.active?"#D97706":"#9CA3AF" }}>{step.label}</div>
                  <div style={{ fontSize:8, color:step.done||step.active?"#9CA3AF":"#C4C9D4", marginTop:1 }}>
                    {step.time==="Pending"
                      ? <span style={{ display:"flex", alignItems:"center", gap:3 }}>
                          <span style={{ width:5, height:5, borderRadius:"50%", background:step.active?"#D97706":"rgba(0,0,0,0.2)", display:"inline-block", animation:step.active?"pulse 1.2s ease-in-out infinite":"none" }}/>Pending
                        </span>
                      : step.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"#fff", borderRadius:14, border:"1px solid rgba(0,0,0,0.07)", padding:"12px 14px", marginBottom:10, boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035", marginBottom:8 }}>Booking Details</div>
            {[["Amount","₹"+Number(latest.amount).toLocaleString("en-IN")],["Cash Mode",latest.cashMode==="hand"?"🤝 By Hand":latest.cashMode==="neft"?"🏛️ NEFT":"📲 UPI"],["Address",latest.address],["Promo",latest.promoCode||"—"],["Agent",latest.agentAssigned||"Not yet assigned"]].map(([k,v])=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid rgba(0,0,0,0.05)", fontSize:9 }}>
                <span style={{ color:"#9CA3AF" }}>{k}</span>
                <span style={{ fontWeight:900, color:"#1A1035", textAlign:"right", maxWidth:"55%" }}>{v}</span>
              </div>
            ))}
          </div>
          {latest.customerSignature && (
            <div style={{ background:"#fff", borderRadius:14, border:"1px solid rgba(5,150,105,0.18)", padding:"12px 14px" }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#059669", marginBottom:8 }}>Your Receipt Signature</div>
              <img src={latest.customerSignature} alt="Signature" style={{ width:"100%", maxHeight:80, objectFit:"contain", background:"#F9F8FF", borderRadius:8, border:"1px solid rgba(5,150,105,0.20)" }}/>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── LOGGED IN → bookings list ───────────────────────────────────────────────
  if (isLoggedIn) {
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.3s ease both" }}>
        <div style={{ background:"linear-gradient(135deg,#059669,#0891B2)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
          <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>My Requests</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)" }}>+91 {activeMobile} · {liveBookings.length} booking{liveBookings.length!==1?"s":""}</div>
          <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 16px" }}>
          {liveBookings.length === 0 ? (
            <div style={{ textAlign:"center", padding:"32px 16px" }}>
              <div style={{ width:60, height:60, borderRadius:"50%", background:"rgba(5,150,105,0.08)", border:"1.5px dashed rgba(5,150,105,0.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#059669" strokeWidth="2" fill="#059669" fillOpacity="0.1"/><path d="M20 20l-3.5-3.5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#1A1035", marginBottom:6 }}>No requests yet</div>
              <div style={{ fontSize:9, color:"#9CA3AF", marginBottom:16 }}>You haven't booked a doorstep withdrawal yet</div>
              <button onClick={() => { setDsStep(0); setView("doorstep"); }} style={{ background:"linear-gradient(135deg,#059669,#10B981)", border:"none", borderRadius:12, padding:"11px 20px", fontSize:10, fontWeight:900, color:"#fff", cursor:"pointer", boxShadow:"0 4px 14px rgba(5,150,105,0.35)" }}>
                Book Now →
              </button>
            </div>
          ) : (
            <>
              <div style={{ fontSize:9, color:"#9CA3AF", marginBottom:10 }}>Tap a request to view details & timeline</div>
              {liveBookings.map((b, idx) => {
                const st = STATUS_CFG[b.status] || STATUS_CFG.pending_agent;
                const isActive = b.status !== "completed";
                const isDeposit = b.type === "cashDeposit";
                const displayAmount = isDeposit ? b.totalAmount : b.amount;
                const displayType = isDeposit ? "Cash Deposit" : (b.cashMode==="hand"?"By Hand":b.cashMode==="neft"?"NEFT":"UPI");
                const displayAddr = isDeposit ? (b.notes?.depAddress || b.notes?.depName || "—") : b.address;
                return (
                  <button key={b.id} onClick={() => setSelBooking(b)}
                    style={{ width:"100%", background:"#fff", border:`1.5px solid ${isActive ? st.color+"44" : "rgba(0,0,0,0.07)"}`, borderRadius:14, padding:"12px 14px", marginBottom:10, cursor:"pointer", textAlign:"left", boxShadow:isActive?`0 3px 12px ${st.color}18`:"0 2px 8px rgba(0,0,0,0.04)", animation:`fadeUp 0.3s ${idx*0.07}s ease both`, display:"block" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          {isDeposit && <span style={{ fontSize:7, fontWeight:900, color:"#D97706", background:"rgba(217,119,6,0.10)", padding:"2px 6px", borderRadius:8 }}>DEPOSIT</span>}
                          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035" }}>
                            ₹{Number(displayAmount||0).toLocaleString("en-IN")} · {displayType}
                          </div>
                        </div>
                        <div style={{ fontSize:8, color:"#9CA3AF", marginTop:1 }}>{b.bookedAt}</div>
                      </div>
                      <div style={{ padding:"4px 10px", background:st.bg, borderRadius:20, border:`1px solid ${st.color}44` }}>
                        <span style={{ fontSize:8, fontWeight:900, color:st.color }}>{st.label}</span>
                      </div>
                    </div>
                    {displayAddr && (
                      <div style={{ fontSize:8, color:"#9CA3AF", display:"flex", alignItems:"center", gap:4, marginBottom:6 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 22S5 15.5 5 10a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" stroke="#9CA3AF" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="#9CA3AF" strokeWidth="2"/></svg>
                        {displayAddr}
                      </div>
                    )}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div style={{ fontSize:8, color:"#9CA3AF" }}>ID: {b.id}</div>
                      <div style={{ fontSize:8, color:st.color, fontWeight:900, display:"flex", alignItems:"center", gap:3 }}>
                        View Details <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 8l4 4-4 4" stroke={st.color} strokeWidth="2" strokeLinecap="round"/></svg>
                      </div>
                    </div>
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
    );
  }

  // ── NOT LOGGED IN → mobile entry (OTP flow) ────────────────────────────────
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ background:"linear-gradient(135deg,#7C3AED,#0891B2)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
        <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Track My Request</div>
        <div style={{ fontSize:9, color:"rgba(255,255,255,0.72)" }}>Enter your mobile to view bookings</div>
        <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 10px" }}>
        <div style={{ marginBottom:10 }}>
          <div style={{ fontSize:9, color:"#9CA3AF", marginBottom:4, fontWeight:900, letterSpacing:"0.04em" }}>MOBILE NUMBER</div>
          <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${trackMobile.length===10?"rgba(124,58,237,0.45)":"rgba(124,58,237,0.20)"}`, borderRadius:10, padding:"0 12px", height:38, gap:6 }}>
            <span style={{ fontSize:9, color:"#9CA3AF", fontWeight:900 }}>+91</span>
            <input type="tel" value={trackMobile} onChange={e=>setTrackMobile(e.target.value.replace(/[^0-9]/g,"").slice(0,10))}
              placeholder="Enter your mobile" maxLength={10}
              style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:9, outline:"none", fontFamily:"inherit" }} />
            {trackMobile.length===10 && <span style={{ color:"#059669", fontSize:9 }}>✓</span>}
          </div>
        </div>
        {error && <div style={{ fontSize:9, color:"#E11D48", marginBottom:8, padding:"7px 10px", background:"rgba(225,29,72,0.07)", borderRadius:8 }}>⚠️ {error}</div>}
        <SwipeBtn key={`ctrack-${trackMobile}`} disabled={trackMobile.length!==10||loading}
          onSubmit={async()=>{
            setError(""); setLoading(true); await sleep(800);
            const bks = (window.__doorstepBookings||[]).filter(b=>b.phone===trackMobile);
            if(bks.length===0){ setError("No bookings found for this number."); setLoading(false); return; }
            setLoading(false); setView("customerOtp");
          }}
          label="Swipe to Send OTP" successLabel="📲 OTP Sent!" color1="#7C3AED" color2="#0891B2"
        />
      </div>
    </div>
  );
};

const RoleLoginScreen = ({ onLogin, agentDocs }) => {
  const [view, setView]           = useState("roles");   // roles | agentChoice | agentLogin | agentRegister | awaitingApproval
  const [role, setRole]           = useState(null);
  const [mobile, setMobile]       = useState("");
  const [otp, setOtp]             = useState(["","","","","",""]);
  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [foundAgent, setFoundAgent] = useState(null);
  const [dsForm, setDsForm] = useState({ name:"", phone:"", address:"", lat:null, lng:null, amount:"", cashMode:"", upiId:"", promoCode:"", promoApplied:null, agreed:false });
  const [dsStep, setDsStep] = useState(0); // 0=details, 1=amount, 2=confirm, 3=booked
  const [dsPromoErr, setDsPromoErr] = useState("");
  const [dsLocating, setDsLocating] = useState(false);
  const [booking, setBooking] = useState(null);
  const [dsLoginMobile, setDsLoginMobile] = useState("");
  const [cashDepositStep, setCashDepositStep] = useState(0);
  const [cashDepositForm, setCashDepositForm] = useState({
    // Currency notes
    n500:0, n200:0, n100:0, n50:0, n20:0, n10:0, n5:0, n2:0, n1:0,
    // Beneficiary bank details
    beneName:"", beneAccount:"", beneIfsc:"", beneBank:"", beneBranch:"", beneContact:"",
    // Depositor details
    depName:"", depMobile:"", depAddress:"",
    // Purpose
    purpose:"",
  });
  const [dsLoginOtp, setDsLoginOtp] = useState(["","","","","",""]);
  const dsLoginOtpRefs = React.useRef([]);
  const [dsLoginName, setDsLoginName] = useState("");
  const [trackMobile, setTrackMobile] = useState("");
  const [trackOtp, setTrackOtp] = useState(["","","","","",""]);
  const trackOtpRefs = useRef([]);
  const [trackOtpSent, setTrackOtpSent] = useState(false);
  const [trackCustomer, setTrackCustomer] = useState(null);
  const [agentUserId, setAgentUserId] = useState("");
  const [agentPassword, setAgentPassword] = useState("");
  const [showAgentPwd, setShowAgentPwd] = useState(false);

  // ── Agent: login with User ID + Password ────────────────────────────────────
  const handleUserIdLogin = async () => {
    setError(""); setLoading(true); await sleep(800);
    const AGENT_CREDS = {
      "USR001": { password:"agent@123", name:"Rajesh Kumar", mobile:"9876543210", kyc:"approved" },
      "USR002": { password:"priya@456",  name:"Priya Sharma",  mobile:"9845612300", kyc:"pending"  },
      "USR003": { password:"amit@789",   name:"Amit Patel",    mobile:"9712345678", kyc:"approved" },
      "USR004": { password:"sunita@321", name:"Sunita Verma",  mobile:"9632587410", kyc:"pending"  },
      ...Object.fromEntries(
        Object.entries(window.__agentLimits || {}).map(([id]) => [id, { password:"agent123", name:"Agent", kyc:"approved" }])
      ),
    };
    const cred = AGENT_CREDS[agentUserId.trim().toUpperCase()] || AGENT_CREDS[agentUserId.trim()];
    if (!cred) {
      setError("User ID not found. Please check and try again.");
    } else if (cred.password !== agentPassword) {
      setError("Incorrect password. Please try again.");
    } else if (cred.kyc !== "approved") {
      setFoundAgent(cred);
      setMobile(cred.mobile || "");
      setView("awaitingApproval");
    } else {
      onLogin({ role:"agent", name: cred.name, mobile: cred.mobile });
    }
    setLoading(false);
  };
  const otpRefs = useRef([]);

  const verifyOtpWithCode = async (code) => {
    setError(""); setLoading(true); await sleep(900);
    if (code === "123456") {
      if (!foundAgent) {
        // New number → go to registration
        setLoading(false);
        onLogin({ role:"register", name:"New Agent", mobile });
      } else if (foundAgent?.kyc === "approved") {
        onLogin({ role:"agent", name: foundAgent?.name || "Agent", mobile });
      } else {
        // Pending/rejected — show status screen
        setLoading(false);
        setView("awaitingApproval");
      }
    } else {
      setLoading(false);
      setError("Wrong OTP. Please try again.");
      setOtp(["","","","","",""]);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  };

  const handleOtpChange = (i, v) => {
    if (!/^[\d]*$/.test(v)) return;
    // Handle iOS/Android autofill — 6-digit paste into one cell
    if (v.length === 6) {
      const digits = v.split("");
      setOtp(digits);
      otpRefs.current[5]?.focus();
      setTimeout(() => verifyOtpWithCode(digits.join("")), 300);
      return;
    }
    const next = [...otp]; next[i] = v.slice(-1);
    setOtp(next);
    if (v && i < 5) otpRefs.current[i+1]?.focus();
    if (!v && i > 0) otpRefs.current[i-1]?.focus();
    // Auto-login when last digit entered — pass digits directly (avoid stale state)
    if (i === 5 && v) {
      const code = next.join("");
      if (code.length === 6) setTimeout(() => verifyOtpWithCode(code), 150);
    }
  };

  // ── Admin login (username + password) ────────────────────────────────────────
  const handleAdminLogin = async () => {
    setError(""); setLoading(true); await sleep(900);
    if (username === "admin" && password === "admin123") {
      // Check if 2FA is enabled globally
      if (window.__adminSecurity?.twoFa) {
        // redirect to OTP step
        setLoading(false);
        setAdminMobile("9000000001");
        setView("adminOtp");
        return;
      }
      onLogin({ role:"admin", name:"Admin User" });
    } else {
      setError("Invalid credentials. Try again.");
      setLoading(false);
    }
  };

  // ── Admin login via mobile + OTP ──────────────────────────────────────────
  const [adminMobile, setAdminMobile] = useState("");
  const [adminOtp, setAdminOtp] = useState(["","","","","",""]);
  const adminOtpRefs = useRef([]);
  const ADMIN_MOBILES = { "9000000001":{ name:"Super Admin" } };

  const verifyAdminOtpWithCode = async (code) => {
    setError(""); setLoading(true); await sleep(900);
    if (code === "123456") {
      const ad = ADMIN_MOBILES[adminMobile];
      onLogin({ role:"admin", name: ad?.name || "Admin" });
    } else {
      setLoading(false);
      setError("Wrong OTP. Please try again.");
      setAdminOtp(["","","","","",""]);
      setTimeout(() => adminOtpRefs.current[0]?.focus(), 100);
    }
  };

  const handleAdminOtpChange = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    if (v.length === 6) {
      const digits = v.split("");
      setAdminOtp(digits);
      adminOtpRefs.current[5]?.focus();
      setTimeout(() => verifyAdminOtpWithCode(digits.join("")), 300);
      return;
    }
    const next = [...adminOtp]; next[i] = v.slice(-1);
    setAdminOtp(next);
    if (v && i < 5) adminOtpRefs.current[i+1]?.focus();
    if (!v && i > 0) adminOtpRefs.current[i-1]?.focus();
    if (i === 5 && v) {
      const code = next.join("");
      if (code.length === 6) setTimeout(() => verifyAdminOtpWithCode(code), 150);
    }
  };

  const handleAdminMobileSend = async () => {
    setError(""); setLoading(true); await sleep(800);
    if (!ADMIN_MOBILES[adminMobile]) {
      setError("Mobile not registered as admin.");
      setLoading(false);
      return;
    }
    setLoading(false);
    setView("adminOtp");
  };

  const handleAdminMobileVerify = async () => {
    verifyAdminOtpWithCode(adminOtp.join(""));
  };

  // ── Agent: check if mobile is registered ──────────────────────────────────
  const handleCheckMobile = async () => {
    setError(""); setLoading(true); await sleep(800);
    setLoading(false);
    // Always go to OTP for any 10-digit mobile — verify identity first
    // foundAgent will be null for new agents; handled after OTP
    const liveApproved = (window.__approvedAgents || {})[mobile];
    const agent = liveApproved || REGISTERED_AGENTS[mobile] ||
      (agentDocs?.mobile === mobile
        ? { name: agentDocs.name, pan: agentDocs.pan, kyc: agentDocs.status === "approved" ? "approved" : "pending" }
        : null);
    setFoundAgent(agent); // may be null for new number
    setOtp(["","","","","",""]);
    setView("agentOtp");
  };

  // ── Agent OTP verify ──────────────────────────────────────────────────────
  const handleVerifyOtp = async () => {
    verifyOtpWithCode(otp.join(""));
  };

  const BACK_MAP = {
    signInChoice:"roles", agentChoice:"signInChoice", agentLogin:"agentChoice", agentIdLogin:"agentChoice", adminChoice:"signInChoice", adminMobileLogin:"adminChoice", adminOtp:"adminChoice",
    agentRegister:"agentChoice", agentOtp:"agentChoice", awaitingApproval:"agentChoice", admin:"roles",
    doorstep:"doorstepHome", doorstepHome:"roles", cashDeposit:"doorstepHome", cashDepositSuccess:"doorstepHome", doorstepLogin:"roles", doorstepLoginOtp:"doorstepLogin", doorstepForm:"doorstep", doorstepBooking:"doorstepForm", customerTrack:"doorstepHome", customerOtp:"doorstepHome",
  };

  const goBack = () => { setView(BACK_MAP[view] || "roles"); setError(""); setMobile(""); setOtp(["","","","","",""]); setAdminOtp(["","","","","",""]); setTrackOtp(["","","","","",""]); setAgentUserId(""); setAgentPassword(""); setFoundAgent(null); };

  // ── Shared header ──────────────────────────────────────────────────────────
  const Header = ({ showBack = true }) => (
    <div style={{ padding:"10px 16px 0", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
      {showBack && (
        <div style={{ alignSelf:"flex-start" }}>
          <button onClick={goBack} style={{ background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:9, width:32, height:32, cursor:"pointer", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", color:"#1A1035" }}>←</button>
        </div>
      )}
      <S3Logo variant="light" size="md" />
    </div>
  );

  const ErrBox = () => error ? (
    <div style={{ padding:"8px 12px", background:"rgba(225,29,72,0.08)", border:"1px solid rgba(225,29,72,0.25)", borderRadius:9, fontSize:9, color:C.danger, marginBottom:8, animation:"fadeUp 0.3s ease" }}>⚠️ {error}</div>
  ) : null;

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      {/* ── Global Pre-Login Background: Iridescent Mesh ── */}
      <div style={{ position:"absolute", inset:0, zIndex:0,
        background:"conic-gradient(from 200deg at 25% 35%, #e8f4ff 0deg, #f5eeff 60deg, #fff0f8 100deg, #f0fff8 140deg, #fffbea 180deg, #eef8ff 220deg, #f3eeff 280deg, #e8f4ff 360deg)"
      }}/>
      <div style={{ position:"absolute", inset:0, zIndex:0,
        background:"radial-gradient(ellipse 80% 60% at 15% 20%, rgba(109,40,217,0.10) 0%, transparent 60%), radial-gradient(ellipse 70% 55% at 85% 15%, rgba(8,145,178,0.09) 0%, transparent 55%), radial-gradient(ellipse 65% 50% at 10% 80%, rgba(5,150,105,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 45% at 90% 75%, rgba(217,119,6,0.07) 0%, transparent 50%)"
      }}/>
      <div style={{ position:"absolute", width:340, height:340, borderRadius:"60% 40% 55% 45% / 45% 55% 45% 55%",
        background:"radial-gradient(circle, rgba(109,40,217,0.09) 0%, transparent 70%)",
        top:"-80px", left:"-60px", zIndex:0, animation:"orbFloat 13s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", width:280, height:280, borderRadius:"45% 55% 40% 60% / 55% 45% 55% 45%",
        background:"radial-gradient(circle, rgba(8,145,178,0.08) 0%, transparent 70%)",
        top:"-40px", right:"-70px", zIndex:0, animation:"orbFloat2 11s 1.5s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", width:300, height:300, borderRadius:"55% 45% 60% 40% / 40% 60% 40% 60%",
        background:"radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 70%)",
        bottom:"-70px", right:"-50px", zIndex:0, animation:"orbFloat 15s 1s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", width:260, height:260, borderRadius:"40% 60% 45% 55% / 60% 40% 60% 40%",
        background:"radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)",
        bottom:"-50px", left:"-50px", zIndex:0, animation:"orbFloat2 12s 2.5s ease-in-out infinite" }}/>
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:0, pointerEvents:"none" }} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bgln1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6D28D9" stopOpacity="0.15"/><stop offset="100%" stopColor="#0891B2" stopOpacity="0.07"/></linearGradient>
          <linearGradient id="bgln2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#059669" stopOpacity="0.12"/><stop offset="100%" stopColor="#6D28D9" stopOpacity="0.05"/></linearGradient>
        </defs>
        <circle cx="360" cy="50" r="55" fill="none" stroke="url(#bgln1)" strokeWidth="0.8" opacity="0.45"/>
        <circle cx="360" cy="50" r="35" fill="none" stroke="url(#bgln1)" strokeWidth="0.6" opacity="0.35"/>
        <circle cx="40" cy="750" r="45" fill="none" stroke="url(#bgln2)" strokeWidth="0.7" opacity="0.40"/>
        <circle cx="40" cy="750" r="28" fill="none" stroke="url(#bgln2)" strokeWidth="0.5" opacity="0.30"/>
        <circle cx="385" cy="400" r="30" fill="none" stroke="#0891B2" strokeWidth="0.5" strokeOpacity="0.20"/>
        <path d="M0 155 C80 135 160 175 240 150 S340 125 400 145" fill="none" stroke="url(#bgln1)" strokeWidth="0.8" opacity="0.30"/>
        <path d="M0 400 C70 380 170 415 260 388 S360 362 400 378" fill="none" stroke="url(#bgln2)" strokeWidth="0.7" opacity="0.24"/>
        <path d="M0 600 C90 580 180 615 270 588 S370 562 400 578" fill="none" stroke="url(#bgln1)" strokeWidth="0.6" opacity="0.18"/>
        {[[80,155],[200,162],[320,148],[120,400],[240,408],[340,382],[160,600],[260,590],[360,575]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.2" fill={i%3===0?"#6D28D9":i%3===1?"#0891B2":"#059669"} fillOpacity="0.22"/>
        ))}
      </svg>

      {/* Scrollable views area */}
      <div style={{ flex:1, overflowY:"auto", position:"relative", zIndex:1, display:"flex", flexDirection:"column" }}>

      {/* ── VIEW: Role Selection ── */}
      {view === "roles" && (
        <div style={{ display:"flex", flexDirection:"column", flex:1 }}>

          {/* ── Hero header matching sign-in page style ── */}
          <div style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", padding:"16px 16px 20px", position:"relative", overflow:"hidden", flexShrink:0, transform:"translateZ(0)" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}>
              <S3Logo variant="light" size="sm" />
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:15, color:"#fff", marginBottom:3, lineHeight:1.2 }}>
                Welcome to S3 Payments
              </div>
            </div>
            {/* Decorative orbs */}
            <div style={{ position:"absolute", right:-20, top:-20, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", right:25, top:35, width:45, height:45, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", left:-20, bottom:-20, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />
          </div>

          {/* Content */}
          <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", flex:1, justifyContent:"center", alignItems:"center" }}>

            {/* Role cards — login card style */}
            <div style={{ width:"100%", padding:"0 20px", display:"flex", flexDirection:"column", gap:10 }}>

              {/* SIGN IN — Admin + Agent merged */}
              <button onClick={() => setView("signInChoice")} style={{
                background:"linear-gradient(135deg,#6D28D9,#0891B2)",
                border:"none", borderRadius:14, padding:"11px 13px",
                display:"flex", alignItems:"center", gap:10, cursor:"pointer",
                boxShadow:"0 5px 18px rgba(109,40,217,0.38)", textAlign:"left", width:"100%",
                animation:"fadeUp 0.4s 0s ease both", position:"relative", overflow:"hidden",
              }}>
                <div style={{ width:38, height:38, borderRadius:11, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, position:"relative" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    {/* Key icon */}
                    <circle cx="8" cy="13" r="4" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.18"/>
                    <path d="M11.5 10.5l8 -3.5M19.5 7l.5 3M16.5 8l.5 2.5" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#fff", marginBottom:2 }}>Sign In</div>
                  <div style={{ fontSize:8, color:"rgba(255,255,255,0.72)" }}>Admin · Agent · Staff login</div>
                </div>
                <div style={{ width:26, height:26, borderRadius:"50%", background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 8l4 4-4 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ position:"absolute", top:0, left:"-60%", width:"40%", height:"100%", background:"linear-gradient(105deg,transparent,rgba(255,255,255,0.10),transparent)", animation:"sheen 3s 0.5s ease-in-out infinite", pointerEvents:"none" }}/>
              </button>

              {/* DOORSTEP */}
              <button onClick={() => { setRole("customer"); setView("doorstepLogin"); }} style={{
                background:"linear-gradient(135deg,#059669,#10B981)",
                border:"none", borderRadius:14, padding:"11px 13px",
                display:"flex", alignItems:"center", gap:10, cursor:"pointer",
                boxShadow:"0 5px 18px rgba(5,150,105,0.34)", textAlign:"left", width:"100%",
                animation:"fadeUp 0.4s 0.2s ease both", position:"relative", overflow:"hidden",
              }}>
                <div style={{ width:38, height:38, borderRadius:11, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, position:"relative" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12L12 4l9 8v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8z" fill="#fff" fillOpacity="0.85" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                    <rect x="9" y="14" width="6" height="7" rx="1" fill="rgba(5,150,105,0.5)"/>
                    <path d="M12 14v7" stroke="#fff" strokeWidth="1" opacity="0.4"/>
                  </svg>
                  <div style={{ position:"absolute", top:-5, right:-2, animation:"bounce 2s 0.3s ease-in-out infinite" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22S5 15.5 5 10a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" fill="#E11D48" stroke="#fff" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" fill="#fff"/>
                    </svg>
                  </div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#fff", marginBottom:2 }}>Doorstep Cash</div>
                  <div style={{ fontSize:8, color:"rgba(255,255,255,0.72)" }}>Book · Track · Agent visits you</div>
                </div>
                <div style={{ width:26, height:26, borderRadius:"50%", background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 8l4 4-4 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ position:"absolute", top:0, left:"-60%", width:"40%", height:"100%", background:"linear-gradient(105deg,transparent,rgba(255,255,255,0.10),transparent)", animation:"sheen 3s 1.5s ease-in-out infinite", pointerEvents:"none" }}/>
              </button>

            </div>
          </div>
        </div>
      )}



      {/* ── VIEW: Sign In Choice — Admin or Agent ── */}
      {view === "signInChoice" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.35s ease both" }}>
          {/* Hero header */}
          <div style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", padding:"12px 14px 18px", position:"relative", overflow:"hidden", flexShrink:0, transform:"translateZ(0)" }}>
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Sign In</div>
            <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
          </div>

          {/* Cards — vertically centered, same size as role page */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 20px" }}>

            {/* Admin */}
            <button onClick={() => { setRole("admin"); setView("adminChoice"); }} style={{
              background:"linear-gradient(135deg,#6D28D9,#9B5FFF)", border:"none", borderRadius:14,
              padding:"11px 13px", display:"flex", alignItems:"center", gap:10, cursor:"pointer",
              boxShadow:"0 5px 18px rgba(109,40,217,0.38)", textAlign:"left", width:"100%", marginBottom:10,
              animation:"fadeUp 0.3s 0s ease both", position:"relative", overflow:"hidden",
            }}>
              <div style={{ width:38, height:38, borderRadius:11, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 5.5V11c0 4.5 3.5 8.2 8 9 4.5-.8 8-4.5 8-9V5.5L12 2z" fill="#fff" fillOpacity="0.22" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="12" cy="9.5" r="2.2" fill="#fff" fillOpacity="0.90"/>
                  <path d="M7.5 17c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <circle cx="18.5" cy="5.5" r="3.5" fill="#FFD700"/>
                  <path d="M18.5 3.5l.5 1.5h1.5l-1.2 1 .4 1.5-1.2-.9-1.2.9.4-1.5-1.2-1H18z" fill="#fff" strokeWidth="0.3"/>
                </svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#fff", marginBottom:2 }}>Admin</div>
                <div style={{ fontSize:8, color:"rgba(255,255,255,0.72)" }}>Full access · Users · KYC · Analytics</div>
              </div>
              <div style={{ width:26, height:26, borderRadius:"50%", background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 8l4 4-4 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{ position:"absolute", top:0, left:"-60%", width:"40%", height:"100%", background:"linear-gradient(105deg,transparent,rgba(255,255,255,0.10),transparent)", animation:"sheen 3s 0.3s ease-in-out infinite", pointerEvents:"none" }}/>
            </button>

            {/* Agent */}
            <button onClick={() => { setRole("agent"); setView("agentChoice"); }} style={{
              background:"linear-gradient(135deg,#0891B2,#06B6D4)", border:"none", borderRadius:14,
              padding:"11px 13px", display:"flex", alignItems:"center", gap:10, cursor:"pointer",
              boxShadow:"0 5px 18px rgba(8,145,178,0.36)", textAlign:"left", width:"100%",
              animation:"fadeUp 0.3s 0.1s ease both", position:"relative", overflow:"hidden",
            }}>
              <div style={{ width:38, height:38, borderRadius:11, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, position:"relative" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="7" r="3.5" fill="#fff" fillOpacity="0.9"/>
                  <path d="M5 20c0-3.5 3.1-5.5 7-5.5s7 2 7 5.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="#fff" fillOpacity="0.2"/>
                  <rect x="14" y="13" width="8" height="6" rx="1.5" fill="#FFD700" opacity="0.95"/>
                  <path d="M16 16h2" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="19.5" cy="16" r="0.8" fill="#0891B2"/>
                </svg>
                <div style={{ position:"absolute", top:-3, right:-3, width:12, height:12, borderRadius:"50%", background:"linear-gradient(135deg,#FFD700,#FFA500)", border:"1.5px solid rgba(255,255,255,0.6)", display:"flex", alignItems:"center", justifyContent:"center", animation:"bounce 1.8s 0.5s ease-in-out infinite" }}>
                  <span style={{ fontSize:6, fontWeight:900, color:"#92400E" }}>₹</span>
                </div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#fff", marginBottom:2 }}>Agent</div>
                <div style={{ fontSize:8, color:"rgba(255,255,255,0.72)" }}>Wallet · Add money · Transfers · AEPS</div>
              </div>
              <div style={{ width:26, height:26, borderRadius:"50%", background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 8l4 4-4 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{ position:"absolute", top:0, left:"-60%", width:"40%", height:"100%", background:"linear-gradient(105deg,transparent,rgba(255,255,255,0.10),transparent)", animation:"sheen 3s 1s ease-in-out infinite", pointerEvents:"none" }}/>
            </button>

          </div>
        </div>
      )}

      {/* ── VIEW: Agent — Choose Login or Register ── */}
      {view === "agentChoice" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.35s ease both" }}>

          {/* ── Hero header — teal/blue gradient ── */}
          <div style={{ background:"linear-gradient(135deg,#0891B2,#7B3FE4)", padding:"14px 16px 18px", position:"relative", overflow:"hidden" }}>
            {/* back button */}
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginBottom:10 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {/* Logo — light variant on gradient */}
            <div style={{ marginBottom:8 }}>
              <S3Logo variant="light" size="sm" />
            </div>
            {/* Title */}
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", letterSpacing:"-0.3px" }}>
                  Agent Login
                  <span style={{ marginLeft:5, fontSize:13 }}>🧑‍💼</span>
                </div>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.72)", marginTop:2 }}>Choose how to sign in</div>
              </div>
            </div>
            {/* Decorative orbs */}
            <div style={{ position:"absolute", right:-20, top:-20, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", right:20, top:30, width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />
          </div>

          {/* ── Sign-in options ── */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"14px 14px 10px", gap:10 }}>

            <button onClick={() => setView("agentLogin")} style={{
              background:"linear-gradient(135deg,#7B3FE4,#9B5FFF)",
              border:"none", borderRadius:14, padding:"11px 13px",
              display:"flex", alignItems:"center", gap:10, cursor:"pointer",
              boxShadow:"0 5px 18px rgba(123,63,228,0.38)", textAlign:"left", width:"100%",
            }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="3" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.2"/><circle cx="12" cy="18" r="1" fill="#fff"/><path d="M10 6h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#fff", marginBottom:1 }}>Login with Mobile</div>
                <div style={{ fontSize:8, color:"rgba(255,255,255,0.72)" }}>Mobile number + OTP verification</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.18)"/><path d="M10 8l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <button onClick={() => setView("agentIdLogin")} style={{
              background:"linear-gradient(135deg,#0891B2,#06B6D4)",
              border:"none", borderRadius:14, padding:"11px 13px",
              display:"flex", alignItems:"center", gap:10, cursor:"pointer",
              boxShadow:"0 5px 18px rgba(8,145,178,0.32)", textAlign:"left", width:"100%",
            }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="3" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.15"/><circle cx="9" cy="11" r="2.5" fill="#fff" opacity="0.9"/><path d="M14 9h4M14 13h3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/><path d="M5 17c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#fff", marginBottom:1 }}>Login with User ID</div>
                <div style={{ fontSize:8, color:"rgba(255,255,255,0.72)" }}>User ID + Password</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.18)"/><path d="M10 8l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <button onClick={() => setView("agentRegister")} style={{
              background:"rgba(8,145,178,0.07)",
              border:"1.5px solid rgba(8,145,178,0.30)", borderRadius:14, padding:"11px 13px",
              display:"flex", alignItems:"center", gap:10, cursor:"pointer",
              boxShadow:"0 3px 12px rgba(8,145,178,0.10)", textAlign:"left", width:"100%",
            }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"rgba(8,145,178,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="14" height="18" rx="2" stroke="#0891B2" strokeWidth="2" fill="#0891B2" fillOpacity="0.1"/><path d="M8 8h8M8 12h8M8 16h5" stroke="#0891B2" strokeWidth="1.8" strokeLinecap="round"/><circle cx="18" cy="18" r="4" fill="#0891B2"/><path d="M16 18h4M18 16v4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#0891B2", marginBottom:1 }}>Create an Account</div>
                <div style={{ fontSize:8, color:C.muted }}>New agent? Register here</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(8,145,178,0.12)" stroke="#0891B2" strokeWidth="1.5"/><path d="M10 8l4 4-4 4" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

          </div>
        </div>
      )}

      {/* ── VIEW: Agent Login — Enter Mobile ── */}
      {view === "agentLogin" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"transparent" }}>
          <div style={{ background:"linear-gradient(135deg,#0891B2,#7B3FE4)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Enter Mobile Number</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.72)" }}>We\'ll send you a 6-digit OTP to verify</div>
            <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 10px" }}>

          <div style={{ marginBottom:6 }}>
            <div style={{ fontSize:9, color:C.muted, marginBottom:5, fontWeight:900, letterSpacing:"0.04em" }}>MOBILE NUMBER</div>
            <div className="input-wrap" style={{ display:"flex", alignItems:"center", gap:8, background:"#fff", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:10, padding:"0 12px", height:44 }}>
              <span style={{ fontSize:9, color:C.muted, fontWeight:900 }}>+91</span>
              <input type="tel" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g,"").slice(0,10))}
                placeholder="9876543210" maxLength={10}
                style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:9, outline:"none" }} />
              {mobile.length===10 && <span style={{ color:C.success, fontSize:9 }}>✓</span>}
            </div>
          </div>
          <div style={{ fontSize:9, color:C.muted, marginBottom:10, padding:"8px 10px", background:"rgba(109,40,217,0.05)", borderRadius:8, border:"1px solid rgba(109,40,217,0.10)" }}>
            💡 Demo: try <strong>9876543210</strong> (approved) or <strong>9845612300</strong> (pending)
          </div>
          <ErrBox />
            <SwipeBtn disabled={mobile.length!==10||loading} onSubmit={handleCheckMobile} label="Swipe to Continue" successLabel="✅ Checking..." color1="#6D28D9" color2="#0891B2" />
          </div>
        </div>
      )}

      {/* ── VIEW: Agent OTP ── */}
      {view === "agentOtp" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"transparent" }}>
          <div style={{ background:"linear-gradient(135deg,#0891B2,#7B3FE4)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0, transform:"translateZ(0)", willChange:"transform" }}>
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Verify OTP</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.72)" }}>Enter the 6-digit code sent to your mobile</div>
            <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 10px" }}>

          <div style={{ textAlign:"center", marginBottom:18 }}>
              <div style={{ fontSize:9, color:"#9CA3AF" }}>Enter the 6-digit code sent to</div>
              <div style={{ fontSize:11, fontWeight:900, color:"#1A1035", marginTop:3 }}>+91 {mobile}</div>
            </div>
            <div style={{ display:"flex", gap:10, marginBottom:16, justifyContent:"center" }}>
            {otp.map((v,i) => (
              <input key={i} ref={el=>otpRefs.current[i]=el} value={v} onChange={e=>handleOtpChange(i,e.target.value)} maxLength={1} type="tel"
                autoComplete="one-time-code" inputMode="numeric"
                style={{ width:44, height:54, textAlign:"center", background:"#fff", border:`2px solid ${v?"#6D28D9":"rgba(109,40,217,0.15)"}`, borderRadius:12, color:"#1A1035", fontSize:16, fontWeight:900, outline:"none", boxShadow:v?"0 0 0 3px rgba(109,40,217,0.10)":"none", transition:"all 0.15s", willChange:"transform" }} />
            ))}
          </div>
          <ErrBox />
            <SwipeBtn disabled={otp.join("").length<6||loading} onSubmit={handleVerifyOtp} label="Swipe to Login" successLabel="✅ Logging in!" color1="#0891B2" color2="#6D28D9" />
          </div>
        </div>
      )}

      {/* ── VIEW: Awaiting Approval ── */}
      {view === "awaitingApproval" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.35s ease both" }}>
          {/* Hero — amber gradient */}
          <div style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", padding:"12px 14px 18px", position:"relative", overflow:"hidden", flexShrink:0 }}>
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>
              KYC Under Review
            </div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.80)" }}>Your documents have been submitted to admin</div>
            <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.08)", pointerEvents:"none" }} />
          </div>

          <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 20px" }}>
            {/* Status card */}
            <div style={{ background:"linear-gradient(135deg,#FEF3C7,#FDE68A)", borderRadius:14, padding:"14px", marginBottom:12, border:"1.5px solid rgba(217,119,6,0.25)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(217,119,6,0.18)", border:"2.5px solid rgba(217,119,6,0.35)", display:"flex", alignItems:"center", justifyContent:"center", animation:"glowPulse 2s ease-in-out infinite" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="2.2" fill="none"/><path d="M12 7v5l3 2" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:12, color:"#92400E" }}>Pending Admin Approval</div>
                  <div style={{ fontSize:8, color:"#B45309", marginTop:2 }}>Verified OTP ✓ · Identity confirmed</div>
                </div>
              </div>
              <div style={{ fontSize:9, color:"#92400E", lineHeight:1.7 }}>
                Your KYC documents are being reviewed. Admin will approve your account within <strong>24 hours</strong>.
              </div>
            </div>

            {/* Account details */}
            <div style={{ background:"#fff", borderRadius:14, border:"1px solid rgba(217,119,6,0.18)", padding:"12px 14px", marginBottom:12, boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#D97706" strokeWidth="2" fill="#D97706" fillOpacity="0.12"/><path d="M8 8h8M8 12h8M8 16h5" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035" }}>Account Status</span>
              </div>
              {[
                ["Mobile",         mobile],
                ["Name",           foundAgent?.name || agentDocs?.name || "—"],
                ["KYC Status",     "⏳ Pending Review"],
                ["PAN",            foundAgent?.pan || agentDocs?.pan || "—"],
                ["Submitted At",   agentDocs?.submittedAt || "—"],
                ["Action Required","Admin Approval"],
              ].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:"1px solid rgba(217,119,6,0.07)" }}>
                  <span style={{ fontSize:9, color:"#9CA3AF" }}>{k}</span>
                  <span style={{ fontSize:9, fontWeight:900, color: v.includes("Pending")?"#D97706":"#1A1035", textAlign:"right", maxWidth:"55%" }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Timeline steps */}
            <div style={{ background:"#fff", borderRadius:14, border:"1px solid rgba(217,119,6,0.12)", padding:"12px 14px", marginBottom:14, boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035", marginBottom:10 }}>Approval Steps</div>
              {[
                { done:true,  label:"Documents Submitted",   sub:"KYC docs uploaded",                color:"#059669" },
                { done:true,  label:"OTP Verified",          sub:"Identity confirmed via mobile",     color:"#059669" },
                { done:false, label:"Admin Review",           sub:"Admin checking your documents",    color:"#D97706", active:true },
                { done:false, label:"Account Activated",     sub:"Login access granted",              color:"#9CA3AF" },
              ].map((step, i, arr) => (
                <div key={i} style={{ display:"flex", gap:10, paddingBottom: i<arr.length-1?12:0, animation:`fadeUp 0.3s ${i*0.08}s ease both` }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:28, flexShrink:0 }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:step.done?"linear-gradient(135deg,#059669,#10B981)":step.active?"linear-gradient(135deg,#D97706,#F59E0B)":"rgba(0,0,0,0.06)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:step.done?"0 2px 8px rgba(5,150,105,0.30)":step.active?"0 2px 8px rgba(217,119,6,0.30), 0 0 0 4px rgba(217,119,6,0.10)":"none", animation:step.active?"glowPulse 1.8s ease-in-out infinite":"none" }}>
                      {step.done
                        ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : step.active
                          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2"/><path d="M12 8v4l2 2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                          : <div style={{ width:8, height:8, borderRadius:"50%", background:"rgba(0,0,0,0.18)" }}/>
                      }
                    </div>
                    {i < arr.length-1 && <div style={{ width:2, flex:1, minHeight:10, marginTop:3, background:step.done?"linear-gradient(to bottom,#059669,#10B981)":"rgba(0,0,0,0.08)", borderRadius:2 }}/>}
                  </div>
                  <div style={{ paddingTop:4 }}>
                    <div style={{ fontSize:10, fontWeight:900, color:step.done?"#1A1035":step.active?"#D97706":"#9CA3AF" }}>{step.label}</div>
                    <div style={{ fontSize:8, color:step.done||step.active?"#9CA3AF":"#C4C9D4", marginTop:1 }}>{step.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <button onClick={goBack} style={{ width:"100%", background:"linear-gradient(135deg,#D97706,#F59E0B)", border:"none", borderRadius:13, padding:"13px", fontSize:10, fontWeight:900, color:"#fff", cursor:"pointer", boxShadow:"0 5px 18px rgba(217,119,6,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginBottom:8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back to Login
            </button>
            <div style={{ textAlign:"center", fontSize:8, color:"#9CA3AF", lineHeight:1.6 }}>
              Come back and login once you receive approval notification
            </div>
          </div>
        </div>
      )}

      {/* ── VIEW: Agent Login with User ID + Password ── */}
      {view === "agentIdLogin" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"transparent" }}>
          <div style={{ background:"linear-gradient(135deg,#0891B2,#7B3FE4)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Login with User ID</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.72)" }}>Enter your User ID and password</div>
            <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 10px" }}>


          {/* User ID input */}
          <div style={{ marginBottom:8 }}>
            <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900, letterSpacing:"0.04em" }}>USER ID</div>
            <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${agentUserId?"rgba(8,145,178,0.40)":"rgba(109,40,217,0.18)"}`, borderRadius:10, padding:"0 12px", height:44 }}>
              <span style={{ fontSize:9, color:C.muted, marginRight:6 }}>🆔</span>
              <input value={agentUserId} onChange={e => setAgentUserId(e.target.value.replace(/\s/g,"").toUpperCase())}
                placeholder="e.g. USR001"
                style={{ flex:1, background:"none", border:"none", fontSize:9, fontWeight:900, color:"#1A1035", outline:"none", fontFamily:"'Space Grotesk',sans-serif", letterSpacing:"0.04em" }} />
              {agentUserId && <span style={{ color:C.accent, fontSize:9 }}>✓</span>}
            </div>
          </div>

          {/* Password input */}
          <div style={{ marginBottom:6 }}>
            <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900, letterSpacing:"0.04em", display:"flex", justifyContent:"space-between" }}>
              <span>PASSWORD</span>
              <button onClick={() => setShowAgentPwd(s=>!s)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:9, color:"#6D28D9", fontWeight:900 }}>
                {showAgentPwd ? "🙈 Hide" : "👁 Show"}
              </button>
            </div>
            <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${agentPassword?"rgba(8,145,178,0.40)":"rgba(109,40,217,0.18)"}`, borderRadius:10, padding:"0 12px", height:44 }}>
              <span style={{ fontSize:9, color:C.muted, marginRight:6 }}>🔑</span>
              <input value={agentPassword} onChange={e => setAgentPassword(e.target.value)}
                type={showAgentPwd?"text":"password"} placeholder="Enter your password"
                style={{ flex:1, background:"none", border:"none", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit" }} />
            </div>
          </div>

          <ErrBox />

          {/* Demo hint */}
          <div style={{ fontSize:9, color:C.muted, marginBottom:10, padding:"8px 12px", background:"rgba(8,145,178,0.05)", borderRadius:9, border:"1px solid rgba(8,145,178,0.12)" }}>
            💡 Demo IDs: <strong>USR001 / agent@123</strong> · <strong>USR002 / priya@456</strong>
          </div>

            <SwipeBtn
              key={`uid-${error}-${agentUserId}-${agentPassword}`}
              disabled={!agentUserId || !agentPassword || loading}
              onSubmit={handleUserIdLogin}
              label="Swipe to Login"
              successLabel="✅ Logging in..."
              color1="#0891B2"
              color2="#059669"
            />
          </div>
        </div>
      )}

      {/* ── VIEW: Agent Register (re-use onboarding flow via callback) ── */}
      {view === "agentRegister" && (
        <AgentRegisterForm goBack={goBack} onLogin={onLogin} />
      )}


      {/* ══════════════════════════════════════════════════════════════════════
          DOORSTEP CASH WITHDRAWAL FLOW
          Steps: 0=details+map → 1=amount+fee → 2=confirm+promo → 3=booked
      ══════════════════════════════════════════════════════════════════════ */}

      {/* ── VIEW: Doorstep — Enter Mobile (Login Gate) ── */}
      {view === "doorstepLogin" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.35s ease both" }}>
          <div style={{ background:"linear-gradient(135deg,#059669,#0891B2)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Doorstep Cash Withdrawal</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)" }}>Enter your mobile to continue</div>
            <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 10px" }}>
            <p style={{ fontSize:9, color:C.muted, marginBottom:14, lineHeight:1.6 }}>Enter your mobile number to book a doorstep withdrawal or track your existing requests.</p>
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:8, color:"#059669", marginBottom:5, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>Mobile Number</div>
              <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${dsLoginMobile.length===10?"rgba(5,150,105,0.50)":"rgba(5,150,105,0.18)"}`, borderRadius:12, padding:"0 12px", height:44, gap:8, boxShadow:dsLoginMobile.length===10?"0 0 0 3px rgba(5,150,105,0.08)":"none", transition:"all 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="3" stroke="#059669" strokeWidth="2" fill="#059669" fillOpacity="0.1"/><circle cx="12" cy="18" r="1" fill="#059669"/></svg>
                <span style={{ fontSize:9, color:"#059669", fontWeight:900 }}>+91</span>
                <input type="tel" value={dsLoginMobile} maxLength={10}
                  onChange={e => setDsLoginMobile(e.target.value.replace(/[^0-9]/g,"").slice(0,10))}
                  placeholder="10-digit mobile number"
                  style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit" }}/>
                {dsLoginMobile.length===10 && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.15"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
            </div>
            <div style={{ fontSize:9, color:C.muted, marginBottom:14, padding:"8px 10px", background:"rgba(5,150,105,0.05)", borderRadius:8, border:"1px solid rgba(5,150,105,0.12)" }}>
              💡 We will send a 6-digit OTP to verify your number
            </div>
            <ErrBox />
            <SwipeBtn disabled={dsLoginMobile.length!==10||loading} onSubmit={async()=>{
              setError(""); setLoading(true); await sleep(700);
              setLoading(false);
              setDsLoginOtp(["","","","","",""]);
              setView("doorstepLoginOtp");
            }} label="Swipe to Send OTP" successLabel="📲 OTP Sent!" color1="#059669" color2="#0891B2" />
          </div>
        </div>
      )}

      {/* ── VIEW: Doorstep — Verify OTP ── */}
      {view === "doorstepLoginOtp" && (() => {
        const verifyDsOtp = async (code) => {
          setError(""); setLoading(true); await sleep(800);
          if (code === "123456") {
            setLoading(false);
            setDsLoginName("Customer");
            setView("doorstepHome");
          } else {
            setLoading(false);
            setError("Wrong OTP. Please try again.");
            setDsLoginOtp(["","","","","",""]);
            setTimeout(() => dsLoginOtpRefs.current[0]?.focus(), 100);
          }
        };
        return (
          <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.35s ease both" }}>
            <div style={{ background:"linear-gradient(135deg,#059669,#0891B2)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0, transform:"translateZ(0)", willChange:"transform" }}>
              <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Verify OTP</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)" }}>Sent to +91 {dsLoginMobile} · Demo: 123456</div>
              <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"20px 16px 16px" }}>
              <div style={{ textAlign:"center", marginBottom:18 }}>
                <div style={{ fontSize:9, color:"#9CA3AF" }}>Enter the 6-digit code sent to</div>
                <div style={{ fontSize:11, fontWeight:900, color:"#1A1035", marginTop:3 }}>+91 {dsLoginMobile}</div>
              </div>
              <div style={{ display:"flex", gap:10, marginBottom:16, justifyContent:"center" }}>
                {dsLoginOtp.map((v,i) => (
                  <input key={i} ref={el=>dsLoginOtpRefs.current[i]=el} value={v}
                    type="tel" maxLength={1} autoComplete="one-time-code" inputMode="numeric"
                    onChange={e => {
                      if (!/^\d*$/.test(e.target.value)) return;
                      if (e.target.value.length === 6) {
                        const d = e.target.value.split("");
                        setDsLoginOtp(d);
                        dsLoginOtpRefs.current[5]?.focus();
                        setTimeout(() => verifyDsOtp(d.join("")), 300);
                        return;
                      }
                      const next=[...dsLoginOtp]; next[i]=e.target.value.slice(-1); setDsLoginOtp(next);
                      if(e.target.value&&i<5) dsLoginOtpRefs.current[i+1]?.focus();
                      if(!e.target.value&&i>0) dsLoginOtpRefs.current[i-1]?.focus();
                      if (i===5 && e.target.value) {
                        const code = next.join("");
                        if(code.length===6) setTimeout(()=>verifyDsOtp(code),150);
                      }
                    }}
                    style={{ width:44, height:54, textAlign:"center", background:"#fff", border:`2px solid ${v?"#059669":"rgba(5,150,105,0.15)"}`, borderRadius:12, color:"#1A1035", fontSize:16, fontWeight:900, outline:"none", boxShadow:v?"0 0 0 3px rgba(5,150,105,0.10)":"none", transition:"all 0.15s", willChange:"transform" }}/>
                ))}
              </div>
              <ErrBox />
              <SwipeBtn disabled={dsLoginOtp.join("").length<6||loading} onSubmit={()=>verifyDsOtp(dsLoginOtp.join(""))}
                label="Swipe to Verify" successLabel="✅ Verified!" color1="#059669" color2="#0891B2" />
            </div>
          </div>
        );
      })()}

      {/* ── VIEW: Doorstep Home — Book or Track ── */}
      {view === "doorstepHome" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.35s ease both" }}>
          <div style={{ background:"linear-gradient(135deg,#059669,#0891B2)", padding:"12px 14px 20px", position:"relative", overflow:"hidden", flexShrink:0 }}>
            {/* Back + Logout row */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={() => { setDsLoginMobile(""); setDsLoginOtp(["","","","","",""]); setDsLoginName(""); setView("roles"); }}
                style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.30)", borderRadius:20, padding:"5px 11px", cursor:"pointer" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontSize:9, fontWeight:900, color:"#fff" }}>Logout</span>
              </button>
            </div>
            <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Doorstep Cash Withdrawal</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)" }}>+91 {dsLoginMobile} · Logged in ✓</div>
            <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", right:18, top:28, width:35, height:35, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"16px 14px 20px" }}>
            {/* Option 1 — Book */}
            <button onClick={() => { setDsStep(0); setView("doorstep"); }}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:"linear-gradient(135deg,#059669,#10B981)", border:"none", borderRadius:16, cursor:"pointer", textAlign:"left", marginBottom:12, boxShadow:"0 6px 22px rgba(5,150,105,0.38)", animation:"fadeUp 0.3s 0s ease both" }}>
              <div style={{ width:46, height:46, borderRadius:13, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 4l9 8v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" fill="#fff" fillOpacity="0.2"/><rect x="9.5" y="14" width="5" height="7" rx="1" fill="#fff" opacity="0.8"/><circle cx="17" cy="7" r="3" fill="#fff" fillOpacity="0.6"/><path d="M15.5 7h3M17 5.5v3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:12, color:"#fff", marginBottom:2 }}>Book Doorstep Withdrawal</div>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.78)" }}>Our agent comes to you · Fast & Secure · 30-60 min</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.18)"/><path d="M10 8l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Option 2 — Cash Deposit */}
            <button onClick={() => { setCashDepositStep(0); setCashDepositForm({n500:0,n200:0,n100:0,n50:0,n20:0,n10:0,n5:0,n2:0,n1:0,beneName:"",beneAccount:"",beneIfsc:"",beneBank:"",beneBranch:"",beneContact:"",depName:"",depMobile:"",depAddress:"",purpose:""}); setView("cashDeposit"); }}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:"rgba(217,119,6,0.07)", border:"1.5px solid rgba(217,119,6,0.30)", borderRadius:16, cursor:"pointer", textAlign:"left", boxShadow:"0 3px 12px rgba(217,119,6,0.10)", animation:"fadeUp 0.3s 0.1s ease both" }}>
              <div style={{ width:46, height:46, borderRadius:13, background:"rgba(217,119,6,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="13" rx="2" stroke="#D97706" strokeWidth="2" fill="#D97706" fillOpacity="0.12"/><path d="M2 10h20" stroke="#D97706" strokeWidth="2"/><circle cx="7" cy="15" r="1.5" fill="#D97706"/><circle cx="12" cy="15" r="1.5" fill="#D97706"/><path d="M16 13h3" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:12, color:"#D97706", marginBottom:2 }}>Cash Deposit</div>
                <div style={{ fontSize:9, color:C.muted }}>Deposit cash · Bank transfer · Currency notes</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(217,119,6,0.12)" stroke="#D97706" strokeWidth="1.5"/><path d="M10 8l4 4-4 4" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Option 3 — Track */}
            <button onClick={() => { setTrackMobile(dsLoginMobile); setView("customerTrack"); }}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:"rgba(8,145,178,0.07)", border:"1.5px solid rgba(8,145,178,0.30)", borderRadius:16, cursor:"pointer", textAlign:"left", boxShadow:"0 3px 12px rgba(8,145,178,0.10)", animation:"fadeUp 0.3s 0.2s ease both" }}>
              <div style={{ width:46, height:46, borderRadius:13, background:"rgba(8,145,178,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#0891B2" strokeWidth="2" fill="#0891B2" fillOpacity="0.12"/><path d="M20 20l-3.5-3.5" stroke="#0891B2" strokeWidth="2.5" strokeLinecap="round"/><path d="M11 8v3l2 2" stroke="#0891B2" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:12, color:"#0891B2", marginBottom:2 }}>Track My Request</div>
                <div style={{ fontSize:9, color:C.muted }}>Check status of your doorstep withdrawal</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(8,145,178,0.12)" stroke="#0891B2" strokeWidth="1.5"/><path d="M10 8l4 4-4 4" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Info */}
            <div style={{ marginTop:14, padding:"10px 12px", background:"rgba(5,150,105,0.05)", borderRadius:10, border:"1px solid rgba(5,150,105,0.12)" }}>
              <div style={{ fontSize:8, color:"#059669", fontWeight:900, marginBottom:4 }}>💡 How it works</div>
              <div style={{ fontSize:8, color:C.muted, lineHeight:1.7 }}>1. Book a withdrawal/deposit → provide your details<br/>2. Admin assigns a nearby agent to your request<br/>3. Agent arrives within 30-60 mins</div>
            </div>
          </div>
        </div>
      )}


      {/* ── VIEW: Cash Deposit Form ── */}
      {view === "cashDeposit" && (() => {
        const DENOMS = [
          { key:"n500", label:"₹500", color:"#059669" },
          { key:"n200", label:"₹200", color:"#D97706" },
          { key:"n100", label:"₹100", color:"#6D28D9" },
          { key:"n50",  label:"₹50",  color:"#0891B2" },
          { key:"n20",  label:"₹20",  color:"#D97706" },
          { key:"n10",  label:"₹10",  color:"#059669" },
          { key:"n5",   label:"₹5",   color:"#9CA3AF" },
          { key:"n2",   label:"₹2",   color:"#9CA3AF" },
          { key:"n1",   label:"₹1",   color:"#9CA3AF" },
        ];
        const DENOM_VALUES = {n500:500,n200:200,n100:100,n50:50,n20:20,n10:10,n5:5,n2:2,n1:1};
        const totalNotes = DENOMS.reduce((s,d)=>s+(cashDepositForm[d.key]||0),0);
        const totalAmount = DENOMS.reduce((s,d)=>s+(cashDepositForm[d.key]||0)*DENOM_VALUES[d.key],0);
        const canStep1 = totalAmount > 0;
        const canStep2 = cashDepositForm.beneName && cashDepositForm.beneAccount.length>=9 && cashDepositForm.beneIfsc.length>=11 && cashDepositForm.beneContact.length===10;
        const canStep3 = cashDepositForm.depName && cashDepositForm.depMobile.length===10 && cashDepositForm.depAddress;
        const steps = ["Currency Notes","Bank Details","Depositor","Review"];

        return (
          <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.35s ease both", background:"transparent" }}>
            {/* Header */}
            <div style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", padding:"12px 14px 14px", position:"relative", overflow:"hidden", flexShrink:0, transform:"translateZ(0)" }}>
              <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff" }}>Cash Deposit Slip</div>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.78)" }}>S3Payments · Doorstep Service</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:8, color:"rgba(255,255,255,0.70)" }}>Total Amount</div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:14, color:"#fff" }}>₹{totalAmount.toLocaleString("en-IN")}</div>
                </div>
              </div>
              {/* Step indicator pills */}
              <div style={{ display:"flex", gap:4 }}>
                {steps.map((s,i)=>(
                  <div key={i} style={{ flex:1, height:3, borderRadius:2, background:cashDepositStep>i?"rgba(255,255,255,0.90)":cashDepositStep===i?"rgba(255,255,255,0.70)":"rgba(255,255,255,0.22)", transition:"all 0.3s" }}/>
                ))}
              </div>
              <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
            </div>

            <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 20px" }}>

              {/* ── STEP 0: Currency Notes ── */}
              {cashDepositStep===0 && (
                <div style={{ animation:"fadeUp 0.3s ease both" }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#1A1035", marginBottom:4 }}>Currency Notes</div>
                  <div style={{ fontSize:8, color:"#9CA3AF", marginBottom:12 }}>Enter the number of notes for each denomination</div>

                  {/* Denomination table */}
                  <div style={{ background:"#fff", borderRadius:12, border:"1px solid rgba(217,119,6,0.18)", overflow:"hidden", marginBottom:14 }}>
                    {/* Header */}
                    <div style={{ display:"flex", background:"rgba(217,119,6,0.08)", padding:"8px 12px", borderBottom:"1px solid rgba(217,119,6,0.12)" }}>
                      <div style={{ flex:1, fontSize:8, fontWeight:900, color:"#D97706" }}>Denomination</div>
                      <div style={{ width:80, textAlign:"center", fontSize:8, fontWeight:900, color:"#D97706" }}>No. of Notes</div>
                      <div style={{ width:80, textAlign:"right", fontSize:8, fontWeight:900, color:"#D97706" }}>Amount</div>
                    </div>
                    {DENOMS.map((d)=>(
                      <div key={d.key} style={{ display:"flex", alignItems:"center", padding:"8px 12px", borderBottom:"1px solid rgba(0,0,0,0.04)" }}>
                        <div style={{ flex:1, display:"flex", alignItems:"center", gap:8 }}>
                          <div style={{ width:36, height:20, borderRadius:4, background:`${d.color}18`, border:`1px solid ${d.color}30`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <span style={{ fontSize:9, fontWeight:900, color:d.color }}>{d.label}</span>
                          </div>
                        </div>
                        <div style={{ width:80, display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
                          <button onClick={()=>setCashDepositForm(p=>({...p,[d.key]:Math.max(0,(p[d.key]||0)-1)}))}
                            style={{ width:22, height:22, borderRadius:6, background:"rgba(217,119,6,0.10)", border:"1px solid rgba(217,119,6,0.25)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:12, fontWeight:900, color:"#D97706" }}>−</button>
                          <input type="number" min="0" max="999" value={cashDepositForm[d.key]||0}
                            onChange={e=>setCashDepositForm(p=>({...p,[d.key]:Math.max(0,parseInt(e.target.value)||0)}))}
                            style={{ width:36, textAlign:"center", background:"none", border:"none", fontSize:10, fontWeight:900, color:"#1A1035", outline:"none", fontFamily:"monospace" }}/>
                          <button onClick={()=>setCashDepositForm(p=>({...p,[d.key]:(p[d.key]||0)+1}))}
                            style={{ width:22, height:22, borderRadius:6, background:"rgba(217,119,6,0.10)", border:"1px solid rgba(217,119,6,0.25)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:12, fontWeight:900, color:"#D97706" }}>+</button>
                        </div>
                        <div style={{ width:80, textAlign:"right", fontSize:9, fontWeight:900, color:(cashDepositForm[d.key]||0)>0?"#D97706":"#C4C9D4" }}>
                          {(cashDepositForm[d.key]||0)>0 ? "₹"+(((cashDepositForm[d.key]||0)*DENOM_VALUES[d.key]).toLocaleString("en-IN")) : "—"}
                        </div>
                      </div>
                    ))}
                    {/* Total row */}
                    <div style={{ display:"flex", padding:"10px 12px", background:"rgba(217,119,6,0.06)", borderTop:"1.5px solid rgba(217,119,6,0.18)" }}>
                      <div style={{ flex:1, fontSize:10, fontWeight:900, color:"#1A1035" }}>Total</div>
                      <div style={{ width:80, textAlign:"center", fontSize:10, fontWeight:900, color:"#1A1035" }}>{totalNotes} notes</div>
                      <div style={{ width:80, textAlign:"right", fontSize:11, fontWeight:900, color:"#D97706", fontFamily:"'Space Grotesk',sans-serif" }}>₹{totalAmount.toLocaleString("en-IN")}</div>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div style={{ marginBottom:14 }}>
                    <div style={{ fontSize:8, color:"#D97706", marginBottom:4, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase" }}>Purpose of Deposit</div>
                    <select value={cashDepositForm.purpose} onChange={e=>setCashDepositForm(p=>({...p,purpose:e.target.value}))}
                      style={{ width:"100%", background:"#fff", border:"1.5px solid rgba(217,119,6,0.22)", borderRadius:10, padding:"10px 12px", fontSize:10, color:cashDepositForm.purpose?"#1A1035":"#9CA3AF", outline:"none", fontFamily:"inherit" }}>
                      <option value="">Select purpose…</option>
                      <option>Self Account Deposit</option>
                      <option>Third Party Transfer</option>
                      <option>Loan Repayment</option>
                      <option>Bill Payment</option>
                      <option>Business Deposit</option>
                      <option>Others</option>
                    </select>
                  </div>

                  <button onClick={()=>setCashDepositStep(1)} disabled={!canStep1}
                    style={{ width:"100%", background:!canStep1?"rgba(217,119,6,0.15)":"linear-gradient(135deg,#D97706,#F59E0B)", color:!canStep1?"rgba(217,119,6,0.40)":"#fff", border:"none", borderRadius:12, padding:"13px", fontSize:10, fontWeight:900, cursor:canStep1?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                    Next: Bank Details →
                  </button>
                </div>
              )}

              {/* ── STEP 1: Beneficiary Bank Details ── */}
              {cashDepositStep===1 && (
                <div style={{ animation:"fadeUp 0.3s ease both" }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#1A1035", marginBottom:4 }}>Beneficiary Bank Details</div>
                  <div style={{ fontSize:8, color:"#9CA3AF", marginBottom:12 }}>Account where cash will be deposited</div>

                  {[
                    {key:"beneName",    label:"Account Holder Name", placeholder:"Full name as per bank",   type:"text" },
                    {key:"beneAccount", label:"Account Number",       placeholder:"Enter account number",     type:"tel", maxLen:18 },
                    {key:"beneIfsc",    label:"IFSC Code",            placeholder:"e.g. SBIN0001234",         type:"text", maxLen:11, upper:true },
                    {key:"beneBank",    label:"Bank Name",            placeholder:"e.g. State Bank of India", type:"text" },
                    {key:"beneBranch",  label:"Branch Name",          placeholder:"e.g. Koramangala Branch",  type:"text" },
                    {key:"beneContact", label:"Contact Number",       placeholder:"10-digit mobile",          type:"tel", maxLen:10 },
                  ].map(f=>(
                    <div key={f.key} style={{ marginBottom:10 }}>
                      <div style={{ fontSize:8, color:"#D97706", marginBottom:3, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase" }}>{f.label}</div>
                      <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${cashDepositForm[f.key]?"rgba(217,119,6,0.45)":"rgba(217,119,6,0.18)"}`, borderRadius:10, padding:"0 12px", height:42, gap:6 }}>
                        <input type={f.type||"text"} value={cashDepositForm[f.key]}
                          maxLength={f.maxLen}
                          onChange={e=>{
                            let v = e.target.value;
                            if(f.upper) v=v.toUpperCase();
                            if(f.type==="tel") v=v.replace(/[^0-9]/g,"");
                            if(f.maxLen) v=v.slice(0,f.maxLen);
                            setCashDepositForm(p=>({...p,[f.key]:v}));
                          }}
                          placeholder={f.placeholder}
                          style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit", letterSpacing:f.upper?"0.08em":"inherit" }}/>
                        {cashDepositForm[f.key] && <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.15"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                    </div>
                  ))}

                  <div style={{ display:"flex", gap:8, marginTop:4 }}>
                    <button onClick={()=>setCashDepositStep(0)} style={{ width:40, background:"rgba(217,119,6,0.08)", border:"1.5px solid rgba(217,119,6,0.22)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <button onClick={()=>setCashDepositStep(2)} disabled={!canStep2}
                      style={{ flex:1, background:!canStep2?"rgba(217,119,6,0.15)":"linear-gradient(135deg,#D97706,#F59E0B)", color:!canStep2?"rgba(217,119,6,0.40)":"#fff", border:"none", borderRadius:11, padding:"12px", fontSize:10, fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                      Next: Depositor Details →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Depositor Details ── */}
              {cashDepositStep===2 && (
                <div style={{ animation:"fadeUp 0.3s ease both" }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#1A1035", marginBottom:4 }}>Depositor Details</div>
                  <div style={{ fontSize:8, color:"#9CA3AF", marginBottom:12 }}>Person who is depositing the cash</div>

                  {[
                    {key:"depName",    label:"Depositor Full Name", placeholder:"Name of person depositing", type:"text" },
                    {key:"depMobile",  label:"Mobile Number",        placeholder:"10-digit mobile",           type:"tel", maxLen:10 },
                  ].map(f=>(
                    <div key={f.key} style={{ marginBottom:10 }}>
                      <div style={{ fontSize:8, color:"#D97706", marginBottom:3, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase" }}>{f.label}</div>
                      <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${cashDepositForm[f.key]?"rgba(217,119,6,0.45)":"rgba(217,119,6,0.18)"}`, borderRadius:10, padding:"0 12px", height:42, gap:6 }}>
                        <input type={f.type||"text"} value={cashDepositForm[f.key]}
                          maxLength={f.maxLen}
                          onChange={e=>{
                            let v=e.target.value;
                            if(f.type==="tel") v=v.replace(/[^0-9]/g,"");
                            if(f.maxLen) v=v.slice(0,f.maxLen);
                            setCashDepositForm(p=>({...p,[f.key]:v}));
                          }}
                          placeholder={f.placeholder}
                          style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit" }}/>
                        {cashDepositForm[f.key] && <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.15"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                    </div>
                  ))}
                  <div style={{ marginBottom:14 }}>
                    <div style={{ fontSize:8, color:"#D97706", marginBottom:3, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase" }}>Depositor Address</div>
                    <div style={{ background:"#fff", border:`1.5px solid ${cashDepositForm.depAddress?"rgba(217,119,6,0.45)":"rgba(217,119,6,0.18)"}`, borderRadius:10, padding:"8px 12px" }}>
                      <textarea value={cashDepositForm.depAddress} onChange={e=>setCashDepositForm(p=>({...p,depAddress:e.target.value}))}
                        placeholder="Full address of depositor"
                        style={{ width:"100%", background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit", minHeight:52, resize:"none" }}/>
                    </div>
                  </div>

                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>setCashDepositStep(1)} style={{ width:40, background:"rgba(217,119,6,0.08)", border:"1.5px solid rgba(217,119,6,0.22)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <button onClick={()=>setCashDepositStep(3)} disabled={!canStep3}
                      style={{ flex:1, background:!canStep3?"rgba(217,119,6,0.15)":"linear-gradient(135deg,#D97706,#F59E0B)", color:!canStep3?"rgba(217,119,6,0.40)":"#fff", border:"none", borderRadius:11, padding:"12px", fontSize:10, fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                      Review Deposit Slip →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Review & Submit ── */}
              {cashDepositStep===3 && (
                <div style={{ animation:"fadeUp 0.3s ease both" }}>
                  {/* Deposit Slip Card */}
                  <div style={{ background:"#fff", borderRadius:14, border:"2px solid rgba(217,119,6,0.25)", overflow:"hidden", marginBottom:12, boxShadow:"0 4px 16px rgba(217,119,6,0.12)" }}>
                    {/* Slip header */}
                    <div style={{ background:"linear-gradient(135deg,rgba(217,119,6,0.10),rgba(245,158,11,0.08))", padding:"10px 14px", borderBottom:"1px solid rgba(217,119,6,0.15)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#92400E" }}>Cash Deposit Slip</div>
                        <div style={{ fontSize:8, color:"#B45309" }}>S3Payments Doorstep Service</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:8, color:"#9CA3AF" }}>Date: {new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</div>
                        <div style={{ fontSize:9, fontWeight:900, color:"#D97706" }}>Ref: DS{Date.now().toString().slice(-6)}</div>
                      </div>
                    </div>
                    {/* Currency breakdown */}
                    <div style={{ padding:"10px 14px", borderBottom:"1px solid rgba(217,119,6,0.10)" }}>
                      <div style={{ fontSize:8, fontWeight:900, color:"#D97706", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Currency Notes</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:6 }}>
                        {[{k:"n500",v:500},{k:"n200",v:200},{k:"n100",v:100},{k:"n50",v:50},{k:"n20",v:20},{k:"n10",v:10},{k:"n5",v:5},{k:"n2",v:2},{k:"n1",v:1}]
                          .filter(d=>(cashDepositForm[d.k]||0)>0)
                          .map(d=>(
                            <div key={d.k} style={{ padding:"3px 8px", background:"rgba(217,119,6,0.08)", borderRadius:6, border:"1px solid rgba(217,119,6,0.20)", fontSize:8, fontWeight:900, color:"#92400E" }}>
                              ₹{d.v} × {cashDepositForm[d.k]} = ₹{((cashDepositForm[d.k]||0)*d.v).toLocaleString("en-IN")}
                            </div>
                          ))
                        }
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, fontWeight:900, fontFamily:"'Space Grotesk',sans-serif" }}>
                        <span style={{ color:"#1A1035" }}>Total ({totalNotes} notes)</span>
                        <span style={{ color:"#D97706" }}>₹{totalAmount.toLocaleString("en-IN")}</span>
                      </div>
                      {cashDepositForm.purpose && <div style={{ fontSize:8, color:"#9CA3AF", marginTop:4 }}>Purpose: {cashDepositForm.purpose}</div>}
                    </div>
                    {/* Beneficiary */}
                    <div style={{ padding:"10px 14px", borderBottom:"1px solid rgba(217,119,6,0.10)" }}>
                      <div style={{ fontSize:8, fontWeight:900, color:"#6D28D9", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Beneficiary Account</div>
                      {[["Name",cashDepositForm.beneName],["Account No.",cashDepositForm.beneAccount],["IFSC",cashDepositForm.beneIfsc],["Bank",cashDepositForm.beneBank||"—"],["Branch",cashDepositForm.beneBranch||"—"],["Contact","+91 "+cashDepositForm.beneContact]].map(([k,v])=>(
                        <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"3px 0" }}>
                          <span style={{ color:"#9CA3AF" }}>{k}</span>
                          <span style={{ fontWeight:900, color:"#1A1035", maxWidth:"55%", textAlign:"right", fontFamily:k==="Account No."||k==="IFSC"?"monospace":"inherit" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    {/* Depositor */}
                    <div style={{ padding:"10px 14px" }}>
                      <div style={{ fontSize:8, fontWeight:900, color:"#059669", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Depositor Details</div>
                      {[["Name",cashDepositForm.depName],["Mobile","+91 "+cashDepositForm.depMobile],["Address",(cashDepositForm.depAddress||"").slice(0,30)+(cashDepositForm.depAddress.length>30?"…":"")]].map(([k,v])=>(
                        <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"3px 0" }}>
                          <span style={{ color:"#9CA3AF" }}>{k}</span>
                          <span style={{ fontWeight:900, color:"#1A1035", maxWidth:"55%", textAlign:"right" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding:"8px 10px", background:"rgba(217,119,6,0.06)", border:"1px solid rgba(217,119,6,0.15)", borderRadius:9, marginBottom:14, fontSize:8, color:"#92400E", lineHeight:1.6 }}>
                    ✅ By submitting you confirm the cash and details are correct. Agent will collect cash and complete the deposit.
                  </div>

                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>setCashDepositStep(2)} style={{ width:40, background:"rgba(217,119,6,0.08)", border:"1.5px solid rgba(217,119,6,0.22)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <button onClick={()=>{
                      const slip = {
                        id:"CD"+uid(), type:"cashDeposit",
                        depositedBy:dsLoginMobile,
                        totalAmount, totalNotes,
                        notes:{...cashDepositForm},
                        bookedAt:new Date().toLocaleString("en-IN"),
                        status:"pending_agent",
                        phone:dsLoginMobile,
                      };
                      if(!window.__doorstepBookings) window.__doorstepBookings=[];
                      window.__doorstepBookings.push(slip);
                      setView("cashDepositSuccess");
                    }} style={{ flex:1, background:"linear-gradient(135deg,#D97706,#F59E0B)", border:"none", borderRadius:11, padding:"13px", fontSize:10, fontWeight:900, color:"#fff", cursor:"pointer", boxShadow:"0 4px 16px rgba(217,119,6,0.40)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Submit Deposit Slip
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── VIEW: Cash Deposit Success ── */}
      {view === "cashDepositSuccess" && (() => {
        const dv = {n500:500,n200:200,n100:100,n50:50,n20:20,n10:10,n5:5,n2:2,n1:1};
        const tot = Object.entries(dv).reduce((s,[k,v])=>s+(cashDepositForm[k]||0)*v,0);
        return (
          <div style={{ display:"flex", flexDirection:"column", height:"100%", alignItems:"center", justifyContent:"center", padding:"20px", background:"transparent" }}>
            <div style={{ width:70, height:70, borderRadius:"50%", background:"linear-gradient(135deg,#D97706,#F59E0B)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, animation:"scaleIn 0.4s cubic-bezier(.34,1.56,.64,1) both", boxShadow:"0 6px 24px rgba(217,119,6,0.45)" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:16, color:"#1A1035", marginBottom:6, textAlign:"center" }}>Deposit Slip Submitted!</div>
            <div style={{ fontSize:9, color:"#9CA3AF", textAlign:"center", marginBottom:4, lineHeight:1.7 }}>
              Total: <strong style={{ color:"#D97706" }}>₹{tot.toLocaleString("en-IN")}</strong><br/>
              An agent will be assigned to collect your cash.
            </div>
            <div style={{ fontSize:8, color:"#9CA3AF", marginBottom:24 }}>Track your request in "Track My Request"</div>
            <button onClick={()=>setView("doorstepHome")} style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", border:"none", borderRadius:12, padding:"12px 28px", fontSize:10, fontWeight:900, color:"#fff", cursor:"pointer", boxShadow:"0 4px 14px rgba(217,119,6,0.35)" }}>
              Back to Home
            </button>
          </div>
        );
      })()}

      {/* ── VIEW: Doorstep Intro ── */}
      {view === "doorstep" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
          <div style={{ background:"linear-gradient(135deg,#059669,#0891B2)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Doorstep Cash Withdrawal 💰</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.72)" }}>Our agent comes to you · Fast & Secure</div>
            <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", right:18, top:28, width:35, height:35, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 10px" }}>
            <div>
            <div style={{ background:"linear-gradient(135deg,#059669,#10B981,#0891B2)", borderRadius:16, padding:"10px 13px", marginBottom:10, textAlign:"center", boxShadow:"0 8px 28px rgba(5,150,105,0.35)" }}>
              <div style={{ fontSize:9, marginBottom:4 }}>💰</div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#fff", marginBottom:4 }}>Doorstep Cash Withdrawal</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.80)" }}>Our agent will visit your location & hand over cash</div>
            </div>
            {/* Features */}
            {[["🚀","Instant Booking","Book now, agent arrives in 30-60 min"],["🔰","100% Secure","Verified S3Payments agents only"],["📌","Track Agent","Real-time location tracking"],["⚡","Low Charges","Distance-based minimal fee"]].map(([ic,t,d])=>(
              <div key={t} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:"rgba(5,150,105,0.10)", border:"1px solid rgba(5,150,105,0.20)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>{ic}</div>
                <div><div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{t}</div><div style={{ fontSize:9, color:C.muted }}>{d}</div></div>
              </div>
            ))}
            <button onClick={() => { setDsStep(0); setView("doorstepForm"); }} style={{ width:"100%", background:"linear-gradient(135deg,#059669,#10B981)", border:"none", borderRadius:14, padding:"14px", fontSize:9, fontWeight:900, color:"#fff", cursor:"pointer", boxShadow:"0 6px 20px rgba(5,150,105,0.40)", marginTop:8 }}>
              Book Doorstep Withdrawal →
            </button>
            </div>
          </div>
        </div>
      )}

      {/* ── VIEW: Doorstep Form ── */}
      {view === "doorstepForm" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.3s ease both" }}>

          {/* ── Sticky top bar with back + step indicator ── */}
          <div style={{ background:"#fff", borderBottom:"1px solid rgba(5,150,105,0.12)", padding:"10px 14px", display:"flex", alignItems:"center", gap:10, flexShrink:0, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <button onClick={goBack} style={{ background:"rgba(5,150,105,0.09)", border:"1.5px solid rgba(5,150,105,0.22)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#1A1035" }}>
                {dsStep===0?"Your Details":dsStep===1?"Withdrawal Amount":dsStep===2?"Confirm & Book":"Booking Confirmed!"}
              </div>
            </div>
            {/* Step pill indicators */}
            <div style={{ display:"flex", gap:5, alignItems:"center" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: dsStep===i ? 20 : 8, height:8, borderRadius:4,
                  background: dsStep>i ? "#059669" : dsStep===i ? "#059669" : "rgba(5,150,105,0.18)",
                  transition:"all 0.3s cubic-bezier(.22,.68,0,1.2)",
                }}/>
              ))}
            </div>
          </div>

          {/* ── Progress bar ── */}
          <div style={{ height:3, background:"rgba(5,150,105,0.10)" }}>
            <div style={{ height:"100%", background:"linear-gradient(90deg,#059669,#10B981)", width:`${((dsStep)/3)*100}%`, transition:"width 0.4s ease", borderRadius:"0 3px 3px 0" }}/>
          </div>

          {/* ── Scrollable content ── */}
          <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 20px" }}>

            {/* ── STEP 0: Your Details ── */}
            {dsStep === 0 && (
              <div style={{ animation:"fadeUp 0.35s ease both" }}>
                <p style={{ fontSize:9, color:C.muted, marginBottom:14, lineHeight:1.6 }}>Enter your details and share your location for accurate service.</p>

                {/* Name */}
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:8, color:"#059669", marginBottom:5, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>Customer Name</div>
                  <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${dsForm.name?"rgba(5,150,105,0.50)":"rgba(5,150,105,0.18)"}`, borderRadius:12, padding:"0 12px", height:44, gap:8, boxShadow:dsForm.name?"0 0 0 3px rgba(5,150,105,0.08)":"none", transition:"all 0.2s" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#059669" strokeWidth="2" fill="#059669" fillOpacity="0.1"/><path d="M4 20c0-4 3.58-6 8-6s8 2 8 6" stroke="#059669" strokeWidth="2" strokeLinecap="round"/></svg>
                    <input type="text" value={dsForm.name} onChange={e=>setDsForm(p=>({...p,name:e.target.value}))} placeholder="Your full name"
                      style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit" }}/>
                    {dsForm.name && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.15"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>

                {/* Phone */}
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:8, color:"#059669", marginBottom:5, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>Phone Number</div>
                  <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${dsForm.phone.length===10?"rgba(5,150,105,0.50)":"rgba(5,150,105,0.18)"}`, borderRadius:12, padding:"0 12px", height:44, gap:8, boxShadow:dsForm.phone.length===10?"0 0 0 3px rgba(5,150,105,0.08)":"none", transition:"all 0.2s" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="3" stroke="#059669" strokeWidth="2" fill="#059669" fillOpacity="0.1"/><circle cx="12" cy="18" r="1" fill="#059669"/></svg>
                    <span style={{ fontSize:9, color:"#059669", fontWeight:900 }}>+91</span>
                    <input type="tel" value={dsForm.phone} onChange={e=>setDsForm(p=>({...p,phone:e.target.value.replace(/\D/g,"").slice(0,10)}))} placeholder="10-digit mobile" maxLength={10}
                      style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit" }}/>
                    {dsForm.phone.length===10 && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.15"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>

                {/* Address */}
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:8, color:"#059669", marginBottom:5, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>Full Address</div>
                  <div style={{ background:"#fff", border:`1.5px solid ${dsForm.address?"rgba(5,150,105,0.50)":"rgba(5,150,105,0.18)"}`, borderRadius:12, padding:"10px 12px", boxShadow:dsForm.address?"0 0 0 3px rgba(5,150,105,0.08)":"none", transition:"all 0.2s" }}>
                    <textarea value={dsForm.address} onChange={e=>setDsForm(p=>({...p,address:e.target.value}))} placeholder="House/flat no, Street, Landmark, City"
                      style={{ width:"100%", background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit", minHeight:64, resize:"none", lineHeight:1.5 }}/>
                  </div>
                </div>

                {/* Location */}
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontSize:8, color:"#059669", marginBottom:5, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>Location</div>
                  <button onClick={async()=>{ setDsLocating(true); await sleep(1200); const lat=(12.9716+(Math.random()-0.5)*0.05).toFixed(4); const lng=(77.5946+(Math.random()-0.5)*0.05).toFixed(4); setDsForm(p=>({...p,lat,lng})); setDsLocating(false); }}
                    style={{ width:"100%", background:dsForm.lat?"rgba(5,150,105,0.07)":"#fff", border:`1.5px solid ${dsForm.lat?"rgba(5,150,105,0.45)":"rgba(5,150,105,0.18)"}`, borderRadius:12, padding:"10px 14px", display:"flex", alignItems:"center", gap:10, cursor:"pointer", boxShadow:dsForm.lat?"0 0 0 3px rgba(5,150,105,0.08)":"none", transition:"all 0.2s" }}>
                    {dsLocating ? (
                      <div style={{ width:24, height:24, borderRadius:"50%", border:"2.5px solid #E5E7EB", borderTop:"2.5px solid #059669", animation:"spin 0.7s linear infinite" }}/>
                    ) : (
                      <div style={{ width:36, height:36, borderRadius:10, background:dsForm.lat?"rgba(5,150,105,0.15)":"rgba(5,150,105,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22S5 15.5 5 10a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" stroke="#059669" strokeWidth="2" fill="#059669" fillOpacity="0.15"/><circle cx="12" cy="10" r="3" stroke="#059669" strokeWidth="2" fill="#fff"/></svg>
                      </div>
                    )}
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontSize:10, fontWeight:900, color:dsForm.lat?"#059669":"#1A1035" }}>{dsLocating?"Detecting location…":dsForm.lat?`${dsForm.lat}, ${dsForm.lng}`:"Select My Location"}</div>
                      <div style={{ fontSize:8, color:C.muted }}>{dsForm.lat?"Location captured ✓":"Tap to auto-detect via GPS"}</div>
                    </div>
                    {dsForm.lat && <svg style={{ marginLeft:"auto" }} width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.15"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </button>
                </div>

                <button onClick={()=>setDsStep(1)} disabled={!dsForm.name||dsForm.phone.length<10||!dsForm.address||!dsForm.lat}
                  style={{ width:"100%", background:(!dsForm.name||dsForm.phone.length<10||!dsForm.address||!dsForm.lat)?"rgba(5,150,105,0.15)":"linear-gradient(135deg,#059669,#10B981)", color:(!dsForm.name||dsForm.phone.length<10||!dsForm.address||!dsForm.lat)?"rgba(5,150,105,0.45)":"#fff", border:"none", borderRadius:14, padding:"13px", fontSize:10, fontWeight:900, cursor:"pointer", transition:"all 0.2s", boxShadow:(!dsForm.name||dsForm.phone.length<10||!dsForm.address||!dsForm.lat)?"none":"0 5px 18px rgba(5,150,105,0.38)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                  Next: Withdrawal Amount
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}

            {/* ── STEP 1: Amount + Cash Mode ── */}
            {dsStep === 1 && (() => {
              const amt = Number(dsForm.amount)||0;
              const platFee = amt ? Math.round(amt*0.018) : 0;
              const distKm = dsForm.lat ? Math.round(Math.abs(Number(dsForm.lat)-12.97)*111+Math.abs(Number(dsForm.lng)-77.59)*111*Math.cos(12.97*Math.PI/180)) : 3;
              const doorstepFee = Math.min(200, Math.max(30, distKm*15));
              const total = amt - platFee - doorstepFee;
              return (
                <div style={{ animation:"fadeUp 0.35s ease both" }}>
                  <p style={{ fontSize:9, color:C.muted, marginBottom:12, lineHeight:1.6 }}>Enter the amount you want to withdraw in cash.</p>

                  {/* Amount input */}
                  <div style={{ marginBottom:12 }}>
                    <div style={{ fontSize:8, color:"#059669", marginBottom:5, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>Withdrawal Amount</div>
                    <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`2px solid ${dsForm.amount?"rgba(5,150,105,0.50)":"rgba(5,150,105,0.20)"}`, borderRadius:14, padding:"0 16px", height:54, gap:8, boxShadow:dsForm.amount?"0 0 0 4px rgba(5,150,105,0.08)":"none", transition:"all 0.2s" }}>
                      <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, color:"#059669", fontWeight:900 }}>₹</span>
                      <input type="number" value={dsForm.amount} onChange={e=>setDsForm(p=>({...p,amount:e.target.value}))} placeholder="0"
                        style={{ flex:1, background:"none", border:"none", fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:900, color:"#1A1035", outline:"none" }}/>
                    </div>
                  </div>

                  {/* Preset amounts */}
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
                    {[2000,5000,10000,20000].map(p=>(
                      <button key={p} onClick={()=>setDsForm(f=>({...f,amount:String(p)}))}
                        style={{ padding:"6px 12px", borderRadius:20, background:Number(dsForm.amount)===p?"#059669":"rgba(5,150,105,0.08)", border:`1.5px solid ${Number(dsForm.amount)===p?"#059669":"rgba(5,150,105,0.20)"}`, fontSize:9, fontWeight:900, color:Number(dsForm.amount)===p?"#fff":"#059669", cursor:"pointer", transition:"all 0.2s" }}>
                        ₹{p.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>

                  {/* Fee breakdown */}
                  {amt > 0 && (
                    <div style={{ background:"rgba(5,150,105,0.05)", border:"1px solid rgba(5,150,105,0.15)", borderRadius:12, padding:"10px 12px", marginBottom:14, animation:"fadeUp 0.25s ease both" }}>
                      {[["Amount",`₹${amt.toLocaleString("en-IN")}`],["Platform Fee (1.8%)",`-₹${platFee}`],[`Doorstep Fee (${distKm}km)`,`-₹${doorstepFee}`]].map(([k,v])=>(
                        <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"3px 0" }}>
                          <span style={{ color:C.muted }}>{k}</span><span style={{ color:"#1A1035", fontWeight:900 }}>{v}</span>
                        </div>
                      ))}
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, padding:"6px 0 2px", borderTop:"1px solid rgba(5,150,105,0.15)", marginTop:4 }}>
                        <span style={{ fontWeight:900, color:"#059669" }}>You Receive</span>
                        <span style={{ fontWeight:900, color:"#059669" }}>₹{total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  )}

                  {/* Cash Mode */}
                  <div style={{ marginBottom:14 }}>
                    <div style={{ fontSize:8, color:"#059669", marginBottom:8, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>How to Receive Cash?</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {[
                        { id:"hand", label:"By Hand", desc:"Agent delivers cash directly to you", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 8h-1V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H6a2 2 0 0 0-2 2v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a2 2 0 0 0-2-2z" stroke="#059669" strokeWidth="1.8" fill="#059669" fillOpacity="0.12"/><path d="M9 12h6" stroke="#059669" strokeWidth="1.8" strokeLinecap="round"/></svg> },
                        { id:"neft", label:"NEFT Transfer", desc:"Bank account transfer (2-4 hrs)", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M3 10h18M5 10V21M19 10V21" stroke="#059669" strokeWidth="1.8" strokeLinecap="round"/><path d="M3 10L12 3l9 7H3z" fill="#059669" fillOpacity="0.15" stroke="#059669" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
                        { id:"upi",  label:"UPI Transfer", desc:"Instant transfer to UPI ID", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="3" stroke="#059669" strokeWidth="1.8" fill="#059669" fillOpacity="0.1"/><path d="M2 10h20" stroke="#059669" strokeWidth="1.8"/><circle cx="7" cy="15.5" r="1.5" fill="#059669"/></svg> },
                      ].map(m=>(
                        <button key={m.id} onClick={()=>setDsForm(p=>({...p,cashMode:m.id,upiId:m.id!=="upi"?"":p.upiId}))}
                          style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 13px", background:dsForm.cashMode===m.id?"rgba(5,150,105,0.08)":"#fff", border:`2px solid ${dsForm.cashMode===m.id?"#059669":"rgba(5,150,105,0.18)"}`, borderRadius:13, cursor:"pointer", textAlign:"left", transition:"all 0.2s", boxShadow:dsForm.cashMode===m.id?"0 0 0 3px rgba(5,150,105,0.10)":"none" }}>
                          <div style={{ width:38, height:38, borderRadius:10, background:dsForm.cashMode===m.id?"rgba(5,150,105,0.15)":"rgba(5,150,105,0.06)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            {m.icon}
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:10, fontWeight:900, color:dsForm.cashMode===m.id?"#059669":"#1A1035" }}>{m.label}</div>
                            <div style={{ fontSize:8, color:C.muted }}>{m.desc}</div>
                          </div>
                          <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${dsForm.cashMode===m.id?"#059669":"rgba(5,150,105,0.25)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s" }}>
                            {dsForm.cashMode===m.id&&<div style={{ width:9, height:9, borderRadius:"50%", background:"#059669" }}/>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* UPI ID input */}
                  {dsForm.cashMode==="upi" && (
                    <div style={{ marginBottom:12, animation:"fadeUp 0.25s ease both" }}>
                      <div style={{ fontSize:8, color:"#059669", marginBottom:5, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>UPI ID</div>
                      <input value={dsForm.upiId} onChange={e=>setDsForm(p=>({...p,upiId:e.target.value}))} placeholder="yourname@upi"
                        style={{ width:"100%", background:"#fff", border:`1.5px solid ${dsForm.upiId?"rgba(5,150,105,0.45)":"rgba(5,150,105,0.18)"}`, borderRadius:12, padding:"10px 14px", fontSize:10, color:"#1A1035", outline:"none", fontFamily:"inherit" }}/>
                    </div>
                  )}

                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>setDsStep(0)} style={{ flex:0.6, background:"rgba(5,150,105,0.07)", border:"1.5px solid rgba(5,150,105,0.20)", borderRadius:13, padding:"12px", fontSize:9, fontWeight:900, color:"#059669", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back
                    </button>
                    <button onClick={()=>setDsStep(2)} disabled={!dsForm.amount||!dsForm.cashMode||(dsForm.cashMode==="upi"&&!dsForm.upiId)}
                      style={{ flex:1, background:(!dsForm.amount||!dsForm.cashMode)?"rgba(5,150,105,0.15)":"linear-gradient(135deg,#059669,#10B981)", color:(!dsForm.amount||!dsForm.cashMode)?"rgba(5,150,105,0.45)":"#fff", border:"none", borderRadius:13, padding:"12px", fontSize:10, fontWeight:900, cursor:"pointer", transition:"all 0.2s", boxShadow:(!dsForm.amount||!dsForm.cashMode)?"none":"0 5px 16px rgba(5,150,105,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                      Review & Confirm
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* ── STEP 2: Confirm & Book ── */}
            {dsStep === 2 && (() => {
              const amt = Number(dsForm.amount)||0;
              const platFee = Math.round(amt*0.018);
              const distKm = dsForm.lat ? Math.round(Math.abs(Number(dsForm.lat)-12.97)*111) : 3;
              const doorstepFee = Math.min(200,Math.max(30,distKm*15));
              const total = amt - platFee - doorstepFee;
              const PROMO_CODES = { "ZEROFEE":{ disc:platFee, label:"Zero platform fee!" }, "DOOR10":{ disc:Math.round(doorstepFee*0.1), label:"10% off doorstep fee" }, "FIRST50":{ disc:50, label:"₹50 welcome discount" } };
              const pc = dsForm.promoApplied;
              return (
                <div style={{ animation:"fadeUp 0.35s ease both" }}>

                  {/* Summary card */}
                  <div style={{ background:"#fff", borderRadius:16, border:"1.5px solid rgba(5,150,105,0.18)", padding:"14px", marginBottom:12, boxShadow:"0 3px 14px rgba(5,150,105,0.08)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#059669" strokeWidth="2" fill="#059669" fillOpacity="0.1"/><path d="M8 8h8M8 12h8M8 16h5" stroke="#059669" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035" }}>Booking Summary</span>
                    </div>
                    {[
                      ["Customer", dsForm.name],
                      ["Phone", "+91 "+dsForm.phone],
                      ["Address", dsForm.address.slice(0,30)+(dsForm.address.length>30?"…":"")],
                      ["Amount", "₹"+amt.toLocaleString("en-IN")],
                      ["Cash Mode", dsForm.cashMode==="hand"?"🤝 By Hand":dsForm.cashMode==="neft"?"🏛️ NEFT":"📲 UPI"],
                    ].map(([k,v])=>(
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"6px 0", borderBottom:"1px solid rgba(5,150,105,0.07)" }}>
                        <span style={{ color:C.muted }}>{k}</span>
                        <span style={{ fontWeight:900, color:"#1A1035", maxWidth:"55%", textAlign:"right" }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, padding:"8px 0 2px", marginTop:2 }}>
                      <span style={{ fontWeight:900, color:"#059669" }}>You Receive</span>
                      <span style={{ fontWeight:900, color:"#059669" }}>₹{(total-(pc?pc.disc:0)).toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Promo code */}
                  <div style={{ marginBottom:12 }}>
                    <div style={{ fontSize:8, color:"#059669", marginBottom:5, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase" }}>Promo Code (Optional)</div>
                    <div style={{ display:"flex", gap:8 }}>
                      <input value={dsForm.promoCode} onChange={e=>setDsForm(p=>({...p,promoCode:e.target.value.toUpperCase()}))} placeholder="Enter code"
                        style={{ flex:1, background:"#fff", border:"1.5px solid rgba(5,150,105,0.20)", borderRadius:11, padding:"9px 12px", fontSize:10, color:"#1A1035", outline:"none", fontFamily:"inherit" }}/>
                      <button onClick={()=>{ const p=PROMO_CODES[dsForm.promoCode]; setDsForm(f=>({...f,promoApplied:p||null})); }}
                        style={{ padding:"9px 14px", background:"linear-gradient(135deg,#059669,#10B981)", border:"none", borderRadius:11, fontSize:9, fontWeight:900, color:"#fff", cursor:"pointer" }}>Apply</button>
                    </div>
                    {dsForm.promoApplied && (
                      <div style={{ marginTop:6, padding:"6px 10px", background:"rgba(5,150,105,0.09)", borderRadius:8, fontSize:8, color:"#059669", fontWeight:900, display:"flex", alignItems:"center", gap:5, animation:"fadeUp 0.25s ease both" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.2"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {dsForm.promoApplied.label} · Saving ₹{dsForm.promoApplied.disc}
                      </div>
                    )}
                  </div>

                  {/* T&C notice */}
                  <div style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", background:"rgba(5,150,105,0.05)", borderRadius:10, border:"1px solid rgba(5,150,105,0.15)", marginBottom:12 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, marginTop:1 }}><circle cx="12" cy="12" r="9" stroke="#059669" strokeWidth="2" fill="#059669" fillOpacity="0.12"/><line x1="12" y1="11" x2="12" y2="16" stroke="#059669" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="#059669"/></svg>
                    <span style={{ fontSize:8, color:"#374151", lineHeight:1.6 }}>
                      By confirming, you agree to S3Payments{" "}
                      <span style={{ color:"#059669", fontWeight:900 }}>Terms & Conditions</span>.
                      {" "}Agent will arrive within 30–60 minutes. Service charges are non-refundable once the agent is dispatched.
                    </span>
                  </div>

                  {/* Back + Swipe row */}
                  <div style={{ display:"flex", gap:8, alignItems:"stretch" }}>
                    <button onClick={()=>setDsStep(1)} style={{ flexShrink:0, width:42, background:"rgba(5,150,105,0.07)", border:"1.5px solid rgba(5,150,105,0.22)", borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <div style={{ flex:1 }}>
                      <SwipeBtn onSubmit={()=>{
                        const id = "DS"+Math.random().toString(36).substr(2,8).toUpperCase();
                        const booking = { id, name:dsForm.name, phone:dsForm.phone, address:dsForm.address, lat:dsForm.lat, lng:dsForm.lng, amount:dsForm.amount, cashMode:dsForm.cashMode, upiId:dsForm.upiId, promoCode:dsForm.promoCode, status:"pending_agent", bookedAt:new Date().toLocaleString("en-IN"), agentId:null, agentName:null };
                        window.__doorstepBookings = [...(window.__doorstepBookings||[]), booking];
                        setBooking(booking);
                        setDsStep(3);
                      }} label="Swipe to Confirm Booking" successLabel="✅ Booked!" color1="#059669" color2="#10B981" />
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── STEP 3: Booked ── */}
            {dsStep === 3 && (() => (
              <div style={{ textAlign:"center", animation:"scaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both" }}>
                {/* Success icon */}
                <div style={{ width:70, height:70, borderRadius:"50%", background:"linear-gradient(135deg,#D1FAE5,#A7F3D0)", border:"3px solid #059669", display:"flex", alignItems:"center", justifyContent:"center", margin:"8px auto 14px", boxShadow:"0 8px 24px rgba(5,150,105,0.30)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:14, color:"#059669", marginBottom:4 }}>Booking Confirmed!</div>
                <div style={{ fontSize:9, color:C.muted, marginBottom:16, lineHeight:1.6 }}>A nearby agent will be assigned shortly and will call you to confirm.</div>

                <div style={{ background:"#fff", borderRadius:14, border:"1.5px solid rgba(5,150,105,0.18)", padding:"12px 14px", marginBottom:14, textAlign:"left", boxShadow:"0 3px 14px rgba(5,150,105,0.08)" }}>
                  {[["Booking ID",booking?.id||"DS—"],["Name",dsForm.name],["Phone",dsForm.phone],["Amount","₹"+Number(dsForm.amount).toLocaleString("en-IN")],["Status","⏳ Pending Agent Assignment"],["Time",booking?.bookedAt||"—"]].map(([k,v])=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"5px 0", borderBottom:"1px solid rgba(5,150,105,0.08)" }}>
                      <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:900, color:k==="Status"?"#D97706":"#1A1035" }}>{v}</span>
                    </div>
                  ))}
                </div>

                <button onClick={()=>{ setView("roles"); setDsStep(0); setDsForm({ name:"", phone:"", address:"", lat:null, lng:null, amount:"", cashMode:"", upiId:"", promoCode:"", promoApplied:null, agreed:false }); }}
                  style={{ width:"100%", background:"linear-gradient(135deg,#059669,#0891B2)", color:"#fff", border:"none", borderRadius:13, padding:"13px", fontSize:10, fontWeight:900, cursor:"pointer", boxShadow:"0 5px 18px rgba(5,150,105,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Back to Home
                </button>
              </div>
            ))()}

          </div>
        </div>
      )}

      {/* ── VIEW: Customer Track — Enter Mobile ── */}
      {view === "customerTrack" && (
        <CustomerTrackView
          dsLoginMobile={dsLoginMobile}
          trackMobile={trackMobile}
          setTrackMobile={setTrackMobile}
          goBack={goBack}
          setView={setView}
          setDsStep={setDsStep}
          error={error}
          loading={loading}
          setError={setError}
          setLoading={setLoading}
        />
      )}

      {/* ── VIEW: Customer OTP Verification ── */}
      {view === "customerOtp" && (() => {
        const verifyTrack = async (code) => {
          setError(""); setLoading(true); await sleep(700);
          if (code === "123456") {
            setLoading(false);
            onLogin({ role:"customerTrack", name: trackCustomer?.name||"Customer", mobile:trackMobile, bookings: trackCustomer?.bookings||[] });
          } else {
            setLoading(false);
            setError("Wrong OTP. Please try again.");
            setTrackOtp(["","","","","",""]);
            setTimeout(() => trackOtpRefs.current[0]?.focus(), 100);
          }
        };
        return (
          <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"transparent" }}>
            <div style={{ background:"linear-gradient(135deg,#7C3AED,#0891B2)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0, transform:"translateZ(0)", willChange:"transform" }}>
              <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Verify OTP</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)" }}>Sent to +91 {trackMobile} · Demo: 123456</div>
              <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"20px 16px 16px" }}>
              <div style={{ textAlign:"center", marginBottom:18 }}>
                <div style={{ fontSize:9, color:"#9CA3AF" }}>Enter the 6-digit code sent to</div>
                <div style={{ fontSize:11, fontWeight:900, color:"#1A1035", marginTop:3 }}>+91 {trackMobile}</div>
              </div>
              <div style={{ display:"flex", gap:10, marginBottom:16, justifyContent:"center" }}>
                {trackOtp.map((v,i) => (
                  <input key={i} ref={el=>trackOtpRefs.current[i]=el} value={v}
                    autoComplete="one-time-code" inputMode="numeric" maxLength={1} type="tel"
                    onChange={e => {
                      if (!/^\d*$/.test(e.target.value)) return;
                      if (e.target.value.length === 6) {
                        const digits = e.target.value.split("");
                        setTrackOtp(digits);
                        trackOtpRefs.current[5]?.focus();
                        setTimeout(() => verifyTrack(digits.join("")), 300);
                        return;
                      }
                      const next=[...trackOtp]; next[i]=e.target.value.slice(-1); setTrackOtp(next);
                      if(e.target.value&&i<5) trackOtpRefs.current[i+1]?.focus();
                      if(!e.target.value&&i>0) trackOtpRefs.current[i-1]?.focus();
                      if (i === 5 && e.target.value) {
                        const code = next.join("");
                        if (code.length === 6) setTimeout(() => verifyTrack(code), 150);
                      }
                    }}
                    style={{ width:44, height:54, textAlign:"center", background:"#fff", border:`2px solid ${v?"#7C3AED":"rgba(124,58,237,0.15)"}`, borderRadius:12, color:"#1A1035", fontSize:16, fontWeight:900, outline:"none", boxShadow:v?"0 0 0 3px rgba(124,58,237,0.10)":"none", transition:"all 0.15s", willChange:"transform" }} />
                ))}
              </div>
              <ErrBox />
              <SwipeBtn key={`cotpotp-${error}`} disabled={trackOtp.join("").length<6||loading}
                onSubmit={() => verifyTrack(trackOtp.join(""))}
                label="Swipe to View My Requests" successLabel="✅ Loading history..."
                color1="#7C3AED" color2="#059669" />
            </div>
          </div>
        );
      })()}

      {/* ── VIEW: Admin — Choose Login Method ── */}
      {view === "adminChoice" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%", animation:"slideIn 0.35s ease both" }}>

          {/* ── Hero header — gradient band ── */}
          <div style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", padding:"14px 16px 18px", position:"relative", overflow:"hidden" }}>
            {/* back button */}
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginBottom:10 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {/* Logo */}
            <div style={{ marginBottom:8 }}>
              <S3Logo variant="light" size="sm" />
            </div>
            {/* Title row */}
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", letterSpacing:"-0.3px" }}>
                  Admin Login
                  <span style={{ marginLeft:5, fontSize:13 }}>👑</span>
                </div>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.72)", marginTop:2 }}>Choose how to sign in</div>
              </div>
            </div>
            {/* Decorative orb */}
            <div style={{ position:"absolute", right:-20, top:-20, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", right:20, top:30, width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />
          </div>

          {/* ── Sign-in options — fill remaining space ── */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"14px 14px 10px", gap:10 }}>

            <button onClick={() => setView("adminMobileLogin")} style={{
              background:"linear-gradient(135deg,#7B3FE4,#9B5FFF)",
              border:"none", borderRadius:14, padding:"11px 13px",
              display:"flex", alignItems:"center", gap:10, cursor:"pointer",
              boxShadow:"0 5px 18px rgba(123,63,228,0.38)", textAlign:"left", width:"100%",
            }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="3" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.2"/><circle cx="12" cy="18" r="1" fill="#fff"/><path d="M10 6h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#fff", marginBottom:1 }}>Login with Mobile</div>
                <div style={{ fontSize:8, color:"rgba(255,255,255,0.72)" }}>Mobile number + OTP verification</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.18)"/><path d="M10 8l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <button onClick={() => setView("admin")} style={{
              background:"linear-gradient(135deg,#0891B2,#06B6D4)",
              border:"none", borderRadius:14, padding:"11px 13px",
              display:"flex", alignItems:"center", gap:10, cursor:"pointer",
              boxShadow:"0 5px 18px rgba(8,145,178,0.32)", textAlign:"left", width:"100%",
            }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="3" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.15"/><circle cx="9" cy="11" r="2.5" fill="#fff" opacity="0.9"/><path d="M14 9h4M14 13h3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/><path d="M5 17c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#fff", marginBottom:1 }}>Login with User ID</div>
                <div style={{ fontSize:8, color:"rgba(255,255,255,0.72)" }}>User ID + Password</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.18)"/><path d="M10 8l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

          </div>
        </div>
      )}

      {/* ── VIEW: Admin — Username + Password ── */}
      {view === "admin" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
          <div style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Admin Login 👑</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.72)" }}>Username & Password</div>
            <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 10px" }}>

          <Input label="USERNAME" placeholder="admin" value={username} onChange={setUsername} />
          <Input label="PASSWORD" placeholder="••••••••" value={password} onChange={setPassword} type="password" />
          <ErrBox />
          <div style={{ fontSize:9, color:C.muted, marginBottom:8, padding:"7px 10px", background:"rgba(109,40,217,0.05)", borderRadius:9, border:"1px solid rgba(109,40,217,0.10)" }}>
            💡 Demo: <strong>admin / admin123</strong>
          </div>
            <SwipeBtn key={`admin-${error}-${username}-${password}`} disabled={!username||!password||loading} onSubmit={handleAdminLogin} label="Swipe to Login as Admin 👑" successLabel="✅ Logging in..." color1="#6D28D9" color2="#0891B2" />
          </div>
        </div>
      )}

      {/* ── VIEW: Admin — Mobile Login ── */}
      {view === "adminMobileLogin" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
          <div style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Admin Mobile Login</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.72)" }}>Enter your registered admin mobile number</div>
            <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 10px" }}>

          <div style={{ marginBottom:6 }}>
            <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900, letterSpacing:"0.04em" }}>MOBILE NUMBER</div>
            <div style={{ display:"flex", alignItems:"center", background:"#F9F8FF", border:`1.5px solid ${adminMobile?"rgba(109,40,217,0.40)":"rgba(109,40,217,0.18)"}`, borderRadius:10, padding:"0 12px", height:38, gap:6 }}>
              <span style={{ fontSize:9, color:C.muted, fontWeight:900 }}>+91</span>
              <input type="tel" value={adminMobile} onChange={e => setAdminMobile(e.target.value.replace(/\D/g,"").slice(0,10))}
                placeholder="9000000001" maxLength={10}
                style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:9, outline:"none" }} />
              {adminMobile.length===10 && <span style={{ color:C.success, fontSize:9 }}>✓</span>}
            </div>
          </div>
          <div style={{ fontSize:9, color:C.muted, marginBottom:8, padding:"7px 10px", background:"rgba(109,40,217,0.05)", borderRadius:9, border:"1px solid rgba(109,40,217,0.10)" }}>
            💡 Demo mobile: <strong>9000000001</strong>
          </div>
          <ErrBox />
            <SwipeBtn key={`adminmob-${error}-${adminMobile}`} disabled={adminMobile.length!==10||loading} onSubmit={handleAdminMobileSend} label="Swipe to Send OTP" successLabel="📲 OTP Sent!" color1="#6D28D9" color2="#0891B2" />
          </div>
        </div>
      )}

      {/* ── VIEW: Admin — OTP Verification ── */}
      {view === "adminOtp" && (
        <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"transparent" }}>
          <div style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", padding:"12px 14px 16px", position:"relative", overflow:"hidden", flexShrink:0, transform:"translateZ(0)", willChange:"transform" }}>
            <button onClick={goBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:9, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div style={{ marginBottom:8 }}><S3Logo variant="light" size="sm" /></div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff", marginBottom:3 }}>Verify OTP</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)" }}>Sent to +91 {adminMobile} · Demo: 123456</div>
            <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"20px 16px 16px" }}>
            <div style={{ textAlign:"center", marginBottom:18 }}>
              <div style={{ fontSize:9, color:"#9CA3AF" }}>Enter the 6-digit code sent to</div>
              <div style={{ fontSize:11, fontWeight:900, color:"#1A1035", marginTop:3 }}>+91 {adminMobile}</div>
            </div>
            <div style={{ display:"flex", gap:10, marginBottom:16, justifyContent:"center" }}>
              {adminOtp.map((v,i) => (
                <input key={i} ref={el=>adminOtpRefs.current[i]=el} value={v} onChange={e=>handleAdminOtpChange(i,e.target.value)}
                  maxLength={1} type="tel" autoComplete="one-time-code" inputMode="numeric"
                  style={{ width:44, height:54, textAlign:"center", background:"#fff", border:`2px solid ${v?"#6D28D9":"rgba(109,40,217,0.15)"}`, borderRadius:12, color:"#1A1035", fontSize:16, fontWeight:900, outline:"none", boxShadow:v?"0 0 0 3px rgba(109,40,217,0.10)":"none", transition:"all 0.15s", willChange:"transform" }} />
              ))}
            </div>
            <ErrBox />
            <SwipeBtn key={`adminotp-${error}`} disabled={adminOtp.join("").length<6||loading} onSubmit={handleAdminMobileVerify} label="Swipe to Login" successLabel="✅ Logging in!" color1="#6D28D9" color2="#0891B2" />
          </div>
        </div>
      )}
      </div>{/* end scrollable views */}

      {/* ── FOOTER: Only on role selection page ── */}
      {view === "roles" && (
        <div style={{ flexShrink:0, zIndex:10, background:"transparent", paddingBottom:8 }}>
          <PaymentLogosStrip theme="light" size="xxxs" />
          {/* Copyright strip */}
          <div style={{ textAlign:"center", paddingTop:4, paddingBottom:2 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#C4C9D4" strokeWidth="2"/>
                <path d="M14.5 9.5A3.5 3.5 0 1 0 14.5 14.5" stroke="#C4C9D4" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize:7, color:"#C4C9D4", fontWeight:700, letterSpacing:"0.04em" }}>
                {new Date().getFullYear()} S3Payments. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ─── PASSWORD FIELD ROW (with show/hide toggle) ─────────────────────────────
const PasswordFieldRow = ({ fieldKey, label, icon, secret, value, editingField, editValue, setEditValue, onEdit, onSave, onCancel }) => {
  const [showSecret, setShowSecret] = useState(false);
  const isEditing = editingField === fieldKey;
  const displayValue = secret && !showSecret && value
    ? "•".repeat(Math.min(value.length || 8, 12))
    : (value || "—");

  return (
    <div style={{ borderBottom:`1px solid ${C.border}`, padding:"8px 0" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:9, color:C.muted, marginBottom:2, display:"flex", alignItems:"center", gap:4 }}>
            <span>{icon}</span>{label}
            {secret && value && (
              <button onClick={() => setShowSecret(s=>!s)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:9, color:C.accent, fontWeight:900, padding:"0 3px" }}>
                {showSecret ? "🙈 Hide" : "👁 Show"}
              </button>
            )}
          </div>
          {isEditing ? (
            <div style={{ display:"flex", gap:6, alignItems:"center", marginTop:4 }}>
              <input
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                autoFocus
                type={secret ? "text" : "text"}
                style={{ flex:1, background:"#F9F8FF", border:"1.5px solid #6D28D9", borderRadius:7, padding:"5px 8px", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit" }}
              />
              <button onClick={onSave} style={{ background:"linear-gradient(135deg,#059669,#10B981)", color:"#fff", border:"none", borderRadius:7, padding:"5px 10px", fontSize:9, fontWeight:900, cursor:"pointer" }}>Save</button>
              <button onClick={onCancel} style={{ background:"rgba(225,29,72,0.10)", color:C.danger, border:"none", borderRadius:7, padding:"5px 8px", fontSize:9, fontWeight:900, cursor:"pointer" }}>✕</button>
            </div>
          ) : (
            <div style={{ fontSize:9, fontWeight:900, color: secret && !showSecret && value ? C.muted : "#1A1035", marginTop:2, fontFamily: secret && !showSecret && value ? "monospace" : "inherit", letterSpacing: secret && !showSecret && value ? "0.08em" : "normal" }}>
              {displayValue}
            </div>
          )}
        </div>
        {!isEditing && (
          <button onClick={onEdit} style={{ background:"rgba(109,40,217,0.08)", border:"1px solid rgba(109,40,217,0.20)", color:"#6D28D9", borderRadius:7, padding:"4px 10px", fontSize:9, fontWeight:900, cursor:"pointer", flexShrink:0, marginLeft:8 }}>✏️ Edit</button>
        )}
      </div>
    </div>
  );
};

// ─── CUSTOMER TRACK SCREEN ───────────────────────────────────────────────────
const CustomerTrackScreen = ({ user, onBack }) => {
  const [selBooking, setSelBooking] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const refresh = () => {
      const all = window.__doorstepBookings || [];
      const mine = all.filter(b => b.phone === user?.mobile);
      setBookings([...mine]);
    };
    refresh();
    const iv = setInterval(refresh, 2000);
    return () => clearInterval(iv);
  }, [user]);

  const STATUS_LABELS = {
    pending_agent:            { label:"⏳ Pending Assignment", color:C.warning,  desc:"Admin is assigning an agent to your request" },
    agent_assigned:           { label:"🔔 Agent Assigned",    color:"#0891B2",  desc:"An agent has been assigned and will contact you" },
    agent_approved:           { label:"🚀 Agent En Route",    color:"#6D28D9",  desc:"Agent approved your request and is heading to you" },
    pending_customer_confirm: { label:"📲 Awaiting Your Confirmation", color:"#D97706", desc:"Transfer done — please confirm receipt" },
    completed:                { label:"✅ Completed",          color:C.success,  desc:"Your request is completed and ticket is closed" },
  };

  // Booking detail view
  if (selBooking) {
    const st = STATUS_LABELS[selBooking.status] || { label:"⏳ Pending", color:C.warning, desc:"Processing" };
    return (
      <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
        <NavBar title="Request Details" onBack={() => setSelBooking(null)} />
        <div style={{ padding:"9px 11px" }}>
          {/* Status card */}
          <div style={{ background:`linear-gradient(135deg,${st.color},${st.color}bb)`, borderRadius:14, padding:"10px 13px", marginBottom:8, color:"#fff" }}>
            <div style={{ fontSize:9, opacity:0.85, marginBottom:3 }}>{selBooking.id}</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, marginBottom:4 }}>{st.label}</div>
            <div style={{ fontSize:9, opacity:0.88 }}>{st.desc}</div>
          </div>

          {/* Timeline — animated steps */}
          <Card style={{ marginBottom:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:14 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#059669" strokeWidth="2" fill="#059669" fillOpacity="0.12"/><path d="M3 9h18" stroke="#059669" strokeWidth="2"/><circle cx="7" cy="6" r="1" fill="#059669"/><circle cx="17" cy="6" r="1" fill="#059669"/></svg>
              <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035" }}>Request Timeline</span>
            </div>
            {[
              {
                done:true,
                active:!selBooking.agentAssigned,
                label:"Booking Created",
                time:selBooking.bookedAt,
                svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="#fff" fillOpacity="0.2"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              },
              {
                done:!!selBooking.agentAssigned,
                active:!!selBooking.agentAssigned && !selBooking.agentApprovedAt,
                label:"Agent Assigned",
                time:selBooking.agentAssigned||"Pending",
                svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.25"/><path d="M4 20c0-4 3.58-6 8-6s8 2 8 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              },
              {
                done:!!selBooking.agentApprovedAt,
                active:!!selBooking.agentApprovedAt && !selBooking.transferDoneAt,
                label:"Agent Approved",
                time:selBooking.agentApprovedAt||"Pending",
                svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.2"/><path d="M7.5 12.5l3 3 6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              },
              {
                done:!!selBooking.transferDoneAt,
                active:!!selBooking.transferDoneAt && selBooking.customerConfirmed!==true,
                label:"Cash Transfer Done",
                time:selBooking.transferDoneAt||"Pending",
                svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="3" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.2"/><path d="M2 10h20" stroke="#fff" strokeWidth="2"/><circle cx="7" cy="15.5" r="1.5" fill="#fff"/></svg>
              },
              {
                done:selBooking.customerConfirmed===true,
                active:selBooking.customerConfirmed===true && selBooking.status!=="completed",
                label:"You Confirmed Receipt",
                time:selBooking.customerConfirmed?selBooking.completedAt||"Done":"Pending",
                svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              },
              {
                done:selBooking.status==="completed",
                active:false,
                label:"Ticket Closed",
                time:selBooking.status==="completed"?selBooking.completedAt||"Done":"Pending",
                svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" fill="#fff" fillOpacity="0.25"/></svg>
              },
            ].map((step, i, arr) => (
              <div key={i} style={{ display:"flex", gap:12, position:"relative", animation:`fadeUp 0.4s ${i*0.08}s ease both` }}>
                {/* Left: icon + connector */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0, width:36 }}>
                  {/* Step circle */}
                  <div style={{
                    width:36, height:36, borderRadius:"50%", flexShrink:0,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background: step.done
                      ? "linear-gradient(135deg,#059669,#10B981)"
                      : step.active
                        ? "linear-gradient(135deg,#D97706,#F59E0B)"
                        : "rgba(0,0,0,0.06)",
                    border: step.done
                      ? "2.5px solid rgba(5,150,105,0.30)"
                      : step.active
                        ? "2.5px solid rgba(217,119,6,0.40)"
                        : "2px solid rgba(0,0,0,0.10)",
                    boxShadow: step.done
                      ? "0 3px 12px rgba(5,150,105,0.30)"
                      : step.active
                        ? "0 3px 12px rgba(217,119,6,0.25), 0 0 0 5px rgba(217,119,6,0.10)"
                        : "none",
                    transition:"all 0.4s ease",
                    animation: step.active ? "glowPulse 1.8s ease-in-out infinite" : "none",
                  }}>
                    {step.done || step.active ? step.svg : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill="rgba(0,0,0,0.20)"/></svg>
                    )}
                  </div>
                  {/* Connector line */}
                  {i < arr.length-1 && (
                    <div style={{ width:2, flex:1, minHeight:18, marginTop:3, borderRadius:2, position:"relative", background:"rgba(0,0,0,0.07)", overflow:"hidden" }}>
                      {step.done && (
                        <div style={{ position:"absolute", top:0, left:0, right:0, background:"linear-gradient(to bottom,#059669,#10B981)", animation:"growDown 0.5s 0.2s ease both", transformOrigin:"top" }}
                          className="timeline-fill"/>
                      )}
                    </div>
                  )}
                </div>

                {/* Right: label + time */}
                <div style={{ flex:1, paddingTop:7, paddingBottom:i < arr.length-1 ? 16 : 6 }}>
                  <div style={{
                    fontSize:10, fontWeight:900,
                    color: step.done ? "#1A1035" : step.active ? "#D97706" : "#9CA3AF",
                    marginBottom:2,
                  }}>{step.label}</div>
                  <div style={{ fontSize:8, color: step.done||step.active ? C.muted : "#C4C9D4" }}>
                    {step.time === "Pending" ? (
                      <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                        <span style={{ width:6, height:6, borderRadius:"50%", background: step.active ? "#D97706" : "rgba(0,0,0,0.15)", display:"inline-block", animation: step.active ? "pulse 1.2s ease-in-out infinite" : "none" }}/>
                        Pending
                      </span>
                    ) : step.time}
                  </div>
                </div>
              </div>
            ))}
          </Card>

          {/* Booking details */}
          <Card style={{ marginBottom:10 }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:8 }}>📋 Booking Details</div>
            {[
              ["Amount",    "₹"+Number(selBooking.amount).toLocaleString("en-IN")],
              ["Cash Mode", selBooking.cashMode==="hand"?"🤝 By Hand":selBooking.cashMode==="neft"?"🏛️ NEFT":"📲 UPI"],
              selBooking.upiId && ["UPI ID", selBooking.upiId],
              ["Address",   selBooking.address],
              ["Promo",     selBooking.promoCode||"—"],
              ["Agent",     selBooking.agentAssigned||"Not yet assigned"],
            ].filter(Boolean).map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:`1px solid ${C.border}`, fontSize:9 }}>
                <span style={{ color:C.muted }}>{k}</span>
                <span style={{ fontWeight:900, color:"#1A1035", textAlign:"right", maxWidth:"60%" }}>{v}</span>
              </div>
            ))}
          </Card>

          {/* Signature (if captured) */}
          {selBooking.customerSignature && (
            <Card>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#059669", marginBottom:6 }}>✍️ Your Receipt Signature</div>
              <img src={selBooking.customerSignature} alt="Your signature" style={{ width:"100%", maxHeight:70, objectFit:"contain", background:"#F9F8FF", borderRadius:8, border:"1px solid rgba(5,150,105,0.20)" }} />
            </Card>
          )}
        </div>
      </div>
    );
  }

  // List view
  return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <div style={{ background:"linear-gradient(135deg,#7C3AED,#0891B2)", padding:"10px 13px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#fff" }}>Hello, {user?.name||"Customer"} 👋</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)", marginTop:1 }}>Your Doorstep Withdrawal History</div>
        </div>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.30)", color:"#fff", borderRadius:9, padding:"6px 12px", fontSize:9, fontWeight:900, cursor:"pointer" }}>Logout</button>
      </div>
      <div style={{ padding:"9px 11px" }}>
        {bookings.length === 0 ? (
          <div style={{ textAlign:"center", padding:"40px 16px" }}>
            <div style={{ fontSize:9, marginBottom:8 }}>📭</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>No bookings found</div>
            <div style={{ fontSize:9, color:C.muted, marginTop:3 }}>No doorstep requests found for {user?.mobile}</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize:9, color:C.muted, marginBottom:10 }}>{bookings.length} request{bookings.length!==1?"s":""} found for +91 {user?.mobile}</div>
            {bookings.map(b => {
              const st = STATUS_LABELS[b.status]||{ label:"⏳ Pending", color:C.warning };
              return (
                <button key={b.id} onClick={() => setSelBooking({...b})} style={{ width:"100%", background:"none", border:"none", padding:"0 0 8px", cursor:"pointer", textAlign:"left" }}>
                  <Card style={{ padding:"11px 13px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${st.color},${st.color}99)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9, flexShrink:0 }}>💰</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>₹{Number(b.amount).toLocaleString("en-IN")} — {b.cashMode==="hand"?"By Hand":b.cashMode==="neft"?"NEFT":"UPI"}</div>
                        <div style={{ fontSize:9, color:C.muted }}>{b.bookedAt}</div>
                        <div style={{ fontSize:9, color:C.muted, marginTop:1 }}>{b.id}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <Chip label={st.label} color={st.color} />
                        <div style={{ fontSize:9, color:st.color, marginTop:3, fontWeight:900 }}>View →</div>
                      </div>
                    </div>
                  </Card>
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

// ─── ADMIN DOORSTEP TAB COMPONENT ───────────────────────────────────────────
const AdminDoorstepTab = () => {
  const [selBooking, setSelBooking] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Reload from window on every render
  useEffect(() => {
    const refresh = () => setBookings([...(window.__doorstepBookings || [])]);
    refresh();
    const interval = setInterval(refresh, 1500);
    return () => clearInterval(interval);
  }, []);

  const updateBooking = (updated) => {
    const idx = (window.__doorstepBookings||[]).findIndex(b=>b.id===selBooking.id);
    if(idx>=0) window.__doorstepBookings[idx] = updated;
    setSelBooking(updated);
    setBookings([...(window.__doorstepBookings||[])]);
  };

  if (selBooking) {
  const statusCfg = {
    pending_agent:           { label:"Pending Assignment",   color:"#D97706", bg:"linear-gradient(135deg,#FEF3C7,#FDE68A)", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="2" fill="#D97706" fillOpacity="0.15"/><path d="M12 7v5l3 2" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/></svg>, desc:"Waiting for agent assignment" },
    agent_assigned:          { label:"Agent Assigned",       color:"#0891B2", bg:"linear-gradient(135deg,#E0F2FE,#BAE6FD)", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#0891B2" strokeWidth="2" fill="#0891B2" fillOpacity="0.15"/><path d="M4 20c0-4 3.58-6 8-6s8 2 8 6" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/></svg>, desc:"Agent is heading to customer" },
    agent_approved:          { label:"In Progress",          color:"#6D28D9", bg:"linear-gradient(135deg,#EDE9FE,#DDD6FE)", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 8l4 4-4 4" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, desc:"Agent on site processing" },
    pending_customer_confirm:{ label:"Awaiting Confirmation",color:"#0891B2", bg:"linear-gradient(135deg,#E0F2FE,#BAE6FD)", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="3" stroke="#0891B2" strokeWidth="2" fill="#0891B2" fillOpacity="0.12"/><circle cx="12" cy="18" r="1" fill="#0891B2"/></svg>, desc:"Waiting for customer to confirm receipt" },
    completed:               { label:"Completed",            color:"#059669", bg:"linear-gradient(135deg,#D1FAE5,#A7F3D0)", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.2" stroke="#059669" strokeWidth="2"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, desc:"Ticket closed successfully" },
  };
  const st = statusCfg[selBooking.status] || statusCfg.pending_agent;
  return (
    <div style={{ animation:"slideIn 0.3s ease both" }}>

      {/* ── Header ── */}
      <div style={{ marginBottom:12 }}>
        <button onClick={() => setSelBooking(null)} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.22)", borderRadius:22, padding:"6px 14px 6px 10px", cursor:"pointer", marginBottom:10, width:"fit-content", boxShadow:"0 2px 8px rgba(109,40,217,0.10)" }}>
          <div style={{ width:22, height:22, borderRadius:7, background:"rgba(109,40,217,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>Doorstep List</span>
        </button>
        <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#1A1035" }}>Booking Detail</span>
      </div>

      {/* ── Status banner ── */}
      <div style={{ background:st.bg, borderRadius:14, padding:"12px 14px", marginBottom:12, display:"flex", alignItems:"center", gap:10, border:`1.5px solid ${st.color}30` }}>
        <div style={{ width:36, height:36, borderRadius:10, background:`${st.color}20`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{st.icon}</div>
        <div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:st.color }}>{st.label}</div>
          <div style={{ fontSize:8, color:st.color, opacity:0.75, marginTop:1 }}>{selBooking.id} · {st.desc}</div>
        </div>
      </div>

      {/* ── Customer Details card ── */}
      <div style={{ background:"#fff", borderRadius:14, border:"1px solid rgba(0,0,0,0.07)", padding:"12px 14px", marginBottom:10, boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#6D28D9" strokeWidth="2" fill="#6D28D9" fillOpacity="0.12"/><path d="M4 20c0-4 3.58-6 8-6s8 2 8 6" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" fill="#6D28D9" fillOpacity="0.08"/></svg>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035" }}>Customer Details</span>
        </div>
        {(selBooking.type==="cashDeposit" ? [
          { iconName:"tag",       color:"#6D28D9", label:"Booking ID",      value:selBooking.id, mono:true },
          { iconName:"rupee",     color:"#D97706", label:"Total Amount",     value:"₹"+(Number(selBooking.totalAmount||0).toLocaleString("en-IN")) },
          { iconName:"tag",       color:"#059669", label:"Total Notes",      value:(selBooking.totalNotes||0)+" notes" },
          { iconName:"tag",       color:"#6D28D9", label:"Purpose",          value:selBooking.notes?.purpose||"—" },
          { iconName:"user",      color:"#0891B2", label:"Beneficiary Name", value:selBooking.notes?.beneName||"—" },
          { iconName:"tag",       color:"#6D28D9", label:"Account No.",      value:selBooking.notes?.beneAccount||"—", mono:true },
          { iconName:"tag",       color:"#D97706", label:"IFSC Code",        value:selBooking.notes?.beneIfsc||"—", mono:true },
          { iconName:"building",  color:"#0891B2", label:"Bank",             value:(selBooking.notes?.beneBank||"—")+(selBooking.notes?.beneBranch?" · "+selBooking.notes.beneBranch:"") },
          { iconName:"phone",     color:"#059669", label:"Bene Contact",     value:selBooking.notes?.beneContact?"+91 "+selBooking.notes.beneContact:"—" },
          { iconName:"user",      color:"#E11D48", label:"Depositor Name",   value:selBooking.notes?.depName||"—" },
          { iconName:"phone",     color:"#059669", label:"Depositor Mobile", value:selBooking.notes?.depMobile?"+91 "+selBooking.notes.depMobile:"—" },
          { iconName:"mappin",    color:"#E11D48", label:"Depositor Address",value:selBooking.notes?.depAddress||"—" },
          { iconName:"clock",     color:"#6D28D9", label:"Submitted At",     value:selBooking.bookedAt||"—" },
          { iconName:"users",     color:"#0891B2", label:"Agent Assigned",   value:selBooking.agentAssigned||"Not assigned" },
        ] : [
          { iconName:"tag",       color:"#6D28D9", label:"Booking ID",  value:selBooking.id, mono:true },
          { iconName:"user",      color:"#0891B2", label:"Customer",    value:selBooking.name||"—" },
          { iconName:"phone",     color:"#059669", label:"Phone",       value:selBooking.phone||"—" },
          { iconName:"mappin",    color:"#E11D48", label:"Address",     value:selBooking.address||"—" },
          { iconName:"rupee",     color:"#D97706", label:"Amount",      value:"₹"+Number(selBooking.amount||0).toLocaleString("en-IN") },
          { iconName:"creditcard",color:"#059669", label:"Cash Mode",   value:selBooking.cashMode==="hand"?"🤝 By Hand":selBooking.cashMode==="neft"?"🏛️ NEFT":"📲 UPI" },
          { iconName:"gift",      color:"#E11D48", label:"Promo",       value:selBooking.promoCode||"—" },
          { iconName:"clock",     color:"#6D28D9", label:"Booked At",   value:selBooking.bookedAt||"—" },
          { iconName:"users",     color:"#0891B2", label:"Agent",       value:selBooking.agentAssigned||"Not assigned" },
          { iconName:"check",     color:"#059669", label:"Confirmed",   value:selBooking.customerConfirmed===true?"Yes ✅":selBooking.customerConfirmed===false?"No ❌":"Pending" },
          { iconName:"clock",     color:"#D97706", label:"Completed At",value:selBooking.completedAt||"—" },
        ]).map(({iconName,color,label,value,mono}) => (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 0", borderBottom:"1px solid rgba(0,0,0,0.05)" }}>
            <div style={{ width:26, height:26, borderRadius:7, background:`${color}12`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon name={iconName} size={12} color={color} />
            </div>
            <span style={{ fontSize:9, color:C.muted, flex:1 }}>{label}</span>
            <span style={{ fontSize:9, fontWeight:900, color:"#1A1035", textAlign:"right", maxWidth:"55%", wordBreak:"break-all", fontFamily:mono?"monospace":"inherit" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* ── Signature ── */}
      {selBooking.customerSignature && (
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid rgba(5,150,105,0.18)", padding:"12px 14px", marginBottom:10, boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
            <Icon name="signature" size={14} color="#059669"/>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#059669" }}>Customer Signature</span>
          </div>
          <img src={selBooking.customerSignature} alt="Signature" style={{ width:"100%", maxHeight:80, objectFit:"contain", background:"#F9F8FF", borderRadius:8, border:"1px solid rgba(5,150,105,0.20)" }}/>
        </div>
      )}

      {/* ── ASSIGN AGENT (pending_agent) ── */}
      {selBooking.status==="pending_agent" && (
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid rgba(217,119,6,0.22)", padding:"12px 14px", marginBottom:10, boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:"rgba(217,119,6,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name="users" size={14} color="#D97706"/>
            </div>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035" }}>Assign Nearby Agent</span>
          </div>
          {[
            {name:"Rajesh Kumar",mobile:"9876543210",dist:"1.2 km", initials:"RK"},
            {name:"Amit Patel",  mobile:"9712345678",dist:"2.8 km", initials:"AP"},
          ].map((ag,i) => (
            <button key={ag.mobile} onClick={() => {
              const updated = { ...selBooking, agentAssigned:`${ag.name} (${ag.mobile})`, status:"agent_assigned", agentCalled:false, agentAssignedAt:new Date().toLocaleString("en-IN") };
              updateBooking(updated);
            }} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"11px 13px", background:i===0?"rgba(5,150,105,0.06)":"rgba(8,145,178,0.06)", borderRadius:12, border:`1.5px solid ${i===0?"rgba(5,150,105,0.25)":"rgba(8,145,178,0.25)"}`, marginBottom:8, cursor:"pointer", textAlign:"left", transition:"all 0.15s", animation:`fadeUp 0.3s ${i*0.1}s ease both` }}>
              <div style={{ width:40, height:40, borderRadius:11, background:`linear-gradient(135deg,${i===0?"#059669,#10B981":"#0891B2,#06B6D4"})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:12, flexShrink:0, boxShadow:`0 3px 10px ${i===0?"rgba(5,150,105,0.35)":"rgba(8,145,178,0.30)"}` }}>{ag.initials}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:10, fontWeight:900, color:"#1A1035" }}>{ag.name}</div>
                <div style={{ fontSize:8, color:C.muted, marginTop:1 }}>{ag.mobile}</div>
                <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
                  <Icon name="mappin" size={10} color="#E11D48"/>
                  <span style={{ fontSize:8, color:"#059669", fontWeight:900 }}>{ag.dist} away</span>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4, background:i===0?"rgba(5,150,105,0.12)":"rgba(8,145,178,0.12)", borderRadius:20, padding:"5px 10px" }}>
                <span style={{ fontSize:9, color:i===0?"#059669":"#0891B2", fontWeight:900 }}>Assign</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 8l4 4-4 4" stroke={i===0?"#059669":"#0891B2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── AGENT ASSIGNED — call action ── */}
      {selBooking.status==="agent_assigned" && (
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid rgba(8,145,178,0.22)", padding:"12px 14px", marginBottom:10, boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
            <Icon name="users" size={14} color="#0891B2"/>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035" }}>Agent Assigned</span>
          </div>
          <div style={{ padding:"8px 10px", background:"rgba(8,145,178,0.07)", borderRadius:9, marginBottom:10, fontSize:9, color:"#0891B2", fontWeight:900 }}>{selBooking.agentAssigned}</div>
          {!selBooking.agentCalled ? (
            <button onClick={() => updateBooking({ ...selBooking, agentCalled:true })}
              style={{ width:"100%", background:"linear-gradient(135deg,#0891B2,#06B6D4)", color:"#fff", border:"none", borderRadius:12, padding:"12px", fontSize:10, fontWeight:900, cursor:"pointer", boxShadow:"0 4px 14px rgba(8,145,178,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              <Icon name="phone" size={14} color="#fff"/>
              Mark Customer as Called
            </button>
          ) : (
            <div style={{ padding:"10px", background:"rgba(5,150,105,0.08)", borderRadius:10, textAlign:"center", fontSize:9, color:C.success, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              <Icon name="check" size={14} color={C.success}/>
              Customer has been called ✅
            </div>
          )}
        </div>
      )}
    </div>
  );
  } // end if(selBooking)

  if (bookings.length === 0) return (
    <div style={{ textAlign:"center", padding:"32px 16px", background:"#fff", borderRadius:14, border:"1px dashed rgba(5,150,105,0.25)" }}>
      <div style={{ fontSize:9, marginBottom:8 }}>📭</div>
      <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>No bookings yet</div>
      <div style={{ fontSize:9, color:C.muted, marginTop:3 }}>Doorstep bookings appear here in real time</div>
      <div style={{ fontSize:9, color:C.muted, marginTop:6 }}>👉 Go to Login → Doorstep Cash Withdrawal to make a test booking</div>
    </div>
  );

  return (
    <>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
        <div style={{ fontSize:9, color:C.muted }}>{bookings.length} booking{bookings.length!==1?"s":""}</div>
        <div style={{ display:"flex", gap:6 }}>
          <Chip label={`⏳ ${bookings.filter(b=>b.status==="pending_agent").length} Pending`} color={C.warning} />
          <Chip label={`🚀 ${bookings.filter(b=>b.status==="agent_approved"||b.status==="agent_assigned").length} Active`} color="#6D28D9" />
          <Chip label={`✅ ${bookings.filter(b=>b.status==="completed").length} Done`} color={C.success} />
        </div>
      </div>
      {bookings.map(b => (
        <button key={b.id} onClick={() => setSelBooking({...b})} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
          <Card style={{ padding:"11px 13px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#059669,#10B981)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9, flexShrink:0 }}>
                {(b.name||"?")[0].toUpperCase()}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{b.name}</div>
                <div style={{ fontSize:9, color:C.muted }}>{b.phone} · ₹{Number(b.amount).toLocaleString("en-IN")}</div>
                <div style={{ fontSize:9, color:C.muted, marginTop:1 }}>{b.bookedAt}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <Chip label={b.status==="pending_agent"?"⏳ Pending":b.status==="agent_assigned"?"🔔 Assigned":b.status==="agent_approved"?"🚀 Progress":b.status==="pending_customer_confirm"?"📲 Confirm":b.status==="completed"?"✅ Closed":"⌛"} color={b.status==="pending_agent"?C.warning:b.status==="completed"?C.success:b.status==="pending_customer_confirm"?"#0891B2":"#6D28D9"} />
                <div style={{ fontSize:9, color:"#059669", marginTop:4, fontWeight:900 }}>View →</div>
              </div>
            </div>
          </Card>
        </button>
      ))}
    </>
  );
};

// ─── AEPS SCREEN — Aadhaar Enabled Payment System ───────────────────────────
const AepsScreen = ({ onBack, user, userId, wallet }) => {
  const [step, setStep] = useState(0); // 0=intro/type, 1=form, 2=biometric, 3=processing, 4=done
  const [txnType, setTxnType] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [fingerCaptured, setFingerCaptured] = useState(false);
  const [result, setResult] = useState(null);

  const BANKS = ["State Bank of India","Punjab National Bank","Bank of Baroda","Canara Bank","Union Bank","HDFC Bank","ICICI Bank","Axis Bank","Indian Bank","UCO Bank"];

  // Check if AEPS is enabled for this agent
  const agentLimit = (window.__agentLimits || {})[userId] || {};
  const aepsEnabled = agentLimit.aepsEnabled === true;
  const aepsDailyLimit = agentLimit.aepsDailyLimit || 50000;
  const aepsPerTxnLimit = agentLimit.aepsPerTxnLimit || 10000;

  const txnTypes = [
    { id:"cash_withdrawal", icon:"💴", label:"Cash Withdrawal",  desc:"Withdraw cash via Aadhaar biometric", color:"#059669" },
    { id:"balance_enquiry", icon:"🏧", label:"Balance Enquiry",  desc:"Check bank balance via AEPS",         color:"#0891B2" },
    { id:"mini_statement",  icon:"🗃️", label:"Mini Statement",   desc:"Last 5 bank transactions",            color:"#7C3AED" },
  ];

  // ── DISABLED STATE ───────────────────────────────────────────────────────────
  if (!aepsEnabled) return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="AEPS" onBack={onBack} />
      <div style={{ padding:"36px 16px", textAlign:"center" }}>
        <div style={{ fontSize:9, marginBottom:8 }}>🔒</div>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:C.danger, marginBottom:8 }}>AEPS Not Enabled</div>
        <div style={{ fontSize:9, color:C.muted, marginBottom:10, lineHeight:1.6 }}>
          AEPS (Aadhaar Enabled Payment System) is not enabled for your account.<br/>Please contact your Admin to enable this service.
        </div>
        <div style={{ background:"rgba(225,29,72,0.06)", border:"1px solid rgba(225,29,72,0.20)", borderRadius:12, padding:"8px 12px", textAlign:"left" }}>
          <div style={{ fontSize:9, fontWeight:900, color:C.danger, marginBottom:6 }}>ℹ️ How to enable</div>
          <div style={{ fontSize:9, color:C.muted, lineHeight:1.6 }}>Admin → Limits tab → Select your agent → Enable AEPS toggle → Save</div>
        </div>
      </div>
    </div>
  );

  // ── SUCCESS ─────────────────────────────────────────────────────────────────
  if (step === 4 && result) return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="AEPS Result" onBack={() => { setStep(0); setResult(null); setFingerCaptured(false); setAadhaar(""); setBank(""); setAmount(""); setTxnType(""); }} />
      <div style={{ padding:"14px", textAlign:"center" }}>
        <div style={{ fontSize:9, marginBottom:8 }}>{result.success?"☑️":"✖️"}</div>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:result.success?C.success:C.danger, marginBottom:4 }}>{result.success?"Transaction Successful!":"Transaction Failed"}</div>
        <div style={{ fontSize:9, color:C.muted, marginBottom:10 }}>{result.message}</div>
        <Card style={{ textAlign:"left", marginBottom:10 }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:8 }}>Transaction Details</div>
          {[
            ["Type",    txnTypes.find(t=>t.id===txnType)?.label||"—"],
            ["Aadhaar", "XXXX XXXX "+aadhaar.slice(-4)],
            ["Bank",    bank],
            txnType==="cash_withdrawal"?["Amount","₹"+Number(amount).toLocaleString("en-IN")]:null,
            txnType==="balance_enquiry"?["Balance",result.balance]:null,
            ["Status",  result.success?"Success ✅":"Failed ❌"],
            ["Ref No.", result.refNo],
            ["Time",    new Date().toLocaleString("en-IN")],
          ].filter(Boolean).map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:`1px solid ${C.border}`, fontSize:9 }}>
              <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:900, color:"#1A1035" }}>{v}</span>
            </div>
          ))}
        </Card>
        {txnType==="mini_statement" && result.success && (
          <Card style={{ textAlign:"left", marginBottom:10 }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:8 }}>Last 5 Transactions</div>
            {[["Cr","UPI Transfer","₹5,000","12 Mar"],["Dr","ATM Withdrawal","₹2,000","11 Mar"],["Cr","NEFT Receipt","₹10,000","10 Mar"],["Dr","Bill Payment","₹830","09 Mar"],["Cr","Salary Credit","₹35,000","01 Mar"]].map(([type,desc,amt,date]) => (
              <div key={date+amt} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${C.border}`, fontSize:9 }}>
                <div><div style={{ fontWeight:900, color:"#1A1035" }}>{desc}</div><div style={{ color:C.muted, fontSize:9 }}>{date}</div></div>
                <span style={{ fontWeight:900, color:type==="Cr"?C.success:C.danger }}>{type==="Cr"?"+":"-"}{amt}</span>
              </div>
            ))}
          </Card>
        )}
        <button onClick={() => { setStep(0); setResult(null); setFingerCaptured(false); setAadhaar(""); setBank(""); setAmount(""); setTxnType(""); }} style={{ width:"100%", background:"linear-gradient(135deg,#059669,#0891B2)", color:"#fff", border:"none", borderRadius:12, padding:"12px", fontSize:9, fontWeight:900, cursor:"pointer" }}>
          New Transaction
        </button>
      </div>
    </div>
  );

  // ── PROCESSING ───────────────────────────────────────────────────────────────
  if (step === 3) return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="AEPS" onBack={() => {}} />
      <div style={{ padding:"36px 16px", textAlign:"center" }}>
        <Loader size={44} color="#059669" />
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginTop:18, marginBottom:6 }}>Processing via NPCI AEPS...</div>
        {["Verifying Aadhaar","Matching Biometric","Connecting to Bank","Processing Request"].map((s,i) => (
          <div key={s} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 14px", background:"#fff", borderRadius:10, marginTop:8, textAlign:"left", border:`1px solid ${C.border}` }}>
            <Loader size={11} color={C.accent} /><span style={{ fontSize:9, color:C.muted }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── BIOMETRIC ────────────────────────────────────────────────────────────────
  if (step === 2) return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="Biometric Capture" onBack={() => setStep(1)} />
      <div style={{ padding:"9px 11px" }}>
        <div style={{ textAlign:"center", padding:"10px 0 16px" }}>
          <div style={{ fontSize:9, marginBottom:6 }}>👆</div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:3 }}>Place Customer Finger</div>
          <div style={{ fontSize:9, color:C.muted }}>Ask customer to place finger on biometric device</div>
        </div>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}>
          <div onClick={async () => {
            setFingerCaptured(true);
            await sleep(700);
            setStep(3);
            await sleep(2200);
            const success = Math.random() > 0.15;
            setResult({
              success,
              message: success ? "Transaction completed via NPCI AEPS network" : "Biometric mismatch. Please retry.",
              balance: "₹"+(Math.floor(Math.random()*50000)+5000).toLocaleString("en-IN"),
              refNo: "AEPS"+Math.floor(1000000000+Math.random()*9000000000),
            });
            setStep(4);
          }} style={{ width:110, height:110, borderRadius:"50%", background:fingerCaptured?"linear-gradient(135deg,#059669,#10B981)":"linear-gradient(135deg,#EDE9FE,#DDD6FE)", border:`4px solid ${fingerCaptured?"#059669":"#6D28D9"}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:`0 8px 24px ${fingerCaptured?"rgba(5,150,105,0.35)":"rgba(109,40,217,0.22)"}`, animation:"orbFloat 2s ease-in-out infinite" }}>
            <span style={{ fontSize:48 }}>👆</span>
          </div>
        </div>
        <div style={{ textAlign:"center", fontSize:9, color:fingerCaptured?C.success:C.muted, fontWeight:900 }}>
          {fingerCaptured?"✅ Captured! Processing...":"Tap to simulate biometric scan"}
        </div>
        <Card style={{ marginTop:14 }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:8 }}>Transaction Summary</div>
          {[
            ["Type",  txnTypes.find(t=>t.id===txnType)?.label||"—"],
            ["Aadhaar","XXXX XXXX "+aadhaar.slice(-4)],
            ["Bank",  bank],
            txnType==="cash_withdrawal"?["Amount","₹"+Number(amount).toLocaleString("en-IN")]:null,
          ].filter(Boolean).map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:`1px solid ${C.border}`, fontSize:9 }}>
              <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:900, color:"#1A1035" }}>{v}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );

  // ── FORM ─────────────────────────────────────────────────────────────────────
  if (step === 1) return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title={"AEPS — "+(txnTypes.find(t=>t.id===txnType)?.label||"")} onBack={() => setStep(0)} />
      <div style={{ padding:"9px 11px" }}>
        {/* AEPS limits info */}
        <div style={{ background:"rgba(5,150,105,0.06)", border:"1px solid rgba(5,150,105,0.20)", borderRadius:9, padding:"8px 12px", marginBottom:8, display:"flex", gap:12 }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:9, color:C.muted }}>Daily Limit</div>
            <div style={{ fontSize:9, fontWeight:900, color:"#059669" }}>₹{aepsDailyLimit.toLocaleString("en-IN")}</div>
          </div>
          <div style={{ width:1, background:"rgba(5,150,105,0.18)" }} />
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:9, color:C.muted }}>Per Txn Limit</div>
            <div style={{ fontSize:9, fontWeight:900, color:"#059669" }}>₹{aepsPerTxnLimit.toLocaleString("en-IN")}</div>
          </div>
          <div style={{ width:1, background:"rgba(5,150,105,0.18)" }} />
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:9, color:C.muted }}>NPCI AEPS</div>
            <div style={{ fontSize:9, fontWeight:900, color:"#059669" }}>✅ Active</div>
          </div>
        </div>
        {/* Aadhaar */}
        <div style={{ marginBottom:8 }}>
          <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900, letterSpacing:"0.04em" }}>CUSTOMER AADHAAR</div>
          <input type="tel" value={aadhaar} onChange={e=>setAadhaar(e.target.value.replace(/[^0-9]/g,"").slice(0,12))} maxLength={12} placeholder="12-digit Aadhaar number"
            style={{ width:"100%", background:"#fff", border:`1.5px solid ${aadhaar.length===12?"rgba(5,150,105,0.45)":"rgba(109,40,217,0.20)"}`, borderRadius:10, padding:"10px 12px", fontSize:9, fontWeight:900, color:"#1A1035", outline:"none", fontFamily:"inherit" }} />
          {aadhaar.length>0 && aadhaar.length<12 && <div style={{ fontSize:9, color:C.danger, marginTop:3 }}>{12-aadhaar.length} more digits needed</div>}
        </div>
        {/* Bank */}
        <div style={{ marginBottom:8 }}>
          <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900, letterSpacing:"0.04em" }}>CUSTOMER'S BANK</div>
          <select value={bank} onChange={e=>setBank(e.target.value)} style={{ width:"100%", background:"#fff", border:`1.5px solid ${bank?"rgba(5,150,105,0.45)":"rgba(109,40,217,0.20)"}`, borderRadius:10, padding:"10px 12px", fontSize:9, fontWeight:900, color:bank?"#1A1035":C.muted, outline:"none", fontFamily:"inherit" }}>
            <option value="">Select Bank</option>
            {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        {/* Amount for cash withdrawal */}
        {txnType==="cash_withdrawal" && (
          <div style={{ marginBottom:8, animation:"fadeUp 0.25s ease both" }}>
            <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900 }}>WITHDRAWAL AMOUNT</div>
            <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${amount?"rgba(5,150,105,0.45)":"rgba(109,40,217,0.20)"}`, borderRadius:10, padding:"0 14px", height:48 }}>
              <span style={{ color:"#059669", fontWeight:900, fontSize:9, marginRight:6 }}>₹</span>
              <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0"
                style={{ flex:1, background:"none", border:"none", fontSize:9, fontWeight:900, color:"#1A1035", outline:"none" }} />
            </div>
            <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
              {[500,1000,2000,5000,10000].filter(p=>p<=aepsPerTxnLimit).map(p => (
                <button key={p} onClick={()=>setAmount(String(p))} style={{ padding:"3px 10px", borderRadius:16, background:amount===String(p)?"rgba(5,150,105,0.12)":"#F3F4F6", border:`1px solid ${amount===String(p)?"#059669":"transparent"}`, fontSize:9, fontWeight:900, color:amount===String(p)?"#059669":"#374151", cursor:"pointer" }}>₹{p>=1000?p/1000+"k":p}</button>
              ))}
            </div>
            {amount && Number(amount)>aepsPerTxnLimit && <div style={{ fontSize:9, color:C.danger, marginTop:3 }}>⚠️ Exceeds per-txn limit of ₹{aepsPerTxnLimit.toLocaleString("en-IN")}</div>}
          </div>
        )}
        <SwipeBtn
          disabled={aadhaar.length!==12||!bank||(txnType==="cash_withdrawal"&&(!amount||Number(amount)<100||Number(amount)>aepsPerTxnLimit))}
          onSubmit={() => setStep(2)}
          label="Swipe to Capture Biometric"
          successLabel="👆 Biometric Required..."
          color1="#059669" color2="#0891B2"
        />
      </div>
    </div>
  );

  // ── INTRO — Transaction type ─────────────────────────────────────────────────
  return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="AEPS" onBack={onBack} />
      <div style={{ padding:"9px 11px" }}>
        <div style={{ background:"linear-gradient(135deg,#059669,#0891B2)", borderRadius:14, padding:"8px 12px", marginBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:11, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>👆</div>
            <div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#fff" }}>Aadhaar Enabled Payment</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.80)", marginTop:1 }}>Daily: ₹{aepsDailyLimit.toLocaleString("en-IN")} · Per-Txn: ₹{aepsPerTxnLimit.toLocaleString("en-IN")}</div>
            </div>
          </div>
        </div>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:10 }}>Select Transaction Type</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {txnTypes.map(t => (
            <button key={t.id} onClick={() => { setTxnType(t.id); setStep(1); }} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 11px", background:"#fff", border:`1.5px solid ${t.color}22`, borderRadius:14, cursor:"pointer", textAlign:"left", boxShadow:`0 2px 10px ${t.color}10` }}>
              <div style={{ width:38, height:38, borderRadius:10, background:`${t.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>{t.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>{t.label}</div>
                <div style={{ fontSize:9, color:C.muted, marginTop:1 }}>{t.desc}</div>
              </div>
              <span style={{ color:t.color, fontSize:9 }}>→</span>
            </button>
          ))}
        </div>
        <div style={{ marginTop:12, padding:"9px 12px", background:"rgba(5,150,105,0.04)", borderRadius:9, border:"1px solid rgba(5,150,105,0.14)" }}>
          <div style={{ fontSize:9, color:C.muted, lineHeight:1.5 }}>🔒 NPCI AEPS · Aadhaar-based biometric authentication · RBI Approved · PCI DSS Compliant</div>
        </div>
      </div>
    </div>
  );
};

// ─── BILLS & RECHARGE SCREEN ─────────────────────────────────────────────────
const BillsScreen = ({ onBack, wallet }) => {
  const [view, setView] = useState("home");
  const [form, setForm] = useState({ mobile:"", operator:"", amount:"", accountNo:"", provider:"" });
  const [step, setStep] = useState(0); // 0=input, 1=processing, 2=done
  const [result, setResult] = useState(null);
  const [currentType, setCurrentType] = useState(null);

  const MOBILE_OPS = [
    { id:"jio",    name:"Jio",    logo:"📶", color:"#0070BE" },
    { id:"airtel", name:"Airtel", logo:"🔴", color:"#E40000" },
    { id:"vi",     name:"Vi",     logo:"🟣", color:"#8B1A88" },
    { id:"bsnl",   name:"BSNL",   logo:"🟢", color:"#007A3D" },
  ];

  const PLANS = {
    jio:    [{amt:179,validity:"28d",data:"1.5GB/day"},{amt:349,validity:"56d",data:"2GB/day"},{amt:599,validity:"84d",data:"2GB/day"},{amt:999,validity:"365d",data:"2GB/day"}],
    airtel: [{amt:199,validity:"28d",data:"1.5GB/day"},{amt:359,validity:"56d",data:"2GB/day"},{amt:649,validity:"84d",data:"2GB/day"},{amt:1099,validity:"365d",data:"2GB/day"}],
    vi:     [{amt:179,validity:"28d",data:"1GB/day"},{amt:329,validity:"56d",data:"1.5GB/day"},{amt:479,validity:"84d",data:"1.5GB/day"},{amt:999,validity:"365d",data:"1.5GB/day"}],
    bsnl:   [{amt:107,validity:"28d",data:"1GB/day"},{amt:187,validity:"56d",data:"1GB/day"},{amt:399,validity:"84d",data:"1.5GB/day"},{amt:999,validity:"365d",data:"1GB/day"}],
  };

  const BILL_TYPES = [
    { id:"mobile",      icon:"🧾", label:"Mobile Recharge",  color:"#0891B2", desc:"Jio · Airtel · Vi · BSNL" },
    { id:"electricity", icon:"⚡", label:"Electricity",      color:"#D97706", desc:"BESCOM · MSEDCL · KSEB & more" },
    { id:"dth",         icon:"📺", label:"DTH Recharge",     color:"#7C3AED", desc:"Tata Play · Dish TV · Sun Direct" },
    { id:"broadband",   icon:"🌐", label:"Broadband",        color:"#059669", desc:"ACT · JioFiber · Airtel Xstream" },
    { id:"gas",         icon:"🔥", label:"Gas Bill",         color:"#E11D48", desc:"IGL · MGL · Gujarat Gas" },
    { id:"water",       icon:"💧", label:"Water Bill",       color:"#0891B2", desc:"BWSSB · MCGM · Delhi Jal Board" },
  ];

  const PROVIDERS = {
    electricity:["BESCOM","MSEDCL","TSSPDCL","CESC","KSEB","TNEB"],
    dth:        ["Tata Play","Dish TV","Sun Direct","Airtel DTH","D2H"],
    broadband:  ["ACT Fibernet","JioFiber","Airtel Xstream","BSNL Broadband","Hathway"],
    gas:        ["Indraprastha Gas","Mahanagar Gas","Gujarat Gas","Adani Gas"],
    water:      ["BWSSB","MCGM","BMC","HMWSSB","Delhi Jal Board"],
  };

  const processPayment = async () => {
    setStep(1); await sleep(2000);
    const txnId = "BILL"+Math.floor(100000000+Math.random()*900000000);
    setResult({ success:true, txnId, amount:form.amount, type:BILL_TYPES.find(b=>b.id===view)?.label||"Bill", time:new Date().toLocaleString("en-IN") });
    setStep(2);
  };

  const resetAll = () => { setStep(0); setResult(null); setView("home"); setForm({ mobile:"", operator:"", amount:"", accountNo:"", provider:"" }); setCurrentType(null); };

  // Success
  if (step === 2 && result) return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="Payment Done" onBack={resetAll} />
      <div style={{ padding:"10px 12px", textAlign:"center" }}>
        <div style={{ fontSize:9, marginBottom:8 }}>✅</div>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:C.success, marginBottom:4 }}>Payment Successful!</div>
        <div style={{ fontSize:9, color:C.muted, marginBottom:10 }}>{result.type} · ₹{Number(result.amount).toLocaleString("en-IN")}</div>
        <Card style={{ textAlign:"left", marginBottom:10 }}>
          {[["Service",result.type],["Amount","₹"+Number(result.amount).toLocaleString("en-IN")],form.mobile?["Mobile",form.mobile]:null,form.accountNo?["Account No.",form.accountNo]:null,["Transaction ID",result.txnId],["Status","✅ Success"],["Time",result.time]].filter(Boolean).map(([k,v])=>(
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:`1px solid ${C.border}`, fontSize:9 }}>
              <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:900, color:"#1A1035", maxWidth:"60%", textAlign:"right" }}>{v}</span>
            </div>
          ))}
        </Card>
        <button onClick={resetAll} style={{ width:"100%", background:"linear-gradient(135deg,#6D28D9,#0891B2)", color:"#fff", border:"none", borderRadius:12, padding:"12px", fontSize:9, fontWeight:900, cursor:"pointer" }}>New Payment</button>
      </div>
    </div>
  );

  // Processing
  if (step === 1) return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="Processing..." onBack={()=>{}} />
      <div style={{ padding:"36px 16px", textAlign:"center" }}>
        <Loader size={44} color="#6D28D9" />
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginTop:16, marginBottom:6 }}>Processing Payment...</div>
        <div style={{ fontSize:9, color:C.muted }}>₹{Number(form.amount).toLocaleString("en-IN")} · {currentType?.label}</div>
      </div>
    </div>
  );

  // Mobile Recharge
  if (view === "mobile") return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="Mobile Recharge" onBack={() => { setView("home"); setForm(f=>({...f,mobile:"",operator:"",amount:""})); }} />
      <div style={{ padding:"9px 11px" }}>
        <div style={{ marginBottom:8 }}>
          <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900 }}>MOBILE NUMBER</div>
          <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${form.mobile.length===10?"rgba(109,40,217,0.45)":"rgba(109,40,217,0.20)"}`, borderRadius:10, padding:"0 12px", height:38, gap:6 }}>
            <span style={{ fontSize:9, color:C.muted, fontWeight:900 }}>+91</span>
            <input type="tel" value={form.mobile} onChange={e=>setForm(f=>({...f,mobile:e.target.value.replace(/[^0-9]/g,"").slice(0,10)}))} maxLength={10} placeholder="Enter mobile number"
              style={{ flex:1, background:"none", border:"none", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit", fontWeight:900 }} />
            {form.mobile.length===10 && <span style={{ color:C.success }}>✓</span>}
          </div>
        </div>
        <div style={{ marginBottom:8 }}>
          <div style={{ fontSize:9, color:C.muted, marginBottom:6, fontWeight:900 }}>OPERATOR</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {MOBILE_OPS.map(op => (
              <button key={op.id} onClick={() => setForm(f=>({...f,operator:op.id,amount:""}))} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", background:form.operator===op.id?`${op.color}12`:"#fff", border:`2px solid ${form.operator===op.id?op.color:"rgba(0,0,0,0.10)"}`, borderRadius:10, cursor:"pointer" }}>
                <span style={{ fontSize:9 }}>{op.logo}</span>
                <span style={{ fontWeight:900, fontSize:9, color:form.operator===op.id?op.color:"#1A1035" }}>{op.name}</span>
              </button>
            ))}
          </div>
        </div>
        {form.operator && (
          <div style={{ marginBottom:8, animation:"fadeUp 0.25s ease both" }}>
            <div style={{ fontSize:9, color:C.muted, marginBottom:6, fontWeight:900 }}>SELECT PLAN</div>
            {(PLANS[form.operator]||[]).map(p => (
              <button key={p.amt} onClick={() => setForm(f=>({...f,amount:String(p.amt)}))} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"9px 12px", background:form.amount===String(p.amt)?"rgba(109,40,217,0.08)":"#fff", border:`1.5px solid ${form.amount===String(p.amt)?"#6D28D9":"rgba(0,0,0,0.10)"}`, borderRadius:10, cursor:"pointer", textAlign:"left", marginBottom:6 }}>
                <div style={{ width:36, height:36, borderRadius:9, background:form.amount===String(p.amt)?"rgba(109,40,217,0.10)":"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:form.amount===String(p.amt)?"#6D28D9":"#374151", flexShrink:0 }}>₹{p.amt}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:900, fontSize:9, color:form.amount===String(p.amt)?"#6D28D9":"#1A1035" }}>{p.data} · Unlimited Calls</div>
                  <div style={{ fontSize:9, color:C.muted }}>{p.validity}</div>
                </div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:form.amount===String(p.amt)?"#6D28D9":"#1A1035" }}>₹{p.amt}</div>
              </button>
            ))}
          </div>
        )}
        <SwipeBtn disabled={form.mobile.length!==10||!form.operator||!form.amount} onSubmit={processPayment}
          label={form.amount?`Recharge ₹${form.amount} for ${form.mobile}`:"Fill details to recharge"}
          successLabel="⚡ Processing..." color1="#0891B2" color2="#6D28D9" />
      </div>
    </div>
  );

  // Other bill types
  if (["electricity","dth","broadband","gas","water"].includes(view)) {
    const bt = BILL_TYPES.find(b=>b.id===view);
    return (
      <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
        <NavBar title={bt?.label} onBack={() => { setView("home"); setForm(f=>({...f,provider:"",accountNo:"",amount:""})); }} />
        <div style={{ padding:"9px 11px" }}>
          <div style={{ marginBottom:8 }}>
            <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900 }}>SELECT PROVIDER</div>
            <select value={form.provider} onChange={e=>setForm(f=>({...f,provider:e.target.value}))} style={{ width:"100%", background:"#fff", border:`1.5px solid ${form.provider?"rgba(109,40,217,0.40)":"rgba(109,40,217,0.18)"}`, borderRadius:10, padding:"10px 12px", fontSize:9, fontWeight:900, color:form.provider?"#1A1035":C.muted, outline:"none", fontFamily:"inherit" }}>
              <option value="">Select Provider</option>
              {(PROVIDERS[view]||[]).map(p=><option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:8 }}>
            <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900 }}>
              {view==="electricity"?"CONSUMER NO.":view==="dth"?"CUSTOMER ID":view==="broadband"?"ACCOUNT NO.":view==="gas"?"BP NUMBER":"CUSTOMER NO."}
            </div>
            <input value={form.accountNo} onChange={e=>setForm(f=>({...f,accountNo:e.target.value}))} placeholder="Enter account number"
              style={{ width:"100%", background:"#fff", border:`1.5px solid ${form.accountNo?"rgba(109,40,217,0.40)":"rgba(109,40,217,0.18)"}`, borderRadius:10, padding:"10px 12px", fontSize:9, fontWeight:900, color:"#1A1035", outline:"none", fontFamily:"inherit" }} />
          </div>
          <div style={{ marginBottom:10 }}>
            <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900 }}>AMOUNT (₹)</div>
            <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${form.amount?"rgba(109,40,217,0.40)":"rgba(109,40,217,0.18)"}`, borderRadius:10, padding:"0 14px", height:48 }}>
              <span style={{ color:"#6D28D9", fontWeight:900, fontSize:9, marginRight:6 }}>₹</span>
              <input type="number" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} placeholder="0"
                style={{ flex:1, background:"none", border:"none", fontSize:9, fontWeight:900, color:"#1A1035", outline:"none" }} />
            </div>
            <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
              {[100,200,500,1000,2000].map(p=>(
                <button key={p} onClick={()=>setForm(f=>({...f,amount:String(p)}))} style={{ padding:"3px 10px", borderRadius:16, background:form.amount===String(p)?"rgba(109,40,217,0.12)":"#F3F4F6", border:`1px solid ${form.amount===String(p)?"#6D28D9":"transparent"}`, fontSize:9, fontWeight:900, color:form.amount===String(p)?"#6D28D9":"#374151", cursor:"pointer" }}>₹{p>=1000?p/1000+"k":p}</button>
              ))}
            </div>
          </div>
          <SwipeBtn disabled={!form.provider||!form.accountNo||!form.amount||Number(form.amount)<10} onSubmit={processPayment}
            label={`Pay ₹${form.amount||"—"} — ${bt?.label}`} successLabel="✅ Processing..."
            color1={bt?.color||"#6D28D9"} color2="#059669" />
        </div>
      </div>
    );
  }

  // Home — service selection
  return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="Bills & Recharge" onBack={onBack} />
      <div style={{ padding:"9px 11px" }}>
        {/* Wallet balance strip */}
        <div style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", borderRadius:12, padding:"10px 14px", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)", marginBottom:1 }}>Wallet Balance</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#fff" }}>{fmt(wallet.balance)}</div>
          </div>
          <span style={{ fontSize:9 }}>💳</span>
        </div>
        {/* Service grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {BILL_TYPES.map(b => (
            <button key={b.id} onClick={() => { setView(b.id); setCurrentType(b); }} style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"14px 10px", background:"#fff", border:`1.5px solid ${b.color}20`, borderRadius:14, cursor:"pointer", boxShadow:`0 2px 10px ${b.color}10`, gap:6 }}>
              <div style={{ width:40, height:40, borderRadius:11, background:`${b.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>{b.icon}</div>
              <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{b.label}</div>
              <div style={{ fontSize:9, color:C.muted, textAlign:"center" }}>{b.desc}</div>
            </button>
          ))}
        </div>
        {/* Admin offers for bills */}
        {(window.__publishedOffers||[]).length > 0 && (
          <div style={{ marginTop:14 }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:8 }}>🎁 Offers for You</div>
            {(window.__publishedOffers||[]).map(o => (
              <div key={o.id} style={{ background:o.bg||"linear-gradient(135deg,#EDE9FE,#DDD6FE)", borderRadius:10, padding:"10px 12px", marginBottom:8, display:"flex", alignItems:"center", gap:8, border:`1px solid ${o.color||"#6D28D9"}20` }}>
                <span style={{ fontSize:9 }}>{o.icon||"🎀"}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{o.title}</div>
                  <div style={{ fontSize:9, color:C.muted }}>{o.discount} · Code: <strong>{o.code}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── SCREEN: ADMIN DASHBOARD ──────────────────────────────────────────────────
const AdminDashboard = ({ onLogout, onRequestLogout, transactions, allUsers, agentDocs, setAgentDocs }) => {
  const [tab, setTab] = useState("overview");
  const [docViewer, setDocViewer] = useState(null);
  const [showAdminProfile, setShowAdminProfile] = useState(false);
  const [adminSecurity, setAdminSecurity] = useState({ twoFa:false, biometric:false, txnPin:false, loginNotif:true, txnNotif:true });
  const [adminPin, setAdminPin] = useState(null);
  const [showAdminPinSetup, setShowAdminPinSetup] = useState(false);
  const [showAdminBiometric, setShowAdminBiometric] = useState(false);
  const [adminBiometricDone, setAdminBiometricDone] = useState(false);
  const [adminNewPin, setAdminNewPin] = useState("");
  const [adminConfirmPin, setAdminConfirmPin] = useState("");
  const [adminPinError, setAdminPinError] = useState("");
  // expose adminSecurity globally for login to check
  useEffect(() => { window.__adminSecurity = adminSecurity; }, [adminSecurity]);
  const [showAdminChangePwd, setShowAdminChangePwd] = useState(false);
  const [adminPwdOld, setAdminPwdOld] = useState("");
  const [adminPwdNew, setAdminPwdNew] = useState("");
  const [adminPwdConfirm, setAdminPwdConfirm] = useState("");
  const [adminPwdError, setAdminPwdError] = useState("");
  const [adminPwdSuccess, setAdminPwdSuccess] = useState(false);
  const [showAdminPwdOld, setShowAdminPwdOld] = useState(false);
  const [showAdminPwdNew, setShowAdminPwdNew] = useState(false);
  const [transferDrillMode, setTransferDrillMode] = useState(null);   // null | "imps" | "neft" | "upi"
  const [transferDrillAgent, setTransferDrillAgent] = useState(null); // null | agent object
  const [feeEdit, setFeeEdit] = useState({...getFeeConfig()});
  const [feeSaved, setFeeSaved] = useState(false);
  // Per-agent limits & fees — { [userId]: { dailyLimit, txnLimit, creditFee, debitFee, transferFee } }
  const [agentLimits, setAgentLimits] = useState(() => {
    return window.__agentLimits || {};
  });
  const [selectedLimitAgent, setSelectedLimitAgent] = useState(null);
  const [limitEdit, setLimitEdit] = useState({});
  const [limitSaved, setLimitSaved] = useState(false);

  const DEFAULT_LIMITS = { dailyLimit:200000, txnLimit:100000, creditFee:1.8, debitFee:0.5, transferFee:10, aepsEnabled:false, aepsDailyLimit:50000, aepsPerTxnLimit:10000 };

  const getAgentLimit = (uid, key) => {
    const custom = agentLimits[uid];
    return custom?.[key] ?? DEFAULT_LIMITS[key];
  };

  const saveAgentLimit = (uid) => {
    const updated = { ...agentLimits, [uid]: { ...limitEdit } };
    setAgentLimits(updated);
    window.__agentLimits = updated;
    setLimitSaved(true);
    setTimeout(() => setLimitSaved(false), 2000);
  };

  const resetAgentLimit = (uid) => {
    const updated = { ...agentLimits };
    delete updated[uid];
    setAgentLimits(updated);
    window.__agentLimits = updated;
  };
  const saveFees = () => {
    window.__feeConfig = {...feeEdit};
    setFeeSaved(true);
    setTimeout(() => setFeeSaved(false), 2500);
  }; // { src, label, type }
  const [overlayView, setOverlayView] = useState(null); // null | "users" | "txns" | "kycPending" | "flagged"

  const mockUsers = [
    { id:"USR001", name:"Rajesh Kumar",  mobile:"9876543210", kyc:"approved", status:"active",  wallet:"₹12,500" },
    { id:"USR002", name:"Priya Sharma",  mobile:"9845612300", kyc:"pending",  status:"active",  wallet:"₹0" },
    { id:"USR003", name:"Amit Patel",    mobile:"9712345678", kyc:"approved", status:"blocked", wallet:"₹4,200" },
    { id:"USR004", name:"Sunita Verma",  mobile:"9632587410", kyc:"pending",  status:"active",  wallet:"₹0" },
  ];

  const mockTxns = [
    {
      id:"TXN001", user:"Rajesh Kumar", userId:"USR001", type:"credit", amount:"₹5,000", method:"HDFC Credit Card", status:"success", date:"Today 10:23",
      card:{ number:"4567 •••• •••• 2891", holder:"Rajesh Kumar", bank:"HDFC Bank", network:"Visa", expiry:"09/26", type:"Credit" },
      transfer:null,
      fee:"₹90", walletBefore:"₹7,500", walletAfter:"₹12,410", ip:"103.21.58.14", device:"iPhone 14 Pro",
    },
    {
      id:"TXN002", user:"Priya Sharma", userId:"USR002", type:"transfer", amount:"₹3,000", method:"IMPS", status:"success", date:"Today 09:11",
      card:null,
      transfer:{ accNo:"••••••••5678", bank:"State Bank of India", ifsc:"SBIN0001234", holder:"Priya Sharma", mode:"IMPS", utr:"402912345678" },
      fee:"₹10", walletBefore:"₹3,010", walletAfter:"₹0", ip:"103.99.12.44", device:"Samsung Galaxy S23",
    },
    {
      id:"TXN003", user:"Amit Patel", userId:"USR003", type:"credit", amount:"₹10,000", method:"ICICI Credit Card", status:"failed", date:"Yesterday 14:22",
      card:{ number:"5412 •••• •••• 7734", holder:"Amit Patel", bank:"ICICI Bank", network:"Mastercard", expiry:"12/25", type:"Credit" },
      transfer:null,
      fee:"₹0", walletBefore:"₹4,200", walletAfter:"₹4,200", ip:"117.55.20.8", device:"OnePlus 11", failReason:"Card declined by issuing bank",
    },
    {
      id:"TXN004", user:"Sunita Verma", userId:"USR004", type:"fee", amount:"₹180", method:"Platform Fee", status:"success", date:"Yesterday 11:05",
      card:null, transfer:null,
      fee:"₹180", walletBefore:"₹9,180", walletAfter:"₹9,000", ip:"49.36.17.22", device:"Redmi Note 12",
    },
  ];

  const [selectedTxn, setSelectedTxn] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [adminRegStep, setAdminRegStep] = useState(0);
  const [createdCreds, setCreatedCreds] = useState(null); // { type, name, mobile, loginId, password }
  const [newAdmin, setNewAdmin] = useState({ name:"", mobile:"", email:"", loginId:"", password:"", address:"" });
  const [createAdminError, setCreateAdminError] = useState("");
  const [showCreateAgent, setShowCreateAgent] = useState(false);
  const [agentRegStep, setAgentRegStep] = useState(0);
  const [newAgentForm, setNewAgentForm] = useState({ name:"", mobile:"", email:"", address:"", pan:"", aadhaar:"", panError:"", aadhaarError:"", lat:null, lng:null, panFile:null, aadhaarFile:null });
  const [agentLocating, setAgentLocating] = useState(false);
  const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const AAD_RE = /^\d{4} \d{4} \d{4}$/;
  const [offerForm, setOfferForm] = useState({ title:"", desc:"", code:"", discount:"", validTill:"", icon:"🎀", type:"fee" });
  const [publishedOffers, setPublishedOffers] = useState(window.__publishedOffers || []);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketReply, setTicketReply] = useState("");
  const [users, setUsers] = useState([
    { id:"USR001", name:"Rajesh Kumar",  mobile:"9876543210", email:"rajesh@gmail.com",  dob:"28 Nov 1988", pan:"KLMNO9012L", aadhaar:"5567 XXXX XXXX", address:"42, MG Road, Bengaluru 560001", kyc:"approved", status:"active",  wallet:"₹12,500", joinDate:"10 Jan 2024",
      panDoc:{ lines:["INCOME TAX DEPARTMENT","GOVT. OF INDIA","Name: RAJESH KUMAR","DOB: 28/11/1988","PAN: KLMNO9012L"], color:"#FEF3C7", border:"#D97706" },
      aadhaarDoc:{ lines:["Government of India","आधार","Name: Rajesh Kumar","DOB: 28/11/1988","XXXX XXXX 5567"], color:"#EDE9FE", border:"#6D28D9" },
      selfieInitials:"RK", role:"agent", password:"agent@123",
    },
    { id:"USR002", name:"Priya Sharma",  mobile:"9845612300", email:"priya@gmail.com",   dob:"12 Mar 1994", pan:"ABCDE1234F", aadhaar:"8890 XXXX XXXX", address:"15, Anna Nagar, Chennai 600040", kyc:"pending",  status:"active",  wallet:"₹0",     joinDate:"22 Feb 2024",
      panDoc:{ lines:["INCOME TAX DEPARTMENT","GOVT. OF INDIA","Name: PRIYA SHARMA","DOB: 12/03/1994","PAN: ABCDE1234F"], color:"#FEF3C7", border:"#D97706" },
      aadhaarDoc:{ lines:["Government of India","आधार","Name: Priya Sharma","DOB: 12/03/1994","XXXX XXXX 8890"], color:"#EDE9FE", border:"#6D28D9" },
      selfieInitials:"PS", role:"agent", password:"priya@456",
    },
    { id:"USR003", name:"Amit Patel",    mobile:"9712345678", email:"amit@gmail.com",    dob:"05 Jul 1990", pan:"FGHIJ5678K", aadhaar:"2341 XXXX XXXX", address:"8, Satellite Road, Ahmedabad 380015", kyc:"approved", status:"blocked", wallet:"₹4,200", joinDate:"03 Mar 2024",
      panDoc:{ lines:["INCOME TAX DEPARTMENT","GOVT. OF INDIA","Name: AMIT PATEL","DOB: 05/07/1990","PAN: FGHIJ5678K"], color:"#FEF3C7", border:"#D97706" },
      aadhaarDoc:{ lines:["Government of India","आधार","Name: Amit Patel","DOB: 05/07/1990","XXXX XXXX 2341"], color:"#EDE9FE", border:"#6D28D9" },
      selfieInitials:"AP", role:"agent", password:"amit@789",
    },
    { id:"USR004", name:"Sunita Verma",  mobile:"9632587410", email:"sunita@gmail.com",  dob:"19 Sep 1992", pan:"PQRST9012L", aadhaar:"7743 XXXX XXXX", address:"27, Civil Lines, Jaipur 302006", kyc:"pending",  status:"active",  wallet:"₹0",     joinDate:"18 Mar 2024",
      panDoc:{ lines:["INCOME TAX DEPARTMENT","GOVT. OF INDIA","Name: SUNITA VERMA","DOB: 19/09/1992","PAN: PQRST9012L"], color:"#FEF3C7", border:"#D97706" },
      aadhaarDoc:{ lines:["Government of India","आधार","Name: Sunita Verma","DOB: 19/09/1992","XXXX XXXX 7743"], color:"#EDE9FE", border:"#6D28D9" },
      selfieInitials:"SV", role:"agent", password:"sunita@321",
    },
    { id:"ADM001", name:"Super Admin", mobile:"9000000001", email:"admin@s3payments.com", dob:"01 Jan 1985", pan:"ADMIN1234A", aadhaar:"0000 0000 0001", address:"S3 HQ, Bangalore", kyc:"approved", status:"active", wallet:"—", joinDate:"01 Jan 2024", role:"admin", selfieInitials:"SA", panDoc:{ lines:["INCOME TAX DEPARTMENT","GOVT. OF INDIA","Name: SUPER ADMIN","DOB: 01/01/1985","PAN: ADMIN1234A"], color:"#FEF3C7", border:"#D97706" }, aadhaarDoc:{ lines:["Government of India","आधार","Name: Super Admin","DOB: 01/01/1985","XXXX XXXX 0001"], color:"#EDE9FE", border:"#6D28D9" } },
  ]);

  const [kycList, setKycList] = useState([
    {
      id:"KYC001", name:"Priya Sharma", mobile:"9845612300", dob:"12 Mar 1994",
      pan:"ABCDE1234F", aadhaar:"8890 XXXX XXXX",
      panDoc:{ label:"PAN Card", color:"#FEF3C7", border:"#D97706", icon:"🪪", lines:["INCOME TAX DEPARTMENT","GOVT. OF INDIA","Name: PRIYA SHARMA","DOB: 12/03/1994","PAN: ABCDE1234F"] },
      aadhaarDoc:{ label:"Aadhaar Card", color:"#EDE9FE", border:"#6D28D9", icon:"🏛️", lines:["Government of India","आधार","Name: Priya Sharma","DOB: 12/03/1994","XXXX XXXX 8890"] },
      selfieDoc:{ label:"Selfie", color:"#E0F2FE", border:"#0891B2", icon:"🤳", initials:"PS" },
      submitted:"2h ago", status:"pending",
    },
    {
      id:"KYC002", name:"Sunita Verma", mobile:"9632587410", dob:"05 Jul 1990",
      pan:"FGHIJ5678K", aadhaar:"2341 XXXX XXXX",
      panDoc:{ label:"PAN Card", color:"#FEF3C7", border:"#D97706", icon:"🪪", lines:["INCOME TAX DEPARTMENT","GOVT. OF INDIA","Name: SUNITA VERMA","DOB: 05/07/1990","PAN: FGHIJ5678K"] },
      aadhaarDoc:{ label:"Aadhaar Card", color:"#EDE9FE", border:"#6D28D9", icon:"🏛️", lines:["Government of India","आधार","Name: Sunita Verma","DOB: 05/07/1990","XXXX XXXX 2341"] },
      selfieDoc:{ label:"Selfie", color:"#E0F2FE", border:"#0891B2", icon:"🤳", initials:"SV" },
      submitted:"5h ago", status:"pending",
    },
    {
      id:"KYC003", name:"Rajesh Kumar", mobile:"9876543210", dob:"28 Nov 1988",
      pan:"KLMNO9012L", aadhaar:"5567 XXXX XXXX",
      panDoc:{ label:"PAN Card", color:"#FEF3C7", border:"#D97706", icon:"🪪", lines:["INCOME TAX DEPARTMENT","GOVT. OF INDIA","Name: RAJESH KUMAR","DOB: 28/11/1988","PAN: KLMNO9012L"] },
      aadhaarDoc:{ label:"Aadhaar Card", color:"#EDE9FE", border:"#6D28D9", icon:"🏛️", lines:["Government of India","आधार","Name: Rajesh Kumar","DOB: 28/11/1988","XXXX XXXX 5567"] },
      selfieDoc:{ label:"Selfie", color:"#E0F2FE", border:"#0891B2", icon:"🤳", initials:"RK" },
      submitted:"1d ago",  status:"approved",
    },
  ]);

  const adminTabs = [
    { id:"overview",  icon:"📈", label:"Overview" },
    { id:"users",     icon:"🫂", label:"Users" },
    { id:"txns",      icon:"🪙", label:"Txns" },
    { id:"kyc",       icon:"🗃️", label:"KYC" },
    { id:"offers",    icon:"🎀", label:"Offers" },
    { id:"tickets",   icon:"🗨️", label:"Tickets" },
    { id:"fees",      icon:"🔧", label:"Fees" },
    { id:"limits",    icon:"🎛️", label:"Limits" },
    { id:"doorstep",  icon:"🏧", label:"Doorstep" },
  ];

  // ── Derived values — computed AFTER all useState calls ────────────────────
  const flaggedTxns      = mockTxns.filter(t => t.status === "failed");
  const flaggedUsers     = users.filter(u => u.status === "blocked");
  const kycPendingUsers  = kycList.filter(k => k.status === "pending");

  const stats = [
    { label:"Total Users",  value: users.length,                                                       icon:"🫂", color:"#6D28D9", overlayKey:"users"      },
    { label:"Total Txns",   value: mockTxns.length,                                                    icon:"🪙", color:"#0891B2", overlayKey:"txns"       },
    { label:"KYC Pending",  value: kycList.filter(k=>k.status==="pending").length,                    icon:"🗃️", color:"#D97706", overlayKey:"kycPending" },
    { label:"Flagged",      value: flaggedTxns.length + flaggedUsers.length,                           icon:"🚨", color:"#E11D48", overlayKey:"flagged"    },
  ];

  // ── Full-screen doc viewer modal ──────────────────────────────────────────
  const DocModal = () => !docViewer ? null : (
    <div onClick={() => setDocViewer(null)} style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(10,8,30,0.92)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:20, animation:"fadeUp 0.25s ease both",
    }}>
      {/* Header */}
      <div style={{ width:"100%", maxWidth:360, display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:9 }}>{docViewer.icon}</span>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#fff" }}>{docViewer.label}</span>
        </div>
        <button onClick={() => setDocViewer(null)} style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.30)", color:"#fff", borderRadius:8, width:32, height:32, cursor:"pointer", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
      </div>

      {/* Image / Document */}
      <div style={{ width:"100%", maxWidth:360, borderRadius:16, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.6)" }}
        onClick={e => e.stopPropagation()}>
        {docViewer.src ? (
          <img src={docViewer.src} alt={docViewer.label}
            style={{ width:"100%", display:"block", maxHeight:480, objectFit:"contain", background: docViewer.type==="selfie" ? "#E0F2FE" : docViewer.type==="aadhaar" ? "#EDE9FE" : "#FFFBEB" }} />
        ) : docViewer.mockLines ? (
          <div style={{ background: docViewer.mockColor||"#F5F5F5", padding:24 }}>
            {docViewer.mockLines.map((line,i) => (
              <div key={i} style={{ fontSize:i===0?11:i===4?16:13, fontWeight:i===0||i===4?700:400, color:i===0?"#92400E":i===1?"#4C1D95":i===4?"#1A1035":"#374151", marginBottom:6, letterSpacing:i===4?"0.10em":"normal", fontFamily:"'Space Grotesk',sans-serif" }}>{line}</div>
            ))}
          </div>
        ) : docViewer.initials ? (
          <div style={{ background:"#E0F2FE", padding:32, display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
            <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,#6D28D9,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9, border:"3px solid rgba(255,255,255,0.90)", boxShadow:"0 6px 20px rgba(109,40,217,0.35)" }}>{docViewer.initials}</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>Live Selfie</div>
            <span style={{ fontSize:9, background:"rgba(5,150,105,0.12)", color:"#059669", padding:"4px 12px", borderRadius:6, fontWeight:900 }}>✓ Liveness verified</span>
          </div>
        ) : (
          <div style={{ padding:40, textAlign:"center", background:"#1A1035" }}>
            <div style={{ fontSize:9, marginBottom:8 }}>{docViewer.icon}</div>
            <div style={{ color:"rgba(255,255,255,0.60)", fontSize:9 }}>Document not available</div>
          </div>
        )}
      </div>

      <div style={{ marginTop:12, fontSize:9, color:"rgba(255,255,255,0.50)" }}>Tap anywhere to close</div>
    </div>
  );

  // ── Overlay panel (slide-up drawer) ───────────────────────────────────────
  const OverlayPanel = () => !overlayView ? null : (
    <div style={{ position:"fixed", inset:0, zIndex:600, background:"rgba(10,8,30,0.80)", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}
      onClick={() => setOverlayView(null)}>
      <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", maxHeight:"75%", display:"flex", flexDirection:"column", animation:"fadeUp 0.3s ease both" }}
        onClick={e => e.stopPropagation()}>
        {/* Drag handle */}
        <div style={{ display:"flex", justifyContent:"center", padding:"10px 0 4px" }}>
          <div style={{ width:40, height:4, borderRadius:2, background:"rgba(109,40,217,0.25)" }} />
        </div>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 16px 12px", borderBottom:"1px solid rgba(109,40,217,0.10)" }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>
            {overlayView === "users"      ? "👥 All Users & Agents" :
             overlayView === "txns"       ? "💳 All Transactions" :
             overlayView === "kycPending" ? "📋 KYC Pending" :
             "🚨 Flagged Details"}
          </div>
          <button onClick={() => setOverlayView(null)} style={{ background:"rgba(225,29,72,0.08)", border:"none", color:C.danger, borderRadius:8, width:28, height:28, cursor:"pointer", fontSize:9 }}>✕</button>
        </div>
        {/* Scrollable content */}
        <div style={{ overflowY:"auto", padding:"12px 14px 20px", flex:1 }}>

          {/* USERS */}
          {overlayView === "users" && (
            <>
              {users.length === 0 ? <div style={{ textAlign:"center", color:C.muted, padding:24, fontSize:9 }}>No users found</div> : users.map(u => (
                <button key={u.id} onClick={() => { setOverlayView(null); setTab("users"); setSelectedUser(u); }} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                  <div style={{ background:"#F9F8FF", border:"1px solid rgba(109,40,217,0.12)", borderRadius:12, padding:"10px 12px", display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background: u.role==="admin"?"linear-gradient(135deg,#4F46E5,#6D28D9)":"linear-gradient(135deg,#6D28D9,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9, flexShrink:0 }}>
                      {u.role==="admin"?"🎖️":u.name[0]}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:900, fontSize:9, color:"#1A1035", display:"flex", alignItems:"center", gap:5 }}>
                        {u.name}
                        <span style={{ fontSize:9, padding:"1px 6px", borderRadius:20, background: u.role==="admin"?"rgba(79,70,229,0.12)":"rgba(8,145,178,0.10)", color: u.role==="admin"?"#4F46E5":"#0891B2", fontWeight:900 }}>
                          {u.role==="admin"?"👑 Admin":"🧑‍💼 Agent"}
                        </span>
                      </div>
                      <div style={{ fontSize:9, color:C.muted }}>{u.mobile} · {u.id}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <Chip label={u.status} color={u.status==="active"?C.success:C.danger} />
                      <div style={{ fontSize:9, color:"#6D28D9", marginTop:3 }}>View →</div>
                    </div>
                  </div>
                </button>
              ))}
            </>
          )}

          {/* TXNS */}
          {overlayView === "txns" && (
            <>
              {mockTxns.length === 0 ? <div style={{ textAlign:"center", color:C.muted, padding:24, fontSize:9 }}>No transactions</div> : mockTxns.map(t => (
                <button key={t.id} onClick={() => { setOverlayView(null); setTab("txns"); setSelectedTxn(t); }} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                  <div style={{ background:"#F9F8FF", border:"1px solid rgba(109,40,217,0.12)", borderRadius:12, padding:"10px 12px", display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:34, height:34, borderRadius:10, background:`linear-gradient(135deg,${t.type==="credit"?"#6D28D9":"#0891B2"},${t.type==="credit"?"#0891B2":"#6D28D9"})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>
                      {t.type==="credit"?"↑":t.type==="transfer"?"🏛️":"⚡"}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{t.user}</div>
                      <div style={{ fontSize:9, color:C.muted }}>{t.method} · {t.date}</div>
                      <div style={{ fontSize:9, color:C.muted }}>{t.id}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontWeight:900, fontSize:9, color:t.type==="credit"?C.success:"#0891B2" }}>{t.amount}</div>
                      <Chip label={t.status} color={t.status==="success"?C.success:C.danger} />
                    </div>
                  </div>
                </button>
              ))}
            </>
          )}

          {/* KYC PENDING */}
          {overlayView === "kycPending" && (
            <>
              {kycPendingUsers.length === 0 ? (
                <div style={{ textAlign:"center", padding:24 }}>
                  <div style={{ fontSize:9, marginBottom:8 }}>✅</div>
                  <div style={{ fontSize:9, color:C.muted }}>No pending KYC applications</div>
                </div>
              ) : kycPendingUsers.map(k => (
                <button key={k.id} onClick={() => { setOverlayView(null); setTab("kyc"); }} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                  <div style={{ background:"rgba(217,119,6,0.06)", border:"1px solid rgba(217,119,6,0.25)", borderRadius:12, padding:"12px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#D97706,#F59E0B)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9 }}>{k.name[0]}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{k.name}</div>
                        <div style={{ fontSize:9, color:C.muted }}>{k.mobile} · Submitted {k.submitted}</div>
                      </div>
                      <Chip label="Pending" color={C.warning} />
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                      {[["PAN",k.pan],["Aadhaar",k.aadhaar],["DOB",k.dob]].map(([l,v])=>(
                        <div key={l} style={{ background:"rgba(217,119,6,0.08)", borderRadius:7, padding:"5px 8px" }}>
                          <div style={{ fontSize:9, color:C.muted }}>{l}</div>
                          <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:8, fontSize:9, color:"#D97706", fontWeight:900 }}>Tap to review in KYC tab →</div>
                  </div>
                </button>
              ))}
            </>
          )}

          {/* FLAGGED */}
          {overlayView === "flagged" && (
            <>
              {/* Flagged transactions */}
              {flaggedTxns.length > 0 && (
                <>
                  <div style={{ fontSize:9, color:C.danger, fontWeight:900, letterSpacing:"0.05em", textTransform:"uppercase", marginBottom:8 }}>🚨 Failed / Suspicious Transactions</div>
                  {flaggedTxns.map(t => (
                    <button key={t.id} onClick={() => { setOverlayView(null); setTab("txns"); setSelectedTxn(t); }} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                      <div style={{ background:"rgba(225,29,72,0.06)", border:"1px solid rgba(225,29,72,0.22)", borderRadius:12, padding:"10px 12px", display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:34, height:34, borderRadius:10, background:"rgba(225,29,72,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>⚠️</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{t.user}</div>
                          <div style={{ fontSize:9, color:C.muted }}>{t.method} · {t.date} · {t.amount}</div>
                          {t.failReason && <div style={{ fontSize:9, color:C.danger, marginTop:2 }}>{t.failReason}</div>}
                        </div>
                        <Chip label="Failed" color={C.danger} />
                      </div>
                    </button>
                  ))}
                </>
              )}
              {/* Flagged / blocked users */}
              {flaggedUsers.length > 0 && (
                <>
                  <div style={{ fontSize:9, color:C.danger, fontWeight:900, letterSpacing:"0.05em", textTransform:"uppercase", margin:"12px 0 8px" }}>🔒 Blocked Users</div>
                  {flaggedUsers.map(u => (
                    <button key={u.id} onClick={() => { setOverlayView(null); setTab("users"); setSelectedUser(u); }} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                      <div style={{ background:"rgba(225,29,72,0.06)", border:"1px solid rgba(225,29,72,0.22)", borderRadius:12, padding:"10px 12px", display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:36, height:36, borderRadius:10, background:"rgba(225,29,72,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:9, color:C.danger }}>🔒</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{u.name}</div>
                          <div style={{ fontSize:9, color:C.muted }}>{u.mobile} · {u.id}</div>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <Chip label="Blocked" color={C.danger} />
                          <div style={{ fontSize:9, color:"#6D28D9", marginTop:3 }}>View →</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </>
              )}
              {flaggedTxns.length === 0 && flaggedUsers.length === 0 && (
                <div style={{ textAlign:"center", padding:24 }}>
                  <div style={{ fontSize:9, marginBottom:8 }}>✅</div>
                  <div style={{ fontSize:9, color:C.muted }}>No flagged items</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100%", background:"#F5F4FF", display:"flex", flexDirection:"column" }}>
      <DocModal />
      <OverlayPanel />
      {/* Admin Header */}
      <div style={{ background:"#fff", borderBottom:"1px solid rgba(0,210,180,0.18)", padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 1px 8px rgba(0,160,140,0.07)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <S3Logo variant="light" size="sm" />
          <div style={{ width:1, height:28, background:"rgba(0,160,140,0.18)" }} />
          <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:9, fontWeight:900, color:"rgba(0,125,110,0.60)", letterSpacing:"3px", textTransform:"uppercase" }}>Admin Panel</div>
        </div>
        {/* Profile icon */}
        <button onClick={() => setShowAdminProfile(true)} style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#00d2b4,#0066ff)", border:"2.5px solid rgba(255,255,255,0.7)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:"0 3px 10px rgba(0,210,180,0.35)", flexShrink:0, position:"relative" }}>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:9, color:"#fff", fontWeight:900 }}>AD</span>
        </button>
      </div>

      {/* Admin Profile Drawer */}
      {showAdminProfile && (
        <div onClick={() => setShowAdminProfile(false)} style={{ position:"fixed", inset:0, zIndex:800, background:"rgba(10,8,30,0.70)", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:"20px 20px 0 0", maxHeight:"80%", display:"flex", flexDirection:"column", animation:"fadeUp 0.3s ease both" }}>
            {/* Drag handle */}
            <div style={{ display:"flex", justifyContent:"center", padding:"10px 0 4px" }}>
              <div style={{ width:40, height:4, borderRadius:2, background:"rgba(0,160,140,0.25)" }} />
            </div>
            {/* Profile header — hero style */}
            <div style={{ background:"linear-gradient(135deg,#00d2b4,#0066ff)", borderRadius:"16px 16px 0 0", padding:"16px 18px 20px", position:"relative" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"rgba(255,255,255,0.85)", letterSpacing:"0.06em" }}>ADMIN PROFILE</div>
                <button onClick={() => setShowAdminProfile(false)} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.30)", color:"#fff", borderRadius:9, width:30, height:30, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon name="xmark" size={14} color="#fff" />
                </button>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                {/* Avatar ring */}
                <div style={{ position:"relative", flexShrink:0 }}>
                  <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.20)", border:"3px solid rgba(255,255,255,0.60)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 20px rgba(0,0,0,0.20)" }}>
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:15, color:"#fff", letterSpacing:"-0.5px" }}>AD</span>
                  </div>
                  {/* Online dot */}
                  <div style={{ position:"absolute", bottom:2, right:2, width:14, height:14, borderRadius:"50%", background:"#22c55e", border:"2px solid #fff", boxShadow:"0 0 6px rgba(34,197,94,0.6)" }} />
                </div>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#fff", marginBottom:2 }}>Admin User</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                    <div style={{ background:"rgba(255,255,255,0.20)", borderRadius:20, padding:"2px 10px", display:"flex", alignItems:"center", gap:4 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#FFD700"/></svg>
                      <span style={{ fontSize:8, color:"#fff", fontWeight:900 }}>Super Admin</span>
                    </div>
                  </div>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)", fontWeight:700 }}>ADM001</div>
                </div>
              </div>
            </div>
            {/* Details */}
            <div style={{ overflowY:"auto", padding:"12px 18px 24px" }}>
              {[
                { iconName:"user",   color:"#6D28D9", label:"Full Name",    value:"Admin User" },
                { iconName:"phone",  color:"#0891B2", label:"Mobile",       value:"9000000001" },
                { iconName:"mail",   color:"#059669", label:"Email ID",     value:"admin@s3payments.com" },
                { iconName:"tag",    color:"#D97706", label:"User ID",      value:"ADM001" },
                { iconName:"key",    color:"#7C3AED", label:"Login ID",     value:"admin" },
                { iconName:"shield", color:"#E11D48", label:"Role",         value:"Super Admin ★" },
                { iconName:"clock",  color:"#0891B2", label:"Member Since", value:"01 January 2024" },
              ].map(({ iconName, color, label, value }) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 0", borderBottom:"1px solid rgba(0,160,140,0.07)" }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:`${color}12`, border:`1px solid ${color}20`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon name={iconName} size={13} color={color} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:8, color:"rgba(0,125,110,0.60)", fontWeight:900, letterSpacing:"0.05em", textTransform:"uppercase" }}>{label}</div>
                    <div style={{ fontSize:9, fontWeight:900, color:"#1A1035", marginTop:1, fontFamily:"'Space Grotesk',sans-serif" }}>{value}</div>
                  </div>
                </div>
              ))}
              {/* Security Settings */}
              <div style={{ marginTop:14, padding:"10px 0 4px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                  <Icon name="shield" size={14} color="#007d6e" />
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#007d6e", letterSpacing:"1.5px", textTransform:"uppercase" }}>Security</span>
                </div>
                {[
                  { key:"twoFa",      iconName:"lock",        activeColor:"#6D28D9", label:"Two-Factor Auth",   desc:"Extra OTP on every login" },
                  { key:"biometric",  iconName:"fingerprint", activeColor:"#0891B2", label:"Biometric Login",    desc:"Fingerprint / Face ID" },
                  { key:"txnPin",     iconName:"key",         activeColor:"#D97706", label:"Transaction PIN",    desc:"PIN required for approvals" },
                  { key:"loginNotif", iconName:"bell",        activeColor:"#059669", label:"Login Alerts",       desc:"Notify on every admin login" },
                  { key:"txnNotif",   iconName:"phone",       activeColor:"#0891B2", label:"Activity Alerts",    desc:"Notify on dashboard activity" },
                ]                .map(({ key, iconName, activeColor, label, desc }) => (
                  <div key={key} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 0", borderBottom:"1px solid rgba(0,160,140,0.07)" }}>
                    <div style={{ width:30, height:30, borderRadius:9, background:adminSecurity[key]?`${activeColor}15`:"rgba(0,0,0,0.04)", border:`1.5px solid ${adminSecurity[key]?`${activeColor}30`:"rgba(0,0,0,0.08)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s" }}>
                      <Icon name={iconName} size={14} color={adminSecurity[key]?activeColor:"#9CA3AF"} />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{label}</div>
                      <div style={{ fontSize:8, color:C.muted, marginTop:1 }}>{desc}</div>
                    </div>
                    <div onClick={() => {
                      const next = !adminSecurity[key];
                      if (key === "txnPin" && next && !adminPin) { setShowAdminPinSetup(true); return; }
                      if (key === "txnPin" && !next) { setAdminPin(null); }
                      if (key === "biometric" && next && !adminBiometricDone) { setShowAdminBiometric(true); return; }
                      if (key === "biometric" && !next) { setAdminBiometricDone(false); }
                      setAdminSecurity(s=>({...s,[key]:next}));
                    }} style={{ width:38, height:20, borderRadius:10, background:adminSecurity[key]?activeColor:"rgba(0,0,0,0.14)", cursor:"pointer", position:"relative", transition:"background 0.25s", flexShrink:0 }}>
                      <div style={{ position:"absolute", top:2, left:adminSecurity[key]?19:2, width:16, height:16, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 4px rgba(0,0,0,0.25)", transition:"left 0.25s" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* ── PIN Setup Modal ── */}
              {showAdminPinSetup && (
                <div style={{ background:"rgba(109,40,217,0.06)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:12, padding:"12px", marginTop:8, animation:"fadeUp 0.25s ease both" }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#6D28D9", marginBottom:8 }}>🔢 Set Transaction PIN</div>
                  <input type="password" maxLength={6} value={adminNewPin} onChange={e=>setAdminNewPin(e.target.value.replace(/[^0-9]/g,"").slice(0,6))} placeholder="Enter 4-6 digit PIN"
                    style={{ width:"100%", borderRadius:8, border:"1.5px solid rgba(109,40,217,0.30)", padding:"8px 10px", fontSize:10, fontWeight:900, color:"#1A1035", background:"#fff", outline:"none", marginBottom:6, fontFamily:"inherit" }} />
                  <input type="password" maxLength={6} value={adminConfirmPin} onChange={e=>setAdminConfirmPin(e.target.value.replace(/[^0-9]/g,"").slice(0,6))} placeholder="Confirm PIN"
                    style={{ width:"100%", borderRadius:8, border:`1.5px solid ${adminPinError?"rgba(225,29,72,0.40)":"rgba(109,40,217,0.30)"}`, padding:"8px 10px", fontSize:10, fontWeight:900, color:"#1A1035", background:"#fff", outline:"none", marginBottom:6, fontFamily:"inherit" }} />
                  {adminPinError && <div style={{ fontSize:8, color:C.danger, marginBottom:6 }}>{adminPinError}</div>}
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={() => { setShowAdminPinSetup(false); setAdminNewPin(""); setAdminConfirmPin(""); setAdminPinError(""); }}
                      style={{ flex:1, background:"rgba(0,0,0,0.05)", border:"none", borderRadius:8, padding:"7px", fontSize:9, fontWeight:900, color:C.muted, cursor:"pointer" }}>Cancel</button>
                    <button onClick={() => {
                      if (adminNewPin.length < 4) { setAdminPinError("PIN must be 4-6 digits"); return; }
                      if (adminNewPin !== adminConfirmPin) { setAdminPinError("PINs do not match"); return; }
                      setAdminPin(adminNewPin); setAdminSecurity(s=>({...s,txnPin:true}));
                      setShowAdminPinSetup(false); setAdminNewPin(""); setAdminConfirmPin(""); setAdminPinError("");
                    }} style={{ flex:2, background:"linear-gradient(135deg,#6D28D9,#0891B2)", border:"none", borderRadius:8, padding:"7px", fontSize:9, fontWeight:900, color:"#fff", cursor:"pointer" }}>✅ Set PIN</button>
                  </div>
                </div>
              )}
              {/* ── Biometric Verify Modal ── */}
              {showAdminBiometric && (
                <div style={{ background:"rgba(8,145,178,0.06)", border:"1.5px solid rgba(8,145,178,0.20)", borderRadius:12, padding:"14px", marginTop:8, textAlign:"center", animation:"fadeUp 0.25s ease both" }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#0891B2", marginBottom:8 }}>👆 Verify Biometric</div>
                  <div style={{ fontSize:8, color:C.muted, marginBottom:10 }}>Tap the sensor to register your biometric</div>
                  <div onClick={async () => {
                    await sleep(600);
                    setAdminBiometricDone(true);
                    setAdminSecurity(s=>({...s,biometric:true}));
                    setShowAdminBiometric(false);
                  }} style={{ width:60, height:60, borderRadius:"50%", background:"linear-gradient(135deg,#E0F2FE,#BAE6FD)", border:"2.5px solid #0891B2", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", margin:"0 auto 10px", boxShadow:"0 4px 16px rgba(8,145,178,0.25)" }}>
                    <Icon name="fingerprint" size={28} color="#0891B2" />
                  </div>
                  <button onClick={() => setShowAdminBiometric(false)} style={{ background:"none", border:"none", fontSize:8, color:C.muted, cursor:"pointer" }}>Cancel</button>
                </div>
              )}
              {/* ── 2FA note ── */}
              {adminSecurity.twoFa && (
                <div style={{ background:"rgba(109,40,217,0.06)", borderRadius:8, padding:"7px 10px", marginTop:6, display:"flex", alignItems:"center", gap:6 }}>
                  <Icon name="info" size={12} color="#6D28D9" />
                  <span style={{ fontSize:8, color:"#6D28D9", fontWeight:900 }}>OTP required on every login (password login will also ask for OTP)</span>
                </div>
              )}
              {adminPin && (
                <div style={{ background:"rgba(217,119,6,0.06)", borderRadius:8, padding:"7px 10px", marginTop:6, display:"flex", alignItems:"center", gap:6 }}>
                  <Icon name="check" size={12} color="#D97706" />
                  <span style={{ fontSize:8, color:"#D97706", fontWeight:900 }}>Transaction PIN is set · Required for all approvals</span>
                </div>
              )}

              {/* Change Password */}
              <button onClick={() => { setShowAdminChangePwd(true); setAdminPwdError(""); setAdminPwdSuccess(false); setAdminPwdOld(""); setAdminPwdNew(""); setAdminPwdConfirm(""); }} style={{ width:"100%", marginTop:14, background:"rgba(0,210,180,0.07)", border:"1.5px solid rgba(0,210,180,0.30)", color:"#007d6e", borderRadius:12, padding:"10px", fontSize:9, fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                <Icon name="key" size={15} color="#007d6e" />
                Change Password
              </button>
              {/* Logout */}
              <button onClick={() => { setShowAdminProfile(false); (onRequestLogout || onLogout)(); }} style={{ width:"100%", marginTop:10, background:"rgba(225,29,72,0.07)", border:"1.5px solid rgba(225,29,72,0.22)", color:C.danger, borderRadius:12, padding:"10px", fontSize:9, fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                <Icon name="logout" size={15} color={C.danger} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Change Password Modal */}
      {showAdminChangePwd && (
        <div onClick={() => setShowAdminChangePwd(false)} style={{ position:"fixed", inset:0, zIndex:900, background:"rgba(10,8,30,0.75)", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:"20px 20px 0 0", animation:"fadeUp 0.3s ease both", padding:"0 0 24px" }}>
            <div style={{ display:"flex", justifyContent:"center", padding:"10px 0 4px" }}>
              <div style={{ width:40, height:4, borderRadius:2, background:"rgba(0,160,140,0.25)" }} />
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"4px 18px 14px", borderBottom:"1px solid rgba(0,210,180,0.12)" }}>
              <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:900, fontSize:9, color:"#007d6e" }}>🔑 Change Password</div>
              <button onClick={() => setShowAdminChangePwd(false)} style={{ background:"rgba(225,29,72,0.08)", border:"none", color:C.danger, borderRadius:8, width:28, height:28, cursor:"pointer", fontSize:9 }}>✕</button>
            </div>
            {adminPwdSuccess ? (
              <div style={{ textAlign:"center", padding:"28px 18px" }}>
                <div style={{ fontSize:9, marginBottom:10 }}>✅</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:C.success }}>Password Changed!</div>
                <div style={{ fontSize:9, color:C.muted, marginTop:6, marginBottom:12 }}>Admin password updated successfully</div>
                <button onClick={() => setShowAdminChangePwd(false)} style={{ background:"linear-gradient(135deg,#00d2b4,#0066ff)", color:"#fff", border:"none", borderRadius:10, padding:"10px 28px", fontSize:9, fontWeight:900, cursor:"pointer" }}>Done</button>
              </div>
            ) : (
              <div style={{ padding:"16px 18px 0" }}>
                {[
                  { label:"Current Password", val:adminPwdOld, set:setAdminPwdOld, show:showAdminPwdOld, toggleShow:() => setShowAdminPwdOld(s=>!s) },
                  { label:"New Password",     val:adminPwdNew, set:setAdminPwdNew, show:showAdminPwdNew, toggleShow:() => setShowAdminPwdNew(s=>!s) },
                ].map(({ label, val, set, show, toggleShow }) => (
                  <div key={label} style={{ marginBottom:8 }}>
                    <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900, display:"flex", justifyContent:"space-between", letterSpacing:"0.04em" }}>
                      <span>{label.toUpperCase()}</span>
                      <button onClick={toggleShow} style={{ background:"none", border:"none", cursor:"pointer", fontSize:9, color:"#007d6e", fontWeight:900 }}>{show ? "🙈 Hide" : "👁 Show"}</button>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", background:"#F9F8FF", border:`1.5px solid ${val?"rgba(0,210,180,0.40)":"rgba(0,160,140,0.18)"}`, borderRadius:10, padding:"0 12px", height:44 }}>
                      <input type={show?"text":"password"} value={val} onChange={e=>set(e.target.value)} placeholder="Enter password"
                        style={{ flex:1, background:"none", border:"none", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit" }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginBottom:8 }}>
                  <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900, letterSpacing:"0.04em" }}>CONFIRM NEW PASSWORD</div>
                  <div style={{ display:"flex", alignItems:"center", background:"#F9F8FF", border:`1.5px solid ${adminPwdConfirm&&adminPwdConfirm===adminPwdNew?"rgba(5,150,105,0.40)":adminPwdConfirm&&adminPwdConfirm!==adminPwdNew?"rgba(225,29,72,0.40)":"rgba(0,160,140,0.18)"}`, borderRadius:10, padding:"0 12px", height:44 }}>
                    <input type="password" value={adminPwdConfirm} onChange={e=>setAdminPwdConfirm(e.target.value)} placeholder="Re-enter new password"
                      style={{ flex:1, background:"none", border:"none", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit" }} />
                    {adminPwdConfirm && <span style={{ fontSize:9 }}>{adminPwdConfirm===adminPwdNew?"☑️":"✖️"}</span>}
                  </div>
                </div>
                {adminPwdNew && (
                  <div style={{ marginBottom:10 }}>
                    <div style={{ fontSize:9, color:C.muted, marginBottom:3 }}>Password strength</div>
                    <div style={{ height:4, background:"#EDE9FE", borderRadius:3, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:adminPwdNew.length<6?"30%":adminPwdNew.length<10?"60%":"100%", background:adminPwdNew.length<6?C.danger:adminPwdNew.length<10?C.warning:C.success, borderRadius:3, transition:"all 0.3s" }} />
                    </div>
                    <div style={{ fontSize:9, color:adminPwdNew.length<6?C.danger:adminPwdNew.length<10?C.warning:C.success, marginTop:2 }}>
                      {adminPwdNew.length<6?"Weak":adminPwdNew.length<10?"Fair":"Strong ✓"}
                    </div>
                  </div>
                )}
                {adminPwdError && <div style={{ fontSize:9, color:C.danger, marginBottom:10, display:"flex", alignItems:"center", gap:5 }}>⚠️ {adminPwdError}</div>}
                <button
                  onClick={() => {
                    setAdminPwdError("");
                    if (!adminPwdOld) { setAdminPwdError("Enter your current password"); return; }
                    if (adminPwdNew.length < 6) { setAdminPwdError("New password must be at least 6 characters"); return; }
                    if (adminPwdNew !== adminPwdConfirm) { setAdminPwdError("Passwords do not match"); return; }
                    setAdminPwdSuccess(true);
                  }}
                  disabled={!adminPwdOld||!adminPwdNew||!adminPwdConfirm}
                  style={{ width:"100%", background:(!adminPwdOld||!adminPwdNew||!adminPwdConfirm)?"rgba(0,210,180,0.15)":"linear-gradient(135deg,#00d2b4,#0066ff)", color:(!adminPwdOld||!adminPwdNew||!adminPwdConfirm)?"rgba(0,160,140,0.50)":"#fff", border:"none", borderRadius:12, padding:"13px", fontSize:9, fontWeight:900, cursor:(!adminPwdOld||!adminPwdNew||!adminPwdConfirm)?"not-allowed":"pointer" }}>
                  🔑 Update Password
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ flex:1, overflowY:"auto", padding:"12px 12px 72px" }}>
        {tab === "overview" && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize: 13, marginBottom:10, color:"#1A1035" }}>Dashboard Overview</div>
            {/* Admin Service Grid — PhonePe style matching agent home */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6, marginBottom:8 }}>
              {[
                { label:"Users",    iconName:"users",        color:"#6D28D9", bg:"#EDE9FE", t:"users"    },
                { label:"Txns",     iconName:"transactions", color:"#0891B2", bg:"#E0F2FE", t:"txns"     },
                { label:"KYC",      iconName:"kyc",          color:"#D97706", bg:"#FEF3C7", t:"kyc"      },
                { label:"Offers",   iconName:"gift",         color:"#059669", bg:"#D1FAE5", t:"offers"   },
                { label:"Tickets",  iconName:"ticket",       color:"#E11D48", bg:"#FFE4E6", t:"tickets"  },
                { label:"Fees",     iconName:"settings",     color:"#7C3AED", bg:"#EDE9FE", t:"fees"     },
                { label:"Limits",   iconName:"sliders",      color:"#D97706", bg:"#FEF3C7", t:"limits"   },
                { label:"Doorstep", iconName:"doorbell",     color:"#0D9488", bg:"#CCFBF1", t:"doorstep" },
              ].map(({ iconName, label, color, bg, t }) => (
                <button key={label} onClick={() => setTab(t)} style={{
                  background:"#fff", border:"none", borderRadius:12, padding:"7px 3px 5px",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:3,
                  cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.06)",
                  transition:"transform 0.13s, box-shadow 0.13s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow=`0 5px 16px ${color}25`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 2px 10px rgba(0,0,0,0.07)";}}
                >
                  <div style={{ width:34, height:34, borderRadius:10, background:bg, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 2px 6px ${color}18` }}>
                    <Icon name={iconName} size={17} color={color} />
                  </div>
                  <span style={{ fontSize:8, color:"#374151", fontWeight:900, textAlign:"center" }}>{label}</span>
                </button>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
              {stats.map(s => (
                <button key={s.label} onClick={() => setOverlayView(s.overlayKey)} className="card-hover"
                  style={{ background:"#fff", borderRadius:16, padding:"16px", border:`1.5px solid ${s.color}22`, boxShadow:`0 2px 12px ${s.color}10`, cursor:"pointer", textAlign:"left", transition:"all 0.2s" }}>
                  <div style={{ fontSize: 13, marginBottom:6 }}>{s.icon}</div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize: 16, fontWeight:900, color:s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color:C.muted, marginTop:2 }}>{s.label}</div>
                  <div style={{ fontSize:9, color:s.color, marginTop:5, fontWeight:900 }}>Tap to view →</div>
                </button>
              ))}
            </div>

            {/* Recent Flags */}
            <Card style={{ marginBottom:8 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, marginBottom:8, fontSize: 12 }}>🚨 Risk Alerts</div>
              {[
                { msg:"High velocity: Amit Patel — 3 txns in 10 min", severity:"high" },
                { msg:"KYC mismatch detected: Sunita Verma", severity:"medium" },
              ].map((a,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background: a.severity==="high" ? C.danger : C.gold, flexShrink:0 }} />
                  <span style={{ fontSize: 11, color:"#1A1035", flex:1 }}>{a.msg}</span>
                  <Chip label={a.severity} color={a.severity==="high" ? C.danger : C.gold} />
                </div>
              ))}
            </Card>

            {/* Volume chart bars */}
            <Card style={{ marginBottom:8 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, marginBottom:8, fontSize: 12 }}>📈 Today's Volume</div>
              {[["Add Money","₹28,500",72],["Transfers","₹19,200",48],["Fees Collected","₹640",16]].map(([l,v,pct])=>(
                <div key={l} style={{ marginBottom:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize: 11, marginBottom:4 }}>
                    <span style={{ color:C.muted }}>{l}</span><span style={{ fontWeight:900, color:"#1A1035" }}>{v}</span>
                  </div>
                  <div style={{ height:6, background:"#EDE9FE", borderRadius:3, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#6D28D9,#0891B2)", borderRadius:3, animation:"barFill 1s ease both" }} />
                  </div>
                </div>
              ))}
            </Card>

            {/* Bank Transfer Mode Stats — with drill-down */}
            <Card>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, marginBottom:8, fontSize: 12 }}>🏦 Wallet → Bank Transfers by Mode</div>
              {(() => {
                const allTxns = window.__allTransferTxns || [];
                const modeConfigs = [
                  { id:"imps", label:"IMPS", icon:"⚡", color:"#6D28D9" },
                  { id:"neft", label:"NEFT", icon:"🏛️", color:"#D97706" },
                  { id:"upi",  label:"UPI",  icon:"📳", color:"#059669" },
                ];
                return (
                  <>
                    {/* Mode tiles — clickable */}
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:8 }}>
                      {modeConfigs.map(m => {
                        const count = allTxns.filter(t => t.mode===m.id).length;
                        const total = allTxns.length || 1;
                        return (
                          <button key={m.id} onClick={() => setTransferDrillMode(m.id)}
                            style={{ background:transferDrillMode===m.id?`${m.color}18`:`${m.color}08`, borderRadius:10, padding:"10px 6px", textAlign:"center", border:`1.5px solid ${transferDrillMode===m.id?m.color:`${m.color}25`}`, cursor:"pointer", transition:"all 0.2s" }}>
                            <div style={{ fontSize:9, marginBottom:3 }}>{m.icon}</div>
                            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:m.color }}>{count}</div>
                            <div style={{ fontSize:9, fontWeight:900, color:m.color }}>{m.label}</div>
                            <div style={{ fontSize:9, color:C.muted, marginTop:1 }}>{allTxns.length>0?Math.round((count/allTxns.length)*100):0}%</div>
                            <div style={{ fontSize:9, color:m.color, marginTop:3, fontWeight:900 }}>Tap →</div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Summary bar */}
                    <div style={{ padding:"8px 10px", background:"rgba(109,40,217,0.05)", borderRadius:8, display:"flex", justifyContent:"space-between", marginBottom: transferDrillMode ? 12 : 0 }}>
                      <span style={{ fontSize:9, color:C.muted }}>Total Transfers</span>
                      <span style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{allTxns.length} · {fmt(allTxns.reduce((a,t)=>a+(t.amount||0),0))}</span>
                    </div>

                    {/* DRILL LEVEL 1: Mode → Agent list */}
                    {transferDrillMode && !transferDrillAgent && (() => {
                      const mc = modeConfigs.find(m=>m.id===transferDrillMode);
                      const modeTxns = allTxns.filter(t=>t.mode===transferDrillMode);
                      const agentMap = {};
                      modeTxns.forEach(t => {
                        if (!agentMap[t.agentId]) agentMap[t.agentId] = { id:t.agentId, name:t.agentName, mobile:t.agentMobile, txns:[] };
                        agentMap[t.agentId].txns.push(t);
                      });
                      const agentList = Object.values(agentMap);
                      return (
                        <div style={{ animation:"slideIn 0.3s ease both" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                            <button onClick={() => setTransferDrillMode(null)} style={{ background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:8, width:28, height:28, cursor:"pointer", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", color:"#1A1035" }}>←</button>
                            <span style={{ fontSize:9, fontWeight:900, color:mc.color }}>{mc.icon} {mc.label} — {modeTxns.length} Transfers</span>
                          </div>
                          {agentList.length === 0 ? (
                            <div style={{ textAlign:"center", padding:"16px", fontSize:9, color:C.muted }}>No {mc.label} transfers yet</div>
                          ) : agentList.map(ag => {
                            const success = ag.txns.filter(t=>t.status==="success").length;
                            const successRate = Math.round((success/ag.txns.length)*100);
                            return (
                              <button key={ag.id} onClick={() => setTransferDrillAgent(ag)}
                                style={{ width:"100%", background:"none", border:"none", padding:"0 0 8px 0", cursor:"pointer", textAlign:"left" }}>
                                <div style={{ background:mc.color+"08", borderRadius:10, padding:"10px 12px", border:`1px solid ${mc.color}20`, transition:"all 0.15s" }}>
                                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                    <div style={{ width:34, height:34, borderRadius:10, background:`linear-gradient(135deg,${mc.color},${mc.color}99)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9, flexShrink:0 }}>
                                      {(ag.name||"A")[0]}
                                    </div>
                                    <div style={{ flex:1 }}>
                                      <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{ag.name||ag.id}</div>
                                      <div style={{ fontSize:9, color:C.muted }}>{ag.mobile||"—"} · {ag.txns.length} txns</div>
                                    </div>
                                    <div style={{ textAlign:"right" }}>
                                      <div style={{ fontSize:9, fontWeight:900, color: successRate>=80?C.success:successRate>=50?C.warning:C.danger }}>{successRate}%</div>
                                      <div style={{ fontSize:9, color:C.muted }}>success rate</div>
                                      <div style={{ fontSize:9, color:mc.color, marginTop:2 }}>View →</div>
                                    </div>
                                  </div>
                                  <div style={{ height:4, background:`${mc.color}15`, borderRadius:2, marginTop:8, overflow:"hidden" }}>
                                    <div style={{ height:"100%", width:`${successRate}%`, background: successRate>=80?C.success:successRate>=50?C.warning:C.danger, borderRadius:2 }} />
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      );
                    })()}

                    {/* DRILL LEVEL 2: Agent → Transaction details */}
                    {transferDrillMode && transferDrillAgent && (() => {
                      const mc = modeConfigs.find(m=>m.id===transferDrillMode);
                      const ag = transferDrillAgent;
                      const success = ag.txns.filter(t=>t.status==="success").length;
                      const failed  = ag.txns.filter(t=>t.status==="failed").length;
                      const totalAmt = ag.txns.reduce((a,t)=>a+(t.amount||0),0);
                      return (
                        <div style={{ animation:"slideIn 0.3s ease both" }}>
                          {/* Back + title */}
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                            <button onClick={() => setTransferDrillAgent(null)} style={{ background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:8, width:28, height:28, cursor:"pointer", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", color:"#1A1035" }}>←</button>
                            <div>
                              <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{ag.name}</div>
                              <div style={{ fontSize:9, color:C.muted }}>{mc.icon} {mc.label} transfers</div>
                            </div>
                          </div>
                          {/* Agent stats row */}
                          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, marginBottom:10 }}>
                            {[
                              { label:"Total", value:ag.txns.length, color:"#1A1035" },
                              { label:"Success", value:success, color:C.success },
                              { label:"Failed",  value:failed,  color:C.danger },
                            ].map(st => (
                              <div key={st.label} style={{ background:`${st.color}08`, borderRadius:8, padding:"8px 6px", textAlign:"center", border:`1px solid ${st.color}18` }}>
                                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:st.color }}>{st.value}</div>
                                <div style={{ fontSize:9, color:C.muted }}>{st.label}</div>
                              </div>
                            ))}
                          </div>
                          {/* Total amount */}
                          <div style={{ background:"rgba(109,40,217,0.05)", borderRadius:8, padding:"7px 10px", marginBottom:10, display:"flex", justifyContent:"space-between" }}>
                            <span style={{ fontSize:9, color:C.muted }}>Total Transferred</span>
                            <span style={{ fontSize:9, fontWeight:900, color:mc.color }}>{fmt(totalAmt)}</span>
                          </div>
                          {/* Transaction list */}
                          {ag.txns.map((t, i) => (
                            <div key={i} style={{ background:"#fff", borderRadius:10, padding:"10px 12px", marginBottom:8, border:`1px solid ${t.status==="success"?"rgba(5,150,105,0.20)":"rgba(225,29,72,0.18)"}` }}>
                              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                                <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{fmt(t.amount||0)}</div>
                                <Chip label={t.status||"success"} color={t.status==="success"?C.success:C.danger} />
                              </div>
                              {[
                                ["Mode", `${mc.icon} ${mc.label}`],
                                t.upiVpa ? ["UPI ID", t.upiVpa] : ["Account", t.accNo||"—"],
                                ["Bank", t.bankName||"—"],
                                t.upiVpa ? null : ["IFSC", t.ifsc||"—"],
                                ["UTR", t.utr||"—"],
                                ["Date", t.date ? new Date(t.date).toLocaleString("en-IN") : "—"],
                              ].filter(Boolean).map(([k,v]) => (
                                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"2px 0" }}>
                                  <span style={{ color:C.muted }}>{k}</span>
                                  <span style={{ fontWeight:900, color:"#1A1035", fontFamily:"'Space Grotesk',sans-serif" }}>{v}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                    {allTxns.length === 0 && !transferDrillMode && (
                      <div style={{ textAlign:"center", fontSize:9, color:C.muted, padding:"8px 0" }}>No transfers yet — data updates in real time when agents transfer</div>
                    )}
                  </>
                );
              })()}
            </Card>
          </div>
        )}

        {tab === "users" && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            {!selectedUser && <button onClick={() => setTab("overview")} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.22)", borderRadius:22, padding:"6px 14px 6px 10px", cursor:"pointer", marginBottom:12, width:"fit-content", boxShadow:"0 2px 8px rgba(109,40,217,0.10)" }}>
              <div style={{ width:22, height:22, borderRadius:7, background:"rgba(109,40,217,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6D28D9" strokeWidth="2.2" fill="#6D28D9" fillOpacity="0.15"/><rect x="9" y="14" width="6" height="7" rx="1" fill="#6D28D9" fillOpacity="0.3"/></svg>
              </div>
              <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>Overview</span>
            </button>}
            {selectedUser ? (
              /* ── USER DETAIL VIEW ── */
              <div style={{ animation:"slideIn 0.3s ease both" }}>
                {/* Back */}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <button onClick={() => { setSelectedUser(null); setEditingField(null); }} style={{ background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:10, width:34, height:34, cursor:"pointer", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", color:"#1A1035" }}>←</button>
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>User Profile</span>
                  <Chip label={selectedUser.status} color={selectedUser.status==="active"?C.success:C.danger} />
                </div>

                {/* Profile card */}
                <div style={{ borderRadius:16, padding:"16px", background:"linear-gradient(135deg,#4F46E5,#6D28D9,#0891B2)", marginBottom:10, position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", right:-20, top:-20, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }} />
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:40, height:40, borderRadius:12, background:"rgba(255,255,255,0.20)", border:"2px solid rgba(255,255,255,0.40)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9, flexShrink:0 }}>
                      {selectedUser.selfieInitials}
                    </div>
                    <div>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#fff" }}>{selectedUser.name}</div>
                      <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)" }}>{selectedUser.id} · Joined {selectedUser.joinDate}</div>
                      <div style={{ display:"flex", gap:6, marginTop:4 }}>
                        <Chip label={`KYC: ${selectedUser.kyc}`} color={selectedUser.kyc==="approved"?C.success:C.warning} />
                        <Chip label={selectedUser.wallet} color="rgba(255,255,255,0.80)" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editable fields */}
                {(() => {
                  const editableFields = [
                    { key:"name",     label:"Full Name",         icon:"🧑" },
                    { key:"loginId",  label:"Login ID / Username",icon:"🪪" },
                    { key:"mobile",   label:"Mobile",            icon:"🧾" },
                    { key:"email",    label:"Email",             icon:"✉️" },
                    { key:"password", label:"Password",          icon:"🗝️", secret:true },
                    { key:"dob",      label:"Date of Birth",     icon:"🎂" },
                    { key:"pan",      label:"PAN Number",        icon:"🪪" },
                    { key:"aadhaar",  label:"Aadhaar Number",    icon:"🏛️" },
                    { key:"address",  label:"Address",           icon:"📌" },
                  ];
                  return (
                    <Card style={{ marginBottom:10 }}>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, marginBottom:10, color:"#1A1035" }}>Personal Details</div>
                      {editableFields.map(({ key, label, icon, secret }) => (
                        <PasswordFieldRow
                          key={key} fieldKey={key} label={label} icon={icon} secret={secret}
                          value={selectedUser[key]}
                          editingField={editingField} editValue={editValue}
                          setEditValue={setEditValue}
                          onEdit={() => { setEditingField(key); setEditValue(selectedUser[key]||""); }}
                          onSave={() => {
                            setUsers(us => us.map(u => u.id===selectedUser.id ? {...u,[key]:editValue} : u));
                            setSelectedUser(prev => ({...prev,[key]:editValue}));
                            setEditingField(null);
                          }}
                          onCancel={() => setEditingField(null)}
                        />
                      ))}
                    </Card>
                  );
                })()}

                {/* Uploaded Documents */}
                <Card style={{ marginBottom:10 }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, marginBottom:10, color:"#1A1035" }}>Uploaded Documents</div>

                  {/* PAN Card */}
                  <div style={{ marginBottom:8, borderRadius:10, overflow:"hidden", border:`1px solid ${selectedUser.panDoc.border}40` }}>
                    <div style={{ background:`${selectedUser.panDoc.border}18`, padding:"5px 10px", display:"flex", alignItems:"center", gap:6, borderBottom:`1px solid ${selectedUser.panDoc.border}25` }}>
                      <span style={{ fontSize:9 }}>🪪</span>
                      <span style={{ fontSize:9, fontWeight:900, color:selectedUser.panDoc.border }}>PAN Card</span>
                    </div>
                    <div style={{ background:selectedUser.panDoc.color, padding:"10px" }}>
                      {selectedUser.panDoc.lines.map((line,i) => (
                        <div key={i} style={{ fontSize:i<2?8:i===4?11:9, fontWeight:i===0||i===4?700:400, color:i===0?"#92400E":i===4?"#1A1035":"#44403C", marginBottom:2, letterSpacing:i===4?"0.08em":"normal" }}>{line}</div>
                      ))}
                    </div>
                  </div>

                  {/* Aadhaar */}
                  <div style={{ marginBottom:8, borderRadius:10, overflow:"hidden", border:`1px solid ${selectedUser.aadhaarDoc.border}40` }}>
                    <div style={{ background:`${selectedUser.aadhaarDoc.border}18`, padding:"5px 10px", display:"flex", alignItems:"center", gap:6, borderBottom:`1px solid ${selectedUser.aadhaarDoc.border}25` }}>
                      <span style={{ fontSize:9 }}>🏛️</span>
                      <span style={{ fontSize:9, fontWeight:900, color:selectedUser.aadhaarDoc.border }}>Aadhaar Card</span>
                    </div>
                    <div style={{ background:selectedUser.aadhaarDoc.color, padding:"10px" }}>
                      {selectedUser.aadhaarDoc.lines.map((line,i) => (
                        <div key={i} style={{ fontSize:i===0?9:i===1?13:i===4?11:9, fontWeight:i===1||i===4?700:400, color:i===1?"#4C1D95":i===4?"#1A1035":"#374151", marginBottom:2, letterSpacing:i===4?"0.10em":"normal" }}>{line}</div>
                      ))}
                    </div>
                  </div>

                  {/* Selfie */}
                  <div style={{ borderRadius:10, overflow:"hidden", border:"1px solid rgba(8,145,178,0.30)" }}>
                    <div style={{ background:"rgba(8,145,178,0.10)", padding:"5px 10px", display:"flex", alignItems:"center", gap:6, borderBottom:"1px solid rgba(8,145,178,0.20)" }}>
                      <span style={{ fontSize:9 }}>🤳</span>
                      <span style={{ fontSize:9, fontWeight:900, color:"#0891B2" }}>Selfie Verification</span>
                    </div>
                    <div style={{ background:"#E0F2FE", padding:"10px", display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:50, height:50, borderRadius:"50%", background:"linear-gradient(135deg,#6D28D9,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9, border:"3px solid rgba(255,255,255,0.90)", boxShadow:"0 4px 12px rgba(109,40,217,0.25)", flexShrink:0 }}>
                        {selectedUser.selfieInitials}
                      </div>
                      <div>
                        <div style={{ fontSize:9, fontWeight:900, color:"#1A1035", marginBottom:3 }}>{selectedUser.name}</div>
                        <span style={{ fontSize:9, background:"rgba(5,150,105,0.12)", color:C.success, padding:"2px 7px", borderRadius:5, fontWeight:900 }}>✓ Liveness verified</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Account actions */}
                <Card>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, marginBottom:10, color:"#1A1035" }}>Account Actions</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    <button onClick={() => { setUsers(us => us.map(u => u.id===selectedUser.id ? {...u, status:u.status==="active"?"blocked":"active"} : u)); setSelectedUser(prev => ({...prev, status:prev.status==="active"?"blocked":"active"})); }} style={{ background: selectedUser.status==="active" ? "rgba(225,29,72,0.08)" : "rgba(5,150,105,0.08)", border:`1px solid ${selectedUser.status==="active" ? "rgba(225,29,72,0.25)" : "rgba(5,150,105,0.25)"}`, color: selectedUser.status==="active" ? C.danger : C.success, borderRadius:9, padding:"9px 14px", fontSize:9, fontWeight:900, cursor:"pointer", textAlign:"left" }}>
                      {selectedUser.status==="active" ? "🔒 Block Account" : "🔓 Unblock Account"}
                    </button>
                    <button onClick={() => { setUsers(us => us.map(u => u.id===selectedUser.id ? {...u, kyc:u.kyc==="approved"?"pending":"approved"} : u)); setSelectedUser(prev => ({...prev, kyc:prev.kyc==="approved"?"pending":"approved"})); }} style={{ background:"rgba(109,40,217,0.08)", border:"1px solid rgba(109,40,217,0.22)", color:"#6D28D9", borderRadius:9, padding:"9px 14px", fontSize:9, fontWeight:900, cursor:"pointer", textAlign:"left" }}>
                      {selectedUser.kyc==="approved" ? "❌ Revoke KYC" : "✅ Approve KYC"}
                    </button>
                    <button style={{ background:"rgba(8,145,178,0.08)", border:"1px solid rgba(8,145,178,0.22)", color:"#0891B2", borderRadius:9, padding:"9px 14px", fontSize:9, fontWeight:900, cursor:"pointer", textAlign:"left" }}>
                      📧 Send Email Notification
                    </button>
                  </div>
                </Card>
              </div>
            ) : (
              /* ── USER LIST ── */
              <>
                {/* Header + Create Admin btn */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>All Users & Agents</div>
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={() => { setShowCreateAgent(true); setAgentRegStep(0); setNewAgentForm({ name:"", mobile:"", email:"", address:"", pan:"", aadhaar:"", panError:"", aadhaarError:"", lat:null, lng:null, panFile:null, aadhaarFile:null }); }} style={{ background:"linear-gradient(135deg,#059669,#10B981)", border:"none", borderRadius:9, padding:"6px 11px", fontSize:9, fontWeight:900, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", gap:4, boxShadow:"0 3px 10px rgba(5,150,105,0.30)" }}>
                      🧑‍💼 + Agent
                    </button>
                    <button onClick={() => { setShowCreateAdmin(true); setAdminRegStep(0); setNewAdmin({ name:"", mobile:"", email:"", loginId:"", password:"", address:"" }); setCreateAdminError(""); }} style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", border:"none", borderRadius:9, padding:"6px 11px", fontSize:9, fontWeight:900, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", gap:4, boxShadow:"0 3px 10px rgba(109,40,217,0.30)" }}>
                      👑 + Admin
                    </button>
                  </div>
                </div>

                {/* Search bar */}
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"#fff", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:10, padding:"0 12px", height:38, marginBottom:10 }}>
                  <span style={{ fontSize:9, color:C.muted }}>🔍</span>
                  <input
                    value={userSearch} onChange={e => setUserSearch(e.target.value)}
                    placeholder="Search by name or mobile..."
                    style={{ flex:1, background:"none", border:"none", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit" }}
                  />
                  {userSearch && <button onClick={() => setUserSearch("")} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:9 }}>✕</button>}
                </div>

                {/* Create Admin Modal */}
                {showCreateAdmin && (
                  <div style={{ position:"fixed", inset:0, zIndex:500, background:"rgba(10,8,30,0.85)", display:"flex", alignItems:"flex-end", justifyContent:"center" }}
                    onClick={() => setShowCreateAdmin(false)}>
                    <div style={{ background:"#F9F8FF", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:420, maxHeight:"90vh", display:"flex", flexDirection:"column", boxShadow:"0 -8px 40px rgba(0,0,0,0.35)", animation:"slideUp 0.35s cubic-bezier(.22,.68,0,1.2) both" }}
                      onClick={e => e.stopPropagation()}>

                      {/* Header */}
                      <div style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", borderRadius:"20px 20px 0 0", padding:"14px 16px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff" }}>
                            {adminRegStep===0?"Personal Info":adminRegStep===1?"Credentials":"Review & Create"}
                          </div>
                          <button onClick={() => setShowCreateAdmin(false)} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:8, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12, fontWeight:900 }}>✕</button>
                        </div>
                        <div style={{ display:"flex", gap:5 }}>
                          {[0,1,2].map(i=>(
                            <div key={i} style={{ height:4, flex:1, borderRadius:2, background:adminRegStep>i?"rgba(255,255,255,0.90)":adminRegStep===i?"rgba(255,255,255,0.70)":"rgba(255,255,255,0.25)", transition:"all 0.3s" }}/>
                          ))}
                        </div>
                        <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
                      </div>

                      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px 20px" }}>

                        {/* Step 0 — Personal Info */}
                        {adminRegStep===0 && (
                          <div style={{ animation:"fadeUp 0.3s ease both" }}>
                            {[
                              { key:"name",    label:"Full Name",    placeholder:"Admin full name",    icon:"user",  color:"#6D28D9", type:"text" },
                              { key:"mobile",  label:"Mobile Number",placeholder:"10-digit mobile",    icon:"phone", color:"#0891B2", type:"tel", maxLen:10 },
                              { key:"email",   label:"Email Address",placeholder:"admin@example.com",  icon:"mail",  color:"#059669", type:"email" },
                            ].map(f=>(
                              <div key={f.key} style={{ marginBottom:10 }}>
                                <div style={{ fontSize:8, color:f.color, marginBottom:4, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase" }}>{f.label}</div>
                                <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${newAdmin[f.key]?"rgba(109,40,217,0.45)":"rgba(109,40,217,0.18)"}`, borderRadius:11, padding:"0 12px", height:42, gap:8, transition:"all 0.2s" }}>
                                  <Icon name={f.icon} size={13} color={f.color}/>
                                  <input type={f.type||"text"} value={newAdmin[f.key]} maxLength={f.maxLen}
                                    onChange={e=>setNewAdmin(p=>({...p,[f.key]:f.key==="mobile"?e.target.value.replace(/[^0-9]/g,"").slice(0,10):e.target.value}))}
                                    placeholder={f.placeholder}
                                    style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit" }}/>
                                  {newAdmin[f.key] && <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.15"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                </div>
                              </div>
                            ))}
                            <div style={{ marginBottom:12 }}>
                              <div style={{ fontSize:8, color:"#6D28D9", marginBottom:4, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase" }}>Full Address</div>
                              <div style={{ background:"#fff", border:`1.5px solid ${newAdmin.address?"rgba(109,40,217,0.45)":"rgba(109,40,217,0.18)"}`, borderRadius:11, padding:"8px 12px", transition:"all 0.2s" }}>
                                <textarea value={newAdmin.address||""} onChange={e=>setNewAdmin(p=>({...p,address:e.target.value}))} placeholder="House/flat, Street, City, PIN"
                                  style={{ width:"100%", background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit", minHeight:52, resize:"none" }}/>
                              </div>
                            </div>
                            <button onClick={()=>setAdminRegStep(1)}
                              disabled={!newAdmin.name||newAdmin.mobile.length<10||!newAdmin.email}
                              style={{ width:"100%", background:(!newAdmin.name||newAdmin.mobile.length<10||!newAdmin.email)?"rgba(109,40,217,0.15)":"linear-gradient(135deg,#6D28D9,#0891B2)", color:(!newAdmin.name||newAdmin.mobile.length<10||!newAdmin.email)?"rgba(109,40,217,0.45)":"#fff", border:"none", borderRadius:12, padding:"12px", fontSize:10, fontWeight:900, cursor:"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                              Next: Credentials →
                            </button>
                          </div>
                        )}

                        {/* Step 1 — Credentials */}
                        {adminRegStep===1 && (
                          <div style={{ animation:"fadeUp 0.3s ease both" }}>
                            {[
                              { key:"loginId",  label:"Login ID / Username", placeholder:"e.g. admin_raj",  icon:"tag",  color:"#6D28D9" },
                              { key:"password", label:"Password",             placeholder:"Min 6 characters", icon:"lock", color:"#D97706", type:"password" },
                            ].map(f=>(
                              <div key={f.key} style={{ marginBottom:10 }}>
                                <div style={{ fontSize:8, color:f.color, marginBottom:4, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase" }}>{f.label}</div>
                                <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${newAdmin[f.key]?"rgba(109,40,217,0.45)":"rgba(109,40,217,0.18)"}`, borderRadius:11, padding:"0 12px", height:42, gap:8, transition:"all 0.2s" }}>
                                  <Icon name={f.icon} size={13} color={f.color}/>
                                  <input type={f.type||"text"} value={newAdmin[f.key]}
                                    onChange={e=>setNewAdmin(p=>({...p,[f.key]:f.key==="loginId"?e.target.value.replace(/\s/g,"").toLowerCase():e.target.value}))}
                                    placeholder={f.placeholder}
                                    style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit", letterSpacing:f.key==="loginId"?"0.06em":"inherit" }}/>
                                  {newAdmin[f.key] && <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.15"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                </div>
                                {f.key==="loginId" && <div style={{ fontSize:8, color:"#9CA3AF", marginTop:2 }}>Lowercase, no spaces (e.g. admin_raj)</div>}
                                {f.key==="password" && <div style={{ fontSize:8, color:"#9CA3AF", marginTop:2 }}>Minimum 6 characters</div>}
                              </div>
                            ))}
                            {createAdminError && <div style={{ fontSize:8, color:"#E11D48", marginBottom:8, padding:"6px 10px", background:"rgba(225,29,72,0.06)", borderRadius:7, border:"1px solid rgba(225,29,72,0.18)" }}>⚠️ {createAdminError}</div>}
                            <div style={{ display:"flex", gap:8 }}>
                              <button onClick={()=>setAdminRegStep(0)} style={{ width:40, background:"rgba(109,40,217,0.07)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </button>
                              <button onClick={()=>{
                                if(!newAdmin.loginId||newAdmin.loginId.length<3){setCreateAdminError("Login ID must be at least 3 characters");return;}
                                if(!newAdmin.password||newAdmin.password.length<6){setCreateAdminError("Password must be at least 6 characters");return;}
                                setCreateAdminError(""); setAdminRegStep(2);
                              }} style={{ flex:1, background:(!newAdmin.loginId||!newAdmin.password)?"rgba(109,40,217,0.15)":"linear-gradient(135deg,#6D28D9,#0891B2)", color:(!newAdmin.loginId||!newAdmin.password)?"rgba(109,40,217,0.45)":"#fff", border:"none", borderRadius:11, padding:"12px", fontSize:10, fontWeight:900, cursor:"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                                Review & Create →
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Step 2 — Review */}
                        {adminRegStep===2 && (
                          <div style={{ animation:"fadeUp 0.3s ease both" }}>
                            <div style={{ background:"#fff", borderRadius:12, border:"1px solid rgba(109,40,217,0.18)", padding:"12px 14px", marginBottom:12, boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
                              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035", marginBottom:8 }}>Admin Summary</div>
                              {[["Name",newAdmin.name],["Mobile","+91 "+newAdmin.mobile],["Email",newAdmin.email||"—"],["Address",(newAdmin.address||"—").slice(0,28)+((newAdmin.address||"").length>28?"…":"")],["Login ID",newAdmin.loginId],["Password","•".repeat(Math.min(newAdmin.password.length,8))]].map(([k,v])=>(
                                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid rgba(109,40,217,0.07)", fontSize:9 }}>
                                  <span style={{ color:"#9CA3AF" }}>{k}</span>
                                  <span style={{ fontWeight:900, color:"#1A1035", textAlign:"right", maxWidth:"55%", fontFamily:k==="Login ID"?"monospace":"inherit" }}>{v}</span>
                                </div>
                              ))}
                            </div>
                            <div style={{ padding:"8px 10px", background:"rgba(109,40,217,0.06)", border:"1px solid rgba(109,40,217,0.15)", borderRadius:8, marginBottom:12, fontSize:8, color:"#374151", lineHeight:1.6 }}>
                              👑 Admin will have <strong>full access</strong> to Users, KYC, Transactions, and all settings.
                            </div>
                            <div style={{ display:"flex", gap:8 }}>
                              <button onClick={()=>setAdminRegStep(1)} style={{ width:40, background:"rgba(109,40,217,0.07)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </button>
                              <button onClick={()=>{
                                const adminId = "ADM"+uid();
                                setUsers(us=>[...us,{ id:adminId, name:newAdmin.name, loginId:newAdmin.loginId, mobile:newAdmin.mobile, email:newAdmin.email, dob:"—", pan:"—", aadhaar:"—", address:newAdmin.address||"—", kyc:"approved", status:"active", wallet:"—", joinDate:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}), role:"admin", selfieInitials:newAdmin.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(), panDoc:{lines:["—","—","—","—","—"],color:"#FEF3C7",border:"#D97706"}, aadhaarDoc:{lines:["—","—","—","—","—"],color:"#EDE9FE",border:"#6D28D9"} }]);
                                setCreatedCreds({ type:"admin", name:newAdmin.name, mobile:newAdmin.mobile, loginId:newAdmin.loginId, password:newAdmin.password });
                                setNewAdmin({ name:"", mobile:"", email:"", loginId:"", password:"", address:"" });
                                setCreateAdminError(""); setAdminRegStep(0); setShowCreateAdmin(false);
                              }} style={{ flex:1, background:"linear-gradient(135deg,#6D28D9,#0891B2)", border:"none", borderRadius:11, padding:"12px", fontSize:10, fontWeight:900, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                                👑 Create Admin Account
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Create Agent Modal */}
                {showCreateAgent && (
                  <div style={{ position:"fixed", inset:0, zIndex:500, background:"rgba(10,8,30,0.85)", display:"flex", alignItems:"flex-end", justifyContent:"center" }}
                    onClick={() => setShowCreateAgent(false)}>
                    <div style={{ background:"#F9F8FF", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:420, maxHeight:"90vh", display:"flex", flexDirection:"column", boxShadow:"0 -8px 40px rgba(0,0,0,0.35)", animation:"slideUp 0.35s cubic-bezier(.22,.68,0,1.2) both" }}
                      onClick={e => e.stopPropagation()}>

                      {/* Header */}
                      <div style={{ background:"linear-gradient(135deg,#059669,#0891B2)", borderRadius:"20px 20px 0 0", padding:"14px 16px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, color:"#fff" }}>
                              {agentRegStep===0?"Personal Info":agentRegStep===1?"Documents":"Review & Create"}
                            </div>
                          </div>
                          <button onClick={() => setShowCreateAgent(false)} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:8, width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12, fontWeight:900 }}>✕</button>
                        </div>
                        <div style={{ display:"flex", gap:5 }}>
                          {[0,1,2].map(i=>(
                            <div key={i} style={{ height:4, flex:1, borderRadius:2, background:agentRegStep>i?"rgba(255,255,255,0.90)":agentRegStep===i?"rgba(255,255,255,0.70)":"rgba(255,255,255,0.25)", transition:"all 0.3s" }}/>
                          ))}
                        </div>
                        <div style={{ position:"absolute", right:-16, top:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
                      </div>

                      {/* Steps content */}
                      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px 20px" }}>

                        {/* Step 0 — Personal Info */}
                        {agentRegStep===0 && (
                          <div style={{ animation:"fadeUp 0.3s ease both" }}>
                            {[
                              { key:"name",    label:"Full Name",     placeholder:"Agent full name",    icon:"user",  color:"#059669", type:"text" },
                              { key:"mobile",  label:"Mobile Number", placeholder:"10-digit mobile",    icon:"phone", color:"#0891B2", type:"tel",  maxLen:10 },
                              { key:"email",   label:"Email Address", placeholder:"agent@example.com",  icon:"mail",  color:"#6D28D9", type:"email" },
                            ].map(f=>(
                              <div key={f.key} style={{ marginBottom:10 }}>
                                <div style={{ fontSize:8, color:f.color, marginBottom:4, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase" }}>{f.label}</div>
                                <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${newAgentForm[f.key]?"rgba(5,150,105,0.45)":"rgba(5,150,105,0.18)"}`, borderRadius:11, padding:"0 12px", height:42, gap:8, transition:"all 0.2s" }}>
                                  <Icon name={f.icon} size={13} color={f.color}/>
                                  <input type={f.type||"text"} value={newAgentForm[f.key]} maxLength={f.maxLen}
                                    onChange={e=>setNewAgentForm(p=>({...p,[f.key]:f.key==="mobile"?e.target.value.replace(/[^0-9]/g,"").slice(0,10):e.target.value}))}
                                    placeholder={f.placeholder}
                                    style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit" }}/>
                                  {newAgentForm[f.key] && <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#059669" fillOpacity="0.15"/><path d="M7.5 12.5l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                </div>
                              </div>
                            ))}
                            <div style={{ marginBottom:12 }}>
                              <div style={{ fontSize:8, color:"#059669", marginBottom:4, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase" }}>Full Address</div>
                              <div style={{ background:"#fff", border:`1.5px solid ${newAgentForm.address?"rgba(5,150,105,0.45)":"rgba(5,150,105,0.18)"}`, borderRadius:11, padding:"8px 12px", transition:"all 0.2s" }}>
                                <textarea value={newAgentForm.address} onChange={e=>setNewAgentForm(p=>({...p,address:e.target.value}))} placeholder="House/flat, Street, City, PIN"
                                  style={{ width:"100%", background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"inherit", minHeight:52, resize:"none" }}/>
                              </div>
                            </div>
                            <button onClick={()=>setAgentRegStep(1)}
                              disabled={!newAgentForm.name||newAgentForm.mobile.length<10||!newAgentForm.email||!newAgentForm.address}
                              style={{ width:"100%", background:(!newAgentForm.name||newAgentForm.mobile.length<10||!newAgentForm.email||!newAgentForm.address)?"rgba(5,150,105,0.15)":"linear-gradient(135deg,#059669,#10B981)", color:(!newAgentForm.name||newAgentForm.mobile.length<10||!newAgentForm.email||!newAgentForm.address)?"rgba(5,150,105,0.45)":"#fff", border:"none", borderRadius:12, padding:"12px", fontSize:10, fontWeight:900, cursor:"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                              Next: Documents →
                            </button>
                          </div>
                        )}

                        {/* Step 1 — Documents */}
                        {agentRegStep===1 && (
                          <div style={{ animation:"fadeUp 0.3s ease both" }}>
                            {/* PAN */}
                            <div style={{ marginBottom:10 }}>
                              <div style={{ fontSize:8, color:"#D97706", marginBottom:4, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                                <span>PAN Number *</span>
                                {newAgentForm.panFile && PAN_RE.test(newAgentForm.pan) && <span style={{ fontSize:7, color:"#059669", fontWeight:900, background:"rgba(5,150,105,0.10)", padding:"2px 6px", borderRadius:10 }}>📄 Read from document</span>}
                              </div>
                              <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${newAgentForm.panError?"rgba(225,29,72,0.50)":PAN_RE.test(newAgentForm.pan)?"rgba(5,150,105,0.50)":"rgba(5,150,105,0.18)"}`, borderRadius:11, padding:"0 12px", height:42, gap:8, transition:"all 0.2s" }}>
                                <Icon name="kyc" size={13} color="#D97706"/>
                                <input type="text" value={newAgentForm.pan} maxLength={10}
                                  onChange={e=>{ const v=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,""); setNewAgentForm(p=>({...p,pan:v,panError:v.length>0&&!PAN_RE.test(v)?"Format: ABCDE1234F":""})); }}
                                  placeholder="ABCDE1234F"
                                  style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"monospace", letterSpacing:"0.08em" }}/>
                                {PAN_RE.test(newAgentForm.pan) && <Icon name="check" size={13} color="#059669"/>}
                              </div>
                              {newAgentForm.panError && <div style={{ fontSize:8, color:"#E11D48", marginTop:2 }}>{newAgentForm.panError}</div>}
                              <div style={{ fontSize:8, color:"#9CA3AF", marginTop:2 }}>5 letters + 4 digits + 1 letter (e.g. ABCDE1234F)</div>
                            </div>
                            {/* Aadhaar */}
                            <div style={{ marginBottom:12 }}>
                              <div style={{ fontSize:8, color:"#6D28D9", marginBottom:4, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                                <span>Aadhaar Number *</span>
                                {newAgentForm.aadhaarFile && AAD_RE.test(newAgentForm.aadhaar) && <span style={{ fontSize:7, color:"#059669", fontWeight:900, background:"rgba(5,150,105,0.10)", padding:"2px 6px", borderRadius:10 }}>📄 Read from document</span>}
                              </div>
                              <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`1.5px solid ${newAgentForm.aadhaarError?"rgba(225,29,72,0.50)":AAD_RE.test(newAgentForm.aadhaar)?"rgba(5,150,105,0.50)":"rgba(5,150,105,0.18)"}`, borderRadius:11, padding:"0 12px", height:42, gap:8, transition:"all 0.2s" }}>
                                <Icon name="shield" size={13} color="#6D28D9"/>
                                <input type="text" value={newAgentForm.aadhaar} maxLength={14}
                                  onChange={e=>{ const d=e.target.value.replace(/[^0-9]/g,"").slice(0,12); const fmt=d.replace(/(\d{4})(\d{0,4})(\d{0,4})/,(_,a,b,c)=>[a,b,c].filter(Boolean).join(" ")); setNewAgentForm(p=>({...p,aadhaar:fmt,aadhaarError:d.length>0&&d.length<12?"Must be 12 digits":""})); }}
                                  placeholder="XXXX XXXX XXXX"
                                  style={{ flex:1, background:"none", border:"none", color:"#1A1035", fontSize:10, outline:"none", fontFamily:"monospace", letterSpacing:"0.08em" }}/>
                                {AAD_RE.test(newAgentForm.aadhaar) && <Icon name="check" size={13} color="#059669"/>}
                              </div>
                              {newAgentForm.aadhaarError && <div style={{ fontSize:8, color:"#E11D48", marginTop:2 }}>{newAgentForm.aadhaarError}</div>}
                            </div>
                            {/* Location */}
                            <div style={{ marginBottom:10 }}>
                              <div style={{ fontSize:8, color:"#059669", marginBottom:4, fontWeight:900, letterSpacing:"0.07em", textTransform:"uppercase" }}>Agent Location *</div>
                              <button type="button" onClick={async()=>{ setAgentLocating(true); await sleep(1000); const lat=(12.9716+(Math.random()-0.5)*0.05).toFixed(6); const lng=(77.5946+(Math.random()-0.5)*0.05).toFixed(6); setNewAgentForm(p=>({...p,lat,lng})); setAgentLocating(false); }}
                                style={{ width:"100%", background:newAgentForm.lat?"rgba(5,150,105,0.07)":"#fff", border:`1.5px solid ${newAgentForm.lat?"rgba(5,150,105,0.45)":"rgba(5,150,105,0.18)"}`, borderRadius:11, padding:"10px 12px", display:"flex", alignItems:"center", gap:8, cursor:"pointer", transition:"all 0.2s" }}>
                                {agentLocating ? <div style={{ width:20, height:20, borderRadius:"50%", border:"2px solid #E5E7EB", borderTop:"2px solid #059669", animation:"spin 0.7s linear infinite" }}/> : <Icon name="mappin" size={16} color="#059669"/>}
                                <div>
                                  <div style={{ fontSize:10, fontWeight:900, color:newAgentForm.lat?"#059669":"#1A1035" }}>{agentLocating?"Detecting…":newAgentForm.lat?`${newAgentForm.lat}, ${newAgentForm.lng}`:"Capture GPS Location"}</div>
                                  <div style={{ fontSize:8, color:"#9CA3AF" }}>{newAgentForm.lat?"Location captured ✓":"Tap to detect agent location"}</div>
                                </div>
                              </button>
                            </div>
                            {/* PAN Upload — auto-extracts number */}
                            <FileUploadBtn
                              label="Upload PAN Card" icon="kyc" color="#D97706"
                              hint="JPG/PNG · Clear photo of PAN card" accept="image/*"
                              value={newAgentForm.panFile||null}
                              onChange={data => setNewAgentForm(p=>({...p,panFile:data}))}
                              onExtract={num => setNewAgentForm(p=>({...p,pan:num,panError:""}))}
                            />
                            {/* Aadhaar Upload — auto-extracts number */}
                            <FileUploadBtn
                              label="Upload Aadhaar Card" icon="shield" color="#6D28D9"
                              hint="Front of Aadhaar card" accept="image/*"
                              value={newAgentForm.aadhaarFile||null}
                              onChange={data => setNewAgentForm(p=>({...p,aadhaarFile:data}))}
                              onExtract={num => setNewAgentForm(p=>({...p,aadhaar:num,aadhaarError:""}))}
                            />
                            <div style={{ display:"flex", gap:8 }}>
                              <button onClick={()=>setAgentRegStep(0)} style={{ width:40, background:"rgba(5,150,105,0.07)", border:"1.5px solid rgba(5,150,105,0.20)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </button>
                              <button onClick={()=>setAgentRegStep(2)} disabled={!PAN_RE.test(newAgentForm.pan)||!AAD_RE.test(newAgentForm.aadhaar)||!newAgentForm.lat}
                                style={{ flex:1, background:(!PAN_RE.test(newAgentForm.pan)||!AAD_RE.test(newAgentForm.aadhaar)||!newAgentForm.lat)?"rgba(5,150,105,0.15)":"linear-gradient(135deg,#059669,#0891B2)", color:(!PAN_RE.test(newAgentForm.pan)||!AAD_RE.test(newAgentForm.aadhaar)||!newAgentForm.lat)?"rgba(5,150,105,0.45)":"#fff", border:"none", borderRadius:11, padding:"12px", fontSize:10, fontWeight:900, cursor:"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                                Review & Create →
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Step 2 — Review & Create */}
                        {agentRegStep===2 && (
                          <div style={{ animation:"fadeUp 0.3s ease both" }}>
                            <div style={{ background:"#fff", borderRadius:12, border:"1px solid rgba(5,150,105,0.18)", padding:"12px 14px", marginBottom:12, boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
                              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:10, color:"#1A1035", marginBottom:8 }}>Agent Summary</div>
                              {[["Name",newAgentForm.name],["Mobile","+91 "+newAgentForm.mobile],["Email",newAgentForm.email||"—"],["Address",(newAgentForm.address||"").slice(0,28)+((newAgentForm.address||"").length>28?"…":"")],["PAN",newAgentForm.pan],["Aadhaar",newAgentForm.aadhaar],["Location",newAgentForm.lat?`${newAgentForm.lat}, ${newAgentForm.lng}`:"—"]].map(([k,v])=>(
                                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid rgba(5,150,105,0.07)", fontSize:9 }}>
                                  <span style={{ color:"#9CA3AF" }}>{k}</span>
                                  <span style={{ fontWeight:900, color:"#1A1035", textAlign:"right", maxWidth:"55%", fontFamily:k==="PAN"||k==="Aadhaar"?"monospace":"inherit" }}>{v}</span>
                                </div>
                              ))}
                            </div>
                            <div style={{ padding:"8px 10px", background:"rgba(5,150,105,0.06)", border:"1px solid rgba(5,150,105,0.15)", borderRadius:8, marginBottom:12, fontSize:8, color:"#374151", lineHeight:1.6 }}>
                              ✅ Agent will be created with <strong>KYC: Approved</strong> status and can log in immediately.
                            </div>
                            <div style={{ display:"flex", gap:8 }}>
                              <button onClick={()=>setAgentRegStep(1)} style={{ width:40, background:"rgba(5,150,105,0.07)", border:"1.5px solid rgba(5,150,105,0.20)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </button>
                              <button onClick={()=>{
                                const agId = "USR"+uid();
                                const initials = newAgentForm.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
                                setUsers(us=>[...us,{
                                  id:agId, name:newAgentForm.name, mobile:newAgentForm.mobile,
                                  email:newAgentForm.email, address:newAgentForm.address,
                                  pan:newAgentForm.pan, aadhaar:newAgentForm.aadhaar,
                                  lat:newAgentForm.lat, lng:newAgentForm.lng,
                                  dob:"—", kyc:"approved", status:"active", wallet:"0",
                                  joinDate:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}),
                                  role:"agent", selfieInitials:initials,
                                  panDoc:{ lines:["INCOME TAX DEPARTMENT","GOVT. OF INDIA","Name: "+newAgentForm.name,"PAN: "+newAgentForm.pan], color:"#FEF3C7", border:"#D97706" },
                                  aadhaarDoc:{ lines:["Government of India","आधार","Name: "+newAgentForm.name,"XXXX XXXX "+newAgentForm.aadhaar.slice(-4)], color:"#EDE9FE", border:"#6D28D9" },
                                }]);
                                // Also add to approved agents so they can login
                                if(!window.__approvedAgents) window.__approvedAgents={};
                                window.__approvedAgents[newAgentForm.mobile]={ name:newAgentForm.name, pan:newAgentForm.pan, kyc:"approved" };
                                setCreatedCreds({ type:"agent", name:newAgentForm.name, mobile:newAgentForm.mobile, loginId:null, password:null });
                                setShowCreateAgent(false);
                                setAgentRegStep(0);
                                setNewAgentForm({ name:"", mobile:"", email:"", address:"", pan:"", aadhaar:"", panError:"", aadhaarError:"", lat:null, lng:null, panFile:null, aadhaarFile:null });
                              }} style={{ flex:1, background:"linear-gradient(135deg,#059669,#0891B2)", border:"none", borderRadius:11, padding:"12px", fontSize:10, fontWeight:900, color:"#fff", cursor:"pointer", boxShadow:"0 4px 14px rgba(5,150,105,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                                🧑‍💼 Create Agent Account
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Credentials popup after creation ── */}
                {createdCreds && (
                  <div style={{ position:"fixed", inset:0, zIndex:600, background:"rgba(10,8,30,0.80)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
                    onClick={() => setCreatedCreds(null)}>
                    <div style={{ background:"#fff", borderRadius:20, width:"100%", maxWidth:360, overflow:"hidden", boxShadow:"0 24px 60px rgba(0,0,0,0.35)", animation:"scaleIn 0.35s cubic-bezier(.34,1.56,.64,1) both" }}
                      onClick={e=>e.stopPropagation()}>

                      {/* Header */}
                      <div style={{ background:createdCreds.type==="admin"?"linear-gradient(135deg,#6D28D9,#0891B2)":"linear-gradient(135deg,#059669,#0891B2)", padding:"18px 18px 16px", textAlign:"center", position:"relative", overflow:"hidden" }}>
                        <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.18)", border:"2px solid rgba(255,255,255,0.35)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 10px" }}>
                          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                            {createdCreds.type==="admin"
                              ? <><path d="M3 17l3-8 3.5 5L12 6l2.5 8 3.5-5 3 8H3z" fill="#fff" fillOpacity="0.9" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/><rect x="3" y="18" width="18" height="3" rx="1.5" fill="#FFD700" opacity="0.9"/></>
                              : <><circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="2" fill="#fff" fillOpacity="0.25"/><path d="M4 20c0-4 3.58-6 8-6s8 2 8 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></>
                            }
                          </svg>
                        </div>
                        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:14, color:"#fff", marginBottom:3 }}>
                          {createdCreds.type==="admin" ? "Admin Created!" : "Agent Created!"}
                        </div>
                        <div style={{ fontSize:9, color:"rgba(255,255,255,0.80)" }}>Share login credentials with {createdCreds.name}</div>
                        <div style={{ position:"absolute", right:-20, top:-20, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
                      </div>

                      <div style={{ padding:"16px 18px 20px" }}>

                        {/* Login methods */}
                        <div style={{ fontSize:9, color:"#374151", fontWeight:700, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.06em" }}>Login Options</div>

                        {/* Method 1 — Mobile OTP (always available) */}
                        <div style={{ background:"rgba(5,150,105,0.06)", border:"1.5px solid rgba(5,150,105,0.22)", borderRadius:12, padding:"10px 13px", marginBottom:10 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                            <div style={{ width:28, height:28, borderRadius:8, background:"rgba(5,150,105,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="3" stroke="#059669" strokeWidth="2" fill="#059669" fillOpacity="0.12"/><circle cx="12" cy="18" r="1" fill="#059669"/></svg>
                            </div>
                            <span style={{ fontSize:9, fontWeight:900, color:"#059669" }}>Login with Mobile OTP</span>
                          </div>
                          <div style={{ display:"flex", justifyContent:"space-between", fontSize:9 }}>
                            <span style={{ color:"#9CA3AF" }}>Mobile Number</span>
                            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                              <span style={{ fontWeight:900, color:"#1A1035", fontFamily:"monospace", letterSpacing:"0.05em" }}>+91 {createdCreds.mobile}</span>
                              <button onClick={()=>navigator.clipboard?.writeText(createdCreds.mobile)} style={{ background:"rgba(5,150,105,0.10)", border:"none", borderRadius:5, padding:"2px 6px", fontSize:8, color:"#059669", cursor:"pointer", fontWeight:900 }}>Copy</button>
                            </div>
                          </div>
                          <div style={{ fontSize:8, color:"#9CA3AF", marginTop:3 }}>Demo OTP: 123456 · In production, real OTP via SMS</div>
                        </div>

                        {/* Method 2 — User ID + Password (admin only) */}
                        {createdCreds.type==="admin" && createdCreds.loginId && (
                          <div style={{ background:"rgba(109,40,217,0.06)", border:"1.5px solid rgba(109,40,217,0.22)", borderRadius:12, padding:"10px 13px", marginBottom:10 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                              <div style={{ width:28, height:28, borderRadius:8, background:"rgba(109,40,217,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="3" stroke="#6D28D9" strokeWidth="2" fill="#6D28D9" fillOpacity="0.12"/><circle cx="9" cy="11" r="2" fill="#6D28D9"/><path d="M14 9h4M14 13h3" stroke="#6D28D9" strokeWidth="1.5" strokeLinecap="round"/></svg>
                              </div>
                              <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>Login with User ID & Password</span>
                            </div>
                            {[["User ID / Login ID", createdCreds.loginId, true], ["Password", createdCreds.password, false]].map(([label, val, mono])=>(
                              <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:9, padding:"3px 0" }}>
                                <span style={{ color:"#9CA3AF" }}>{label}</span>
                                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                                  <span style={{ fontWeight:900, color:"#1A1035", fontFamily:mono?"monospace":"inherit", letterSpacing:mono?"0.05em":"inherit" }}>{val}</span>
                                  <button onClick={()=>navigator.clipboard?.writeText(val)} style={{ background:"rgba(109,40,217,0.10)", border:"none", borderRadius:5, padding:"2px 6px", fontSize:8, color:"#6D28D9", cursor:"pointer", fontWeight:900 }}>Copy</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Method 2 — Agent: User ID login */}
                        {createdCreds.type==="agent" && (
                          <div style={{ background:"rgba(8,145,178,0.06)", border:"1.5px solid rgba(8,145,178,0.22)", borderRadius:12, padding:"10px 13px", marginBottom:10 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                              <div style={{ width:28, height:28, borderRadius:8, background:"rgba(8,145,178,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="3" stroke="#0891B2" strokeWidth="2" fill="#0891B2" fillOpacity="0.12"/><circle cx="9" cy="11" r="2" fill="#0891B2"/><path d="M14 9h4M14 13h3" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round"/></svg>
                              </div>
                              <span style={{ fontSize:9, fontWeight:900, color:"#0891B2" }}>Login with User ID & Password</span>
                            </div>
                            <div style={{ fontSize:8, color:"#9CA3AF", lineHeight:1.6 }}>
                              Agent can also set a User ID & password from their profile after first login via mobile OTP.
                            </div>
                          </div>
                        )}

                        {/* Security reminder */}
                        <div style={{ display:"flex", gap:8, padding:"8px 10px", background:"rgba(217,119,6,0.06)", border:"1px solid rgba(217,119,6,0.18)", borderRadius:9, marginBottom:14 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, marginTop:1 }}><circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="2" fill="#D97706" fillOpacity="0.12"/><line x1="12" y1="11" x2="12" y2="16" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="#D97706"/></svg>
                          <span style={{ fontSize:8, color:"#92400E", lineHeight:1.6 }}>Share credentials securely. The password is shown only once — save it before closing.</span>
                        </div>

                        {/* Share + Done buttons */}
                        <div style={{ display:"flex", gap:8, marginTop:0 }}>
                          {/* Share button */}
                          <button onClick={() => {
                            const isAdmin = createdCreds.type === "admin";
                            const shareText = isAdmin
                              ? `👑 S3Payments Admin Login\n\nName: ${createdCreds.name}\nMobile: +91 ${createdCreds.mobile}\nLogin ID: ${createdCreds.loginId}\nPassword: ${createdCreds.password}\n\nLogin at: s3payments.netlify.app\nDemo OTP: 123456`
                              : `🧑‍💼 S3Payments Agent Login\n\nName: ${createdCreds.name}\nMobile: +91 ${createdCreds.mobile}\n\nLogin at: s3payments.netlify.app\nUse mobile number + OTP: 123456`;
                            if (navigator.share) {
                              navigator.share({ title:"S3Payments Login Credentials", text:shareText })
                                .catch(()=>{});
                            } else {
                              navigator.clipboard?.writeText(shareText).then(()=>alert("Credentials copied to clipboard!"));
                            }
                          }} style={{
                            flex:1, background:"#fff", border:`1.5px solid ${createdCreds.type==="admin"?"rgba(109,40,217,0.35)":"rgba(5,150,105,0.35)"}`,
                            borderRadius:12, padding:"12px", fontSize:10, fontWeight:900,
                            color:createdCreds.type==="admin"?"#6D28D9":"#059669",
                            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                          }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15"/>
                              <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15"/>
                              <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15"/>
                              <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Share
                          </button>

                          {/* Done button */}
                          <button onClick={() => setCreatedCreds(null)}
                            style={{ flex:1, background:createdCreds.type==="admin"?"linear-gradient(135deg,#6D28D9,#0891B2)":"linear-gradient(135deg,#059669,#0891B2)", border:"none", borderRadius:12, padding:"12px", fontSize:10, fontWeight:900, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Role filter tabs */}
                <div style={{ display:"flex", gap:6, marginBottom:8 }}>
                  {[
                    { id:"all",   label:"All Roles" },
                    { id:"agent", label:"🧑‍💼 Agents" },
                    { id:"admin", label:"👑 Admins" },
                  ].map(r => (
                    <button key={r.id} onClick={() => setUserRoleFilter(r.id)} style={{
                      padding:"5px 12px", borderRadius:20,
                      border:`1.5px solid ${userRoleFilter===r.id?"#6D28D9":"rgba(109,40,217,0.15)"}`,
                      background: userRoleFilter===r.id?"rgba(109,40,217,0.12)":"#fff",
                      color: userRoleFilter===r.id?"#6D28D9":"#6B7280",
                      fontSize:9, fontWeight:900, cursor:"pointer",
                    }}>{r.label}</button>
                  ))}
                </div>

                {/* User list */}
                {(() => {
                  const q = userSearch.toLowerCase().trim();
                  const filtered = users.filter(u =>
                    (userRoleFilter === "all" || u.role === userRoleFilter) &&
                    (!q ||
                      u.name.toLowerCase().includes(q) ||
                      u.mobile.includes(q) ||
                      (u.id && u.id.toLowerCase().includes(q)) ||
                      (u.loginId && u.loginId.toLowerCase().includes(q)) ||
                      (u.email && u.email.toLowerCase().includes(q))
                    )
                  );
                  if (filtered.length === 0) return (
                    <div style={{ textAlign:"center", padding:"28px 16px", background:"#fff", borderRadius:12, border:"1px dashed rgba(109,40,217,0.18)" }}>
                      <div style={{ fontSize:9, marginBottom:6 }}>🔍</div>
                      <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>No users found</div>
                      <div style={{ fontSize:9, color:C.muted, marginTop:3 }}>Try a different name or mobile</div>
                    </div>
                  );
                  return filtered.map(u => (
                    <button key={u.id} onClick={() => setSelectedUser(u)} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                      <Card style={{ padding:"11px", transition:"all 0.2s" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ width:38, height:38, borderRadius:12, background: u.role==="admin" ? "linear-gradient(135deg,#4F46E5,#6D28D9)" : "linear-gradient(135deg,#6D28D9,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9, flexShrink:0 }}>
                            {u.role==="admin"?"🎖️":u.name[0]}
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontWeight:900, fontSize:9, color:"#1A1035", display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                              {u.name}
                              <span style={{ fontSize:9, padding:"1px 7px", borderRadius:20, fontWeight:900, background: u.role==="admin"?"rgba(79,70,229,0.12)":"rgba(8,145,178,0.10)", color: u.role==="admin"?"#4F46E5":"#0891B2" }}>
                                {u.role==="admin"?"👑 Admin":"🧑‍💼 Agent"}
                              </span>
                            </div>
                            <div style={{ fontSize:9, color:C.muted }}>
                              {u.loginId ? <span style={{ color:"#6D28D9", fontWeight:900 }}>@{u.loginId} · </span> : ""}{u.mobile} · {u.id}
                            </div>
                          </div>
                          <div style={{ textAlign:"right", display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3 }}>
                            <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{u.wallet}</div>
                            <Chip label={u.status} color={u.status==="active"?C.success:C.danger} />
                            <span style={{ fontSize:9, color:"#6D28D9" }}>View →</span>
                          </div>
                        </div>
                        <div style={{ display:"flex", gap:6, marginTop:7 }}>
                          <Chip label={`KYC: ${u.kyc}`} color={u.kyc==="approved"?C.success:C.warning} />
                          <span style={{ fontSize:9, color:C.muted, marginLeft:"auto", alignSelf:"center" }}>Joined {u.joinDate}</span>
                        </div>
                      </Card>
                    </button>
                  ));
                })()}
              </>
            )}
          </div>
        )}

        {tab === "txns" && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            {!selectedTxn && <button onClick={() => setTab("overview")} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.22)", borderRadius:22, padding:"6px 14px 6px 10px", cursor:"pointer", marginBottom:12, width:"fit-content", boxShadow:"0 2px 8px rgba(109,40,217,0.10)" }}>
              <div style={{ width:22, height:22, borderRadius:7, background:"rgba(109,40,217,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6D28D9" strokeWidth="2.2" fill="#6D28D9" fillOpacity="0.15"/><rect x="9" y="14" width="6" height="7" rx="1" fill="#6D28D9" fillOpacity="0.3"/></svg>
              </div>
              <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>Overview</span>
            </button>}
            {selectedTxn ? (
              /* ── TXN DETAIL DRAWER ── */
              <div style={{ animation:"slideIn 0.3s ease both" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <button onClick={() => setSelectedTxn(null)} style={{ background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:10, width:36, height:36, cursor:"pointer", fontSize: 13, display:"flex", alignItems:"center", justifyContent:"center", color:"#1A1035" }}>←</button>
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize: 13, color:"#1A1035" }}>Transaction Detail</span>
                </div>

                {/* Status header card */}
                <div style={{ borderRadius:18, padding:"18px", marginBottom:8, background: selectedTxn.status==="success" ? "linear-gradient(135deg,#059669,#10B981)" : "linear-gradient(135deg,#E11D48,#F43F5E)", boxShadow:`0 8px 24px ${selectedTxn.status==="success" ? "rgba(5,150,105,0.30)" : "rgba(225,29,72,0.30)"}` }}>
                  <div style={{ fontSize: 10, color:"rgba(255,255,255,0.75)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>{selectedTxn.type === "credit" ? "Wallet Load" : selectedTxn.type === "transfer" ? "Bank Transfer" : "Platform Fee"}</div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize: 15, fontWeight:900, color:"#fff", marginBottom:4 }}>{selectedTxn.amount}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <Chip label={selectedTxn.status} color="#fff" />
                    <span style={{ fontSize: 10, color:"rgba(255,255,255,0.75)" }}>{selectedTxn.date}</span>
                  </div>
                </div>

                {/* Basic info */}
                <Card style={{ marginBottom:8, padding:"14px" }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize: 11, marginBottom:10, color:"#1A1035" }}>Transaction Info</div>
                  {[
                    ["TXN ID", selectedTxn.id],
                    ["User", `${selectedTxn.user} (${selectedTxn.userId})`],
                    ["Method", selectedTxn.method],
                    ["Platform Fee", selectedTxn.fee],
                    ["Wallet Before", selectedTxn.walletBefore],
                    ["Wallet After", selectedTxn.walletAfter],
                    ["IP Address", selectedTxn.ip],
                    ["Device", selectedTxn.device],
                  ].map(([k,v]) => (
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ fontSize: 11, color:C.muted }}>{k}</span>
                      <span style={{ fontSize: 11, fontWeight:900, color:"#1A1035", textAlign:"right", maxWidth:"55%" }}>{v}</span>
                    </div>
                  ))}
                </Card>

                {/* Credit card details */}
                {selectedTxn.card && (
                  <Card style={{ marginBottom:8, padding:"14px" }}>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize: 11, marginBottom:8, color:"#1A1035" }}>💳 Card Details</div>
                    {/* Visual card */}
                    <div style={{ borderRadius:14, padding:"16px", background:"linear-gradient(135deg,#4F46E5,#6D28D9,#0891B2)", marginBottom:8, position:"relative", overflow:"hidden" }}>
                      <div style={{ position:"absolute", right:-20, top:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }} />
                      <div style={{ position:"absolute", right:10, bottom:-10, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                        <div>
                          <div style={{ fontSize: 10, color:"rgba(255,255,255,0.65)", marginBottom:2 }}>CARD TYPE</div>
                          <div style={{ fontSize: 11, color:"#fff", fontWeight:900 }}>{selectedTxn.card.type} · {selectedTxn.card.network}</div>
                        </div>
                        <div style={{ fontSize: 16 }}>{selectedTxn.card.network==="Visa"?"💙":"🟠"}</div>
                      </div>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize: 13, fontWeight:900, color:"#fff", letterSpacing:"0.15em", marginBottom:10 }}>{selectedTxn.card.number}</div>
                      <div style={{ display:"flex", justifyContent:"space-between" }}>
                        <div>
                          <div style={{ fontSize: 9, color:"rgba(255,255,255,0.60)", marginBottom:2 }}>CARD HOLDER</div>
                          <div style={{ fontSize: 11, color:"#fff", fontWeight:900 }}>{selectedTxn.card.holder}</div>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize: 9, color:"rgba(255,255,255,0.60)", marginBottom:2 }}>EXPIRES</div>
                          <div style={{ fontSize: 11, color:"#fff", fontWeight:900 }}>{selectedTxn.card.expiry}</div>
                        </div>
                      </div>
                    </div>
                    {[["Issuing Bank", selectedTxn.card.bank],["Network", selectedTxn.card.network],["Card Type", selectedTxn.card.type]].map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
                        <span style={{ fontSize: 11, color:C.muted }}>{k}</span>
                        <span style={{ fontSize: 11, fontWeight:900, color:"#1A1035" }}>{v}</span>
                      </div>
                    ))}
                  </Card>
                )}

                {/* Bank transfer details */}
                {selectedTxn.transfer && (
                  <Card style={{ marginBottom:8, padding:"14px" }}>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize: 11, marginBottom:8, color:"#1A1035" }}>🏦 Transfer Details</div>
                    <div style={{ borderRadius:12, padding:"14px", background:"linear-gradient(135deg,#EDE9FE,#E0F2FE)", marginBottom:8, border:"1px solid rgba(109,40,217,0.15)" }}>
                      <div style={{ fontSize: 10, color:C.muted, marginBottom:4 }}>BENEFICIARY ACCOUNT</div>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize: 15, fontWeight:900, color:"#1A1035", letterSpacing:"0.1em" }}>{selectedTxn.transfer.accNo}</div>
                      <div style={{ fontSize: 11, color:"#1A1035", fontWeight:900, marginTop:4 }}>{selectedTxn.transfer.holder}</div>
                    </div>
                    {[
                      ["Bank", selectedTxn.transfer.bank],
                      ["IFSC Code", selectedTxn.transfer.ifsc],
                      ["Transfer Mode", selectedTxn.transfer.mode],
                      ["UTR Number", selectedTxn.transfer.utr],
                    ].map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
                        <span style={{ fontSize: 11, color:C.muted }}>{k}</span>
                        <span style={{ fontSize: 11, fontWeight:900, color:"#1A1035" }}>{v}</span>
                      </div>
                    ))}
                  </Card>
                )}

                {/* Failure reason */}
                {selectedTxn.failReason && (
                  <div style={{ padding:"9px 11px", background:"rgba(225,29,72,0.07)", border:"1px solid rgba(225,29,72,0.22)", borderRadius:12, fontSize: 11, color:C.danger, marginBottom:8 }}>
                    ⚠️ <strong>Failure Reason:</strong> {selectedTxn.failReason}
                  </div>
                )}
              </div>
            ) : (
              /* ── TXN LIST ── */
              <>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize: 13, marginBottom:10, color:"#1A1035" }}>All Transactions</div>
                {mockTxns.map(t => (
                  <button key={t.id} onClick={() => setSelectedTxn(t)} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:10, textAlign:"left" }}>
                    <Card style={{ padding:"14px", transition:"all 0.2s" }}>
                      <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                        <div style={{ width:40, height:40, borderRadius:12, background:`linear-gradient(135deg,${t.type==="credit"?"#6D28D9":"#0891B2"},${t.type==="credit"?"#0891B2":"#6D28D9"})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize: 13, flexShrink:0 }}>
                          {t.type==="credit"?"↑":t.type==="transfer"?"🏛️":"⚡"}
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:900, fontSize: 11, color:"#1A1035" }}>{t.user}</div>
                          <div style={{ fontSize: 10, color:C.muted }}>{t.method} · {t.date}</div>
                          <div style={{ fontSize: 10, color:C.muted, marginTop:2 }}>{t.id}</div>
                        </div>
                        <div style={{ textAlign:"right", display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                          <div style={{ fontWeight:900, fontSize: 12, color: t.type==="credit" ? C.success : t.type==="transfer" ? "#0891B2" : C.muted }}>{t.amount}</div>
                          <Chip label={t.status} color={t.status==="success" ? C.success : C.danger} />
                          <span style={{ fontSize: 10, color:"#6D28D9" }}>View details →</span>
                        </div>
                      </div>
                    </Card>
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        {tab === "kyc" && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            <button onClick={() => setTab("overview")} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.22)", borderRadius:22, padding:"6px 14px 6px 10px", cursor:"pointer", marginBottom:12, width:"fit-content", boxShadow:"0 2px 8px rgba(109,40,217,0.10)" }}>
              <div style={{ width:22, height:22, borderRadius:7, background:"rgba(109,40,217,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6D28D9" strokeWidth="2.2" fill="#6D28D9" fillOpacity="0.15"/><rect x="9" y="14" width="6" height="7" rx="1" fill="#6D28D9" fillOpacity="0.3"/></svg>
              </div>
              <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>Overview</span>
            </button>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, marginBottom:8, color:"#1A1035" }}>KYC Approvals</div>

            {/* ── LIVE AGENT SUBMISSION ── */}
            {agentDocs ? (
              <Card style={{ marginBottom:8, border:"2px solid rgba(109,40,217,0.35)" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:38, height:38, borderRadius:11, background:"linear-gradient(135deg,#6D28D9,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9 }}>
                      {agentDocs.name?.[0]||"A"}
                    </div>
                    <div>
                      <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{agentDocs.name}</div>
                      <div style={{ fontSize:9, color:C.muted }}>{agentDocs.mobile} · {agentDocs.submittedAt}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                    <span style={{ fontSize:9, background:"rgba(109,40,217,0.12)", color:"#6D28D9", padding:"2px 7px", borderRadius:5, fontWeight:900 }}>🔴 LIVE</span>
                    <Chip label={agentDocs.status} color={agentDocs.status==="approved"?C.success:agentDocs.status==="rejected"?C.danger:C.warning} />
                  </div>
                </div>

                {/* Extracted data grid */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:10, background:"#F5F4FF", borderRadius:8, padding:"8px 10px" }}>
                  {[["PAN",agentDocs.pan],["Aadhaar",agentDocs.aadhaar],["Name",agentDocs.name],["Mobile",agentDocs.mobile]].map(([l,v])=>(
                    <div key={l}>
                      <div style={{ fontSize:9, color:C.muted }}>{l}</div>
                      <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{v||"—"}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize:9, color:C.muted, fontWeight:900, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>Uploaded Documents</div>

                {/* PAN Card image — clickable */}
                <button onClick={() => setDocViewer({ src: agentDocs.panData||null, label:"PAN Card", icon:"🪪", type:"pan" })} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                  <div style={{ borderRadius:10, overflow:"hidden", border:"1.5px solid rgba(217,119,6,0.35)", transition:"transform 0.15s, box-shadow 0.15s", boxShadow:"0 2px 8px rgba(217,119,6,0.12)" }}>
                    <div style={{ background:"rgba(217,119,6,0.12)", padding:"6px 10px", display:"flex", alignItems:"center", gap:6, borderBottom:"1px solid rgba(217,119,6,0.20)" }}>
                      <span style={{ fontSize:9 }}>🪪</span>
                      <span style={{ fontSize:9, fontWeight:900, color:"#92400E" }}>PAN Card</span>
                      <span style={{ fontSize:9, color:C.muted, marginLeft:"auto" }}>{agentDocs.panFileName}</span>
                      <span style={{ fontSize:9, background:"rgba(217,119,6,0.15)", color:"#92400E", padding:"1px 6px", borderRadius:4, fontWeight:900 }}>👁 View</span>
                    </div>
                    <div style={{ background:"#FFFBEB", padding:8, display:"flex", justifyContent:"center" }}>
                      {agentDocs.panData
                        ? <img src={agentDocs.panData} alt="PAN" style={{ maxWidth:"100%", maxHeight:100, borderRadius:6, objectFit:"contain" }} />
                        : <div style={{ padding:16, fontSize:9, color:C.muted }}>🪪 No PAN uploaded — tap to view placeholder</div>
                      }
                    </div>
                  </div>
                </button>

                {/* Aadhaar image — clickable */}
                <button onClick={() => setDocViewer({ src: agentDocs.aadhaarData||null, label:"Aadhaar Card", icon:"🏛️", type:"aadhaar" })} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                  <div style={{ borderRadius:10, overflow:"hidden", border:"1.5px solid rgba(109,40,217,0.30)", transition:"transform 0.15s, box-shadow 0.15s", boxShadow:"0 2px 8px rgba(109,40,217,0.10)" }}>
                    <div style={{ background:"rgba(109,40,217,0.08)", padding:"6px 10px", display:"flex", alignItems:"center", gap:6, borderBottom:"1px solid rgba(109,40,217,0.15)" }}>
                      <span style={{ fontSize:9 }}>🏛️</span>
                      <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>Aadhaar Card</span>
                      <span style={{ fontSize:9, color:C.muted, marginLeft:"auto" }}>{agentDocs.aadhaarFileName}</span>
                      <span style={{ fontSize:9, background:"rgba(109,40,217,0.12)", color:"#6D28D9", padding:"1px 6px", borderRadius:4, fontWeight:900 }}>👁 View</span>
                    </div>
                    <div style={{ background:"#EDE9FE", padding:8, display:"flex", justifyContent:"center" }}>
                      {agentDocs.aadhaarData
                        ? <img src={agentDocs.aadhaarData} alt="Aadhaar" style={{ maxWidth:"100%", maxHeight:100, borderRadius:6, objectFit:"contain" }} />
                        : <div style={{ padding:16, fontSize:9, color:C.muted }}>🏛️ No Aadhaar uploaded — tap to view placeholder</div>
                      }
                    </div>
                  </div>
                </button>

                {/* Selfie — clickable */}
                <button onClick={() => setDocViewer({ src: agentDocs.selfieData||null, label:"Live Selfie", icon:"🤳", type:"selfie" })} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                  <div style={{ borderRadius:10, overflow:"hidden", border:"1.5px solid rgba(8,145,178,0.30)", boxShadow:"0 2px 8px rgba(8,145,178,0.10)" }}>
                    <div style={{ background:"rgba(8,145,178,0.08)", padding:"6px 10px", display:"flex", alignItems:"center", gap:6, borderBottom:"1px solid rgba(8,145,178,0.15)" }}>
                      <span style={{ fontSize:9 }}>🤳</span>
                      <span style={{ fontSize:9, fontWeight:900, color:"#0891B2" }}>Live Selfie</span>
                      <span style={{ fontSize:9, color:C.muted, marginLeft:"auto" }}>{agentDocs.selfieFileName}</span>
                      <span style={{ fontSize:9, background:"rgba(8,145,178,0.12)", color:"#0891B2", padding:"1px 6px", borderRadius:4, fontWeight:900 }}>👁 View</span>
                    </div>
                    <div style={{ background:"#E0F2FE", padding:8, display:"flex", justifyContent:"center" }}>
                      {agentDocs.selfieData
                        ? <img src={agentDocs.selfieData} alt="Selfie" style={{ maxWidth:120, maxHeight:120, borderRadius:8, objectFit:"cover" }} />
                        : <div style={{ padding:16, fontSize:9, color:C.muted }}>🤳 No selfie uploaded</div>
                      }
                    </div>
                  </div>
                </button>

                {/* Actions */}
                {agentDocs.status === "pending" ? (
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => {
                      setAgentDocs(d => ({...d, status:"approved"}));
                      // Register mobile so agent can login immediately
                      if (agentDocs?.mobile) {
                        window.__approvedAgents = window.__approvedAgents || {};
                        window.__approvedAgents[agentDocs.mobile] = { name: agentDocs.name, pan: agentDocs.pan, kyc:"approved" };
                      }
                    }} style={{ flex:1, background:"linear-gradient(135deg,#059669,#10B981)", color:"#fff", border:"none", borderRadius:10, padding:"10px", fontSize:9, fontWeight:900, cursor:"pointer", boxShadow:"0 4px 12px rgba(5,150,105,0.30)" }}>
                      ✅ Approve KYC
                    </button>
                    <button onClick={() => setAgentDocs(d => ({...d, status:"rejected"}))} style={{ flex:1, background:"linear-gradient(135deg,#E11D48,#F43F5E)", color:"#fff", border:"none", borderRadius:10, padding:"10px", fontSize:9, fontWeight:900, cursor:"pointer", boxShadow:"0 4px 12px rgba(225,29,72,0.25)" }}>
                      ❌ Reject KYC
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign:"center", padding:"8px", fontSize:9, fontWeight:900, color:agentDocs.status==="approved"?C.success:C.danger }}>
                    {agentDocs.status==="approved"?"✅ KYC Approved":"❌ KYC Rejected"}
                  </div>
                )}
              </Card>
            ) : (
              <div style={{ textAlign:"center", padding:"28px 16px", background:"#fff", borderRadius:14, border:"1px dashed rgba(109,40,217,0.20)", marginBottom:8 }}>
                <div style={{ fontSize:9, marginBottom:8 }}>📭</div>
                <div style={{ fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:4 }}>No live submissions yet</div>
                <div style={{ fontSize:9, color:C.muted }}>Complete agent onboarding to see KYC documents here</div>
              </div>
            )}

            {/* ── MOCK ENTRIES ── */}
            {kycList.map(k => (
              <Card key={k.id} style={{ marginBottom:10 }}>
                {/* User header */}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <div style={{ width:44, height:44, borderRadius:14, background:"linear-gradient(135deg,#6D28D9,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize: 14, flexShrink:0 }}>{k.name[0]}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:900, fontSize: 12, color:"#1A1035" }}>{k.name}</div>
                    <div style={{ fontSize: 10, color:C.muted }}>{k.mobile} · DOB: {k.dob}</div>
                    <div style={{ fontSize: 10, color:C.muted }}>Submitted {k.submitted}</div>
                  </div>
                  <Chip label={k.status} color={k.status==="approved" ? C.success : k.status==="rejected" ? C.danger : C.warning} />
                </div>

                {/* Document previews */}
                <div style={{ marginBottom:8 }}>
                  <div style={{ fontSize: 10, color:C.muted, fontWeight:900, letterSpacing:"0.06em", marginBottom:8, textTransform:"uppercase" }}>Uploaded Documents</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                    {/* PAN Card preview */}
                    <div style={{ borderRadius:12, border:`1.5px solid ${k.panDoc.border}40`, overflow:"hidden" }}>
                      <div style={{ background:`${k.panDoc.border}15`, padding:"6px 10px", display:"flex", alignItems:"center", gap:6, borderBottom:`1px solid ${k.panDoc.border}25` }}>
                        <span style={{ fontSize: 12 }}>{k.panDoc.icon}</span>
                        <span style={{ fontSize: 10, fontWeight:900, color:k.panDoc.border }}>{k.panDoc.label}</span>
                      </div>
                      <div style={{ background:k.panDoc.color, padding:"10px", minHeight:90 }}>
                        {k.panDoc.lines.map((line,i) => (
                          <div key={i} style={{ fontSize: i<2?8:i===4?11:9, fontWeight: i===0||i===4?700:400, color: i===0?"#92400E": i===4?"#1A1035":"#44403C", marginBottom:2, fontFamily: i===0||i===1?"'Space Grotesk',sans-serif":"inherit", letterSpacing: i===4?"0.08em":"normal" }}>{line}</div>
                        ))}
                      </div>
                    </div>

                    {/* Aadhaar preview */}
                    <div style={{ borderRadius:12, border:`1.5px solid ${k.aadhaarDoc.border}40`, overflow:"hidden" }}>
                      <div style={{ background:`${k.aadhaarDoc.border}15`, padding:"6px 10px", display:"flex", alignItems:"center", gap:6, borderBottom:`1px solid ${k.aadhaarDoc.border}25` }}>
                        <span style={{ fontSize: 12 }}>{k.aadhaarDoc.icon}</span>
                        <span style={{ fontSize: 10, fontWeight:900, color:k.aadhaarDoc.border }}>{k.aadhaarDoc.label}</span>
                      </div>
                      <div style={{ background:k.aadhaarDoc.color, padding:"10px", minHeight:90 }}>
                        {k.aadhaarDoc.lines.map((line,i) => (
                          <div key={i} style={{ fontSize: i===0?9:i===1?13:i===4?11:9, fontWeight: i===1||i===4?700:400, color: i===1?"#4C1D95":i===4?"#1A1035":"#374151", marginBottom:2, fontFamily:"'Space Grotesk',sans-serif", letterSpacing: i===4?"0.10em":"normal" }}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Selfie preview */}
                  <div style={{ borderRadius:12, border:`1.5px solid ${k.selfieDoc.border}40`, overflow:"hidden" }}>
                    <div style={{ background:`${k.selfieDoc.border}15`, padding:"6px 10px", display:"flex", alignItems:"center", gap:6, borderBottom:`1px solid ${k.selfieDoc.border}25` }}>
                      <span style={{ fontSize: 12 }}>{k.selfieDoc.icon}</span>
                      <span style={{ fontSize: 10, fontWeight:900, color:k.selfieDoc.border }}>{k.selfieDoc.label} (Live Photo)</span>
                    </div>
                    <div style={{ background:k.selfieDoc.color, padding:"14px", display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg,#6D28D9,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize: 15, flexShrink:0, border:"3px solid rgba(255,255,255,0.80)", boxShadow:"0 4px 12px rgba(109,40,217,0.30)" }}>
                        {k.selfieDoc.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight:900, color:"#1A1035", marginBottom:2 }}>{k.name}</div>
                        <div style={{ fontSize: 10, color:C.muted, marginBottom:4 }}>Live selfie captured</div>
                        <div style={{ display:"flex", gap:6 }}>
                          <span style={{ fontSize: 10, background:"rgba(5,150,105,0.12)", color:C.success, padding:"2px 8px", borderRadius:6, fontWeight:900 }}>✓ Liveness check passed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extracted data */}
                <div style={{ background:"#F5F4FF", borderRadius:10, padding:"10px", marginBottom:8 }}>
                  <div style={{ fontSize: 10, fontWeight:900, color:C.muted, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Extracted Data</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                    {[["PAN",k.pan],["Aadhaar",k.aadhaar],["DOB",k.dob],["Mobile",k.mobile]].map(([l,v])=>(
                      <div key={l}>
                        <div style={{ fontSize: 9, color:C.muted }}>{l}</div>
                        <div style={{ fontSize: 11, fontWeight:900, color:"#1A1035" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {k.status === "pending" ? (
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => setKycList(list => list.map(x => x.id===k.id ? {...x,status:"approved"} : x))} style={{ flex:1, background:"linear-gradient(135deg,#059669,#10B981)", color:"#fff", border:"none", borderRadius:10, padding:"11px", fontSize: 11, fontWeight:900, cursor:"pointer", boxShadow:"0 4px 12px rgba(5,150,105,0.30)" }}>
                      ✅ Approve KYC
                    </button>
                    <button onClick={() => setKycList(list => list.map(x => x.id===k.id ? {...x,status:"rejected"} : x))} style={{ flex:1, background:"linear-gradient(135deg,#E11D48,#F43F5E)", color:"#fff", border:"none", borderRadius:10, padding:"11px", fontSize: 11, fontWeight:900, cursor:"pointer", boxShadow:"0 4px 12px rgba(225,29,72,0.25)" }}>
                      ❌ Reject KYC
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign:"center", padding:"8px", fontSize: 11, fontWeight:900, color: k.status==="approved" ? C.success : C.danger }}>
                    {k.status==="approved" ? "✅ KYC Approved" : "❌ KYC Rejected"}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {tab === "offers" && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            <button onClick={() => setTab("overview")} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.22)", borderRadius:22, padding:"6px 14px 6px 10px", cursor:"pointer", marginBottom:12, width:"fit-content", boxShadow:"0 2px 8px rgba(109,40,217,0.10)" }}>
              <div style={{ width:22, height:22, borderRadius:7, background:"rgba(109,40,217,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6D28D9" strokeWidth="2.2" fill="#6D28D9" fillOpacity="0.15"/><rect x="9" y="14" width="6" height="7" rx="1" fill="#6D28D9" fillOpacity="0.3"/></svg>
              </div>
              <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>Overview</span>
            </button>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, marginBottom:8, color:"#1A1035" }}>🎁 Publish Offers</div>

            {/* Publish form */}
            <Card style={{ marginBottom:10 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, marginBottom:10, color:"#1A1035" }}>Create New Offer</div>
              {[
                { key:"title",    label:"Offer Title",   placeholder:"e.g. Zero Fee Weekend" },
                { key:"code",     label:"Promo Code",    placeholder:"e.g. ZEROFEE" },
                { key:"discount", label:"Benefit",       placeholder:"e.g. 100% fee waiver" },
                { key:"validTill",label:"Valid Till",    placeholder:"e.g. 31 Mar 2025" },
                { key:"desc",     label:"Description",   placeholder:"Describe the offer..." },
              ].map(f => (
                <div key={f.key} style={{ marginBottom:10 }}>
                  <div style={{ fontSize:9, color:C.muted, marginBottom:3, fontWeight:900, letterSpacing:"0.04em" }}>{f.label.toUpperCase()}</div>
                  <input value={offerForm[f.key]} onChange={e => setOfferForm(p=>({...p,[f.key]:e.target.value}))}
                    placeholder={f.placeholder}
                    style={{ width:"100%", background:"#F9F8FF", border:"1.5px solid rgba(109,40,217,0.18)", borderRadius:8, padding:"8px 10px", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit" }} />
                </div>
              ))}
              <div style={{ marginBottom:10 }}>
                <div style={{ fontSize:9, color:C.muted, marginBottom:5, fontWeight:900, letterSpacing:"0.04em" }}>OFFER ICON</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {["🎀","⚡","📳","🏛️","🪙","⚡","🔥","🏹"].map(ic=>(
                    <button key={ic} onClick={() => setOfferForm(p=>({...p,icon:ic}))} style={{ width:36, height:36, borderRadius:9, border:`2px solid ${offerForm.icon===ic?"#6D28D9":"rgba(109,40,217,0.15)"}`, background:offerForm.icon===ic?"rgba(109,40,217,0.12)":"#fff", fontSize:9, cursor:"pointer" }}>{ic}</button>
                  ))}
                </div>
              </div>
              <button
                disabled={!offerForm.title||!offerForm.code||!offerForm.discount}
                onClick={() => {
                  const newOffer = { ...offerForm, id:"OFF"+uid(), color:"#6D28D9", bg:"linear-gradient(135deg,#EDE9FE,#DDD6FE)" };
                  const updated = [newOffer, ...publishedOffers];
                  setPublishedOffers(updated);
                  window.__publishedOffers = updated;
                  setOfferForm({ title:"", desc:"", code:"", discount:"", validTill:"", icon:"🎀", type:"fee" });
                }}
                style={{ width:"100%", background: (!offerForm.title||!offerForm.code||!offerForm.discount)?"rgba(109,40,217,0.15)":"linear-gradient(135deg,#6D28D9,#0891B2)", color: (!offerForm.title||!offerForm.code||!offerForm.discount)?"rgba(109,40,217,0.45)":"#fff", border:"none", borderRadius:10, padding:"11px", fontSize:9, fontWeight:900, cursor: (!offerForm.title||!offerForm.code||!offerForm.discount)?"not-allowed":"pointer", boxShadow: (!offerForm.title||!offerForm.code||!offerForm.discount)?"none":"0 4px 14px rgba(109,40,217,0.30)" }}>
                🎁 Publish Offer
              </button>
            </Card>

            {/* Published offers */}
            {publishedOffers.length > 0 && (
              <>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:10 }}>Published Offers ({publishedOffers.length})</div>
                {publishedOffers.map(o => (
                  <div key={o.id} style={{ background:"#fff", borderRadius:12, padding:"12px", marginBottom:8, border:"1px solid rgba(109,40,217,0.15)", display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:9 }}>{o.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{o.title}</div>
                      <div style={{ fontSize:9, color:C.muted }}>{o.code} · {o.discount} · Till {o.validTill||"—"}</div>
                    </div>
                    <button onClick={() => { const f=publishedOffers.filter(x=>x.id!==o.id); setPublishedOffers(f); window.__publishedOffers=f; }} style={{ background:"rgba(225,29,72,0.08)", border:"1px solid rgba(225,29,72,0.20)", color:C.danger, borderRadius:7, padding:"4px 10px", fontSize:9, fontWeight:900, cursor:"pointer" }}>Remove</button>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {tab === "tickets" && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            <button onClick={() => setTab("overview")} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.22)", borderRadius:22, padding:"6px 14px 6px 10px", cursor:"pointer", marginBottom:12, width:"fit-content", boxShadow:"0 2px 8px rgba(109,40,217,0.10)" }}>
              <div style={{ width:22, height:22, borderRadius:7, background:"rgba(109,40,217,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6D28D9" strokeWidth="2.2" fill="#6D28D9" fillOpacity="0.15"/><rect x="9" y="14" width="6" height="7" rx="1" fill="#6D28D9" fillOpacity="0.3"/></svg>
              </div>
              <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>Overview</span>
            </button>
            {selectedTicket ? (
              <div style={{ animation:"slideIn 0.3s ease both" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <button onClick={() => setSelectedTicket(null)} style={{ background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:9, width:32, height:32, cursor:"pointer", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", color:"#1A1035" }}>←</button>
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>Ticket Detail</span>
                  <Chip label={selectedTicket.status} color={selectedTicket.status==="open"?C.warning:selectedTicket.status==="resolved"?C.success:C.muted} />
                </div>
                <Card style={{ marginBottom:10 }}>
                  <div style={{ fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:6 }}>{selectedTicket.subject}</div>
                  {[["ID",selectedTicket.id],["Agent",selectedTicket.agent],["Mobile",selectedTicket.agentMobile],["Category",selectedTicket.category],["Raised",selectedTicket.createdAt]].map(([k,v])=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9, padding:"4px 0", borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:900, color:"#1A1035" }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop:8, fontSize:9, color:"#374151", lineHeight:1.5, background:"#F9F8FF", borderRadius:8, padding:"8px 10px" }}>{selectedTicket.desc}</div>
                </Card>
                <Card style={{ marginBottom:10 }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:8 }}>Reply / Update</div>
                  <textarea value={ticketReply} onChange={e=>setTicketReply(e.target.value)} placeholder="Type your reply..."
                    style={{ width:"100%", background:"#F9F8FF", border:"1.5px solid rgba(109,40,217,0.18)", borderRadius:8, padding:"8px 10px", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit", minHeight:70, resize:"none" }} />
                  <div style={{ display:"flex", gap:8, marginTop:10 }}>
                    {["open","in-progress","resolved"].map(s => (
                      <button key={s} onClick={() => {
                        const updated = (window.__agentTickets||[]).map(t => t.id===selectedTicket.id ? {...t,status:s,reply:ticketReply} : t);
                        window.__agentTickets = updated;
                        setSelectedTicket(prev => ({...prev,status:s,reply:ticketReply}));
                        setTicketReply("");
                      }} style={{ flex:1, background: s==="resolved"?"linear-gradient(135deg,#059669,#10B981)":s==="in-progress"?"linear-gradient(135deg,#6D28D9,#0891B2)":"rgba(217,119,6,0.12)", border:"none", color: s==="resolved"||s==="in-progress"?"#fff":"#D97706", borderRadius:8, padding:"8px 4px", fontSize:9, fontWeight:900, cursor:"pointer", textTransform:"capitalize" }}>
                        {s==="in-progress"?"In Progress":s.charAt(0).toUpperCase()+s.slice(1)}
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, marginBottom:8, color:"#1A1035" }}>🎫 Support Tickets</div>
                {(() => {
                  const allTickets = window.__agentTickets || [];
                  if (allTickets.length === 0) return (
                    <div style={{ textAlign:"center", padding:"32px 16px", background:"#fff", borderRadius:14, border:"1px dashed rgba(109,40,217,0.18)" }}>
                      <div style={{ fontSize:9, marginBottom:8 }}>📭</div>
                      <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>No tickets yet</div>
                      <div style={{ fontSize:9, color:C.muted, marginTop:3 }}>Agent tickets will appear here</div>
                    </div>
                  );
                  return allTickets.map(t => (
                    <button key={t.id} onClick={() => { setSelectedTicket(t); setTicketReply(""); }} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                      <Card style={{ padding:"12px" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                          <div style={{ fontWeight:900, fontSize:9, color:"#1A1035", flex:1 }}>{t.subject}</div>
                          <Chip label={t.status} color={t.status==="open"?C.warning:t.status==="resolved"?C.success:"#0891B2"} />
                        </div>
                        <div style={{ fontSize:9, color:C.muted }}>{t.agent} · {t.agentMobile}</div>
                        <div style={{ fontSize:9, color:C.muted, marginTop:2 }}>{t.category} · {t.createdAt} · {t.id}</div>
                      </Card>
                    </button>
                  ));
                })()}
              </>
            )}
          </div>
        )}

        {tab === "limits" && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            <button onClick={() => setTab("overview")} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.22)", borderRadius:22, padding:"6px 14px 6px 10px", cursor:"pointer", marginBottom:12, width:"fit-content", boxShadow:"0 2px 8px rgba(109,40,217,0.10)" }}>
              <div style={{ width:22, height:22, borderRadius:7, background:"rgba(109,40,217,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6D28D9" strokeWidth="2.2" fill="#6D28D9" fillOpacity="0.15"/><rect x="9" y="14" width="6" height="7" rx="1" fill="#6D28D9" fillOpacity="0.3"/></svg>
              </div>
              <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>Overview</span>
            </button>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, marginBottom:10, color:"#1A1035" }}>🎚️ Agent Limits & Fees</div>

            {/* Global defaults banner */}
            <div style={{ padding:"10px 14px", background:"rgba(109,40,217,0.06)", border:"1px solid rgba(109,40,217,0.18)", borderRadius:10, marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:900, color:"#6D28D9", marginBottom:4 }}>📋 Global Defaults (from Fees tab)</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {[
                  ["Credit Fee", `${getFeeConfig().credit}%`],
                  ["Debit Fee",  `${getFeeConfig().debit}%`],
                  ["Transfer",   `₹${getFeeConfig().transfer}`],
                  ["Daily Limit","₹2,00,000"],
                  ["Txn Limit",  "₹1,00,000"],
                ].map(([k,v]) => (
                  <div key={k} style={{ background:"rgba(109,40,217,0.10)", borderRadius:6, padding:"3px 8px" }}>
                    <span style={{ fontSize:9, color:C.muted }}>{k}: </span>
                    <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent detail editor */}
            {selectedLimitAgent ? (
              <div style={{ animation:"slideIn 0.3s ease both" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <button onClick={() => { setSelectedLimitAgent(null); setLimitSaved(false); }} style={{ background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:9, width:32, height:32, cursor:"pointer", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", color:"#1A1035" }}>←</button>
                  <div>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>{selectedLimitAgent.name}</div>
                    <div style={{ fontSize:9, color:C.muted }}>{selectedLimitAgent.mobile} · {selectedLimitAgent.id}</div>
                  </div>
                  {agentLimits[selectedLimitAgent.id] && (
                    <span style={{ fontSize:9, background:"rgba(109,40,217,0.12)", color:"#6D28D9", padding:"2px 7px", borderRadius:5, fontWeight:900, marginLeft:"auto" }}>Custom</span>
                  )}
                </div>

                <Card style={{ marginBottom:10, border:"1.5px solid rgba(109,40,217,0.22)" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>⚙️ Custom Limits & Fees</div>
                    {limitSaved && <span style={{ fontSize:9, color:C.success, fontWeight:900, background:"rgba(5,150,105,0.10)", padding:"2px 8px", borderRadius:6 }}>✅ Saved!</span>}
                  </div>

                  {[
                    { key:"dailyLimit",   label:"📅 Daily Limit",          unit:"₹",  placeholder:"e.g. 200000",  hint:"Max wallet load per day" },
                    { key:"txnLimit",     label:"💳 Per-Transaction Limit", unit:"₹",  placeholder:"e.g. 100000",  hint:"Max single transaction" },
                    { key:"creditFee",    label:"💳 Credit Card Fee",       unit:"%",  placeholder:"e.g. 1.8",     hint:"Override credit card fee for this agent" },
                    { key:"debitFee",     label:"💰 Debit Card Fee",        unit:"%",  placeholder:"e.g. 0.5",     hint:"Override debit card fee for this agent" },
                    { key:"transferFee",  label:"🏦 Transfer Fee",          unit:"₹",  placeholder:"e.g. 10",      hint:"Override transfer fee for this agent" },
                  ].map(({ key, label, unit, placeholder, hint }) => (
                    <div key={key} style={{ marginBottom:8 }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:3 }}>
                        <div>
                          <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{label}</div>
                          <div style={{ fontSize:9, color:C.muted }}>{hint}</div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                          <input
                            type="number" min={0} value={limitEdit[key] ?? getAgentLimit(selectedLimitAgent.id, key)}
                            onChange={e => setLimitEdit(p => ({...p, [key]: Number(e.target.value)}))}
                            placeholder={placeholder}
                            style={{ width:80, background:"#F9F8FF", border:"1.5px solid rgba(109,40,217,0.30)", borderRadius:8, padding:"6px 8px", fontSize:9, fontWeight:900, color:"#6D28D9", textAlign:"right", outline:"none", fontFamily:"'Space Grotesk',sans-serif" }}
                          />
                          <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9", minWidth:16 }}>{unit}</span>
                        </div>
                      </div>
                      {/* Current vs default */}
                      <div style={{ fontSize:9, color: agentLimits[selectedLimitAgent.id]?.[key] !== undefined ? "#6D28D9" : C.muted }}>
                        {agentLimits[selectedLimitAgent.id]?.[key] !== undefined ? "✏️ Custom value set" : `Using global default: ${unit === "₹" ? "₹" : ""}${DEFAULT_LIMITS[key]}${unit === "%" ? "%" : ""}`}
                      </div>
                    </div>
                  ))}

                  {/* AEPS Controls */}
                  <div style={{ margin:"14px 0 10px", padding:"12px", background:"rgba(5,150,105,0.05)", borderRadius:10, border:"1px solid rgba(5,150,105,0.18)" }}>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#059669", marginBottom:10 }}>👆 AEPS (Aadhaar Payment) Controls</div>
                    {/* Enable/Disable AEPS for this agent */}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                      <div>
                        <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>AEPS Enabled</div>
                        <div style={{ fontSize:9, color:C.muted }}>Allow this agent to process AEPS transactions</div>
                      </div>
                      <div onClick={() => setLimitEdit(p => ({...p, aepsEnabled:!p.aepsEnabled}))} style={{ width:40, height:22, borderRadius:11, background:limitEdit.aepsEnabled?"#059669":"rgba(0,0,0,0.15)", cursor:"pointer", position:"relative", transition:"background 0.25s", flexShrink:0 }}>
                        <div style={{ position:"absolute", top:3, left:limitEdit.aepsEnabled?20:3, width:16, height:16, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 4px rgba(0,0,0,0.25)", transition:"left 0.25s" }} />
                      </div>
                    </div>
                    {limitEdit.aepsEnabled && (
                      <div style={{ animation:"fadeUp 0.25s ease both" }}>
                        {[
                          { key:"aepsDailyLimit", label:"AEPS Daily Limit", unit:"₹", placeholder:"e.g. 50000" },
                          { key:"aepsPerTxnLimit", label:"AEPS Per-Txn Limit", unit:"₹", placeholder:"e.g. 10000" },
                        ].map(({ key, label, unit, placeholder }) => (
                          <div key={key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                            <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{label}</div>
                            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                              <input type="number" min={0} value={limitEdit[key] ?? DEFAULT_LIMITS[key]} onChange={e=>setLimitEdit(p=>({...p,[key]:Number(e.target.value)}))} placeholder={placeholder}
                                style={{ width:80, background:"#fff", border:"1.5px solid rgba(5,150,105,0.35)", borderRadius:7, padding:"5px 8px", fontSize:9, fontWeight:900, color:"#059669", textAlign:"right", outline:"none", fontFamily:"inherit" }} />
                              <span style={{ fontSize:9, fontWeight:900, color:C.muted }}>{unit}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display:"flex", gap:8, marginTop:4 }}>
                    <button onClick={() => saveAgentLimit(selectedLimitAgent.id)} style={{ flex:2, background:"linear-gradient(135deg,#6D28D9,#0891B2)", color:"#fff", border:"none", borderRadius:10, padding:"11px", fontSize:9, fontWeight:900, cursor:"pointer", boxShadow:"0 4px 14px rgba(109,40,217,0.28)" }}>
                      💾 Save for {selectedLimitAgent.name.split(" ")[0]}
                    </button>
                    {agentLimits[selectedLimitAgent.id] && (
                      <button onClick={() => { resetAgentLimit(selectedLimitAgent.id); setLimitEdit({}); }} style={{ flex:1, background:"rgba(225,29,72,0.08)", border:"1px solid rgba(225,29,72,0.22)", color:C.danger, borderRadius:10, padding:"11px", fontSize:9, fontWeight:900, cursor:"pointer" }}>
                        ↩ Reset
                      </button>
                    )}
                  </div>
                </Card>

                {/* Current effective limits for this agent */}
                <Card>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:10 }}>📊 Effective Limits for this Agent</div>
                  {[
                    ["Daily Limit",   `₹${getAgentLimit(selectedLimitAgent.id,"dailyLimit").toLocaleString("en-IN")}`],
                    ["Per-Txn Limit", `₹${getAgentLimit(selectedLimitAgent.id,"txnLimit").toLocaleString("en-IN")}`],
                    ["Credit Fee",    `${getAgentLimit(selectedLimitAgent.id,"creditFee")}%`],
                    ["Debit Fee",     `${getAgentLimit(selectedLimitAgent.id,"debitFee")}%`],
                    ["Transfer Fee",  `₹${getAgentLimit(selectedLimitAgent.id,"transferFee")}`],
                    ["👆 AEPS",       getAgentLimit(selectedLimitAgent.id,"aepsEnabled")?"✅ Enabled":"❌ Disabled"],
                    ...(getAgentLimit(selectedLimitAgent.id,"aepsEnabled")?[
                      ["AEPS Daily",  `₹${getAgentLimit(selectedLimitAgent.id,"aepsDailyLimit").toLocaleString("en-IN")}`],
                      ["AEPS Per-Txn",`₹${getAgentLimit(selectedLimitAgent.id,"aepsPerTxnLimit").toLocaleString("en-IN")}`],
                    ]:[]),
                  ].map(([k,v]) => (
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ fontSize:9, color:C.muted }}>{k}</span>
                      <span style={{ fontSize:9, fontWeight:900, color: agentLimits[selectedLimitAgent.id] ? "#6D28D9" : "#1A1035" }}>{v}</span>
                    </div>
                  ))}
                </Card>
              </div>
            ) : (
              /* Agent list */
              <>
                <div style={{ fontSize:9, fontWeight:900, color:C.muted, marginBottom:8 }}>Select an agent to configure individual limits</div>
                {users.filter(u => u.role === "agent").map(u => {
                  const hasCustom = !!agentLimits[u.id];
                  return (
                    <button key={u.id} onClick={() => { setSelectedLimitAgent(u); setLimitEdit({...agentLimits[u.id]}||{}); }} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                      <Card style={{ padding:"11px 13px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#6D28D9,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9, flexShrink:0 }}>
                            {u.name[0]}
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontWeight:900, fontSize:9, color:"#1A1035", display:"flex", alignItems:"center", gap:6 }}>
                              {u.name}
                              {hasCustom && <span style={{ fontSize:9, background:"rgba(109,40,217,0.12)", color:"#6D28D9", padding:"1px 6px", borderRadius:5, fontWeight:900 }}>Custom</span>}
                            </div>
                            <div style={{ fontSize:9, color:C.muted }}>{u.mobile}</div>
                            {hasCustom && (
                              <div style={{ fontSize:9, color:"#6D28D9", marginTop:2 }}>
                                Daily: ₹{(agentLimits[u.id]?.dailyLimit||DEFAULT_LIMITS.dailyLimit).toLocaleString("en-IN")} · Credit: {agentLimits[u.id]?.creditFee??DEFAULT_LIMITS.creditFee}%
                              </div>
                            )}
                          </div>
                          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                            <Chip label={u.kyc==="approved"?"KYC ✓":"KYC Pending"} color={u.kyc==="approved"?C.success:C.warning} />
                            <span style={{ fontSize:9, color:"#6D28D9" }}>Set Limits →</span>
                          </div>
                        </div>
                      </Card>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        )}

        {tab === "fees" && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            <button onClick={() => setTab("overview")} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.22)", borderRadius:22, padding:"6px 14px 6px 10px", cursor:"pointer", marginBottom:12, width:"fit-content", boxShadow:"0 2px 8px rgba(109,40,217,0.10)" }}>
              <div style={{ width:22, height:22, borderRadius:7, background:"rgba(109,40,217,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6D28D9" strokeWidth="2.2" fill="#6D28D9" fillOpacity="0.15"/><rect x="9" y="14" width="6" height="7" rx="1" fill="#6D28D9" fillOpacity="0.3"/></svg>
              </div>
              <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>Overview</span>
            </button>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, marginBottom:8, color:"#1A1035" }}>⚙️ Platform Fee Configuration</div>

            {/* Live preview banner */}
            <div style={{ padding:"10px 14px", background:"rgba(109,40,217,0.06)", border:"1px solid rgba(109,40,217,0.18)", borderRadius:10, marginBottom:8, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:9 }}>💡</span>
              <div>
                <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>Live Config</div>
                <div style={{ fontSize:9, color:C.muted }}>Changes apply instantly to all agent transactions</div>
              </div>
            </div>

            {/* Current fees preview */}
            <Card style={{ marginBottom:8 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:10 }}>Current Active Fees</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {[
                  { icon:"🪙", label:"Credit Card", value:`${getFeeConfig().credit}%`, color:"#E11D48" },
                  { icon:"🏧", label:"Debit Card",  value:`${getFeeConfig().debit}%`,  color:"#D97706" },
                  { icon:"📳", label:"UPI Load",    value:`${getFeeConfig().upi}%`,    color:"#059669" },
                  { icon:"🏛️", label:"Transfer",    value:`₹${getFeeConfig().transfer}`,color:"#0891B2" },
                ].map(f => (
                  <div key={f.label} style={{ background:`${f.color}08`, borderRadius:10, padding:"10px 12px", border:`1px solid ${f.color}20` }}>
                    <div style={{ fontSize:9, marginBottom:4 }}>{f.icon}</div>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:f.color }}>{f.value}</div>
                    <div style={{ fontSize:9, color:C.muted, marginTop:1 }}>{f.label}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Edit form */}
            <Card style={{ border:"1.5px solid rgba(109,40,217,0.25)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>Edit Fees</div>
                {feeSaved && <span style={{ fontSize:9, color:C.success, fontWeight:900, background:"rgba(5,150,105,0.10)", padding:"2px 8px", borderRadius:6 }}>✅ Saved!</span>}
              </div>
              {[
                { key:"credit",   label:"💳 Credit Card Fee", unit:"%",  max:10,  step:0.1, hint:"Applied on wallet load via Credit Card" },
                { key:"debit",    label:"💰 Debit Card Fee",  unit:"%",  max:5,   step:0.1, hint:"Applied on wallet load via Debit Card" },
                { key:"upi",      label:"📲 UPI Load Fee",    unit:"%",  max:2,   step:0.1, hint:"Fee on wallet load via UPI (usually 0%)" },
                { key:"transfer", label:"🏦 Bank Transfer",   unit:"₹",  max:100, step:1,   hint:"Flat fee per wallet-to-bank transfer" },
              ].map(({ key, label, unit, max, step, hint }) => (
                <div key={key} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:3 }}>
                    <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{label}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <input
                        type="number" min={0} max={max} step={step}
                        value={feeEdit[key]}
                        onChange={e => setFeeEdit(p => ({...p, [key]: Number(e.target.value)}))}
                        style={{ width:64, background:"#F9F8FF", border:"1.5px solid rgba(109,40,217,0.30)", borderRadius:8, padding:"6px 8px", fontSize:9, fontWeight:900, color:"#6D28D9", textAlign:"right", outline:"none", fontFamily:"'Space Grotesk',sans-serif" }}
                      />
                      <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9", minWidth:18 }}>{unit}</span>
                    </div>
                  </div>
                  <div style={{ fontSize:9, color:C.muted, marginBottom:4 }}>{hint}</div>
                  <div style={{ height:5, background:"#EDE9FE", borderRadius:3, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${Math.min((feeEdit[key]/max)*100,100)}%`, background:"linear-gradient(90deg,#6D28D9,#0891B2)", borderRadius:3, transition:"width 0.3s" }} />
                  </div>
                </div>
              ))}
              <button onClick={saveFees} style={{ width:"100%", background:"linear-gradient(135deg,#6D28D9,#0891B2)", color:"#fff", border:"none", borderRadius:10, padding:"13px", fontSize:9, fontWeight:900, cursor:"pointer", boxShadow:"0 4px 16px rgba(109,40,217,0.32)", marginTop:4 }}>
                💾 Save Fee Configuration
              </button>
            </Card>
          </div>
        )}

        {tab === "doorstep" && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            <button onClick={() => setTab("overview")} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.22)", borderRadius:22, padding:"6px 14px 6px 10px", cursor:"pointer", marginBottom:12, width:"fit-content", boxShadow:"0 2px 8px rgba(109,40,217,0.10)" }}>
              <div style={{ width:22, height:22, borderRadius:7, background:"rgba(109,40,217,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6D28D9" strokeWidth="2.2" fill="#6D28D9" fillOpacity="0.15"/><rect x="9" y="14" width="6" height="7" rx="1" fill="#6D28D9" fillOpacity="0.3"/></svg>
              </div>
              <span style={{ fontSize:9, fontWeight:900, color:"#6D28D9" }}>Overview</span>
            </button>
            <AdminDoorstepTab />
          </div>
        )}


        {tab === "risk" && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize: 13, marginBottom:8, color:"#1A1035" }}>Risk & Fraud Control</div>


            <Card style={{ marginBottom:8 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, marginBottom:8, fontSize: 12 }}>Transaction Limits</div>
              {[["Per Transaction","₹1,00,000",50],["Daily Limit","₹2,00,000",65],["Monthly Limit","₹20,00,000",30]].map(([l,v,pct])=>(
                <div key={l} style={{ marginBottom:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize: 11, marginBottom:5 }}>
                    <span style={{ color:C.muted }}>{l}</span><span style={{ fontWeight:900 }}>{v}</span>
                  </div>
                  <div style={{ height:7, background:"#EDE9FE", borderRadius:4, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${pct}%`, background: pct>80 ? "linear-gradient(90deg,#E11D48,#F43F5E)" : "linear-gradient(90deg,#6D28D9,#0891B2)", borderRadius:4, animation:"barFill 1s ease both" }} />
                  </div>
                </div>
              ))}
            </Card>
            <Card style={{ marginBottom:8 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, marginBottom:8, fontSize: 12 }}>Fraud Signals</div>
              {[
                { label:"Multiple failed OTP attempts", status:"clear", icon:"☑️" },
                { label:"Unusual transaction velocity",  status:"warn",  icon:"🚨" },
                { label:"Suspicious IP pattern",         status:"clear", icon:"☑️" },
                { label:"High-risk card BIN detected",   status:"warn",  icon:"🚨" },
              ].map(({label,status,icon})=>(
                <div key={label} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13 }}>{icon}</span>
                  <span style={{ flex:1, fontSize: 11, color: status==="warn" ? C.warning : "#1A1035" }}>{label}</span>
                  <Chip label={status==="warn"?"Warning":"Clear"} color={status==="warn"?C.warning:C.success} />
                </div>
              ))}
            </Card>
            <Card>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, marginBottom:8, fontSize: 12 }}>System Controls</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[["🔒 Freeze All Withdrawals","rgba(225,29,72,0.08)","rgba(225,29,72,0.25)",C.danger],["⚙️ Adjust Limits","rgba(109,40,217,0.08)","rgba(109,40,217,0.25)",C.accent],["📧 Alert All Agents","rgba(8,145,178,0.08)","rgba(8,145,178,0.25)","#0891B2"]].map(([label,bg,border,color])=>(
                  <button key={label} style={{ background:bg, border:`1px solid ${border}`, color, borderRadius:10, padding:"11px 16px", fontSize: 11, fontWeight:900, cursor:"pointer", textAlign:"left" }}>{label}</button>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

    </div>
  );
};

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────

// ─── AGENT: OFFERS SCREEN ────────────────────────────────────────────────────
// T&C templates per offer type
const OFFER_TC = {
  fee: [
    "Offer valid only on wallet loads using Credit or Debit cards.",
    "Minimum transaction amount: ₹500 per load.",
    "Maximum benefit capped at ₹200 per transaction.",
    "Offer applicable once per user per day.",
    "Cannot be combined with any other running offer.",
    "S3Payments reserves the right to modify or withdraw this offer at any time without prior notice.",
    "In case of refund or reversal, the offer benefit will be reversed.",
    "Valid for KYC-approved accounts only.",
  ],
  cashback: [
    "Cashback will be credited to the wallet within 24 hours of successful transaction.",
    "Minimum load amount to avail cashback: ₹500.",
    "Maximum cashback per user: ₹50 per month.",
    "Offer valid for first-time loaders only.",
    "Cashback is non-transferable and cannot be withdrawn directly to bank.",
    "Offer valid only on Credit/Debit card transactions.",
    "S3Payments reserves the right to reverse cashback in case of fraudulent activity.",
    "Valid for KYC-approved accounts only.",
  ],
  bonus: [
    "Bonus applicable only on wallet loads via UPI.",
    "Minimum transaction to earn bonus: ₹200.",
    "Bonus credited as wallet balance; not directly withdrawable.",
    "Offer valid on one UPI transaction per day per user.",
    "Bonus amount depends on transaction value; subject to change.",
    "S3Payments is not responsible for UPI transaction failures.",
    "Offer cannot be clubbed with other active promotions.",
    "Valid only for registered and KYC-verified agents.",
  ],
  default: [
    "This offer is valid for a limited period only.",
    "S3Payments reserves the right to modify terms without prior notice.",
    "Offer applicable to KYC-verified accounts only.",
    "Benefit will be credited as per offer terms within 48 hours.",
    "One offer per user unless stated otherwise.",
    "In case of dispute, S3Payments decision shall be final.",
  ],
};

const OffersScreen = ({ onBack }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [copied, setCopied] = useState(false);

  const offers = (window.__publishedOffers || []);
  const builtIn = [
    { id:"OFF001", title:"Zero Fee Weekend", desc:"0% platform fee on all wallet loads this weekend. Save more every time you top up your S3Payments wallet during the offer period.", code:"ZEROFEE", discount:"100% fee waiver", validTill:"31 Mar 2025", type:"fee", color:"#059669", bg:"linear-gradient(135deg,#D1FAE5,#A7F3D0)", icon:"🎀", howToUse:"Enter code ZEROFEE at the Add Money screen before completing your transaction." },
    { id:"OFF002", title:"First Load Bonus", desc:"Add ₹500 or more to your wallet and receive ₹50 cashback instantly credited to your wallet balance.", code:"FIRST50", discount:"₹50 cashback", validTill:"30 Apr 2025", type:"cashback", color:"#6D28D9", bg:"linear-gradient(135deg,#EDE9FE,#DDD6FE)", icon:"⚡", howToUse:"Load ₹500+ via Credit/Debit card. Cashback auto-credited within 24 hours." },
    { id:"OFF003", title:"UPI Advantage", desc:"Use UPI to load your wallet and earn an extra 1% bonus on your next bank transfer. Stack savings every time you use UPI.", code:"UPIBONUS", discount:"1% bonus", validTill:"15 Apr 2025", type:"bonus", color:"#0891B2", bg:"linear-gradient(135deg,#E0F2FE,#BAE6FD)", icon:"📳", howToUse:"Select UPI as payment method during Add Money. Bonus credited after successful transfer." },
  ];
  const allOffers = [...offers, ...builtIn];

  const handleCopyCode = (code) => {
    setCopied(code);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Offer Detail View ────────────────────────────────────────────────────
  if (selectedOffer) {
    const o = selectedOffer;
    const tc = OFFER_TC[o.type] || OFFER_TC.default;
    return (
      <div style={{ background:"#F9F8FF", animation:"slideIn 0.3s ease both" }}>
        <NavBar title="Offer Details" onBack={() => setSelectedOffer(null)} />

        {/* Hero banner */}
        <div style={{ background:o.bg, padding:"20px 16px 16px", borderBottom:`1px solid ${o.color}20` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:`${o.color}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, boxShadow:`0 4px 14px ${o.color}30`, flexShrink:0 }}>{o.icon}</div>
            <div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>{o.title}</div>
              <div style={{ fontSize:9, fontWeight:900, color:o.color, marginTop:2 }}>{o.discount}</div>
            </div>
          </div>
          <p style={{ fontSize:9, color:"#374151", lineHeight:1.6, marginBottom:8 }}>{o.desc}</p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <span style={{ fontSize:9, background:`${o.color}15`, color:o.color, padding:"3px 10px", borderRadius:20, fontWeight:900 }}>Valid till {o.validTill}</span>
            <span style={{ fontSize:9, background:`${o.color}15`, color:o.color, padding:"3px 10px", borderRadius:20, fontWeight:900 }}>Type: {o.type}</span>
          </div>
        </div>

        <div style={{ padding:"9px 11px" }}>
          {/* Promo code */}
          <Card style={{ marginBottom:8, padding:"14px" }}>
            <div style={{ fontSize:9, color:C.muted, fontWeight:900, letterSpacing:"0.06em", marginBottom:8 }}>PROMO CODE</div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ flex:1, background:`${o.color}10`, border:`2px dashed ${o.color}50`, borderRadius:10, padding:"10px 14px", textAlign:"center" }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:o.color, letterSpacing:"0.16em" }}>{o.code}</div>
              </div>
              <button onClick={() => handleCopyCode(o.code)} style={{ background: copied===o.code ? "rgba(5,150,105,0.12)" : `${o.color}15`, border:`1.5px solid ${copied===o.code?C.success:o.color}50`, color: copied===o.code ? C.success : o.color, borderRadius:10, padding:"10px 14px", fontSize:9, fontWeight:900, cursor:"pointer", flexShrink:0, transition:"all 0.2s" }}>
                {copied===o.code ? "✓ Copied!" : "📋 Copy"}
              </button>
            </div>
          </Card>

          {/* How to use */}
          {o.howToUse && (
            <Card style={{ marginBottom:8, padding:"14px", border:`1px solid ${o.color}25`, background:`${o.color}05` }}>
              <div style={{ display:"flex", gap:10 }}>
                <span style={{ fontSize:9 }}>💡</span>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:4 }}>How to Use</div>
                  <div style={{ fontSize:9, color:"#374151", lineHeight:1.5 }}>{o.howToUse}</div>
                </div>
              </div>
            </Card>
          )}

          {/* Terms & Conditions */}
          <Card style={{ marginBottom:10, padding:"14px" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:9 }}>📄</span> Terms & Conditions
            </div>
            {tc.map((t, i) => (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:8, alignItems:"flex-start" }}>
                <div style={{ width:18, height:18, borderRadius:"50%", background:`${o.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:900, color:o.color, flexShrink:0, marginTop:1 }}>{i+1}</div>
                <span style={{ fontSize:9, color:"#374151", lineHeight:1.5 }}>{t}</span>
              </div>
            ))}
            <div style={{ marginTop:10, padding:"8px 10px", background:"rgba(217,119,6,0.06)", borderRadius:8, border:"1px solid rgba(217,119,6,0.18)", fontSize:9, color:"#92400E" }}>
              ⚠️ By using this offer, you agree to all terms & conditions listed above. S3Payments reserves the right to take legal action in case of misuse.
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ── Offer List View ──────────────────────────────────────────────────────
  return (
    <div style={{ background:"#F9F8FF" }}>
      <NavBar title="Offers & Rewards" onBack={onBack} right={<Chip label={`${allOffers.length} Active`} color={C.success} />} />
      <div style={{ padding:"9px 11px" }}>
        {allOffers.length === 0 ? (
          <div style={{ textAlign:"center", padding:40 }}>
            <div style={{ fontSize:9, marginBottom:10 }}>🎁</div>
            <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>No offers yet</div>
            <div style={{ fontSize:9, color:C.muted, marginTop:4 }}>Check back soon for exclusive deals</div>
          </div>
        ) : allOffers.map(o => (
          <button key={o.id} onClick={() => setSelectedOffer(o)} style={{ width:"100%", background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
            <div style={{ background:o.bg, borderRadius:16, padding:"16px", border:`1.5px solid ${o.color}30`, boxShadow:`0 4px 14px ${o.color}15`, animation:"cardSlide 0.4s ease both", transition:"transform 0.15s, box-shadow 0.15s" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:10 }}>
                <div style={{ width:42, height:42, borderRadius:12, background:`${o.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>{o.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>{o.title}</div>
                  <div style={{ fontSize:9, color:"#374151", marginTop:2, lineHeight:1.4 }}>{o.desc?.slice(0,60)}{o.desc?.length>60?"...":""}</div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:6 }}>
                <div style={{ background:`${o.color}18`, borderRadius:8, padding:"5px 12px" }}>
                  <div style={{ fontSize:9, color:o.color, fontWeight:900, letterSpacing:"0.06em" }}>PROMO CODE</div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:o.color, letterSpacing:"0.10em" }}>{o.code}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:9, fontWeight:900, color:o.color }}>{o.discount}</div>
                  <div style={{ fontSize:9, color:"#6B7280" }}>Valid till {o.validTill}</div>
                  <div style={{ fontSize:9, color:o.color, fontWeight:900, marginTop:3 }}>View details + T&C →</div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── AGENT: HELP & TICKET SCREEN ─────────────────────────────────────────────
const HelpScreen = ({ onBack, user }) => {
  const [view, setView] = useState("menu");    // menu | new | myTickets
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("payment");
  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [tickets, setTickets] = useState(window.__agentTickets || []);

  const categories = [
    { id:"payment",  label:"Payment Issue",  icon:"🪙" },
    { id:"kyc",      label:"KYC Problem",    icon:"🗃️" },
    { id:"transfer", label:"Transfer Issue", icon:"🏛️" },
    { id:"account",  label:"Account Help",   icon:"🧑" },
    { id:"other",    label:"Other",          icon:"❓" },
  ];

  const submitTicket = async () => {
    await sleep(800);
    const t = { id:"TKT"+uid(), subject, category, desc, status:"open", priority:"medium", createdAt: new Date().toLocaleString("en-IN"), agent: user?.name || "Agent", agentMobile: user?.mobile || "—" };
    const updated = [t, ...tickets];
    setTickets(updated);
    window.__agentTickets = updated;
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="Help & Support" onBack={() => { setSubmitted(false); setView("menu"); onBack(); }} />
      <div style={{ padding:24, textAlign:"center", animation:"scaleIn 0.4s ease both" }}>
        <div style={{ fontSize:9, marginBottom:10 }}>✅</div>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:C.accent }}>Ticket Raised!</div>
        <div style={{ fontSize:9, color:C.muted, marginTop:6, marginBottom:12 }}>Our team will respond within 24 hours</div>
        <Card glow style={{ marginBottom:12, textAlign:"left" }}>
          {[["Ticket ID", tickets[0]?.id],["Subject",subject],["Category",categories.find(c=>c.id===category)?.label],["Status","Open"],["ETA","24 hours"]].map(([k,v])=>(
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:9, color:C.muted }}>{k}</span>
              <span style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{v}</span>
            </div>
          ))}
        </Card>
        <Btn variant="secondary" onClick={() => { setSubmitted(false); setSubject(""); setDesc(""); setView("menu"); }}>Back to Help</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ background:"#F9F8FF" }}>
      <NavBar title="Help & Support" onBack={onBack} right={tickets.length > 0 ? <Chip label={`${tickets.length} Tickets`} color={C.accent} /> : null} />
      <div style={{ padding:"9px 11px" }}>

        {view === "menu" && (
          <div style={{ animation:"fadeUp 0.3s ease both" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:10 }}>How can we help?</div>
            {/* FAQ quick links */}
            <Card style={{ marginBottom:8 }}>
              <div style={{ fontSize:9, fontWeight:900, color:C.muted, marginBottom:10, letterSpacing:"0.05em", textTransform:"uppercase" }}>Quick Help</div>
              {[
                ["🪙","How to add money?","Payment methods: Credit/Debit/UPI. Min ₹100, max ₹1L per txn."],
                ["🏛️","How to transfer to bank?","Link your bank first, then transfer. Fee: ₹10 per transfer."],
                ["⏱️","How long does transfer take?","IMPS/UPI: Instant. NEFT: 2-4 hours."],
                ["🗃️","KYC not approved?","Submit PAN + Aadhaar + Selfie. Admin reviews within 24h."],
              ].map(([icon,q,a])=>(
                <details key={q} style={{ borderBottom:`1px solid ${C.border}`, paddingBottom:8, marginBottom:8 }}>
                  <summary style={{ fontSize:9, fontWeight:900, color:"#1A1035", cursor:"pointer", listStyle:"none", display:"flex", alignItems:"center", gap:8, padding:"4px 0" }}>
                    <span>{icon}</span>{q}
                  </summary>
                  <div style={{ fontSize:9, color:C.muted, marginTop:6, paddingLeft:22, lineHeight:1.5 }}>{a}</div>
                </details>
              ))}
            </Card>
            {/* Action buttons */}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <button onClick={() => setView("new")} style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", border:"none", borderRadius:12, padding:"13px 16px", display:"flex", alignItems:"center", gap:8, cursor:"pointer", boxShadow:"0 4px 16px rgba(109,40,217,0.30)" }}>
                <span style={{ fontSize:9 }}>🎫</span>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#fff" }}>Raise a Support Ticket</div>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)" }}>Describe your issue, we'll respond in 24h</div>
                </div>
              </button>
              {tickets.length > 0 && (
                <button onClick={() => setView("myTickets")} style={{ background:"#fff", border:"1.5px solid rgba(109,40,217,0.25)", borderRadius:12, padding:"13px 16px", display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                  <span style={{ fontSize:9 }}>📂</span>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>My Tickets ({tickets.length})</div>
                    <div style={{ fontSize:9, color:C.muted }}>View status of raised tickets</div>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}

        {view === "new" && (
          <div style={{ animation:"slideIn 0.3s ease both" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <button onClick={() => setView("menu")} style={{ background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:9, width:32, height:32, cursor:"pointer", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", color:"#1A1035" }}>←</button>
              <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>New Support Ticket</span>
            </div>
            <div style={{ fontSize:9, color:C.muted, marginBottom:6, fontWeight:900, letterSpacing:"0.04em" }}>CATEGORY</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
              {categories.map(c => (
                <button key={c.id} onClick={() => setCategory(c.id)} style={{ padding:"6px 12px", borderRadius:20, background: category===c.id?"rgba(109,40,217,0.12)":"#fff", border:`1.5px solid ${category===c.id?"#6D28D9":"rgba(109,40,217,0.15)"}`, color: category===c.id?"#6D28D9":"#6B7280", fontSize:9, fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ fontSize:9 }}>{c.icon}</span>{c.label}
                </button>
              ))}
            </div>
            <Input label="SUBJECT" placeholder="Brief title of your issue" value={subject} onChange={setSubject} />
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900, letterSpacing:"0.04em" }}>DESCRIPTION</div>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Describe your issue in detail..."
                style={{ width:"100%", background:"#F9F8FF", border:"1.5px solid rgba(109,40,217,0.18)", borderRadius:10, padding:"10px 12px", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit", minHeight:90, resize:"none" }} />
            </div>
            <SwipeBtn disabled={!subject||!desc} onSubmit={submitTicket} label="Swipe to Submit Ticket" successLabel="🎫 Ticket Raised!" color1="#6D28D9" color2="#0891B2" />
          </div>
        )}

        {view === "myTickets" && (
          <div style={{ animation:"slideIn 0.3s ease both" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <button onClick={() => setView("menu")} style={{ background:"rgba(109,40,217,0.08)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:9, width:32, height:32, cursor:"pointer", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", color:"#1A1035" }}>←</button>
              <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>My Tickets</span>
            </div>
            {tickets.map(t => (
              <Card key={t.id} style={{ marginBottom:10, padding:"12px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                  <div style={{ fontWeight:900, fontSize:9, color:"#1A1035", flex:1 }}>{t.subject}</div>
                  <Chip label={t.status} color={t.status==="open"?C.warning:t.status==="resolved"?C.success:C.muted} />
                </div>
                <div style={{ fontSize:9, color:C.muted }}>{categories.find(c=>c.id===t.category)?.icon} {categories.find(c=>c.id===t.category)?.label} · {t.createdAt}</div>
                <div style={{ fontSize:9, color:"#374151", marginTop:6, lineHeight:1.4 }}>{t.desc}</div>
                <div style={{ fontSize:9, color:C.muted, marginTop:4 }}>Ticket ID: {t.id}</div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── SCREEN: TRANSFER MONEY (wrapper with Bank / UPI choice) ─────────────────
const TransferMoneyScreen = ({ onBack, onSuccess, wallet, bank, user, userId }) => {
  const [view, setView] = useState("choice"); // choice | bank | upi
  const [upiInput, setUpiInput] = useState("");
  const [upiVerified, setUpiVerified] = useState(null); // null | { name, vpa } | false
  const [upiVerifying, setUpiVerifying] = useState(false);
  const [upiAmount, setUpiAmount] = useState("");
  const [upiStep, setUpiStep] = useState(0); // 0=enter, 1=processing, 2=done
  const FEE = getFeeConfig().transfer;

  // ── UPI ID verification (mock) ─────────────────────────────────────────────
  const verifyUpi = async () => {
    setUpiVerifying(true); await sleep(1200);
    const MOCK_UPI = {
      "success@upi":   { name:"UPI Test Success",  vpa:"success@upi" },
      "9876543210@ybl": { name:"Rajesh Kumar",       vpa:"9876543210@ybl" },
      "priya@okicici": { name:"Priya Sharma",        vpa:"priya@okicici" },
      "demo@paytm":    { name:"Demo Account",        vpa:"demo@paytm" },
    };
    const result = MOCK_UPI[upiInput.toLowerCase()] ||
      (upiInput.includes("@") ? { name: upiInput.split("@")[0].replace(/[^a-zA-Z ]/g," "), vpa: upiInput } : null);
    setUpiVerified(result || false);
    setUpiVerifying(false);
  };

  const sendUpi = async () => {
    setUpiStep(1); await sleep(2500); setUpiStep(2);
    // Track for admin
    if (!window.__allTransferTxns) window.__allTransferTxns = [];
    window.__allTransferTxns.unshift({
      id:"TXN"+uid(), mode:"upi", amount:Number(upiAmount)-FEE, status:"success", date:new Date(),
      agentId:userId||"USR000", agentName:user?.name||"Agent", agentMobile:user?.mobile||"—",
      upiVpa:upiInput, bankName:"UPI", ifsc:"—", accNo:"—",
      utr:"UTR"+Math.floor(100000000000+Math.random()*900000000000),
    });
  };

  // ── Choice screen ─────────────────────────────────────────────────────────
  if (view === "choice") return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="Transfer Money" onBack={onBack} />
      <div style={{ padding:"10px 12px" }}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:4 }}>How would you like to transfer?</div>
        <div style={{ fontSize:9, color:C.muted, marginBottom:18 }}>Choose your transfer method</div>
        {/* Wallet balance */}
        <div style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", borderRadius:14, padding:"10px 13px", marginBottom:18, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.70)", letterSpacing:"0.08em", textTransform:"uppercase" }}>Available Balance</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#fff", marginTop:2 }}>{fmt(wallet.balance)}</div>
          </div>
          <span style={{ fontSize:9 }}>💳</span>
        </div>
        {/* Options */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <button onClick={() => setView("bank")} style={{ background:"#fff", border:"1.5px solid rgba(109,40,217,0.25)", borderRadius:16, padding:"16px 18px", display:"flex", alignItems:"center", gap:10, cursor:"pointer", textAlign:"left", boxShadow:"0 2px 12px rgba(109,40,217,0.08)" }}>
            <div style={{ width:48, height:48, borderRadius:14, background:"rgba(109,40,217,0.10)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>🏦</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>To Bank Account</div>
              <div style={{ fontSize:9, color:C.muted, marginTop:2 }}>IMPS / NEFT transfer to any bank</div>
              <div style={{ fontSize:9, color:"#6D28D9", marginTop:3 }}>Fee: ₹{FEE} · Instant (IMPS)</div>
            </div>
            <span style={{ color:"#6D28D9", fontSize:9 }}>→</span>
          </button>
          <button onClick={() => setView("upi")} style={{ background:"#fff", border:"1.5px solid rgba(8,145,178,0.25)", borderRadius:16, padding:"16px 18px", display:"flex", alignItems:"center", gap:10, cursor:"pointer", textAlign:"left", boxShadow:"0 2px 12px rgba(8,145,178,0.08)" }}>
            <div style={{ width:48, height:48, borderRadius:14, background:"rgba(8,145,178,0.10)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>📲</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>To UPI ID</div>
              <div style={{ fontSize:9, color:C.muted, marginTop:2 }}>Send to any UPI VPA instantly</div>
              <div style={{ fontSize:9, color:"#0891B2", marginTop:3 }}>Fee: ₹{FEE} · Instant 24/7</div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(8,145,178,0.15)" stroke="#0891B2" strokeWidth="1.5"/><path d="M10 8l4 4-4 4" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );

  // ── Bank Transfer ─────────────────────────────────────────────────────────
  if (view === "bank") return (
    <TransferScreen onBack={() => setView("choice")} onSuccess={onSuccess} wallet={wallet} bank={bank} user={user} userId={userId} />
  );

  // ── UPI Transfer ─────────────────────────────────────────────────────────
  if (view === "upi") {
    if (upiStep === 2) return (
      <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
        <NavBar title="UPI Transfer" onBack={() => { setUpiStep(0); setView("choice"); }} />
        <div style={{ padding:24, textAlign:"center", animation:"scaleIn 0.4s ease both" }}>
          <div style={{ fontSize:9, marginBottom:10 }}>✅</div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:C.success }}>Transfer Successful!</div>
          <div style={{ fontSize:9, color:C.muted, marginTop:6, marginBottom:12 }}>
            {fmt(Number(upiAmount)-FEE)} sent to {upiVerified?.name}
          </div>
          <Card glow style={{ textAlign:"left", marginBottom:12 }}>
            {[
              ["UPI ID",   upiInput],
              ["Recipient",upiVerified?.name||"—"],
              ["Amount",   fmt(Number(upiAmount))],
              ["Fee",      `− ${fmt(FEE)}`],
              ["Received", fmt(Number(upiAmount)-FEE)],
              ["Mode",     "UPI 📲"],
              ["Status",   "Success ✅"],
              ["Time",     new Date().toLocaleString("en-IN")],
            ].map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:9, color:C.muted }}>{k}</span>
                <span style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{v}</span>
              </div>
            ))}
          </Card>
          <SwipeBtn onSubmit={() => { onSuccess(Number(upiAmount), FEE, "upi"); setUpiStep(0); setView("choice"); }} label="Swipe to Go Home" successLabel="🏠 Going Home..." color1="#059669" color2="#0891B2" />
                <button onClick={() => { onSuccess(Number(upiAmount), FEE, "upi"); setUpiStep(0); setView("choice"); }} style={{ width:"100%", marginTop:10, background:"none", border:"1.5px solid rgba(5,150,105,0.30)", borderRadius:12, padding:"11px", fontSize:11, fontWeight:700, color:"#059669", cursor:"pointer" }}>
                  ← Back to Dashboard
                </button>
        </div>
      </div>
    );

    if (upiStep === 1) return (
      <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
        <NavBar title="UPI Transfer" onBack={() => {}} />
        <div style={{ padding:40, textAlign:"center" }}>
          <Loader size={48} />
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, marginTop:24 }}>Sending Money</div>
          <div style={{ color:C.muted, fontSize:9, marginTop:8 }}>Transferring to {upiInput}...</div>
          {["Verifying UPI ID","Deducting wallet balance","Routing via UPI network","Confirming with bank"].map((s,i)=>(
            <div key={s} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", background:"#fff", borderRadius:10, marginTop:10, textAlign:"left", border:`1px solid ${C.border}` }}>
              <Loader size={12} color={C.accent} />
              <span style={{ fontSize:9, color:C.muted }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
        <NavBar title="Transfer via UPI" onBack={() => setView("choice")} />
        <div style={{ padding:"9px 11px" }}>
          {/* Step 1 — Enter & verify UPI */}
          <Card style={{ marginBottom:8 }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:10 }}>📲 UPI ID</div>
            <div style={{ fontSize:9, color:C.muted, marginBottom:8 }}>Enter recipient's UPI Virtual Payment Address</div>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ flex:1, display:"flex", alignItems:"center", background:"#F9F8FF", border:`1.5px solid ${upiVerified===false?"rgba(225,29,72,0.40)":upiVerified?"rgba(5,150,105,0.40)":"rgba(109,40,217,0.20)"}`, borderRadius:10, padding:"0 12px", height:44 }}>
                <input
                  value={upiInput}
                  onChange={e => { setUpiInput(e.target.value); setUpiVerified(null); }}
                  placeholder="name@upi / mobile@ybl"
                  style={{ flex:1, background:"none", border:"none", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit" }}
                />
                {upiVerified && <span style={{ color:C.success, fontSize:9 }}>✓</span>}
                {upiVerified === false && <span style={{ color:C.danger, fontSize:9 }}>✗</span>}
              </div>
              <button onClick={verifyUpi} disabled={!upiInput||upiVerifying||!!upiVerified} style={{ background: !upiInput||upiVerifying||upiVerified?"rgba(109,40,217,0.15)":"linear-gradient(135deg,#6D28D9,#0891B2)", color:!upiInput||upiVerifying||upiVerified?"rgba(109,40,217,0.50)":"#fff", border:"none", borderRadius:10, padding:"0 14px", fontSize:9, fontWeight:900, cursor:!upiInput||upiVerifying||upiVerified?"not-allowed":"pointer", height:44, flexShrink:0, display:"flex", alignItems:"center", gap:5 }}>
                {upiVerifying ? <Loader size={13} color="#6D28D9" /> : "Verify"}
              </button>
            </div>

            {/* Verification result */}
            {upiVerified && (
              <div style={{ marginTop:10, padding:"10px 12px", background:"rgba(5,150,105,0.08)", border:"1px solid rgba(5,150,105,0.30)", borderRadius:9, display:"flex", alignItems:"center", gap:8, animation:"fadeUp 0.3s ease both" }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(5,150,105,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>😊</div>
                <div>
                  <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{upiVerified.name}</div>
                  <div style={{ fontSize:9, color:C.success, fontWeight:900 }}>✅ UPI ID Verified</div>
                  <div style={{ fontSize:9, color:C.muted }}>{upiVerified.vpa}</div>
                </div>
                <button onClick={() => { setUpiVerified(null); setUpiInput(""); }} style={{ marginLeft:"auto", background:"rgba(225,29,72,0.08)", border:"none", color:C.danger, borderRadius:7, padding:"4px 8px", fontSize:9, fontWeight:900, cursor:"pointer" }}>Change</button>
              </div>
            )}
            {upiVerified === false && (
              <div style={{ marginTop:8, fontSize:9, color:C.danger, display:"flex", alignItems:"center", gap:5 }}><span>⚠️</span>UPI ID not found. Please check and try again.</div>
            )}
            <div style={{ marginTop:8, fontSize:9, color:C.muted }}>
              Demo IDs: success@upi · 9876543210@ybl · priya@okicici · demo@paytm
            </div>
          </Card>

          {/* Step 2 — Enter amount (shown only after UPI verified) */}
          {upiVerified && (
            <div style={{ animation:"fadeUp 0.3s ease both" }}>
              <Card style={{ marginBottom:8 }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:10 }}>💰 Enter Amount</div>
                <div style={{ display:"flex", alignItems:"center", background:"#fff", border:`2px solid ${upiAmount?"#6D28D9":"rgba(109,40,217,0.20)"}`, borderRadius:12, padding:"0 12px", height:54 }}>
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, color:upiAmount?C.accent:C.muted, fontWeight:900, marginRight:6 }}>₹</span>
                  <input type="number" value={upiAmount} onChange={e=>setUpiAmount(e.target.value)} placeholder="0"
                    style={{ flex:1, background:"none", border:"none", fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:900, color:"#1A1035", outline:"none" }} />
                </div>
                {/* Fee summary */}
                {upiAmount && Number(upiAmount)>0 && (
                  <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:4, padding:"8px 10px", background:"#F9F8FF", borderRadius:8, animation:"fadeUp 0.2s ease both" }}>
                    {[["Amount",fmt(Number(upiAmount))],["Transfer Fee",`− ${fmt(FEE)}`],["Recipient Gets",fmt(Number(upiAmount)-FEE)]].map(([k,v],i)=>(
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:9 }}>
                        <span style={{ color:C.muted }}>{k}</span>
                        <span style={{ fontWeight:i===2?700:500, color:i===2?C.success:"#1A1035" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
              <SwipeBtn
                disabled={!upiAmount||Number(upiAmount)<10||Number(upiAmount)>wallet.balance}
                onSubmit={sendUpi}
                label={`Swipe to Send ${upiAmount?fmt(Number(upiAmount)):""}`}
                successLabel="📲 Sending..."
                color1="#0891B2" color2="#059669"
              />
              {Number(upiAmount) > wallet.balance && <div style={{ fontSize:9, color:C.danger, textAlign:"center", marginTop:6 }}>⚠️ Insufficient wallet balance</div>}
              <div style={{ fontSize:9, color:C.muted, textAlign:"center", marginTop:6 }}>Min ₹10 · Instant transfer 24/7</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

// ─── AGENT DOORSTEP TAB ──────────────────────────────────────────────────────
// ─── SIGNATURE PAD COMPONENT ─────────────────────────────────────────────────
const SignaturePad = ({ label, onSave, savedSignature }) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [hasStrokes, setHasStrokes] = useState(false);
  const [signed, setSigned] = useState(false);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setDrawing(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1A1035";
    const pos = getPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasStrokes(true);
  };

  const endDraw = (e) => {
    e.preventDefault();
    setDrawing(false);
  };

  const clearSig = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasStrokes(false);
    setSigned(false);
  };

  const saveSig = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
    setSigned(true);
  };

  if (savedSignature || signed) return (
    <div style={{ marginBottom:8, padding:"10px 12px", background:"rgba(5,150,105,0.07)", border:"1.5px solid rgba(5,150,105,0.35)", borderRadius:10 }}>
      <div style={{ fontSize:9, fontWeight:900, color:"#059669", marginBottom:6 }}>✅ Customer Signature Captured</div>
      <img src={savedSignature} alt="signature" style={{ width:"100%", maxHeight:60, objectFit:"contain", background:"#fff", borderRadius:6, border:"1px solid rgba(0,0,0,0.10)" }} />
      <button onClick={() => { clearSig(); onSave(null); }} style={{ marginTop:6, background:"none", border:"none", color:C.danger, fontSize:9, fontWeight:900, cursor:"pointer" }}>✕ Clear & Re-sign</button>
    </div>
  );

  return (
    <div style={{ marginBottom:8 }}>
      <div style={{ fontSize:9, fontWeight:900, color:"#1A1035", marginBottom:4 }}>{label}</div>
      <div style={{ background:"#fff", border:`2px solid ${hasStrokes?"rgba(5,150,105,0.50)":"rgba(109,40,217,0.20)"}`, borderRadius:10, overflow:"hidden", position:"relative" }}>
        <canvas
          ref={canvasRef} width={320} height={90}
          style={{ width:"100%", height:90, display:"block", touchAction:"none", cursor:"crosshair" }}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
        />
        {!hasStrokes && (
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize:9, color:"rgba(0,0,0,0.25)", fontWeight:900, pointerEvents:"none", whiteSpace:"nowrap" }}>✍️ Customer signs here</div>
        )}
      </div>
      <div style={{ display:"flex", gap:8, marginTop:6 }}>
        <button onClick={clearSig} disabled={!hasStrokes} style={{ flex:1, background:"rgba(225,29,72,0.07)", border:"1px solid rgba(225,29,72,0.25)", color:C.danger, borderRadius:8, padding:"7px", fontSize:9, fontWeight:900, cursor:hasStrokes?"pointer":"not-allowed", opacity:hasStrokes?1:0.5 }}>Clear</button>
        <button onClick={saveSig} disabled={!hasStrokes} style={{ flex:2, background:hasStrokes?"linear-gradient(135deg,#059669,#10B981)":"rgba(5,150,105,0.20)", color:hasStrokes?"#fff":"rgba(5,150,105,0.50)", border:"none", borderRadius:8, padding:"7px", fontSize:9, fontWeight:900, cursor:hasStrokes?"pointer":"not-allowed" }}>✅ Save Signature</button>
      </div>
    </div>
  );
};

const AgentDoorstepTab = ({ user, userId, onBack, onGoToAddMoney }) => {
  const [requests, setRequests] = useState([]);
  const [selReq, setSelReq] = useState(null);
  // dsView: "detail" | "addmoney" | "awaitConfirm"
  const [dsView, setDsView] = useState("detail");
  const [txnDone, setTxnDone] = useState(false);
  const [customerConfirm, setCustomerConfirm] = useState(null); // null | "received" | "not_received"

  useEffect(() => {
    const refresh = () => {
      const all = window.__doorstepBookings || [];
      const mine = all.filter(b =>
        b.status === "agent_assigned" || b.status === "agent_approved" ||
        b.status === "cash_transfer_done" || b.status === "completed" ||
        b.status === "pending_customer_confirm"
      );
      setRequests([...mine]);
    };
    refresh();
    const iv = setInterval(refresh, 1500);
    return () => clearInterval(iv);
  }, [userId]);

  const updateBooking = (id, patch) => {
    const idx = (window.__doorstepBookings||[]).findIndex(b=>b.id===id);
    if(idx>=0) window.__doorstepBookings[idx] = { ...window.__doorstepBookings[idx], ...patch };
  };

  const handleApprove = (req) => {
    const patch = { status:"agent_approved", agentApprovedAt:new Date().toLocaleString("en-IN"), agentId:userId, agentName:user?.name||"Agent" };
    updateBooking(req.id, patch);
    const updated = {...req, ...patch};
    setSelReq(updated);
    setRequests(r => r.map(b => b.id===req.id ? updated : b));
  };

  const handleCallDone = (req) => {
    updateBooking(req.id, { agentCalled:true });
    setSelReq(prev => ({...prev, agentCalled:true}));
  };

  const handleTransferDone = (req) => {
    const patch = { status:"pending_customer_confirm", transferDoneAt:new Date().toLocaleString("en-IN") };
    updateBooking(req.id, patch);
    const updated = {...req, ...patch};
    setSelReq(updated);
    setDsView("awaitConfirm");
    setRequests(r => r.map(b => b.id===req.id ? updated : b));
  };

  const handleCustomerConfirm = (req, received) => {
    const patch = received
      ? { status:"completed", completedAt:new Date().toLocaleString("en-IN"), customerConfirmed:true, ticketClosed:true }
      : { status:"pending_customer_confirm", customerConfirmed:false, ticketClosed:false, customerDeclinedAt:new Date().toLocaleString("en-IN") };
    updateBooking(req.id, patch);
    const updated = {...req, ...patch};
    setSelReq(updated);
    setCustomerConfirm(received ? "received" : "not_received");
    setRequests(r => r.map(b => b.id===req.id ? updated : b));
  };

  // ── Detail view ──────────────────────────────────────────────────────────
  if (selReq) {
    // Inline Add Money flow for doorstep
    if (dsView === "addmoney") return (
      <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
        <NavBar title="Process Withdrawal" onBack={() => setDsView("detail")} />
        <div style={{ padding:"9px 11px" }}>
          <div style={{ background:"linear-gradient(135deg,#059669,#10B981)", borderRadius:14, padding:"8px 12px", marginBottom:8, color:"#fff" }}>
            <div style={{ fontSize:9, opacity:0.80, marginBottom:2 }}>DOORSTEP REQUEST — {selReq.id}</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9 }}>₹{Number(selReq.amount).toLocaleString("en-IN")}</div>
            <div style={{ fontSize:9, opacity:0.80, marginTop:2 }}>Customer: {selReq.name} · {selReq.phone}</div>
          </div>
          <Card style={{ marginBottom:10 }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:8 }}>Transfer Method</div>
            <div style={{ padding:"10px 12px", background:"rgba(5,150,105,0.08)", borderRadius:9, border:"1px solid rgba(5,150,105,0.25)", marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:900, color:"#059669" }}>
                {selReq.cashMode==="hand"?"🤝 By Hand — deliver cash in person":selReq.cashMode==="neft"?"🏛️ NEFT — bank transfer to customer account":"📲 UPI — transfer to "+selReq.upiId}
              </div>
            </div>
            {[
              ["Customer Name",selReq.name],
              ["Phone",selReq.phone],
              ["Amount","₹"+Number(selReq.amount).toLocaleString("en-IN")],
              ...(selReq.cashMode==="upi"&&selReq.upiId?[["UPI ID",selReq.upiId]]:[]),
              ["Address",selReq.address],
            ].map(([k,v])=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${C.border}`, fontSize:9 }}>
                <span style={{ color:C.muted }}>{k}</span>
                <span style={{ fontWeight:900, color:"#1A1035", textAlign:"right", maxWidth:"60%" }}>{v}</span>
              </div>
            ))}
          </Card>
          {/* Customer Signature Pad */}
          <SignaturePad
            label="Customer Signature (Required)"
            onSave={(dataUrl) => {
              const idx = (window.__doorstepBookings||[]).findIndex(b=>b.id===selReq.id);
              if(idx>=0) window.__doorstepBookings[idx] = { ...window.__doorstepBookings[idx], customerSignature:dataUrl };
              setSelReq(prev => ({...prev, customerSignature:dataUrl}));
            }}
            savedSignature={selReq.customerSignature}
          />
          <SwipeBtn
            disabled={!selReq.customerSignature}
            onSubmit={() => handleTransferDone(selReq)}
            label={`Swipe to Confirm Cash Transfer — ₹${Number(selReq.amount).toLocaleString("en-IN")}`}
            successLabel="✅ Transfer Marked Done!"
            color1="#059669" color2="#0891B2"
          />
          {!selReq.customerSignature && <div style={{ fontSize:9, color:C.danger, textAlign:"center", marginTop:6 }}>⚠️ Customer signature required to proceed</div>}
          <div style={{ fontSize:9, color:C.muted, textAlign:"center", marginTop:6 }}>By swiping you confirm you have handed over / transferred the cash to the customer</div>
        </div>
      </div>
    );

    // Await customer confirmation view
    if (dsView === "awaitConfirm" || selReq.status === "pending_customer_confirm") {
      if (customerConfirm === "received" || selReq.ticketClosed) return (
        <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
          <NavBar title="Doorstep Request" onBack={() => { setSelReq(null); setDsView("detail"); setCustomerConfirm(null); }} />
          <div style={{ padding:"24px 16px", textAlign:"center" }}>
            <div style={{ fontSize:9, marginBottom:10 }}>🎉</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:C.success, marginBottom:6 }}>Ticket Closed!</div>
            <div style={{ fontSize:9, color:C.muted, marginBottom:10 }}>Customer confirmed receipt. Doorstep request is complete.</div>
            <Card style={{ textAlign:"left", marginBottom:8 }}>
              {[["Booking ID",selReq.id],["Customer",selReq.name],["Amount","₹"+Number(selReq.amount).toLocaleString("en-IN")],["Completed",selReq.completedAt||"—"],["Status","✅ Closed"]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${C.border}`, fontSize:9 }}>
                  <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:900, color:C.success }}>{v}</span>
                </div>
              ))}
            </Card>
            <button onClick={() => { setSelReq(null); setDsView("detail"); setCustomerConfirm(null); }} style={{ width:"100%", background:"linear-gradient(135deg,#059669,#0891B2)", color:"#fff", border:"none", borderRadius:12, padding:"12px", fontSize:9, fontWeight:900, cursor:"pointer" }}>← Back to Requests</button>
          </div>
        </div>
      );

      if (customerConfirm === "not_received") return (
        <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
          <NavBar title="Doorstep Request" onBack={() => { setDsView("detail"); setCustomerConfirm(null); }} />
          <div style={{ padding:"16px 16px", textAlign:"center" }}>
            <div style={{ fontSize:9, marginBottom:8 }}>⚠️</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:C.danger, marginBottom:6 }}>Customer Not Confirmed</div>
            <div style={{ fontSize:9, color:C.muted, marginBottom:10 }}>This ticket remains pending until customer confirms receipt.</div>
            <Card style={{ textAlign:"left", marginBottom:10 }}>
              {[["Booking ID",selReq.id],["Customer",selReq.name],["Amount","₹"+Number(selReq.amount).toLocaleString("en-IN")],["Status","⏳ Pending Confirmation"]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${C.border}`, fontSize:9 }}>
                  <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:900, color:C.danger }}>{v}</span>
                </div>
              ))}
            </Card>
            <button onClick={() => setCustomerConfirm(null)} style={{ width:"100%", background:"rgba(225,29,72,0.08)", border:"1.5px solid rgba(225,29,72,0.28)", color:C.danger, borderRadius:12, padding:"11px", fontSize:9, fontWeight:900, cursor:"pointer", marginBottom:8 }}>← Try Customer Confirmation Again</button>
            <button onClick={() => { setSelReq(null); setDsView("detail"); setCustomerConfirm(null); }} style={{ width:"100%", background:"rgba(109,40,217,0.07)", border:"1.5px solid rgba(109,40,217,0.20)", color:C.accent, borderRadius:12, padding:"11px", fontSize:9, fontWeight:900, cursor:"pointer" }}>← Back to Requests</button>
          </div>
        </div>
      );

      // Show customer confirmation buttons
      return (
        <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
          <NavBar title="Customer Confirmation" onBack={() => setDsView("detail")} />
          <div style={{ padding:"9px 11px" }}>
            <div style={{ background:"rgba(8,145,178,0.08)", border:"1.5px solid rgba(8,145,178,0.25)", borderRadius:12, padding:"9px 11px", marginBottom:8, textAlign:"center" }}>
              <div style={{ fontSize:9, marginBottom:6 }}>📲</div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#0891B2", marginBottom:4 }}>Awaiting Customer Confirmation</div>
              <div style={{ fontSize:9, color:C.muted }}>Ask the customer if they have received the cash and tap the appropriate button below.</div>
            </div>
            <Card style={{ marginBottom:8 }}>
              {[["Customer",selReq.name],["Phone",selReq.phone],["Amount","₹"+Number(selReq.amount).toLocaleString("en-IN")],["Mode",selReq.cashMode==="hand"?"🤝 By Hand":selReq.cashMode==="neft"?"🏛️ NEFT":"📲 UPI"],["Transfer Done",selReq.transferDoneAt||"—"]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${C.border}`, fontSize:9 }}>
                  <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:900, color:"#1A1035" }}>{v}</span>
                </div>
              ))}
            </Card>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:10, textAlign:"center" }}>Did the customer receive the cash?</div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => handleCustomerConfirm(selReq, true)} style={{ flex:1, background:"linear-gradient(135deg,#059669,#10B981)", color:"#fff", border:"none", borderRadius:12, padding:"13px", fontSize:9, fontWeight:900, cursor:"pointer", boxShadow:"0 4px 14px rgba(5,150,105,0.35)" }}>
                ✅ Yes, Received
              </button>
              <button onClick={() => handleCustomerConfirm(selReq, false)} style={{ flex:1, background:"rgba(225,29,72,0.08)", border:"1.5px solid rgba(225,29,72,0.30)", color:C.danger, borderRadius:12, padding:"13px", fontSize:9, fontWeight:900, cursor:"pointer" }}>
                ❌ Not Received
              </button>
            </div>
          </div>
        </div>
      );
    }

    const statusColor = selReq.status==="completed" ? C.success : selReq.status==="agent_approved" ? "#0891B2" : C.warning;
    const statusLabel = selReq.status==="completed" ? "✅ Completed" : selReq.status==="pending_customer_confirm" ? "⏳ Awaiting Confirm" : selReq.status==="agent_approved" ? "🚀 Approved" : "📋 Assigned";
    return (
      <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
        <NavBar title="Doorstep Request" onBack={() => { setSelReq(null); setDsView("detail"); setCustomerConfirm(null); }} />
        <div style={{ padding:"9px 11px" }}>
          {/* Status banner */}
          <div style={{ background:`${statusColor}12`, border:`1.5px solid ${statusColor}40`, borderRadius:12, padding:"10px 14px", marginBottom:8, display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:9 }}>{selReq.status==="completed"?"☑️":selReq.status==="pending_customer_confirm"?"⌛":selReq.status==="agent_approved"?"🚀":"🗃️"}</span>
            <div>
              <div style={{ fontSize:9, fontWeight:900, color:statusColor }}>{statusLabel}</div>
              <div style={{ fontSize:9, color:C.muted }}>ID: {selReq.id}</div>
            </div>
          </div>

          {/* Customer details */}
          <Card style={{ marginBottom:10 }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:8 }}>👤 Customer Details</div>
            {[
              ["Name",    selReq.name],
              ["Phone",   selReq.phone],
              ["Address", selReq.address],
              ["Amount",  "₹"+Number(selReq.amount).toLocaleString("en-IN")],
              ["Cash Mode", selReq.cashMode==="hand"?"🤝 By Hand":selReq.cashMode==="neft"?"🏛️ NEFT":selReq.cashMode==="upi"?"📲 UPI":"-"],
              ...(selReq.cashMode==="upi"&&selReq.upiId ? [["UPI ID", selReq.upiId]] : []),
              ["Booked",  selReq.bookedAt],
            ].map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${C.border}`, fontSize:9 }}>
                <span style={{ color:C.muted, flexShrink:0 }}>{k}</span>
                <span style={{ fontWeight:900, color:"#1A1035", textAlign:"right", maxWidth:"60%", wordBreak:"break-all" }}>{v}</span>
              </div>
            ))}
          </Card>

          {/* Actions */}
          {selReq.status === "agent_assigned" && (
            <Card style={{ marginBottom:10 }}>
              <div style={{ fontSize:9, color:C.muted, marginBottom:10, lineHeight:1.5 }}>Review the request and approve to visit the customer.</div>
              <button onClick={() => handleApprove(selReq)} style={{ width:"100%", background:"linear-gradient(135deg,#059669,#10B981)", color:"#fff", border:"none", borderRadius:12, padding:"12px", fontSize:9, fontWeight:900, cursor:"pointer", boxShadow:"0 4px 14px rgba(5,150,105,0.35)" }}>
                ✅ Approve & Accept Request
              </button>
            </Card>
          )}

          {selReq.status === "agent_approved" && (
            <Card style={{ marginBottom:10 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035", marginBottom:10 }}>Next Steps</div>
              {!selReq.agentCalled && (
                <button onClick={() => handleCallDone(selReq)} style={{ width:"100%", background:"linear-gradient(135deg,#0891B2,#6D28D9)", color:"#fff", border:"none", borderRadius:12, padding:"12px", fontSize:9, fontWeight:900, cursor:"pointer", marginBottom:8 }}>
                  📞 Mark: Customer Called
                </button>
              )}
              {selReq.agentCalled && (
                <div style={{ padding:"7px 10px", background:"rgba(5,150,105,0.08)", borderRadius:8, marginBottom:8, fontSize:9, color:C.success, fontWeight:900 }}>✅ Customer called</div>
              )}
              {/* KEY ACTION: Go to Add Money / Transfer with pre-filled amount */}
              <button onClick={() => setDsView("addmoney")} style={{ width:"100%", background:"linear-gradient(135deg,#6D28D9,#0891B2)", color:"#fff", border:"none", borderRadius:12, padding:"12px", fontSize:9, fontWeight:900, cursor:"pointer", boxShadow:"0 4px 14px rgba(109,40,217,0.30)" }}>
                💸 Process Cash Transfer — ₹{Number(selReq.amount).toLocaleString("en-IN")}
              </button>
            </Card>
          )}

          {selReq.status === "pending_customer_confirm" && (
            <Card style={{ marginBottom:10 }}>
              <div style={{ fontSize:9, color:C.muted, marginBottom:10 }}>Transfer marked done. Waiting for customer confirmation.</div>
              <button onClick={() => setDsView("awaitConfirm")} style={{ width:"100%", background:"linear-gradient(135deg,#0891B2,#059669)", color:"#fff", border:"none", borderRadius:12, padding:"12px", fontSize:9, fontWeight:900, cursor:"pointer" }}>
                📲 Get Customer Confirmation
              </button>
            </Card>
          )}

          {selReq.status === "completed" && (
            <Card>
              <div style={{ textAlign:"center", padding:"10px 0" }}>
                <div style={{ fontSize:9, marginBottom:6 }}>🎉</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:C.success }}>Ticket Closed!</div>
                <div style={{ fontSize:9, color:C.muted, marginTop:3 }}>Customer confirmed · Completed at: {selReq.completedAt||"—"}</div>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // ── List view ─────────────────────────────────────────────────────────────
  return (
    <div style={{ background:"#F9F8FF", minHeight:"100%" }}>
      <NavBar title="Doorstep Requests" onBack={onBack} />
      <div style={{ padding:"9px 11px" }}>
        {requests.length === 0 ? (
          <div style={{ textAlign:"center", padding:"40px 20px" }}>
            <div style={{ fontSize:9, marginBottom:10 }}>📭</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#1A1035" }}>No requests assigned yet</div>
            <div style={{ fontSize:9, color:C.muted, marginTop:4 }}>Admin will assign doorstep requests to you</div>
          </div>
        ) : (
          <>
            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              <Chip label={`📋 ${requests.filter(r=>r.status==="agent_assigned").length} New`} color={C.warning} />
              <Chip label={`🚀 ${requests.filter(r=>r.status==="agent_approved").length} Active`} color="#0891B2" />
              <Chip label={`✅ ${requests.filter(r=>r.status==="completed").length} Done`} color={C.success} />
            </div>
            {requests.map(r => {
              const sc = r.status==="completed"?C.success:r.status==="agent_approved"?"#0891B2":C.warning;
              const sl = r.status==="completed"?"✅ Completed":r.status==="agent_approved"?"🚀 Active":"📋 New";
              return (
                <button key={r.id} onClick={()=>setSelReq({...r})} style={{ width:"100%", background:"none", border:"none", padding:"0 0 8px", cursor:"pointer", textAlign:"left" }}>
                  <Card style={{ padding:"11px 13px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${sc},${sc}99)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:9, flexShrink:0 }}>
                        {(r.name||"?")[0].toUpperCase()}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:900, fontSize:9, color:"#1A1035" }}>{r.name}</div>
                        <div style={{ fontSize:9, color:C.muted }}>{r.phone} · ₹{Number(r.amount).toLocaleString("en-IN")}</div>
                        <div style={{ fontSize:9, color:C.muted }}>{r.bookedAt}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <Chip label={sl} color={sc} />
                        <div style={{ fontSize:9, color:sc, marginTop:4, fontWeight:900 }}>Tap →</div>
                      </div>
                    </div>
                  </Card>
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

// BottomNav removed — all navigation via Home page grid

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
// ─── DB STATUS BANNER ────────────────────────────────────────────────────────
const DbBanner = ({ status }) => {
  if (status === "ready") return null;
  const cfg = {
    loading: { icon: "⌛", msg: "Connecting to Firebase...", color: C.gold },
    demo:    { icon: "🔧", msg: "Demo mode — add your Firebase config to enable cloud sync", color: C.gold },
    error:   { icon: "🚨", msg: "Firebase unavailable — running in demo mode", color: C.danger },
  }[status] || {};
  return (
    <div style={{
      padding: "8px 16px", display: "flex", alignItems: "center", gap: 8,
      background: "rgba(109,40,217,0.06)", borderBottom: "1px solid rgba(109,40,217,0.25)",
      fontSize: 10, color: cfg.color, fontWeight: 500,
    }}>
      <span>{cfg.icon}</span><span style={{ flex: 1 }}>{cfg.msg}</span>
    </div>
  );
};

function App() {
  const dbStatus  = useFirebase();
  const isLive    = dbStatus === "ready";

  const [screen, setScreen]           = useState("splash");
  const [tab, setTab]                 = useState("home");
  const [userId, setUserId]           = useState(null);
  const [user, setUser]               = useState(null);
  const [role, setRole]               = useState(null); // null | "admin" | "agent"
  const [prefillMobile, setPrefillMobile] = useState("");
  const [wallet, setWallet]           = useState({ id: "WLT" + uid(), balance: 0, dailyUsed: 0 });
  const [transactions, setTransactions] = useState([]);
  const [bank, setBank]               = useState(null);
  const [showAgentProfile, setShowAgentProfile] = useState(false);
  const [agentSecurity, setAgentSecurity] = useState({ twoFa:false, biometric:false, txnPin:false, loginNotif:true, txnNotif:true });
  const [agentPin, setAgentPin] = useState(null);
  const [agentBiometricVerified, setAgentBiometricVerified] = useState(false);
  const [showAgentPinSetup, setShowAgentPinSetup] = useState(false);
  const [showAgentBiometric, setShowAgentBiometric] = useState(false);
  const [agentNewPin, setAgentNewPin] = useState("");
  const [agentConfirmPin, setAgentConfirmPin] = useState("");
  const [agentPinError, setAgentPinError] = useState("");
  useEffect(() => { window.__agentSecurity = agentSecurity; window.__agentPin = agentPin; }, [agentSecurity, agentPin]);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [pwdOld, setPwdOld] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [showPwdOld, setShowPwdOld] = useState(false);
  const [showPwdNew, setShowPwdNew] = useState(false);
  const [agentDocs, setAgentDocs]     = useState(null);
  const unsubRef                      = useRef([]);

  const handleRoleLogin = useCallback((loginData) => {
    setRole(loginData.role);
    setUser({ name: loginData.name, mobile: loginData.mobile, bookings: loginData.bookings || null });
    setUserId("USR" + uid());
    if (loginData.role === "admin") {
      setScreen("admin");
    } else if (loginData.role === "register") {
      // Direct submission - skip old OnboardingScreen, process immediately
      const wid = "WLT" + uid();
      const newUid = "USR" + uid();
      setUserId(newUid);
      setUser({ name: loginData.name, mobile: loginData.mobile });
      setWallet({ id: wid, balance: 0, dailyUsed: 0 });
      setAgentDocs({
        name: loginData.name, mobile: loginData.mobile,
        pan: loginData.pan, aadhaar: loginData.aadhaar,
        email: loginData.email, address: loginData.address,
        lat: loginData.lat, lng: loginData.lng,
        panFileName: loginData.panFile?.name,
        aadhaarFileName: loginData.aadhaarFile?.name,
        selfieFileName: loginData.selfieFile?.name,
        panData: loginData.panFile?.dataUrl || null,
        aadhaarData: loginData.aadhaarFile?.dataUrl || null,
        selfieData: loginData.selfieFile?.dataUrl || null,
        submittedAt: new Date().toLocaleString("en-IN"),
        status: "pending",
      });
      setScreen("main");
    } else if (loginData.role === "customerTrack") {
      // Customer tracking their doorstep request
      setScreen("customerTrack");
    } else {
      // Agent login
      setWallet({ id: "WLT" + uid(), balance: 0, dailyUsed: 0 });
      setScreen("main");
    }
  }, []);

  const handleLogout = useCallback(() => {
    setRole(null); setUser(null); setUserId(null);
    setScreen("rolelogin");
    setTab("home");
    setWallet({ id: "WLT" + uid(), balance: 0, dailyUsed: 0 });
    setTransactions([]); setBank(null);
  }, []);

  // ── Subscribe to live wallet + transactions once user logs in ──────────────
  useEffect(() => {
    if (!isLive || !userId) return;
    unsubRef.current.forEach(u => u());
    unsubRef.current = [
      DB.subscribeWallet(userId, w => setWallet({ id: w.walletId, balance: w.balance || 0, dailyUsed: w.dailyUsed || 0 })),
      DB.subscribeTransactions(userId, txns => setTransactions(txns)),
    ];
    return () => unsubRef.current.forEach(u => u());
  }, [isLive, userId]);

  // ── Onboarding complete: create user + wallet in Firestore ─────────────────
  const handleOnboardingComplete = useCallback(async (userData) => {
    const newUid = "USR" + uid();
    const wid    = "WLT" + uid();
    setUserId(newUid);
    setUser(userData);
    if (isLive) {
      try {
        await DB.createUser(newUid, { mobile: userData.mobile, name: userData.name });
        await DB.createWallet(newUid, wid);
      } catch(e) { console.warn("Firestore write failed:", e); }
    }
    setWallet({ id: wid, balance: 0, dailyUsed: 0 });
    // Store uploaded docs for admin preview (mock files have .dataUrl directly)
    setAgentDocs({
      name: userData.name, mobile: userData.mobile,
      pan: userData.pan, aadhaar: userData.aadhaar,
      panFileName:    userData.panFile?.name,
      aadhaarFileName:userData.aadhaarFile?.name,
      selfieFileName: userData.selfieFile?.name,
      panData:    userData.panFile?.dataUrl    || null,
      aadhaarData:userData.aadhaarFile?.dataUrl|| null,
      selfieData: userData.selfieFile?.dataUrl || null,
      submittedAt: new Date().toLocaleString("en-IN"),
      status: "pending",
    });
    setScreen("main");
  }, [isLive]);

  // ── Add money: update wallet balance + write transactions ──────────────────
  const handleAddSuccess = useCallback(async (credited, fee, method) => {
    const newBalance  = wallet.balance + credited;
    const newDailyUsed = wallet.dailyUsed + credited + fee;
    setWallet(w => ({ ...w, balance: newBalance, dailyUsed: newDailyUsed }));
    const baseTxn = {
      type: "credit", amount: credited, date: new Date(), status: "success",
      description: `Wallet Load via ${method.toUpperCase()}`,
      method,
      card: method === "credit" || method === "debit" ? {
        number: "XXXX XXXX XXXX " + Math.floor(1000+Math.random()*9000),
        holder: "Account Holder",
        network: method === "credit" ? "Visa" : "Mastercard",
        bank: method === "credit" ? "HDFC Bank" : "Axis Bank",
        type: method === "credit" ? "Credit" : "Debit",
      } : null,
      upi: method === "upi" ? { vpa: "cardflow@upi", app: "S3Pay", ref: "UPI" + uid() } : null,
      fee: fee, walletAfter: wallet.balance + credited,
    };
    const feeTxn  = { type: "fee",    amount: fee,      description: "Platform Processing Fee",                date: new Date(), status: "success" };
    if (isLive && userId) {
      try {
        await DB.updateWallet(userId, { balance: newBalance, dailyUsed: newDailyUsed });
        await DB.addTransaction(userId, baseTxn);
        if (fee > 0) await DB.addTransaction(userId, feeTxn);
      } catch(e) { console.warn("Firestore write failed:", e); }
    } else {
      setTransactions(prev => [{ ...baseTxn, id: "TXN"+uid() }, ...(fee > 0 ? [{ ...feeTxn, id: "TXN"+uid() }] : []), ...prev]);
    }
    setTab("home"); setScreen("main");
  }, [isLive, userId, wallet]);

  // ── Transfer: deduct wallet + write transactions ───────────────────────────
  const handleTransferSuccess = useCallback(async (amount, fee, mode) => {
    const newBalance   = wallet.balance - amount;
    const newDailyUsed = wallet.dailyUsed + amount;
    setWallet(w => ({ ...w, balance: newBalance, dailyUsed: newDailyUsed }));
    const txn    = {
      type: "transfer", amount: amount - fee, date: new Date(), status: "success",
      description: `Bank Transfer via ${mode.toUpperCase()}`,
      method: mode,
      bank: {
        accNo: bank?.accNo || "••••5678",
        holder: bank?.name || "Account Holder",
        bankName: bank?.bankName || "State Bank of India",
        ifsc: bank?.ifsc || "SBIN0001234",
        mode: mode.toUpperCase(),
        utr: "UTR" + Math.floor(100000000000 + Math.random()*900000000000),
      },
      fee: fee, walletAfter: wallet.balance - amount,
    };
    const feeTxn = { type: "fee",      amount: fee,          description: "Transfer Fee",                             date: new Date(), status: "success" };
    if (isLive && userId) {
      try {
        await DB.updateWallet(userId, { balance: newBalance, dailyUsed: newDailyUsed });
        await DB.addTransaction(userId, txn);
        await DB.addTransaction(userId, feeTxn);
      } catch(e) { console.warn("Firestore write failed:", e); }
    } else {
      setTransactions(prev => [{ ...txn, id: "TXN"+uid() }, { ...feeTxn, id: "TXN"+uid() }, ...prev]);
    // Track full transfer details for admin drill-down
    if (!window.__allTransferTxns) window.__allTransferTxns = [];
    window.__allTransferTxns.unshift({
      id: "TXN" + uid(),
      mode: mode,
      amount: amount - fee,
      status: "success",
      date: new Date(),
      agentId: userId || "USR000",
      agentName: user?.name || "Agent",
      agentMobile: user?.mobile || "—",
      upiVpa: mode === "upi" ? (bank?.upiVpa||"—") : null,
      accNo: bank?.accNo || "—",
      bankName: bank?.bankName || "—",
      ifsc: bank?.ifsc || "—",
      utr: "UTR" + Math.floor(100000000000 + Math.random()*900000000000),
    });
    }
    setTab("home"); setScreen("main");
  }, [isLive, userId, wallet]);

  // ── Bank link: persist to Firestore ───────────────────────────────────────
  const handleBankLinked = useCallback(async (bankData) => {
    const b = bankData || { accNo: "••••5678", ifsc: "SBIN0001234", name: "Rajesh Kumar" };
    setBank(b);
    if (isLive && userId) {
      try { await DB.linkBank(userId, b); } catch(e) { console.warn("Firestore bank link failed:", e); }
    }
    setTab("home"); setScreen("main");
  }, [isLive, userId]);

  const renderTab = () => {
    switch (tab) {
      case "add":      return <AddMoneyScreen onBack={() => setTab("home")} onSuccess={handleAddSuccess} wallet={wallet} />;
      case "transfer": return <TransferMoneyScreen onBack={() => setTab("home")} onSuccess={handleTransferSuccess} wallet={wallet} bank={bank} user={user} userId={userId} />;
      case "history":  return <TransactionsScreen onBack={() => setTab("home")} transactions={transactions} />;
      case "risk":     return <RiskPanel wallet={wallet} onBack={() => setTab("home")} />;
      case "offers":   return <OffersScreen onBack={() => setTab("home")} />;
      case "bills":    return <BillsScreen onBack={() => setTab("home")} wallet={wallet} />;
      case "aeps":     return <AepsScreen onBack={() => setTab("home")} user={user} userId={userId} wallet={wallet} />;
      case "help":     return <HelpScreen onBack={() => setTab("home")} user={user} />;
      case "doorstep": return <AgentDoorstepTab user={user} userId={userId} onBack={() => setTab("home")} />;
      default: return (
        <DashboardScreen
          wallet={wallet} transactions={transactions} bankLinked={!!bank}
          onAddMoney={() => setTab("add")}
          onTransfer={() => setTab("transfer")}
          onTransactions={() => setTab("history")}
          onLinkBank={() => setScreen("linkbank")}
          onBills={() => setTab("bills")}
          onAeps={() => setTab("aeps")}
          onOffers={() => setTab("offers")}
          onDoorstep={() => setTab("doorstep")}
          onHelp={() => setTab("help")}
          onBack={() => setShowLogoutPopup(true)}
          user={user}
          userId={userId}
        />
      );
    }
  };

  return (
    <>
      <GlobalStyle />
      <div style={{
        width: "100vw", height: "100vh",
        display: "flex", flexDirection: "column",
        background: "#F9F8FF",
        position: "relative", overflow: "hidden",
      }}>
        {/* Full-screen app shell */}
        <div style={{
          width: "100%", height: "100%",
          background: "#F9F8FF",
          overflow: "hidden", position: "relative", display: "flex", flexDirection: "column",
        }}>
          {/* Firebase status banner */}
          <DbBanner status={dbStatus} />

          {/* ── LOGOUT CONFIRMATION POPUP ── */}
          {showLogoutPopup && (
            <div onClick={() => setShowLogoutPopup(false)} style={{ position:"fixed", inset:0, zIndex:9999, background:"rgba(10,8,30,0.65)", display:"flex", alignItems:"flex-end", justifyContent:"center", backdropFilter:"blur(4px)" }}>
              <div onClick={e=>e.stopPropagation()} style={{
                background:"#fff", borderRadius:"24px 24px 0 0",
                width:"100%", textAlign:"center",
                animation:"fadeUp 0.32s cubic-bezier(.22,.68,0,1.2) both",
                boxShadow:"0 -8px 40px rgba(0,0,0,0.18)",
                paddingBottom:"env(safe-area-inset-bottom,16px)",
              }}>
                {/* Drag handle */}
                <div style={{ display:"flex", justifyContent:"center", paddingTop:10, paddingBottom:4 }}>
                  <div style={{ width:36, height:4, borderRadius:2, background:"rgba(0,0,0,0.12)" }} />
                </div>
                {/* Icon */}
                <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#FFE4E6,#FECDD3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"6px auto 8px" }}>
                  <Icon name="logout" size={18} color="#E11D48" />
                </div>
                {/* Title */}
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#1A1035", marginBottom:4 }}>Log Out?</div>
                {/* Subtitle */}
                <div style={{ fontSize:9, color:"#6B7280", marginBottom:14, lineHeight:1.5, padding:"0 20px" }}>
                  Are you sure you want to log out?<br/>You'll need to sign in again.
                </div>
                {/* Buttons */}
                <div style={{ display:"flex", gap:8, padding:"0 16px 16px" }}>
                  <button onClick={() => setShowLogoutPopup(false)} style={{
                    flex:1, background:"#F3F4F6", border:"none", borderRadius:11,
                    padding:"10px", fontSize:9, fontWeight:900, color:"#374151",
                    cursor:"pointer", transition:"background 0.15s",
                  }}
                    onMouseEnter={e=>e.currentTarget.style.background="#E5E7EB"}
                    onMouseLeave={e=>e.currentTarget.style.background="#F3F4F6"}
                  >
                    Cancel
                  </button>
                  <button onClick={() => { setShowLogoutPopup(false); handleLogout(); }} style={{
                    flex:1.4, background:"linear-gradient(135deg,#E11D48,#F43F5E)",
                    border:"none", borderRadius:11, padding:"10px",
                    fontSize:9, fontWeight:900, color:"#fff",
                    cursor:"pointer", boxShadow:"0 3px 12px rgba(225,29,72,0.35)",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:5,
                    transition:"opacity 0.15s",
                  }}
                    onMouseEnter={e=>e.currentTarget.style.opacity="0.92"}
                    onMouseLeave={e=>e.currentTarget.style.opacity="1"}
                  >
                    <Icon name="logout" size={12} color="#fff" />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Content area — flex column so BottomNav always pins to bottom */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

            {/* Non-agent screens fill the whole area */}
            {screen === "splash"     && <div style={{ flex:1, overflowY:"auto" }}><SplashScreen onNext={() => setScreen("rolelogin")} /></div>}
            {screen === "rolelogin"  && <div style={{ flex:1, overflowY:"auto" }}><RoleLoginScreen onLogin={handleRoleLogin} agentDocs={agentDocs} /></div>}
            {screen === "admin"      && <div style={{ flex:1, overflowY:"auto" }}><AdminDashboard onLogout={() => setShowLogoutPopup(true)} onRequestLogout={() => setShowLogoutPopup(true)} transactions={transactions} allUsers={[]} agentDocs={agentDocs} setAgentDocs={setAgentDocs} /></div>}
            {screen === "customerTrack" && <div style={{ flex:1, overflowY:"auto" }}><CustomerTrackScreen user={user} onBack={() => setScreen("rolelogin")} /></div>}
            {screen === "onboarding" && <div style={{ flex:1, overflowY:"auto" }}><OnboardingScreen onComplete={handleOnboardingComplete} onBack={() => setScreen("rolelogin")} prefillMobile={prefillMobile} /></div>}
            {screen === "linkbank"   && <div style={{ flex:1, overflowY:"auto" }}><LinkBankScreen onBack={() => setScreen("main")} onSuccess={handleBankLinked} linked={bank} /></div>}

            {/* Agent main screen — scrollable content + fixed bottom nav */}
            {screen === "main" && (
              <>
                {/* Agent header */}
                <div style={{ flexShrink:0, background:"#fff", borderBottom:"1px solid rgba(0,210,180,0.15)", padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 1px 8px rgba(0,160,140,0.07)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <S3Logo variant="light" size="sm" />
                    <div style={{ width:1, height:28, background:"rgba(0,160,140,0.18)" }} />
                    <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:9, fontWeight:900, color:"rgba(0,125,110,0.60)", letterSpacing:"3px", textTransform:"uppercase" }}>Agent Panel</div>
                  </div>
                  {/* Profile icon */}
                  <button onClick={() => setShowAgentProfile(true)} style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#6D28D9,#0891B2)", border:"2.5px solid rgba(255,255,255,0.7)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:"0 3px 10px rgba(109,40,217,0.35)", flexShrink:0, position:"relative" }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:9, color:"#fff", fontWeight:900 }}>
                      {(user?.name||"A").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                    </span>
                  </button>
                </div>

                {/* Agent Profile Drawer */}
                {showAgentProfile && (
                  <div onClick={() => setShowAgentProfile(false)} style={{ position:"fixed", inset:0, zIndex:800, background:"rgba(10,8,30,0.70)", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
                    <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:"20px 20px 0 0", maxHeight:"82%", display:"flex", flexDirection:"column", animation:"fadeUp 0.3s ease both" }}>
                      {/* Drag handle */}
                      <div style={{ display:"flex", justifyContent:"center", padding:"10px 0 4px" }}>
                        <div style={{ width:40, height:4, borderRadius:2, background:"rgba(0,160,140,0.25)" }} />
                      </div>
                      {/* Profile header — hero style */}
                      <div style={{ background:"linear-gradient(135deg,#6D28D9,#0891B2)", borderRadius:"16px 16px 0 0", padding:"16px 18px 20px" }}>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"rgba(255,255,255,0.85)", letterSpacing:"0.06em" }}>MY PROFILE</div>
                          <button onClick={() => setShowAgentProfile(false)} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.30)", color:"#fff", borderRadius:9, width:30, height:30, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <Icon name="xmark" size={14} color="#fff" />
                          </button>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                          <div style={{ position:"relative", flexShrink:0 }}>
                            <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.20)", border:"3px solid rgba(255,255,255,0.60)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 20px rgba(0,0,0,0.20)" }}>
                              <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:15, color:"#fff", letterSpacing:"-0.5px" }}>
                                {(user?.name||"A").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                              </span>
                            </div>
                            <div style={{ position:"absolute", bottom:2, right:2, width:14, height:14, borderRadius:"50%", background:"#22c55e", border:"2px solid #fff", boxShadow:"0 0 6px rgba(34,197,94,0.6)" }} />
                          </div>
                          <div>
                            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:11, color:"#fff", marginBottom:2 }}>{user?.name || "Agent"}</div>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                              <div style={{ background:"rgba(255,255,255,0.20)", borderRadius:20, padding:"2px 10px", display:"flex", alignItems:"center", gap:4 }}>
                                <Icon name="check" size={10} color="#fff" />
                                <span style={{ fontSize:8, color:"#fff", fontWeight:900 }}>Verified Agent</span>
                              </div>
                            </div>
                            <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)", fontWeight:700 }}>{userId}</div>
                          </div>
                        </div>
                      </div>
                      {/* Details */}
                      <div style={{ overflowY:"auto", padding:"12px 18px 24px" }}>
                        {[
                          { iconName:"phone",  color:"#0891B2", label:"Mobile Number",  value: user?.mobile || "—" },
                          { iconName:"mail",   color:"#059669", label:"Email ID",       value: user?.email  || "—" },
                          { iconName:"tag",    color:"#D97706", label:"User ID",        value: userId       || "—" },
                          { iconName:"kyc",    color:"#6D28D9", label:"PAN Number",     value: user?.pan    || agentDocs?.pan || "—" },
                          { iconName:"shield", color:"#E11D48", label:"Aadhaar Number", value: user?.aadhaar|| agentDocs?.aadhaar || "—" },
                          { iconName:"clock",  color:"#0891B2", label:"Member Since",   value: new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}) },
                        ].map(({ iconName, color, label, value }) => (
                          <div key={label} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 0", borderBottom:"1px solid rgba(109,40,217,0.07)" }}>
                            <div style={{ width:28, height:28, borderRadius:8, background:`${color}12`, border:`1px solid ${color}20`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                              <Icon name={iconName} size={13} color={color} />
                            </div>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:8, color:C.muted, fontWeight:900, letterSpacing:"0.05em", textTransform:"uppercase" }}>{label}</div>
                              <div style={{ fontSize:9, fontWeight:900, color:"#1A1035", marginTop:1, fontFamily:"'Space Grotesk',sans-serif" }}>{value}</div>
                            </div>
                          </div>
                        ))}

                        {/* Security Settings */}
                        <div style={{ marginTop:16, padding:"12px 0 4px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                            <Icon name="shield" size={14} color="#6D28D9" />
                            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#6D28D9", letterSpacing:"1.5px", textTransform:"uppercase" }}>Security</span>
                          </div>
                          {[
                            { key:"twoFa",      iconName:"lock",        activeColor:"#6D28D9", label:"Two-Factor Auth",     desc:"Extra OTP on login" },
                            { key:"biometric",  iconName:"fingerprint", activeColor:"#0891B2", label:"Biometric Login",      desc:"Fingerprint / Face ID" },
                            { key:"txnPin",     iconName:"key",         activeColor:"#D97706", label:"Transaction PIN",      desc:"PIN for every transfer" },
                            { key:"loginNotif", iconName:"bell",        activeColor:"#059669", label:"Login Alerts",         desc:"Notify on new login" },
                            { key:"txnNotif",   iconName:"phone",       activeColor:"#0891B2", label:"Transaction Alerts",   desc:"Notify on transactions" },
                          ]                          .map(({ key, iconName, activeColor, label, desc }) => (
                            <div key={key} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 0", borderBottom:"1px solid rgba(109,40,217,0.07)" }}>
                              <div style={{ width:30, height:30, borderRadius:9, background:agentSecurity[key]?`${activeColor}15`:"rgba(0,0,0,0.04)", border:`1.5px solid ${agentSecurity[key]?`${activeColor}30`:"rgba(0,0,0,0.08)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s" }}>
                                <Icon name={iconName} size={14} color={agentSecurity[key]?activeColor:"#9CA3AF"} />
                              </div>
                              <div style={{ flex:1 }}>
                                <div style={{ fontSize:9, fontWeight:900, color:"#1A1035" }}>{label}</div>
                                <div style={{ fontSize:8, color:C.muted, marginTop:1 }}>{desc}</div>
                              </div>
                              <div onClick={() => {
                                const next = !agentSecurity[key];
                                if (key === "txnPin" && next && !agentPin) { setShowAgentPinSetup(true); return; }
                                if (key === "txnPin" && !next) { setAgentPin(null); }
                                if (key === "biometric" && next && !agentBiometricVerified) { setShowAgentBiometric(true); return; }
                                if (key === "biometric" && !next) { setAgentBiometricVerified(false); }
                                setAgentSecurity(s=>({...s,[key]:next}));
                              }} style={{ width:38, height:20, borderRadius:10, background:agentSecurity[key]?activeColor:"rgba(0,0,0,0.14)", cursor:"pointer", position:"relative", transition:"background 0.25s", flexShrink:0 }}>
                                <div style={{ position:"absolute", top:2, left:agentSecurity[key]?19:2, width:16, height:16, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 4px rgba(0,0,0,0.25)", transition:"left 0.25s" }} />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* ── PIN Setup Modal ── */}
                        {showAgentPinSetup && (
                          <div style={{ background:"rgba(109,40,217,0.06)", border:"1.5px solid rgba(109,40,217,0.20)", borderRadius:12, padding:"12px", marginTop:8, animation:"fadeUp 0.25s ease both" }}>
                            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#6D28D9", marginBottom:8 }}>🔢 Set Transaction PIN</div>
                            <input type="password" maxLength={6} value={agentNewPin} onChange={e=>setAgentNewPin(e.target.value.replace(/[^0-9]/g,"").slice(0,6))} placeholder="Enter 4-6 digit PIN"
                              style={{ width:"100%", borderRadius:8, border:"1.5px solid rgba(109,40,217,0.30)", padding:"8px 10px", fontSize:10, fontWeight:900, color:"#1A1035", background:"#fff", outline:"none", marginBottom:6, fontFamily:"inherit" }} />
                            <input type="password" maxLength={6} value={agentConfirmPin} onChange={e=>setAgentConfirmPin(e.target.value.replace(/[^0-9]/g,"").slice(0,6))} placeholder="Confirm PIN"
                              style={{ width:"100%", borderRadius:8, border:`1.5px solid ${agentPinError?"rgba(225,29,72,0.40)":"rgba(109,40,217,0.30)"}`, padding:"8px 10px", fontSize:10, fontWeight:900, color:"#1A1035", background:"#fff", outline:"none", marginBottom:6, fontFamily:"inherit" }} />
                            {agentPinError && <div style={{ fontSize:8, color:C.danger, marginBottom:6 }}>{agentPinError}</div>}
                            <div style={{ display:"flex", gap:6 }}>
                              <button onClick={() => { setShowAgentPinSetup(false); setAgentNewPin(""); setAgentConfirmPin(""); setAgentPinError(""); }}
                                style={{ flex:1, background:"rgba(0,0,0,0.05)", border:"none", borderRadius:8, padding:"7px", fontSize:9, fontWeight:900, color:C.muted, cursor:"pointer" }}>Cancel</button>
                              <button onClick={() => {
                                if (agentNewPin.length < 4) { setAgentPinError("PIN must be 4-6 digits"); return; }
                                if (agentNewPin !== agentConfirmPin) { setAgentPinError("PINs do not match"); return; }
                                setAgentPin(agentNewPin); setAgentSecurity(s=>({...s,txnPin:true}));
                                setShowAgentPinSetup(false); setAgentNewPin(""); setAgentConfirmPin(""); setAgentPinError("");
                              }} style={{ flex:2, background:"linear-gradient(135deg,#6D28D9,#0891B2)", border:"none", borderRadius:8, padding:"7px", fontSize:9, fontWeight:900, color:"#fff", cursor:"pointer" }}>✅ Set PIN</button>
                            </div>
                          </div>
                        )}
                        {/* ── Biometric Verify Modal ── */}
                        {showAgentBiometric && (
                          <div style={{ background:"rgba(8,145,178,0.06)", border:"1.5px solid rgba(8,145,178,0.20)", borderRadius:12, padding:"14px", marginTop:8, textAlign:"center", animation:"fadeUp 0.25s ease both" }}>
                            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:"#0891B2", marginBottom:8 }}>👆 Verify Biometric</div>
                            <div style={{ fontSize:8, color:C.muted, marginBottom:10 }}>Tap to register your fingerprint</div>
                            <div onClick={async () => {
                              await sleep(600);
                              setAgentBiometricVerified(true);
                              setAgentSecurity(s=>({...s,biometric:true}));
                              setShowAgentBiometric(false);
                            }} style={{ width:56, height:56, borderRadius:"50%", background:"linear-gradient(135deg,#E0F2FE,#BAE6FD)", border:"2.5px solid #0891B2", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", margin:"0 auto 10px", boxShadow:"0 4px 16px rgba(8,145,178,0.25)" }}>
                              <Icon name="fingerprint" size={26} color="#0891B2" />
                            </div>
                            <button onClick={() => setShowAgentBiometric(false)} style={{ background:"none", border:"none", fontSize:8, color:C.muted, cursor:"pointer" }}>Cancel</button>
                          </div>
                        )}
                        {/* Info badges */}
                        {agentSecurity.twoFa && (
                          <div style={{ background:"rgba(109,40,217,0.06)", borderRadius:8, padding:"6px 10px", marginTop:6, display:"flex", alignItems:"center", gap:6 }}>
                            <Icon name="info" size={12} color="#6D28D9" />
                            <span style={{ fontSize:8, color:"#6D28D9", fontWeight:900 }}>OTP required on every login — even with password</span>
                          </div>
                        )}
                        {agentPin && (
                          <div style={{ background:"rgba(217,119,6,0.06)", borderRadius:8, padding:"6px 10px", marginTop:6, display:"flex", alignItems:"center", gap:6 }}>
                            <Icon name="check" size={12} color="#D97706" />
                            <span style={{ fontSize:8, color:"#D97706", fontWeight:900 }}>Transaction PIN is set · Required for all transfers</span>
                          </div>
                        )}

                        {/* Change Password button */}
                        <button onClick={() => { setShowChangePwd(true); setPwdError(""); setPwdSuccess(false); setPwdOld(""); setPwdNew(""); setPwdConfirm(""); }} style={{ width:"100%", marginTop:14, background:"rgba(109,40,217,0.07)", border:"1.5px solid rgba(109,40,217,0.28)", color:"#6D28D9", borderRadius:12, padding:"10px", fontSize:9, fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                          <Icon name="key" size={15} color="#6D28D9" />
                          Change Password
                        </button>

                        {/* Logout button */}
                        <button onClick={() => { setShowAgentProfile(false); setShowLogoutPopup(true); }} style={{ width:"100%", marginTop:10, background:"rgba(225,29,72,0.07)", border:"1.5px solid rgba(225,29,72,0.22)", color:C.danger, borderRadius:12, padding:"10px", fontSize:9, fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                          <Icon name="logout" size={15} color={C.danger} />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Change Password Modal */}
                {showChangePwd && (
                  <div onClick={() => setShowChangePwd(false)} style={{ position:"fixed", inset:0, zIndex:900, background:"rgba(10,8,30,0.75)", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
                    <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:"20px 20px 0 0", animation:"fadeUp 0.3s ease both", padding:"0 0 24px" }}>
                      {/* Handle */}
                      <div style={{ display:"flex", justifyContent:"center", padding:"10px 0 4px" }}>
                        <div style={{ width:40, height:4, borderRadius:2, background:"rgba(0,160,140,0.25)" }} />
                      </div>
                      {/* Header */}
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"4px 18px 14px", borderBottom:"1px solid rgba(0,210,180,0.12)" }}>
                        <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:900, fontSize:9, color:"#007d6e" }}>🔑 Change Password</div>
                        <button onClick={() => setShowChangePwd(false)} style={{ background:"rgba(225,29,72,0.08)", border:"none", color:C.danger, borderRadius:8, width:28, height:28, cursor:"pointer", fontSize:9 }}>✕</button>
                      </div>

                      {pwdSuccess ? (
                        <div style={{ textAlign:"center", padding:"28px 18px" }}>
                          <div style={{ fontSize:9, marginBottom:10 }}>✅</div>
                          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:9, color:C.success }}>Password Changed!</div>
                          <div style={{ fontSize:9, color:C.muted, marginTop:6, marginBottom:12 }}>Your password has been updated successfully</div>
                          <button onClick={() => setShowChangePwd(false)} style={{ background:"linear-gradient(135deg,#00d2b4,#0066ff)", color:"#fff", border:"none", borderRadius:10, padding:"10px 28px", fontSize:9, fontWeight:900, cursor:"pointer" }}>Done</button>
                        </div>
                      ) : (
                        <div style={{ padding:"16px 18px 0" }}>
                          {/* Current password */}
                          {[
                            { label:"Current Password", val:pwdOld, set:setPwdOld, show:showPwdOld, toggleShow:() => setShowPwdOld(s=>!s) },
                            { label:"New Password",     val:pwdNew, set:setPwdNew, show:showPwdNew, toggleShow:() => setShowPwdNew(s=>!s) },
                          ].map(({ label, val, set, show, toggleShow }) => (
                            <div key={label} style={{ marginBottom:8 }}>
                              <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900, display:"flex", justifyContent:"space-between", letterSpacing:"0.04em" }}>
                                <span>{label.toUpperCase()}</span>
                                <button onClick={toggleShow} style={{ background:"none", border:"none", cursor:"pointer", fontSize:9, color:"#007d6e", fontWeight:900 }}>{show ? "🙈 Hide" : "👁 Show"}</button>
                              </div>
                              <div style={{ display:"flex", alignItems:"center", background:"#F9F8FF", border:`1.5px solid ${val?"rgba(0,210,180,0.40)":"rgba(0,160,140,0.18)"}`, borderRadius:10, padding:"0 12px", height:44 }}>
                                <input type={show?"text":"password"} value={val} onChange={e=>set(e.target.value)}
                                  placeholder="Enter password"
                                  style={{ flex:1, background:"none", border:"none", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit" }} />
                              </div>
                            </div>
                          ))}
                          {/* Confirm new password */}
                          <div style={{ marginBottom:8 }}>
                            <div style={{ fontSize:9, color:C.muted, marginBottom:4, fontWeight:900, letterSpacing:"0.04em" }}>CONFIRM NEW PASSWORD</div>
                            <div style={{ display:"flex", alignItems:"center", background:"#F9F8FF", border:`1.5px solid ${pwdConfirm && pwdConfirm===pwdNew?"rgba(5,150,105,0.40)":pwdConfirm&&pwdConfirm!==pwdNew?"rgba(225,29,72,0.40)":"rgba(0,160,140,0.18)"}`, borderRadius:10, padding:"0 12px", height:44 }}>
                              <input type="password" value={pwdConfirm} onChange={e=>setPwdConfirm(e.target.value)}
                                placeholder="Re-enter new password"
                                style={{ flex:1, background:"none", border:"none", fontSize:9, color:"#1A1035", outline:"none", fontFamily:"inherit" }} />
                              {pwdConfirm && <span style={{ fontSize:9 }}>{pwdConfirm===pwdNew?"☑️":"✖️"}</span>}
                            </div>
                          </div>
                          {/* Strength indicator */}
                          {pwdNew && (
                            <div style={{ marginBottom:10 }}>
                              <div style={{ fontSize:9, color:C.muted, marginBottom:3 }}>Password strength</div>
                              <div style={{ height:4, background:"#EDE9FE", borderRadius:3, overflow:"hidden" }}>
                                <div style={{ height:"100%", width: pwdNew.length<6?"30%":pwdNew.length<10?"60%":"100%", background: pwdNew.length<6?C.danger:pwdNew.length<10?C.warning:C.success, borderRadius:3, transition:"all 0.3s" }} />
                              </div>
                              <div style={{ fontSize:9, color:pwdNew.length<6?C.danger:pwdNew.length<10?C.warning:C.success, marginTop:2 }}>
                                {pwdNew.length<6?"Weak — too short":pwdNew.length<10?"Fair":"Strong ✓"}
                              </div>
                            </div>
                          )}
                          {/* Error */}
                          {pwdError && <div style={{ fontSize:9, color:C.danger, marginBottom:10, display:"flex", alignItems:"center", gap:5 }}>⚠️ {pwdError}</div>}
                          {/* Submit */}
                          <button
                            onClick={() => {
                              setPwdError("");
                              if (!pwdOld) { setPwdError("Enter your current password"); return; }
                              if (pwdNew.length < 6) { setPwdError("New password must be at least 6 characters"); return; }
                              if (pwdNew !== pwdConfirm) { setPwdError("Passwords do not match"); return; }
                              // In real app verify pwdOld against stored hash — demo: accept any
                              setPwdSuccess(true);
                            }}
                            disabled={!pwdOld||!pwdNew||!pwdConfirm}
                            style={{ width:"100%", background:(!pwdOld||!pwdNew||!pwdConfirm)?"rgba(0,210,180,0.15)":"linear-gradient(135deg,#00d2b4,#0066ff)", color:(!pwdOld||!pwdNew||!pwdConfirm)?"rgba(0,160,140,0.50)":"#fff", border:"none", borderRadius:12, padding:"13px", fontSize:9, fontWeight:900, cursor:(!pwdOld||!pwdNew||!pwdConfirm)?"not-allowed":"pointer", boxShadow:(!pwdOld||!pwdNew||!pwdConfirm)?"none":"0 4px 16px rgba(0,210,180,0.30)" }}>
                            🔑 Update Password
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Scrollable tab content — fills available height */}
                <div style={{ flex:1, overflowY:"auto", overflowX:"hidden", paddingBottom:16 }}>
                  {renderTab()}
                </div>

                {/* BottomNav — always pinned to bottom, never scrolls away */}
                {/* BottomNav removed */}
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
