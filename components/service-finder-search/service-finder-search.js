import { Input } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button } from "../button/button";
import styles from "./service-finder-search.module.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { CORRECTION_FORM, FormModal } from "../ms-form";
import { ServiceFinderMailingList } from "../service-finder-mailing-list/service-finder-mailing-list";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AccessibleIcon from "@mui/icons-material/Accessible";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

import { usePosthog } from "../../lib/use-posthog";

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

const UnifiedSearch = gql`
  query UnifiedSearch($query: String!) {
    search(query: $query) {
      locationType
      resolvedLocation
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

const GetPlaceSuggestions = gql`
  query GetPlaceSuggestions($query: String!, $limit: Int) {
    placeSuggestions(query: $query, limit: $limit) {
      name
      county
      country
    }
  }
`;

const useServices = () => {
  const [geo, setGeo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState(null);
  const [resolvedLocation, setResolvedLocation] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const { posthogLoaded, posthog } = usePosthog();

  useEffect(() => {
    if (navigator.geolocation) {
      setGeo(navigator.geolocation);
    }
  }, []);

  const getServicesFromGeo = async () => {
    setLoading(true);
    setError(null);
    setServices(null);
    setResolvedLocation(null);
    setLocationType(null);

    if (
      posthogLoaded &&
      window.location.origin === "https://acecentre.org.uk"
    ) {
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
      setLocationType("GEO");
      setLoading(false);

      if (
        posthogLoaded &&
        window.location.origin === "https://acecentre.org.uk"
      ) {
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

      setError("Failed to load services for your location.");
      setLoading(false);
    }
  };

  const searchServices = async (currentEvent) => {
    setLoading(true);
    setError(null);
    setServices(null);
    setResolvedLocation(null);
    setLocationType(null);

    if (
      posthogLoaded &&
      window.location.origin === "https://acecentre.org.uk"
    ) {
      posthog.capture("serviceSearchStarted", { type: "unified" });
    }

    try {
      const query = currentEvent.target.location.value;
      const result = await fetch(
        "https://servicefinder.acecentre.net/.netlify/functions/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: UnifiedSearch,
            variables: {
              query,
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

      if (!parsed && !parsed.data && !parsed.search) {
        setError("Failed to get services for your location.");
        setLoading(false);
        return;
      }

      const {
        data: { search },
      } = parsed;

      setServices(search);
      setResolvedLocation(search.resolvedLocation);
      setLocationType(search.locationType);
      setLoading(false);

      if (
        posthogLoaded &&
        window.location.origin === "https://acecentre.org.uk"
      ) {
        posthog.capture("serviceSearchFinished", {
          type: search.locationType.toLowerCase(),
          resolvedLocation: search.resolvedLocation,
          numberOfServices: search.services.length,
        });

        for (const current of search.services) {
          posthog.capture("serviceFound", {
            type: search.locationType.toLowerCase(),
            serviceId: current.id,
          });
        }
      }
    } catch (error) {
      console.warn(error);

      setError("Failed to load services for your location.");
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    searchServices(event);
  };

  return {
    isGeoAllowed: !!geo,
    loading,
    error,
    getServicesFromGeo,
    services,
    handleSearch,
    resolvedLocation,
    locationType,
  };
};

const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  const fetchSuggestions = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    // Don't fetch suggestions for things that look like postcodes
    const postcodePattern = /^[A-Z]{1,2}[0-9]/i;
    if (postcodePattern.test(query.trim())) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const result = await fetch(
        "https://servicefinder.acecentre.net/.netlify/functions/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GetPlaceSuggestions,
            variables: {
              query: query.trim(),
              limit: 5,
            },
          }),
        }
      );

      const parsed = await result.json();

      if (parsed.data && parsed.data.placeSuggestions) {
        setSuggestions(parsed.data.placeSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.warn("Failed to fetch suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetch = useCallback(
    (query) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(query);
      }, 300);
    },
    [fetchSuggestions]
  );

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    loading,
    fetchSuggestions: debouncedFetch,
    clearSuggestions,
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
    handleSearch,
    resolvedLocation,
    locationType,
  } = useServices();

  const { suggestions, fetchSuggestions, clearSuggestions } = useSuggestions();

  const handleInputChange = (value) => {
    setTextInput(value);
    fetchSuggestions(value);
  };

  const handleSuggestionSelect = (suggestion) => {
    setTextInput(suggestion.name);
    clearSuggestions();
  };

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSearch} className={styles.searchBar}>
          <LocationInput
            value={textInput}
            updateTextInput={handleInputChange}
            disabled={loading}
            suggestions={suggestions}
            onSuggestionSelect={handleSuggestionSelect}
            onBlur={clearSuggestions}
          />
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
        <ListOfServices
          services={services}
          resolvedLocation={resolvedLocation}
          locationType={locationType}
        />
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

const Icons = ({ servicesOffered }) => {
  const ids = servicesOffered.map((service) => service.id);

  console.log(ids);

  return (
    <div className={styles.iconList}>
      {ids.includes("aac") && (
        <Tooltip title="AAC Service">
          <Avatar className={styles.avatar}>
            <QuestionAnswerIcon />
          </Avatar>
        </Tooltip>
      )}
      {ids.includes("wcs") && (
        <Tooltip title="Wheelchair Service">
          <Avatar className={styles.avatar}>
            <AccessibleIcon />
          </Avatar>
        </Tooltip>
      )}
      {ids.includes("ec") && (
        <Tooltip title="EC Service">
          <Avatar className={styles.avatar}>
            <EmojiObjectsIcon />
          </Avatar>
        </Tooltip>
      )}
    </div>
  );
};

const LocationTypeLabel = ({ locationType, resolvedLocation }) => {
  if (!locationType || !resolvedLocation) return null;

  const labels = {
    POSTCODE: "postcode",
    OUTCODE: "area",
    PLACE: "location",
    GEO: "current location",
  };

  return (
    <p className={styles.locationInfo}>
      Showing results for {labels[locationType] || "location"}:{" "}
      <strong>{resolvedLocation}</strong>
    </p>
  );
};

const ListOfServices = ({ services, resolvedLocation, locationType }) => {
  if (services == null) return null;

  if (services.services.length === 0) {
    return <NoResults resolvedLocation={resolvedLocation} />;
  }

  return (
    <>
      <LocationTypeLabel
        locationType={locationType}
        resolvedLocation={resolvedLocation}
      />
      <ul className={styles.resultsContainer}>
        {services.services.map((service) => (
          <li className={styles.resultCard} key={service.id}>
            <h3>{service.serviceName}</h3>
            <Icons servicesOffered={service.servicesOffered} />
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
            <Link
              href={`/nhs-service-finder/${service.id}`}
              className={styles.findOutMore}
            >
              Find out more &gt;
            </Link>
          </li>
        ))}
      </ul>
      <ServiceFinderMailingList />
    </>
  );
};

const NoResults = ({ resolvedLocation }) => {
  return (
    <div className={styles.noResults}>
      <h2>Sorry, we could not find any services in your area</h2>
      {resolvedLocation && (
        <p>
          We searched for services near <strong>{resolvedLocation}</strong> but
          didn&apos;t find any matches.
        </p>
      )}
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

const LocationInput = ({
  disabled,
  updateTextInput,
  value,
  suggestions,
  onSuggestionSelect,
  onBlur,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click to register
    setTimeout(() => {
      setShowSuggestions(false);
      onBlur();
    }, 200);
  };

  useEffect(() => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [suggestions]);

  return (
    <FormControl className={styles.locationInputWrapper}>
      <FormLabel>Enter postcode, town or city</FormLabel>
      <Input
        ref={inputRef}
        name="location"
        disabled={disabled}
        placeholder="e.g. OL8 3QL, Manchester, or M1"
        type="text"
        className={styles.postcodeInput}
        value={value}
        onChange={(event) => {
          updateTextInput(event.target.value);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.name}-${index}`}
              className={styles.suggestionItem}
              onClick={() => onSuggestionSelect(suggestion)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className={styles.suggestionName}>{suggestion.name}</span>
              {suggestion.county && (
                <span className={styles.suggestionCounty}>
                  {suggestion.county}, {suggestion.country}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
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
