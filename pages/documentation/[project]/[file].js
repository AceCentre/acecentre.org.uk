import { SOURCES } from "../../../lib/auto-docs/config";
import { getFileTree } from "../../../lib/auto-docs/get-file-tree";
import { parseFileTree } from "../../../lib/auto-docs/parse-file-tree";

const Node = ({ node }) => {
  return (
    <>
      <p>{/* Need to make this a next link */}</p>
      <a href={node.path}>{node.path}</a>

      {node.type === "tree" && node.children.length > 0 && (
        <>
          {node.children.map((child) => (
            <Node node={child}></Node>
          ))}
        </>
      )}
    </>
  );
};

export default function RepoView({ directory, source }) {
  return (
    <>
      <p>This is the page for a file</p>
    </>
  );
}

export async function getStaticPaths(params) {
  const paths = await Promise.all(
    SOURCES.map(async (source) => {
      const { owner, repo, path, rootFolder } = source;

      const flatTree = (await getFileTree(source))
        .filter((file) => file.path.startsWith(rootFolder))
        .filter((file) => !(file.type === "blob" && !file.path.includes(".md")))
        .map((currentFile) => {
          return {
            // ...currentFile,
            params: {
              project: path,
              file: currentFile.path.replace(/\//g, "--"),
            },
          };
        });

      return flatTree;
    })
  );

  return {
    paths: paths.flat(),
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const source = SOURCES.find(({ path }) => path == params.project);

  const flatTree = await getFileTree(source);
  const directory = parseFileTree(flatTree, source);

  return { props: { directory, source } };
}
