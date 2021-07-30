import { Facts } from "./facts";

export default {
  title: "/GetInvolved/Facts",
  component: Facts,
};

const Template = (args) => <Facts {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
