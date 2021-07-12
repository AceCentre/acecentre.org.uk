import { BespokeTraining } from "./bespoke-training";

export default {
  title: "/Learning/BespokeTraining",
  component: BespokeTraining,
};

const Template = (args) => <BespokeTraining {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
