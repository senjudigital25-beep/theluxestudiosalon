import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Dashboard from "@/components/admin/Dashboard";

export default function Admin() {
  const [state, setState] = useState({ loading: true, user: null });
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    base44.auth
      .me()
      .then((user) => {
        setState({ loading: false, user });
        setDenied(user?.role !== "admin");
      })
      .catch(() => {
        setState({ loading: false, user: null });
        setDenied(true);
      });
  }, []);

  if (state.loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center gap-3">
        <Loader2 className="h-4 w-4 animate-spin text-gold" />
        <span className="font-body text-[0.7rem] uppercase tracking-[0.24em] text-ivory/40">
          Checking access
        </span>
      </div>
    );
  }

  if (denied) {
    return (
      <section className="container-luxe flex min-h-[75vh] max-w-xl flex-col items-center justify-center py-28 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
          <Lock className="h-5 w-5" />
        </span>
        <p className="mt-7 eyebrow">Restricted area</p>
        <h1 className="mt-4 display-xl text-[2.2rem] text-ivory">Studio staff only</h1>
        <p className="mt-4 font-body text-[0.9rem] leading-relaxed text-ivory/50">
          This dashboard holds client bookings and enquiries. Sign in with the salon's administrator
          account to continue.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => base44.auth.redirectToLogin("/admin")}
            className="bg-gold px-8 py-4 font-body text-[0.62rem] uppercase tracking-[0.26em] text-ink transition-colors hover:bg-gold-light"
          >
            Sign in
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-white/15 px-8 py-4 font-body text-[0.62rem] uppercase tracking-[0.26em] text-ivory/60 transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>
        </div>
      </section>
    );
  }

  return <Dashboard user={state.user} />;
}