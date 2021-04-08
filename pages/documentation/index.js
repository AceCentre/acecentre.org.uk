import { SOURCES } from "../../lib/auto-docs/config";

export default function DocsHome({ sources }) {
  console.log(sources);

  return (
    <>
      <ul>
        {/* TODO: make this a next link  */}
        {sources.map((source) => (
          <li>
            <a href={`/documentation/${source.path}`}>
              {source.owner}/{source.repo}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  return { props: { sources: SOURCES } };
}
