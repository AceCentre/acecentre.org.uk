import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button } from "../button/button";
import styles from "./service-finder-search.module.css";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CORRECTION_FORM, FormModal } from "../ms-form";
import { useGlobalProps } from "../../lib/global-props/hook";
import posthog from "posthog-js";

const gql = ([result]) => result;

const GetServicesFromCoords = gql`
  query GetServicesFromCoords($lat: Float!, $lng: Float!) {
    servicesForCoords(lat: $lat, lng: $lng) {
      services {
        id
        serviceName
        addressLines
        phoneNumber
        servicesOffered {
          title
          id
        }
      }

      nearbyServices {
        id
        serviceName
      }
    }
  }
`;

const GetServicesFromPostcode = gql`
  query GetServicesFromPostcode($postcode: String!) {
    servicesForPostcode(postcode: $postcode) {
      services {
        id
        serviceName
        addressLines
        phoneNumber
        servicesOffered {
          title
          id
        }
      }

      nearbyServices {
        id
        serviceName
      }
    }
  }
`;

const useServices = () => {
  const [geo, setGeo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState(null);
  const { posthogLoaded } = useGlobalProps();

  useEffect(() => {
    if (navigator.geolocation) {
      setGeo(navigator.geolocation);
    }
  }, []);

  const getServicesFromGeo = async () => {
    setLoading(true);
    setError(null);
    setServices(null);

    if (posthogLoaded) {
      posthog.capture("serviceSearchStarted", { type: "geo" });
    }

    try {
      const { coords } = await new Promise((res, rej) => {
        geo.getCurrentPosition(res, rej);
      });

      const result = await fetch(
        "https://servicefinder.acecentre.net/.netlify/functions/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GetServicesFromCoords,
            variables: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          }),
        }
      );

      const parsed = await result.json();

      if (parsed.errors && parsed.errors.length > 0) {
        setError(parsed.errors[0].message);
        setLoading(false);
        return;
      }

      if (!parsed && !parsed.data && !parsed.servicesForCoords) {
        setError("Failed to get services for your coordinates.");
        setLoading(false);
        return;
      }

      const {
        data: { servicesForCoords },
      } = parsed;

      setServices(servicesForCoords);
      setLoading(false);

      if (posthogLoaded) {
        posthog.capture("serviceSearchFinished", {
          type: "geo",
          numberOfServices: servicesForCoords.services.length,
        });

        for (const current of servicesForCoords.services) {
          posthog.capture("serviceFound", {
            type: "geo",
            serviceId: current.id,
          });
        }
      }
    } catch (error) {
      console.warn(error);

      setError("Failed to load services for your postcode.");
      setLoading(false);
    }
  };

  const getServicesFromPostcodeAsync = async (currentEvent) => {
    setLoading(true);
    setError(null);
    setServices(null);

    if (posthogLoaded) {
      posthog.capture("serviceSearchStarted", { type: "postcode" });
    }

    try {
      const postcode = currentEvent.target.postcode.value;
      const result = await fetch(
        "https://servicefinder.acecentre.net/.netlify/functions/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GetServicesFromPostcode,
            variables: {
              postcode,
            },
          }),
        }
      );

      const parsed = await result.json();

      if (parsed.errors && parsed.errors.length > 0) {
        setError(parsed.errors[0].message);
        setLoading(false);
        return;
      }

      if (!parsed && !parsed.data && !parsed.servicesForPostcode) {
        setError("Failed to get services for your postcode.");
        setLoading(false);
        return;
      }

      const {
        data: { servicesForPostcode },
      } = parsed;

      setServices(servicesForPostcode);
      setLoading(false);

      if (posthogLoaded) {
        posthog.capture("serviceSearchFinished", {
          type: "postcode",
          numberOfServices: servicesForPostcode.services.length,
        });

        for (const current of servicesForPostcode.services) {
          posthog.capture("serviceFound", {
            type: "postcode",
            serviceId: current.id,
          });
        }
      }
    } catch (error) {
      console.warn(error);

      setError("Failed to load services for your postcode.");
      setLoading(false);
    }
  };

  const getServicesFromPostcode = async (event) => {
    event.preventDefault();
    getServicesFromPostcodeAsync(event);
  };

  return {
    isGeoAllowed: !!geo,
    loading,
    error,
    getServicesFromGeo,
    services,
    getServicesFromPostcode,
  };
};

export const ServiceFinderSearch = () => {
  const [textInput, setTextInput] = useState("");

  const {
    loading,
    isGeoAllowed,
    error,
    getServicesFromGeo,
    services,
    getServicesFromPostcode,
  } = useServices();

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={getServicesFromPostcode} className={styles.searchBar}>
          <PostcodeInput updateTextInput={setTextInput} disabled={loading} />
          <div className={styles.buttonContainer}>
            <Button type="submit" disabled={loading || textInput === ""}>
              Find services
            </Button>
          </div>
        </form>
        {isGeoAllowed && (
          <ButtonAsLink disabled={loading} onClick={getServicesFromGeo}>
            <MyLocationIcon />
            Or use your current location
          </ButtonAsLink>
        )}
      </div>
      {loading ? (
        <ul className={styles.resultsContainer}>
          {["first-skeleton", "second-skeleton"].map((skeleton) => (
            <li aria-hidden={true} className={styles.resultCard} key={skeleton}>
              <h3 className={styles.skeletonTitle}></h3>
              <p className={styles.skeletonServices}></p>
              <p className={styles.addressSkeleton}></p>
              <div>
                <p className={styles.addressLineSkeleton}></p>
                <p className={styles.addressLineSkeleton}></p>
                <p className={styles.addressLineSkeleton}></p>
                <p className={styles.addressLineSkeleton}></p>
              </div>
              <p className={styles.skeletonPhone}></p>
              <p className={styles.findOutMoreFake}></p>
            </li>
          ))}
        </ul>
      ) : (
        <ListOfServices services={services} />
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

const ListOfServices = ({ services }) => {
  if (services == null) return null;

  if (services.services.length === 0) {
    return <NoResults />;
  }

  return (
    <ul className={styles.resultsContainer}>
      {services.services.map((service) => (
        <li className={styles.resultCard} key={service.id}>
          <h3>{service.serviceName}</h3>
          <p>
            <strong>Services:</strong>{" "}
            {service.servicesOffered.map((x) => x.title).join(", ")}
          </p>
          <p>
            <strong>Address:</strong>
          </p>
          <div>
            {service.addressLines.map((line) => (
              <span className={styles.addressLine} key={line}>
                {line}
              </span>
            ))}
          </div>
          <p>
            <strong>Phone:</strong> {service.phoneNumber}
          </p>
          <Link href={`/nhs-service-finder/${service.id}`}>
            <a className={styles.findOutMore}>Find out more &gt;</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const NoResults = () => {
  return (
    <div className={styles.noResults}>
      <h2>Sorry, we could not find any services in your area</h2>
      <p>
        If you think this is wrong, or if you know the service that should have
        come up then click the button below and fill out the form.
      </p>
      <div>
        <FormModal form={CORRECTION_FORM}>
          {({ onClick }) => (
            <div>
              <Button onClick={onClick}>Open correction form</Button>
            </div>
          )}
        </FormModal>
      </div>
    </div>
  );
};

const PostcodeInput = ({ disabled, updateTextInput }) => {
  return (
    <FormControl>
      <FormLabel>Enter your postcode</FormLabel>
      <Input
        name="postcode"
        disabled={disabled}
        placeholder="eg. OL8 3QL"
        type="text"
        className={styles.postcodeInput}
        onChange={(event) => {
          updateTextInput(event.target.value);
        }}
      />
    </FormControl>
  );
};

const ButtonAsLink = ({ children, onClick }) => {
  return (
    <button className={styles.buttonAsLink} onClick={onClick}>
      {children}
    </button>
  );
};
