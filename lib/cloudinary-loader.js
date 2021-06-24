import config from "./config";

const root = "https://res.cloudinary.com/ace-cloud/image/fetch/";

function normalizeSrc(src) {
  return src[0] === "/" ? src.slice(1) : src;
}

export const cloudinaryLoader = ({ src, width, quality }) => {
  console.log(config);

  // Don't do any clever stuff on development
  if (config.environment === "development") {
    return src;
  }

  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = [
    "f_auto",
    "c_limit",
    "w_" + width,
    "q_" + (quality || "auto"),
  ];
  let paramsString = params.join(",") + "/";

  console.log(src);

  return `${root}${paramsString}${normalizeSrc(src)}`;
};
