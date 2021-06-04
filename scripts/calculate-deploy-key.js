const script = (context) => {
  const title = context.payload.pull_request.title;

  const replaced = title
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/ /g, "-")
    .replace(/\./g, "-")
    .replace(/@/g, "")
    .slice(0, 35);

  return trim(replaced, "-");
};

const trim = (str, delimiter) => {
  const pattern = `[^\\${delimiter}]`;
  const start = str.search(pattern);
  const stop = str.length - str.split("").reverse().join("").search(pattern);
  return str.substring(start, stop);
};

module.exports = script;
