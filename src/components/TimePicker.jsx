import { useState, useRef, useEffect } from "react";

// Generates hours 0-23 and minutes in steps of 5
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

export default function TimePicker({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const [selH, selM] = value ? value.split(":") : ["", ""];

  const hourRef = useRef(null);
  const minRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Scroll selected item into center when opening
  useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      if (hourRef.current && selH) {
        const el = hourRef.current.querySelector(`[data-val="${selH}"]`);
        el?.scrollIntoView({ block: "center" });
      }
      if (minRef.current && selM) {
        const el = minRef.current.querySelector(`[data-val="${selM}"]`);
        el?.scrollIntoView({ block: "center" });
      }
    }, 50);
  }, [open]);

  const select = (h, m) => {
    const hour = h ?? selH ?? "00";
    const min = m ?? selM ?? "00";
    onChange(`${hour}:${min}`);
  };

  const displayValue = value
    ? (() => {
        const [h, m] = value.split(":");
        const hour = parseInt(h);
        const ampm = hour >= 12 ? "PM" : "AM";
        const h12 = hour % 12 === 0 ? 12 : hour % 12;
        return `${h12}:${m} ${ampm}`;
      })()
    : "";

  return (
    <div className="tp-wrap" ref={ref}>
      {label && <span className="field-label">{label}</span>}
      <button
        type="button"
        className={`dp-trigger ${open ? "dp-trigger-open" : ""} ${!value ? "dp-trigger-empty" : ""}`}
        onClick={() => setOpen(o => !o)}
      >
        <ClockIcon />
        <span>{displayValue || "Select a time"}</span>
        <ChevronIcon />
      </button>

      {open && (
        <div className="tp-dropdown">
          <div className="tp-header">
            <span>Hour</span>
            <span>Minute</span>
          </div>
          <div className="tp-columns">
            {/* Hours */}
            <div className="tp-col" ref={hourRef}>
              {HOURS.map(h => (
                <button
                  key={h}
                  data-val={h}
                  type="button"
                  className={`tp-item ${selH === h ? "tp-item-active" : ""}`}
                  onClick={() => select(h, selM || "00")}
                >
                  {h}
                </button>
              ))}
            </div>

            <div className="tp-divider" aria-hidden="true" />

            {/* Minutes */}
            <div className="tp-col" ref={minRef}>
              {MINUTES.map(m => (
                <button
                  key={m}
                  data-val={m}
                  type="button"
                  className={`tp-item ${selM === m ? "tp-item-active" : ""}`}
                  onClick={() => select(selH || "00", m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="tp-footer">
            <span className="tp-selected">
              {value ? `Selected: ${displayValue}` : "No time selected"}
            </span>
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
function ClockIcon() { return <svg {...si}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>; }
function ChevronIcon() { return <svg {...si} width={14} height={14}><path d="m6 9 6 6 6-6"/></svg>; }