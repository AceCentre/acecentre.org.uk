import { OtherWaysToDonate } from "./other-ways-to-donate";

export default {
  title: "GetInvolved/OtherWaysToDonate",
  component: OtherWaysToDonate,
};

const Template = (args) => <OtherWaysToDonate {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
