import { LearningDetailBox } from "./learning-detail-box";

export default {
  title: "/Learning/DetailBox",
  component: LearningDetailBox,
};

const Template = (args) => <LearningDetailBox {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
