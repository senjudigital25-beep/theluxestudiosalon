import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 font-body text-[0.7rem] uppercase tracking-[0.26em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  gold: "bg-gold text-ink hover:bg-gold-light px-8 py-4",
  outline:
    "border border-gold/45 text-ivory hover:border-gold hover:bg-gold hover:text-ink px-8 py-4",
  ghost: "text-gold hover:text-gold-light px-0 py-1",
  dark: "bg-ink text-ivory hover:bg-charcoal px-8 py-4",
};

export default function LuxeButton({
  to,
  href,
  variant = "gold",
  className = "",
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], className);
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "ghost" ? (
        <span className="relative z-10 h-px w-8 bg-gold transition-all duration-500 group-hover:w-12" />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes} {...props}>
        {inner}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {inner}
    </button>
  );
}