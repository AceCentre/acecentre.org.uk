import { CareersAtAce } from "./careers-at-ace";

export default {
  title: "About/Staff/CareersAtAce",
  component: CareersAtAce,
};

const Template = (args) => <CareersAtAce {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
