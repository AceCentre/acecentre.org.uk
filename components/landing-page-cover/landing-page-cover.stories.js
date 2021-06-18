import { LandingPageCover } from "./landing-page-cover";

export default {
  title: "Home/LandingPageCover",
  component: LandingPageCover,
};

const Template = (args) => <LandingPageCover {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
