import nock from "nock";
import { getAllTrustees } from "./get-trustees";
import config from "../config";

describe("getAllTrustees", () => {
  it("returns an empty array when there are no trustees", async () => {
    // Arrange
    const mockResponse = {
      data: {
        trustees: {
          nodes: [],
        },
      },
    };
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllTrustees();

    // Assert
    expect(result).toStrictEqual([]);
  });

  it("returns a single trustee who only has a name and slug", async () => {
    // Arrange
    const mockResponse = {
      data: {
        trustees: {
          nodes: [
            {
              trusteeDetails: null,
              title: "Gavin Henderson",
              slug: "gavin-henderson",
            },
          ],
        },
      },
    };
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        about: null,
        joined: null,
        quote: null,
        role: null,
        image: null,
      },
    ];
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllTrustees();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns a multiple trustees who only has a name and slug", async () => {
    // Arrange
    const mockResponse = {
      data: {
        trustees: {
          nodes: [
            {
              trusteeDetails: null,
              title: "Gavin Henderson",
              slug: "gavin-henderson",
            },
            {
              trusteeDetails: null,
              title: "Second",
              slug: "second",
            },
          ],
        },
      },
    };
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        about: null,
        joined: null,
        quote: null,
        role: null,
        image: null,
      },
      {
        name: "Second",
        slug: "second",
        about: null,
        joined: null,
        quote: null,
        role: null,
        image: null,
      },
    ];
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllTrustees();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns a trustee with full details", async () => {
    // Arrange
    const mockResponse = {
      data: {
        trustees: {
          nodes: [
            {
              trusteeDetails: {
                role: "Trustee",
                quote: "Ace Centre is great",
                dateJoined: "2013",
                about: "Im a trustee",
              },
              title: "Gavin Henderson",
              slug: "gavin-henderson",
            },
          ],
        },
      },
    };
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        role: "Trustee",
        quote: "Ace Centre is great",
        joined: "2013",
        about: "Im a trustee",
        image: null,
      },
    ];
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllTrustees();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns a trustee with only some details details", async () => {
    // Arrange
    const mockResponse = {
      data: {
        trustees: {
          nodes: [
            {
              trusteeDetails: {
                role: null,
                quote: "Ace Centre is great",
                dateJoined: "2013",
                about: null,
              },
              title: "Gavin Henderson",
              slug: "gavin-henderson",
            },
          ],
        },
      },
    };
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        role: null,
        quote: "Ace Centre is great",
        joined: "2013",
        about: null,
        image: null,
      },
    ];
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllTrustees();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("returns a trustee image if it exists", async () => {
    // Arrange
    const mockResponse = {
      data: {
        trustees: {
          nodes: [
            {
              trusteeDetails: {
                role: null,
                quote: "Ace Centre is great",
                dateJoined: "2013",
                about: null,
              },
              featuredImage: {
                node: {
                  sourceUrl: "imageUrl",
                  mediaDetails: {
                    height: 1,
                    width: 2,
                  },
                },
              },
              title: "Gavin Henderson",
              slug: "gavin-henderson",
            },
          ],
        },
      },
    };
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        role: null,
        quote: "Ace Centre is great",
        joined: "2013",
        about: null,
        image: {
          src: "imageUrl",
          width: 2,
          height: 1,
        },
      },
    ];
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllTrustees();

    // Assert
    expect(result).toStrictEqual(expected);
  });

  it("ignores an image if it doesnt have a width and height", async () => {
    // Arrange
    const mockResponse = {
      data: {
        trustees: {
          nodes: [
            {
              trusteeDetails: {
                role: null,
                quote: "Ace Centre is great",
                dateJoined: "2013",
                about: null,
              },
              featuredImage: {
                node: {
                  sourceUrl: "imageUrl",
                  mediaDetails: null,
                },
              },
              title: "Gavin Henderson",
              slug: "gavin-henderson",
            },
          ],
        },
      },
    };
    const expected = [
      {
        name: "Gavin Henderson",
        slug: "gavin-henderson",
        role: null,
        quote: "Ace Centre is great",
        joined: "2013",
        about: null,
        image: null,
      },
    ];
    nock(config.stellateUrl).post("/").reply(200, mockResponse);

    // Act
    const result = await getAllTrustees();

    // Assert
    expect(result).toStrictEqual(expected);
  });
});
