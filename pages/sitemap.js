import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";

import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";
import { PageTitle } from "../components/page-title/page-title";
import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "../styles/sitemap.module.css";

const useSitemap = () => {
  const [sitemap, setSitemap] = useState(null);

  const getSitemap = async () => {
    const response = await fetch("/sitemap.xml");
    const sitemapString = await response.text();
    const parser = new DOMParser();
    const sitemapDoc = parser.parseFromString(sitemapString, "application/xml");

    const urls = Array.from(sitemapDoc.querySelectorAll("loc"))
      .map((x) => {
        return x.innerHTML
          .replace("https://internal.acecentre.org.uk", "")
          .replace("https://backend.acecentre.org.uk", "")
          .replace("https://acecentre.org.uk", "");
      })
      .filter((x) => x !== "");

    let tree = { title: "Home", path: "/", children: [], fullPath: "/" };
    for (const url of urls) {
      const urlParts = url.split("/").filter((x) => x !== "");
      let current = tree;
      let prevParts = [];

      for (const part of urlParts) {
        prevParts.push(part);
        const canFind = current.children.find((x) => x.path === part);

        if (canFind) {
          current = canFind;
        } else {
          const newNode = {
            title: toTitleCase(part),
            path: part,
            fullPath: prevParts.join("/"),
            children: [],
          };
          current.children.push(newNode);
          current = newNode;
        }
      }
    }

    setSitemap(tree);
  };

  useEffect(() => {
    getSitemap();
  }, []);

  return sitemap;
};

export default function Sitemap() {
  const { currentYear } = useGlobalProps();

  const sitemap = useSitemap();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle
          heading="Sitemap"
          description="A list of every page on the website"
        />
        <div className={styles.sitemapContainer}>
          {sitemap && <TreeLeaf node={sitemap} root />}
        </div>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const TreeLeaf = ({ node, root = false }) => {
  return (
    <Wrapper root={root}>
      <p>
        <Link href={node.fullPath}>
          <a>{node.title}</a>
        </Link>
      </p>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((current, i) => (
            <TreeLeaf key={`${current.title}-${i}`} node={current} />
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

const Wrapper = ({ root, children }) => {
  if (root) {
    return <div>{children}</div>;
  } else {
    return <li>{children}</li>;
  }
};

export const getStaticProps = withGlobalProps(async () => {
  return {
    props: {
      seo: {
        title: "Sitemap",
        description: "A list of every page on the website",
      },
    },
  };
});

const toTitleCase = (str) => {
  let replaced = str
    .split("-")
    .join(" ")
    .replace(/([^\W_]+[^\s-]*) */g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  const lowers = [
    "A",
    "An",
    "The",
    "And",
    "But",
    "Or",
    "For",
    "Nor",
    "As",
    "At",
    "By",
    "For",
    "From",
    "In",
    "Into",
    "Near",
    "Of",
    "On",
    "Onto",
    "To",
    "With",
  ];
  for (let i = 0; i < lowers.length; i++)
    replaced = replaced.replace(
      new RegExp("\\s" + lowers[i] + "\\s", "g"),
      function (txt) {
        return txt.toLowerCase();
      }
    );

  return replaced;
};
