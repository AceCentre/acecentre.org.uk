const REDIRECTS = [
  {
    source: "/:path*",
    has: [{ type: "host", value: "www.acecentre.org.uk" }],
    destination: "https://acecentre.org.uk/:path*",
    permanent: true,
  },
  {
    source: "/trustees",
    destination: "/about/trustees",
    permanent: true,
  },
  { source: "/account", destination: "/my-acecentre", permanent: true },
  {
    source: "/ace-centre-learning/my-courses",
    destination: "/my-acecentre/courses",
    permanent: true,
  },
  {
    source: "/about/staff-member/:splat*",
    destination: "/about/staff/:splat*",
    permanent: true,
  },
  {
    source: "/project/:splat*",
    destination: "/projects/:splat*",
    permanent: true,
  },
  { source: "/news/:splat*", destination: "/blog/:splat*", permanent: true },
  {
    source: "/project/:splat*",
    destination: "/projects/:splat*",
    permanent: true,
  },
  { source: "/news", destination: "/blog", permanent: true },
  {
    source: "/getting-started/faqs-frequently-asked-questions",
    destination: "/getting-started",
    permanent: true,
  },
  {
    source: "/services/training",
    destination: "/learning",
    permanent: true,
  },
  {
    source: "/services/information",
    destination: "/services/advice-information",
    permanent: true,
  },
  {
    source: "/services/information/feedback/",
    destination: "/form/information-appointment-feedback",
    permanent: true,
  },
  {
    source: "/privacy",
    destination: "/page/ace-centre-privacy-policy-3",
    permanent: true,
  },
  {
    source: "/page/privacy",
    destination: "/page/ace-centre-privacy-policy-3",
    permanent: true,
  },
  {
    source: "/ace-centre-privacy-policy-3",
    destination: "/page/ace-centre-privacy-policy-3",
    permanent: true,
  },
  {
    source: "/purchase-terms-and-conditions",
    destination: "/page/purchase-terms-and-conditions",
    permanent: true,
  },
  {
    source: "/safeguarding-policies",
    destination: "/page/safeguarding-policies",
    permanent: true,
  },
  // Specific legacy upload path before generic wp-content redirect
  {
    source: "/wp-content/uploads/formid",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/wp-content/:splat*",
    destination: "https://backend.acecentre.org.uk/wp-content/:splat*",
    permanent: false,
  },
  {
    source: "/ace-centre-learning",
    destination: "/learning",
    permanent: true,
  },
  {
    source: "/resources/copyright-and-licence-terms-for-non-profit-items",
    destination: "/page/copyright-and-licence-terms-for-non-profit-items",
    permanent: true,
  },
  {
    source: "/consent-form-2",
    destination:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrEio9bWrHCRGoqxiKrWB3RlUMTJIR0NZVTNKMklEMjJHQ0dLQ1ZGMDBKTiQlQCN0PWcu",
    permanent: true,
  },
  {
    source: "/rehadapt-manuals",
    destination:
      "https://acecentreuk.sharepoint.com/:f:/s/AnonymousShares/Ev7kOA08b1BFgY7tObc2XtgBzosxS_2fpYgOr1nnTJseVQ?e=BpZ91P",
    permanent: false,
  },
  {
    source: "/services/assessment",
    destination: "/services/assessments",
    permanent: true,
  },
  {
    source: "/resources/electronic-text-based-comparison-chart",
    destination:
      "https://backend.acecentre.org.uk/resources/electronic-text-based-comparison-chart",
    permanent: true,
  },
  {
    source: "/resources/electronic-text-based-features-checklist",
    destination:
      "https://backend.acecentre.org.uk/resources/electronic-text-based-features-checklist",
    permanent: true,
  },
  {
    source: "/resources/developing-using-communication-book-templates",
    destination: "/resources/developing-using-communication-book",
    permanent: true,
  },
  {
    source: "/services/assessment/nhs-referral",
    destination: "/services/nhs/assessments",
    permanent: true,
  },
  {
    source:
      "/resources/access-to-low-tech-symbol-based-resources-when-pointing-is-difficult",
    destination:
      "/resources/paper-based-resources-to-support-communication-for-adults-with-progressive-conditions",
    permanent: true,
  },
  {
    source: "/resources/using-low-tech-symbol-based-systems-with-children",
    destination:
      "/resources/access-to-paper-based-symbol-resources-when-pointing-is-difficult",
    permanent: true,
  },
  {
    source: "/resources/getting-started-aac",
    destination: "/resources/all?category=made-by-ace&subcategory=e-books",
    permanent: true,
  },
  {
    source: "/ducbdownloads",
    destination: "/resources/developing-using-communication-book",
    permanent: true,
  },
  {
    source: "/youmatter",
    destination: "/resources/all?category=shop&searchText=youmatter&page=1",
    permanent: true,
  },
  {
    source: "/learning/learn-at-engineering",
    destination: "/learning/cad-in-at",
    permanent: true,
  },
  {
    source: "/accredited-assistive-technology-jan23",
    destination: "/learning/atu",
    permanent: true,
  },
  {
    source: "/resources/identifying-vocabulary-for-a-communication-book",
    destination: "/resources/identifying-vocabulary-to-personalise-aac",
    permanent: true,
  },
  {
    source: "/resources/identifying-vocabulary-for-topic-pages",
    destination: "/resources/identifying-vocabulary-to-personalise-aac",
    permanent: true,
  },
  {
    source: "/feedback",
    destination: "/form/general-feedback",
    permanent: true,
  },
  {
    source: "/ebooks-symbols",
    destination: "/resources/getting-started-with-paper-based-symbol-resources",
    permanent: true,
  },
  {
    source: "/ebooks",
    destination: "/resources/all?category=made-by-ace&subcategory=e-books",
    permanent: true,
  },
  {
    source: "/account/lost-password",
    destination: "/my-acecentre/forgot-password",
    permanent: true,
  },
  {
    source: "/resources/abc-some-phrases",
    destination: "/resources/qwerty-2",
    permanent: true,
  },
  {
    source: "/resources/abc",
    destination: "/resources/qwerty-2",
    permanent: true,
  },
  {
    source: "/resources/abc-and-numbers",
    destination: "/resources/qwerty-2",
    permanent: true,
  },
  {
    source: "/resources/simple-charts-to-edit-in-word",
    destination: "/resources/qwerty-2",
    permanent: true,
  },
  {
    source: "/resources/abc-2",
    destination: "/resources/qwerty-2",
    permanent: true,
  },
  {
    source: "/resources/qwerty-and-numbers",
    destination: "/resources/qwerty-2",
    permanent: true,
  },
  {
    source: "/resources/high-contrast-abc-qwerty",
    destination: "/resources/qwerty-2",
    permanent: true,
  },
  {
    source: "/service-leads-ms-bookings-calendars",
    destination: "/page/service-leads-ms-bookings-calendars",
    permanent: true,
  },
  {
    source: "/blog/comm-works",
    destination: "/communication-works",
    permanent: true,
  },
  {
    source: "/blog/comm-works-2025",
    destination: "/communication-works-2025",
    permanent: true,
  },
  {
    source: "/events/comm-works",
    destination: "/communication-works",
    permanent: true,
  },
  {
    source: "/events/comm-works-2023",
    destination: "/communication-works-2023",
    permanent: true,
  },
  {
    source: "/events/comm-works-2024",
    destination: "/communication-works-2024",
    permanent: true,
  },
  {
    source: "/events/comm-works-2025",
    destination: "/communication-works-2025",
    permanent: true,
  },
  {
    source: "/events/comm-works-2026",
    destination: "/communication-works-2026",
    permanent: true,
  },
  {
    source: "/acl-comm",
    destination: "/learning/search?category=communication",
    permanent: true,
  },
  {
    source: "/alphabet-charts",
    destination: "/resources/all?category=alphabet-charts",
    permanent: true,
  },
  {
    source: "/page/service-leads-ms-bookings-calendars",
    destination:
      "https://backend.acecentre.org.uk/service-leads-ms-bookings-calendars/",
    permanent: true,
  },
  {
    source: "/blog/at-scholar-2024",
    destination: "/at-scholar",
    permanent: true,
  },
  {
    source: "/look2talk",
    destination: "/resources/look2talk",
    permanent: true,
  },
  {
    source: "/my-acecentre/courses",
    destination: "https://moodle.acecentre.org.uk/login/index.php",
    permanent: true,
  },
  {
    source: "/resources/communication-partners",
    destination:
      "https://acecentre.arlo.co/w/events/9-communication-partners-free-resources",
    permanent: true,
  },
  // Activity Book / FUNctional Switching legacy resource URLs
  // Redirect old resource/activity-book URLs to the main activity-book page
  {
    source: "/resources/fancy-dress",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/red-light-green-light",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/disco",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/musical-statues",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/tickle-time",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/body-bop",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/next-page",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/bigger-or-smaller",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/humans-as-animals",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/whos-calling",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/sharing-news",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/freeze",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/were-going-on-a-bear-hunt",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/follow-the-cup",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/brown-bear-brown-bear",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/dance-selector",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/doggy-tricks",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/resources/spin-to-position",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/activity-book/initiate-conversation",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/activity-book/show-and-tell",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/activity-book/fart-prank",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/activity-book/news-sharing",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/activity-book/communication-guide",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/activity-book/school-errands",
    destination: "/activity-book",
    permanent: true,
  },
  {
    source: "/activity-book/dance-selector-guide",
    destination: "/activity-book",
    permanent: true,
  },
  // Deleted/legacy resources – send to resources overview
  {
    source: "/resources/baubles",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/clue-book",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/just-test",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/dressing-up-as-a-princess",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/medical-kit",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/communication-guide",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/blocks-eye-pointing",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/e-tran-frame",
    destination: "/resources/all",
    permanent: true,
  },
  // Alphabet charts / listener-mediated resources
  {
    source: "/resources/listener-mediated-chart-pack",
    destination: "/resources/all?category=alphabet-charts",
    permanent: true,
  },
  {
    source: "/resources/listener-mediated-launchpad",
    destination: "/resources/all?category=alphabet-charts",
    permanent: true,
  },
  {
    source: "/product-category/alphabet-charts/coded-spelling-boards/",
    destination: "/resources/all?category=alphabet-charts",
    permanent: true,
  },
  // Blog and news legacy URLs → blog index
  {
    source: "/blog/tribute-professor-stephen-hawking",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/blog/send-technology-research-2019-summary",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/blog/annual-inspection-and-review-of-nhse-client-equipment",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/blog/estimated-prevalence-aac-population-data-2023-2024",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/blog/the-assistive-tech-conundrum-in-app-vs-os-level-integration",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/blog/test-for-general",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/blog/test-for-none",
    destination: "/resources/all",
    permanent: true,
  },
  // News pagination URLs – we already send /news/:splat* → /blog/:splat*,
  // but these specific legacy URLs should land on the blog index.
  {
    source: "/news/finding-my-voice-to-make-a-difference/",
    destination: "/blog",
    permanent: true,
  },
  // Services / NHS legacy URLs
  {
    source: "/services/nhs/assessments",
    destination: "/services/nhs",
    permanent: true,
  },
  {
    source: "/services/nhs/not-temp-assesment",
    destination: "/services/nhs",
    permanent: true,
  },
  {
    source: "/services/nhs/not-assesment-process",
    destination: "/services/nhs",
    permanent: true,
  },
  {
    source: "/services/nhs/temp-assessment",
    destination: "/services/nhs",
    permanent: true,
  },
  {
    source: "/services/assessment/nhs-referral/",
    destination: "/services/nhs",
    permanent: true,
  },
  {
    source: "/services/assessment/nhs-referral",
    destination: "/services/nhs",
    permanent: true,
  },
  {
    source: "/services/nhs/temp-assesment",
    destination: "/services/nhs",
    permanent: true,
  },
  {
    source: "/services/nhs/assesment-process",
    destination: "/services/nhs",
    permanent: true,
  },
  {
    source:
      "/nhs-service-finder/www.stgeorges.nhs.uk/services/community-services/wheelchair-service-and-rehabilitation-engineering",
    destination: "/services/nhs",
    permanent: true,
  },
  {
    source: "/services/consultancy/",
    destination: "/services/nhs",
    permanent: true,
  },
  // NHS Service Finder legacy URLs
  {
    source: "/nhs-service-finder/bcas",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/www.shropshirecommunityhealth.nhs.uk",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/soh-tr.info@nhs.net",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/www.kentcht.nhs.uk",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/www.rhn.org.uk",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source:
      "/nhs-service-finder/www.blatchford.co.uk/locations/hull-nhs-wheelchair-service",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/www.knowsleycil.org",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/www.islington.gov.uk",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/www.dorsetwheelchairs.nhs.uk",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/www.liverpoollifehouse.org.uk",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/www.inspirecommunitytrust.org",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/www.bhamcommunity.nhs.uk/wheelchair",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/n/a",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/www.nuh.nhs.uk",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  {
    source: "/nhs-service-finder/www.opcare.co.uk",
    destination: "/nhs-service-finder",
    permanent: true,
  },
  // Ebooks landing pages
  {
    source:
      "/ebooks/paper-based-resources-to-support-communication-for-adults-with-progressive-conditions",
    destination: "/ebooks/",
    permanent: true,
  },
  {
    source: "/ebooks/designing-and-using-alphabet-charts",
    destination: "/ebooks/",
    permanent: true,
  },
  // Projects
  {
    source: "/project/look2talk/",
    destination: "/projects/all",
    permanent: true,
  },
  {
    source: "/project/rite-project-2001-2006-dare/",
    destination: "/projects/all",
    permanent: true,
  },
  // People we support
  {
    source: "/people-we-support/share-your-ace-story_1046/",
    destination: "/people-we-support",
    permanent: true,
  },
  // About / staff
  {
    source: "/about/staff/page/2/",
    destination: "/about/staff",
    permanent: true,
  },
  {
    source: "/about/our-networks/",
    destination: "/about/staff",
    permanent: true,
  },
  {
    source: "/about/staff/martin-fisher",
    destination: "/about/staff",
    permanent: true,
  },
  {
    source: "/about/staff/gavin-henderson",
    destination: "/about/staff",
    permanent: true,
  },
  // 410 → /resources/all
  {
    source: "/support-us/community-corporate-support/",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/support-us/why-support-ace/",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/support-us/fundraise/",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/events/learning/currently-available-courses/",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/event/aacunit1-2/",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/event/network-day",
    destination: "/blog",
    permanent: true,
  },
  {
    source:
      "/blog/clare-latham-from-communication-books-to-childrens-booksTable",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/blog/introducing-the-",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/resources/pragmatics-profile-people-use-",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/get-",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/switch-",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/pragmatics-",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/wp-",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/project/switch-scanning-frequency-analysis/With",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/people-we-support/case-study/undefined",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/communication-",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/look2talk",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/wp-includes/css/dist/bloc",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/wp-includes/css/dashicons",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/creating-",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/people-we-support이거",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/resources/speakbook)",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/docs/Eligibility-Criteria-for-NHSE-Specialised-AAC-Services.pdf",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/contact/email-correspondence/",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/aac-awareness-month-31-tips-for-31-days/",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/library",
    destination: "/resources/all",
    permanent: true,
  },
  {
    source: "/lti",
    destination: "/resources/all",
    permanent: true,
  },
];

module.exports = REDIRECTS;
