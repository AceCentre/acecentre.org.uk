import { useState } from "react";
import { Radio, RadioGroup } from "../filter-people/filter-people";
import styles from "./resources-download.module.css";

import { Button } from "../button/button";
import config from "../../lib/config";
import { useRouter } from "next/dist/client/router";

export const ResourcesDownload = ({ resource }) => {
  const variations = resource.variations || [];

  if (resource.external) {
    return <External resource={resource} />;
  }

  if (variations.length > 0) {
    return <MixedVariations resource={resource} variations={variations} />;
  }

  if (variations.length === 0 && !resource.instantDownloadAvailable) {
    return <SinglePurchasableProduct resource={resource} />;
  }

  if (variations.length === 0 && resource.instantDownloadAvailable) {
    return <SingleDownloadableProduct resource={resource} />;
  }

  throw new Error(`Uh oh, looks like we cant render ${resource.slug}`);
};

export const useAddToCart = () => {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const addToCart = (body) => (event) => {
    event.preventDefault();
    setDisabled(true);

    fetch("/api/cart/add", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(async (result) => {
        const response = await result.json();
        console.log(response);
        router.push("/basket");
      })
      .catch((err) => {
        setError(true);
        throw err;
      });
  };

  return {
    disabled,
    addToCart,
    error,
  };
};

const External = ({ resource }) => {
  return (
    <div className={styles.downloadButtonContainer}>
      <Button newTab href={resource.external.url}>
        {resource.external.cta}
      </Button>
    </div>
  );
};

const MixedVariations = ({ resource, variations }) => {
  const { disabled, addToCart, error } = useAddToCart();

  const defaultVariation = variations[0];
  const [currentlySelected, setCurrentlySelected] = useState(
    defaultVariation.slug
  );

  const onChange = (value) => {
    console.log(
      "changed to: ",
      variations.find((x) => x.slug == value)
    );
    setCurrentlySelected(value);
  };

  const currentlySelectedFull = variations.find(
    (x) => x.slug == currentlySelected
  );

  const downloadableVariations = variations.filter(
    (variation) => variation.instantDownloadAvailable
  );

  const showFreePrice = variations.length !== downloadableVariations.length;

  return (
    <div>
      <p>Choose option:</p>
      <RadioGroup
        className={styles.radioGroup}
        aria-label="Select format"
        defaultValue={defaultVariation.slug}
        onChange={onChange}
      >
        {variations.map((variation) => {
          return (
            <Radio
              key={`variation-select-${variation.slug}`}
              value={variation.slug}
            >
              {variation.name}
            </Radio>
          );
        })}
      </RadioGroup>
      {showFreePrice && <Price resource={currentlySelectedFull} />}

      {currentlySelectedFull.instantDownloadAvailable ? (
        <div className={styles.downloadButtonContainer}>
          <Button
            href={`${config.baseUrl}${currentlySelectedFull.downloadUrl}`}
          >
            Free download
          </Button>
        </div>
      ) : (
        <div>
          {currentlySelectedFull.inStock && (
            <div className={styles.addToCartButtonContainer}>
              <Button
                disabled={disabled}
                onClick={addToCart({
                  productId: resource.id,
                  variationId: currentlySelectedFull.id,
                })}
              >
                Add to cart
              </Button>
              {error && (
                <p>Something went wrong adding this item to your cart</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Price = ({ resource }) => {
  const price = resource.price === 0 ? "Free" : `£${resource.price}`;

  if (!resource.inStock) {
    return <p className={styles.price}>Out of stock</p>;
  }

  return <p className={styles.price}>{price}</p>;
};

const SingleDownloadableProduct = ({ resource }) => {
  return (
    <div className={styles.downloadButtonContainer}>
      <Button href={`${config.baseUrl}${resource.downloadUrl}`}>
        Free download
      </Button>
    </div>
  );
};

// A product that can be purchased and has no variations
const SinglePurchasableProduct = ({ resource }) => {
  const { disabled, addToCart, error } = useAddToCart();

  return (
    <div>
      <Price resource={resource} />
      {resource.inStock && (
        <div className={styles.addToCartButtonContainer}>
          <Button
            disabled={disabled}
            onClick={addToCart({
              productId: resource.id,
            })}
          >
            Add to cart
          </Button>
          {error && <p>Something went wrong adding this item to your cart</p>}
        </div>
      )}
    </div>
  );
};
