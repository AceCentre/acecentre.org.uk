import { CourseCategoriesGrid } from "./course-categories-grid";

export default {
  title: "Resources/CategoriesGrid",
  component: CourseCategoriesGrid,
};

const Template = (args) => <CourseCategoriesGrid {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
