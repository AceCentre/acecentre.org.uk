import { Button } from "./button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  children: "Button",
};

export const Link = Template.bind({});
Link.args = {
  children: "Link",
  href: "/link",
};
