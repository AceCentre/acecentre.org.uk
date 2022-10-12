const axios = require("axios");
const exportEnv = require("../../envs");

exportEnv();

exports.handler = async (event, context) => {
  let returnHeaders = {
    "Content-Type": "application/json",
  };

  console.log(process.env);

  const speechKey = process.env.SPEECH_KEY;
  const speechRegion = process.env.SPEECH_REGION;

  if (!speechKey || !speechRegion) {
    return {
      statusCode: 400,
      body: "You forgot to add your speech key or region to the .env file.",
      headers: returnHeaders,
    };
  } else {
    const headers = {
      headers: {
        "Ocp-Apim-Subscription-Key": speechKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const tokenResponse = await axios.post(
        `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
        null,
        headers
      );
      return {
        statusCode: 200,
        body: JSON.stringify({
          token: tokenResponse.data,
          region: speechRegion,
        }),
        headers: returnHeaders,
      };
    } catch (err) {
      console.log(err, speechKey, speechRegion);

      return {
        statusCode: 401,
        body: "There was an error authorizing your speech key.",
        headers: returnHeaders,
      };
    }
  }
};
