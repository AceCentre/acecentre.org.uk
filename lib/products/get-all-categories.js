export const parseCategories = (catetoryNodes) => {
  const topLevelCategories = catetoryNodes.filter(
    (node) => node.ancestors == null
  );

  return topLevelCategories.map((topLevelCategory) => {
    // eslint-disable-next-line no-unused-vars
    const { ancestors, children, ...rest } = topLevelCategory;

    return {
      ...rest,
      subcategories: children.nodes.map((child) => {
        // eslint-disable-next-line no-unused-vars
        const { children, ancestors, ...restChild } = child;

        return { ...restChild, ...addFinalDeepChildren(children) };
      }),
    };
  });
};

const addFinalDeepChildren = (children) => {
  if (!children) return {};
  if (!children.nodes) return {};
  if (children.nodes.length === 0) return {};

  return { subcategories: children.nodes };
};
