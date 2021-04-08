import { SOURCES } from "../../lib/auto-docs/config";

export default function DocsHome({ sources }) {
  return (
    <>
      <p>
        Imagine this is a nice landing page and all these bullet points are
        fancy cards. The bullet points are clickable
      </p>
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
