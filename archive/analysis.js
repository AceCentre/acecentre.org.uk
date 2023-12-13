const fs = require("fs");
const path = require("path");

const oldResponse = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./11.2.json"))
);
const newResponse = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./12.0.json"))
);

console.log(
  "Categories Count Old: ",
  oldResponse.data.productCategories.nodes.length
); // 48

console.log(
  "Categories Count New: ",
  newResponse.data.productCategories.nodes.length
); // 48

for (let i = 0; i < newResponse.data.productCategories.nodes.length; i++) {
  let currentOld = oldResponse.data.productCategories.nodes[i];
  let currentNew = newResponse.data.productCategories.nodes[i];

  console.log("Old Slug", currentOld.slug, currentOld.products.nodes.length);
  console.log("New Slug", currentNew.slug, currentNew.products.nodes.length);

  const productsOfChildren = currentNew.children.nodes.flatMap(
    (x) => x.products.nodes
  );
  console.log("ProductsOfChildrenNew", productsOfChildren.length);

  const allNewProducts = [...productsOfChildren, ...currentNew.products.nodes];

  const uniqueProdcuts = [
    ...new Map(allNewProducts.map((item) => [item["slug"], item])).values(),
  ];

  console.log(
    "Old",
    currentOld.products.nodes.length,
    "===",
    "New",
    uniqueProdcuts.length
  );

  if (currentOld.products.nodes.length != uniqueProdcuts.length) {
    console.log("PROBLEM HERE");
  }

  console.log("");
}
