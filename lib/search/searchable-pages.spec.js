import { searchPages } from "./searchable-pages";

it("returns Getting started for getting started searches", () => {
  const hrefs = searchPages("getting started").map((result) => result.href);

  expect(hrefs).toContain("/getting-started");
});

it("returns What is AAC for AAC meaning searches", () => {
  const hrefs = searchPages("what is AAC").map((result) => result.href);

  expect(hrefs).toContain("/getting-started/what-is-aac-what-is-at");
});

it("returns Contact us for contact searches", () => {
  const hrefs = searchPages("contact").map((result) => result.href);

  expect(hrefs).toContain("/contact");
});

it("returns Language Library for language library searches", () => {
  const hrefs = searchPages("language library").map((result) => result.href);

  expect(hrefs).toContain("/language-library");
});

it("returns Donate for donate searches", () => {
  const hrefs = searchPages("donate").map((result) => result.href);

  expect(hrefs).toContain("/get-involved/donate");
});

it("returns NHS Service Finder for local service searches", () => {
  const hrefs = searchPages("NHS service finder").map((result) => result.href);

  expect(hrefs).toContain("/nhs-service-finder");
});

it("returns Work with us for jobs searches", () => {
  const hrefs = searchPages("jobs").map((result) => result.href);

  expect(hrefs).toContain("/work-with-us");
});

it("returns Information appointment for book appointment searches", () => {
  const hrefs = searchPages("information appointment").map(
    (result) => result.href
  );

  expect(hrefs).toContain("/information-appointments");
});
