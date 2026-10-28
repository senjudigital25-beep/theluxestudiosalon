import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Image } from "@/components/ui/image";
import { findService, ALL_SERVICES, SERVICE_CATEGORIES } from "@/lib/siteData";
import { Reveal, MaskLine } from "@/components/site/Reveal";
import LuxeButton from "@/components/site/LuxeButton";
import BookingCTA from "@/components/home/BookingCTA";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = findService(slug);

  useEffect(() => {
    if (!service) {
      document.title = "Service not found | The Luxe Studio";
      const meta = document.createElement("meta");
      meta.name = "prerender-status-code";
      meta.content = "404";
      document.head.appendChild(meta);
      return () => document.head.removeChild(meta);
    }
    document.title = `${service.name} in Surrey, BC | The Luxe Studio`;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", `${service.summary} ${service.name} at The Luxe Studio, a premium unisex salon in Surrey, British Columbia.`);
    }
  }, [service]);

  if (!service) {
    return (
      <section className="container-luxe flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
        <p className="eyebrow">Not found</p>
        <h1 className="mt-5 display-xl text-4xl text-ivory">We couldn't find that service.</h1>
        <p className="mt-4 max-w-md font-body text-sm text-ivory/50">
          It may have been renamed. Browse the full menu to find what you're looking for.
        </p>
        <LuxeButton to="/services" variant="gold" className="mt-8">
          View all services
        </LuxeButton>
      </section>
    );
  }

  const category = SERVICE_CATEGORIES.find((c) => c.name === service.category);
  const related = ALL_SERVICES.filter((s) => s.categorySlug === service.categorySlug && s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-ink pb-16 pt-32 md:pt-40">
        <div className="absolute inset-0">
          <Image src={service.image} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/55" />
        </div>

        <div className="container-luxe relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-body text-[0.58rem] uppercase tracking-[0.24em] text-ivory/45 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-3 w-3" /> All services
          </Link>

          <p className="mt-8 eyebrow">{service.category}</p>
          <h1 className="mt-4 display-xl text-[2.4rem] text-ivory sm:text-[3.2rem] lg:text-[3.9rem]">
            <MaskLine>{service.name}</MaskLine>
          </h1>
          <p className="mt-6 max-w-xl font-body text-[0.98rem] leading-[1.85] text-ivory/60">
            {service.summary}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <LuxeButton to={`/book?service=${service.slug}`} variant="gold">
              Book this service
            </LuxeButton>
            <LuxeButton href="tel:+17789551516" variant="outline" target="_self" rel="">
              Call the studio
            </LuxeButton>
          </div>
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-heading text-[1.8rem] text-ivory">About this service</h2>
              <p className="mt-5 font-body text-[0.95rem] leading-[1.9] text-ivory/55">{service.description}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-12 font-body text-[0.58rem] uppercase tracking-[0.26em] text-ivory/35">
                What's included
              </h3>
              <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-4">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    <span className="font-body text-[0.9rem] text-ivory/70">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 border border-gold/20 p-6">
                <h3 className="font-heading text-xl text-ivory">How pricing works</h3>
                <p className="mt-2 font-body text-[0.85rem] leading-relaxed text-ivory/50">
                  Every service is priced around hair length, condition and the time it takes. Call
                  the studio or mention what you're after in your booking request and we'll give you
                  an accurate quote before anything starts.
                </p>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="sticky top-28">
                <div className="aspect-[4/5] overflow-hidden bg-charcoal">
                  <Image
                    src={service.image}
                    alt={`${service.name} at The Luxe Studio`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 border border-white/10 p-5">
                  <p className="font-body text-[0.55rem] uppercase tracking-[0.24em] text-ivory/35">
                    Part of
                  </p>
                  <Link
                    to={`/services#${category.slug}`}
                    className="mt-1 inline-flex items-center gap-2 font-heading text-lg text-ivory transition-colors hover:text-gold"
                  >
                    {category.name} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <p className="mt-2 font-body text-[0.78rem] leading-relaxed text-ivory/40">
                    {category.short}
                  </p>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-y border-white/10 bg-[#0d0d0d] py-20">
          <div className="container-luxe">
            <div className="flex items-end justify-between">
              <h2 className="display-xl text-[1.9rem] text-ivory sm:text-[2.4rem]">
                Also in <span className="italic text-gold">{category.name}</span>
              </h2>
              <Link
                to="/services"
                className="hidden font-body text-[0.6rem] uppercase tracking-[0.24em] text-gold transition-colors hover:text-gold-light sm:block"
              >
                View all
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={i * 0.05}>
                  <Link to={`/services/${item.slug}`} className="group block">
                    <div className="aspect-[4/5] overflow-hidden bg-charcoal">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-4 font-heading text-[1.2rem] text-ivory transition-colors group-hover:text-gold">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-body text-[0.78rem] leading-relaxed text-ivory/40">
                      {item.summary}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <BookingCTA />
    </>
  );
}