import { WordsFrom } from "./words-from";

export default {
  title: "/Stories/WordsFrom",
  component: WordsFrom,
};

const Template = (args) => <WordsFrom {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
