const { XMLParser } = require("fast-xml-parser");
const axios = require("axios").default;

const IGNORE = [
  "my-acecentre",
  "switch-scanning-frequency-analysis",
  "make-your-own-flip-joke-book",
  "moodle-login",
  "nhs-service-finder/maps",
  "pasco-support",
  "launchpad",
  "checkout",
];

function chunk(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
}

const script = async (context, max, page) => {
  const sitemapUrl = "https://acecentre.org.uk/sitemap-0.xml";
  const sitemapAsString = (await axios.get(sitemapUrl)).data;

  const parser = new XMLParser();
  const sitemapObject = parser.parse(sitemapAsString);

  const siteUrl = "https://acecentre.org.uk";
  const urls = sitemapObject.urlset.url
    .map((url) => {
      return url.loc.replace(siteUrl, "");
    })
    .filter((url) => {
      for (const current of IGNORE) {
        // console.log(current, url, current.includes);
        if (url.includes(current)) {
          return false;
        }
      }
      return true;
    });

  const chunks = chunk(urls, max);
  console.log(urls.length, " total number of urls found");
  console.log("Split into", chunks.length, "chunks");

  return chunks[page];
};

module.exports = script;
