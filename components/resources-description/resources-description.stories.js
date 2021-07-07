import { ResourcesDescription } from "./resources-description";

export default {
  title: "/Resources/ResourcesDescription",
  component: ResourcesDescription,
};

const Template = (args) => <ResourcesDescription {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
