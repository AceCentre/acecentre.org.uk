import { useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NewsletterModal } from "../components/footer/footer";

const getQueryValue = (value) => {
  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
};

const getSafeReturnTo = (value) => {
  const candidate = getQueryValue(value);

  // Only allow internal paths.
  if (candidate.startsWith("/")) {
    return candidate;
  }

  return "/";
};

const parseTags = (value) => {
  const raw = getQueryValue(value);

  if (!raw || raw === "1") {
    return [];
  }

  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((name) => ({ name }));
};

const deriveTagsFromReturnTo = (returnTo) => {
  if (!returnTo || returnTo === "/") {
    return [{ name: "homepage" }];
  }

  if (returnTo === "/learning" || returnTo.startsWith("/learning/")) {
    return [{ name: "learning" }];
  }

  if (returnTo === "/resources") {
    return [{ name: "resources" }];
  }

  if (returnTo.startsWith("/resources/")) {
    const parts = returnTo.split("/").filter(Boolean);
    const slug = parts[1];
    if (slug) {
      return [{ name: slug }];
    }
  }

  return [];
};

const allowedSignUpLocations = new Set([
  "footer",
  "home",
  "none",
  "resource-download",
  "service-finder",
  "activity-book",
  "at-scholar",
  "aacinfo",
  "launchpad",
  "speechbubble",
  "look2talk",
  "communication-works",
]);

const getSafeSignUpIdentifier = (value) => {
  const source = getQueryValue(value);

  if (allowedSignUpLocations.has(source)) {
    return source;
  }

  // HubSpot CTA source names are useful for URLs, but can fail HubSpot
  // contact updates when written into constrained location properties.
  return "footer";
};

export default function NewsletterPage() {
  const router = useRouter();
  const thankYouShown = getQueryValue(router.query.thankyou) === "1";

  const signUpIdentifier = useMemo(() => {
    return getSafeSignUpIdentifier(router.query.source);
  }, [router.query.source]);

  const returnTo = useMemo(
    () => getSafeReturnTo(router.query.returnTo),
    [router.query.returnTo],
  );
  const tags = useMemo(() => {
    const explicitTags = parseTags(router.query.tag);
    if (explicitTags.length > 0) {
      return explicitTags;
    }

    return deriveTagsFromReturnTo(returnTo);
  }, [router.query.tag, returnTo]);

  const onClose = useCallback(() => {
    router.push(returnTo);
  }, [returnTo, router]);

  const onSuccess = useCallback(() => {
    router.push({
      pathname: "/newsletter",
      query: {
        ...router.query,
        thankyou: "1",
      },
    });
  }, [router]);

  useEffect(() => {
    if (!thankYouShown) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      router.push(returnTo);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [thankYouShown, returnTo, router]);

  return (
    <>
      {!thankYouShown && (
        <NewsletterModal
          modelOpen
          onClose={onClose}
          signUpIdentifier={signUpIdentifier}
          tags={tags}
          onSuccess={onSuccess}
        />
      )}
      <main style={{ padding: "2rem", textAlign: "center" }}>
        {thankYouShown ? (
          <p>
            Thanks for subscribing to the Ace Centre newsletter. Redirecting in
            3 seconds...
          </p>
        ) : (
          <p>If the signup modal does not open, please refresh this page.</p>
        )}
        <p>
          <Link href={returnTo}>Return to previous page</Link>
        </p>
      </main>
    </>
  );
}
