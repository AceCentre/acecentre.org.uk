import { StoryContentAndQuote } from "./story-content-and-quote";

export default {
  title: "/Story/StoryConetAndQuote",
  component: StoryContentAndQuote,
};

const Template = (args) => <StoryContentAndQuote {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
