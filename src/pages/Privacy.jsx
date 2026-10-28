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

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How The Luxe Studio handles the information you share with us through this website."
      />
      <section className="container-luxe max-w-3xl py-16 md:py-24">
        <p className="font-body text-[0.68rem] uppercase tracking-[0.2em] text-ivory/30">
          Last updated: October 2026
        </p>

        <div className="mt-8">
          <LegalSection title="What we collect">
            <p>
              When you request an appointment or send us a message, we collect the details you
              provide: your name, email address, phone number, the service you're interested in and
              any notes you add. If you request an appointment, we also record the date and time you
              would prefer.
            </p>
          </LegalSection>

          <LegalSection title="Why we collect it">
            <p>
              We use this information only to respond to your enquiry, arrange and confirm your
              appointment, and keep a record of your visit. We do not sell your information, and we
              do not use it for third-party advertising.
            </p>
          </LegalSection>

          <LegalSection title="Who can see it">
            <p>
              Appointment requests and enquiries are visible only to authorised staff at The Luxe
              Studio through a secure, password-protected dashboard. They are not published on this
              website.
            </p>
          </LegalSection>

          <LegalSection title="How long we keep it">
            <p>
              We keep appointment and enquiry records for as long as needed to manage bookings and
              maintain service history. You can ask us to delete your details at any time and we will
              do so unless we are required to keep a record by law.
            </p>
          </LegalSection>

          <LegalSection title="Cookies and analytics">
            <p>
              This website does not use advertising cookies. Basic technical information may be
              collected by our hosting provider to keep the site secure and working properly.
            </p>
          </LegalSection>

          <LegalSection title="Your choices">
            <p>
              You can request a copy of the details we hold about you, ask us to correct them, or ask
              us to delete them. Contact the studio on{" "}
              <a href={BRAND.phoneHref} className="text-gold underline decoration-gold/40 underline-offset-2">
                {BRAND.phone}
              </a>{" "}
              and we will help.
            </p>
          </LegalSection>

          <LegalSection title="Contact">
            <p>
              The Luxe Studio, {BRAND.location}. Phone: {BRAND.phone}. Instagram:{" "}
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="text-gold underline decoration-gold/40 underline-offset-2"
              >
                {BRAND.instagramHandle}
              </a>
              .
            </p>
          </LegalSection>
        </div>
      </section>
    </>
  );
}