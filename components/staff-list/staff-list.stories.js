import { StaffList } from "./staff-list";

export default {
  title: "About/Staff/StaffList",
  component: StaffList,
};

const Template = (args) => <StaffList {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
