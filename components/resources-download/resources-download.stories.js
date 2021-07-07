import { ResourcesDownload } from "./resources-download";

export default {
  title: "/Resources/ResourcesDownload",
  component: ResourcesDownload,
};

const Template = (args) => <ResourcesDownload {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
