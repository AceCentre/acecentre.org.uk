/* eslint-disable indent */
/* eslint-disable no-undef */
import { useState, useEffect, useMemo } from "react";
import { Radio, RadioGroup } from "../filter-people/filter-people";
import styles from "./resources-download.module.css";

import { Button } from "../button/button";
import config from "../../lib/config";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { usePosthog } from "../../lib/use-posthog";
import { useRouter } from "next/router";
import { Input } from "../input/input";

const storageKey = "newsletter-opt-in";

export const ResourcesDownload = ({ resource }) => {
  const variations = resource.variations || [];

  const { posthogLoaded, posthog } = usePosthog();

  if (resource.ebook) {
    return (
      <Ebook
        posthog={posthog}
        posthogLoaded={posthogLoaded}
        ebook={resource.ebook}
        resource={resource}
      />
    );
  }

  if (resource.external) {
    return (
      <External
        resource={resource}
        posthog={posthog}
        posthogLoaded={posthogLoaded}
      />
    );
  }

  if (variations.length > 0) {
    return (
      <MixedVariations
        posthog={posthog}
        posthogLoaded={posthogLoaded}
        resource={resource}
        variations={variations}
      />
    );
  }

  if (variations.length === 0 && !resource?.instantDownloadAvailable) {
    return <SinglePurchasableProduct resource={resource} />;
  }

  if (variations.length === 0 && resource?.instantDownloadAvailable) {
    return (
      <SingleDownloadableProduct
        posthog={posthog}
        posthogLoaded={posthogLoaded}
        resource={resource}
      />
    );
  }

  throw new Error(`Uh oh, looks like we cant render ${resource.slug}`);
};

const Ebook = ({ ebook, resource, posthog, posthogLoaded }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onClose = () => setModalOpen(false);

  return (
    <>
      <DownloadModal
        resource={resource}
        modalOpen={modalOpen}
        onClose={onClose}
      />
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
              setModalOpen(true);
              if (typeof gtag !== "undefined" && gtag) {
                gtag("event", "conversion", {
                  send_to: "AW-10885468875/Px_SCKzf9LQDEMulzMYo",
                });
              }

              if (
                posthogLoaded &&
                window.location.origin === "https://acecentre.org.uk"
              ) {
                console.log("Capture", "resourceDownloaded", {
                  name: resource.slug,
                });
                posthog.capture("resourceDownloaded", {
                  name: resource.slug,
                  resourceType: "ebook-download",
                });
              }
            }}
            href={ebook.downloadLocation}
          >
            Download ePub File
          </Button>
        )}
        {ebook.viewLocation && (
          <Button
            newTab
            onClick={() => {
              if (typeof gtag !== "undefined" && gtag) {
                gtag("event", "conversion", {
                  send_to: "AW-10885468875/Px_SCKzf9LQDEMulzMYo",
                });
              }

              if (
                posthogLoaded &&
                window.location.origin === "https://acecentre.org.uk"
              ) {
                console.log("Capture", "resourceDownloaded", {
                  name: resource.slug,
                });
                posthog.capture("resourceDownloaded", {
                  name: resource.slug,
                  resourceType: "ebook-view",
                });
              }
            }}
            href={`${ebook.viewLocation}/index.html`}
          >
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

        if (response.success) {
          router.push("/basket");
        } else {
          const defaultError =
            "Something went wrong adding this item to your cart";
          setError(response.error ? response.error : defaultError);
        }
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

const External = ({ resource, posthog, posthogLoaded }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const hasOptedInToNewsletter = useMemo(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`${storageKey}-${resource.slug}`) == "true";
    } else {
      return false;
    }
  }, []);

  return (
    <div className={styles.downloadButtonContainer}>
      {resource.popupFormBehaviour == "forced-email" && (
        <ForcedEmail
          resource={resource}
          modalOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            if (typeof gtag !== "undefined" && gtag) {
              gtag("event", "conversion", {
                send_to: "AW-10885468875/Px_SCKzf9LQDEMulzMYo",
              });
            }

            if (
              posthogLoaded &&
              window.location.origin === "https://acecentre.org.uk"
            ) {
              console.log("Capture", "resourceDownloaded", {
                name: resource.slug,
              });
              posthog.capture("resourceDownloaded", {
                name: resource.slug,
                resourceType: "external",
              });
            }

            const link = document.createElement("a");
            link.href = resource.external.url;
            link.target = "_blank";
            link.rel = "noreferrer";

            link.click();

            localStorage.setItem(`${storageKey}-${resource.slug}`, true);
          }}
        />
      )}
      <Button
        onClick={() => {
          if (
            hasOptedInToNewsletter ||
            resource.popupFormBehaviour != "forced-email"
          ) {
            if (typeof gtag !== "undefined" && gtag) {
              gtag("event", "conversion", {
                send_to: "AW-10885468875/Px_SCKzf9LQDEMulzMYo",
              });
            }

            if (
              posthogLoaded &&
              window.location.origin === "https://acecentre.org.uk"
            ) {
              console.log("Capture", "resourceDownloaded", {
                name: resource.slug,
              });
              posthog.capture("resourceDownloaded", {
                name: resource.slug,
                resourceType: "external",
              });
            }

            const link = document.createElement("a");
            link.href = resource.external.url;
            link.target = "_blank";
            link.rel = "noreferrer";

            link.click();
          } else {
            setModalOpen(true);
          }
        }}
      >
        {resource.external.cta}
      </Button>
    </div>
  );
};

const MixedVariations = ({ resource, variations, posthog, posthogLoaded }) => {
  const { disabled, addToCart, error } = useAddToCart();

  const defaultVariation = variations[0];
  const [currentlySelected, setCurrentlySelected] = useState(
    defaultVariation.slug
  );

  useEffect(() => {
    setCurrentlySelected(defaultVariation.slug);
  }, [defaultVariation, defaultVariation.slug]);

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

  if (!currentlySelectedFull) return null;

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
        <SingleDownloadableProduct
          posthog={posthog}
          posthogLoaded={posthogLoaded}
          resource={{
            ...currentlySelectedFull,
            slug: slugToUsefulSlug(currentlySelectedFull.slug, resource),
          }}
        />
      ) : (
        <div>
          {currentlySelectedFull.inStock ? (
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
          ) : (
            <>
              {resource.outOfStockForm && (
                <div className={styles.addToCartButtonContainer}>
                  <Button newTab href={resource.outOfStockForm}>
                    Join Waitlist
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const Price = ({ resource }) => {
  const price = resource.price === 0 ? "Free" : `£${resource.price}`;

  if (!resource.inStock && !resource.outOfStockForm) {
    return <p className={styles.price}>Out of stock</p>;
  }

  return <p className={styles.price}>{price}</p>;
};

export const NewsletterSignup = ({
  signUpIdentifier = "none",
  withNames = false,
  tags = [],
  onSuccess = () => {},
  subscribeText = "Subscribe",
}) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { posthogLoaded, posthog } = usePosthog();

  // Track when user starts interacting with the form
  const handleFormInteraction = () => {
    if (
      posthogLoaded &&
      window.location.origin === "https://acecentre.org.uk"
    ) {
      posthog.capture("newsletterFormInteraction", {
        location: signUpIdentifier,
        tags: tags.map((tag) => tag.name),
        hasNames: withNames,
      });
    }
  };

  return (
    <>
      <form
        action={"https://crm-connector.acecentre.org.uk/crm/crm-functions"}
        method="POST"
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();

          const addToList = async () => {
            setLoading(true);

            try {
              const response = await fetch(
                "https://crm-connector.acecentre.org.uk/crm/crm-functions",
                {
                  body: JSON.stringify({
                    email: e.target.email.value,
                    firstName: e?.target?.firstName?.value || undefined,
                    lastName: e?.target?.lastName?.value || undefined,
                    location: signUpIdentifier,
                    method: "add-to-newsletter",
                    tags,
                  }),
                  method: "POST",
                  headers: { "content-type": "application/json" },
                }
              );

              const result = await response.json();

              if (response.status !== 200) {
                console.warn(result);
                throw new Error("Non 200 status");
              }

              // Track successful newsletter signup
              if (
                posthogLoaded &&
                window.location.origin === "https://acecentre.org.uk"
              ) {
                console.log("Capture", "newsletterSignup", {
                  location: signUpIdentifier,
                  tags: tags.map((tag) => tag.name),
                  hasNames: withNames,
                });
                posthog.capture("newsletterSignup", {
                  location: signUpIdentifier,
                  tags: tags.map((tag) => tag.name),
                  hasNames: withNames,
                });
              }

              onSuccess();

              setSuccess(true);
            } catch (err) {
              console.warn(err);
              setError("An error occurred");

              // Track newsletter signup errors
              if (
                posthogLoaded &&
                window.location.origin === "https://acecentre.org.uk"
              ) {
                posthog.capture("newsletterSignupError", {
                  location: signUpIdentifier,
                  tags: tags.map((tag) => tag.name),
                  hasNames: withNames,
                  error: err.message,
                });
              }
            }

            setLoading(false);
          };

          addToList();
        }}
      >
        {withNames && (
          <div className={styles.namesInput}>
            <Input
              withLabel
              name="firstName"
              placeholder={"First name"}
              ariaLabel="First name"
              white
              onFocus={handleFormInteraction}
            ></Input>
            <Input
              withLabel
              name="lastName"
              placeholder={"Last name"}
              ariaLabel="Last name"
              white
              onFocus={handleFormInteraction}
            ></Input>
          </div>
        )}
        <div className={styles.formInput}>
          <Input
            withLabel={withNames}
            name="email"
            required
            placeholder={"Email address"}
            ariaLabel="Email address"
            type="email"
            white
            onFocus={handleFormInteraction}
          ></Input>
          <Button type="submit" disabled={!!error || !!success || loading}>
            {subscribeText}
          </Button>
        </div>
        {error && (
          <p className={styles.error}>
            An error occurred whilst trying to register for the newsletter,
            please try again later.
          </p>
        )}
        {success && (
          <p className={styles.success}>
            You have successfully signed up for the newsletter.
          </p>
        )}
      </form>
    </>
  );
};

const ForcedEmail = ({ resource, modalOpen, onClose, onSuccess }) => {
  return (
    <Modal
      scrollBehavior="inside"
      size="3xl"
      isCentered
      isOpen={modalOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody style={{ padding: "2rem" }}>
          <div className={styles.topSection}>
            <h2>Free download</h2>
            <p>
              You can access this content by joining our mailing list to stay up
              to date with the latest resources from Ace Centre
            </p>
          </div>
          <div className={styles.newsletterContainer}>
            <NewsletterSignup
              withNames
              signUpIdentifier={"resource-download"}
              tags={[{ name: resource.slug }]}
              onSuccess={
                onSuccess
                  ? onSuccess
                  : () => {
                      const link = document.createElement("a");
                      link.download = true;
                      const absoluteUrl =
                        typeof resource.downloadUrl === "string" &&
                        resource.downloadUrl.startsWith("http")
                          ? resource.downloadUrl
                          : `${config.baseUrl}${resource.downloadUrl}`;
                      link.href = absoluteUrl;
                      link.click();
                      localStorage.setItem(
                        `${storageKey}-${resource.slug}`,
                        true
                      );
                    }
              }
            />
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

const DownloadModal = ({ resource, modalOpen, onClose }) => {
  const hasOptedInToNewsletter = useMemo(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`${storageKey}-${resource.slug}`) == "true";
    } else {
      return false;
    }
  }, []);

  if (resource.popupFormBehaviour == "forced-email") {
    if (hasOptedInToNewsletter) {
      return null;
    } else {
      return (
        <ForcedEmail
          resource={resource}
          onClose={onClose}
          modalOpen={modalOpen}
        />
      );
    }
  }

  if (resource.popupFormBehaviour == "donation") {
    return (
      <OptionalDonate
        slug={resource.slug}
        onClose={onClose}
        modalOpen={modalOpen}
      />
    );
  }

  if (resource.popupFormBehaviour == "optional-email") {
    return (
      <OptionalDownloadModal
        slug={resource.slug}
        onClose={onClose}
        modalOpen={modalOpen}
      />
    );
  }

  if (resource.popupFormBehaviour == "no-popup") {
    return null;
  }

  return (
    <OptionalDownloadModal
      slug={resource.slug}
      onClose={onClose}
      modalOpen={modalOpen}
    />
  );
};

const OptionalDonate = ({ modalOpen, onClose }) => {
  return (
    <Modal
      scrollBehavior="inside"
      size="3xl"
      isCentered
      isOpen={modalOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody style={{ padding: "2rem" }}>
          <div className={styles.topSection}>
            <h2>Free download complete</h2>
            <p>
              If you found this resource helpful then please consider donating
              so we can continue to make valuable resources.
            </p>
          </div>
          <div className={styles.donateButton}>
            <Button href="/get-involved/donate">Donate</Button>
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

const OptionalDownloadModal = ({ modalOpen, onClose, slug }) => {
  return (
    <Modal
      scrollBehavior="inside"
      size="3xl"
      isCentered
      isOpen={modalOpen}
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
            <NewsletterSignup
              tags={[{ name: slug }]}
              signUpIdentifier="resource-download"
            />
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

const SingleDownloadableProduct = ({ resource, posthog, posthogLoaded }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onClose = () => setModalOpen(false);

  const hasOptedInToNewsletter = useMemo(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`${storageKey}-${resource.slug}`) == "true";
    } else {
      return false;
    }
  }, []);

  const onClickForcedEmail = () => {
    setModalOpen(true);
    if (typeof gtag !== "undefined" && gtag) {
      gtag("event", "conversion", {
        send_to: "AW-10885468875/Px_SCKzf9LQDEMulzMYo",
      });
    }

    if (
      posthogLoaded &&
      window.location.origin === "https://acecentre.org.uk"
    ) {
      console.log("Capture", "resourceDownloaded", {
        name: resource.slug,
      });
      posthog.capture("resourceDownloaded", {
        name: resource.slug,
        resourceType: "instant-download",
      });
    }
  };

  const onClickOptional = () => {
    setModalOpen(true);
    if (typeof gtag !== "undefined" && gtag) {
      gtag("event", "conversion", {
        send_to: "AW-10885468875/Px_SCKzf9LQDEMulzMYo",
      });
    }

    if (
      posthogLoaded &&
      window.location.origin === "https://acecentre.org.uk"
    ) {
      console.log("Capture", "resourceDownloaded", {
        name: resource.slug,
      });
      posthog.capture("resourceDownloaded", {
        name: resource.slug,
        resourceType: "instant-download",
      });
    }

    const link = document.createElement("a");
    link.download = true;
    const absoluteUrl =
      typeof resource.downloadUrl === "string" &&
      resource.downloadUrl.startsWith("http")
        ? resource.downloadUrl
        : `${config.baseUrl}${resource.downloadUrl}`;
    link.href = absoluteUrl;
    link.click();
  };

  return (
    <>
      <div className={styles.downloadButtonContainer}>
        {resource.popupFormBehaviour == "forced-email" &&
        !hasOptedInToNewsletter ? (
          <Button onClick={onClickForcedEmail}>Free download</Button>
        ) : (
          <Button onClick={onClickOptional}>Free download</Button>
        )}
      </div>
      <DownloadModal
        resource={resource}
        modalOpen={modalOpen}
        onClose={onClose}
      />
    </>
  );
};

const slugToUsefulSlug = (slug, resource) => {
  if (slug.toLowerCase().includes("auto-draft")) {
    return slug.replace("auto-draft", resource.slug);
  }

  return slug;
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
