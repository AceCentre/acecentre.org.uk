import { ResourceList } from "./resource-list";

export default {
  title: "/Resources/ResourceList",
  component: ResourceList,
};

const Template = (args) => <ResourceList {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
