export const deleteUser = async (email, subdomain = "internal") => {
  const getUserResponse = await fetch(
    `https://${subdomain}.acecentre.org.uk/index.php?graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
      body: JSON.stringify({
        query:
          "query($email:ID!) {user(id: $email,idType:EMAIL) {id, databaseId}}",
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
    !getUserResult.data.user.id ||
    !getUserResult.data.user.databaseId
  ) {
    throw new Error("You tried to delete a user that doesnt exist");
  }

  const userId = getUserResult.data.user.id;
  const userDatabaseId = getUserResult.data.user.databaseId;

  const ordersResponse = await fetch(
    `https://${subdomain}.acecentre.org.uk/index.php?graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
      body: JSON.stringify({
        query:
          "query($userId:Int!) {  orders(where: { customerId: $userId }) { nodes { id }}}",
        variables: { userId: userDatabaseId },
      }),
    }
  );

  if (!ordersResponse.ok) {
    throw new Error("Failed to get orders");
  }

  const ordersResult = await ordersResponse.json();

  if (
    !ordersResult ||
    !ordersResult.data ||
    !ordersResult.data.orders ||
    !ordersResult.data.orders.nodes
  ) {
    throw new Error("Failed to get orders");
  }

  for (const order of ordersResult.data.orders.nodes) {
    // mutation ($orderId: ID!) { deleteOrder(input: {id: $orderId}) { order { id } } }
    const deleteOrderResponse = await fetch(
      `https://${subdomain}.acecentre.org.uk/index.php?graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
        },
        body: JSON.stringify({
          query:
            "mutation ($orderId: ID!) { deleteOrder(input: {id: $orderId}) { order { id } } }",
          variables: { orderId: order.id },
        }),
      }
    );

    if (!deleteOrderResponse.ok) {
      throw new Error("Failed to delete orders");
    }

    const deleteOrderResult = await deleteOrderResponse.json();

    if (
      !deleteOrderResult ||
      !deleteOrderResult.data ||
      !deleteOrderResult.data.deleteOrder ||
      !deleteOrderResult.data.deleteOrder.order ||
      !deleteOrderResult.data.deleteOrder.order.id
    ) {
      throw new Error("Failed to delete orders");
    }
  }

  const deleteUserResponse = await fetch(
    `https://${subdomain}.acecentre.org.uk/index.php?graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
      body: JSON.stringify({
        query:
          "mutation($userId:ID!) {deleteUser(input: {id: $userId}) {user {id}}}",
        variables: { userId },
      }),
    }
  );

  if (!deleteUserResponse.ok) {
    throw new Error("Failed to delete user");
  }

  const deleteUserResult = await deleteUserResponse.json();

  if (
    !deleteUserResult ||
    !deleteUserResult.data ||
    !deleteUserResult.data.deleteUser ||
    !deleteUserResult.data.deleteUser.user ||
    !deleteUserResult.data.deleteUser.user.id
  ) {
    throw new Error("Couldnt delete user");
  }
};
