import Fuse from "fuse.js";

export const SEARCHABLE_PAGES = [
  {
    title: "Getting started",
    href: "/getting-started",
    description:
      "Learn about Augmentative and Alternative Communication (AAC) and how it can help.",
    keywords: [
      "getting started",
      "start",
      "begin",
      "AAC",
      "AT",
      "introduction",
    ],
    featuredImage: {
      src: "/getting-started.svg",
      alt: "Getting started with AAC and AT",
    },
  },
  {
    title: "What is AAC / What is AT?",
    href: "/getting-started/what-is-aac-what-is-at",
    description:
      "AT stands for Assistive Technology and AAC stands for Augmentative and Alternative Communication.",
    keywords: [
      "what is AAC",
      "what is AT",
      "augmentative",
      "alternative communication",
      "assistive technology",
      "AAC meaning",
    ],
    featuredImage: { src: "/what-is-aac.jpeg", alt: "What is AAC?" },
  },
  {
    title: "Which is the right communication aid for me?",
    href: "/getting-started/find-right-communication-aid",
    description:
      "Without doubt, AT such as communication aids can be life-changing. There is no one size fits all communication aid solution.",
    keywords: [
      "communication aid",
      "right aid",
      "device",
      "choose",
      "which aid",
    ],
    featuredImage: {
      src: "/finding-the-right-aid-cover.jpg",
      alt: "Finding the right communication aid",
    },
  },
  {
    title: "How can I access my computer better?",
    href: "/getting-started/i-difficulty-accessing-computer-i",
    description:
      "Access to screen based technology such as computers and tablets is vitally important for communication, learning and independence.",
    keywords: [
      "computer access",
      "accessing the computer",
      "switch",
      "eye gaze",
      "tablet access",
      "screen access",
    ],
    featuredImage: {
      src: "/computer-access.jpeg",
      alt: "Computer access",
    },
  },
  {
    title: "About us",
    href: "/about",
    description:
      "Ace Centre is a charity offering support to people with complex communication needs.",
    keywords: ["about", "about us", "charity", "who we are", "organisation"],
    featuredImage: { src: "/nov25staff.jpg", alt: "Ace Centre team" },
  },
  {
    title: "Our team",
    href: "/about/staff",
    description:
      "Ace Centre is a multi-disciplinary team of specialist teachers, occupational therapists, speech and language therapists with the support of technical and administrative staff.",
    keywords: [
      "team",
      "staff",
      "therapists",
      "people",
      "who works here",
    ],
    featuredImage: { src: "/nov25staff.jpg", alt: "Our team" },
  },
  {
    title: "Our trustees",
    href: "/about/trustees",
    description:
      "Ace Centre is hugely thankful to its trustees, who help steer and oversee the organisation’s direction.",
    keywords: ["trustees", "board", "governance"],
    featuredImage: {
      src: "/trustee-collage.png",
      alt: "Ace Centre trustees",
    },
  },
  {
    title: "Work with us",
    href: "/work-with-us",
    description: "The latest vacancies and jobs available at Ace Centre.",
    keywords: [
      "jobs",
      "vacancies",
      "careers",
      "work with us",
      "recruitment",
      "employment",
    ],
    featuredImage: { src: "/careers-cover.jpeg", alt: "Work with us" },
  },
  {
    title: "People we support",
    href: "/people-we-support",
    description:
      "Stories of the people Ace Centre works with, and how communication technology supports their lives.",
    keywords: [
      "people we support",
      "case studies",
      "stories",
      "clients",
      "service users",
    ],
    featuredImage: { src: "/Ollie.jpg", alt: "People we support" },
  },
  {
    title: "Contact us",
    href: "/contact",
    description:
      "If you think Ace Centre can help you or someone you know please get in touch.",
    keywords: [
      "contact",
      "get in touch",
      "phone",
      "email",
      "helpline",
      "address",
    ],
    featuredImage: { src: "/services/advice.jpg", alt: "Contact Ace Centre" },
  },
  {
    title: "Technical support",
    href: "/technical-support",
    description: "What to do when you need help with Ace Centre equipment or software.",
    keywords: [
      "technical support",
      "tech support",
      "helpdesk",
      "repair",
      "equipment help",
      "device support",
    ],
    featuredImage: {
      src: "/services/engineering.jpg",
      alt: "Technical support",
    },
  },
  {
    title: "Information appointment",
    href: "/information-appointments",
    description:
      "Book an informal chat about your AAC or AT needs with members of the Ace Centre team.",
    keywords: [
      "information appointment",
      "book appointment",
      "informal chat",
      "drop in",
      "advice appointment",
    ],
    featuredImage: {
      src: "/Info-Appointment-Picture.jpg",
      alt: "Information appointment",
    },
  },
  {
    title: "AAC Language Library",
    href: "/language-library",
    description: "A library of AAC resources catalogued by language.",
    keywords: [
      "language library",
      "languages",
      "multilingual",
      "translation",
      "AAC language",
      "other languages",
    ],
    featuredImage: {
      src: "/aac-books.png",
      alt: "AAC Language Library",
    },
  },
  {
    title: "Get involved",
    href: "/get-involved",
    description:
      "Support Ace Centre so people with the severest communication challenges continue to benefit from professional assessment and intervention.",
    keywords: [
      "get involved",
      "support us",
      "fundraising",
      "volunteer",
      "charity",
    ],
    featuredImage: { src: "/get-involved.jpg", alt: "Get involved" },
  },
  {
    title: "Donate",
    href: "/get-involved/donate",
    description:
      "Ace Centre is a professionally run charity. Donate to help maintain and expand our services.",
    keywords: [
      "donate",
      "donation",
      "give",
      "justgiving",
      "fundraising",
      "charity donation",
    ],
    featuredImage: { src: "/donate.jpg", alt: "Donate to Ace Centre" },
  },
  {
    title: "Assistive Tech User's Network (ATUN)",
    href: "/get-involved/atun",
    description:
      "The Assistive Tech User's Network connects people who use assistive technology.",
    keywords: ["ATUN", "user network", "peer support", "assistive tech users"],
    featuredImage: { src: "/atun-cover.jpeg", alt: "ATUN" },
  },
  {
    title: "AT Scholar",
    href: "/at-scholar",
    description:
      "AT Scholar supports learning and development in assistive technology.",
    keywords: ["AT Scholar", "scholarship", "bursary"],
    featuredImage: {
      src: "/atscholar-banner.jpg",
      alt: "AT Scholar",
    },
  },
  {
    title: "NHS Service Finder",
    href: "/nhs-service-finder",
    description: "Find an assistive technology service near you.",
    keywords: [
      "NHS",
      "service finder",
      "find a service",
      "local service",
      "AAC service near me",
      "postcode",
    ],
    featuredImage: {
      src: "/nhs-service-finder.jpeg",
      alt: "NHS Service Finder",
    },
  },
];

export const searchPages = (searchText, limit = 4) => {
  if (!searchText) return [];

  const fuse = new Fuse(SEARCHABLE_PAGES, {
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
