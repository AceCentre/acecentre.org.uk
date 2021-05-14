import { AllCategories } from "./all-categories";

export default {
  title: "Blog/AllCategories",
  component: AllCategories,
};

const Template = (args) => <AllCategories {...args} />;

const blogCategories = [
  { slug: "1", title: "Category One" },
  { slug: "2", title: "Category Two" },
  { slug: "3", title: "Category Three" },
  { slug: "4", title: "Category Four" },
  { slug: "5", title: "Category Five" },
  { slug: "6", title: "Category Six" },
  { slug: "7", title: "Category Seven" },
  { slug: "8", title: "Category Eight" },
  { slug: "9", title: "Category Nine" },
  { slug: "10", title: "Category Ten" },
  { slug: "11", title: "Category Eleven" },
  { slug: "12", title: "Category Twelve" },
  { slug: "13", title: "Category Three" },
  { slug: "14", title: "Category Fourteen" },
];

export const Standard = Template.bind({});
Standard.args = { blogCategories };
