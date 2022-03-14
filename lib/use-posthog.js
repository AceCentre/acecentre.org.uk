import { useEffect, useState } from "react";
import config from "./config";

export const usePosthog = () => {
  const [posthogLoaded, setPosthogLoaded] = useState(false);
  const [posthog, setPosthog] = useState(null);

  useEffect(() => {
    const loadPosthog = async () => {
      const currentPosthog = (await import("posthog-js")).default;

      setPosthog(currentPosthog);

      currentPosthog.init(config.posthogKey, {
        api_host: "https://app.posthog.com",
        persistence: "memory",
        autocapture: false,
        disable_cookie: true,
        capture_pageview: false,
        disable_session_recording: true,
        loaded: () => {
          setPosthogLoaded(true);
        },
      });
    };

    loadPosthog();
  }, []);

  return {
    posthog,
    posthogLoaded,
  };
};
