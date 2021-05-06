import { SubNav, defaultNavItems, SUB_NAV_HEADERS } from "./sub-nav";

export default {
  title: "Components/SubNav",
  component: SubNav,
};

const Template = (args) => <SubNav {...args} />;

export const NoActive = Template.bind({});
NoActive.args = {
  navItems: defaultNavItems,
};

export const ActiveItem = Template.bind({});
ActiveItem.args = {
  navItems: defaultNavItems,
  active: SUB_NAV_HEADERS.GETTING_STARTED,
};
