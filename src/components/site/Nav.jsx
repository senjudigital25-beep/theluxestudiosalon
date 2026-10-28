import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Instagram, Phone, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/siteData";
import { Image } from "@/components/ui/image";
import LuxeButton from "@/components/site/LuxeButton";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/our-work" },
  { label: "Contact", to: "/contact" },
];

function useSurreyTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "America/Vancouver",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const time = useSurreyTime();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-white/10 bg-ink/90 py-2.5 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink/80 via-ink/30 to-transparent py-4"
        }`}
      >
        <div className="container-luxe flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/40 transition-all duration-700 group-hover:ring-gold">
              <Image
                src={BRAND.logo}
                alt="The Luxe Studio logo"
                className="h-full w-full scale-[1.02] object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-[1.05rem] tracking-[0.2em] text-ivory">THE LUXE</span>
              <span className="mt-1 text-[0.5rem] uppercase tracking-[0.44em] text-gold">Studio</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) => {
              const active =
                link.to === "/" ? location.pathname === "/" : location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`link-underline font-body text-[0.66rem] uppercase tracking-[0.26em] transition-colors duration-500 ${
                    active ? "text-gold" : "text-ivory/75 hover:text-ivory"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={BRAND.phoneHref}
              aria-label="Call The Luxe Studio"
              className="hidden h-10 w-10 items-center justify-center border border-white/15 text-ivory/70 transition-colors duration-500 hover:border-gold hover:text-gold lg:flex"
            >
              <Phone className="h-3.5 w-3.5" />
            </a>
            <LuxeButton to="/book" variant="gold" className="hidden py-3.5 text-[0.62rem] sm:inline-flex">
              Book Now
            </LuxeButton>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-ivory transition-colors duration-500 hover:border-gold hover:text-gold lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ivory text-ink"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-heading text-lg tracking-[0.2em]">THE LUXE STUDIO</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.to}
                    className="group flex items-baseline justify-between border-b border-ink/10 py-3.5"
                  >
                    <span className="font-heading text-[2.1rem] leading-tight tracking-tight">
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-ink/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="px-6 pb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8 }}
            >
              <Link
                to="/book"
                className="flex w-full items-center justify-center bg-ink py-4 font-body text-[0.68rem] uppercase tracking-[0.28em] text-ivory transition-colors hover:bg-gold hover:text-ink"
              >
                Book Your Appointment
              </Link>
              <div className="mt-6 flex items-center justify-between font-body text-[0.6rem] uppercase tracking-[0.2em] text-ink/55">
                <a href={BRAND.phoneHref} className="hover:text-ink">
                  {BRAND.phone}
                </a>
                <span>Surrey, BC · {time}</span>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 hover:text-ink"
                >
                  <Instagram className="h-3.5 w-3.5" /> Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}