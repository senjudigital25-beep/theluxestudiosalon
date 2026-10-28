import { Phone, MapPin } from "lucide-react";
import { BRAND } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import BookingForm from "@/components/site/BookingForm";
import { Reveal } from "@/components/site/Reveal";

export default function Book() {
  const params = new URLSearchParams(window.location.search);
  const initialService = params.get("service") || "";

  return (
    <>
      <PageHero
        eyebrow="Book an appointment"
        title="Your chair is waiting"
        description="Tell us what you'd like and when. We'll call you back to confirm the exact time — no deposit, no online payment."
      />

      <section className="container-luxe py-14 md:py-20">
        <BookingForm initialService={initialService} />
      </section>

      <section className="border-t border-white/10 bg-[#0d0d0d]">
        <div className="container-luxe grid gap-8 py-14 md:grid-cols-3">
          <Reveal>
            <div className="flex items-start gap-4">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <div>
                <p className="font-body text-[0.55rem] uppercase tracking-[0.24em] text-ivory/35">
                  Prefer to call?
                </p>
                <a
                  href={BRAND.phoneHref}
                  className="mt-1 block font-heading text-xl text-ivory transition-colors hover:text-gold"
                >
                  {BRAND.phone}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex items-start gap-4">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <div>
                <p className="font-body text-[0.55rem] uppercase tracking-[0.24em] text-ivory/35">Studio</p>
                <p className="mt-1 font-heading text-xl text-ivory">{BRAND.location}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              <p className="font-body text-[0.55rem] uppercase tracking-[0.24em] text-ivory/35">Good to know</p>
              <p className="mt-1 font-body text-[0.82rem] leading-relaxed text-ivory/50">
                Requests are confirmed by phone. If you need to change or cancel, just call the
                studio.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}