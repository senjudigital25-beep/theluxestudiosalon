import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { Image } from "@/components/ui/image";
import { BRAND, IMAGES } from "@/lib/siteData";
import { Reveal } from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import LuxeButton from "@/components/site/LuxeButton";

const PREVIEW = [IMAGES.colour, IMAGES.fade, IMAGES.glam, IMAGES.chair];

export default function GalleryPreview() {
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Our Work"
          title={
            <>
              The Luxe <span className="italic text-gold">Experience</span>
            </>
          }
          description="Every detail matters. Explore our latest styles, transformations, and signature salon experiences."
        />
        <Reveal delay={0.2}>
          <LuxeButton to="/our-work" variant="outline">
            View the gallery
          </LuxeButton>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {PREVIEW.map((src, i) => (
          <Reveal key={src} delay={i * 0.07}>
            <Link
              to="/our-work"
              className={`group relative block overflow-hidden bg-charcoal ${
                i % 2 === 1 ? "mt-6 md:mt-10" : ""
              }`}
            >
              <div className="aspect-[3/4]">
                <Image
                  src={src}
                  alt="The Luxe Studio work"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-ink/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 flex justify-center">
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-3 border border-gold/35 px-8 py-4 font-body text-[0.64rem] uppercase tracking-[0.26em] text-gold transition-colors duration-500 hover:bg-gold hover:text-ink"
          >
            <Instagram className="h-4 w-4" />
            Follow us on Instagram
          </a>
        </div>
      </Reveal>
    </section>
  );
}