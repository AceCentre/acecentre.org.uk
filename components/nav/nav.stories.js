import { Nav } from "./nav";

export default {
  title: "Components/Nav",
  component: Nav,
};

const Template = (args) => <Nav {...args} />;

export const SignedIn = Template.bind({});
SignedIn.args = {};

export const SingedOut = Template.bind({});
SingedOut.args = {};
