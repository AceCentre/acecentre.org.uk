const got = require("got");

const script = async () => {
  const cloudOne = await got(
    `https://${process.env.CLOUDINARY_ONE_KEY}:${process.env.CLOUDINARY_ONE_SECRET}@api.cloudinary.com/v1_1/ace-cloud/usage`
  );
  const cloudTwo = await got(
    `https://${process.env.CLOUDINARY_TWO_KEY}:${process.env.CLOUDINARY_TWO_SECRET}@api.cloudinary.com/v1_1/ace-cloud-2/usage`
  );

  const cloudOneResult = JSON.parse(cloudOne.body);
  const cloudTwoResult = JSON.parse(cloudTwo.body);

  const cloudOneUsage = cloudOneResult.credits.used_percent;
  const cloudTwoUsage = cloudTwoResult.credits.used_percent;

  console.log({ cloudOneUsage, cloudTwoUsage });

  if (cloudOneUsage < cloudTwoUsage) {
    return "ace-cloud";
  } else {
    return "ace-cloud-2";
  }
};

module.exports = script;
