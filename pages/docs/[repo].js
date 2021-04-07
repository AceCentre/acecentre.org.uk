import { SOURCES } from "../../lib/auto-docs/config";
import { getFileTree } from "../../lib/auto-docs/get-file-tree";

export default function RepoView() {
  return <p>test</p>;
}

export async function getStaticPaths() {
  const paths = SOURCES.map(({ owner, repo, path }) => ({
    params: {
      repo: path,
    },
  }));

  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const source = SOURCES.find(({ path }) => path == params.repo);

  const directory = await getFileTree(source);

  return { props: {} };
}
