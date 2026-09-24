import { toAbsoluteExternalUrl } from "./service-cards";

it("prefixes https for bare website domains", () => {
  expect(toAbsoluteExternalUrl("www.rdash.nhs.uk")).toBe(
    "https://www.rdash.nhs.uk"
  );
});

it("leaves absolute urls unchanged", () => {
  expect(toAbsoluteExternalUrl("https://www.example.nhs.uk/path")).toBe(
    "https://www.example.nhs.uk/path"
  );
});

it("returns null for empty or n/a values", () => {
  expect(toAbsoluteExternalUrl("")).toBeNull();
  expect(toAbsoluteExternalUrl("n/a")).toBeNull();
});

it("treats email-only values as mailto links", () => {
  expect(toAbsoluteExternalUrl("soh-tr.info@nhs.net")).toBe(
    "mailto:soh-tr.info@nhs.net"
  );
});
