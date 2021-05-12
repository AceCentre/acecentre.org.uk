import { StaffList } from "./staff-list";
import { STAFF_LIST_DEMO } from "./static-staff-list";

export default {
  title: "About/Staff/StaffList",
  component: StaffList,
};

const Template = (args) => <StaffList {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  staffList: STAFF_LIST_DEMO,
};
