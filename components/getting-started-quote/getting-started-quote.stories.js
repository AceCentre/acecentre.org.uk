import { GettingStartedQuote } from "./getting-started-quote";

export default {
  title: "/Getting/Started/Quote",
  component: GettingStartedQuote,
};

const Template = (args) => <GettingStartedQuote {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
