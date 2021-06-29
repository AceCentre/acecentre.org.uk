import { BlogMeta } from "./blog-meta";

export default {
  title: "/Blog/PostMeta",
  component: BlogMeta,
};

const Template = (args) => <BlogMeta {...args} />;

export const Standard = Template.bind({});
Standard.args = { date: "20/12/2019" };
