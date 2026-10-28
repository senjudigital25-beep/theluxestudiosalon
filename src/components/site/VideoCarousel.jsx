import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { VIDEOS } from "@/lib/siteData";
import { Reveal } from "@/components/site/Reveal";

export default function VideoCarousel() {
  const trackRef = useRef(null);
  const [playing, setPlaying] = useState(null);
  const videoRefs = useRef([]);

  const scrollBy = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.72;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const toggle = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;
    if (playing === index) {
      video.pause();
      setPlaying(null);
    } else {
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) v.pause();
      });
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
      setPlaying(index);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <Reveal>
          <p className="font-body text-[0.62rem] uppercase tracking-[0.26em] text-ivory/40">
            {VIDEOS.length} clips · tap to play
          </p>
        </Reveal>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous clips"
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-ivory/70 transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next clips"
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-ivory/70 transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0"
      >
        {VIDEOS.map((video, index) => (
          <div
            key={video.src}
            className="group relative w-[74vw] shrink-0 snap-start overflow-hidden bg-charcoal sm:w-[46vw] lg:w-[300px]"
          >
            <div className="relative aspect-[9/16] w-full">
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={video.src}
                className="h-full w-full object-cover"
                preload={index === 0 ? "metadata" : "none"}
                playsInline
                loop
                muted
                onEnded={() => setPlaying(null)}
              />
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/20 transition-opacity duration-500 ${
                  playing === index ? "opacity-0" : "opacity-100"
                }`}
              />
              <button
                onClick={() => toggle(index)}
                aria-label={playing === index ? `Pause clip ${index + 1}` : `Play clip ${index + 1}`}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-ink/50 backdrop-blur transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink ${
                    playing === index ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                  }`}
                >
                  {playing === index ? (
                    <Pause className="h-4 w-4 text-ivory" />
                  ) : (
                    <Play className="ml-0.5 h-4 w-4 text-gold group-hover:text-ink" />
                  )}
                </span>
              </button>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-4">
                <span className="font-body text-[0.58rem] uppercase tracking-[0.22em] text-ivory/75">
                  {video.label}
                </span>
                <span className="font-body text-[0.58rem] tracking-[0.18em] text-gold/70">
                  0{index + 1}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}