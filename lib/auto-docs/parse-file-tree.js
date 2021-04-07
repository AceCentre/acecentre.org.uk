export const parseFileTree = (flatTree) => {
  let mutableTree = {
    path: "/",
    children: [],
  };

  for (let file of flatTree) {
    const splitByDir = file.path.split("/");

    let currentNode = mutableTree;

    for (let i = 0; i < splitByDir.length; i++) {
      const isLastNode = splitByDir.length - 1 === i;
      const currentDir = splitByDir[i];

      if (isLastNode) {
        currentNode.children.push({
          ...file,
          filename: currentDir,
          children: [],
        });
      } else {
        let dirNode = currentNode.children.find(
          (child) => child.path === currentDir
        );

        if (!dirNode) {
          dirNode = {
            path: currentDir,
            children: [],
          };
          currentNode.children.push(dirNode);
        }

        currentNode = dirNode;
      }
    }
  }
  return mutableTree;
};
