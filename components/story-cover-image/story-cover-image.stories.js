import { StoryCoverImage } from "./story-cover-image";

export default {
  title: "/Story/StoryCoerImage",
  component: StoryCoverImage,
};

const Template = (args) => <StoryCoverImage {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
