import { ResourceFullDescription } from "./resource-full-description";

export default {
  title: "/Resources/FullDescription",
  component: ResourceFullDescription,
};

const Template = (args) => <ResourceFullDescription {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
