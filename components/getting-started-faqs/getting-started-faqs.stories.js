import { GettingStartedFaqs } from "./getting-started-faqs";

export default {
  title: "/GettingStarted/Faqs",
  component: GettingStartedFaqs,
};

const Template = (args) => <GettingStartedFaqs {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
