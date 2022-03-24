import { GlobalStyles } from "./global-styles";
import { ChakraProvider } from "@chakra-ui/provider";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <ChakraProvider resetCSS={false}>
        <GlobalStyles />
        <Story />
      </ChakraProvider>
    </>
  ),
];
