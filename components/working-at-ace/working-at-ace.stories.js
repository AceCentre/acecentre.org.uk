import { WorkingAtAce } from "./working-at-ace";

export default {
  title: "Careers/WorkingAtAce",
  component: WorkingAtAce,
};

const Template = (args) => <WorkingAtAce {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
