// lib/utils.ts
import { clsx, type ClassValue } from "clsx";

/** Tailwind class combiner */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Safe date formatter with fallback. Accepts string/number/Date. */
export function formatDate(
  date: string | number | Date,
  locale: string = "en-IN",
  opts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);

  try {
    return new Intl.DateTimeFormat(locale, opts).format(d);
  } catch {
    try {
      return d.toLocaleDateString(locale, opts);
    } catch {
      return d.toDateString();
    }
  }
}

/** Time-only formatter like "7:00 AM" */
export function formatTime(
  date: string | number | Date,
  locale: string = "en-IN",
  opts: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" }
): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);

  try {
    return new Intl.DateTimeFormat(locale, opts).format(d);
  } catch {
    try {
      return d.toLocaleTimeString(locale, opts);
    } catch {
      return d.toTimeString();
    }
  }
}

/** Time range like "7:00 AM – 8:00 AM" */
export function formatTimeRange(
  startISO: string | number | Date,
  endISO: string | number | Date,
  locale: string = "en-IN",
  opts: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" }
): string {
  const s = new Date(startISO);
  const e = new Date(endISO);
  try {
    const f = new Intl.DateTimeFormat(locale, opts);
    return `${f.format(s)} – ${f.format(e)}`;
  } catch {
    return `${s.toLocaleTimeString()} – ${e.toLocaleTimeString()}`;
  }
}

/** INR currency formatter with graceful fallback */
export function formatCurrency(
  amount: number,
  locale: string = "en-IN",
  currency: string = "INR"
): string {
  if (amount == null || Number.isNaN(Number(amount))) return "₹0";
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
  } catch {
    // minimal fallback if Intl currency formatting is unavailable
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  }
}

/* -----------------------  ICS helpers for calendar  ----------------------- */

type ICSOpts = {
  title: string;
  start: string | number | Date; // local time or ISO
  end: string | number | Date;   // local time or ISO
  description?: string;
  location?: string;
};

/** Convert Date → ICS UTC timestamp, e.g., 20250821T133000Z */
function toICSUTC(d: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

/** Build .ics content (string). Safe to call on server or client. */
export function buildICS({
  title,
  start,
  end,
  description = "",
  location = "",
}: ICSOpts): string {
  const uid = `picklebay-${Date.now()}@local`;
  const dtStart = toICSUTC(new Date(start));
  const dtEnd = toICSUTC(new Date(end));
  const now = toICSUTC(new Date());

  const esc = (s: string) =>
    String(s || "")
      .replace(/\\/g, "\\\\")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;")
      .replace(/\n/g, "\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PickleBay MVP//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${esc(title)}`,
    description ? `DESCRIPTION:${esc(description)}` : "DESCRIPTION:",
    location ? `LOCATION:${esc(location)}` : "LOCATION:",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Generate and (on web) trigger a download of <filename>.ics.
 * Returns ICS string so you can also attach/share it.
 */
export function generateCalendarFile(
  opts: ICSOpts,
  filename: string = "booking.ics"
): string {
  const content = buildICS(opts);

  if (typeof window !== "undefined") {
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return content;
}
