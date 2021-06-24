import { OurFunding } from "./our-funding";

export default {
  title: "About/OurFunding",
  component: OurFunding,
};

const Template = (args) => <OurFunding {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
