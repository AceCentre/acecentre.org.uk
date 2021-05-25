import { ResourceCategoriesHighlight } from "./resource-categories-highlight";

export default {
  title: "Resources/CategoriesHighlight",
  component: ResourceCategoriesHighlight,
};

const Template = (args) => <ResourceCategoriesHighlight {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
