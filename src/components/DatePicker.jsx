import { useState, useRef, useEffect } from "react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

export default function DatePicker({ value, onChange, label, min }) {
  const today = new Date();
  const minDate = min ? new Date(min) : today;

  const parseValue = (v) => {
    if (!v) return null;
    const [y, m, d] = v.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const selected = parseValue(value);

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => selected || new Date(today.getFullYear(), today.getMonth(), 1));
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const year = view.getFullYear();
  const month = view.getMonth();

  // Build calendar grid
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // Monday-first: 0=Mo,...6=Su
  const startOffset = (firstDay.getDay() + 6) % 7;
  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));

  const prevMonth = () => setView(new Date(year, month - 1, 1));
  const nextMonth = () => setView(new Date(year, month + 1, 1));

  const isDisabled = (d) => d && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
  const isSelected = (d) => d && selected && d.toDateString() === selected.toDateString();
  const isToday = (d) => d && d.toDateString() === today.toDateString();

  const select = (d) => {
    if (isDisabled(d)) return;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    onChange(`${y}-${m}-${day}`);
    setOpen(false);
  };

  const displayValue = selected
    ? selected.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <div className="dp-wrap" ref={ref}>
      {label && <span className="field-label">{label}</span>}
      <button type="button" className={`dp-trigger ${open ? "dp-trigger-open" : ""} ${!value ? "dp-trigger-empty" : ""}`} onClick={() => setOpen(o => !o)}>
        <CalIcon />
        <span>{displayValue || "Select a date"}</span>
        <ChevronIcon />
      </button>

      {open && (
        <div className="dp-dropdown">
          {/* Header */}
          <div className="dp-head">
            <button type="button" className="dp-nav" onClick={prevMonth}><ArrowLeft /></button>
            <span className="dp-month-label">{MONTHS[month]} {year}</span>
            <button type="button" className="dp-nav" onClick={nextMonth}><ArrowRight /></button>
          </div>

          {/* Day names */}
          <div className="dp-grid dp-day-names">
            {DAYS.map(d => <span key={d}>{d}</span>)}
          </div>

          {/* Dates */}
          <div className="dp-grid dp-dates">
            {days.map((d, i) => (
              <button
                key={i}
                type="button"
                className={`dp-day
                  ${!d ? "dp-day-empty" : ""}
                  ${isToday(d) ? "dp-day-today" : ""}
                  ${isSelected(d) ? "dp-day-selected" : ""}
                  ${isDisabled(d) ? "dp-day-disabled" : ""}
                `}
                onClick={() => d && select(d)}
                disabled={isDisabled(d)}
              >
                {d ? d.getDate() : ""}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="dp-footer">
            <button type="button" className="dp-today-btn" onClick={() => { select(today); setView(new Date(today.getFullYear(), today.getMonth(), 1)); }}>
              Today
            </button>
            <button type="button" className="dp-clear-btn" onClick={() => { onChange(""); setOpen(false); }}>
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const si = { width:16, height:16, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round" };
function CalIcon() { return <svg {...si}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>; }
function ChevronIcon() { return <svg {...si} width={14} height={14}><path d="m6 9 6 6 6-6"/></svg>; }
function ArrowLeft() { return <svg {...si} width={14} height={14}><path d="m15 18-6-6 6-6"/></svg>; }
function ArrowRight() { return <svg {...si} width={14} height={14}><path d="m9 18 6-6-6-6"/></svg>; }