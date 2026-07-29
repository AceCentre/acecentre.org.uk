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

export default function NewsletterPage() {
  const router = useRouter();
  const thankYouShown = getQueryValue(router.query.thankyou) === "1";

  const signUpIdentifier = useMemo(() => {
    const source = getQueryValue(router.query.source);
    return source || "hubspot-popup";
  }, [router.query.source]);

  const tags = useMemo(() => parseTags(router.query.tag), [router.query.tag]);
  const returnTo = useMemo(
    () => getSafeReturnTo(router.query.returnTo),
    [router.query.returnTo],
  );

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
