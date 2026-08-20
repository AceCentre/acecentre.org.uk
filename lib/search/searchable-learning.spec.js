import { searchLearning } from "./searchable-learning";

it("returns Ace Centre Learning for learn searches", () => {
  const results = searchLearning("learn");
  const hrefs = results.map((result) => result.href);

  expect(hrefs).toContain("/learning");
});

it("returns Ace Centre Learning for training searches", () => {
  const results = searchLearning("training");
  const hrefs = results.map((result) => result.href);

  expect(hrefs).toContain("/learning");
});

it("returns Ace Centre Learning for bespoke searches", () => {
  const results = searchLearning("bespoke");
  const hrefs = results.map((result) => result.href);

  expect(hrefs).toContain("/learning");
});
