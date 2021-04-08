import { DocsSidebar } from "../../../components/docs-sidebar/docs-sidebar";
import { SOURCES } from "../../../lib/auto-docs/config";
import { getAllSources, getSource } from "../../../lib/auto-docs/get-source";

export default function RepoView({ activeLink, fileTree }) {
  console.log(fileTree, activeLink);

  return (
    <>
      <p>This is the page for a file</p>
      <DocsSidebar activeLink={activeLink} topLevel={fileTree}></DocsSidebar>
    </>
  );
}

export async function getStaticPaths(params) {
  const allSources = await getAllSources();
  const paths = allSources.flatMap((source) => {
    return source.allLinks.map((currentLink) => ({
      params: {
        project: source.path,
        file: currentLink,
      },
    }));
  });

  return {
    paths: paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const source = SOURCES.find(({ path }) => path == params.project);

  const fullSource = await getSource(source);

  return { props: { activeLink: params.file, fileTree: fullSource.fileTree } };
}
