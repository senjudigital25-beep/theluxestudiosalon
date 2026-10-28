import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Instagram, ArrowDown } from "lucide-react";
import { Image } from "@/components/ui/image";
import { BRAND, IMAGES } from "@/lib/siteData";
import { MaskLine, FadeUp } from "@/components/site/Reveal";
import LuxeButton from "@/components/site/LuxeButton";

export default function Hero() {
  const ref = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(35);
  const sx = useSpring(mx, { stiffness: 40, damping: 22 });
  const sy = useSpring(my, { stiffness: 40, damping: 22 });
  const spotlight = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}% ${y}%, rgba(200,169,107,0.16), transparent 65%)`
  );

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="grain relative overflow-hidden bg-ink pb-16 pt-28 md:pb-24 md:pt-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(200,169,107,0.13),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {[16.6, 33.3, 50, 66.6, 83.3].map((left) => (
          <span key={left} className="absolute top-0 h-full w-px bg-white/[0.04]" style={{ left: `${left}%` }} />
        ))}
      </div>
      <motion.div className="pointer-events-none absolute inset-0 z-10 hidden mix-blend-screen lg:block" style={{ background: spotlight }} />

      <div className="container-luxe relative z-20 grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <FadeUp delay={0.1}>
            <p className="eyebrow">Surrey, British Columbia · Unisex Salon</p>
          </FadeUp>

          <h1 className="mt-7 display-xl text-[2.65rem] text-ivory sm:text-[3.6rem] lg:text-[4.35rem] xl:text-[5rem]">
            <MaskLine delay={0.18}>Your Style.</MaskLine>
            <MaskLine delay={0.3}>Your Confidence.</MaskLine>
            <MaskLine delay={0.42} className="italic text-gold">
              Your Luxe Experience.
            </MaskLine>
          </h1>

          <FadeUp delay={0.75}>
            <p className="mt-8 max-w-lg font-body text-[0.98rem] leading-[1.8] text-ivory/60">
              Discover a premium unisex salon experience where modern barbering, expert hair
              styling, and beauty services come together.
            </p>
          </FadeUp>

          <FadeUp delay={0.9}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LuxeButton to="/book" variant="gold">
                Book Your Appointment
              </LuxeButton>
              <LuxeButton to="/services" variant="outline">
                Explore Our Services
              </LuxeButton>
            </div>
          </FadeUp>

          <FadeUp delay={1.05}>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 font-body text-[0.62rem] uppercase tracking-[0.24em] text-ivory/50 transition-colors hover:text-gold"
              >
                <Instagram className="h-3.5 w-3.5" />
                {BRAND.instagramHandle}
              </a>
              <span className="hidden h-px w-10 bg-white/15 sm:block" />
              <span className="font-body text-[0.62rem] uppercase tracking-[0.24em] text-ivory/40">
                Hair · Barbering · Beauty
              </span>
            </div>
          </FadeUp>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative ml-auto w-full max-w-[440px]"
          >
            <div className="absolute -left-3 -top-3 h-full w-full border border-gold/30" />
            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
              <Image
                src={IMAGES.hero}
                alt="Client with a sleek blowout styled at The Luxe Studio in Surrey, BC"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-5 py-5">
                <span className="font-heading text-sm uppercase tracking-[0.34em] text-ivory/85">
                  The Luxe Studio
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute -bottom-7 right-4 hidden bg-ink/95 px-5 py-4 ring-1 ring-gold/25 backdrop-blur sm:block"
          >
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-gold">Est. Surrey</p>
            <p className="mt-1 font-body text-[0.6rem] uppercase tracking-[0.2em] text-ivory/50">
              Modern style · Timeless confidence
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-luxe relative z-20 mt-14 hidden items-center gap-3 md:flex">
        <ArrowDown className="h-3.5 w-3.5 animate-bounce text-gold/70" />
        <span className="font-body text-[0.58rem] uppercase tracking-[0.3em] text-ivory/35">Scroll to explore</span>
      </div>
    </section>
  );
}