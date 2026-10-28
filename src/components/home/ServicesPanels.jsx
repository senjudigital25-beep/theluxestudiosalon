import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { SERVICE_CATEGORIES } from "@/lib/siteData";
import { Reveal } from "@/components/site/Reveal";

export default function ServicesPanels() {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Desktop: expanding panels */}
      <div className="hidden gap-3 lg:flex lg:h-[560px]">
        {SERVICE_CATEGORIES.map((category, index) => {
          const isActive = index === active;
          return (
            <Link
              key={category.slug}
              to={`/services#${category.slug}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={`group relative overflow-hidden bg-charcoal transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? "flex-[2.6]" : "flex-[1]"
              }`}
            >
              <Image
                src={category.image}
                alt={`${category.name} services at The Luxe Studio`}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ${
                  isActive ? "scale-100 opacity-100" : "scale-105 opacity-45 grayscale"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" />
              <div className="relative flex h-full flex-col justify-between p-8">
                <div className="flex items-start justify-between">
                  <span className="font-heading text-xs uppercase tracking-[0.3em] text-gold">
                    0{index + 1}
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 transition-all duration-700 ${
                      isActive ? "translate-x-0 text-gold opacity-100" : "-translate-x-2 text-ivory/40 opacity-0"
                    }`}
                  />
                </div>

                <div>
                  <h3 className="display-xl text-[2.2rem] text-ivory">{category.name}</h3>
                  <p className="mt-1 font-body text-[0.6rem] uppercase tracking-[0.26em] text-gold/80">
                    {category.tagline}
                  </p>
                  <div
                    className={`grid transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-sm font-body text-sm leading-relaxed text-ivory/65">
                        {category.short}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                        {category.services.map((service) => (
                          <li
                            key={service.slug}
                            className="font-body text-[0.62rem] uppercase tracking-[0.16em] text-ivory/45"
                          >
                            {service.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile / tablet: stacked cards */}
      <div className="grid gap-5 sm:grid-cols-3 lg:hidden">
        {SERVICE_CATEGORIES.map((category, index) => (
          <Reveal key={category.slug} delay={index * 0.08}>
            <Link to={`/services#${category.slug}`} className="group block overflow-hidden bg-charcoal">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={category.image}
                  alt={`${category.name} services at The Luxe Studio`}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="display-xl text-[1.7rem] text-ivory">{category.name}</h3>
                  <p className="mt-1 font-body text-[0.55rem] uppercase tracking-[0.24em] text-gold/80">
                    {category.tagline}
                  </p>
                </div>
              </div>
              <div className="p-5">
                <p className="font-body text-[0.85rem] leading-relaxed text-ivory/55">{category.short}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-body text-[0.6rem] uppercase tracking-[0.24em] text-gold">
                  View services <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}