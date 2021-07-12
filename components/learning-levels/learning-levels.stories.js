import { LearningLevels } from "./learning-levels";

export default {
  title: "/Learning/LearningLevels",
  component: LearningLevels,
};

const Template = (args) => <LearningLevels {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
