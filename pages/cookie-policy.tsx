import React from "react";

import LegalPageLayout from "../components/LegalPageLayout";

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      subtitle="This Cookie Policy explains what cookies are, how we use them, and how you can control them."
      lastUpdated="December 19, 2025"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            1) What Are Cookies?
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            Cookies are small files stored on your device by a website. They help the site
            remember preferences, improve performance, and enable certain functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            2) Cookies We May Use
          </h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Strictly necessary",
                body: "Required to operate the website and provide core features such as security and basic navigation.",
              },
              {
                title: "Preferences",
                body: "Used to remember choices such as theme settings (light/dark) and similar preferences.",
              },
              {
                title: "Analytics (optional)",
                body: "May help us understand how visitors use the site so we can improve clarity and performance.",
              },
              {
                title: "Third-party widgets",
                body: "Scheduling widgets (e.g., Calendly) may set cookies to provide their service and prevent abuse.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-5"
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
            3) Managing Cookies
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            You can control cookies through your browser settings (block, delete, or limit
            cookies). Note that disabling certain cookies may affect website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-black text-text-main dark:text-white">
            4) Updates to This Cookie Policy
          </h2>
          <p className="mt-3 text-sm text-text-muted dark:text-gray-400 leading-relaxed">
            We may update this policy as our site evolves. Updates will be posted on this
            page with a revised “Last updated” date.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}

