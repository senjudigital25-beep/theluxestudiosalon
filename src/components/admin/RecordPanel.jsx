import { useState } from "react";
import { X, Save, Trash2, Loader2, Phone, Mail, Calendar, Clock, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import {
  BOOKING_STATUSES,
  LEAD_STATUSES,
  BOOKING_STATUS_STYLES,
  LEAD_STATUS_STYLES,
  formatDate,
  formatDateTime,
} from "./helpers";

export default function RecordPanel({ type, record, onClose, onUpdated, onDeleted }) {
  const isBooking = type === "booking";
  const statuses = isBooking ? BOOKING_STATUSES : LEAD_STATUSES;
  const styles = isBooking ? BOOKING_STATUS_STYLES : LEAD_STATUS_STYLES;
  const entity = isBooking ? base44.entities.Booking : base44.entities.Lead;

  const [status, setStatus] = useState(record.status || statuses[0]);
  const [notes, setNotes] = useState(record.admin_notes || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const updated = await entity.update(record.id, { status, admin_notes: notes });
      onUpdated({ ...record, ...(updated || {}), status, admin_notes: notes });
      onClose();
    } catch (e) {
      setError("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("Delete this record permanently?")) return;
    setDeleting(true);
    setError("");
    try {
      await entity.delete(record.id);
      onDeleted(record.id);
      onClose();
    } catch (e) {
      setError("Could not delete. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const detail = (icon, label, value) => (
    <div className="flex items-start gap-3 py-3">
      <span className="mt-0.5 text-gold">{icon}</span>
      <div>
        <p className="font-body text-[0.52rem] uppercase tracking-[0.22em] text-ivory/35">{label}</p>
        <p className="mt-0.5 font-body text-[0.86rem] text-ivory/85">{value || "—"}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-white/10 bg-[#0d0d0d]">
        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="font-body text-[0.52rem] uppercase tracking-[0.26em] text-gold">
              {isBooking ? "Booking" : "Lead"}
            </p>
            <h2 className="mt-1 font-heading text-2xl text-ivory">
              {isBooking ? record.full_name : record.name}
            </h2>
            <p className="mt-0.5 font-body text-[0.7rem] text-ivory/35">
              Received {formatDateTime(record.created_date)}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center border border-white/15 text-ivory/60 transition-colors hover:border-gold hover:text-gold"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex-1 divide-y divide-white/10 px-6 py-4">
          {isBooking ? (
            <>
              {detail(<Sparkles className="h-3.5 w-3.5" />, "Service", `${record.service} · ${record.service_category}`)}
              {detail(<Calendar className="h-3.5 w-3.5" />, "Preferred date", formatDate(record.preferred_date))}
              {detail(<Clock className="h-3.5 w-3.5" />, "Preferred time", record.preferred_time)}
              {detail(<Phone className="h-3.5 w-3.5" />, "Phone", record.phone)}
              {detail(<Mail className="h-3.5 w-3.5" />, "Email", record.email)}
              {record.notes ? (
                <div className="py-3">
                  <p className="font-body text-[0.52rem] uppercase tracking-[0.22em] text-ivory/35">
                    Client notes
                  </p>
                  <p className="mt-1 whitespace-pre-wrap font-body text-[0.85rem] leading-relaxed text-ivory/70">
                    {record.notes}
                  </p>
                </div>
              ) : null}
            </>
          ) : (
            <>
              {detail(<Sparkles className="h-3.5 w-3.5" />, "Service interest", record.service_interest || "General enquiry")}
              {detail(<Mail className="h-3.5 w-3.5" />, "Email", record.email)}
              {detail(<Phone className="h-3.5 w-3.5" />, "Phone", record.phone)}
              <div className="py-3">
                <p className="font-body text-[0.52rem] uppercase tracking-[0.22em] text-ivory/35">Message</p>
                <p className="mt-1 whitespace-pre-wrap font-body text-[0.85rem] leading-relaxed text-ivory/70">
                  {record.message}
                </p>
              </div>
            </>
          )}

          <div className="py-5">
            <p className="font-body text-[0.52rem] uppercase tracking-[0.22em] text-ivory/35">Status</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {statuses.map((option) => (
                <button
                  key={option}
                  onClick={() => setStatus(option)}
                  className={`border px-3 py-1.5 font-body text-[0.62rem] uppercase tracking-[0.14em] transition-colors ${
                    status === option
                      ? styles[option]
                      : "border-white/12 text-ivory/45 hover:border-white/30 hover:text-ivory/70"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="py-5">
            <label
              htmlFor="admin_notes"
              className="font-body text-[0.52rem] uppercase tracking-[0.22em] text-ivory/35"
            >
              Internal notes
            </label>
            <textarea
              id="admin_notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Only studio staff can see this."
              className="mt-2 w-full border border-white/15 bg-ink px-3 py-2.5 font-body text-[0.85rem] text-ivory placeholder:text-ivory/25 focus:border-gold focus:outline-none"
            />
          </div>

          {error ? (
            <p className="my-4 border border-red-500/30 bg-red-500/10 px-3 py-2 font-body text-[0.75rem] text-red-300">
              {error}
            </p>
          ) : null}
        </div>

        <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-white/10 bg-[#0d0d0d] px-6 py-4">
          <button
            onClick={remove}
            disabled={deleting}
            className="inline-flex items-center gap-2 font-body text-[0.6rem] uppercase tracking-[0.2em] text-red-300/70 transition-colors hover:text-red-300 disabled:opacity-50"
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Delete
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-body text-[0.62rem] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}