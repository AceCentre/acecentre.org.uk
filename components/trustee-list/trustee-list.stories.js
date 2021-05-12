import { TrusteeList } from "./trustee-list";

export default {
  title: "About/Trustees/TrusteeList",
  component: TrusteeList,
};

const Template = (args) => <TrusteeList {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
