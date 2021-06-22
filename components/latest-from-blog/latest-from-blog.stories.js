import { LatestFromBlog } from "./latest-from-blog";

export default {
  title: "Home/LatestFromBlog",
  component: LatestFromBlog,
};

const Template = (args) => <LatestFromBlog {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
