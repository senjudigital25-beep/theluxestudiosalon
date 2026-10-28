import { Image } from "@/components/ui/image";
import { IMAGES, BRAND } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import WhyChoose from "@/components/home/WhyChoose";
import BookingCTA from "@/components/home/BookingCTA";
import { Reveal } from "@/components/site/Reveal";
import LuxeButton from "@/components/site/LuxeButton";

const PILLARS = [
  {
    title: "Our story",
    body: "The Luxe Studio was built around a simple idea: a salon visit should feel considered from the moment you walk in. Hair, barbering and beauty live under one roof in Surrey, British Columbia, so the whole look can be shaped in one place — without being sent from chair to chair.",
  },
  {
    title: "Our approach",
    body: "We start with the consultation. Your hair's texture, its history, your routine and the time you actually have in the morning all matter more than a photograph. From there we recommend what will work — and tell you honestly when something won't.",
  },
  {
    title: "Our commitment",
    body: "Clean tools, careful technique and an unhurried appointment. We would rather take the time to get a line right than rush the next client in. If a result needs more than one visit, we will map it out with you rather than over-process your hair.",
  },
  {
    title: "The atmosphere",
    body: "Warm light, low noise and a space that feels private even when the studio is busy. Come in for a full transformation or a fifteen-minute tidy — both get the same attention.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        title="More than a salon. An experience."
        description="A premium unisex studio in Surrey, British Columbia, where modern barbering, expert hair styling and beauty services come together."
      />

      <section className="container-luxe py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden bg-charcoal">
                  <Image
                    src={IMAGES.interior}
                    alt="Interior of The Luxe Studio in Surrey, British Columbia"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -left-4 -top-4 hidden h-24 w-24 border-l border-t border-gold/40 sm:block" />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 border border-white/10 p-6">
                <p className="font-body text-[0.55rem] uppercase tracking-[0.26em] text-ivory/35">Find us</p>
                <p className="mt-3 font-heading text-xl text-ivory">{BRAND.location}</p>
                <a
                  href={BRAND.phoneHref}
                  className="mt-2 inline-block font-body text-sm text-gold transition-colors hover:text-gold-light"
                >
                  {BRAND.phone}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <div className="space-y-10">
              {PILLARS.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 0.07}>
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-heading text-[0.7rem] tracking-[0.24em] text-gold">0{i + 1}</span>
                      <h2 className="font-heading text-[1.6rem] text-ivory">{pillar.title}</h2>
                    </div>
                    <p className="mt-3 max-w-2xl font-body text-[0.93rem] leading-[1.85] text-ivory/55">
                      {pillar.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-wrap gap-3">
                <LuxeButton to="/book" variant="gold">
                  Book an appointment
                </LuxeButton>
                <LuxeButton to="/services" variant="outline">
                  Explore services
                </LuxeButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0d0d] py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Why clients choose us"
            title="The standards behind the chair"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12">
            <WhyChoose />
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}