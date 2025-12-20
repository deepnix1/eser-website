import React from "react";

import LegalPageLayout from "../components/LegalPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="This Privacy Policy explains how Lotus Abroad collects, uses, and protects personal data when you use our website and services."
      lastUpdated="December 19, 2025"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            1) What We Collect
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            We collect information that you choose to provide, plus limited technical data
            needed to operate the site.
          </p>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-5">
              <div className="text-sm font-black text-text-main dark:text-white">
                Information you provide
              </div>
              <ul className="mt-3 space-y-2 text-sm text-text-muted dark:text-gray-400">
                <li>Contact details (name, email, phone/WhatsApp)</li>
                <li>Message content and consultation details</li>
                <li>Education profile information you share voluntarily</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-5">
              <div className="text-sm font-black text-text-main dark:text-white">
                Technical and usage data
              </div>
              <ul className="mt-3 space-y-2 text-sm text-text-muted dark:text-gray-400">
                <li>Device and browser information</li>
                <li>Approximate location (country/region)</li>
                <li>Pages visited and interactions (basic analytics)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            2) How We Use Your Data
          </h2>
          <div className="mt-4 grid gap-4">
            {[
              {
                title: "Provide consultations and services",
                body: "To respond to your requests, assess eligibility, and deliver guidance for your chosen program route.",
              },
              {
                title: "Communications",
                body: "To contact you about your request, scheduling, document needs, or follow-ups you opt into.",
              },
              {
                title: "Site operations and security",
                body: "To keep the website stable, prevent abuse, and improve performance and UX.",
              },
            ].map((item) => (
              <div
                className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-5"
                key={item.title}
              >
                <div className="text-sm font-black text-text-main dark:text-white">
                  {item.title}
                </div>
                <p className="mt-2 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            3) Calendly Scheduling
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            When you book a consultation through our embedded Calendly widget, Calendly may
            process your scheduling details and use cookies/trackers as part of their
            service. Your booking information is handled according to Calendly’s policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            4) Sharing and Service Providers
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            We do not sell your personal data. We may share information with trusted
            service providers only when necessary to operate the website and deliver the
            service (for example, scheduling, email delivery, or hosting).
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            5) Data Retention
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            We retain personal data only as long as needed for the purposes described in
            this policy, including to comply with legal obligations, resolve disputes, and
            enforce agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            6) Your Rights
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            Depending on your location, you may have rights to access, correct, delete, or
            object to processing of your personal data. To make a request, contact us via{" "}
            <a className="text-text-main dark:text-white underline decoration-primary/70 hover:decoration-primary" href="/contact">
              the Contact page
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            7) Security
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            We use reasonable administrative and technical safeguards to protect personal
            data. No method of transmission or storage is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            8) Changes to This Policy
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            We may update this Privacy Policy from time to time. Updates will be posted on
            this page with a revised “Last updated” date.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}

