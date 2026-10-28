import { Instagram } from "lucide-react";
import { BRAND } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import GalleryGrid from "@/components/site/GalleryGrid";
import VideoCarousel from "@/components/site/VideoCarousel";
import SectionHeading from "@/components/site/SectionHeading";
import BookingCTA from "@/components/home/BookingCTA";
import { Reveal } from "@/components/site/Reveal";

export default function OurWork() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="The Luxe Experience"
        description="Every detail matters. Explore our latest styles, transformations, and signature salon experiences — shot in the studio, not staged."
      />

      <section className="container-luxe py-16 md:py-24">
        <GalleryGrid />
        <Reveal>
          <div className="mt-12 flex justify-center">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-3 border border-gold/35 px-8 py-4 font-body text-[0.64rem] uppercase tracking-[0.26em] text-gold transition-colors duration-500 hover:bg-gold hover:text-ink"
            >
              <Instagram className="h-4 w-4" /> Follow us on Instagram
            </a>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-white/10 bg-[#0d0d0d] py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="In motion"
            title={
              <>
                Client <span className="italic text-gold">results</span>
              </>
            }
            description="Short clips from the studio floor — the cut, the finish and the moment it comes together."
          />
          <div className="mt-12">
            <VideoCarousel />
          </div>
        </div>
      </section>

      <section className="container-luxe py-16">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 border border-white/10 px-8 py-10 text-center md:flex-row md:text-left">
            <div>
              <p className="eyebrow">See it as it happens</p>
              <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-ivory/50">
                New work is posted to Instagram first. Follow the studio for recent cuts, colour and
                barbering — {BRAND.instagramHandle}
              </p>
            </div>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="border border-gold/40 px-8 py-4 font-body text-[0.62rem] uppercase tracking-[0.26em] text-gold transition-colors duration-500 hover:bg-gold hover:text-ink"
            >
              Open Instagram
            </a>
          </div>
        </Reveal>
      </section>

      <BookingCTA />
    </>
  );
}