import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button } from "../button/button";
import styles from "./service-finder-search.module.css";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { useEffect, useState } from "react";
import Link from "next/link";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [services, setServices] = useState({
    services: [],
    nearbyServices: [],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      setGeo(navigator.geolocation);
    }
  }, []);

  const getServicesFromGeo = async () => {
    setLoading(true);
    setError(null);
    try {
      const { coords } = await new Promise((res, rej) => {
        geo.getCurrentPosition(res, rej);
      });

      const result = await fetch(
        "https://servicefinder.acecentre.net/graphql",
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

      const {
        data: { servicesForCoords },
      } = await result.json();

      setServices(servicesForCoords);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getServicesFromPostcodeAsync = async (currentEvent) => {
    setLoading(true);
    setError(null);
    try {
      const postcode = currentEvent.target.postcode.value;
      const result = await fetch(
        "https://servicefinder.acecentre.net/graphql",
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

      const {
        data: { servicesForPostcode },
      } = await result.json();

      setServices(servicesForPostcode);
      setLoading(false);
    } catch (error) {
      setError(error);
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
          <PostcodeInput disabled={loading} />
          <div className={styles.buttonContainer}>
            <Button type="submit" disabled={loading}>
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
      )}

      {error && <p>{JSON.stringify(error, null, 2)}</p>}
    </div>
  );
};

const PostcodeInput = ({ disabled }) => {
  return (
    <FormControl>
      <FormLabel>Enter your postcode</FormLabel>
      <Input
        name="postcode"
        disabled={disabled}
        placeholder="eg. OL8 3QL"
        type="text"
        className={styles.postcodeInput}
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
