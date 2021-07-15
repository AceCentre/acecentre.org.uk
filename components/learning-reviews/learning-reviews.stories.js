import { LearningReviews } from "./learning-reviews";

export default {
  title: "/Learning/Reviews",
  component: LearningReviews,
};

const Template = (args) => <LearningReviews {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
