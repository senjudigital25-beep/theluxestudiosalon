import { Sparkles, Scissors, UserRound, Eye, Gem, MessageCircle } from "lucide-react";
import { WHY_CHOOSE } from "@/lib/siteData";
import { Reveal } from "@/components/site/Reveal";

const ICONS = [Sparkles, Scissors, UserRound, Eye, Gem, MessageCircle];

export default function WhyChoose() {
  return (
    <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
      {WHY_CHOOSE.map((item, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <Reveal key={item.title} delay={i * 0.06}>
            <div className="group relative h-full bg-ink px-7 py-9 transition-colors duration-700 hover:bg-charcoal">
              <Icon className="h-6 w-6 text-gold transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-110" />
              <h3 className="mt-6 font-heading text-[1.4rem] leading-snug text-ivory">{item.title}</h3>
              <p className="mt-2.5 font-body text-[0.85rem] leading-relaxed text-ivory/50">{item.text}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}