import { StoryHighlight } from "./story-highlight";

export default {
  title: "Stories/StoryHighlight",
  component: StoryHighlight,
};

const Template = (args) => <StoryHighlight {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
