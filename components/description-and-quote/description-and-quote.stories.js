import { DescriptionAndQuote } from "./description-and-quote";

export default {
  title: "About/DescriptionAndQuote",
  component: DescriptionAndQuote,
};

const Template = (args) => <DescriptionAndQuote {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
