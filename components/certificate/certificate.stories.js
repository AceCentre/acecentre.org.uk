import { Certificate } from "./certificate";

export default {
  title: "/Learning/Certiface",
  component: Certificate,
};

const Template = (args) => <Certificate {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
