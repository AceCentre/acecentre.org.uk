const { builder } = require("@netlify/functions");
const sharp = require("sharp");
const fetch = require("node-fetch");
const imageType = require("image-type");
const isSvg = require("is-svg");
const etag = require("etag");

// 6MB is hard max Lambda response size
const MAX_RESPONSE_SIZE = 6291456;

function getImageType(buffer) {
  const type = imageType(buffer);
  if (type) {
    return type;
  }
  if (isSvg(buffer)) {
    return { ext: "svg", mime: "image/svg" };
  }
  return null;
}

const IGNORED_FORMATS = new Set(["svg", "gif"]);
const OUTPUT_FORMATS = new Set(["png", "jpg", "webp", "avif"]);

const MAX_WIDTH = 760;

// Function used to mimic next/image
const handler = async (event) => {
  console.log("");
  console.log("=====================================");

  const [, , url, w = 500, q = 75] = event.path.split("/");
  // Work-around a bug in redirect handling. Remove when fixed.
  const parsedUrl = decodeURIComponent(url).replace("+", "%20");
  const width = Math.min(parseInt(w), MAX_WIDTH);

  if (!width) {
    return {
      statusCode: 400,
      body: "Invalid image parameters",
    };
  }

  const quality = parseInt(q) || 60;

  console.log(
    JSON.stringify(
      { url, w, q, parsedUrl, quality, host: event.headers.host },
      null,
      2
    )
  );

  let imageUrl;
  // Relative image
  if (parsedUrl.startsWith("/")) {
    imageUrl = `${
      process.env.DEPLOY_URL || `http://${event.headers.host}`
    }${parsedUrl}`;
  } else {
    let allowedDomains = [];

    if (process.env.NEXT_IMAGE_ALLOWED_DOMAINS) {
      allowedDomains = process.env.NEXT_IMAGE_ALLOWED_DOMAINS.split(
        ","
      ).map((domain) => domain.trim());
    }

    if (!allowedDomains.includes(new URL(parsedUrl).hostname)) {
      return {
        statusCode: 403,
        body: "Image is not from a permitted domain",
      };
    }
    imageUrl = parsedUrl;
  }

  console.log(imageUrl);

  const imageData = await fetch(imageUrl);

  console.log("Fetched");

  if (!imageData.ok) {
    console.error(
      `Failed to download image ${imageUrl}. Status ${imageData.status} ${imageData.statusText}`
    );
    return {
      statusCode: imageData.status,
      body: imageData.statusText,
    };
  }

  const bufferData = await imageData.buffer();

  console.log("buffered");

  const type = getImageType(bufferData);

  if (!type) {
    return { statusCode: 400, body: "Source does not appear to be an image" };
  }

  let { ext } = type;

  // For unsupported formats (gif, svg) we redirect to the original
  if (IGNORED_FORMATS.has(ext)) {
    return {
      statusCode: 302,
      headers: {
        Location: imageUrl,
      },
    };
  }

  if (
    process.env.FORCE_WEBP_OUTPUT === "true" ||
    process.env.FORCE_WEBP_OUTPUT === "1"
  ) {
    ext = "webp";
  }

  if (!OUTPUT_FORMATS.has(ext)) {
    ext = "jpg";
  }

  console.log("Ext = ", ext);

  // The format methods are just to set options: they don't
  // make it return that format.
  const { info, data: imageBuffer } = await sharp(bufferData)
    .rotate()
    .jpeg({ quality, mozjpeg: true, force: ext === "jpg" })
    .png({ quality, palette: true, force: ext === "png" })
    .webp({ quality, force: ext === "webp" })
    .avif({ quality, force: ext === "avif" })
    .resize(width)
    .toBuffer({ resolveWithObject: true });

  console.log("sharped", info);

  if (imageBuffer.length > MAX_RESPONSE_SIZE) {
    return {
      statusCode: 400,
      body: "Requested image is too large. Maximum size is 6MB.",
    };
  }

  console.log("=====================================");
  console.log("");

  return {
    statusCode: 200,
    headers: {
      "Content-Type": `image/${info.format}`,
      etag: etag(imageBuffer),
    },
    body: imageBuffer.toString("base64"),
    isBase64Encoded: true,
  };
};

exports.handler = builder(handler);
