const REDIRECTS = [
  {
    source: "/trustees",
    destination: "/about/trustees",
    permanent: true,
  },
  {
    source: "/account",
    destination: "/my-acecentre",
    permanent: true,
  },
  {
    source: "/ace-centre-learning/my-courses",
    destination: "/my-acecentre/courses",
    permanent: true,
  },
  {
    source: "/about/staff-member/:splat",
    destination: "/about/staff/:splat",
    permanent: true,
  },
  {
    source: "/news/:splat",
    destination: "/blog/:splat",
    permanent: true,
  },
  {
    source: "/project/:splat",
    destination: "/projects/:splat",
    permanent: true,
  },
  {
    source: "/news",
    destination: "/blog",
    permanent: true,
  },
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
    source: "/services/training",
    destination: "/learning",
    permanent: true,
  },
  {
    source: "/services/information",
    destination: "/advice-information",
    permanent: true,
  },
  {
    source: "/services/information/feedback",
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
    permanent: true,
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
    permanent: true,
  },
  {
    source: "/services/assessment",
    destination: "/services/assessments",
    permanent: true,
  },
];

module.exports = REDIRECTS;
