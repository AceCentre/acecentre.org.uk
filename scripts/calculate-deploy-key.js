const script = (context) => {
  const title = context.payload.pull_request.title;

  return title
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/ /g, "-")
    .replace(/\./g, "-")
    .replace(/@/g, "")
    .slice(0, 35);
};

module.exports = script;
