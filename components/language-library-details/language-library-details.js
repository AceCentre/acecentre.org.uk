import { queryTypes } from "next-usequerystate";

export const DETAILS_CONFIG = {
  sections: [
    {
      name: "Language",
      sections: [
        {
          slug: "languages",
          queryType: queryTypes.array(queryTypes.string).withDefault([]),
          name: "Languages",
          tooltip: "The languages the resource is in",
          getAllUniqueValues: (resources, results) => {
            let byKey = {};

            for (let resource of resources) {
              for (let current of resource.languages) {
                byKey[current.slug] = {
                  slug: current.slug,
                  name: current.name,
                  count: 0,
                };
              }
            }

            for (let resource of results) {
              for (let current of resource.languages) {
                byKey[current.slug].count += 1;
              }
            }

            return Object.values(byKey);
          },
          getDetail: (resource) =>
            resource.languages.map((x) => x.name).join(", "),
          getFilterValues: (resource) => resource.languages.map((x) => x.slug),
        },
        // {
        //   name: "Translation Method",
        //   slug: "translationMethod",
        //   queryType: queryTypes.array(queryTypes.string).withDefault([]),
        //   tooltip: "How the resource was translated",
        //   getAllUniqueValues: uniqueValues("translationMethods"),

        //   getDetailTooltip: (resource) => {
        //     let methods = resource.translationMethods.nodes;
        //     if (methods.length !== 1) return null;
        //     let method = methods[0];

        //     return method.description;
        //   },
        //   getDetail: (resource) => {
        //     let methods = resource.translationMethods.nodes;
        //     if (methods.length !== 1) return null;
        //     let method = methods[0];
        //     return method.name;
        //   },
        //   getFilterValues: (resource) =>
        //     resource.translationMethods.nodes.map((x) => x.slug),
        // },
        // {
        //   name: "Format",
        //   slug: "format",
        //   queryType: queryTypes.array(queryTypes.string).withDefault([]),
        //   tooltip:
        //     "If the resource is designed to be used as high-tech or low-tech",
        //   getAllUniqueValues: uniqueValues("formats"),

        //   getDetail: (resource) =>
        //     resource.formats.nodes.map((x) => x.name).join(", "),
        //   getFilterValues: (resource) =>
        //     resource.formats.nodes.map((x) => x.slug),
        // },
      ],
    },
  ],
};

export const flatSections = (config) =>
  config.sections.flatMap((x) => x.sections);
