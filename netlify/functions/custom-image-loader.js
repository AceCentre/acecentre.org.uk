const path = require("path");
const { builder } = require("@netlify/functions");
const sharp = require("sharp");
const fetch = require("node-fetch");

// Function used to mimic next/image and sharp
const handler = async (event) => {
  console.log("");
  console.log("=====================================");

  const [, , url, w = 500, q = 75] = event.path.split("/");
  const parsedUrl = decodeURIComponent(url);
  const width = parseInt(w);
  const quality = parseInt(q);

  const imageUrl = parsedUrl.startsWith("/")
    ? `${process.env.DEPLOY_URL || `http://${event.headers.host}`}${parsedUrl}`
    : parsedUrl;
  console.log(
    JSON.stringify(
      {
        url,
        w,
        q,
        parsedUrl,
        width,
        quality,
        imageUrl,
        deployUrl: process.env.DEPLOY_URL,
        host: event.headers.host,
      },
      null,
      2
    )
  );
  const imageData = await fetch(imageUrl);
  console.log("imageFetched");
  const bufferData = await imageData.buffer();
  console.log("Buffered data");
  const ext = path.extname(imageUrl);
  const mimeType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;

  console.log(JSON.stringify({ ext, mimeType }, null, 2));

  let image;
  let imageBuffer;

  if (mimeType === "image/gif") {
    image = await sharp(bufferData, { animated: true });
    // gif resizing in sharp seems unstable (https://github.com/lovell/sharp/issues/2275)
    imageBuffer = await image.toBuffer();
  } else {
    image = await sharp(bufferData);
    if (mimeType === "image/webp") {
      image = image.webp({ quality });
    } else if (mimeType === "image/jpeg") {
      image = image.jpeg({ quality });
    } else if (mimeType === "image/png") {
      image = image.png({ quality });
    } else if (mimeType === "image/avif") {
      image = image.avif({ quality });
    } else if (mimeType === "image/tiff") {
      image = image.tiff({ quality });
    } else if (mimeType === "image/heif") {
      image = image.heif({ quality });
    }
    imageBuffer = await image.resize(width).toBuffer();
    console.log("resized");
  }
  console.log("=====================================");
  console.log("");
  return {
    statusCode: 200,
    headers: {
      "Content-Type": mimeType,
    },
    body: imageBuffer.toString("base64"),
    isBase64Encoded: true,
  };
};

exports.handler = builder(handler);
