// Bear in mind this might run for a static page or a dynamic page
// however it will only ever run on the server side
export const withGlobalProps = (handler) => async (...args) => {
  const globalProps = getGlobalProps();

  if (handler) {
    const result = (await handler(...args)) || {};
    const resultProps = result.props || {};

    return {
      ...result,
      props: {
        ...resultProps,
        globalProps,
      },
    };
  }

  return {
    props: { globalProps },
  };
};

// This will add data to every page, so be wary of doing time
// consuming tasks
export const getGlobalProps = () => {
  return {
    currentYear: new Date().getFullYear(),
  };
};
