// Bear in mind this might run for a static page or a dynamic page
// however it will only ever run on the server side
export const withGlobalProps = (handler) => async (...args) => {
  const result = await handler(...args);
  const globalProps = getGlobalProps();

  return {
    ...result,
    props: {
      ...result.props,
      globalProps,
    },
  };
};

const getGlobalProps = () => {
  return {};
};
