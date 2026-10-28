import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { SERVICE_CATEGORIES } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import BookingCTA from "@/components/home/BookingCTA";
import LuxeButton from "@/components/site/LuxeButton";

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="The Services"
        title="Hair, barbering & beauty"
        description="Three disciplines, one studio. Choose a category below to see what each service involves — then book the one that fits."
      >
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap gap-2.5">
            {SERVICE_CATEGORIES.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="border border-white/15 px-5 py-2.5 font-body text-[0.6rem] uppercase tracking-[0.24em] text-ivory/60 transition-colors hover:border-gold hover:text-gold"
              >
                {category.name}
              </a>
            ))}
          </div>
        </Reveal>
      </PageHero>

      {SERVICE_CATEGORIES.map((category, index) => (
        <section
          key={category.slug}
          id={category.slug}
          className={`scroll-mt-24 py-20 md:py-28 ${index % 2 === 1 ? "bg-[#0d0d0d]" : ""}`}
        >
          <div className="container-luxe">
            <div className={`grid gap-12 lg:grid-cols-12 ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              <div className="lg:col-span-5 lg:[direction:ltr]">
                <Reveal>
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden bg-charcoal">
                      <Image
                        src={category.image}
                        alt={`${category.name} services at The Luxe Studio`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="absolute left-4 top-4 bg-ink/85 px-3 py-1.5 font-body text-[0.55rem] uppercase tracking-[0.24em] text-gold backdrop-blur">
                      0{index + 1} · {category.name}
                    </span>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7 lg:[direction:ltr] lg:pl-4">
                <Reveal>
                  <h2 className="display-xl text-[2rem] text-ivory sm:text-[2.6rem]">{category.name}</h2>
                  <p className="mt-2 font-body text-[0.6rem] uppercase tracking-[0.28em] text-gold/80">
                    {category.tagline}
                  </p>
                  <p className="mt-5 max-w-xl font-body text-[0.93rem] leading-[1.85] text-ivory/55">
                    {category.description}
                  </p>
                </Reveal>

                <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {category.services.map((service, i) => (
                    <Reveal key={service.slug} delay={i * 0.05}>
                      <Link
                        to={`/services/${service.slug}`}
                        className="group flex items-start justify-between gap-6 py-5 transition-colors"
                      >
                        <div>
                          <h3 className="font-heading text-[1.3rem] text-ivory transition-colors group-hover:text-gold">
                            {service.name}
                          </h3>
                          <p className="mt-1 max-w-lg font-body text-[0.85rem] leading-relaxed text-ivory/45">
                            {service.summary}
                          </p>
                        </div>
                        <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-ivory/25 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold" />
                      </Link>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.1}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <LuxeButton to="/book" variant="gold">
                      Book {category.name.toLowerCase()}
                    </LuxeButton>
                    <LuxeButton to="/contact" variant="outline">
                      Ask a question
                    </LuxeButton>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      <BookingCTA />
    </>
  );
}