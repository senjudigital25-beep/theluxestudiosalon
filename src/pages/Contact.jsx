import { Phone, Instagram, MapPin, Clock } from "lucide-react";
import { BRAND } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/Reveal";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=The+Luxe+Studio+Surrey+BC";

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come and see us"
        description="Questions, quotes or a booking you'd rather talk through — the studio is a call or a message away."
      />

      <section className="container-luxe py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display-xl text-[1.9rem] text-ivory sm:text-[2.3rem]">The Luxe Studio</h2>
              <p className="mt-4 font-body text-[0.9rem] leading-relaxed text-ivory/50">
                A premium unisex salon for hair, barbering and beauty — serving Surrey, British
                Columbia.
              </p>
            </Reveal>

            <div className="mt-9 divide-y divide-white/10 border-y border-white/10">
              <Reveal delay={0.05}>
                <a href={BRAND.phoneHref} className="group flex items-center gap-4 py-5">
                  <span className="flex h-10 w-10 items-center justify-center border border-white/15 text-gold transition-colors group-hover:border-gold">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block font-body text-[0.55rem] uppercase tracking-[0.24em] text-ivory/35">
                      Call the studio
                    </span>
                    <span className="mt-0.5 block font-body text-[0.95rem] text-ivory transition-colors group-hover:text-gold">
                      {BRAND.phone}
                    </span>
                  </span>
                </a>
              </Reveal>

              <Reveal delay={0.1}>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center border border-white/15 text-gold transition-colors group-hover:border-gold">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block font-body text-[0.55rem] uppercase tracking-[0.24em] text-ivory/35">
                      Location
                    </span>
                    <span className="mt-0.5 block font-body text-[0.95rem] text-ivory transition-colors group-hover:text-gold">
                      {BRAND.location}
                    </span>
                    <span className="mt-0.5 block font-body text-[0.7rem] text-ivory/35">
                      Open in Google Maps for directions
                    </span>
                  </span>
                </a>
              </Reveal>

              <Reveal delay={0.15}>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center border border-white/15 text-gold transition-colors group-hover:border-gold">
                    <Instagram className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block font-body text-[0.55rem] uppercase tracking-[0.24em] text-ivory/35">
                      Instagram
                    </span>
                    <span className="mt-0.5 block font-body text-[0.95rem] text-ivory transition-colors group-hover:text-gold">
                      {BRAND.instagramHandle}
                    </span>
                  </span>
                </a>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex items-center gap-4 py-5">
                  <span className="flex h-10 w-10 items-center justify-center border border-white/15 text-gold">
                    <Clock className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block font-body text-[0.55rem] uppercase tracking-[0.24em] text-ivory/35">
                      Opening hours
                    </span>
                    <span className="mt-0.5 block font-body text-[0.85rem] leading-relaxed text-ivory/60">
                      Hours vary by day — call the studio for today's availability.
                    </span>
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 block aspect-[16/9] overflow-hidden border border-white/10 bg-charcoal"
              >
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                  <MapPin className="h-5 w-5 text-gold" />
                  <p className="font-heading text-lg text-ivory">Surrey, British Columbia</p>
                  <p className="font-body text-[0.6rem] uppercase tracking-[0.24em] text-gold/80">
                    Get directions
                  </p>
                </div>
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}