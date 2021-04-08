import { parseFileTree } from "./parse-file-tree";

it.only("ignores non markdown files", () => {
  // Arrange
  const testRepo = [
    {
      path: "docs",
      mode: "040000",
      type: "tree",
      sha: "a77348942899cf2b4afdcb7fd80fdb5861780384",
      url:
        "https://api.github.com/repos/gavinhenderson/test-repo/git/trees/a77348942899cf2b4afdcb7fd80fdb5861780384",
    },
    {
      path: "docs/empty-deep",
      mode: "040000",
      type: "tree",
      sha: "769ec193f88038e6bf8bcedbd5d13c34cc49097a",
      url:
        "https://api.github.com/repos/gavinhenderson/test-repo/git/trees/769ec193f88038e6bf8bcedbd5d13c34cc49097a",
    },
    {
      path: "docs/empty-deep/deeper",
      mode: "040000",
      type: "tree",
      sha: "ecb7b6b6e6af8e04699f55b68043c10bb9643772",
      url:
        "https://api.github.com/repos/gavinhenderson/test-repo/git/trees/ecb7b6b6e6af8e04699f55b68043c10bb9643772",
    },
    {
      path: "docs/empty-deep/deeper/keep.md",
      mode: "100644",
      type: "blob",
      sha: "8b137891791fe96927ad78e64b0aad7bded08bdc",
      size: 1,
      url:
        "https://api.github.com/repos/gavinhenderson/test-repo/git/blobs/8b137891791fe96927ad78e64b0aad7bded08bdc",
    },
    {
      path: "docs/folder",
      mode: "040000",
      type: "tree",
      sha: "dbac425238bc3916130416d48a434a145da0044c",
      url:
        "https://api.github.com/repos/gavinhenderson/test-repo/git/trees/dbac425238bc3916130416d48a434a145da0044c",
    },
    {
      path: "docs/folder/javascript.js",
      mode: "100644",
      type: "blob",
      sha: "8b137891791fe96927ad78e64b0aad7bded08bdc",
      size: 1,
      url:
        "https://api.github.com/repos/gavinhenderson/test-repo/git/blobs/8b137891791fe96927ad78e64b0aad7bded08bdc",
    },
    {
      path: "docs/keep",
      mode: "040000",
      type: "tree",
      sha: "96459260d3a42fbaa32284d2daae365984782f4d",
      url:
        "https://api.github.com/repos/gavinhenderson/test-repo/git/trees/96459260d3a42fbaa32284d2daae365984782f4d",
    },
    {
      path: "docs/keep/keep.md",
      mode: "100644",
      type: "blob",
      sha: "8b137891791fe96927ad78e64b0aad7bded08bdc",
      size: 1,
      url:
        "https://api.github.com/repos/gavinhenderson/test-repo/git/blobs/8b137891791fe96927ad78e64b0aad7bded08bdc",
    },
    {
      path: "docs/keep/remove.js",
      mode: "100644",
      type: "blob",
      sha: "8b137891791fe96927ad78e64b0aad7bded08bdc",
      size: 1,
      url:
        "https://api.github.com/repos/gavinhenderson/test-repo/git/blobs/8b137891791fe96927ad78e64b0aad7bded08bdc",
    },
    {
      path: "docs/test.md",
      mode: "100644",
      type: "blob",
      sha: "8b137891791fe96927ad78e64b0aad7bded08bdc",
      size: 1,
      url:
        "https://api.github.com/repos/gavinhenderson/test-repo/git/blobs/8b137891791fe96927ad78e64b0aad7bded08bdc",
    },
  ];

  // Act
  const result = parseFileTree(testRepo, { rootFolder: "docs" });

  // Assert
  expect(result).toStrictEqual({
    path: "docs",
    mode: "040000",
    type: "tree",
    sha: "a77348942899cf2b4afdcb7fd80fdb5861780384",
    url:
      "https://api.github.com/repos/gavinhenderson/test-repo/git/trees/a77348942899cf2b4afdcb7fd80fdb5861780384",
    id: "docs",
    children: [
      {
        path: "docs/empty-deep",
        mode: "040000",
        type: "tree",
        sha: "769ec193f88038e6bf8bcedbd5d13c34cc49097a",
        url:
          "https://api.github.com/repos/gavinhenderson/test-repo/git/trees/769ec193f88038e6bf8bcedbd5d13c34cc49097a",
        id: "empty-deep",
        parentId: "docs",
        children: [
          {
            path: "docs/empty-deep/deeper",
            mode: "040000",
            type: "tree",
            sha: "ecb7b6b6e6af8e04699f55b68043c10bb9643772",
            url:
              "https://api.github.com/repos/gavinhenderson/test-repo/git/trees/ecb7b6b6e6af8e04699f55b68043c10bb9643772",
            id: "deeper",
            parentId: "empty-deep",
            children: [
              {
                path: "docs/empty-deep/deeper/keep.md",
                mode: "100644",
                type: "blob",
                sha: "8b137891791fe96927ad78e64b0aad7bded08bdc",
                size: 1,
                url:
                  "https://api.github.com/repos/gavinhenderson/test-repo/git/blobs/8b137891791fe96927ad78e64b0aad7bded08bdc",
                id: "keep.md",
                parentId: "deeper",
                children: [],
              },
            ],
          },
        ],
      },
      {
        path: "docs/folder",
        mode: "040000",
        type: "tree",
        sha: "dbac425238bc3916130416d48a434a145da0044c",
        url:
          "https://api.github.com/repos/gavinhenderson/test-repo/git/trees/dbac425238bc3916130416d48a434a145da0044c",
        id: "folder",
        parentId: "docs",
        children: [],
      },
      {
        path: "docs/keep",
        mode: "040000",
        type: "tree",
        sha: "96459260d3a42fbaa32284d2daae365984782f4d",
        url:
          "https://api.github.com/repos/gavinhenderson/test-repo/git/trees/96459260d3a42fbaa32284d2daae365984782f4d",
        id: "keep",
        parentId: "docs",
        children: [
          {
            path: "docs/keep/keep.md",
            mode: "100644",
            type: "blob",
            sha: "8b137891791fe96927ad78e64b0aad7bded08bdc",
            size: 1,
            url:
              "https://api.github.com/repos/gavinhenderson/test-repo/git/blobs/8b137891791fe96927ad78e64b0aad7bded08bdc",
            id: "keep.md",
            parentId: "keep",
            children: [],
          },
        ],
      },
      {
        path: "docs/test.md",
        mode: "100644",
        type: "blob",
        sha: "8b137891791fe96927ad78e64b0aad7bded08bdc",
        size: 1,
        url:
          "https://api.github.com/repos/gavinhenderson/test-repo/git/blobs/8b137891791fe96927ad78e64b0aad7bded08bdc",
        id: "test.md",
        parentId: "docs",
        children: [],
      },
    ],
  });
});
