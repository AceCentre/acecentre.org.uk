import nock from "nock";

import config from "../config";
import { getLandingPagePosts } from "./get-posts";

afterEach(() => {
  nock.cleanAll();
});

it("return null if there are not at least three posts", async () => {
  // Arrange
  const mockResponse = {
    data: {
      posts: {
        nodes: [{ title: "First" }, { title: "Second" }],
      },
    },
  };
  nock(config.stellateUrl).post("/").reply(200, mockResponse);

  // Act
  const result = await getLandingPagePosts();

  // Assert
  expect(result).toBeNull();
});

it("parses a featured image correctly", async () => {
  // Arrange
  const mockResponse = {
    data: {
      posts: {
        nodes: [
          {
            title: "First",
            slug: "first",
            featuredImage: {
              node: {
                altText: "test",

                sourceUrl: "source",
                mediaDetails: { width: 100, height: 100 },
              },
            },
          },
          {
            title: "Second",
            slug: "Second",
            featuredImage: {
              node: {
                altText: "test",
                sourceUrl: "source",
                mediaDetails: { width: 100, height: 100 },
              },
            },
          },
          {
            title: "Third",
            slug: "first",
            featuredImage: {
              node: {
                altText: "test",
                sourceUrl: "source",
                mediaDetails: { width: 100, height: 100 },
              },
            },
          },
        ],
      },
    },
  };
  const expected = [
    {
      title: "First",
      slug: "first",
      featuredImage: { alt: "test", height: 100, src: "source", width: 100 },
    },
    {
      title: "Second",
      slug: "Second",
      featuredImage: { alt: "test", height: 100, src: "source", width: 100 },
    },
    {
      title: "Third",
      slug: "first",
      featuredImage: { alt: "test", height: 100, src: "source", width: 100 },
    },
  ];
  nock(config.stellateUrl).post("/").reply(200, mockResponse);

  // Act
  const result = await getLandingPagePosts();

  // Assert
  expect(result).toStrictEqual(expected);
});
