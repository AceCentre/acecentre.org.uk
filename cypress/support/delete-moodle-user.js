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

export const deleteCohorts = async () => {
  const client = await moodleClient.init({
    wwwroot: "https://learning.acecentre.org.uk",
    token: "b0694f465f97c730298884eb715d2f7e",
    service: "automated",
    strictSSL: false,
  });

  const cohortResults = await client.call({
    wsfunction: "core_cohort_get_cohorts",
    method: "POST",
  });

  const isTestName = (name) => {
    return RegExp("test-.*@acecentre.org.uk", "g").test(name);
  };

  const testingCohorts = cohortResults.filter((x) => isTestName(x.name));

  const cohortids = testingCohorts.map((x) => x.id);

  const fullCohorts = await client.call({
    wsfunction: "core_cohort_get_cohort_members",
    method: "POST",
    args: {
      cohortids,
    },
  });

  const emptyCohorts = fullCohorts.filter((x) => x.userids.length === 0);

  console.log("Number of cohorts to delete: ", emptyCohorts.length);

  if (emptyCohorts.length > 0) {
    const cohortsToDelete = emptyCohorts.map((x) => x.cohortid);

    cohortsToDelete.forEach((x) => {
      const temp = testingCohorts.find((z) => z.id == x);

      console.log("Deleting", temp.name);
    });

    // console.log(cohortsToDelete);
    const deletionResult = await client.call({
      wsfunction: "core_cohort_delete_cohorts",
      method: "POST",
      args: {
        cohortids: cohortsToDelete,
      },
    });

    console.log(deletionResult);
  }
};
