import { getAllStaff, getEmployee } from "./get-staff";
import nock from "nock";
import config from "../config";

describe("getAllStaff", () => {
  it("returns an empty list when there are no staff", async () => {
    // Arrange
    const mockResponse = {
      data: {
        staff: {
          nodes: [],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

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
        image: null,
        location: null,
        groups: [],
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
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
              featuredImage: null,
              staffImage: null,
              staffLocations: {
                nodes: [],
              },
              staffTypes: {
                nodes: [],
              },
              staffDetails: {
                works: null,
                role: null,
                lastName: null,
                firstName: null,
                email: null,
                directLine: null,
              },
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

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
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: null,
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
              featuredImage: null,
              staffImage: null,
              staffLocations: {
                nodes: [{ name: "Office" }],
              },
              staffTypes: {
                nodes: [],
              },
              staffDetails: {
                works: null,
                role: null,
                lastName: null,
                firstName: null,
                email: null,
                directLine: null,
              },
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

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
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: null,
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
              featuredImage: null,
              staffImage: null,
              staffLocations: {
                nodes: [{ name: "Office" }, { name: "Second office" }],
              },
              staffTypes: {
                nodes: [],
              },
              works: null,
              role: null,
              lastName: null,
              firstName: null,
              email: null,
              directLine: null,
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

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
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: null,
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
              featuredImage: null,
              staffImage: null,
              staffTypes: { nodes: [] },
              staffLocations: {
                nodes: [{ name: "Office" }, { name: "Second office" }],
              },
              staffDetails: {
                works: null,
                role: null,
                lastName: null,
                firstName: null,
                email: null,
                directLine: null,
              },
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

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
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: null,
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
              featuredImage: null,
              staffImage: null,
              staffLocations: {
                nodes: [{ name: "Office" }, { name: "Second office" }],
              },
              staffDetails: {
                works: null,
                role: null,
                lastName: null,
                firstName: null,
                email: null,
                directLine: null,
              },
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

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
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: null,
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
              featuredImage: null,
              staffImage: null,
              staffTypes: {
                nodes: [{ name: "Engineering" }, { name: "Clinical" }],
              },
              staffLocations: {
                nodes: [{ name: "Office" }, { name: "Second office" }],
              },
              staffDetails: {
                works: null,
                role: null,
                lastName: null,
                firstName: null,
                email: null,
                directLine: null,
              },
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllStaff();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("pulls out any fields that are passed in staff details", async () => {
    // Arrange
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        longDescription: "I am a software engineer. I work remote",
        location: null,
        groups: [],
        works: null,
        role: "Software Engineer",
        lastName: "Henderson",
        firstName: "Gavin",
        email: null,
        directLine: null,
        image: null,
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
                nodes: [],
              },
              featuredImage: null,
              staffImage: null,
              staffLocations: {
                nodes: [],
              },
              staffDetails: {
                works: null,
                role: "Software Engineer",
                lastName: "Henderson",
                firstName: "Gavin",
                email: null,
                directLine: null,
              },
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllStaff();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns an image url if one exists", async () => {
    // Arrange
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        longDescription: "I am a software engineer. I work remote",
        location: null,
        groups: [],
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: {
          src: "https://acecentre.org.uk/wp-content/uploads/2017/08/Will_opt.jpg",
          width: 100,
          height: 100,
        },
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
              staffImage: null,
              featuredImage: {
                node: {
                  sourceUrl:
                    "https://acecentre.org.uk/wp-content/uploads/2017/08/Will_opt.jpg",
                  mediaDetails: {
                    width: 100,
                    height: 100,
                  },
                },
              },
              staffTypes: {
                nodes: [],
              },
              staffLocations: {
                nodes: [],
              },
              staffDetails: null,
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllStaff();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns a null if there is no featuredImage", async () => {
    // Arrange
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        longDescription: "I am a software engineer. I work remote",
        location: null,
        groups: [],
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: null,
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
              featuredImage: null,
              staffImage: null,
              staffTypes: {
                nodes: [],
              },
              staffLocations: {
                nodes: [],
              },
              staffDetails: null,
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllStaff();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns a null if there is no image", async () => {
    // Arrange
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        longDescription: "I am a software engineer. I work remote",
        location: null,
        groups: [],
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: null,
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
              staffImage: null,
              featuredImage: {
                node: null,
              },
              staffTypes: {
                nodes: [],
              },
              staffLocations: {
                nodes: [],
              },
              staffDetails: null,
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllStaff();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns a null if there is no image", async () => {
    // Arrange
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        longDescription: "I am a software engineer. I work remote",
        location: null,
        groups: [],
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: null,
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
              staffImage: null,
              featuredImage: {
                node: {
                  sourceUrl: null,
                },
              },
              staffTypes: {
                nodes: [],
              },
              staffLocations: {
                nodes: [],
              },
              staffDetails: null,
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllStaff();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns featuredImage if staffImage and featuredImage are returned", async () => {
    // Arrange
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        longDescription: "I am a software engineer. I work remote",
        location: null,
        groups: [],
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: {
          src: "featuredImage",
          width: 100,
          height: 100,
        },
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
              staffImage: {
                staffImage: {
                  sourceUrl: "staffImage",
                },
              },
              featuredImage: {
                node: {
                  sourceUrl: "featuredImage",
                  mediaDetails: {
                    width: 100,
                    height: 100,
                  },
                },
              },
              staffTypes: {
                nodes: [],
              },
              staffLocations: {
                nodes: [],
              },
              staffDetails: null,
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllStaff();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns staffImage if it only it exists", async () => {
    // Arrange
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        longDescription: "I am a software engineer. I work remote",
        location: null,
        groups: [],
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: {
          src: "staffImage",
          width: 100,
          height: 101,
        },
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
              staffImage: {
                staffImage: {
                  sourceUrl: "staffImage",
                  mediaDetails: {
                    width: 100,
                    height: 101,
                  },
                },
              },
              featuredImage: null,
              staffTypes: {
                nodes: [],
              },
              staffLocations: {
                nodes: [],
              },
              staffDetails: null,
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllStaff();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns null if there is not staffImage or featuredImage if it only it exists", async () => {
    // Arrange
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        longDescription: "I am a software engineer. I work remote",
        location: null,
        groups: [],
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: null,
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
              staffImage: null,
              featuredImage: null,
              staffTypes: {
                nodes: [],
              },
              staffLocations: {
                nodes: [],
              },
              staffDetails: null,
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllStaff();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns null if featuredImage has no mediaDetails", async () => {
    // Arrange
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        longDescription: "I am a software engineer. I work remote",
        location: null,
        groups: [],
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: null,
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
              staffImage: null,
              featuredImage: {
                url: "featuredImage",
                mediaDetails: null,
              },
              staffTypes: {
                nodes: [],
              },
              staffLocations: {
                nodes: [],
              },
              staffDetails: null,
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllStaff();

    // Assert
    expect(result).toStrictEqual(expected);
  });
  it("returns null if staffImage has no mediaDetails", async () => {
    // Arrange
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        longDescription: "I am a software engineer. I work remote",
        location: null,
        groups: [],
        works: null,
        role: null,
        lastName: null,
        firstName: null,
        email: null,
        directLine: null,
        image: null,
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
              staffImage: {
                url: "featuredImage",
                mediaDetails: null,
              },
              featuredImage: null,
              staffTypes: {
                nodes: [],
              },
              staffLocations: {
                nodes: [],
              },
              staffDetails: null,
            },
          ],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllStaff();

    // Assert
    expect(result).toStrictEqual(expected);
  });
});

describe("getEmployee", () => {
  it("returns null when no slug is passed", async () => {
    // Act
    const employee = await getEmployee();

    // Assert
    expect(employee).toBeNull();
  });

  it("returns null when an empty slug is passed", async () => {
    // Act
    const employee = await getEmployee("");

    // Assert
    expect(employee).toBeNull();
  });

  it("returns null when an empty slug is passed", async () => {
    // Act
    const employee = await getEmployee("");

    // Assert
    expect(employee).toBeNull();
  });

  it("returns a full staff member when one exists", async () => {
    // Arrange
    const expected = {
      name: "Gavin Henderson",
      slug: "gavin-henderson",
      longDescription: "I am a software engineer. I work remote",
      location: null,
      groups: [],
      works: null,
      role: "Software Engineer",
      lastName: "Henderson",
      firstName: "Gavin",
      email: null,
      directLine: null,
      image: null,
    };
    const mockResponse = {
      data: {
        employee: {
          title: "Gavin Henderson",
          slug: "gavin-henderson",
          id: "cG9zdDoyNjY3OQ==",
          status: "publish",
          content: "I am a software engineer. I work remote",
          featuredImage: null,
          staffImage: null,
          staffTypes: {
            nodes: [],
          },
          staffLocations: {
            nodes: [],
          },
          staffDetails: {
            works: null,
            role: "Software Engineer",
            lastName: "Henderson",
            firstName: "Gavin",
            email: null,
            directLine: null,
          },
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);
    const slug = "gavin-henderson";

    // Act
    const result = await getEmployee(slug);

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns null if there is no staff member", async () => {
    // Arrange
    const expected = null;
    const mockResponse = {
      data: {
        employee: null,
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);
    const slug = "gavin-henderson";

    // Act
    const result = await getEmployee(slug);

    // Assert
    expect(result).toStrictEqual(expected);
  });
});
