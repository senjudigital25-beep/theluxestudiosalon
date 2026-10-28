import Hero from "@/components/home/Hero";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesPanels from "@/components/home/ServicesPanels";
import WhyChoose from "@/components/home/WhyChoose";
import GalleryPreview from "@/components/home/GalleryPreview";
import BookingCTA from "@/components/home/BookingCTA";
import SectionHeading from "@/components/site/SectionHeading";
import VideoCarousel from "@/components/site/VideoCarousel";
import { Reveal } from "@/components/site/Reveal";
import { BRAND } from "@/lib/siteData";

const MARQUEE = ["Hair", "Barbering", "Beauty", "Surrey BC", "Unisex Salon", "Modern Style"];

export default function Home() {
  return (
    <>
      <Hero />

      <div className="overflow-hidden border-y border-white/10 bg-charcoal/50 py-4">
        <div className="marquee-track flex w-max items-center gap-10">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10" aria-hidden={copy === 1}>
              {MARQUEE.map((word) => (
                <span key={word} className="flex items-center gap-10">
                  <span className="font-heading text-[0.8rem] uppercase tracking-[0.42em] text-ivory/35">
                    {word}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gold/50" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AboutTeaser />

      <section id="services" className="border-y border-white/10 bg-[#0d0d0d] py-24 md:py-32">
        <div className="container-luxe">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="The Services"
              title={
                <>
                  Crafted for every <span className="italic text-gold">look</span>
                </>
              }
              description="Three disciplines under one roof — hair, barbering and beauty — in a unisex studio built for how you actually want to look."
            />
            <Reveal delay={0.2}>
              <p className="font-body text-[0.6rem] uppercase tracking-[0.26em] text-ivory/35">
                Hair · Barbering · Beauty
              </p>
            </Reveal>
          </div>
          <div className="mt-12">
            <ServicesPanels />
          </div>
        </div>
      </section>

      <section className="container-luxe py-24 md:py-32">
        <SectionHeading
          eyebrow="Client Results"
          title={
            <>
              Watch the <span className="italic text-gold">work</span>
            </>
          }
          description="Real clips from the studio floor — transformations, blade work and the atmosphere that makes an appointment feel like an occasion."
        />
        <div className="mt-12">
          <VideoCarousel />
        </div>
      </section>

      <GalleryPreview />

      <section className="border-y border-white/10 bg-[#0d0d0d] py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Why The Luxe Studio"
            title="The details you notice later"
            description="No promises we can't keep — just the standards we hold every appointment to."
            align="center"
            className="mx-auto"
          />
          <div className="mt-12">
            <WhyChoose />
          </div>
        </div>
      </section>

      <BookingCTA />

      <section className="container-luxe py-20">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 border border-gold/20 px-8 py-10 text-center md:flex-row md:text-left">
            <div>
              <p className="eyebrow">Find us on Instagram</p>
              <p className="mt-3 font-heading text-2xl text-ivory">{BRAND.instagramHandle}</p>
              <p className="mt-1 font-body text-[0.8rem] text-ivory/45">
                New work, transformations and studio updates — posted as it happens.
              </p>
            </div>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="border border-gold/40 px-8 py-4 font-body text-[0.62rem] uppercase tracking-[0.26em] text-gold transition-colors duration-500 hover:bg-gold hover:text-ink"
            >
              Follow us on Instagram
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}