import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft, ArrowRight, Loader2, Calendar, Clock } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { SERVICE_CATEGORIES, TIME_SLOTS, findService } from "@/lib/siteData";
import LuxeButton from "@/components/site/LuxeButton";

const field =
  "w-full border border-white/15 bg-ink/60 px-4 py-3.5 font-body text-sm text-ivory placeholder:text-ivory/25 transition-colors focus:border-gold focus:outline-none";
const labelCls = "mb-2 block font-body text-[0.58rem] uppercase tracking-[0.24em] text-ivory/45";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const phoneOk = (v) => v.replace(/\D/g, "").length >= 7;

export default function BookingForm({ initialService = "" }) {
  const initial = useMemo(() => findService(initialService), [initialService]);

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({
    service_category: initial ? initial.category : "",
    service: initial ? initial.name : "",
    preferred_date: "",
    preferred_time: "",
    full_name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    if (initial) {
      setForm((f) => ({ ...f, service_category: initial.category, service: initial.name }));
    }
  }, [initial]);

  const today = new Date().toISOString().split("T")[0];

  const set = (key, value) => {
    setError("");
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "service_category") next.service = "";
      return next;
    });
  };

  const activeCategory = SERVICE_CATEGORIES.find((c) => c.name === form.service_category);

  const stepErrors = () => {
    if (step === 0) {
      if (!form.service_category) return "Choose a service category to continue.";
      if (!form.service) return "Choose a specific service to continue.";
    }
    if (step === 1) {
      if (!form.preferred_date) return "Choose a preferred date.";
      if (!form.preferred_time) return "Choose a preferred time.";
    }
    if (step === 2) {
      if (!form.full_name.trim()) return "Please enter your full name.";
      if (!emailOk(form.email)) return "Please enter a valid email address.";
      if (!phoneOk(form.phone)) return "Please enter a valid phone number.";
    }
    return "";
  };

  const next = () => {
    const message = stepErrors();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, 2));
  };

  const submit = async () => {
    const message = stepErrors();
    if (message) {
      setError(message);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const record = await base44.entities.Booking.create({
        ...form,
        status: "Pending",
      });
      setSubmitted(record);
    } catch (e) {
      setError("We couldn't send your request just now. Please call the studio and we'll sort it out.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSubmitted(null);
    setStep(0);
    setForm({
      service_category: "",
      service: "",
      preferred_date: "",
      preferred_time: "",
      full_name: "",
      email: "",
      phone: "",
      notes: "",
    });
  };

  const prettyDate = form.preferred_date
    ? new Date(`${form.preferred_date}T12:00:00`).toLocaleDateString("en-CA", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="border border-gold/30 bg-[#0f0f0f] p-8 md:p-12"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="mt-6 display-xl text-3xl text-ivory">Your request is in.</h3>
        <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-ivory/55">
          Thank you, {submitted.full_name.split(" ")[0]}. The studio will call you on{" "}
          {submitted.phone} to confirm your appointment. Requests are usually confirmed during
          opening hours.
        </p>

        <dl className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
          {[
            ["Service", `${submitted.service} (${submitted.service_category})`],
            ["Requested", prettyDate],
            ["Time", submitted.preferred_time],
            ["Status", "Pending confirmation"],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="font-body text-[0.55rem] uppercase tracking-[0.24em] text-ivory/35">{term}</dt>
              <dd className="mt-1 font-body text-sm text-ivory/85">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-9 flex flex-wrap gap-3">
          <LuxeButton to="/" variant="gold">
            Back to home
          </LuxeButton>
          <button
            onClick={reset}
            className="border border-white/15 px-8 py-4 font-body text-[0.64rem] uppercase tracking-[0.26em] text-ivory/60 transition-colors hover:border-gold hover:text-gold"
          >
            Book another service
          </button>
        </div>
      </motion.div>
    );
  }

  const STEPS = ["Service", "Date & Time", "Your Details"];

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <aside className="lg:col-span-4">
        <div className="border border-white/10 bg-[#0f0f0f] p-6">
          <p className="font-body text-[0.55rem] uppercase tracking-[0.26em] text-ivory/35">Your selection</p>
          <div className="mt-5 space-y-4">
            <div>
              <p className="font-body text-[0.55rem] uppercase tracking-[0.2em] text-ivory/30">Service</p>
              <p className="mt-1 font-heading text-lg text-ivory">{form.service || "Not selected"}</p>
              <p className="font-body text-[0.7rem] text-ivory/40">{form.service_category || ""}</p>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center gap-2.5">
              <Calendar className="h-3.5 w-3.5 text-gold" />
              <span className="font-body text-[0.78rem] text-ivory/65">{prettyDate}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="h-3.5 w-3.5 text-gold" />
              <span className="font-body text-[0.78rem] text-ivory/65">{form.preferred_time || "—"}</span>
            </div>
          </div>
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="font-body text-[0.7rem] leading-relaxed text-ivory/35">
              Requests are confirmed by phone — your slot isn't held until we speak.
            </p>
          </div>
        </div>
      </aside>

      <div className="lg:col-span-8">
        <div className="flex items-center gap-3">
          {STEPS.map((name, i) => (
            <div key={name} className="flex flex-1 items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border font-body text-[0.6rem] transition-colors ${
                    i < step
                      ? "border-gold bg-gold text-ink"
                      : i === step
                      ? "border-gold text-gold"
                      : "border-white/20 text-ivory/35"
                  }`}
                >
                  {i < step ? <Check className="h-3 w-3" /> : `0${i + 1}`}
                </span>
                <span
                  className={`hidden font-body text-[0.55rem] uppercase tracking-[0.2em] sm:block ${
                    i === step ? "text-ivory" : "text-ivory/35"
                  }`}
                >
                  {name}
                </span>
              </div>
              {i < STEPS.length - 1 ? <span className="h-px flex-1 bg-white/10" /> : null}
            </div>
          ))}
        </div>

        <div className="mt-8 border border-white/10 bg-[#0f0f0f] p-6 md:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <div>
                  <h3 className="font-heading text-2xl text-ivory">Choose your service</h3>
                  <p className="mt-2 font-body text-[0.82rem] text-ivory/45">
                    Pick a category, then the service you're after.
                  </p>

                  <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
                    {SERVICE_CATEGORIES.map((category) => {
                      const selected = form.service_category === category.name;
                      return (
                        <button
                          key={category.slug}
                          type="button"
                          onClick={() => set("service_category", category.name)}
                          className={`border px-4 py-4 text-left transition-colors duration-300 ${
                            selected
                              ? "border-gold bg-gold/10"
                              : "border-white/12 hover:border-white/30"
                          }`}
                        >
                          <span className={`font-heading text-lg ${selected ? "text-gold" : "text-ivory"}`}>
                            {category.name}
                          </span>
                          <span className="mt-1 block font-body text-[0.55rem] uppercase tracking-[0.18em] text-ivory/35">
                            {category.tagline}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {activeCategory && (
                    <div className="mt-6">
                      <span className={labelCls}>Specific service</span>
                      <div className="grid gap-2">
                        {activeCategory.services.map((service) => {
                          const selected = form.service === service.name;
                          return (
                            <button
                              key={service.slug}
                              type="button"
                              onClick={() => set("service", service.name)}
                              className={`flex items-center justify-between border px-4 py-3 text-left transition-colors duration-300 ${
                                selected ? "border-gold/70 bg-gold/[0.07]" : "border-white/10 hover:border-white/25"
                              }`}
                            >
                              <span>
                                <span className={`font-body text-sm ${selected ? "text-gold" : "text-ivory/90"}`}>
                                  {service.name}
                                </span>
                                <span className="mt-0.5 block font-body text-[0.72rem] text-ivory/40">
                                  {service.summary}
                                </span>
                              </span>
                              <span
                                className={`ml-4 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                  selected ? "border-gold bg-gold text-ink" : "border-white/25"
                                }`}
                              >
                                {selected ? <Check className="h-2.5 w-2.5" /> : null}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 className="font-heading text-2xl text-ivory">Pick a date &amp; time</h3>
                  <p className="mt-2 font-body text-[0.82rem] text-ivory/45">
                    Tell us when suits you and we'll confirm availability by phone.
                  </p>

                  <div className="mt-6">
                    <label className={labelCls} htmlFor="preferred_date">
                      Preferred date
                    </label>
                    <input
                      id="preferred_date"
                      type="date"
                      min={today}
                      value={form.preferred_date}
                      onChange={(e) => set("preferred_date", e.target.value)}
                      className={`${field} [color-scheme:dark]`}
                    />
                  </div>

                  <div className="mt-6">
                    <span className={labelCls}>Preferred time</span>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                      {TIME_SLOTS.map((slot) => {
                        const selected = form.preferred_time === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => set("preferred_time", slot)}
                            className={`border px-2 py-2.5 font-body text-[0.72rem] tracking-wide transition-colors duration-300 ${
                              selected
                                ? "border-gold bg-gold text-ink"
                                : "border-white/12 text-ivory/70 hover:border-white/30"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="font-heading text-2xl text-ivory">Your details</h3>
                  <p className="mt-2 font-body text-[0.82rem] text-ivory/45">
                    So the studio can reach you to confirm.
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor="full_name">
                        Full name *
                      </label>
                      <input
                        id="full_name"
                        value={form.full_name}
                        onChange={(e) => set("full_name", e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, full_name: true }))}
                        placeholder="Your name"
                        className={field}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="phone">
                        Phone number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="778 000 0000"
                        className={field}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls} htmlFor="email">
                        Email address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="you@email.com"
                        className={field}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls} htmlFor="notes">
                        Additional notes
                      </label>
                      <textarea
                        id="notes"
                        rows={4}
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="Hair length, inspiration, allergies, anything we should know."
                        className={field}
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {error ? (
            <p className="mt-5 border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-[0.78rem] text-red-300">
              {error}
            </p>
          ) : null}

          <div className="mt-7 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                setError("");
                setStep((s) => Math.max(0, s - 1));
              }}
              disabled={step === 0}
              className="inline-flex items-center gap-2 font-body text-[0.62rem] uppercase tracking-[0.24em] text-ivory/45 transition-colors hover:text-ivory disabled:opacity-30"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>

            {step < 2 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-body text-[0.64rem] uppercase tracking-[0.26em] text-ink transition-colors hover:bg-gold-light"
              >
                Continue <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-body text-[0.64rem] uppercase tracking-[0.26em] text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending
                  </>
                ) : (
                  <>
                    Request appointment <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <p className="mt-5 font-body text-[0.68rem] leading-relaxed text-ivory/30">
          By requesting an appointment you agree to our{" "}
          <Link to="/terms" className="text-ivory/50 underline decoration-gold/40 underline-offset-2">
            terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="text-ivory/50 underline decoration-gold/40 underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}