import { BlogSearch } from "./blog-search";

export default {
  title: "Blog/BlogSearch",
  component: BlogSearch,
};

const Template = (args) => <BlogSearch {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
