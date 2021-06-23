import { NavCta } from "./nav-cta";

export default {
  title: "Components/NavCta",
  component: NavCta,
};

const Template = (args) => <NavCta {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  primaryLine: "Contact us",
  secondaryLine: "to learn more",
  iconPath: "/phone.png",
  backgroundColour: "#bfdded",
  href: "/contact",
  iconColour: "#84BADC",
};

export const JustGiving = Template.bind({});
JustGiving.args = {
  primaryLine: "One-off donation",
  secondaryLine: "makes a difference",
  iconPath: "/just-giving.png",
  backgroundColour: "#EFB3F3",
  href: "/contact",
  iconColour: "#AA1FBD",
};
