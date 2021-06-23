import { Ourvision } from "./OurVision";

export default {
  title: "About/OurVision",
  component: Ourvision,
};

const Template = (args) => <Ourvision {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
