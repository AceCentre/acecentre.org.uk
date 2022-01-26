import Head from "next/head";

import { imageLoaders } from "../lib/config";
import {
  cloudinaryLoader,
  imageKitLoader,
  keyLoader,
} from "../lib/image-loader";

const defaultTitle =
  "Ace Centre | Charity specialising in AAC & Assistive Technology";
const defaultDescription =
  "Ace Centre is a charity specialising in Augmentative and Alternative Communication (AAC) and Assistive Technology (AT). Free Advice Line 0800 080 3115";

const loaders = {
  cloudinaryLoader,
  imageKitLoader,
  keyLoader,
};

const imageLoader = loaders[imageLoaders.normal];

const defaultImage = {
  src: "/facebook-logo.jpeg",
  width: 601,
  height: 289,
};

export const DefaultHead = ({
  title,
  description: specificDescription,
  image: specificImage,
  product = null,
  showSearchBox = false,
}) => {
  const fullTitle = title ? `${title} | Ace Centre` : defaultTitle;
  const image = specificImage || defaultImage;
  const description = specificDescription || defaultDescription;

  return (
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
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </>

      {/* Rich search box markup */}
      {showSearchBox && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://acecentre.org.uk",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://acecentre.org.uk/search?searchText={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      )}

      {/* Rich results for google (Product) */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: [product.image],
            description: product.description,
            sku: product.sku,
            brand: {
              "@type": "Brand",
              name: "Ace Centre",
            },
            offers: {
              "@type": "Offer",
              url: product.url,
              priceCurrency: "GBP",
              price: product.price || 0,
              itemCondition: "https://schema.org/NewCondition",
              availability: product.availability
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          })}
        </script>
      )}

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
      <meta
        property="og:image"
        content={imageLoader({ src: image.src, width: image.width })}
      />
      <meta property="og:image:width" content={image.width} />
      <meta property="og:image:height" content={image.height} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary"></meta>
      <meta name="twitter:site" content="@acecentre"></meta>
    </Head>
  );
};
