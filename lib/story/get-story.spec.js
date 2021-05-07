import nock from "nock";

import config from "../config";
import { getSimpleStory } from "./get-story";

afterEach(() => {
  nock.cleanAll();
});

it("returns null if no slug is given", async () => {
  // Act
  const result = await getSimpleStory();

  // Assert
  expect(result).toBeNull();
});

it("returns null if no story is returned", async () => {
  const mockResponse = {
    data: {
      caseStudy: null,
    },
  };
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  const slug = "jim";

  // Act
  const result = await getSimpleStory(slug);

  // Assert
  expect(result).toBeNull();
});

it("returns null if no meta is returned", async () => {
  const mockResponse = {
    data: {
      caseStudy: {
        excerpt: "My excerpt",
        extraMeta: null,
      },
    },
  };
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  const slug = "jim";

  // Act
  const result = await getSimpleStory(slug);

  // Assert
  expect(result).toBeNull();
});

it("returns null no excerpt is returned", async () => {
  const mockResponse = {
    data: {
      caseStudy: {
        excerpt: null,
        extraMeta: {
          youtubeVideo: "Youtube",
          storyName: "My Story",
        },
      },
    },
  };
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  const slug = "jim";

  // Act
  const result = await getSimpleStory(slug);

  // Assert
  expect(result).toBeNull();
});

it("returns story if all required fields are present", async () => {
  const mockResponse = {
    data: {
      caseStudy: {
        excerpt: "My Summary",
        extraMeta: {
          youtubeVideo: "Youtube",
          storyName: "My Story",
        },
      },
    },
  };
  const expected = {
    summary: "My Summary",
    youtubeVideo: "Youtube",
    title: "My Story",
  };
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  const slug = "jim";

  // Act
  const result = await getSimpleStory(slug);

  // Assert
  expect(result).toStrictEqual(expected);
});

it("trims the excerpt", async () => {
  const mockResponse = {
    data: {
      caseStudy: {
        excerpt: "My Summary\n",
        extraMeta: {
          youtubeVideo: "Youtube",
          storyName: "My Story",
        },
      },
    },
  };
  const expected = {
    summary: "My Summary",
    youtubeVideo: "Youtube",
    title: "My Story",
  };
  nock(config.baseUrl).post("/graphql").reply(200, mockResponse);
  const slug = "jim";

  // Act
  const result = await getSimpleStory(slug);

  // Assert
  expect(result).toStrictEqual(expected);
});
