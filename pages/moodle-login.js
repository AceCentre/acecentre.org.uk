// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { gql, GraphQLClient } from "graphql-request";
import withSession from "../lib/auth/with-session";
import config from "../lib/config";

export const LOGIN_VIA_MOODLE_MUTATION = gql`
  mutation ($wdmaction: String!, $verify_code: String!, $mdl_uid: String!) {
    loginViaMoodle(
      input: {
        wdmaction: $wdmaction
        verify_code: $verify_code
        mdl_uid: $mdl_uid
      }
    ) {
      authToken
      refreshToken
      user {
        id
        username
        wooSessionToken
      }
      customer {
        id
      }
    }
  }
`;

const ENDPOINT = `${config.baseUrl}/graphql`;

export default function LoginPage() {
  return <p>This should never be rendered</p>;
}

export const getServerSideProps = withSession(async function (req) {
  try {
    // Return 404 if you end up on this endpoint without
    // all the params
    const { verify_code, mdl_uid, wdmaction } = req.query;
    if (!wdmaction || !mdl_uid || !verify_code) {
      return { notFound: true };
    }

    // If we are being asked to logout destroy the session
    // then go back to learning
    if (wdmaction === "logout") {
      req.session.destroy();

      return {
        redirect: {
          destination: "https://learning.acecentre.org.uk",
          permanent: false,
        },
      };
    }

    // If we are being asked to login
    if (wdmaction === "login") {
      // First destroy the existing session
      req.session.destroy();

      // Add forwarded for headers
      let headers = {};

      if (req && req.socket && req.socket.remoteAddress) {
        headers["X-Forwarded-For"] = req.socket.remoteAddress;
      }

      if (req && req.headers && req.headers["client-ip"]) {
        headers["X-Forwarded-For"] = req.headers["client-ip"];
      }

      // Create graphql client with headers
      const client = new GraphQLClient(ENDPOINT, {
        headers,
      });

      // Request tokens
      const { data: queryResponse } = await client.rawRequest(
        LOGIN_VIA_MOODLE_MUTATION,
        {
          verify_code,
          mdl_uid,
          wdmaction,
        }
      );

      // Save result to session
      const user = {
        authToken: queryResponse.loginViaMoodle.authToken,
        refreshToken: queryResponse.loginViaMoodle.refreshToken,
        userId: queryResponse.loginViaMoodle.user.id,
        username: queryResponse.loginViaMoodle.user.username,
        customerId: queryResponse.loginViaMoodle.customer.id,
        wooSessionToken: queryResponse.loginViaMoodle.user.wooSessionToken,
      };

      req.session.set("user", user);
      req.session.set("cart", {
        wooSessionToken: queryResponse.loginViaMoodle.user.wooSessionToken,
      });

      await req.session.save();

      // Redirect to learning
      return {
        redirect: {
          destination: "https://learning.acecentre.org.uk",
          permanent: false,
        },
      };
    }

    // If we are asked to do something other than 'login' or 'logout' then we go to a 404 page

    return {
      notFound: true,
    };
  } catch (error) {
    // If anything errors we want to continue to moodle but log the error
    console.warn(error);
    return {
      redirect: {
        destination: "https://learning.acecentre.org.uk",
        permanent: false,
      },
    };
  }
});
