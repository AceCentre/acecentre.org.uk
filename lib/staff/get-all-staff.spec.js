import getAllStaff from "./get-all-staff";
import nock from "nock";

it("returns an empty list when there are no staff", async () => {
  // Arrange
  const mockResponse = {
    data: {
      staff: {
        nodes: [],
      },
    },
  };
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllStaff();

  // Assert
  expect(result).toStrictEqual([]);
});

it("returns a single staff member without a location or type", async () => {
  // Arrange
  const expected = [
    {
      name: "Gavin Henderson",
      slug: "gavin-henderson",
      longDescription: "I am a software engineer. I work remote",
      location: null,
      groups: [],
    },
  ];
  const mockResponse = {
    data: {
      staff: {
        nodes: [
          {
            title: "Gavin Henderson",
            slug: "gavin-henderson",
            id: "cG9zdDoyNjY3OQ==",
            status: "publish",
            content: "I am a software engineer. I work remote",
            staffLocations: {
              nodes: [],
            },
            staffTypes: {
              nodes: [],
            },
          },
        ],
      },
    },
  };
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllStaff();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("pulls out a staff location when there is only one", async () => {
  // Arrange
  const expected = [
    {
      name: "Gavin Henderson",
      slug: "gavin-henderson",
      longDescription: "I am a software engineer. I work remote",
      location: "Office",
      groups: [],
    },
  ];
  const mockResponse = {
    data: {
      staff: {
        nodes: [
          {
            title: "Gavin Henderson",
            slug: "gavin-henderson",
            id: "cG9zdDoyNjY3OQ==",
            status: "publish",
            content: "I am a software engineer. I work remote",
            staffLocations: {
              nodes: [{ name: "Office" }],
            },
            staffTypes: {
              nodes: [],
            },
          },
        ],
      },
    },
  };
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllStaff();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("uses the first location when there are multiple", async () => {
  // Arrange
  const expected = [
    {
      name: "Gavin Henderson",
      slug: "gavin-henderson",
      longDescription: "I am a software engineer. I work remote",
      location: "Office",
      groups: [],
    },
  ];
  const mockResponse = {
    data: {
      staff: {
        nodes: [
          {
            title: "Gavin Henderson",
            slug: "gavin-henderson",
            id: "cG9zdDoyNjY3OQ==",
            status: "publish",
            content: "I am a software engineer. I work remote",
            staffLocations: {
              nodes: [{ name: "Office" }, { name: "Second office" }],
            },
            staffTypes: {
              nodes: [],
            },
          },
        ],
      },
    },
  };
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllStaff();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns an empty array of groups if the person is not part of any groups", async () => {
  // Arrange
  const expected = [
    {
      name: "Gavin Henderson",
      slug: "gavin-henderson",
      longDescription: "I am a software engineer. I work remote",
      location: "Office",
      groups: [],
    },
  ];
  const mockResponse = {
    data: {
      staff: {
        nodes: [
          {
            title: "Gavin Henderson",
            slug: "gavin-henderson",
            id: "cG9zdDoyNjY3OQ==",
            status: "publish",
            content: "I am a software engineer. I work remote",
            staffTypes: { nodes: [] },
            staffLocations: {
              nodes: [{ name: "Office" }, { name: "Second office" }],
            },
          },
        ],
      },
    },
  };
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllStaff();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns a single staff group", async () => {
  // Arrange
  const expected = [
    {
      name: "Gavin Henderson",
      slug: "gavin-henderson",
      longDescription: "I am a software engineer. I work remote",
      location: "Office",
      groups: ["Engineering"],
    },
  ];
  const mockResponse = {
    data: {
      staff: {
        nodes: [
          {
            title: "Gavin Henderson",
            slug: "gavin-henderson",
            id: "cG9zdDoyNjY3OQ==",
            status: "publish",
            content: "I am a software engineer. I work remote",
            staffTypes: { nodes: [{ name: "Engineering" }] },
            staffLocations: {
              nodes: [{ name: "Office" }, { name: "Second office" }],
            },
          },
        ],
      },
    },
  };
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllStaff();

  // Assert
  expect(result).toStrictEqual(expected);
});

it("returns a multiple staff groups for a single user", async () => {
  // Arrange
  const expected = [
    {
      name: "Gavin Henderson",
      slug: "gavin-henderson",
      longDescription: "I am a software engineer. I work remote",
      location: "Office",
      groups: ["Engineering", "Clinical"],
    },
  ];
  const mockResponse = {
    data: {
      staff: {
        nodes: [
          {
            title: "Gavin Henderson",
            slug: "gavin-henderson",
            id: "cG9zdDoyNjY3OQ==",
            status: "publish",
            content: "I am a software engineer. I work remote",
            staffTypes: {
              nodes: [{ name: "Engineering" }, { name: "Clinical" }],
            },
            staffLocations: {
              nodes: [{ name: "Office" }, { name: "Second office" }],
            },
          },
        ],
      },
    },
  };
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllStaff();

  // Assert
  expect(result).toStrictEqual(expected);
});
