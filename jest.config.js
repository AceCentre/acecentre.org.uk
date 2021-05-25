module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "\\.(css|less|scss|sass)$": "jest-css-modules-transform",
  },
  modulePathIgnorePatterns: [
    "<rootDir>/cypress",
    "<rootDir>/.next",
    "<rootDir>/.static-cache",
  ],
  setupFiles: ["<rootDir>/jest-setup.js"],
  collectCoverage: true,
  collectCoverageFrom: ["lib/**/*.{js,jsx}"],
};
