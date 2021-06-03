import { useRouter as useNextRouter } from "next/router";

export const useRouter = () => {
  if (process.env.STORYBOOK) {
    return { query: {}, push: () => {} };
  }

  return useNextRouter();
};
