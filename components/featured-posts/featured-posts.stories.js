import { FeaturedPosts } from "./featured-posts";

export default {
  title: "Components/FeaturedPosts",
  component: FeaturedPosts,
};

const Template = (args) => <FeaturedPosts {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
