import { searchServices } from "./searchable-services";

it("returns Supervision and Mentoring for mentor searches", () => {
  const results = searchServices("mentor");
  const hrefs = results.map((result) => result.href);

  expect(hrefs).toContain("/services/clinical-supervision");
});

it("returns Supervision and Mentoring for mentoring searches", () => {
  const results = searchServices("mentoring");
  const hrefs = results.map((result) => result.href);

  expect(hrefs).toContain("/services/clinical-supervision");
});

it("returns Supervision and Mentoring for supervision searches", () => {
  const results = searchServices("supervision");
  const hrefs = results.map((result) => result.href);

  expect(hrefs).toContain("/services/clinical-supervision");
});

it("returns Supervision and Mentoring for learning-related searches", () => {
  const results = searchServices("learning");
  const hrefs = results.map((result) => result.href);

  expect(hrefs).toContain("/services/clinical-supervision");
});
