import { Octokit } from "@octokit/rest";
import { SOURCES } from "./config";

export const getAllSources = async () => {
  return Promise.all(SOURCES.map((source) => getSource(source)));
};

export const getSource = async (source, activeLink) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const {
    data: { tree: flatTree },
  } = await octokit.rest.git.getTree({
    owner: source.owner,
    repo: source.repo,
    tree_sha: source.branch,
    recursive: false,
  });

  const rootNode = flatTree.find((node) => node.path === source.rootFolder);

  if (!rootNode || rootNode.type !== "tree") {
    throw new Error(
      `Could not find the root folder for the repo: ${source.owner}/${source.repo}`
    );
  }

  const {
    data: { tree: rootFlatTree },
  } = await octokit.rest.git.getTree({
    owner: source.owner,
    repo: source.repo,
    tree_sha: rootNode.sha,
  });

  const oneDeepTree = await Promise.all(
    rootFlatTree.map(async (item) => {
      if (item.type === "blob") {
        const blob = await getBlob(source, item.sha);
        return {
          ...item,
          ...blob,
          title: titleCaseFilename(item.path),
          link: `${item.path}`,
        };
      }

      if (item.type === "tree") {
        const {
          data: { tree: firstDepth },
        } = await octokit.rest.git.getTree({
          owner: source.owner,
          repo: source.repo,
          tree_sha: item.sha,
        });

        for (let node of firstDepth) {
          if (node.type !== "blob") {
            throw new Error(`Can't currently parse more than one deep`.node);
          }

          if (!node.path.endsWith(".md")) {
            throw new Error(`Can currently only parse markdown files`, node);
          }
        }

        const onlyBlobs = await Promise.all(
          firstDepth.map(async (current) => {
            const blob = await getBlob(source, current.sha);
            return {
              ...current,
              ...blob,
              title: titleCaseFilename(current.path),
              link: `${item.path}--${current.path}`,
            };
          })
        );

        return {
          ...item,
          title: titleCaseFilename(item.path),
          link: `${item.path}`,
          sub: onlyBlobs,
        };
      }
    })
  );

  const homeLink = oneDeepTree.find(
    (node) => node.path.toLowerCase() === "readme.md"
  ).link;

  const allLinks = oneDeepTree.flatMap((node) => {
    if (!node.sub) return [node.link];

    return [node.link, ...node.sub.map((x) => x.link)];
  });

  if (activeLink) {
    const linksAndContent = oneDeepTree.flatMap((node) => {
      if (!node.sub)
        return [{ link: node.link, markdownContent: node.parsedMarkdown }];

      return [
        { link: node.link, markdownContent: node.parsedMarkdown },
        ...node.sub.map((subNode) => ({
          link: subNode.link,
          markdownContent: subNode.parsedMarkdown,
        })),
      ];
    });

    const active = linksAndContent.find(
      (current) => current.link === activeLink
    );

    return {
      ...source,
      homeLink,
      allLinks,
      fileTree: oneDeepTree,
      currentMarkdownContent: active.markdownContent || "no content",
    };
  } else {
    return { ...source, homeLink, allLinks, fileTree: oneDeepTree };
  }
};

const getBlob = async (source, sha) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const { data } = await octokit.rest.git.getBlob({
    owner: source.owner,
    repo: source.repo,
    file_sha: sha,
  });

  const unencodedContent = new Buffer(data.content, data.encoding).toString();

  const { data: parsedMarkdown } = await octokit.rest.markdown.render({
    text: unencodedContent,
  });

  return {
    ...data,
    unencodedContent,
    parsedMarkdown,
  };
};

const titleCaseFilename = (filename) => {
  return filename
    .replace(".md", "")
    .split("-")
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(" ");
};
