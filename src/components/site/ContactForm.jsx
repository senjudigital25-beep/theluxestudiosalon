import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { ALL_SERVICES } from "@/lib/siteData";

const field =
  "w-full border border-white/15 bg-ink/60 px-4 py-3.5 font-body text-sm text-ivory placeholder:text-ivory/25 transition-colors focus:border-gold focus:outline-none";
const labelCls = "mb-2 block font-body text-[0.58rem] uppercase tracking-[0.24em] text-ivory/45";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_interest: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const set = (key, value) => {
    setError("");
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please tell us your name.");
    if (!emailOk(form.email)) return setError("Please enter a valid email address.");
    if (!form.message.trim()) return setError("Please add a short message.");

    setSubmitting(true);
    try {
      await base44.entities.Lead.create({ ...form, status: "New" });
      setSent(true);
    } catch (err) {
      setError("We couldn't send that just now. Please call the studio instead.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="border border-gold/30 bg-[#0f0f0f] p-8 md:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold">
          <Check className="h-4 w-4" />
        </span>
        <h3 className="mt-5 font-heading text-2xl text-ivory">Message received.</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-ivory/55">
          Thank you — we've got your enquiry and the studio will get back to you. If it's urgent,
          call us on the number beside this form.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", phone: "", service_interest: "", message: "" });
          }}
          className="mt-6 border border-white/15 px-6 py-3 font-body text-[0.6rem] uppercase tracking-[0.24em] text-ivory/60 transition-colors hover:border-gold hover:text-gold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-white/10 bg-[#0f0f0f] p-6 md:p-9">
      <h3 className="font-heading text-2xl text-ivory">Send a message</h3>
      <p className="mt-2 font-body text-[0.82rem] text-ivory/45">
        Questions about a service or a booking? Write to the studio here.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="c_name">
            Name *
          </label>
          <input id="c_name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" className={field} />
        </div>
        <div>
          <label className={labelCls} htmlFor="c_phone">
            Phone
          </label>
          <input id="c_phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="778 000 0000" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="c_email">
            Email *
          </label>
          <input id="c_email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="c_service">
            Service interested in
          </label>
          <select
            id="c_service"
            value={form.service_interest}
            onChange={(e) => set("service_interest", e.target.value)}
            className={`${field} appearance-none`}
          >
            <option value="">Select a service (optional)</option>
            <option value="General enquiry">General enquiry</option>
            {ALL_SERVICES.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.category} — {service.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="c_message">
            Message *
          </label>
          <textarea
            id="c_message"
            rows={5}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="How can we help?"
            className={field}
          />
        </div>
      </div>

      {error ? (
        <p className="mt-5 border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-[0.78rem] text-red-300">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex items-center gap-2 bg-gold px-8 py-4 font-body text-[0.64rem] uppercase tracking-[0.26em] text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending
          </>
        ) : (
          <>
            Send message <Send className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </form>
  );
}