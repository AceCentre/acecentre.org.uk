import { FeaturedStory } from "./featured-story";

export default {
  title: "Home/FeaturedStory",
  component: FeaturedStory,
};

const Template = (args) => <FeaturedStory {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  youtubeVideo: "https://www.youtube.com/watch?v=3fxrVktVzn0",
  title: "How we supported Paul & Julie",
  summary:
    "<p>An insight into Paul and Julie&#8217;s lives; how they manage the inescapable changes and challenges that are brought on by Motor Neurone Disease</p>\n",
};
