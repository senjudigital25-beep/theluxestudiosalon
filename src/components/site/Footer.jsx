import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin } from "lucide-react";
import { BRAND, SERVICE_CATEGORIES } from "@/lib/siteData";
import { Image } from "@/components/ui/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink">
      <div className="container-luxe py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="h-12 w-12 overflow-hidden rounded-full ring-1 ring-gold/40">
                <Image src={BRAND.logo} alt="The Luxe Studio logo" className="h-full w-full object-cover" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-heading text-lg tracking-[0.2em] text-ivory">THE LUXE</span>
                <span className="mt-1 text-[0.5rem] uppercase tracking-[0.44em] text-gold">Studio</span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs font-body text-sm leading-relaxed text-ivory/55">
              Premium unisex salon in Surrey, BC. Modern style. Timeless confidence.
            </p>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center gap-2 font-body text-[0.65rem] uppercase tracking-[0.22em] text-gold transition-colors hover:text-gold-light"
            >
              <Instagram className="h-3.5 w-3.5" /> {BRAND.instagramHandle}
            </a>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-ivory/40">Explore</h4>
            <ul className="mt-5 space-y-3 font-body text-sm text-ivory/70">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Our Work", to: "/our-work" },
                { label: "Book Now", to: "/book" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-ivory/40">Services</h4>
            <ul className="mt-5 space-y-3 font-body text-sm text-ivory/70">
              {SERVICE_CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link to={`/services#${c.slug}`} className="transition-colors hover:text-gold">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="transition-colors hover:text-gold">
                  All services
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-ivory/40">Visit</h4>
            <ul className="mt-5 space-y-4 font-body text-sm text-ivory/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
                <span>{BRAND.location}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
                <a href={BRAND.phoneHref} className="transition-colors hover:text-gold">
                  {BRAND.phone}
                </a>
              </li>
            </ul>
            <Link
              to="/book"
              className="mt-6 inline-flex border border-gold/40 px-6 py-3 font-body text-[0.6rem] uppercase tracking-[0.26em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Book an Appointment
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 font-body text-[0.62rem] uppercase tracking-[0.18em] text-ivory/35 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} The Luxe Studio · Surrey, BC</span>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-gold">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}