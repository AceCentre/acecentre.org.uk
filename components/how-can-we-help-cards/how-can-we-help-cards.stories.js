import { HowCanWeHelpCards } from "./how-can-we-help-cards";

export default {
  title: "Home/HowCanWeHelpCards",
  component: HowCanWeHelpCards,
};

const Template = (args) => <HowCanWeHelpCards {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
