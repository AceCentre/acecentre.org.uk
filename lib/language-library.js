export const getLanguageLibraryResource = async (slug) => {
  const response = await fetch(
    "https://language-library.acecentre.org.uk/wp-json/language-library/v1/resources"
  );

  const result = await response.json();

  const resource = result.find((x) => x.post.post_name == slug);

  let relevantResources = [];

  // Sort english last. Its unlikely English is going to be the language we want to focus on.
  let sortedLanguages = resource.languages.sort((a, b) => {
    if (a.slug === "english" && b.slug !== "english") return 1;
    if (b.slug === "english" && a.slug !== "english") return -1;
    return 0;
  });

  for (const currentLanguage of sortedLanguages) {
    let resourceFromLanguage = result.filter((current) => {
      let languages = current.languages.map((x) => x.slug);

      return languages.includes(currentLanguage.slug);
    });

    relevantResources = [...relevantResources, ...resourceFromLanguage];
  }

  relevantResources = uniquePosts(relevantResources);

  return { ...resource, relevantResources: relevantResources.slice(0, 4) };
};

const uniquePosts = (resources) => [
  ...new Map(resources.map((item) => [item.post.post_name, item])).values(),
];

const arrayUniqueByKey = (array, key) => [
  ...new Map(array.map((item) => [item[key], item])).values(),
];

export const getLanguageLibraryLandingPageData = async () => {
  const response = await fetch(
    "https://language-library.acecentre.org.uk/wp-json/language-library/v1/resources"
  );

  const result = await response.json();

  const allLanguages = result.flatMap((x) => x.languages);

  const featuredPosts = result.filter((x) => {
    const displayTags = x.display.map((y) => y.slug);
    return displayTags.includes("featured");
  });

  return {
    featuredPosts,
    languages: arrayUniqueByKey(allLanguages, "slug"),
  };
};

export const getLanguageLibrarySearchResultsProps = async () => {
  const response = await fetch(
    "https://language-library.acecentre.org.uk/wp-json/language-library/v1/resources"
  );

  const result = await response.json();

  return result;
};

export const getAllSlugs = async () => {
  const response = await fetch(
    "https://language-library.acecentre.org.uk/wp-json/language-library/v1/slugs"
  );

  const result = await response.json();

  return result;
};
