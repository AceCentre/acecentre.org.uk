module.exports = function (plop) {
  // create your generators here
  plop.setGenerator("Component", {
    description:
      "Generate a new component along with the CSS and storybook Story",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "The name of the files eg (my-component). This will also be used to name the component",
      },
    ],
    actions: [
      {
        type: "add",
        path: "components/{{name}}/{{name}}.module.css",
        templateFile: "plop-templates/component/module.css",
      },
      {
        type: "add",
        path: "components/{{name}}/{{name}}.js",
        templateFile: "plop-templates/component/component.js.hbs",
      },
    ],
  });

  plop.setHelper("componentName", (txt) => makeCamelCase(txt));
};

// this-is-an-example => ThisIsAnExample
function makeCamelCase(str) {
  const arr = str.split("-");
  const capital = arr.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  );
  // ^-- change here.
  const capitalString = capital.join("");

  return capitalString;
}
