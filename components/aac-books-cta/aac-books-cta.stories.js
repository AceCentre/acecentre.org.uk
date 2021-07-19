import { AacBooksCta } from "./aac-books-cta";

export default {
  title: "/GettingStarted/AacBooksCta",
  component: AacBooksCta,
};

const Template = (args) => <AacBooksCta {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
