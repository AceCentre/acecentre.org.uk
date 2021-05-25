import { ResourceCategoriesGrid } from "./resource-categories-grid";

export default {
  title: "Resources/CategoriesGrid",
  component: ResourceCategoriesGrid,
};

const Template = (args) => <ResourceCategoriesGrid {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
