import { useEffect } from "react";
import { useRouter } from "next/router";

export default function GuidesIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/activity-book/select");
  }, [router]);

  return null;
}
