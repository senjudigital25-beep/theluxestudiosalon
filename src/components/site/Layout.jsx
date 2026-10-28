import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

function FloatingBook() {
  const location = useLocation();
  if (location.pathname === "/book" || location.pathname === "/admin") return null;
  return (
    <Link
      to="/book"
      aria-label="Book an appointment"
      className="group fixed bottom-7 right-7 z-40 hidden h-20 w-20 items-center justify-center rounded-full bg-gold text-ink shadow-[0_18px_45px_-12px_rgba(200,169,107,0.65)] transition-transform duration-500 hover:scale-105 lg:flex"
    >
      <span className="absolute inset-1 rounded-full border border-ink/25 slow-spin" />
      <span className="font-body text-[0.6rem] font-medium uppercase tracking-[0.22em]">Book</span>
    </Link>
  );
}

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-ink text-ivory">
      <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
        <div className="absolute inset-3 border border-gold/15" />
      </div>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingBook />
    </div>
  );
}