import React from "react";

import LegalPageLayout from "../components/LegalPageLayout";

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle="These Terms govern your use of the Lotus Abroad website and our consultation services."
      lastUpdated="December 19, 2025"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            1) Acceptance of Terms
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            By accessing or using this website, you agree to these Terms. If you do not
            agree, please do not use the website.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            2) Our Services
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            Lotus Abroad provides educational consulting and guidance related to studying
            abroad, including program selection, documentation support, and general visa
            process guidance. We do not provide legal advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            3) Bookings &amp; Appointments
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            Appointment scheduling may be provided through Calendly. You are responsible
            for providing accurate information, attending on time, and notifying us if you
            need to reschedule.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            4) Fees and Payments
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            Some services may be paid. If a fee applies, we will communicate the scope and
            pricing before you confirm. Third-party fees (universities, consulates, courier
            services) are not controlled by Lotus Abroad and are your responsibility.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            5) Your Responsibilities
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-text-muted dark:text-gray-400">
            <li>Provide complete and accurate information and documents.</li>
            <li>Review outputs and confirm details before submission.</li>
            <li>Follow timelines and instructions communicated to you.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            6) No Guarantee of Outcomes
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            Admissions and visa decisions are made by third parties (universities,
            employers, consulates, and immigration authorities). We cannot guarantee
            acceptance, approvals, timelines, or outcomes.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            7) Intellectual Property
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            The website content, design, and branding are owned by Lotus Abroad or used
            with permission. You may not copy, reproduce, or distribute materials without
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            8) Disclaimer and Limitation of Liability
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            The website and services are provided “as is”. To the maximum extent permitted
            by law, Lotus Abroad is not liable for indirect or consequential damages, or
            losses resulting from your reliance on information on this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            9) Changes to These Terms
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            We may update these Terms from time to time. Updates will be posted on this
            page with a revised “Last updated” date.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}

