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
  featuredImage: {
    src:
      "https://internal.acecentre.org.uk/wp-content/uploads/2021/03/Screenshot-2021-06-21-at-15.08.11.png",
    width: 6016,
    height: 3150,
  },
  summary:
    "<p>An insight into Paul and Julie&#8217;s lives; how they manage the inescapable changes and challenges that are brought on by Motor Neurone Disease</p>\n",
};
