import { AllCategories } from "./all-categories";

export default {
  title: "Blog/AllCategories",
  component: AllCategories,
};

const Template = (args) => <AllCategories {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
