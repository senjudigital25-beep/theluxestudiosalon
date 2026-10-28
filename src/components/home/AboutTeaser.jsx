import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/siteData";
import { Reveal } from "@/components/site/Reveal";
import LuxeButton from "@/components/site/LuxeButton";

const APPROACH = [
  {
    title: "We listen first",
    text: "Every visit opens with a conversation about your hair, your routine and what you want to change — never a rushed assumption.",
  },
  {
    title: "We work with your hair",
    text: "Texture, growth pattern and condition guide the cut and colour, so the result suits you rather than the trend of the month.",
  },
  {
    title: "We finish properly",
    text: "The line-up, the blow-dry, the product advice — the details that make a style last past the first wash.",
  },
];

export default function AboutTeaser() {
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden bg-charcoal">
                <Image
                  src={IMAGES.interior}
                  alt="Inside The Luxe Studio, a premium unisex salon in Surrey, BC"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden w-40 bg-ink p-5 ring-1 ring-gold/25 sm:block md:w-48">
                <p className="font-heading text-[0.65rem] uppercase tracking-[0.28em] text-gold">Surrey, BC</p>
                <p className="mt-2 font-body text-[0.6rem] uppercase leading-relaxed tracking-[0.14em] text-ivory/45">
                  A unisex studio for hair, barbering &amp; beauty
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <Reveal>
            <p className="eyebrow">About the studio</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 display-xl text-[2.1rem] text-ivory sm:text-[2.8rem] lg:text-[3.2rem]">
              More than a salon.
              <br />
              <span className="italic text-gold">An experience.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl font-body text-[0.95rem] leading-[1.85] text-ivory/55">
              The Luxe Studio brings together modern style, expert craftsmanship, and a premium
              salon experience. Our goal is to help every client feel confident, refreshed, and
              comfortable with a style that reflects their personality.
            </p>
          </Reveal>

          <div className="mt-9 space-y-6">
            {APPROACH.map((item, i) => (
              <Reveal key={item.title} delay={0.2 + i * 0.08}>
                <div className="flex gap-5">
                  <span className="mt-1 font-heading text-xs tracking-[0.2em] text-gold">0{i + 1}</span>
                  <div className="border-l border-white/10 pl-5">
                    <h3 className="font-heading text-[1.15rem] text-ivory">{item.title}</h3>
                    <p className="mt-1 font-body text-[0.85rem] leading-relaxed text-ivory/50">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <LuxeButton to="/book" variant="gold">
                Book an appointment
              </LuxeButton>
              <Link
                to="/about"
                className="inline-flex items-center px-2 py-4 font-body text-[0.64rem] uppercase tracking-[0.26em] text-ivory/60 transition-colors hover:text-gold"
              >
                Our story
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}