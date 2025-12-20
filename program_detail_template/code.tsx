import Head from "next/head";

import SiteHeader from "../components/SiteHeader";

export default function ProgramDetailTemplatePage() {
  return (
    <>
      <Head>
        <title>Master&apos;s in Data Science - Lotus Abroad</title>
      </Head>
      <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-display antialiased flex flex-col min-h-screen transition-colors duration-300">
        <SiteHeader />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-10 pt-20 pb-12">
    {/* Breadcrumbs */}
    <nav className="flex flex-wrap gap-2 mb-6 text-sm">
      <a className="text-text-sec-light dark:text-text-sec-dark hover:text-primary transition-colors" href="#">Home</a>
      <span className="text-text-sec-light dark:text-text-sec-dark">/</span>
      <a className="text-text-sec-light dark:text-text-sec-dark hover:text-primary transition-colors" href="#">Programs</a>
      <span className="text-text-sec-light dark:text-text-sec-dark">/</span>
      <a className="text-text-sec-light dark:text-text-sec-dark hover:text-primary transition-colors" href="#">Germany</a>
      <span className="text-text-sec-light dark:text-text-sec-dark">/</span>
      <span className="font-medium text-text-main-light dark:text-text-main-dark">Master's Data Science</span>
    </nav>
    {/* Hero Section */}
    <section className="mb-10 flex flex-col md:flex-row justify-between items-start gap-6 pb-8 border-b border-border-light dark:border-border-dark">
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-text-main-light dark:text-white text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">verified</span> Verified Partner
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-text-main-light dark:text-white text-xs font-bold uppercase tracking-wider">
            English Taught
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-text-main-light dark:text-text-main-dark">
          Master's in Data Science
        </h1>
        <div className="flex items-center gap-2 text-text-sec-light dark:text-text-sec-dark text-lg">
          <span className="material-symbols-outlined">location_on</span>
          <span className="font-medium">Berlin, Germany</span>
          <span className="mx-2">├óÔé¼┬ó</span>
          <span>Technical University of Berlin</span>
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
            <span className="material-symbols-outlined text-primary">info</span> Overview
          </h3>
          <div className="prose prose-lg dark:prose-invert max-w-none text-text-sec-light dark:text-text-sec-dark">
            <p className="leading-relaxed">
              This Master's program in Data Science is designed to equip students with the advanced skills necessary to analyze, interpret, and leverage data in a wide range of industries. Located in the heart of Berlin, a burgeoning tech hub, the curriculum balances theoretical foundations with practical application.
            </p>
            <p className="mt-4 leading-relaxed">
              Students will gain hands-on experience with machine learning algorithms, big data technologies, and statistical modeling. The program includes a mandatory internship semester, allowing direct engagement with Germany's leading tech companies.
            </p>
          </div>
        </section>
        {/* Requirements */}
        <section className="scroll-mt-24" id="requirements">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">checklist</span> Requirements
          </h3>
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                <div>
                  <span className="font-bold block text-text-main-light dark:text-text-main-dark">Academic Degree</span>
                  <span className="text-sm text-text-sec-light dark:text-text-sec-dark">Bachelor's degree in Computer Science, Mathematics, or related field with min 180 ECTS.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                <div>
                  <span className="font-bold block text-text-main-light dark:text-text-main-dark">Language Proficiency</span>
                  <span className="text-sm text-text-sec-light dark:text-text-sec-dark">IELTS 6.5 or TOEFL iBT 90. No German language required for admission.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                <div>
                  <span className="font-bold block text-text-main-light dark:text-text-main-dark">Motivation</span>
                  <span className="text-sm text-text-sec-light dark:text-text-sec-dark">Letter of Motivation (1-2 pages) outlining career goals and research interests.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-gray-400 shrink-0">remove_circle_outline</span>
                <div>
                  <span className="font-bold block text-text-main-light dark:text-text-main-dark">Work Experience</span>
                  <span className="text-sm text-text-sec-light dark:text-text-sec-dark">Not mandatory, but internships in relevant fields are considered a plus.</span>
                </div>
              </li>
            </ul>
          </div>
        </section>
        {/* Timeline */}
        <section className="scroll-mt-24" id="timeline">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">timeline</span> Application Timeline
          </h3>
          <div className="relative pl-4 border-l-2 border-border-light dark:border-border-dark space-y-8">
            <div className="relative">
              <div className="absolute -left-[25px] top-0 size-5 rounded-full bg-primary border-4 border-white dark:border-background-dark" />
              <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Application Submission</h4>
              <p className="text-sm text-text-sec-light dark:text-text-sec-dark mb-1">Before June 15, 2024</p>
              <p className="text-text-sec-light dark:text-text-sec-dark">Submit all required documents via the Lotus Abroad portal for initial screening.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] top-0 size-5 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-background-dark" />
              <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">University Interview</h4>
              <p className="text-sm text-text-sec-light dark:text-text-sec-dark mb-1">July 1 - July 15, 2024</p>
              <p className="text-text-sec-light dark:text-text-sec-dark">Shortlisted candidates are invited for a technical interview via Zoom.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] top-0 size-5 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-background-dark" />
              <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Visa Processing</h4>
              <p className="text-sm text-text-sec-light dark:text-text-sec-dark mb-1">August 2024</p>
              <p className="text-text-sec-light dark:text-text-sec-dark">Receive admission letter and apply for German Student Visa with our support.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] top-0 size-5 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-background-dark" />
              <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Arrival &amp; Orientation</h4>
              <p className="text-sm text-text-sec-light dark:text-text-sec-dark mb-1">September 2024</p>
              <p className="text-text-sec-light dark:text-text-sec-dark">Arrive in Berlin, move into accommodation, and attend orientation week.</p>
            </div>
          </div>
        </section>
        {/* Lotus Difference */}
        <section className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl border border-primary/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">The Lotus Difference</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-text-main-light dark:text-white shrink-0">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Local Support in Berlin</h4>
                  <p className="text-sm text-text-sec-light dark:text-text-sec-dark">Our Berlin office provides on-ground support for banking, housing, and registration.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-text-main-light dark:text-white shrink-0">
                  <span className="material-symbols-outlined">work</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Career Networking</h4>
                  <p className="text-sm text-text-sec-light dark:text-text-sec-dark">Exclusive access to job fairs and networking events with our partner companies.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Pricing */}
        <section className="scroll-mt-24" id="pricing">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">payments</span> Costs &amp; Fees
          </h3>
          <div className="overflow-hidden rounded-xl border border-border-light dark:border-border-dark">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-white/5 text-text-main-light dark:text-text-main-dark uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Frequency</th>
                  <th className="px-6 py-4 text-right">Estimated Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark bg-surface-light dark:bg-surface-dark">
                <tr>
                  <td className="px-6 py-4 font-medium">Tuition Fee</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">Per Semester</td>
                  <td className="px-6 py-4 text-right font-bold">├óÔÇÜ┬¼0 (Public Univ.)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Semester Contribution</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">Per Semester</td>
                  <td className="px-6 py-4 text-right">~ ├óÔÇÜ┬¼300</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Health Insurance</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">Monthly</td>
                  <td className="px-6 py-4 text-right">~ ├óÔÇÜ┬¼110</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Living Expenses</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">Monthly</td>
                  <td className="px-6 py-4 text-right">├óÔÇÜ┬¼900 - ├óÔÇÜ┬¼1,200</td>
                </tr>
                <tr className="bg-primary/5">
                  <td className="px-6 py-4 font-bold text-text-main-light dark:text-white">Lotus Consultancy Fee</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">One-time</td>
                  <td className="px-6 py-4 text-right font-bold text-text-main-light dark:text-white">Contact for Quote</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-sec-light dark:text-text-sec-dark mt-2">* Living expenses vary based on lifestyle and accommodation choices.</p>
        </section>
        {/* Video Embed */}
        <section className="scroll-mt-24" id="video">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">play_circle</span> Student Experience
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
              <p className="text-white font-bold text-lg">Life in Berlin as an International Student</p>
              <p className="text-white/80 text-sm">Hear from alumni about their journey.</p>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section className="scroll-mt-24" id="faq">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">help</span> Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <details className="group bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-text-main-light dark:text-text-main-dark font-bold">
                <span>Can I work while studying?</span>
                <span className="material-symbols-outlined transition group-open:-rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 leading-relaxed text-text-sec-light dark:text-text-sec-dark">
                Yes, international students in Germany can work up to 120 full days or 240 half days per year. This allows you to support your living expenses while gaining valuable work experience.
              </p>
            </details>
            <details className="group bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-text-main-light dark:text-text-main-dark font-bold">
                <span>Is accommodation guaranteed?</span>
                <span className="material-symbols-outlined transition group-open:-rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 leading-relaxed text-text-sec-light dark:text-text-sec-dark">
                Accommodation is not automatically guaranteed by the university. However, Lotus Abroad assists you in applying for student dormitories and finding private housing options well in advance.
              </p>
            </details>
            <details className="group bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-text-main-light dark:text-text-main-dark font-bold">
                <span>Are there scholarships available?</span>
                <span className="material-symbols-outlined transition group-open:-rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 leading-relaxed text-text-sec-light dark:text-text-sec-dark">
                Yes, there are various scholarships like DAAD and Deutschlandstipendium. Admission is merit-based. We can guide you through the application process for these financial aids.
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
                <span className="text-sm text-text-sec-light dark:text-text-sec-dark font-medium">Tuition Fee</span>
                <span className="text-xl font-bold text-text-main-light dark:text-text-main-dark">├óÔÇÜ┬¼0 <span className="text-xs font-normal text-text-sec-light">/ semester</span></span>
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <div>
                  <p className="text-xs text-text-sec-light dark:text-text-sec-dark">Duration</p>
                  <p className="font-bold text-text-main-light dark:text-text-main-dark">4 Semesters</p>
                </div>
                <div>
                  <p className="text-xs text-text-sec-light dark:text-text-sec-dark">Credits</p>
                  <p className="font-bold text-text-main-light dark:text-text-main-dark">120 ECTS</p>
                </div>
                <div>
                  <p className="text-xs text-text-sec-light dark:text-text-sec-dark">Intake</p>
                  <p className="font-bold text-text-main-light dark:text-text-main-dark">Winter (Oct)</p>
                </div>
                <div>
                  <p className="text-xs text-text-sec-light dark:text-text-sec-dark">Deadline</p>
                  <p className="font-bold text-red-500">June 15</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="w-full h-12 rounded-full bg-primary text-black font-bold text-sm hover:bg-yellow-400 transition-all flex items-center justify-center gap-2">
                <span>Start Application</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button className="w-full h-12 rounded-full bg-transparent border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark font-bold text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Download Brochure</span>
              </button>
            </div>
            <div className="text-center">
              <p className="text-xs text-text-sec-light dark:text-text-sec-dark">125 students applied last week</p>
            </div>
          </div>
          {/* Contact Widget */}
          <div className="bg-white dark:bg-white/5 p-5 rounded-[2rem] border border-border-light dark:border-border-dark flex items-center gap-4">
            <div className="size-12 rounded-full overflow-hidden bg-gray-200">
              <img alt="Consultant Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9Hc04D6pWtZb12Pz74OtgQh31-2bqeS5bXltDINf9_NAz4_-e6RxhEHdnIJJRhezjQp67_KMOMssgFYWvOZgRxZf15PEXqZTJW2mA5cc0FNxU9d3Am1rOauWzEWPoE0DkbC4JjFy_kgX4jV0BFc_m1YJ7h2MQZFJ2strWW5HjHpNWOZt3Cg3l2cs2NJUFZs5v1YUgkUI9IwoJEe2Y864U6waPCeFGGInoK-mRdhXo1pQEtZdaBDqqC_MLoEa1Kb3OJsyNiMFkaP4O" />
            </div>
            <div>
              <p className="text-xs text-text-sec-light dark:text-text-sec-dark">Need help?</p>
              <p className="font-bold text-sm text-text-main-light dark:text-text-main-dark">Talk to Sarah, our Germany Expert.</p>
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
        <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Similar Programs</h3>
        <a className="text-sm font-medium text-text-sec-light dark:text-text-sec-dark hover:text-primary transition-colors flex items-center gap-1" href="#">
          View all <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="group flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
          <div className="h-40 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="University building in Munich" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaDcsBmidN3zJqQ2-yANpKdW3QNA-6WAPm8rhRcl8LsrISZoP5c1U7eb9RkxmjkB1R0kbgASPIVhOZt1P4bpx15J-C-D4mBbVD_oz1HofX83eTL9_UrZ2GVtTl-IK5IRD1eCkT6kN28RdwMktfUccKFe0qp0rZ7PwO_V71dPLiQglw-j0QfkH21D7U_XWpWChbh5q1UI8kK9QZFuZjoOxUXw9Vb76_OZryKnQYWV4aK1lqsGzqjHMSVt_RSLcYs9AHY5H60g-_Do3G")'}} />
            <div className="absolute top-3 left-3 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md">Munich</div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="mb-2">
              <span className="text-xs font-medium text-primary bg-background-dark px-2 py-0.5 rounded">M.Sc.</span>
            </div>
            <h4 className="font-bold text-text-main-light dark:text-text-main-dark mb-1">Computer Science</h4>
            <p className="text-xs text-text-sec-light dark:text-text-sec-dark mb-4">Technical University Munich</p>
            <div className="mt-auto flex items-center justify-between text-xs font-medium border-t border-border-light dark:border-border-dark pt-3">
              <span className="text-text-sec-light dark:text-text-sec-dark">2 Years</span>
              <span className="text-text-main-light dark:text-text-main-dark">├óÔÇÜ┬¼150/sem</span>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="group flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
          <div className="h-40 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Hamburg cityscape with water" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKwzIt1BY0pR_qheHH2hOZhrxilBRgKTqwC93VQh3kmc7R7uZ29AZN6kDvEcknbXPv5wi9S3kvHwixZTv6x2SKcSDgdcdnWpvQ3nT9HM1cFbNdYsAcbQSrqLfTNmRTonPgA_bnGsxToDZz91M7N-TPyPfzHPbzJRrlmdA5Wi3I8qO4K-PNeGNJD8y78MZqEqwTVw7Hg736AJWQgE0cHoaapetExky7Vzfn0RTVHrlBA5CnKPFZ4Ym500SWIrzCk07msI_2sy84Ok6K")'}} />
            <div className="absolute top-3 left-3 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md">Hamburg</div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="mb-2">
              <span className="text-xs font-medium text-primary bg-background-dark px-2 py-0.5 rounded">M.A.</span>
            </div>
            <h4 className="font-bold text-text-main-light dark:text-text-main-dark mb-1">Digital Business</h4>
            <p className="text-xs text-text-sec-light dark:text-text-sec-dark mb-4">University of Hamburg</p>
            <div className="mt-auto flex items-center justify-between text-xs font-medium border-t border-border-light dark:border-border-dark pt-3">
              <span className="text-text-sec-light dark:text-text-sec-dark">1.5 Years</span>
              <span className="text-text-main-light dark:text-text-main-dark">├óÔÇÜ┬¼320/sem</span>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="group flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
          <div className="h-40 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Modern building in Berlin" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADmqUTptv14xdVx0e3x9q56svEXlveoCmxvQFT0pAuzH0zkOzWPpKrEbyT_ptMe4MDtOuvHG-T17AloVVFUkPtzC5KVRKetBWZTkmQYM4b_6oRBu_TxjzzqrcG45ByxBTWi1bGYvCUD-8EhsvGK8gR12d0P2_LOpLUnMCQIhzkGbyHrQqm4Nc2teoDzXKgbDXVlTpy24KORL-zgl4FF4ybCaxgpbumVF7HD_dV4v8vEXhQeB3LtCA1VN71HVKl0xMAo9cPwD3mtDDD")'}} />
            <div className="absolute top-3 left-3 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md">Berlin</div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="mb-2">
              <span className="text-xs font-medium text-primary bg-background-dark px-2 py-0.5 rounded">MBA</span>
            </div>
            <h4 className="font-bold text-text-main-light dark:text-text-main-dark mb-1">Global Management</h4>
            <p className="text-xs text-text-sec-light dark:text-text-sec-dark mb-4">ESMT Berlin</p>
            <div className="mt-auto flex items-center justify-between text-xs font-medium border-t border-border-light dark:border-border-dark pt-3">
              <span className="text-text-sec-light dark:text-text-sec-dark">1 Year</span>
              <span className="text-text-main-light dark:text-text-main-dark">├óÔÇÜ┬¼48,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  {/* Footer */}
  <footer className="mt-auto py-12 border-t border-border-light dark:border-border-dark bg-white dark:bg-surface-dark">
    <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="size-6 text-primary">
          <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">Lotus Abroad</span>
      </div>
      <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-text-sec-light dark:text-text-sec-dark">
        <a className="hover:text-primary transition-colors" href="#">Destinations</a>
        <a className="hover:text-primary transition-colors" href="#">About</a>
        <a className="hover:text-primary transition-colors" href="#">Services</a>
        <a className="hover:text-primary transition-colors" href="#">Privacy</a>
      </div>
      <p className="text-xs text-text-sec-light dark:text-text-sec-dark">├é┬® 2024 Lotus Abroad. All rights reserved.</p>
    </div>
  </footer>
</div>
    </>
  );
}
