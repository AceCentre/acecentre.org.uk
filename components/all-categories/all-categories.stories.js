import { AllCategories } from "./all-categories";

export default {
  title: "Blog/AllCategories",
  component: AllCategories,
};

const Template = (args) => <AllCategories {...args} />;

const blogCategories = [
  { href: "/blog/category/1", title: "Category One" },
  { href: "/blog/category/2", title: "Category Two" },
  { href: "/blog/category/3", title: "Category Three" },
  { href: "/blog/category/4", title: "Category Four" },
  { href: "/blog/category/5", title: "Category Five" },
  { href: "/blog/category/6", title: "Category Six" },
  { href: "/blog/category/7", title: "Category Seven" },
  { href: "/blog/category/8", title: "Category Eight" },
  { href: "/blog/category/9", title: "Category Nine" },
  { href: "/blog/category/10", title: "Category Ten" },
  { href: "/blog/category/11", title: "Category Eleven" },
  { href: "/blog/category/12", title: "Category Twelve" },
  { href: "/blog/category/13", title: "Category Three" },
  { href: "/blog/category/14", title: "Category Fourteen" },
];

export const Standard = Template.bind({});
Standard.args = { blogCategories };
