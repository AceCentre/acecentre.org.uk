import { CourseList } from "./course-list";

export default {
  title: "/Courses/CourseList",
  component: CourseList,
};

const Template = (args) => <CourseList {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
