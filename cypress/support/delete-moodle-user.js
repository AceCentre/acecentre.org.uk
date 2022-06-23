const moodleClient = require("./moodle-client");

export const deleteMoodleUser = async (email) => {
  const client = await moodleClient.init({
    wwwroot: "https://learning.acecentre.org.uk",
    token: Cypress.env("MOODLE_AUTH"),
    service: "automated",
    strictSSL: false,
  });

  const getUsersResult = await client.call({
    wsfunction: "core_user_get_users_by_field",
    args: {
      field: "email",
      values: [email],
    },
  });

  if (!getUsersResult) {
    throw new Error("Failed to get user");
  }

  if (getUsersResult.length !== 1) {
    throw new Error("Failed to get any user");
  }

  const userToDelete = getUsersResult[0];

  const deletedUserResult = await client.call({
    wsfunction: "core_user_delete_users",
    args: {
      userids: [userToDelete.id],
    },
  });

  if (deletedUserResult != null) {
    throw new Error("Failed to delete user");
  }

  console.log(deletedUserResult);
};
