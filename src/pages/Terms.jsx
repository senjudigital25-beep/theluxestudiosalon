import PageHero from "@/components/site/PageHero";
import { BRAND } from "@/lib/siteData";

function LegalSection({ title, children }) {
  return (
    <section className="border-t border-white/10 py-8 first:border-t-0 first:pt-0">
      <h2 className="font-heading text-[1.5rem] text-ivory">{title}</h2>
      <div className="mt-3 space-y-3 font-body text-[0.9rem] leading-[1.85] text-ivory/55">{children}</div>
    </section>
  );
}

export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The basis on which this website and our appointment request service are provided."
      />
      <section className="container-luxe max-w-3xl py-16 md:py-24">
        <p className="font-body text-[0.68rem] uppercase tracking-[0.2em] text-ivory/30">
          Last updated: October 2026
        </p>

        <div className="mt-8">
          <LegalSection title="Using this website">
            <p>
              The content on this site is provided for information about The Luxe Studio and its
              services. You agree not to misuse the site, attempt to access restricted areas, or
              submit false or misleading information through our forms.
            </p>
          </LegalSection>

          <LegalSection title="Appointment requests">
            <p>
              Submitting the booking form is a request, not a confirmed reservation. Your appointment
              is only confirmed once the studio contacts you. Times shown on the form are preferences
              and are subject to availability.
            </p>
          </LegalSection>

          <LegalSection title="Pricing and services">
            <p>
              Service descriptions on this site are a guide. Final pricing depends on hair length,
              condition and the time a service takes, and will be discussed with you before work
              begins. We may update or withdraw services at any time.
            </p>
          </LegalSection>

          <LegalSection title="Changes, late arrivals and cancellations">
            <p>
              If you need to change or cancel a request, please call the studio as early as you can
              so the time can be offered to someone else. Late arrivals may mean a shortened service
              so we can keep the rest of the day on time.
            </p>
          </LegalSection>

          <LegalSection title="Results and aftercare">
            <p>
              Colour and chemical services carry inherent risk, and results depend on your hair's
              history and condition. We will always be honest about what is achievable. Following the
              aftercare advice given in the chair helps protect your result.
            </p>
          </LegalSection>

          <LegalSection title="Photography">
            <p>
              We may photograph finished work for our portfolio and social media. If you would prefer
              not to appear, tell us at any point during your visit and we will respect that.
            </p>
          </LegalSection>

          <LegalSection title="Liability and governing law">
            <p>
              This website is provided on an "as is" basis. These terms are governed by the laws of
              British Columbia, Canada, and any dispute will be handled in the courts of that
              province.
            </p>
          </LegalSection>

          <LegalSection title="Contact">
            <p>
              Questions about these terms? Call The Luxe Studio on{" "}
              <a href={BRAND.phoneHref} className="text-gold underline decoration-gold/40 underline-offset-2">
                {BRAND.phone}
              </a>
              .
            </p>
          </LegalSection>
        </div>
      </section>
    </>
  );
}