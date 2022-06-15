export const validEmail = (testName = "unnamed") => {
  const randomNumber = Math.floor(Math.random() * 1000000);

  return `test-${randomNumber}-${testName}@acecentre.org.uk`;
};
