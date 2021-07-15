import { LearningDetailMeta } from "./learning-detail-meta";

export default {
  title: "/Learning/DetailMeta",
  component: LearningDetailMeta,
};

const Template = (args) => <LearningDetailMeta {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
