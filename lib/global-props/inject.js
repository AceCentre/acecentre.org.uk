// Bear in mind this might run for a static page or a dynamic page
// however it will only ever run on the server side
export const withGlobalProps = (handler) => async (...args) => {
  const globalProps = getGlobalProps();

  if (handler) {
    const result = await handler(...args);

    return {
      ...result,
      props: {
        ...result.props,
        globalProps,
      },
    };
  }

  return {
    props: { globalProps },
  };
};

const getGlobalProps = () => {
  return {};
};
