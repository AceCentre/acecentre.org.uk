import config from "./config";

function normalizeSrc(src) {
  return src[0] === "/" ? src.slice(1) : src;
}

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
    "g_faces",
    "ar_1",
    "w_" + width,
    "q_" + (quality || "auto"),
  ];
  let paramsString = params.join(",") + "/";

  const result = `${root}${paramsString}${normalizeSrc(remoteUrl)}`;

  return result;
};
