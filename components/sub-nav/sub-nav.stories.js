import { SubNav, defaultNavItems } from "./sub-nav";

export default {
  title: "Components/SubNav",
  component: SubNav,
};

const Template = (args) => <SubNav {...args} />;

export const NoActive = Template.bind({});
NoActive.args = {
  navItems: defaultNavItems,
};
