import { useEffect } from "react";
import { Reveal, MaskLine } from "@/components/site/Reveal";

export default function PageHero({ eyebrow, title, description, children, seoTitle }) {
  useEffect(() => {
    if (typeof title !== "string") return;
    document.title = seoTitle || `${title} | The Luxe Studio — Surrey, BC`;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description, seoTitle]);

  return (
    <section className="grain relative overflow-hidden border-b border-white/10 bg-ink pb-14 pt-32 md:pb-20 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(200,169,107,0.14),transparent_55%)]" />
      <div className="container-luxe relative z-10">
        {eyebrow ? (
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
        ) : null}
        <h1 className="mt-5 display-xl text-[2.4rem] text-ivory sm:text-[3.2rem] lg:text-[4rem]">
          <MaskLine delay={0.08}>{title}</MaskLine>
        </h1>
        {description ? (
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-[0.95rem] leading-[1.85] text-ivory/55">
              {description}
            </p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}