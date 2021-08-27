const fs = require("fs");
const path = require("path");
const parser = require("fast-xml-parser");

const script = () => {
  const sitemapPath = path.join(__dirname, "../out/sitemap.xml");
  const sitemapAsString = fs.readFileSync(sitemapPath, "utf8").toString();
  const sitemapObject = parser.parse(sitemapAsString);

  const siteUrl = "https://acecentre.org.uk";
  const urls = sitemapObject.urlset.url.map((url) => {
    return url.loc.replace(siteUrl, "");
  });

  return urls;
};

module.exports = script;
