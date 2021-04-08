import { parseFileTree } from "./parse-file-tree";

it("parses a one deep flat file tree into an object tree", () => {
  // ARRANGE
  const flatFiles = [{ path: "root.md" }, { path: "dir/another.md" }];

  // ACT
  const result = parseFileTree(flatFiles);

  // ASSERT
  expect(result).toStrictEqual({
    path: "/",
    children: [
      {
        path: "root.md",
        filename: "root.md",
        children: [],
      },
      {
        path: "dir",
        children: [
          {
            path: "dir/another.md",
            filename: "another.md",
            children: [],
          },
        ],
      },
    ],
  });
});

it("keeps arbitrary properties on files", () => {
  // ARRANGE
  const flatFiles = [
    { path: "root.md", randomKey: false },
    { path: "dir/another.md", "even-strings": "test" },
  ];

  // ACT
  const result = parseFileTree(flatFiles);

  // ASSERT
  expect(result).toStrictEqual({
    path: "/",
    children: [
      {
        path: "root.md",
        filename: "root.md",
        randomKey: false,
        children: [],
      },
      {
        path: "dir",
        children: [
          {
            path: "dir/another.md",
            filename: "another.md",
            "even-strings": "test",
            children: [],
          },
        ],
      },
    ],
  });
});

it("parses a tree with multiple files in a directory", () => {
  // ARRANGE
  const flatFiles = [
    { path: "root.md" },
    { path: "dir/another.md" },
    { path: "dir/more.md" },
  ];

  // ACT
  const result = parseFileTree(flatFiles);

  // ASSERT
  expect(result).toStrictEqual({
    path: "/",
    children: [
      {
        path: "root.md",
        filename: "root.md",
        children: [],
      },
      {
        path: "dir",
        children: [
          {
            path: "dir/another.md",
            filename: "another.md",
            children: [],
          },
          {
            path: "dir/more.md",
            filename: "more.md",
            children: [],
          },
        ],
      },
    ],
  });
});

it("two deep tree", () => {
  // ARRANGE
  const flatFiles = [
    { path: "root.md" },
    { path: "dir/another.md" },
    { path: "dir/more.md" },
    { path: "dir/deep/another.md" },
    { path: "dir/deep/more.md" },
  ];

  // ACT
  const result = parseFileTree(flatFiles);

  // ASSERT
  expect(result).toStrictEqual({
    path: "/",
    children: [
      {
        path: "root.md",
        filename: "root.md",
        children: [],
      },
      {
        path: "dir",
        children: [
          {
            path: "dir/another.md",
            filename: "another.md",
            children: [],
          },
          {
            path: "dir/more.md",
            filename: "more.md",
            children: [],
          },
          {
            path: "deep",
            children: [
              {
                path: "dir/deep/another.md",
                filename: "another.md",
                children: [],
              },
              { path: "dir/deep/more.md", filename: "more.md", children: [] },
            ],
          },
        ],
      },
    ],
  });
});
