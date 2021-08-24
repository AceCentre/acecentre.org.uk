import Head from "next/head";

const defaultTitle =
  "Ace Centre | Charity specialising in AAC & Assistive Technology";
const defaultDescription =
  "Ace Centre is a charity specialising in Augmentative and Alternative Communication (AAC) and Assistive Technology (AT). Free Advice Line 0800 080 3115";

export const DefaultHead = ({ title, description = defaultDescription }) => {
  const fullTitle = title ? `${title} | Ace Centre` : defaultTitle;

  return (
    // TODO Fill this out
    <Head>
      {/* Favicon */}
      <>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </>

      {/* Title */}
      <>
        <title>{fullTitle}</title>
        <meta property="og:title" content={fullTitle}></meta>
      </>

      {/* Description */}
      <>
        <meta name="description" content={description}></meta>
        <meta property="og:description" content={description}></meta>
      </>

      {/* Misc */}
      <meta property="og:locale" content="en_GB"></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:url" content="https://acecentre.org.uk/"></meta>
      <meta property="og:site_name" content="Ace Centre"></meta>

      {/* Facebook */}
      <meta
        property="article:publisher"
        content="https://www.facebook.com/ACECentre.uk"
      ></meta>

      {/* Image */}
      <meta property="og:image" content="/facebook-logo.jpeg" />
      <meta property="og:image:width" content="601" />
      <meta property="og:image:height" content="289" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary"></meta>
      <meta name="twitter:site" content="@acecentre"></meta>
    </Head>
  );
};
