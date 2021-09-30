import remoteDocs from "../../remote-docs.json";

export default function RemoteDocs() {
  return <h1>Test</h1>;
}

export const getServerSideProps = async ({ query: { parts = [] } }) => {
  const repo = parts[0];

  if (!repo) {
    return {
      notFound: true,
    };
  }

  const remoteDetails = remoteDocs.remoteDocs.find((x) => x.repo === repo);

  if (!remoteDetails) {
    return {
      notFound: true,
    };
  }

  const pathToDoc = [remoteDetails.folder, ...parts.slice(1)];
  // const lastLocation = parts.slice(-1)[0];

  // const readmeInDir = [...pathToDoc, "readme"];
  // const indexInDir = [...pathToDoc, "index"];

  // const potentialLocations = [...pathToDoc, readmeInDir, indexInDir];

  const response = await fetch(
    `https://api.github.com/repos/${remoteDetails.owner}/${
      remoteDetails.repo
    }/${pathToDoc.join("/")}`
  );

  const parsed = await response.json();

  console.log(parsed);
  console.log(
    `https://api.github.com/repos/${remoteDetails.owner}/${
      remoteDetails.repo
    }/${pathToDoc.join("/")}`
  );

  const rawMarkdown = Buffer.from(parsed.content, "base64").toString();

  console.log(rawMarkdown);

  return { props: {} };
};
