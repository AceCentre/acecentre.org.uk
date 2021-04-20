import getAllStaff from "./get-all-staff";
import nock from "nock";

it("returns an empty list when there are no staff", async () => {
  // Arrange
  const mockResponse = {
    data: {
      staff: {
        nodes: [],
      },
    },
  };
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllStaff();

  // Assert
  expect(result).toStrictEqual([]);
});

it("returns a single staff member without a location or type", async () => {
  // Arrange
  const expected = [
    {
      name: "Gavin Henderson",
    },
  ];
  const mockResponse = {
    data: {
      staff: {
        nodes: [
          {
            title: "Gavin Henderson",
            slug: "gavin-henderson",
            id: "cG9zdDoyNjY3OQ==",
            status: "publish",
            content: "I am a software engineer. I work remote",
          },
        ],
      },
    },
  };
  nock("https://acecentre.org.uk").post("/graphql").reply(200, mockResponse);

  // Act
  const result = await getAllStaff();

  // Assert
  expect(result).toStrictEqual(expected);
});
