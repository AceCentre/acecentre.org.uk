import { ResourcesSearch } from "./resources-search";

export default {
  title: "Resources/ResourcesSearch",
  component: ResourcesSearch,
};

const Template = (args) => <ResourcesSearch {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
