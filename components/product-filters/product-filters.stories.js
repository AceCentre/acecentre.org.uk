import { ProductFilters } from "./product-filters";

export default {
  title: "Resources/ProductFilters",
  component: ProductFilters,
};

const Template = (args) => <ProductFilters {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  selectedCategory: "learning",
  resourceCount: 10,
  categories: [
    {
      name: "Ace Centre Courses",
      id: "dGVybToxNTU=",
      slug: "acecentrecourses",
      subcategories: [],
    },
    {
      name: "Ace Centre Learning",
      id: "dGVybToxNjA=",
      slug: "learning",
      subcategories: [
        {
          name: "Access",
          id: "dGVybToxNTY=",
          slug: "access",
        },
        {
          name: "Communication",
          id: "dGVybToxNTc=",
          slug: "communication",
        },
        {
          name: "Education",
          id: "dGVybToxNTg=",
          slug: "education",
        },
      ],
    },
    {
      name: "Alphabet Charts",
      id: "dGVybToyNw==",
      slug: "alphabet-charts",
      subcategories: [
        {
          name: "ABC spelling charts",
          id: "dGVybTo1OA==",
          slug: "abc-spelling-boards",
        },
        {
          name: "Alphabets you can eye point to",
          id: "dGVybToxMjU=",
          slug: "alphabet-eye-point",
        },
        {
          name: "Alphabets you can point to",
          id: "dGVybToxMjI=",
          slug: "alphabet-point",
        },
        {
          name: "Charts for Listener Mediated Scanning",
          id: "dGVybToxMjY=",
          slug: "alphabet-lms",
        },
        {
          name: "Charts with alphabet + words/phrases you can point to",
          id: "dGVybToxMjM=",
          slug: "words-phrases-point",
        },
        {
          name: "Charts with the alphabet + some words and phrases to point to",
          id: "dGVybTo2Mw==",
          slug: "spelling-boards-with-words-and-phrases",
        },
        {
          name: "Coded alphabet charts",
          id: "dGVybToxMDk=",
          slug: "alphabet-coded",
        },
        {
          name: "Communication boards",
          id: "dGVybToxMDg=",
          slug: "communication-boards",
        },
        {
          name: "Encoded alphabet charts",
          id: "dGVybTo1OQ==",
          slug: "alphabet-encoded",
        },
        {
          name: "Frequency layout spelling charts",
          id: "dGVybTo2MA==",
          slug: "frequency-layout-spelling-boards",
        },
      ],
    },
    {
      name: "Alphabet communication book templates",
      id: "dGVybToxMjE=",
      slug: "alphabet-books",
      subcategories: [],
    },
    {
      name: "Information Sheets",
      id: "dGVybToyOQ==",
      slug: "information-sheets",
      subcategories: [],
    },
    {
      name: "LAACES",
      id: "dGVybToxNTQ=",
      slug: "laaces",
      subcategories: [],
    },
    {
      name: "Publications",
      id: "dGVybToyNg==",
      slug: "publications",
      subcategories: [
        {
          name: "Additional Packs",
          id: "dGVybTozMQ==",
          slug: "additional-packs",
        },
        {
          name: "Archive",
          id: "dGVybTo3NA==",
          slug: "archive",
        },
      ],
    },
    {
      name: "Seasonal resources",
      id: "dGVybToxMjA=",
      slug: "seasonal",
      subcategories: [
        {
          name: "ChristmAce",
          id: "dGVybToxMTI=",
          slug: "christmace-2018",
        },
      ],
    },
    {
      name: "Software",
      id: "dGVybTo2NQ==",
      slug: "software",
      subcategories: [],
    },
    {
      name: "Symbol Charts",
      id: "dGVybToyOA==",
      slug: "symbol-charts",
      subcategories: [
        {
          name: "Alternative access symbol charts",
          id: "dGVybTo4OQ==",
          slug: "alternative-access-symbol-charts",
          subcategories: [
            {
              id: "dGVybTo5MA==",
              slug: "altered-colours",
              name: "Altered colours",
            },
            {
              id: "dGVybTo5MQ==",
              slug: "altered-spacing-to-support-direct-access",
              name: "Altered spacing to support direct access",
            },
            {
              id: "dGVybTo5Mg==",
              slug: "coded-access",
              name: "Coded access",
            },
            {
              id: "dGVybTo5Mw==",
              slug: "combination-access",
              name: "Combination access",
            },
            {
              id: "dGVybTo5NA==",
              slug: "encoding",
              name: "Encoding",
            },
          ],
        },
        {
          name: "Symbol charts for active play",
          id: "dGVybTo1Mw==",
          slug: "symbol-charts-for-active-play",
        },
        {
          name: "Symbol charts for creative play",
          id: "dGVybTo1Ng==",
          slug: "symbol-charts-for-creative-play",
        },
        {
          name: "Symbol charts for daily routines",
          id: "dGVybTo1Nw==",
          slug: "symbol-charts-for-daily-routines",
        },
        {
          name: "Symbol charts for imaginative play",
          id: "dGVybTo1MQ==",
          slug: "symbol-charts-for-imaginative-play",
        },
        {
          name: "Symbol charts for playing games",
          id: "dGVybTo1Mg==",
          slug: "symbol-charts-for-playing-games",
        },
        {
          name: "Symbol charts for playing with toys",
          id: "dGVybTo1MA==",
          slug: "symbol-charts-for-playing-with-toys",
        },
        {
          name:
            "Symbol charts for reading, looking at photos & telling stories",
          id: "dGVybTo1NA==",
          slug: "symbol-charts-for-reading-looking-at-photos-telling-stories",
        },
        {
          name: "Symbol charts for watching television",
          id: "dGVybTo1NQ==",
          slug: "symbol-charts-for-watching-television",
        },
        {
          name: "Symbol charts with core vocabulary",
          id: "dGVybTo0OQ==",
          slug: "symbol-charts-with-core-vocabulary",
        },
      ],
    },
    {
      name: "Training",
      id: "dGVybToxMTE=",
      slug: "training",
      subcategories: [],
    },
    {
      name: "Uncategorised",
      id: "dGVybToxMDA=",
      slug: "uncategorised",
      subcategories: [],
    },
  ],
};
