import Fuse from "fuse.js";

export const SEARCHABLE_SERVICES = [
  {
    title: "Services",
    href: "/services",
    description:
      "Ace Centre provides a range of services to support children and adults with severe communication difficulties.",
    keywords: ["services", "support"],
    featuredImage: { src: "/services/advice.jpg", alt: "Ace Centre services" },
  },
  {
    title: "Supervision and Mentoring",
    href: "/services/clinical-supervision",
    description:
      "Clinical supervision and mentoring for AAC practice, with guidance from Ace Centre therapists to support professional learning and development.",
    keywords: [
      "mentor",
      "mentoring",
      "supervision",
      "clinical supervision",
      "HCPC",
      "professional development",
    ],
    featuredImage: {
      src: "/supervision-thumbnail.jpeg",
      alt: "Supervision and Mentoring",
    },
  },
  {
    title: "Assessments",
    href: "/services/assessments",
    description:
      "Our assessment and training team will work with the individual, family and involved professionals to identify and achieve goals to support communication, learning and independence.",
    keywords: ["assessment", "assessments", "AAC assessment"],
    featuredImage: {
      src: "/services/assessments.jpg",
      alt: "Assessments",
    },
  },
  {
    title: "Self-funded assessments",
    href: "/services/self-funded-assessments",
    description:
      "Independent interdisciplinary assessments to identify appropriate assistive technology resources for people with physical and/or communication impairments.",
    keywords: ["self-funded", "private assessment", "independent assessment"],
    featuredImage: {
      src: "/services/assessments.jpg",
      alt: "Self-funded assessments",
    },
  },
  {
    title: "Advice & information",
    href: "/services/advice-information",
    description:
      "Remote and face to face support so you can chat about your AAC and AT needs with members of the Ace Centre team.",
    keywords: ["advice", "information", "helpline", "advice line"],
    featuredImage: { src: "/services/advice.jpg", alt: "Advice and information" },
  },
  {
    title: "Engineering",
    href: "/services/engineering",
    description:
      "Our multi-disciplinary team design and develop innovative assistive technology solutions.",
    keywords: ["engineering", "3D printing", "custom", "bespoke"],
    featuredImage: { src: "/services/engineering.jpg", alt: "Engineering" },
  },
  {
    title: "Mount Installation",
    href: "/services/mounting",
    description:
      "Our engineers can assess for and supply a wide range of mounting solutions.",
    keywords: ["mount", "mounting", "device mount", "wheelchair mount"],
    featuredImage: { src: "/services/mounting.jpeg", alt: "Device mounting" },
  },
  {
    title: "Rehadapt Mount Fitting",
    href: "/services/rehadapt",
    description:
      "We can fit mounting systems specified by the Rehadapt Virtual Mounting System.",
    keywords: ["rehadapt", "mount fitting", "virtual mounting"],
    featuredImage: { src: "/services/mounting.jpeg", alt: "Rehadapt mount fitting" },
  },
  {
    title: "Partnerships",
    href: "/services/partnerships",
    description:
      "Through our Partnerships (Service Level Agreement) we achieve positive outcomes by drawing on our multidisciplinary team.",
    keywords: ["partnerships", "SLA", "service level agreement"],
    featuredImage: { src: "/services/partnership.jpg", alt: "Partnerships" },
  },
  {
    title: "Research",
    href: "/services/research",
    description:
      "Research and development projects that enhance achievement and good practice in AT and AAC.",
    keywords: ["research", "development", "R&D"],
    featuredImage: { src: "/services/research.jpg", alt: "Research" },
  },
  {
    title: "NHS Services",
    href: "/services/nhs",
    description:
      "Ace Centre provides a range of NHS commissioned services to support children and adults with severe communication difficulties.",
    keywords: ["NHS", "specialised AAC", "NHS England"],
    featuredImage: { src: "/services/nhs.jpg", alt: "NHS Services" },
  },
  {
    title: "Understanding the referral process",
    href: "/services/nhs/referral-process",
    description:
      "How to refer to Ace Centre's NHS England specialised AAC services across the North West and Wessex & Thames Valley.",
    keywords: ["referral", "refer", "NHS referral", "specialised AAC"],
    featuredImage: {
      src: "/services/referral-process-cover-3.jpeg",
      alt: "NHS referral process",
    },
  },
  {
    title: "What happens at an assessment",
    href: "/services/nhs/assessment-process",
    description:
      "What to expect at an Ace Centre NHS specialised AAC assessment.",
    keywords: ["NHS assessment", "assessment process", "what happens"],
    featuredImage: {
      src: "/services/assesments-hero-cover.png",
      alt: "NHS assessment process",
    },
  },
  {
    title: "I have an Ace Centre device",
    href: "/services/nhs/I-have-a-device",
    description:
      "Support if you already have an Ace Centre communication device provided through NHS specialised AAC services.",
    keywords: ["device", "I have a device", "equipment", "repair"],
    featuredImage: {
      src: "/services/I-have-a-device-cover-3.jpeg",
      alt: "I have an Ace Centre device",
    },
  },
  {
    title: "LAACES",
    href: "/services/nhs/laaces",
    description:
      "Support for the establishment and development of local AAC services in the Thames Valley & Wessex and Northwest regions.",
    keywords: ["LAACES", "local AAC services", "local services"],
    featuredImage: { src: "/services/laaces.jpg", alt: "LAACES" },
  },
];

export const searchServices = (searchText, limit = 4) => {
  if (!searchText) return [];

  const fuse = new Fuse(SEARCHABLE_SERVICES, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "keywords", weight: 0.3 },
      { name: "description", weight: 0.2 },
    ],
    threshold: 0.4,
    ignoreLocation: true,
  });

  return fuse
    .search(searchText)
    .map((result) => result.item)
    .slice(0, limit);
};
