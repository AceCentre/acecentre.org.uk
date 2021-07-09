import { ResourcesShare } from "./resources-share";

export default {
  title: "/Resources/ResourcesShare",
  component: ResourcesShare,
};

const Template = (args) => <ResourcesShare {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
