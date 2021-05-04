import { bodyToInput } from "./checkout";

it("An input is required", () => {
  // Act and Assert
  expect(() => bodyToInput()).toThrow();
});

it("Billing details are required", () => {
  // Arrange
  const body = {
    billingDetails: null,
  };

  // Act and assert
  expect(() => bodyToInput(body)).toThrow();
});

it("First name for billing is required", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: null,
    },
  };

  // Act and assert
  expect(() => bodyToInput(body)).toThrow();
});

it("First name for billing is required", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: null,
    },
  };

  // Act and assert
  expect(() => bodyToInput(body)).toThrow();
});

it("first address line for billing is required", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: null,
    },
  };

  // Act and assert
  expect(() => bodyToInput(body)).toThrow();
});

it("city for billing is required", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: null,
    },
  };

  // Act and assert
  expect(() => bodyToInput(body)).toThrow();
});

it("postcode for billing is required", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: null,
    },
  };

  // Act and assert
  expect(() => bodyToInput(body)).toThrow();
});

it("phone number for billing is required", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      phoneNo: null,
    },
  };

  // Act and assert
  expect(() => bodyToInput(body)).toThrow();
});

it("email for billing is required", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      phoneNo: "07898565478",
      email: null,
    },
  };

  // Act and assert
  expect(() => bodyToInput(body)).toThrow();
});

it("stripeSourceId for billing is required", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      phoneNo: "07898565478",
      email: "myemail@email.com",
      stripeSourceId: null,
    },
  };

  // Act and assert
  expect(() => bodyToInput(body)).toThrow();
});

it("country is GB for billing is required", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      phoneNo: "07898565478",
      email: "myemail@email.com",
      stripeSourceId: null,
      country: "US",
    },
  };

  // Act and assert
  expect(() => bodyToInput(body)).toThrow();
});

it("parses a body with the minimum number of fields given", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      phoneNo: "07898565478",
      email: "myemail@email.com",
      stripeSourceId: "123456",
      country: "GB",
    },
  };
  const expected = {
    paymentMethod: "stripe",
    shippingMethod: "Flat rate",
    billing: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      email: "myemail@email.com",
      country: "GB",
      phone: "07898565478",
    },
    metaData: [
      {
        key: "_stripe_source_id",
        value: "123456",
      },
    ],
  };

  // Act
  const result = bodyToInput(body);

  // Assert
  expect(result).toStrictEqual(expected);
});

it("Adds a company if one is given", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      phoneNo: "07898565478",
      email: "myemail@email.com",
      stripeSourceId: "123456",
      country: "GB",
      company: "Ace",
    },
  };
  const expected = {
    paymentMethod: "stripe",
    shippingMethod: "Flat rate",
    billing: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      email: "myemail@email.com",
      country: "GB",
      company: "Ace",
      phone: "07898565478",
    },
    metaData: [
      {
        key: "_stripe_source_id",
        value: "123456",
      },
    ],
  };

  // Act
  const result = bodyToInput(body);

  // Assert
  expect(result).toStrictEqual(expected);
});

it("if a password is given then we also output a create account", () => {
  // Arrange
  const body = {
    password: "PASS",
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      phoneNo: "07898565478",
      email: "myemail@email.com",
      stripeSourceId: "123456",
      country: "GB",
      company: "Ace",
    },
  };
  const expected = {
    paymentMethod: "stripe",
    shippingMethod: "Flat rate",
    account: {
      username: "myemail@email.com",
      password: "PASS",
    },
    billing: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      email: "myemail@email.com",
      country: "GB",
      company: "Ace",
      phone: "07898565478",
    },
    metaData: [
      {
        key: "_stripe_source_id",
        value: "123456",
      },
    ],
  };

  // Act
  const result = bodyToInput(body);

  // Assert
  expect(result).toStrictEqual(expected);
});

it("throws an error if you provide some shipping details but not them all", () => {
  // Arrange
  const body = {
    password: "PASS",
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      phoneNo: "07898565478",
      email: "myemail@email.com",
      stripeSourceId: "123456",
      country: "GB",
      company: "Ace",
    },
    shippingDetails: {
      firstName: "Not gavin",
    },
  };

  // Act and assert
  expect(() => bodyToInput(body));
});

it("Adds shipping details if provided", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      phoneNo: "07898565478",
      email: "myemail@email.com",
      stripeSourceId: "123456",
      country: "GB",
      company: "Ace",
    },
    shippingDetails: {
      firstName: "Not gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      country: "GB",
    },
  };
  const expected = {
    paymentMethod: "stripe",
    shippingMethod: "Flat rate",
    billing: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      email: "myemail@email.com",
      country: "GB",
      company: "Ace",
      phone: "07898565478",
    },
    metaData: [
      {
        key: "_stripe_source_id",
        value: "123456",
      },
    ],
    shipToDifferentAddress: true,
    shipping: {
      address1: "1 Real Street",
      city: "dundee",
      country: "GB",
      firstName: "Not gavin",
      lastName: "Henderson",
      postcode: "DD1 5PT",
    },
  };

  // Act
  const result = bodyToInput(body);

  // Assert
  expect(result).toStrictEqual(expected);
});

it("County for shipping and billing is passed if provided", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      phoneNo: "07898565478",
      email: "myemail@email.com",
      stripeSourceId: "123456",
      country: "GB",
      company: "Ace",
      county: "Fife",
    },
    shippingDetails: {
      firstName: "Not gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      country: "GB",
      county: "Fife",
    },
  };
  const expected = {
    paymentMethod: "stripe",
    shippingMethod: "Flat rate",
    billing: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      email: "myemail@email.com",
      country: "GB",
      company: "Ace",
      phone: "07898565478",
      county: "Fife",
    },
    metaData: [
      {
        key: "_stripe_source_id",
        value: "123456",
      },
    ],
    shipToDifferentAddress: true,
    shipping: {
      address1: "1 Real Street",
      city: "dundee",
      country: "GB",
      firstName: "Not gavin",
      lastName: "Henderson",
      postcode: "DD1 5PT",
      county: "Fife",
    },
  };

  // Act
  const result = bodyToInput(body);

  // Assert
  expect(result).toStrictEqual(expected);
});

it("Add note for shipping if provided", () => {
  // Arrange
  const body = {
    billingDetails: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      phoneNo: "07898565478",
      email: "myemail@email.com",
      stripeSourceId: "123456",
      country: "GB",
      company: "Ace",
      county: "Fife",
    },
    shippingDetails: {
      firstName: "Not gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      country: "GB",
      county: "Fife",
      note: "Shipping Note",
    },
  };
  const expected = {
    paymentMethod: "stripe",
    shippingMethod: "Flat rate",
    customerNote: "Shipping Note",
    billing: {
      firstName: "Gavin",
      lastName: "Henderson",
      address1: "1 Real Street",
      city: "dundee",
      postcode: "DD1 5PT",
      email: "myemail@email.com",
      country: "GB",
      company: "Ace",
      phone: "07898565478",
      county: "Fife",
    },
    metaData: [
      {
        key: "_stripe_source_id",
        value: "123456",
      },
    ],
    shipToDifferentAddress: true,
    shipping: {
      address1: "1 Real Street",
      city: "dundee",
      country: "GB",
      firstName: "Not gavin",
      lastName: "Henderson",
      postcode: "DD1 5PT",
      county: "Fife",
    },
  };

  // Act
  const result = bodyToInput(body);

  // Assert
  expect(result).toStrictEqual(expected);
});
