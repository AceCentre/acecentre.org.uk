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
    source: "/acl-comm",
    destination: "/learning/search?category=communication",
    permanent: true,
  },
  {
    source: "/alphabet-charts",
    destination: "/resources/all?category=alphabet-charts",
    permanent: true,
  },
];

module.exports = REDIRECTS;
