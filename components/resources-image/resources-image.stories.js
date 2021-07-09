import { ResourcesImage } from "./resources-image";

export default {
  title: "/Resources/ResourcesImage",
  component: ResourcesImage,
};

const Template = (args) => <ResourcesImage {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
