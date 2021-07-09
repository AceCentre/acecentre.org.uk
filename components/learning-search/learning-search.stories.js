import { LearningSearch } from "./learning-search";

export default {
  title: "/Learning/Search",
  component: LearningSearch,
};

const Template = (args) => <LearningSearch {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
