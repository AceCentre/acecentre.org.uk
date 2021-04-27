import { Image } from "../../components/image";
import { getAllProducts } from "../../lib/products/get-products";
import { readFromStaticCache } from "../../lib/static-caching/read";
import { writeToStaticCache } from "../../lib/static-caching/write";

const PRODUCT_CACHE_KEY = "products";

export default function ProductPage({ product }) {
  return (
    <>
      <h1>A product page</h1>
      <pre>{JSON.stringify(product, null, 2)}</pre>
      {product.image && <Image {...product.image} maxWidth={100} />}

      {product.gallery.map((image) => (
        <Image key={image.src} {...image} maxWidth={100} />
      ))}
    </>
  );
}

export async function getStaticPaths() {
  const allProducts = await getAllProducts();

  writeToStaticCache(PRODUCT_CACHE_KEY, allProducts);

  const paths = allProducts.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const allProducts = readFromStaticCache(PRODUCT_CACHE_KEY);
  const product = allProducts.find(({ slug }) => slug === params.slug);

  if (!product) {
    throw new Error("Could not find product with slug: ", params.slug);
  }

  return { props: { product } };
}
