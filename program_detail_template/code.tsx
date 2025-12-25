import Head from "next/head";

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export type ProgramDetailTemplateContent = {
  metaTitle: string;
  breadcrumbs: {
    home: string;
    programs: string;
    country: string;
    program: string;
  };
  badges: {
    primary: string;
    secondary: string;
  };
  hero: {
    title: string;
    location: string;
    institution: string;
  };
  overview: {
    title: string;
    paragraphs: [string, string];
  };
  requirements: {
    title: string;
    items: Array<{ title: string; body: string }>;
  };
  timeline: {
    title: string;
    steps: Array<{ title: string; date: string; body: string }>;
  };
  lotusDifference: {
    title: string;
    items: Array<{ icon: string; title: string; body: string }>;
  };
  pricing: {
    title: string;
    headers: { item: string; frequency: string; estimatedCost: string };
    rows: Array<{ item: string; frequency: string; cost: string; emphasize?: boolean }>;
    footnote: string;
  };
  video: {
    title: string;
    cardTitle: string;
    cardSubtitle: string;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  sidebar: {
    tuitionLabel: string;
    tuitionValue: string;
    tuitionUnit: string;
    stats: Array<{ label: string; value: string; valueClassName?: string }>;
    primaryCta: string;
    secondaryCta: string;
    socialProof: string;
  };
  contactWidget: {
    hint: string;
    expertLine: string;
  };
  related: {
    title: string;
    viewAll: string;
    cards: Array<{ city: string; degree: string; title: string; school: string; duration: string; fee: string }>;
  };
  footer: {
    links: Array<{ label: string }>;
    copyright: string;
  };
};

const DEFAULT_CONTENT: ProgramDetailTemplateContent = {
  metaTitle: "Master's in Data Science - Lotus Abroad",
  breadcrumbs: {
    home: "Home",
    programs: "Programs",
    country: "Germany",
    program: "Master's Data Science",
  },
  badges: { primary: "Verified Partner", secondary: "English Taught" },
  hero: {
    title: "Master's in Data Science",
    location: "Berlin, Germany",
    institution: "Technical University of Berlin",
  },
  overview: {
    title: "Overview",
    paragraphs: [
      "This Master's program in Data Science is designed to equip students with the advanced skills necessary to analyze, interpret, and leverage data in a wide range of industries. Located in the heart of Berlin, a burgeoning tech hub, the curriculum balances theoretical foundations with practical application.",
      "Students will gain hands-on experience with machine learning algorithms, big data technologies, and statistical modeling. The program includes a mandatory internship semester, allowing direct engagement with Germany's leading tech companies.",
    ],
  },
  requirements: {
    title: "Requirements",
    items: [
      {
        title: "Academic Degree",
        body: "Bachelor's degree in Computer Science, Mathematics, or related field with min 180 ECTS.",
      },
      {
        title: "Language Proficiency",
        body: "IELTS 6.5 or TOEFL iBT 90. No German language required for admission.",
      },
      {
        title: "Motivation",
        body: "Letter of Motivation (1-2 pages) outlining career goals and research interests.",
      },
      {
        title: "Work Experience",
        body: "Not mandatory, but internships in relevant fields are considered a plus.",
      },
    ],
  },
  timeline: {
    title: "Application Timeline",
    steps: [
      {
        title: "Application Submission",
        date: "Before June 15, 2024",
        body: "Submit all required documents via the Lotus Abroad portal for initial screening.",
      },
      {
        title: "University Interview",
        date: "July 1 - July 15, 2024",
        body: "Shortlisted candidates are invited for a technical interview via Zoom.",
      },
      {
        title: "Visa Processing",
        date: "August 2024",
        body: "Receive admission letter and apply for German Student Visa with our support.",
      },
      {
        title: "Arrival & Orientation",
        date: "September 2024",
        body: "Arrive in Berlin, move into accommodation, and attend orientation week.",
      },
    ],
  },
  lotusDifference: {
    title: "The Lotus Difference",
    items: [
      {
        icon: "support_agent",
        title: "Local Support in Berlin",
        body: "Our Berlin office provides on-ground support for banking, housing, and registration.",
      },
      {
        icon: "work",
        title: "Career Networking",
        body: "Exclusive access to job fairs and networking events with our partner companies.",
      },
    ],
  },
  pricing: {
    title: "Costs & Fees",
    headers: { item: "Item", frequency: "Frequency", estimatedCost: "Estimated Cost" },
    rows: [
      { item: "Tuition Fee", frequency: "Per Semester", cost: "€0 (Public Univ.)" },
      { item: "Semester Contribution", frequency: "Per Semester", cost: "~ €300" },
      { item: "Health Insurance", frequency: "Monthly", cost: "~ €110" },
      { item: "Living Expenses", frequency: "Monthly", cost: "€900 - €1,200" },
      { item: "Lotus Consultancy Fee", frequency: "One-time", cost: "Contact for Quote", emphasize: true },
    ],
    footnote: "* Living expenses vary based on lifestyle and accommodation choices.",
  },
  video: {
    title: "Student Experience",
    cardTitle: "Life in Berlin as an International Student",
    cardSubtitle: "Hear from alumni about their journey.",
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "Can I work while studying?",
        a: "Yes, international students in Germany can work up to 120 full days or 240 half days per year. This allows you to support your living expenses while gaining valuable work experience.",
      },
      {
        q: "Is accommodation guaranteed?",
        a: "Accommodation is not automatically guaranteed by the university. However, Lotus Abroad assists you in applying for student dormitories and finding private housing options well in advance.",
      },
      {
        q: "Are there scholarships available?",
        a: "Yes, there are various scholarships like DAAD and Deutschlandstipendium. Admission is merit-based. We can guide you through the application process for these financial aids.",
      },
    ],
  },
  sidebar: {
    tuitionLabel: "Tuition Fee",
    tuitionValue: "€0",
    tuitionUnit: "/ semester",
    stats: [
      { label: "Duration", value: "4 Semesters" },
      { label: "Credits", value: "120 ECTS" },
      { label: "Intake", value: "Winter (Oct)" },
      { label: "Deadline", value: "June 15", valueClassName: "text-red-500" },
    ],
    primaryCta: "Start Application",
    secondaryCta: "Download Brochure",
    socialProof: "125 students applied last week",
  },
  contactWidget: { hint: "Need help?", expertLine: "Talk to Sarah, our Germany Expert." },
  related: {
    title: "Similar Programs",
    viewAll: "View all",
    cards: [
      { city: "Munich", degree: "M.Sc.", title: "Computer Science", school: "Technical University Munich", duration: "2 Years", fee: "€150/sem" },
      { city: "Hamburg", degree: "M.A.", title: "Digital Business", school: "University of Hamburg", duration: "1.5 Years", fee: "€320/sem" },
      { city: "Berlin", degree: "MBA", title: "Global Management", school: "ESMT Berlin", duration: "1 Year", fee: "€48,000" },
    ],
  },
  footer: {
    links: [{ label: "Destinations" }, { label: "About" }, { label: "Services" }, { label: "Privacy" }],
    copyright: "© 2024 Lotus Abroad. All rights reserved.",
  },
};

export default function ProgramDetailTemplatePage({
  content = DEFAULT_CONTENT,
}: {
  content?: ProgramDetailTemplateContent;
}) {
  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
      </Head>
      <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-display antialiased flex flex-col min-h-screen transition-colors duration-300">
        <SiteHeader />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-10 pt-20 pb-12">
    {/* Breadcrumbs */}
    <nav className="flex flex-wrap gap-2 mb-6 text-sm">
      <a className="text-text-sec-light dark:text-text-sec-dark hover:text-primary transition-colors" href="#">{content.breadcrumbs.home}</a>
      <span className="text-text-sec-light dark:text-text-sec-dark">/</span>
      <a className="text-text-sec-light dark:text-text-sec-dark hover:text-primary transition-colors" href="#">{content.breadcrumbs.programs}</a>
      <span className="text-text-sec-light dark:text-text-sec-dark">/</span>
      <a className="text-text-sec-light dark:text-text-sec-dark hover:text-primary transition-colors" href="#">{content.breadcrumbs.country}</a>
      <span className="text-text-sec-light dark:text-text-sec-dark">/</span>
      <span className="font-medium text-text-main-light dark:text-text-main-dark">{content.breadcrumbs.program}</span>
    </nav>
    {/* Hero Section */}
    <section className="mb-10 flex flex-col md:flex-row justify-between items-start gap-6 pb-8 border-b border-border-light dark:border-border-dark">
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-text-main-light dark:text-white text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">verified</span> {content.badges.primary}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-text-main-light dark:text-white text-xs font-bold uppercase tracking-wider">
            {content.badges.secondary}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-text-main-light dark:text-text-main-dark">
          {content.hero.title}
        </h1>
        <div className="flex items-center gap-2 text-text-sec-light dark:text-text-sec-dark text-lg">
          <span className="material-symbols-outlined">location_on</span>
          <span className="font-medium">{content.hero.location}</span>
          <span className="mx-2">•</span>
          <span>{content.hero.institution}</span>
        </div>
      </div>
      <div className="hidden md:block w-32 h-32 rounded-xl bg-gray-200 dark:bg-gray-800 shrink-0 overflow-hidden relative">
        {/* University Logo Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center text-text-sec-light dark:text-text-sec-dark bg-background-light dark:bg-surface-dark" data-alt="University Logo Placeholder">
          <span className="material-symbols-outlined text-[48px]">school</span>
        </div>
      </div>
    </section>
    {/* Layout Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
      {/* Left Column: Content (8 Cols) */}
      <div className="lg:col-span-8 space-y-16">
        {/* Overview */}
        <section className="scroll-mt-24" id="overview">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">info</span> {content.overview.title}
          </h3>
          <div className="prose prose-lg dark:prose-invert max-w-none text-text-sec-light dark:text-text-sec-dark">
            <p className="leading-relaxed">
              {content.overview.paragraphs[0]}
            </p>
            <p className="mt-4 leading-relaxed">
              {content.overview.paragraphs[1]}
            </p>
          </div>
        </section>
        {/* Requirements */}
        <section className="scroll-mt-24" id="requirements">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">checklist</span> {content.requirements.title}
          </h3>
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                <div>
                  <span className="font-bold block text-text-main-light dark:text-text-main-dark">{content.requirements.items[0]?.title}</span>
                  <span className="text-sm text-text-sec-light dark:text-text-sec-dark">{content.requirements.items[0]?.body}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                <div>
                  <span className="font-bold block text-text-main-light dark:text-text-main-dark">{content.requirements.items[1]?.title}</span>
                  <span className="text-sm text-text-sec-light dark:text-text-sec-dark">{content.requirements.items[1]?.body}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                <div>
                  <span className="font-bold block text-text-main-light dark:text-text-main-dark">{content.requirements.items[2]?.title}</span>
                  <span className="text-sm text-text-sec-light dark:text-text-sec-dark">{content.requirements.items[2]?.body}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-gray-400 shrink-0">remove_circle_outline</span>
                <div>
                  <span className="font-bold block text-text-main-light dark:text-text-main-dark">{content.requirements.items[3]?.title}</span>
                  <span className="text-sm text-text-sec-light dark:text-text-sec-dark">{content.requirements.items[3]?.body}</span>
                </div>
              </li>
            </ul>
          </div>
        </section>
        {/* Timeline */}
        <section className="scroll-mt-24" id="timeline">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">timeline</span> {content.timeline.title}
          </h3>
          <div className="relative pl-4 border-l-2 border-border-light dark:border-border-dark space-y-8">
            <div className="relative">
              <div className="absolute -left-[25px] top-0 size-5 rounded-full bg-primary border-4 border-white dark:border-background-dark" />
              <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">{content.timeline.steps[0]?.title}</h4>
              <p className="text-sm text-text-sec-light dark:text-text-sec-dark mb-1">{content.timeline.steps[0]?.date}</p>
              <p className="text-text-sec-light dark:text-text-sec-dark">{content.timeline.steps[0]?.body}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] top-0 size-5 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-background-dark" />
              <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">{content.timeline.steps[1]?.title}</h4>
              <p className="text-sm text-text-sec-light dark:text-text-sec-dark mb-1">{content.timeline.steps[1]?.date}</p>
              <p className="text-text-sec-light dark:text-text-sec-dark">{content.timeline.steps[1]?.body}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] top-0 size-5 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-background-dark" />
              <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">{content.timeline.steps[2]?.title}</h4>
              <p className="text-sm text-text-sec-light dark:text-text-sec-dark mb-1">{content.timeline.steps[2]?.date}</p>
              <p className="text-text-sec-light dark:text-text-sec-dark">{content.timeline.steps[2]?.body}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] top-0 size-5 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-background-dark" />
              <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">{content.timeline.steps[3]?.title}</h4>
              <p className="text-sm text-text-sec-light dark:text-text-sec-dark mb-1">{content.timeline.steps[3]?.date}</p>
              <p className="text-text-sec-light dark:text-text-sec-dark">{content.timeline.steps[3]?.body}</p>
            </div>
          </div>
        </section>
        {/* Lotus Difference */}
        <section className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl border border-primary/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">{content.lotusDifference.title}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-text-main-light dark:text-white shrink-0">
                  <span className="material-symbols-outlined">{content.lotusDifference.items[0]?.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">{content.lotusDifference.items[0]?.title}</h4>
                  <p className="text-sm text-text-sec-light dark:text-text-sec-dark">{content.lotusDifference.items[0]?.body}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-text-main-light dark:text-white shrink-0">
                  <span className="material-symbols-outlined">{content.lotusDifference.items[1]?.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">{content.lotusDifference.items[1]?.title}</h4>
                  <p className="text-sm text-text-sec-light dark:text-text-sec-dark">{content.lotusDifference.items[1]?.body}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Pricing */}
        <section className="scroll-mt-24" id="pricing">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">payments</span> {content.pricing.title}
          </h3>
          <div className="overflow-hidden rounded-xl border border-border-light dark:border-border-dark">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-white/5 text-text-main-light dark:text-text-main-dark uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">{content.pricing.headers.item}</th>
                  <th className="px-6 py-4">{content.pricing.headers.frequency}</th>
                  <th className="px-6 py-4 text-right">{content.pricing.headers.estimatedCost}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark bg-surface-light dark:bg-surface-dark">
                <tr>
                  <td className="px-6 py-4 font-medium">{content.pricing.rows[0]?.item}</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">{content.pricing.rows[0]?.frequency}</td>
                  <td className="px-6 py-4 text-right font-bold">{content.pricing.rows[0]?.cost}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">{content.pricing.rows[1]?.item}</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">{content.pricing.rows[1]?.frequency}</td>
                  <td className="px-6 py-4 text-right">{content.pricing.rows[1]?.cost}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">{content.pricing.rows[2]?.item}</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">{content.pricing.rows[2]?.frequency}</td>
                  <td className="px-6 py-4 text-right">{content.pricing.rows[2]?.cost}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">{content.pricing.rows[3]?.item}</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">{content.pricing.rows[3]?.frequency}</td>
                  <td className="px-6 py-4 text-right">{content.pricing.rows[3]?.cost}</td>
                </tr>
                <tr className="bg-primary/5">
                  <td className="px-6 py-4 font-bold text-text-main-light dark:text-white">{content.pricing.rows[4]?.item}</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">{content.pricing.rows[4]?.frequency}</td>
                  <td className="px-6 py-4 text-right font-bold text-text-main-light dark:text-white">{content.pricing.rows[4]?.cost}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-sec-light dark:text-text-sec-dark mt-2">{content.pricing.footnote}</p>
        </section>
        {/* Video Embed */}
        <section className="scroll-mt-24" id="video">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">play_circle</span> {content.video.title}
          </h3>
          <div className="rounded-xl overflow-hidden aspect-video bg-black relative group cursor-pointer" title="Play Video">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity" data-alt="Students studying in a modern library" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjJ35VMRqLJgAULiYgYQOdarsNjL_PmH5FjqYEAwp18T5Ppbf-fHZVKufjJW3zLiGlPtMaPKr74xcL7OrP3g03j7-nUhzgtrXucdhFkF0M_BmK_6d6II8uBc68bj6YcNG0q4akE8q3kf8nEmOGnO6m-FXUn6g9OHBT9de8DlFF7Wy5uBjiLgtrKiiokTiJw6ARwNxh-Kg7gBkCr5pM-IKOZPZ7rriY5aS-FbBwPKqkrKdTDqU-WQUza9o_W5bZUIysUSthuGNz-PxD")'}} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-16 rounded-full bg-primary flex items-center justify-center text-black shadow-xl transform group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">play_arrow</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
              <p className="text-white font-bold text-lg">{content.video.cardTitle}</p>
              <p className="text-white/80 text-sm">{content.video.cardSubtitle}</p>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section className="scroll-mt-24" id="faq">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">help</span> {content.faq.title}
          </h3>
          <div className="space-y-4">
            <details className="group bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-text-main-light dark:text-text-main-dark font-bold">
                <span>{content.faq.items[0]?.q}</span>
                <span className="material-symbols-outlined transition group-open:-rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 leading-relaxed text-text-sec-light dark:text-text-sec-dark">
                {content.faq.items[0]?.a}
              </p>
            </details>
            <details className="group bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-text-main-light dark:text-text-main-dark font-bold">
                <span>{content.faq.items[1]?.q}</span>
                <span className="material-symbols-outlined transition group-open:-rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 leading-relaxed text-text-sec-light dark:text-text-sec-dark">
                {content.faq.items[1]?.a}
              </p>
            </details>
            <details className="group bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-text-main-light dark:text-text-main-dark font-bold">
                <span>{content.faq.items[2]?.q}</span>
                <span className="material-symbols-outlined transition group-open:-rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 leading-relaxed text-text-sec-light dark:text-text-sec-dark">
                {content.faq.items[2]?.a}
              </p>
            </details>
          </div>
        </section>
      </div>
      {/* Right Column: Sticky Sidebar (4 Cols) */}
      <aside className="lg:col-span-4 relative">
        <div className="sticky top-24 space-y-6">
          {/* Main Summary Card */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-[2rem] p-6 shadow-xl border border-border-light dark:border-border-dark flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark pb-4">
                <span className="text-sm text-text-sec-light dark:text-text-sec-dark font-medium">{content.sidebar.tuitionLabel}</span>
                <span className="text-xl font-bold text-text-main-light dark:text-text-main-dark">{content.sidebar.tuitionValue} <span className="text-xs font-normal text-text-sec-light">{content.sidebar.tuitionUnit}</span></span>
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <div>
                  <p className="text-xs text-text-sec-light dark:text-text-sec-dark">{content.sidebar.stats[0]?.label}</p>
                  <p className="font-bold text-text-main-light dark:text-text-main-dark">{content.sidebar.stats[0]?.value}</p>
                </div>
                <div>
                  <p className="text-xs text-text-sec-light dark:text-text-sec-dark">{content.sidebar.stats[1]?.label}</p>
                  <p className="font-bold text-text-main-light dark:text-text-main-dark">{content.sidebar.stats[1]?.value}</p>
                </div>
                <div>
                  <p className="text-xs text-text-sec-light dark:text-text-sec-dark">{content.sidebar.stats[2]?.label}</p>
                  <p className="font-bold text-text-main-light dark:text-text-main-dark">{content.sidebar.stats[2]?.value}</p>
                </div>
                <div>
                  <p className="text-xs text-text-sec-light dark:text-text-sec-dark">{content.sidebar.stats[3]?.label}</p>
                  <p className={["font-bold", content.sidebar.stats[3]?.valueClassName ?? ""].join(" ")}>{content.sidebar.stats[3]?.value}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="w-full h-12 rounded-full bg-primary text-black font-bold text-sm hover:bg-yellow-400 transition-all flex items-center justify-center gap-2">
                <span>{content.sidebar.primaryCta}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button className="w-full h-12 rounded-full bg-transparent border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark font-bold text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>{content.sidebar.secondaryCta}</span>
              </button>
            </div>
            <div className="text-center">
              <p className="text-xs text-text-sec-light dark:text-text-sec-dark">{content.sidebar.socialProof}</p>
            </div>
          </div>
          {/* Contact Widget */}
          <div className="bg-white dark:bg-white/5 p-5 rounded-[2rem] border border-border-light dark:border-border-dark flex items-center gap-4">
            <div className="size-12 rounded-full overflow-hidden bg-gray-200">
              <img alt="Consultant Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9Hc04D6pWtZb12Pz74OtgQh31-2bqeS5bXltDINf9_NAz4_-e6RxhEHdnIJJRhezjQp67_KMOMssgFYWvOZgRxZf15PEXqZTJW2mA5cc0FNxU9d3Am1rOauWzEWPoE0DkbC4JjFy_kgX4jV0BFc_m1YJ7h2MQZFJ2strWW5HjHpNWOZt3Cg3l2cs2NJUFZs5v1YUgkUI9IwoJEe2Y864U6waPCeFGGInoK-mRdhXo1pQEtZdaBDqqC_MLoEa1Kb3OJsyNiMFkaP4O" />
            </div>
            <div>
              <p className="text-xs text-text-sec-light dark:text-text-sec-dark">{content.contactWidget.hint}</p>
              <p className="font-bold text-sm text-text-main-light dark:text-text-main-dark">{content.contactWidget.expertLine}</p>
            </div>
            <button className="ml-auto size-8 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 flex items-center justify-center hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
    {/* Related Programs */}
    <section className="mt-24 pt-10 border-t border-border-light dark:border-border-dark">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">{content.related.title}</h3>
        <a className="text-sm font-medium text-text-sec-light dark:text-text-sec-dark hover:text-primary transition-colors flex items-center gap-1" href="#">
          {content.related.viewAll} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="group flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
          <div className="h-40 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="University building in Munich" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaDcsBmidN3zJqQ2-yANpKdW3QNA-6WAPm8rhRcl8LsrISZoP5c1U7eb9RkxmjkB1R0kbgASPIVhOZt1P4bpx15J-C-D4mBbVD_oz1HofX83eTL9_UrZ2GVtTl-IK5IRD1eCkT6kN28RdwMktfUccKFe0qp0rZ7PwO_V71dPLiQglw-j0QfkH21D7U_XWpWChbh5q1UI8kK9QZFuZjoOxUXw9Vb76_OZryKnQYWV4aK1lqsGzqjHMSVt_RSLcYs9AHY5H60g-_Do3G")'}} />
            <div className="absolute top-3 left-3 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md">{content.related.cards[0]?.city}</div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="mb-2">
              <span className="text-xs font-medium text-primary bg-background-dark px-2 py-0.5 rounded">{content.related.cards[0]?.degree}</span>
            </div>
            <h4 className="font-bold text-text-main-light dark:text-text-main-dark mb-1">{content.related.cards[0]?.title}</h4>
            <p className="text-xs text-text-sec-light dark:text-text-sec-dark mb-4">{content.related.cards[0]?.school}</p>
            <div className="mt-auto flex items-center justify-between text-xs font-medium border-t border-border-light dark:border-border-dark pt-3">
              <span className="text-text-sec-light dark:text-text-sec-dark">{content.related.cards[0]?.duration}</span>
              <span className="text-text-main-light dark:text-text-main-dark">{content.related.cards[0]?.fee}</span>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="group flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
          <div className="h-40 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Hamburg cityscape with water" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKwzIt1BY0pR_qheHH2hOZhrxilBRgKTqwC93VQh3kmc7R7uZ29AZN6kDvEcknbXPv5wi9S3kvHwixZTv6x2SKcSDgdcdnWpvQ3nT9HM1cFbNdYsAcbQSrqLfTNmRTonPgA_bnGsxToDZz91M7N-TPyPfzHPbzJRrlmdA5Wi3I8qO4K-PNeGNJD8y78MZqEqwTVw7Hg736AJWQgE0cHoaapetExky7Vzfn0RTVHrlBA5CnKPFZ4Ym500SWIrzCk07msI_2sy84Ok6K")'}} />
            <div className="absolute top-3 left-3 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md">{content.related.cards[1]?.city}</div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="mb-2">
              <span className="text-xs font-medium text-primary bg-background-dark px-2 py-0.5 rounded">{content.related.cards[1]?.degree}</span>
            </div>
            <h4 className="font-bold text-text-main-light dark:text-text-main-dark mb-1">{content.related.cards[1]?.title}</h4>
            <p className="text-xs text-text-sec-light dark:text-text-sec-dark mb-4">{content.related.cards[1]?.school}</p>
            <div className="mt-auto flex items-center justify-between text-xs font-medium border-t border-border-light dark:border-border-dark pt-3">
              <span className="text-text-sec-light dark:text-text-sec-dark">{content.related.cards[1]?.duration}</span>
              <span className="text-text-main-light dark:text-text-main-dark">{content.related.cards[1]?.fee}</span>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="group flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
          <div className="h-40 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Modern building in Berlin" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADmqUTptv14xdVx0e3x9q56svEXlveoCmxvQFT0pAuzH0zkOzWPpKrEbyT_ptMe4MDtOuvHG-T17AloVVFUkPtzC5KVRKetBWZTkmQYM4b_6oRBu_TxjzzqrcG45ByxBTWi1bGYvCUD-8EhsvGK8gR12d0P2_LOpLUnMCQIhzkGbyHrQqm4Nc2teoDzXKgbDXVlTpy24KORL-zgl4FF4ybCaxgpbumVF7HD_dV4v8vEXhQeB3LtCA1VN71HVKl0xMAo9cPwD3mtDDD")'}} />
            <div className="absolute top-3 left-3 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md">{content.related.cards[2]?.city}</div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="mb-2">
              <span className="text-xs font-medium text-primary bg-background-dark px-2 py-0.5 rounded">{content.related.cards[2]?.degree}</span>
            </div>
            <h4 className="font-bold text-text-main-light dark:text-text-main-dark mb-1">{content.related.cards[2]?.title}</h4>
            <p className="text-xs text-text-sec-light dark:text-text-sec-dark mb-4">{content.related.cards[2]?.school}</p>
            <div className="mt-auto flex items-center justify-between text-xs font-medium border-t border-border-light dark:border-border-dark pt-3">
              <span className="text-text-sec-light dark:text-text-sec-dark">{content.related.cards[2]?.duration}</span>
              <span className="text-text-main-light dark:text-text-main-dark">{content.related.cards[2]?.fee}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <div className="mt-auto">
    <SiteFooter />
  </div>
</div>
    </>
  );
}
