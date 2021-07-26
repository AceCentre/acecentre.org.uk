import { StillHavingProblems } from "./still-having-problems";

export default {
  title: "/Support/StillHavingProblems",
  component: StillHavingProblems,
};

const Template = (args) => <StillHavingProblems {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
