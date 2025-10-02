import { parseCategories } from "./get-all-categories";

it.skip("can parse a graphql product categories response into a list of categories and their subcategories", () => {
  // Arrange
  const expected = [
    {
      name: "Alphabet Charts",
      id: "dGVybToyNw==",
      slug: "alphabet-charts",
      productCount: 10,
      productSlugs: [
        "abc-with-core-words",
        "qwerty-with-core-words",
        "qwerty-chart-with-useful-words-for-a-child",
        "simple-charts-to-edit-in-word",
        "frequency-listener-scan-charts",
        "abc-listener-scan-charts",
        "high-contrast-listener-mediated-scan-charts-abc-frequency",
        "high-contrast-abc-qwerty",
        "abc-2",
        "qwerty-2",
      ],
      image: null,
      subcategories: [
        {
          productSlugs: [
            "alphabet-flip-chart",
            "encoded-abc-numbers-direct-access",
            "combination-access-abc",
            "aeiou-row-column-listener-mediated-scanning",
            "abc-some-phrases",
            "abc",
            "abc-and-numbers",
            "abc-with-symbols",
          ],
          image: null,
          productCount: 8,
          name: "ABC spelling charts",
          id: "dGVybTo1OA==",
          slug: "abc-spelling-boards",
        },
        {
          productSlugs: [
            "number-encoded",
            "colour-encoded-upper-case-laminator-required",
            "colour-encoded-lower-case-laminator-required",
          ],
          productCount: 3,
          name: "Alphabets you can eye point to",
          id: "dGVybToxMjU=",
          slug: "alphabet-eye-point",
          image: null,
        },
        {
          productSlugs: [
            "simple-charts-to-edit-in-word",
            "high-contrast-abc-qwerty",
            "abc-2",
            "qwerty-2",
            "number-encoded-abc-for-pointing",
            "colour-encoded-abc-for-pointing",
            "coded-abc-chart",
            "frequency-layout-fitaly",
          ],
          image: null,

          productCount: 8,
          name: "Alphabets you can point to",
          id: "dGVybToxMjI=",
          slug: "alphabet-point",
        },
        {
          productSlugs: [
            "frequency-listener-scan-charts",
            "abc-listener-scan-charts",
            "high-contrast-listener-mediated-scan-charts-abc-frequency",
            "alphabet-flip-charts-high-contrast",
            "aeiou-row-column-listener-mediated-scanning",
          ],
          productCount: 5,
          name: "Charts for Listener Mediated Scanning",
          id: "dGVybToxMjY=",
          slug: "alphabet-lms",
          image: null,
        },
        {
          productSlugs: [
            "abc-with-core-words",
            "qwerty-with-core-words",
            "qwerty-chart-with-useful-words-for-a-child",
            "abc-and-core-vocabulary",
            "abc-some-phrases",
          ],
          image: null,

          productCount: 5,
          name: "Charts with the alphabet + some words and phrases to point to",
          id: "dGVybTo2Mw==",

          slug: "spelling-boards-with-words-and-phrases",
        },
        {
          productSlugs: ["coded-abc-chart"],
          productCount: 1,
          name: "Coded alphabet charts",
          image: null,

          id: "dGVybToxMDk=",
          slug: "alphabet-coded",
        },
        {
          productSlugs: [
            "number-encoded-abc-for-pointing",
            "colour-encoded-abc-for-pointing",
            "number-encoded",
            "colour-encoded-upper-case-laminator-required",
            "colour-encoded-lower-case-laminator-required",
            "encoded-abc-numbers-direct-access",
            "encoded-coloured-borders-e-tran",
          ],
          image: null,

          productCount: 7,
          name: "Encoded alphabet charts",
          id: "dGVybTo1OQ==",
          slug: "alphabet-encoded",
        },
        {
          productSlugs: [
            "frequency-listener-scan-charts",
            "high-contrast-listener-mediated-scan-charts-abc-frequency",
            "frequency-layout-fitaly",
          ],
          image: null,

          productCount: 3,
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
      productCount: 6,
      image: null,
      productSlugs: [
        "a5-communication-book-direct-access",
        "speakbook",
        "qwerty-and-core-fringe-words",
        "listener-mediated-scanning-chart-with-phrases",
        "pragmatic-based-phrase-book-a4-auditory-scan-book",
        "a4-category-based-phrase-book",
      ],
      subcategories: [],
    },
    {
      name: "Publications",
      id: "dGVybToyNg==",
      slug: "publications",
      productCount: 10,
      image: null,
      productSlugs: [
        "understanding-features-of-electronic-text-based-aac",
        "readiness-for-aac",
        "being-a-communication-partner",
        "getting-started-aac",
        "switch-assessment-planning-framework-individuals-physical-disabilities",
        "developing-using-communication-book-templates",
        "pragmatics-profile-people-use-aac",
        "developing-aac-policies-schools",
        "making-software-inclusive",
        "switch-access-technology",
      ],
      subcategories: [
        {
          productSlugs: ["you-matter-education-pack", "you-matter-pack"],
          productCount: 2,
          name: "Additional Packs",
          id: "dGVybTozMQ==",
          slug: "additional-packs",
          image: null,
        },
        {
          productSlugs: [
            "switch-assessment-planning-framework-individuals-physical-disabilities",
          ],
          productCount: 1,
          name: "Archive",
          id: "dGVybTo3NA==",
          slug: "archive",
          image: null,
        },
      ],
    },
    {
      name: "Seasonal resources",
      id: "dGVybToxMjA=",
      slug: "seasonal",
      productCount: 8,
      image: null,
      productSlugs: [
        "make-your-own-flip-joke-book",
        "core-word-classroom-5-minute-filler",
        "make-your-own-switch-adapted-christmas-tree-lights",
        "simon-says-sing-a-carol",
        "make-your-own-biscuit-christmas-tree",
        "christmas-place-mat",
        "strictly-come-dancingtv-commenting-chart",
        "elf-on-the-shelf",
      ],
      subcategories: [
        {
          productSlugs: [
            "make-your-own-flip-joke-book",
            "core-word-classroom-5-minute-filler",
            "make-your-own-switch-adapted-christmas-tree-lights",
            "simon-says-sing-a-carol",
            "make-your-own-biscuit-christmas-tree",
            "christmas-place-mat",
            "strictly-come-dancingtv-commenting-chart",
            "elf-on-the-shelf",
          ],
          productCount: 8,
          name: "ChristmAce",
          id: "dGVybToxMTI=",
          slug: "christmace-2018",
          image: null,
        },
      ],
    },
    {
      name: "Software",
      id: "dGVybTo2NQ==",
      slug: "software",
      productCount: 3,
      image: null,
      productSlugs: ["gridwiz", "talk-together", "large-pointers"],
      subcategories: [],
    },
    {
      name: "Symbol Charts",
      id: "dGVybToyOA==",
      slug: "symbol-charts",
      productCount: 10,
      image: null,
      productSlugs: [
        "animals-36-numerical-encoding",
        "sing-old-mcdonald-8-intro-encoding",
        "animals-36-colour-encoded-borders",
        "animals-36-colour-encoded-dots",
        "blocks-24-combination-access",
        "train-play-20-coded-access-chart-give-code",
        "train-play-20-coded-access",
        "core-5-arc-shape",
        "core-8-high-contrast-pcs",
        "core-8-yellow-symbol-cell-background-black-page-widgit",
      ],
      subcategories: [
        {
          productSlugs: [
            "animals-36-numerical-encoding",
            "sing-old-mcdonald-8-intro-encoding",
            "animals-36-colour-encoded-borders",
            "animals-36-colour-encoded-dots",
            "blocks-24-combination-access",
            "train-play-20-coded-access-chart-give-code",
            "train-play-20-coded-access",
            "core-5-arc-shape",
            "core-8-high-contrast-pcs",
            "core-8-yellow-symbol-cell-background-black-page-widgit",
          ],
          productCount: 10,
          name: "Alternative access symbol charts",
          id: "dGVybTo4OQ==",
          image: null,
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
            { id: "dGVybTo5Mg==", slug: "coded-access", name: "Coded access" },
            {
              id: "dGVybTo5Mw==",
              slug: "combination-access",
              name: "Combination access",
            },
            { id: "dGVybTo5NA==", slug: "encoding", name: "Encoding" },
          ],
        },
        {
          productSlugs: ["simon-says"],
          productCount: 1,
          name: "Symbol charts for active play",
          id: "dGVybTo1Mw==",
          slug: "symbol-charts-for-active-play",
          image: null,
        },
        {
          productSlugs: [
            "singing",
            "colours",
            "arts-crafts",
            "sing-wheels-on-the-bus",
            "sing-old-macdonald",
          ],
          productCount: 5,
          name: "Symbol charts for creative play",
          id: "dGVybTo1Ng==",
          slug: "symbol-charts-for-creative-play",
          image: null,
        },
        {
          productSlugs: ["make-up", "bath"],
          productCount: 2,
          name: "Symbol charts for daily routines",
          id: "dGVybTo1Nw==",
          slug: "symbol-charts-for-daily-routines",
          image: null,
        },
        {
          productSlugs: [
            "tea-party",
            "medical-kit",
            "dressing-up-as-a-princess",
          ],
          productCount: 3,
          name: "Symbol charts for imaginative play",
          id: "dGVybTo1MQ==",
          slug: "symbol-charts-for-imaginative-play",
          image: null,
        },
        {
          productSlugs: ["kerplunk", "snakes-ladders"],
          productCount: 2,
          name: "Symbol charts for playing games",
          id: "dGVybTo1Mg==",
          slug: "symbol-charts-for-playing-games",
          image: null,
        },
        {
          productSlugs: [
            "mr-potato-head",
            "dolly",
            "bubbles",
            "blocks",
            "balloons",
            "turn-taking",
            "train-play",
          ],
          image: null,

          productCount: 7,
          name: "Symbol charts for playing with toys",
          id: "dGVybTo1MA==",
          slug: "symbol-charts-for-playing-with-toys",
        },
        {
          productSlugs: [
            "read-dear-zoo",
            "reading",
            "look-at-photos",
            "creating-stories",
          ],
          productCount: 4,
          image: null,

          name: "Symbol charts for reading, looking at photos & telling stories",
          id: "dGVybTo1NA==",
          slug: "symbol-charts-for-reading-looking-at-photos-telling-stories",
        },
        {
          productSlugs: ["peppa", "chat-about-tv"],
          image: null,

          productCount: 2,
          name: "Symbol charts for watching television",
          id: "dGVybTo1NQ==",
          slug: "symbol-charts-for-watching-television",
        },
        {
          productSlugs: ["core"],
          image: null,

          productCount: 1,
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
      image: null,
      productCount: 1,
      productSlugs: ["podd-introductory-workshop-3rd-4th-nov-2018"],
      subcategories: [],
    },
  ];

  // Act
  const result = parseCategories(TEST_GRAPHQL_RESPOSNE);

  // Assert
  // expect(result.length).toStrictEqual(expected.length);
  expect(result).toStrictEqual(expected);
});

const TEST_GRAPHQL_RESPOSNE = [
  {
    name: "ABC spelling charts",
    id: "dGVybTo1OA==",
    slug: "abc-spelling-boards",
    products: {
      nodes: [
        {
          slug: "alphabet-flip-chart",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "encoded-abc-numbers-direct-access",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "combination-access-abc",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "aeiou-row-column-listener-mediated-scanning",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "abc-some-phrases",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "abc",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "abc-and-numbers",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "abc-with-symbols",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [],
    },
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
    products: {
      nodes: [],
    },
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "Ace Centre Learning",
    id: "dGVybToxNjA=",
    slug: "learning",
    products: {
      nodes: [
        {
          slug: "assistive-technology-unit-e-sept-2021",
          // moodleCourses removed - no longer needed "assistive-technology-unit-e-sept-2021",
              },
            ],
          },
        },
        {
          slug: "podd-2-day-introductory-workshop-d",
          // moodleCourses removed - no longer needed "podd-2-day-introductory-workshop-d-16th-17th-feb-2021",
              },
            ],
          },
        },
        {
          slug: "developing-and-using-a-communication-book-d-11th-feb-25th-feb-2021",
          // moodleCourses removed - no longer needed "developing-and-using-a-communication-book-d-11th-feb-25th-feb-2021",
              },
            ],
          },
        },
        {
          slug: "aac-solutions-for-people-with-aphasia-d-11th-march-2021",
          // moodleCourses removed - no longer needed "aac-solutions-for-people-with-aphasia-d-11th-march-2021",
              },
            ],
          },
        },
        {
          slug: "alphapacks-d-14th-apr-2021",
          // moodleCourses removed - no longer needed "alphapacks-d-20th-jan-2021",
              },
            ],
          },
        },
        {
          slug: "implementing-the-pragmatics-profile-for-people-who-use-aac-d-28th-apr-19th-may-21",
          // moodleCourses removed - no longer needed "implementing-the-pragmatics-profile-for-people-who-use-aac-d-28th-apr-19th-may-21",
              },
            ],
          },
        },
        {
          slug: "augmentative-and-alternative-communication-unit-e-jan-2021",
          // moodleCourses removed - no longer needed "augmentative-and-alternative-communication-unit-e-jan-2021",
              },
            ],
          },
        },
        {
          slug: "communication-partners-i",
          // moodleCourses removed - no longer needed "communication-partners-i",
              },
            ],
          },
        },
        {
          slug: "splash-training-i",
          // moodleCourses removed - no longer needed "splash-training-i",
              },
            ],
          },
        },
      ],
    },
    ancestors: null,
    children: {
      nodes: [
        {
          products: {
            nodes: [],
          },
          name: "Access",
          id: "dGVybToxNTY=",
          slug: "access",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "podd-2-day-introductory-workshop-d",
              },
              {
                slug: "developing-and-using-a-communication-book-d-11th-feb-25th-feb-2021",
              },
              {
                slug: "aac-solutions-for-people-with-aphasia-d-11th-march-2021",
              },
              {
                slug: "alphapacks-d-14th-apr-2021",
              },
              {
                slug: "implementing-the-pragmatics-profile-for-people-who-use-aac-d-28th-apr-19th-may-21",
              },
              {
                slug: "augmentative-and-alternative-communication-unit-e-jan-2021",
              },
              {
                slug: "communication-partners-i",
              },
            ],
          },
          name: "Communication",
          id: "dGVybToxNTc=",
          slug: "communication",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "assistive-technology-unit-e-sept-2021",
              },
              {
                slug: "splash-training-i",
              },
            ],
          },
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
    products: {
      nodes: [
        {
          slug: "you-matter-education-pack",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "you-matter-pack",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "abc-with-core-words",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "qwerty-with-core-words",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "qwerty-chart-with-useful-words-for-a-child",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "simple-charts-to-edit-in-word",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "frequency-listener-scan-charts",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "abc-listener-scan-charts",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "high-contrast-listener-mediated-scan-charts-abc-frequency",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "high-contrast-abc-qwerty",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "abc-2",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "qwerty-2",
          // moodleCourses removed - no longer needed
        },
      ],
    },
    ancestors: null,
    children: {
      nodes: [
        {
          products: {
            nodes: [
              {
                slug: "alphabet-flip-chart",
              },
              {
                slug: "encoded-abc-numbers-direct-access",
              },
              {
                slug: "combination-access-abc",
              },
              {
                slug: "aeiou-row-column-listener-mediated-scanning",
              },
              {
                slug: "abc-some-phrases",
              },
              {
                slug: "abc",
              },
              {
                slug: "abc-and-numbers",
              },
              {
                slug: "abc-with-symbols",
              },
            ],
          },
          name: "ABC spelling charts",
          id: "dGVybTo1OA==",
          slug: "abc-spelling-boards",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "number-encoded",
              },
              {
                slug: "colour-encoded-upper-case-laminator-required",
              },
              {
                slug: "colour-encoded-lower-case-laminator-required",
              },
            ],
          },
          name: "Alphabets you can eye point to",
          id: "dGVybToxMjU=",
          slug: "alphabet-eye-point",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "simple-charts-to-edit-in-word",
              },
              {
                slug: "high-contrast-abc-qwerty",
              },
              {
                slug: "abc-2",
              },
              {
                slug: "qwerty-2",
              },
              {
                slug: "number-encoded-abc-for-pointing",
              },
              {
                slug: "colour-encoded-abc-for-pointing",
              },
              {
                slug: "coded-abc-chart",
              },
              {
                slug: "frequency-layout-fitaly",
              },
            ],
          },
          name: "Alphabets you can point to",
          id: "dGVybToxMjI=",
          slug: "alphabet-point",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "frequency-listener-scan-charts",
              },
              {
                slug: "abc-listener-scan-charts",
              },
              {
                slug: "high-contrast-listener-mediated-scan-charts-abc-frequency",
              },
              {
                slug: "alphabet-flip-charts-high-contrast",
              },
              {
                slug: "aeiou-row-column-listener-mediated-scanning",
              },
            ],
          },
          name: "Charts for Listener Mediated Scanning",
          id: "dGVybToxMjY=",
          slug: "alphabet-lms",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [],
          },
          name: "Charts with alphabet + words/phrases you can point to",
          id: "dGVybToxMjM=",
          slug: "words-phrases-point",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "abc-with-core-words",
              },
              {
                slug: "qwerty-with-core-words",
              },
              {
                slug: "qwerty-chart-with-useful-words-for-a-child",
              },
              {
                slug: "abc-and-core-vocabulary",
              },
              {
                slug: "abc-some-phrases",
              },
            ],
          },
          name: "Charts with the alphabet + some words and phrases to point to",
          id: "dGVybTo2Mw==",
          slug: "spelling-boards-with-words-and-phrases",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "coded-abc-chart",
              },
            ],
          },
          name: "Coded alphabet charts",
          id: "dGVybToxMDk=",
          slug: "alphabet-coded",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [],
          },
          name: "Communication boards",
          id: "dGVybToxMDg=",
          slug: "communication-boards",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "number-encoded-abc-for-pointing",
              },
              {
                slug: "colour-encoded-abc-for-pointing",
              },
              {
                slug: "number-encoded",
              },
              {
                slug: "colour-encoded-upper-case-laminator-required",
              },
              {
                slug: "colour-encoded-lower-case-laminator-required",
              },
              {
                slug: "encoded-abc-numbers-direct-access",
              },
              {
                slug: "encoded-coloured-borders-e-tran",
              },
            ],
          },
          name: "Encoded alphabet charts",
          id: "dGVybTo1OQ==",
          slug: "alphabet-encoded",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "frequency-listener-scan-charts",
              },
              {
                slug: "high-contrast-listener-mediated-scan-charts-abc-frequency",
              },
              {
                slug: "frequency-layout-fitaly",
              },
            ],
          },
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
    products: {
      nodes: [
        {
          slug: "a5-communication-book-direct-access",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "speakbook",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "qwerty-and-core-fringe-words",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "listener-mediated-scanning-chart-with-phrases",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "pragmatic-based-phrase-book-a4-auditory-scan-book",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "a4-category-based-phrase-book",
          // moodleCourses removed - no longer needed
        },
      ],
    },
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "Alphabets you can eye point to",
    id: "dGVybToxMjU=",
    slug: "alphabet-eye-point",
    products: {
      nodes: [
        {
          slug: "number-encoded",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "colour-encoded-upper-case-laminator-required",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "colour-encoded-lower-case-laminator-required",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "simple-charts-to-edit-in-word",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "high-contrast-abc-qwerty",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "abc-2",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "qwerty-2",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "number-encoded-abc-for-pointing",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "colour-encoded-abc-for-pointing",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "coded-abc-chart",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "frequency-layout-fitaly",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "core-8-high-contrast-pcs",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "core-8-yellow-symbol-cell-background-black-page-widgit",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "core-5-arc-shape",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "balloons-8-bigger-gaps-widgit",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "animals-36-numerical-encoding",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "sing-old-mcdonald-8-intro-encoding",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "animals-36-colour-encoded-borders",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "animals-36-colour-encoded-dots",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "blocks-24-combination-access",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "train-play-20-coded-access-chart-give-code",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "train-play-20-coded-access",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "core-5-arc-shape",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "core-8-high-contrast-pcs",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "core-8-yellow-symbol-cell-background-black-page-widgit",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
          products: {
            nodes: [
              {
                slug: "core-8-high-contrast-pcs",
              },
              {
                slug: "core-8-yellow-symbol-cell-background-black-page-widgit",
              },
            ],
          },
          name: "Altered colours",
          id: "dGVybTo5MA==",
          slug: "altered-colours",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "core-5-arc-shape",
              },
              {
                slug: "balloons-8-bigger-gaps-widgit",
              },
            ],
          },
          name: "Altered spacing to support direct access",
          id: "dGVybTo5MQ==",
          slug: "altered-spacing-to-support-direct-access",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "train-play-20-coded-access-chart-give-code",
              },
              {
                slug: "train-play-20-coded-access",
              },
            ],
          },
          name: "Coded access",
          id: "dGVybTo5Mg==",
          slug: "coded-access",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "blocks-24-combination-access",
              },
            ],
          },
          name: "Combination access",
          id: "dGVybTo5Mw==",
          slug: "combination-access",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "animals-36-numerical-encoding",
              },
              {
                slug: "sing-old-mcdonald-8-intro-encoding",
              },
              {
                slug: "animals-36-colour-encoded-borders",
              },
              {
                slug: "animals-36-colour-encoded-dots",
              },
            ],
          },
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
    products: {
      nodes: [
        {
          slug: "switch-assessment-planning-framework-individuals-physical-disabilities",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "frequency-listener-scan-charts",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "abc-listener-scan-charts",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "high-contrast-listener-mediated-scan-charts-abc-frequency",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "alphabet-flip-charts-high-contrast",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "aeiou-row-column-listener-mediated-scanning",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [],
    },
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
    products: {
      nodes: [
        {
          slug: "abc-with-core-words",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "qwerty-with-core-words",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "qwerty-chart-with-useful-words-for-a-child",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "abc-and-core-vocabulary",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "abc-some-phrases",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "make-your-own-flip-joke-book",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "core-word-classroom-5-minute-filler",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "make-your-own-switch-adapted-christmas-tree-lights",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "simon-says-sing-a-carol",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "make-your-own-biscuit-christmas-tree",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "christmas-place-mat",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "strictly-come-dancingtv-commenting-chart",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "elf-on-the-shelf",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "train-play-20-coded-access-chart-give-code",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "train-play-20-coded-access",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "coded-abc-chart",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "blocks-24-combination-access",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "podd-2-day-introductory-workshop-d",
          // moodleCourses removed - no longer needed "podd-2-day-introductory-workshop-d-16th-17th-feb-2021",
              },
            ],
          },
        },
        {
          slug: "developing-and-using-a-communication-book-d-11th-feb-25th-feb-2021",
          // moodleCourses removed - no longer needed "developing-and-using-a-communication-book-d-11th-feb-25th-feb-2021",
              },
            ],
          },
        },
        {
          slug: "aac-solutions-for-people-with-aphasia-d-11th-march-2021",
          // moodleCourses removed - no longer needed "aac-solutions-for-people-with-aphasia-d-11th-march-2021",
              },
            ],
          },
        },
        {
          slug: "alphapacks-d-14th-apr-2021",
          // moodleCourses removed - no longer needed "alphapacks-d-20th-jan-2021",
              },
            ],
          },
        },
        {
          slug: "implementing-the-pragmatics-profile-for-people-who-use-aac-d-28th-apr-19th-may-21",
          // moodleCourses removed - no longer needed "implementing-the-pragmatics-profile-for-people-who-use-aac-d-28th-apr-19th-may-21",
              },
            ],
          },
        },
        {
          slug: "augmentative-and-alternative-communication-unit-e-jan-2021",
          // moodleCourses removed - no longer needed "augmentative-and-alternative-communication-unit-e-jan-2021",
              },
            ],
          },
        },
        {
          slug: "communication-partners-i",
          // moodleCourses removed - no longer needed "communication-partners-i",
              },
            ],
          },
        },
      ],
    },
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
    products: {
      nodes: [],
    },
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
    products: {
      nodes: [
        {
          slug: "assistive-technology-unit-e-sept-2021",
          // moodleCourses removed - no longer needed "assistive-technology-unit-e-sept-2021",
              },
            ],
          },
        },
        {
          slug: "splash-training-i",
          // moodleCourses removed - no longer needed "splash-training-i",
              },
            ],
          },
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "number-encoded-abc-for-pointing",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "colour-encoded-abc-for-pointing",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "number-encoded",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "colour-encoded-upper-case-laminator-required",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "colour-encoded-lower-case-laminator-required",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "encoded-abc-numbers-direct-access",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "encoded-coloured-borders-e-tran",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "animals-36-numerical-encoding",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "sing-old-mcdonald-8-intro-encoding",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "animals-36-colour-encoded-borders",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "animals-36-colour-encoded-dots",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "frequency-listener-scan-charts",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "high-contrast-listener-mediated-scan-charts-abc-frequency",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "frequency-layout-fitaly",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "high-contrast-listener-mediated-scan-charts-abc-frequency",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "high-contrast-abc-qwerty",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "alphabet-flip-charts-high-contrast",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "aeiou-black-yellow",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [],
    },
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "LAACES",
    id: "dGVybToxNTQ=",
    slug: "laaces",
    products: {
      nodes: [],
    },
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "Letter codes",
    id: "dGVybToxMTA=",
    slug: "letter-codes",
    products: {
      nodes: [
        {
          slug: "abbreviation-expansions-blank-template",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "abbreviation-expansions",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "understanding-features-of-electronic-text-based-aac",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "readiness-for-aac",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "being-a-communication-partner",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "getting-started-aac",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "switch-assessment-planning-framework-individuals-physical-disabilities",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "developing-using-communication-book-templates",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "pragmatics-profile-people-use-aac",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "developing-aac-policies-schools",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "making-software-inclusive",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "switch-access-technology",
          // moodleCourses removed - no longer needed
        },
      ],
    },
    ancestors: null,
    children: {
      nodes: [
        {
          products: {
            nodes: [
              {
                slug: "you-matter-education-pack",
              },
              {
                slug: "you-matter-pack",
              },
            ],
          },
          name: "Additional Packs",
          id: "dGVybTozMQ==",
          slug: "additional-packs",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "switch-assessment-planning-framework-individuals-physical-disabilities",
              },
            ],
          },
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
    products: {
      nodes: [
        {
          slug: "qwerty-and-numbers",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "make-your-own-flip-joke-book",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "core-word-classroom-5-minute-filler",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "make-your-own-switch-adapted-christmas-tree-lights",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "simon-says-sing-a-carol",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "make-your-own-biscuit-christmas-tree",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "christmas-place-mat",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "strictly-come-dancingtv-commenting-chart",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "elf-on-the-shelf",
          // moodleCourses removed - no longer needed
        },
      ],
    },
    ancestors: null,
    children: {
      nodes: [
        {
          products: {
            nodes: [
              {
                slug: "make-your-own-flip-joke-book",
              },
              {
                slug: "core-word-classroom-5-minute-filler",
              },
              {
                slug: "make-your-own-switch-adapted-christmas-tree-lights",
              },
              {
                slug: "simon-says-sing-a-carol",
              },
              {
                slug: "make-your-own-biscuit-christmas-tree",
              },
              {
                slug: "christmas-place-mat",
              },
              {
                slug: "strictly-come-dancingtv-commenting-chart",
              },
              {
                slug: "elf-on-the-shelf",
              },
            ],
          },
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
    products: {
      nodes: [
        {
          slug: "gridwiz",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "talk-together",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "large-pointers",
          // moodleCourses removed - no longer needed
        },
      ],
    },
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "Symbol Charts",
    id: "dGVybToyOA==",
    slug: "symbol-charts",
    products: {
      nodes: [
        {
          slug: "animals-36-numerical-encoding",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "sing-old-mcdonald-8-intro-encoding",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "animals-36-colour-encoded-borders",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "animals-36-colour-encoded-dots",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "blocks-24-combination-access",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "train-play-20-coded-access-chart-give-code",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "train-play-20-coded-access",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "core-5-arc-shape",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "core-8-high-contrast-pcs",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "core-8-yellow-symbol-cell-background-black-page-widgit",
          // moodleCourses removed - no longer needed
        },
      ],
    },
    ancestors: null,
    children: {
      nodes: [
        {
          products: {
            nodes: [
              {
                slug: "animals-36-numerical-encoding",
              },
              {
                slug: "sing-old-mcdonald-8-intro-encoding",
              },
              {
                slug: "animals-36-colour-encoded-borders",
              },
              {
                slug: "animals-36-colour-encoded-dots",
              },
              {
                slug: "blocks-24-combination-access",
              },
              {
                slug: "train-play-20-coded-access-chart-give-code",
              },
              {
                slug: "train-play-20-coded-access",
              },
              {
                slug: "core-5-arc-shape",
              },
              {
                slug: "core-8-high-contrast-pcs",
              },
              {
                slug: "core-8-yellow-symbol-cell-background-black-page-widgit",
              },
            ],
          },
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
          products: {
            nodes: [
              {
                slug: "simon-says",
              },
            ],
          },
          name: "Symbol charts for active play",
          id: "dGVybTo1Mw==",
          slug: "symbol-charts-for-active-play",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "singing",
              },
              {
                slug: "colours",
              },
              {
                slug: "arts-crafts",
              },
              {
                slug: "sing-wheels-on-the-bus",
              },
              {
                slug: "sing-old-macdonald",
              },
            ],
          },
          name: "Symbol charts for creative play",
          id: "dGVybTo1Ng==",
          slug: "symbol-charts-for-creative-play",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "make-up",
              },
              {
                slug: "bath",
              },
            ],
          },
          name: "Symbol charts for daily routines",
          id: "dGVybTo1Nw==",
          slug: "symbol-charts-for-daily-routines",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "tea-party",
              },
              {
                slug: "medical-kit",
              },
              {
                slug: "dressing-up-as-a-princess",
              },
            ],
          },
          name: "Symbol charts for imaginative play",
          id: "dGVybTo1MQ==",
          slug: "symbol-charts-for-imaginative-play",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "kerplunk",
              },
              {
                slug: "snakes-ladders",
              },
            ],
          },
          name: "Symbol charts for playing games",
          id: "dGVybTo1Mg==",
          slug: "symbol-charts-for-playing-games",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "mr-potato-head",
              },
              {
                slug: "dolly",
              },
              {
                slug: "bubbles",
              },
              {
                slug: "blocks",
              },
              {
                slug: "balloons",
              },
              {
                slug: "turn-taking",
              },
              {
                slug: "train-play",
              },
            ],
          },
          name: "Symbol charts for playing with toys",
          id: "dGVybTo1MA==",
          slug: "symbol-charts-for-playing-with-toys",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "read-dear-zoo",
              },
              {
                slug: "reading",
              },
              {
                slug: "look-at-photos",
              },
              {
                slug: "creating-stories",
              },
            ],
          },
          name: "Symbol charts for reading, looking at photos & telling stories",
          id: "dGVybTo1NA==",
          slug: "symbol-charts-for-reading-looking-at-photos-telling-stories",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "peppa",
              },
              {
                slug: "chat-about-tv",
              },
            ],
          },
          name: "Symbol charts for watching television",
          id: "dGVybTo1NQ==",
          slug: "symbol-charts-for-watching-television",
          children: {
            nodes: [],
          },
        },
        {
          products: {
            nodes: [
              {
                slug: "core",
              },
            ],
          },
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
    products: {
      nodes: [
        {
          slug: "simon-says",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "singing",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "colours",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "arts-crafts",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "sing-wheels-on-the-bus",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "sing-old-macdonald",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "make-up",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "bath",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "tea-party",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "medical-kit",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "dressing-up-as-a-princess",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "kerplunk",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "snakes-ladders",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "mr-potato-head",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "dolly",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "bubbles",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "blocks",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "balloons",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "turn-taking",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "train-play",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "read-dear-zoo",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "reading",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "look-at-photos",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "creating-stories",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "peppa",
          // moodleCourses removed - no longer needed
        },
        {
          slug: "chat-about-tv",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "core",
          // moodleCourses removed - no longer needed
        },
      ],
    },
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
    products: {
      nodes: [
        {
          slug: "podd-introductory-workshop-3rd-4th-nov-2018",
          // moodleCourses removed - no longer needed
        },
      ],
    },
    ancestors: null,
    children: {
      nodes: [],
    },
  },
  {
    name: "Uncategorised",
    id: "dGVybToxMDA=",
    slug: "uncategorised",
    products: {
      nodes: [],
    },
    ancestors: null,
    children: {
      nodes: [],
    },
  },
];
