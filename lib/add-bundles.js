export const addBundles = (course, allBundles) => {
  console.log(allBundles, course);

  let bundles = [];

  for (const bundle of allBundles) {
    // Dont actually show this bundle its just for testing
    if (bundle.slug === "on-demand-test-bundle") continue;

    const courseSlugs = bundle.courses.map((course) => course.slug);

    if (courseSlugs.includes(course.slug)) {
      bundles.push(bundle);
    }
  }

  return { ...course, bundles };
};
