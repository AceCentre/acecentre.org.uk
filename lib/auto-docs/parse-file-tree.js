import { treeify } from "treeify-js";

export const parseFileTree = (flatTree, { rootFolder }) => {
  const withIds = flatTree
    .filter((file) => file.path.startsWith(rootFolder))
    .filter((file) => !(file.type === "blob" && !file.path.includes(".md")))
    .map((node) => {
      const paths = node.path.split("/");
      const id = paths[paths.length - 1];
      const parentId = paths[paths.length - 2];

      return { ...node, id, parentId };
    });

  const tree = treeify(withIds);

  // Hate doing this, make this cleaner
  delete tree.parentId;

  return tree;
};
