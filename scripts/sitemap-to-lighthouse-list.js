const fs = require("fs");
const path = require("path");
const parser = require("fast-xml-parser");

const IGNORE = [
  "my-acecentre",
  "switch-scanning-frequency-analysis",
  "make-your-own-flip-joke-book",
  "moodle-login",
];

const script = () => {
  const sitemapPath = path.join(__dirname, "../out/sitemap.xml");
  const sitemapAsString = fs.readFileSync(sitemapPath, "utf8").toString();
  const sitemapObject = parser.parse(sitemapAsString);

  const siteUrl = "https://backend.acecentre.org.uk";
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

  return urls;
};

module.exports = script;
