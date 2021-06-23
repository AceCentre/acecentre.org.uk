import { OurVision } from "./our-vision";

export default {
  title: "About/OurVision",
  component: OurVision,
};

const Template = (args) => <OurVision {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
