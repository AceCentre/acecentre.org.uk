import { defaultNavItems } from "../sub-nav/sub-nav-items";
import { CombinedNav } from "./combined-nav";

export default {
  title: "Components/CombinedNav",
  component: CombinedNav,
};

const Template = (args) => <CombinedNav {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  defaultNavItems: defaultNavItems,
  cartCount: 1,
};
