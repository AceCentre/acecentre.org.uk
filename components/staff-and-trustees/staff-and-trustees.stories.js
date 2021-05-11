import { StaffAndTrustees } from "./staff-and-trustees";

export default {
  title: "About/StaffAndTrustees",
  component: StaffAndTrustees,
};

const Template = (args) => <StaffAndTrustees {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
