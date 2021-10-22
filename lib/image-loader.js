import config from "./config";

function normalizeSrc(src) {
  return src[0] === "/" ? src.slice(1) : src;
}

const KEY_HOST_MAP = {
  "acecentre.org.uk": "https://root-1a96b.kxcdn.com",
  "backend.acecentre.org.uk": "https://backend-1a96b.kxcdn.com",
};

export const keyLoader = ({ src, width, quality = 75 }) => {
  // Don't do any clever stuff on development
  // if (config.environment === "development") {
  //   return src;
  // }

  let remoteUrl = src;
  const parsedUrl = decodeURIComponent(src).replace("+", "%20");
  if (parsedUrl.startsWith("/")) {
    remoteUrl = `${config.imageUrl}${src}`;
  }

  const urlParts = new URL(remoteUrl);

  const cdnHost = KEY_HOST_MAP[urlParts.host];

  if (!cdnHost) {
    return urlParts.href;
  }

  return `${cdnHost}${urlParts.pathname}?quality=${quality}&width=${width}&format=webp`;
};

export const cropToSquareLoaderKey = ({ src, width, quality = 75 }) => {
  // Don't do any clever stuff on development
  // if (config.environment === "development") {
  //   return src;
  // }

  let remoteUrl = src;
  const parsedUrl = decodeURIComponent(src).replace("+", "%20");
  if (parsedUrl.startsWith("/")) {
    remoteUrl = `${config.imageUrl}${src}`;
  }

  const urlParts = new URL(remoteUrl);

  const cdnHost = KEY_HOST_MAP[urlParts.host];

  if (!cdnHost) {
    return urlParts.href;
  }

  return `${cdnHost}${urlParts.pathname}?quality=${quality}&crop=fp,1,1&width=${width}&height=${width}&format=webp`;
};

export const imageKitLoader = ({ src, width, quality }) => {
  // Don't do any clever stuff on development
  if (config.environment === "development") {
    return src;
  }

  const root = "https://ik.imagekit.io/ocmxsqymluf/";
  let remoteUrl = src;

  const parsedUrl = decodeURIComponent(src).replace("+", "%20");
  if (parsedUrl.startsWith("/")) {
    remoteUrl = `${config.imageUrl}${src}`;
  }

  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ["w-" + width, "q-" + (quality || "auto")];
  let paramsString = "tr:" + params.join(",") + "/";

  const result = `${root}${paramsString}${normalizeSrc(remoteUrl)}`;

  return result;
};

export const cropToSquareLoaderImageKit = ({ src, width, quality }) => {
  // // Don't do any clever stuff on development
  // if (config.environment === "development") {
  //   return src;
  // }

  const root = "https://ik.imagekit.io/ocmxsqymluf/";

  let remoteUrl = src;

  const parsedUrl = decodeURIComponent(src).replace("+", "%20");
  if (parsedUrl.startsWith("/")) {
    remoteUrl = `${config.imageUrl}${src}`;
  }

  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = [
    "c-maintain_ratio",
    "w-" + width,
    "h-" + width,
    "q-" + (quality || "auto"),
  ];
  let paramsString = "tr:" + params.join(",") + "/";

  const result = `${root}${paramsString}${normalizeSrc(remoteUrl)}`;

  return result;
};

export const cloudinaryLoader = ({ src, width, quality }) => {
  // Don't do any clever stuff on development
  if (config.environment === "development") {
    return src;
  }

  const root = "https://res.cloudinary.com/ace-cloud/image/fetch/";
  let remoteUrl = src;

  const parsedUrl = decodeURIComponent(src).replace("+", "%20");
  if (parsedUrl.startsWith("/")) {
    remoteUrl = `${config.imageUrl}${src}`;
  }

  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = [
    "f_auto",
    "c_limit",
    "w_" + width,
    "q_" + (quality || "auto"),
  ];
  let paramsString = params.join(",") + "/";

  const result = `${root}${paramsString}${normalizeSrc(remoteUrl)}`;

  return result;
};

export const cropToSquareLoaderCloudinary = ({ src, width, quality }) => {
  // // Don't do any clever stuff on development
  // if (config.environment === "development") {
  //   return src;
  // }

  const root = "https://res.cloudinary.com/ace-cloud/image/fetch/";
  let remoteUrl = src;

  const parsedUrl = decodeURIComponent(src).replace("+", "%20");
  if (parsedUrl.startsWith("/")) {
    remoteUrl = `${config.imageUrl}${src}`;
  }

  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = [
    "f_auto",
    "c_thumb",
    "ar_1",
    "w_" + width,
    "q_" + (quality || "auto"),
  ];
  let paramsString = params.join(",") + "/";

  const result = `${root}${paramsString}${normalizeSrc(remoteUrl)}`;

  return result;
};
