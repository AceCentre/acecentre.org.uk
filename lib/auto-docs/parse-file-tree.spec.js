import { parseFileTree } from "./parse-file-tree";

it("parses a one deep flat file tree into an object tree", () => {
  // ARRANGE
  const flatFiles = [{ path: "root.md" }, { path: "dir/another.md" }];

  // ACT
  const result = parseFileTree(flatFiles);

  // ASSERT
  expect(result).toBe({
    path: "/",
    children: [
      {
        path: "root.md",
        filename: "root.md",
      },
      {
        path: "dir",
        children: [
          {
            path: "dir/another.md",
            filename: "another.md",
          },
        ],
      },
    ],
  });
});
