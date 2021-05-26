import { parseCategories } from "./get-all-categories";

it("can parse a graphql product categories response into a list of categories and their subcategories", () => {
  // Arrange
  const expected = [
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
  ];

  // Act
  const result = parseCategories(TEST_GRAPHQL_RESPOSNE);

  // Assert
  expect(result.length).toStrictEqual(expected.length);
  expect(result).toStrictEqual(expected);
});

const TEST_GRAPHQL_RESPOSNE = [
  {
    name: "ABC spelling charts",
    id: "dGVybTo1OA==",
    slug: "abc-spelling-boards",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Access",
    id: "dGVybToxNTY=",
    slug: "access",
    ancestors: {
      nodes: [
        {
          id: "dGVybToxNjA=",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Ace Centre Courses",
    id: "dGVybToxNTU=",
    slug: "acecentrecourses",
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "Ace Centre Learning",
    id: "dGVybToxNjA=",
    slug: "learning",
    ancestors: null,
    children: {
      nodes: [
        {
          name: "Access",
          id: "dGVybToxNTY=",
          slug: "access",
          children: {
            nodes: [],
          },
        },
        {
          name: "Communication",
          id: "dGVybToxNTc=",
          slug: "communication",
          children: {
            nodes: [],
          },
        },
        {
          name: "Education",
          id: "dGVybToxNTg=",
          slug: "education",
          children: {
            nodes: [],
          },
        },
      ],
    },
  },
  {
    name: "Additional Packs",
    id: "dGVybTozMQ==",
    slug: "additional-packs",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNg==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Alphabet Charts",
    id: "dGVybToyNw==",
    slug: "alphabet-charts",
    ancestors: null,
    children: {
      nodes: [
        {
          name: "ABC spelling charts",
          id: "dGVybTo1OA==",
          slug: "abc-spelling-boards",
          children: {
            nodes: [],
          },
        },
        {
          name: "Alphabets you can eye point to",
          id: "dGVybToxMjU=",
          slug: "alphabet-eye-point",
          children: {
            nodes: [],
          },
        },
        {
          name: "Alphabets you can point to",
          id: "dGVybToxMjI=",
          slug: "alphabet-point",
          children: {
            nodes: [],
          },
        },
        {
          name: "Charts for Listener Mediated Scanning",
          id: "dGVybToxMjY=",
          slug: "alphabet-lms",
          children: {
            nodes: [],
          },
        },
        {
          name: "Charts with alphabet + words/phrases you can point to",
          id: "dGVybToxMjM=",
          slug: "words-phrases-point",
          children: {
            nodes: [],
          },
        },
        {
          name: "Charts with the alphabet + some words and phrases to point to",
          id: "dGVybTo2Mw==",
          slug: "spelling-boards-with-words-and-phrases",
          children: {
            nodes: [],
          },
        },
        {
          name: "Coded alphabet charts",
          id: "dGVybToxMDk=",
          slug: "alphabet-coded",
          children: {
            nodes: [],
          },
        },
        {
          name: "Communication boards",
          id: "dGVybToxMDg=",
          slug: "communication-boards",
          children: {
            nodes: [],
          },
        },
        {
          name: "Encoded alphabet charts",
          id: "dGVybTo1OQ==",
          slug: "alphabet-encoded",
          children: {
            nodes: [],
          },
        },
        {
          name: "Frequency layout spelling charts",
          id: "dGVybTo2MA==",
          slug: "frequency-layout-spelling-boards",
          children: {
            nodes: [],
          },
        },
      ],
    },
  },
  {
    name: "Alphabet communication book templates",
    id: "dGVybToxMjE=",
    slug: "alphabet-books",
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "Alphabets you can eye point to",
    id: "dGVybToxMjU=",
    slug: "alphabet-eye-point",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Alphabets you can point to",
    id: "dGVybToxMjI=",
    slug: "alphabet-point",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Altered colours",
    id: "dGVybTo5MA==",
    slug: "altered-colours",
    ancestors: {
      nodes: [
        {
          id: "dGVybTo4OQ==",
        },
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Altered spacing to support direct access",
    id: "dGVybTo5MQ==",
    slug: "altered-spacing-to-support-direct-access",
    ancestors: {
      nodes: [
        {
          id: "dGVybTo4OQ==",
        },
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Alternative access symbol charts",
    id: "dGVybTo4OQ==",
    slug: "alternative-access-symbol-charts",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [
        {
          name: "Altered colours",
          id: "dGVybTo5MA==",
          slug: "altered-colours",
          children: {
            nodes: [],
          },
        },
        {
          name: "Altered spacing to support direct access",
          id: "dGVybTo5MQ==",
          slug: "altered-spacing-to-support-direct-access",
          children: {
            nodes: [],
          },
        },
        {
          name: "Coded access",
          id: "dGVybTo5Mg==",
          slug: "coded-access",
          children: {
            nodes: [],
          },
        },
        {
          name: "Combination access",
          id: "dGVybTo5Mw==",
          slug: "combination-access",
          children: {
            nodes: [],
          },
        },
        {
          name: "Encoding",
          id: "dGVybTo5NA==",
          slug: "encoding",
          children: {
            nodes: [],
          },
        },
      ],
    },
  },
  {
    name: "Archive",
    id: "dGVybTo3NA==",
    slug: "archive",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNg==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Charts for Listener Mediated Scanning",
    id: "dGVybToxMjY=",
    slug: "alphabet-lms",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Charts with alphabet + words/phrases you can point to",
    id: "dGVybToxMjM=",
    slug: "words-phrases-point",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Charts with the alphabet + some words and phrases to point to",
    id: "dGVybTo2Mw==",
    slug: "spelling-boards-with-words-and-phrases",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "ChristmAce",
    id: "dGVybToxMTI=",
    slug: "christmace-2018",
    ancestors: {
      nodes: [
        {
          id: "dGVybToxMjA=",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Coded access",
    id: "dGVybTo5Mg==",
    slug: "coded-access",
    ancestors: {
      nodes: [
        {
          id: "dGVybTo4OQ==",
        },
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Coded alphabet charts",
    id: "dGVybToxMDk=",
    slug: "alphabet-coded",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Combination access",
    id: "dGVybTo5Mw==",
    slug: "combination-access",
    ancestors: {
      nodes: [
        {
          id: "dGVybTo4OQ==",
        },
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Communication",
    id: "dGVybToxNTc=",
    slug: "communication",
    ancestors: {
      nodes: [
        {
          id: "dGVybToxNjA=",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Communication boards",
    id: "dGVybToxMDg=",
    slug: "communication-boards",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Education",
    id: "dGVybToxNTg=",
    slug: "education",
    ancestors: {
      nodes: [
        {
          id: "dGVybToxNjA=",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Encoded alphabet charts",
    id: "dGVybTo1OQ==",
    slug: "alphabet-encoded",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Encoding",
    id: "dGVybTo5NA==",
    slug: "encoding",
    ancestors: {
      nodes: [
        {
          id: "dGVybTo4OQ==",
        },
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Frequency layout spelling charts",
    id: "dGVybTo2MA==",
    slug: "frequency-layout-spelling-boards",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "High contrast charts",
    id: "dGVybTo2MQ==",
    slug: "high-contrast-charts",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Information Sheets",
    id: "dGVybToyOQ==",
    slug: "information-sheets",
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "LAACES",
    id: "dGVybToxNTQ=",
    slug: "laaces",
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "Letter codes",
    id: "dGVybToxMTA=",
    slug: "letter-codes",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Publications",
    id: "dGVybToyNg==",
    slug: "publications",
    ancestors: null,
    children: {
      nodes: [
        {
          name: "Additional Packs",
          id: "dGVybTozMQ==",
          slug: "additional-packs",
          children: {
            nodes: [],
          },
        },
        {
          name: "Archive",
          id: "dGVybTo3NA==",
          slug: "archive",
          children: {
            nodes: [],
          },
        },
      ],
    },
  },
  {
    name: "QWERTY alphabet charts",
    id: "dGVybTo2Mg==",
    slug: "qwerty-alphabet-charts",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyNw==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Seasonal resources",
    id: "dGVybToxMjA=",
    slug: "seasonal",
    ancestors: null,
    children: {
      nodes: [
        {
          name: "ChristmAce",
          id: "dGVybToxMTI=",
          slug: "christmace-2018",
          children: {
            nodes: [],
          },
        },
      ],
    },
  },
  {
    name: "Software",
    id: "dGVybTo2NQ==",
    slug: "software",
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "Symbol Charts",
    id: "dGVybToyOA==",
    slug: "symbol-charts",
    ancestors: null,
    children: {
      nodes: [
        {
          name: "Alternative access symbol charts",
          id: "dGVybTo4OQ==",
          slug: "alternative-access-symbol-charts",
          children: {
            nodes: [
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
        },
        {
          name: "Symbol charts for active play",
          id: "dGVybTo1Mw==",
          slug: "symbol-charts-for-active-play",
          children: {
            nodes: [],
          },
        },
        {
          name: "Symbol charts for creative play",
          id: "dGVybTo1Ng==",
          slug: "symbol-charts-for-creative-play",
          children: {
            nodes: [],
          },
        },
        {
          name: "Symbol charts for daily routines",
          id: "dGVybTo1Nw==",
          slug: "symbol-charts-for-daily-routines",
          children: {
            nodes: [],
          },
        },
        {
          name: "Symbol charts for imaginative play",
          id: "dGVybTo1MQ==",
          slug: "symbol-charts-for-imaginative-play",
          children: {
            nodes: [],
          },
        },
        {
          name: "Symbol charts for playing games",
          id: "dGVybTo1Mg==",
          slug: "symbol-charts-for-playing-games",
          children: {
            nodes: [],
          },
        },
        {
          name: "Symbol charts for playing with toys",
          id: "dGVybTo1MA==",
          slug: "symbol-charts-for-playing-with-toys",
          children: {
            nodes: [],
          },
        },
        {
          name:
            "Symbol charts for reading, looking at photos & telling stories",
          id: "dGVybTo1NA==",
          slug: "symbol-charts-for-reading-looking-at-photos-telling-stories",
          children: {
            nodes: [],
          },
        },
        {
          name: "Symbol charts for watching television",
          id: "dGVybTo1NQ==",
          slug: "symbol-charts-for-watching-television",
          children: {
            nodes: [],
          },
        },
        {
          name: "Symbol charts with core vocabulary",
          id: "dGVybTo0OQ==",
          slug: "symbol-charts-with-core-vocabulary",
          children: {
            nodes: [],
          },
        },
      ],
    },
  },
  {
    name: "Symbol charts for active play",
    id: "dGVybTo1Mw==",
    slug: "symbol-charts-for-active-play",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Symbol charts for creative play",
    id: "dGVybTo1Ng==",
    slug: "symbol-charts-for-creative-play",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Symbol charts for daily routines",
    id: "dGVybTo1Nw==",
    slug: "symbol-charts-for-daily-routines",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Symbol charts for imaginative play",
    id: "dGVybTo1MQ==",
    slug: "symbol-charts-for-imaginative-play",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Symbol charts for playing games",
    id: "dGVybTo1Mg==",
    slug: "symbol-charts-for-playing-games",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Symbol charts for playing with toys",
    id: "dGVybTo1MA==",
    slug: "symbol-charts-for-playing-with-toys",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Symbol charts for reading, looking at photos & telling stories",
    id: "dGVybTo1NA==",
    slug: "symbol-charts-for-reading-looking-at-photos-telling-stories",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Symbol charts for watching television",
    id: "dGVybTo1NQ==",
    slug: "symbol-charts-for-watching-television",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Symbol charts with core vocabulary",
    id: "dGVybTo0OQ==",
    slug: "symbol-charts-with-core-vocabulary",
    ancestors: {
      nodes: [
        {
          id: "dGVybToyOA==",
        },
      ],
    },
    children: {
      nodes: [],
    },
  },
  {
    name: "Training",
    id: "dGVybToxMTE=",
    slug: "training",
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "Uncategorised",
    id: "dGVybToxMDA=",
    slug: "uncategorised",
    ancestors: null,
    children: {
      nodes: [],
    },
  },
];
