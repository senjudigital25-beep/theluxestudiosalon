import { Reveal } from "@/components/site/Reveal";

export default function SectionHeading({ eyebrow, title, description, align = "left", className = "" }) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      ) : null}
      <Reveal delay={0.08}>
        <h2 className="mt-5 display-xl text-[2.1rem] text-ivory sm:text-[2.8rem] lg:text-[3.3rem]">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-6 font-body text-[0.95rem] leading-[1.8] text-ivory/55">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}