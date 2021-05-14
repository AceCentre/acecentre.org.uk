import { BlogCategoryGrid } from "./blog-category-grid";

export default {
  title: "Blog/BlogCategoryGrid",
  component: BlogCategoryGrid,
};

const Template = (args) => <BlogCategoryGrid {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
