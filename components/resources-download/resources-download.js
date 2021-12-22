import { useState } from "react";
import { Radio, RadioGroup } from "../filter-people/filter-people";
import styles from "./resources-download.module.css";
import posthog from "posthog-js";

import { Button } from "../button/button";
import config from "../../lib/config";
import { useRouter } from "next/dist/client/router";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useGlobalProps } from "../../lib/global-props/hook";

export const ResourcesDownload = ({ resource }) => {
  const variations = resource.variations || [];

  if (resource.ebook) {
    return <Ebook ebook={resource.ebook} resource={resource} />;
  }

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

const Ebook = ({ ebook, resource }) => {
  const [modelOpen, setModelOpen] = useState(false);

  const onClose = () => setModelOpen(false);

  const { posthogLoaded } = useGlobalProps();

  return (
    <>
      <DownloadModal modelOpen={modelOpen} onClose={onClose} />
      <div className={styles.ebook}>
        {ebook.ibook && (
          <a
            target="_blank"
            rel="noreferrer"
            aria-label="Open in apple books"
            href={ebook.ibook}
          >
            <img
              height={40}
              width={140}
              alt="Get it on Apple Books"
              src="/apple-books.svg"
            ></img>
          </a>
        )}
        {ebook.downloadLocation && (
          <Button
            onClick={() => {
              setModelOpen(true);
              if (
                posthogLoaded &&
                window.location.origin === "https://acecentre.org.uk"
              ) {
                console.log("Capture", "resourceDownloaded", {
                  name: resource.slug,
                });
                posthog.capture("resourceDownloaded", { name: resource.slug });
              }
            }}
            href={ebook.downloadLocation}
          >
            Download ePub File
          </Button>
        )}
        {ebook.viewLocation && (
          <Button newTab href={`${ebook.viewLocation}/index.html`}>
            View eBook
          </Button>
        )}
      </div>
    </>
  );
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
  const { posthogLoaded } = useGlobalProps();

  return (
    <div className={styles.downloadButtonContainer}>
      <Button
        newTab
        onClick={() => {
          if (
            posthogLoaded &&
            window.location.origin === "https://acecentre.org.uk"
          ) {
            console.log("Capture", "resourceDownloaded", {
              name: resource.slug,
            });
            posthog.capture("resourceDownloaded", { name: resource.slug });
          }
        }}
        href={resource.external.url}
      >
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
        <SingleDownloadableProduct resource={currentlySelectedFull} />
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

const DownloadModal = ({ modelOpen, onClose }) => {
  return (
    <Modal
      scrollBehavior="inside"
      size="3xl"
      isCentered
      isOpen={modelOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody style={{ padding: "2rem" }}>
          <div className={styles.topSection}>
            <h2>Free download complete</h2>
            <p>
              Sign up to our free newsletter to stay up to date with the latest
              resources from Ace Centre
            </p>
          </div>

          <div className={styles.newsletterContainer}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<!-- Begin Mailchimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;}
/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
 We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<style type="text/css">
#mc-embedded-subscribe-form input[type=checkbox]{display: inline; width: auto;margin-right: 10px;}
#mergeRow-gdpr {margin-top: 20px;}
#mergeRow-gdpr fieldset label {font-weight: normal;}
#mc-embedded-subscribe#mc-embedded-subscribe {
background-color: #00537F;
}
#mc-embedded-subscribe-form .mc_fieldset{border:none;min-height: 0px;padding-bottom:0px;}
</style>
<div id="mc_embed_signup">
<form action="https://acecentre.us7.list-manage.com/subscribe/post?u=d05eb11e79c97878b9f10fd9c&amp;id=ec5a06da07&SIGNUP=free-resource" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
<div id="mc_embed_signup_scroll">
<input aria-label="Email address for mailing list" type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="Email address" required>
<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_d05eb11e79c97878b9f10fd9c_ec5a06da07" tabindex="-1" value=""></div>
<div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
</div>
</form>
</div>

<!--End mc_embed_signup-->`,
              }}
            ></div>
          </div>
          <div className={styles.bottomContainer}>
            <button className={styles.closeButton} onClick={onClose}>
              Close window
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const SingleDownloadableProduct = ({ resource }) => {
  const [modelOpen, setModelOpen] = useState(false);
  const { posthogLoaded } = useGlobalProps();

  const onClose = () => setModelOpen(false);

  return (
    <>
      <div className={styles.downloadButtonContainer}>
        <Button
          onClick={() => {
            setModelOpen(true);
            if (
              posthogLoaded &&
              window.location.origin === "https://acecentre.org.uk"
            ) {
              console.log("Capture", "resourceDownloaded", {
                name: resource.slug,
              });
              posthog.capture("resourceDownloaded", { name: resource.slug });
            }
          }}
          href={`${config.baseUrl}${resource.downloadUrl}`}
          download
        >
          Free download
        </Button>
      </div>
      <DownloadModal modelOpen={modelOpen} onClose={onClose} />
    </>
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
