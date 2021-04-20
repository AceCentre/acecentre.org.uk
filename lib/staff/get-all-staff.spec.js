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
