import { SOURCES } from "../../../lib/auto-docs/config";
import { getFileTree } from "../../../lib/auto-docs/get-file-tree";
import { parseFileTree } from "../../../lib/auto-docs/parse-file-tree";

const Node = ({ node, source }) => {
  return (
    <>
      <p>{/* Need to make this a next link */}</p>
      <a href={"./" + source.path + "/" + node.path.replace(/\//g, "--")}>
        {node.path}
      </a>

      {node.type === "tree" && node.children.length > 0 && (
        <>
          {node.children.map((child) => (
            <Node node={child} source={source}></Node>
          ))}
        </>
      )}
    </>
  );
};

export default function RepoView({ directory, source }) {
  return (
    <>
      <p>Nice landing page for a project</p>
      <pre>{JSON.stringify(source, null, 2)}</pre>
      <Node node={directory} source={source} />
    </>
  );
}

export async function getStaticPaths() {
  const paths = SOURCES.map(({ owner, repo, path }) => {
    return {
      params: {
        project: path,
      },
    };
  });

  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const source = SOURCES.find(({ path }) => path == params.project);

  const flatTree = await getFileTree(source);
  const directory = parseFileTree(flatTree, source);

  return { props: { directory, source } };
}
