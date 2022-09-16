module.exports = {
  ignorePatterns: ["**/public/**/*.js"],
  env: {
    browser: true,
    es2021: true,
    node: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "jest", "cypress"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double", { avoidEscape: true }],
    semi: ["error", "always"],
    "react/react-in-jsx-scope": "off", // Next means we don't need this
    "react/prop-types": "off", // We don't use prop types
    "react/display-name": "off", // This fails even when we have a name, it also doesn't really matter
    "@next/next/no-img-element": "off",
    "react/no-unknown-property": [
      2,
      {
        ignore: ["jsx"],
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
