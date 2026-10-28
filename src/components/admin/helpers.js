export const BOOKING_STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"];
export const LEAD_STATUSES = ["New", "Contacted", "Booked", "Closed"];

export const BOOKING_STATUS_STYLES = {
  Pending: "border-gold/50 bg-gold/10 text-gold",
  Confirmed: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  Completed: "border-white/25 bg-white/5 text-ivory/70",
  Cancelled: "border-red-400/40 bg-red-400/10 text-red-300",
};

export const LEAD_STATUS_STYLES = {
  New: "border-gold/50 bg-gold/10 text-gold",
  Contacted: "border-sky-400/40 bg-sky-400/10 text-sky-300",
  Booked: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  Closed: "border-white/25 bg-white/5 text-ivory/60",
};

export const toArray = (result) => {
  if (Array.isArray(result)) return result;
  if (result && Array.isArray(result.items)) return result.items;
  return [];
};

export const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value.length <= 10 ? `${value}T12:00:00` : value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });
};

export const formatDateTime = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const downloadCsv = (filename, rows) => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const csv = [
    headers.map(escape).join(","),
    ...rows.map((row) => headers.map((header) => escape(row[header])).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};