import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { GALLERY } from "@/lib/siteData";

export default function GalleryGrid({ items = GALLERY }) {
  const [index, setIndex] = useState(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, items.length]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {items.map((item, i) => (
          <motion.button
            key={item.src + i}
            type="button"
            onClick={() => setIndex(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block w-full break-inside-avoid overflow-hidden bg-charcoal text-left"
          >
            <div className={item.tall ? "aspect-[4/5]" : "aspect-[4/3]"}>
              <Image
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-all duration-[1100ms] group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute inset-0 bg-ink/35 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-body text-[0.58rem] uppercase tracking-[0.24em] text-ivory">
                {item.alt}
              </span>
            </div>
            <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIndex(null)}
          >
            <button
              onClick={() => setIndex(null)}
              aria-label="Close gallery"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/20 text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i - 1 + items.length) % items.length);
              }}
              aria-label="Previous image"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center border border-white/20 text-ivory transition-colors hover:border-gold hover:text-gold md:left-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden bg-charcoal">
                <Image
                  src={items[index].src}
                  alt={items[index].alt}
                  fittingType="fit"
                  className="mx-auto max-h-[76vh] w-auto object-contain"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-body text-[0.62rem] uppercase tracking-[0.24em] text-ivory/60">
                  {items[index].alt}
                </span>
                <span className="font-body text-[0.62rem] tracking-[0.24em] text-gold">
                  {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i + 1) % items.length);
              }}
              aria-label="Next image"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center border border-white/20 text-ivory transition-colors hover:border-gold hover:text-gold md:right-8"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}