export const changePassword = async (email, password) => {
  const getUserResponse = await fetch(
    "https://backend.acecentre.org.uk/index.php?graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
      body: JSON.stringify({
        query: "query($email:ID!) {user(id: $email,idType:EMAIL) {id}}",
        variables: { email },
      }),
    }
  );

  if (!getUserResponse.ok) {
    throw new Error("Failed to get user");
  }

  const getUserResult = await getUserResponse.json();

  if (
    !getUserResult ||
    !getUserResult.data ||
    !getUserResult.data.user ||
    !getUserResult.data.user.id
  ) {
    throw new Error("Failed to get user");
  }

  const id = getUserResult.data.user.id;

  const getChangePasswordResponse = await fetch(
    "https://backend.acecentre.org.uk/index.php?graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
      body: JSON.stringify({
        query:
          "mutation changePassword($id: ID!, $password: String) { updateUser(input: {id: $id, password: $password}) { user { id } } }",
        variables: { id, password },
      }),
    }
  );

  if (!getChangePasswordResponse.ok) {
    throw new Error("Failed to change password");
  }

  const changePasswordResult = await getChangePasswordResponse.json();

  if (
    !changePasswordResult ||
    !changePasswordResult.data ||
    !changePasswordResult.data.updateUser ||
    !changePasswordResult.data.updateUser.user ||
    !changePasswordResult.data.updateUser.user.id
  ) {
    throw new Error("Failed to change password");
  }

  return null;
};
