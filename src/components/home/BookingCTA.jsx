import { Phone } from "lucide-react";
import { Image } from "@/components/ui/image";
import { BRAND, IMAGES } from "@/lib/siteData";
import { Reveal } from "@/components/site/Reveal";
import LuxeButton from "@/components/site/LuxeButton";

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src={IMAGES.interior} alt="The Luxe Studio salon interior" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
      </div>

      <div className="container-luxe relative z-10 py-24 text-center md:py-32">
        <Reveal>
          <p className="eyebrow">Your chair is waiting</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-6 max-w-3xl display-xl text-[2.2rem] text-ivory sm:text-[3rem] lg:text-[3.6rem]">
            Ready for your <span className="italic text-gold">Luxe</span> experience?
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl font-body text-[0.95rem] leading-[1.8] text-ivory/55">
            Send us a request and we will confirm your appointment by phone. Prefer to talk it
            through first? Call the studio and we will help you choose the right service.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LuxeButton to="/book" variant="gold">
              Book Your Appointment
            </LuxeButton>
            <LuxeButton href={BRAND.phoneHref} variant="outline" target="_self" rel="">
              <span className="inline-flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" /> {BRAND.phone}
              </span>
            </LuxeButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}