import { CourseFilter } from "./course-filter";

export default {
  title: "/Learning/Filters",
  component: CourseFilter,
};

const Template = (args) => <CourseFilter {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
