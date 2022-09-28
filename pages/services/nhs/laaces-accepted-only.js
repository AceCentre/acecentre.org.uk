import { withGlobalProps } from "../../../lib/global-props/inject";

export default function Laaces({}) {
  return <h1>Test</h1>;
}

export const getStaticProps = withGlobalProps(async () => {
  return {
    props: {
      seo: {
        noIndex: true,
        title: "LAACES",
        description:
          "Ace Centre is committed to help support the establishment and development of local AAC services in both the Thames Valley & Wessex and Northwest regions within which we provide the NHSE Specialised AAC Services.",
      },
    },
  };
});
