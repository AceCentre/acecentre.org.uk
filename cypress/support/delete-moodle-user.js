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

  if (!getUsersResult || getUsersResult.length !== 1) {
    console.log(
      `We found no users or more than one users with the given email: ${email}`
    );
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
