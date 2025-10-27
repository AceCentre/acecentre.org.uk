// Guide template types and interfaces
// GuideSection: { heading?: string; body: string; image?: string }
// GuideTemplate: { templateId: string; templateType: "guide"; title: string; category: string; subcategory?: string; level?: number; badgeText?: string; mainImage?: string; sections: GuideSection[] }

import config from "./config";

// Fallback guide templates in case API is unavailable
const fallbackGuideTemplates = [
  {
    templateId: "dance-selector-guide",
    templateType: "guide",
    title: "Dance Selector",
    category: "Activity Book",
    level: 4,
    badgeText: "Level 4",
    mainImage: "activity-book/dancing-figures.png",
    sections: [
      {
        heading: "Easy, errorless scanning with two switches",
        body: "I use two talking switches to choose people to dance. ...",
      },
      {
        heading: "What you'll need",
        body: "You'll need two talking switches for this to work. ...",
        image: "activity-book/bigmack-switch.png",
      },
    ],
  },
  {
    templateId: "communication-guide",
    templateType: "guide",
    title: "Communication Basics",
    category: "Communication",
    level: 1,
    badgeText: "Level 1",
    mainImage: "/images/communication.png",
    sections: [
      {
        heading: "Introduction to Communication",
        body: "This guide will help you understand the basics of communication and how to support individuals with communication needs.",
      },
      {
        heading: "Understanding Communication",
        body: "Communication is more than just speech. It includes gestures, facial expressions, and other forms of expression.",
      },
      {
        heading: "Supporting Communication",
        body: "Learn how to create an environment that supports and encourages communication for all individuals.",
      },
    ],
  },
];

export const getGuideTemplates = async () => {
  try {
    // Fetch from the API
    const response = await fetch(`${config.launchpadUrl}/api/activity-book`);
    if (response.ok) {
      const templates = await response.json();
      return templates;
    }
  } catch (error) {
    console.error("Error fetching guide templates:", error);
  }

  // Fallback to mock data if API fails
  return fallbackGuideTemplates;
};

export const getGuideTemplate = async (templateId) => {
  const templates = await getGuideTemplates();
  return templates.find((template) => template.templateId === templateId);
};

export const getGuideProducts = async () => {
  const templates = await getGuideTemplates();

  // Convert templates to product format for consistency with existing system
  return templates.map((template, index) => ({
    id: index + 1,
    slug: template.templateId,
    date: new Date().toISOString(),
    name: template.title,
    description:
      template.sections
        .map((s) => s.body)
        .join(" ")
        .substring(0, 200) + "...",
    shortDescription:
      template.sections[0]?.body?.substring(0, 100) + "..." ||
      "A helpful guide for communication and activities.",
    attachedResources: [],
    featured: false,
    totalSales: 0,
    price: 0,
    variations: [],
    gallery: [],
    inStock: true,
    category: { name: template.category },
    projects: [],
    ebook: null,
    instantDownloadAvailable: true,
    image: {
      src: template.mainImage || "/images/default-guide.png",
      alt: `Guide: ${template.title}`,
    },
    isGuideTemplate: true, // Use different components when this is true
    guideSlug: template.templateId,
  }));
};

export const getGuideCategories = async () => {
  const templates = await getGuideTemplates();

  return templates.map((template) => {
    return {
      templateId: template.templateId,
      templateCategory: template.category,
      templateSubcategory: template.subcategory || "",
      templateCategorySlug: slugify(template.category),
      templateSubcategorySlug: slugify(template.subcategory || ""),
    };
  });
};

const slugify = (str) => {
  if (!str) return "";
  return str.split(" ").join("-").toLowerCase();
};
