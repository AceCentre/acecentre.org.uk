import { Octokit } from "@octokit/rest";
import { parseFileTree } from "./parse-file-tree";

export const getFileTree = async (source) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const {
    data: { tree: flatTree },
  } = await octokit.rest.git.getTree({
    owner: source.owner,
    repo: source.repo,
    tree_sha: source.branch,
    recursive: true,
  });

  const tree = parseFileTree(flatTree);

  return tree;
};
